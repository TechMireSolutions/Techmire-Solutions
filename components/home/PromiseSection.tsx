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
  { _id: '2', label: 'Integrity & Trust', order: 2 },
  { _id: '3', label: 'Modern Tech', order: 3 },
  { _id: '4', label: 'Quality', order: 4 },
  { _id: '5', label: 'Value For Money', order: 5 },
  { _id: '6', label: 'Time Keeping', order: 6 },
]

export default function PromiseSection({ heading, items }: PromiseSectionProps) {
  const list = items.length > 0 ? items : FALLBACK_ITEMS

  return (
    <section className="bg-dark border-t border-white/[0.06] py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-14">
            <span className="w-6 h-px bg-orange" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Our Commitment</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2
            className="font-normal text-white leading-[1.0] mb-16"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
          >
            {heading || 'Pinky Promise'}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.05]">
          {list.slice(0, 6).map((item, i) => (
            <FadeUp key={item._id} delay={i * 0.05} className="bg-dark p-8 flex flex-col items-start gap-6">
              <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center">
                {item.illustration ? (
                  <Image
                    src={urlFor(item.illustration).width(40).height(40).url()}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-white/20 text-[10px]">✦</span>
                )}
              </div>
              <p className="text-white/70 text-[14px] font-medium leading-tight">{item.label}</p>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
