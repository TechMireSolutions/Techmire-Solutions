import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', description: 'Upload a small square image (e.g., 32x32 or 192x192) to display in browser tabs.' }),
    defineField({ name: 'email', title: 'Public Email (Footer/Header)', type: 'string' }),
    defineField({ 
      name: 'receiverEmail', 
      title: 'Leads Receiver Email', 
      type: 'string',
      description: 'Email address where all contact and quote forms will be sent. If left empty, it will fall back to Public Email.'
    }),
    defineField({ name: 'phone1', title: 'Phone 1', type: 'string' }),
    defineField({ name: 'phone2', title: 'Phone 2', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitter', title: 'Twitter/X URL', type: 'url' }),
    defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (e.g. +923172225152)', type: 'string' }),
    defineField({ name: 'footerText', title: 'Footer Copyright Text', type: 'string' }),
  ],
})
