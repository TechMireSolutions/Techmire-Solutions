#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment script..."

# Source NVM if available to ensure correct Node version
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
elif [ -s "/usr/local/nvm/nvm.sh" ]; then
  source "/usr/local/nvm/nvm.sh"
fi

# Use node version specified in .nvmrc if it exists
if [ -f .nvmrc ]; then
  nvm use || nvm install
fi

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci --include=dev

# Stop current PM2 process to free up RAM before building
echo "Stopping PM2 process (techmire-web) to free up RAM..."
npx pm2 stop techmire-web || true

# Backup existing .next directory
echo "Backing up current build..."
if [ -d ".next" ]; then
  rm -rf .next.backup
  mv .next .next.backup
fi

# Build Next.js app
echo "Building the application..."
if npm run build; then
  echo "Build successful!"
  # Clean up backup
  rm -rf .next.backup
else
  echo "Build failed. Restoring from backup..."
  if [ -d ".next.backup" ]; then
    rm -rf .next
    mv .next.backup .next
  fi
  
  # Restart the old app
  echo "Restarting the old application..."
  npx pm2 start techmire-web || npx pm2 start ecosystem.config.cjs
  exit 1
fi

# Start/Restart PM2 process
echo "Starting PM2 process..."
npx pm2 start ecosystem.config.cjs --update-env

# Health check
echo "Running health check..."
HEALTH_URL="http://127.0.0.1:5005"
MAX_ATTEMPTS=10
ATTEMPT=1
SUCCESS=0

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
  echo "Attempt $ATTEMPT of $MAX_ATTEMPTS..."
  
  # Check if server is responding
  if curl -s -f "$HEALTH_URL" > /dev/null; then
    # Server is up, now verify JS chunks are being served correctly (not broken cache)
    HTML_CONTENT=$(curl -s "$HEALTH_URL")
    
    # Extract the first JS chunk URL from the HTML
    CHUNK_PATH=$(echo "$HTML_CONTENT" | grep -oE '/_next/static/chunks/[^"]+\.js' | head -1)
    
    if [ -n "$CHUNK_PATH" ]; then
      CHUNK_URL="${HEALTH_URL}${CHUNK_PATH}"
      if curl -s -f -I "$CHUNK_URL" > /dev/null; then
        echo "Health check passed! App is running and serving static chunks correctly."
        SUCCESS=1
        break
      else
        echo "Health check failed: App is running but static chunk ($CHUNK_PATH) returned an error."
      fi
    else
      echo "Health check passed (no static chunks found in HTML, might be an API-only or minimal page)."
      SUCCESS=1
      break
    fi
  else
    echo "Server not responding yet..."
  fi
  
  sleep 3
  ATTEMPT=$((ATTEMPT + 1))
done

if [ $SUCCESS -eq 0 ]; then
  echo "Deployment failed health check!"
  exit 1
fi

echo "Deployment completed successfully!"
