'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import type { TeamMember } from '@/sanity/lib/types'

const HorizontalTeamScroll = dynamic(() => import('./HorizontalTeamScroll'), {
  ssr: false,
})

interface TeamScrollWrapperProps {
  team: TeamMember[]
}

export default function TeamScrollWrapper({ team }: TeamScrollWrapperProps) {
  return (
    <HorizontalTeamScroll team={team} />
  )
}
