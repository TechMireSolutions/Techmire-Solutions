import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { academyCoursesQuery, academyPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { AcademyCourse, AcademyPageData } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Techmire Academy',
  description: 'Level up your skills with Techmire Academy — practical courses in web development, design, and digital marketing.',
}

export default async function AcademyPage() {
  const courses: AcademyCourse[] = await client.fetch(academyCoursesQuery).catch(() => [])
  const pageData: AcademyPageData | null = await client.fetch(academyPageQuery).catch(() => null)

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">{pageData?.hero?.overline || "Learning & Growth"}</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
            >
              {pageData?.hero?.title || "Techmire Academy"}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-xl mt-5 max-w-xl mx-auto">{pageData?.hero?.subtitle || "Level Up Your Skills"}</p>
          </FadeUp>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-dark py-0 px-6 pb-16">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeUp>
            <p className="text-body text-lg leading-relaxed">
              {pageData?.intro?.description || "Techmire Academy is our in-house learning program designed to equip professionals, students, and entrepreneurs with practical digital skills. From web development to digital marketing — learn from the same team that builds real products for real businesses."}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-light py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-dark font-normal text-4xl mb-12">Our Courses</h2>
          </FadeUp>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, i) => (
                <FadeUp key={course._id} delay={i * 0.07}>
                  <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-52 bg-gray-50 overflow-hidden">
                      {course.coverImage ? (
                        <Image
                          src={urlFor(course.coverImage).width(600).height(350).url()}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-gray-300 text-5xl">📚</span>
                        </div>
                      )}
                      {course.status === 'coming-soon' && (
                        <div className="absolute top-3 left-3 bg-dark/80 text-light text-[11px] uppercase tracking-wider px-3 py-1 rounded-pill">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-dark font-medium text-xl mb-2">{course.title}</h3>
                      <p className="text-gray-500 text-[14px] leading-relaxed">{course.shortDescription}</p>
                      <div className="mt-5">
                        {course.status === 'available' ? (
                          <Link
                            href={course.ctaLink || '/get-a-quote'}
                            className="inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[13px] font-medium px-5 py-2.5 rounded-pill transition-colors"
                          >
                            Enroll Now ↗
                          </Link>
                        ) : (
                          <span className="text-body text-[13px]">Notify me when available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Courses will appear here once added via Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
