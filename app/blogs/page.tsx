import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { BlogPost } from '@/sanity/lib/types'
import { ArrowUpRight } from 'lucide-react'

export const revalidate = 60
export const metadata: Metadata = { title: 'Blog', description: 'Insights and stories from TechmireSolutions.' }

export default async function BlogsPage() {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery).catch(() => [])

  return (
    <>
      <section className="bg-dark pt-40 pb-24 px-6 lg:px-10 border-b border-white/[0.06] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-orange/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full relative z-10">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-medium">Blog & Insights</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
              Latest <span className="text-white/40 italic">Thinking</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="bg-dark py-24 px-6 lg:px-10 min-h-screen">
        <div className="w-full">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post, i) => (
                <FadeUp key={post._id} delay={i * 0.05}>
                  <Link href={`/blogs/${post.slug.current}`} className="group flex flex-col h-full p-5 rounded-[24px] bg-[#0f0f0f] hover:bg-[#141414] border border-white/[0.03] hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden">
                    {/* Hover gradient overlay on card */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[16px] bg-white/5 mb-6">
                      {post.coverImage ? (
                        <Image src={urlFor(post.coverImage).width(600).height(375).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-4xl">·</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-grow relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        {post.category && (
                          <span className="px-3 py-1 bg-orange/10 text-orange rounded-full text-[10px] uppercase tracking-[0.1em] font-semibold">
                            {post.category}
                          </span>
                        )}
                        {post.publishDate && (
                          <span className="text-white/30 text-[12px] font-medium">
                            {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-white font-normal text-2xl leading-[1.3] mb-4 group-hover:text-orange transition-colors duration-300">
                        {post.title}
                      </h2>
                      
                      <p className="text-white/40 text-[14px] leading-relaxed line-clamp-3 mb-8 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-5">
                        <span className="text-[13px] font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                          Read Article
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-orange text-white/50 group-hover:text-black flex items-center justify-center transition-all duration-300">
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/20">
                <ArrowUpRight size={24} />
              </div>
              <h3 className="text-white text-2xl mb-3 font-normal">No Insights Yet</h3>
              <p className="text-white/40 text-[15px] leading-relaxed">Blog posts will appear here once published via Sanity CMS. Check back later for our latest thinking.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
