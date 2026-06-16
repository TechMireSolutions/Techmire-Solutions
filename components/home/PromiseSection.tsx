import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { PromiseItem } from '@/sanity/lib/types'

interface PromiseSectionProps {
  heading: string
  items: PromiseItem[]
}

const FALLBACK_ITEMS: PromiseItem[] = [
  { _id: '1', label: 'Client Support', order: 1 },
  { _id: '2', label: 'Integrity And Trust', order: 2 },
  { _id: '3', label: 'Modern Tech', order: 3 },
  { _id: '4', label: 'Quality', order: 4 },
  { _id: '5', label: 'Value For Money', order: 5 },
  { _id: '6', label: 'Time Keeping', order: 6 },
]

const ICONS: Record<string, string> = {
  'Client Support': '🤝',
  'Integrity And Trust': '🛡️',
  'Modern Tech': '⚙️',
  'Quality': '⭐',
  'Value For Money': '💎',
  'Time Keeping': '⏱️',
}

export default function PromiseSection({ heading, items }: PromiseSectionProps) {
  const displayItems = items.length > 0 ? items : FALLBACK_ITEMS

  return (
    <section className="bg-dark py-24 px-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <h2
            className="text-light font-normal text-center mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}
          >
            {heading || 'Pinky Promise'}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {displayItems.slice(0, 6).map((item, i) => (
            <FadeUp key={item._id} delay={i * 0.07}>
              <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl hover:border-[#e8522a]/40 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-dark border border-border flex items-center justify-center mb-4 text-2xl group-hover:border-[#e8522a]/50 transition-colors">
                  {item.illustration ? (
                    <Image
                      src={urlFor(item.illustration).width(64).height(64).url()}
                      alt={item.label}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    ICONS[item.label] || '✦'
                  )}
                </div>
                <p className="text-light text-[13px] font-medium leading-tight">{item.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
