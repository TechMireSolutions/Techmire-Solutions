import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { academyCoursesQuery, academyPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { AcademyCourse, AcademyPageData } from '@/sanity/lib/types'
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react'
import EnrollmentButtonModal from './EnrollmentButtonModal'

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
      <section className="bg-dark pt-40 pb-20 px-6 lg:px-10 relative overflow-hidden">
        {/* Cinematic abstract background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-orange/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange/10 border border-orange/20 text-orange rounded-full text-[11px] uppercase tracking-[0.2em] font-medium mb-8">
              <Sparkles size={12} className="text-orange" />
              {pageData?.hero?.overline || "Learning & Growth"}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-white font-normal leading-[1.05]"
              style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
            >
              {pageData?.hero?.title || "Techmire Academy"}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              {pageData?.hero?.subtitle || "Level Up Your Skills"}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-dark py-10 px-6 lg:px-10 relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeUp delay={0.3}>
            <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05]">
              <p className="text-white/70 text-lg md:text-xl font-light leading-[1.8]">
                {pageData?.intro?.description || "Techmire Academy is our in-house learning program designed to equip professionals, students, and entrepreneurs with practical digital skills. From web development to digital marketing — learn from the same team that builds real products for real businesses."}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-dark py-24 px-6 lg:px-10 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp delay={0.4}>
            <div className="flex justify-center md:justify-start items-center gap-4 mb-16">
              <span className="hidden md:block w-8 h-px bg-orange/50" />
              <h2 className="text-white font-normal text-3xl sm:text-4xl text-center md:text-left">Available Programs</h2>
              <span className="w-8 h-px bg-orange/50" />
            </div>
          </FadeUp>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {courses.map((course, i) => (
                <FadeUp key={course._id} delay={0.5 + (i * 0.05)}>
                  <div className="group flex flex-col h-full rounded-[24px] bg-[#0f0f0f] hover:bg-[#141414] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-500 overflow-hidden relative shadow-2xl">
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative h-56 w-full bg-white/5 overflow-hidden">
                      {course.coverImage ? (
                        <Image
                          src={urlFor(course.coverImage).width(600).height(350).url()}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <BookOpen size={48} className="text-white/20" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      {course.status === 'coming-soon' && (
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <h3 className="text-white font-normal text-2xl mb-3 group-hover:text-orange transition-colors duration-300">{course.title}</h3>
                      <p className="text-white/40 text-[14px] leading-relaxed mb-8 flex-grow line-clamp-3">{course.shortDescription}</p>
                      
                      <div className="mt-auto border-t border-white/[0.05] pt-6 flex items-center justify-between">
                        <EnrollmentButtonModal courseTitle={course.title} />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                <BookOpen size={32} className="text-white/20" />
              </div>
              <h3 className="text-white text-3xl mb-4 font-normal">Academy Courses</h3>
              <p className="text-white/40 text-[16px] leading-relaxed">
                Courses will appear here once added via Sanity CMS. Stay tuned for practical learning programs!
              </p>
            </div>
          )}

          {/* Already Enrolled Section */}
          <FadeUp delay={0.6}>
            <div className="mt-32 max-w-[800px] mx-auto text-center border-t border-white/[0.05] pt-16">
              <h3 className="text-white font-normal text-3xl mb-4">Already Enrolled?</h3>
              <p className="text-white/50 text-[16px] mb-10 max-w-lg mx-auto font-light leading-relaxed">
                Access your student portal, review course materials, and connect directly with your instructors.
              </p>
              <a 
                href="https://student.techmiresolutions.com" 
                target="_blank" 
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-white/5 hover:bg-orange text-white hover:text-black border border-white/10 px-8 py-4 rounded-full transition-all duration-300 font-medium tracking-wide shadow-2xl"
              >
                Go to Student Portal 
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </FadeUp>

        </div>
      </section>
    </>
  )
}
