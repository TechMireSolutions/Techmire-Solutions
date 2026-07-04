'use client'

import React from 'react'
import { motion } from 'framer-motion'
import AnimatedTeamCard from './AnimatedTeamCard'
import type { TeamMember } from '@/sanity/lib/types'

interface AnimatedTeamGridProps {
  team: TeamMember[]
}

export default function AnimatedTeamGrid({ team }: AnimatedTeamGridProps) {
  if (!team || team.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-white/40 font-light">
        Team members will appear here once added via Sanity CMS.
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[1400px] mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {team.map((member, index) => {
          const column = index % 4
          return (
            <motion.div 
              key={member._id}
              className="w-full h-full flex"
              style={{
                marginTop: column % 2 !== 0 ? '40px' : '0px',
              }}
            >
              <AnimatedTeamCard member={member} index={index} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
