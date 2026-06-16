import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { BlogPost } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = { title: 'Blog', description: 'Insights and stories from TechmireSolutions.' }

export default async function BlogsPage() {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery).catch(() => [])

  return (
    <>
      <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Blog</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
              Insights & Stories
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#f5f5f0] py-24 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <FadeUp key={post._id} delay={i * 0.05}>
                  <Link href={`/blogs/${post.slug.current}`} className="group block">
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 mb-5">
                      {post.coverImage ? (
                        <Image src={urlFor(post.coverImage).width(600).height(375).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-300 text-4xl">◆</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && <span className="text-[11px] uppercase tracking-[0.15em] text-orange font-medium">{post.category}</span>}
                      {post.publishDate && <span className="text-dark/30 text-[12px]">{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                    </div>
                    <h2 className="text-dark font-normal text-xl leading-tight mb-2 group-hover:text-dark/60 transition-colors">{post.title}</h2>
                    <p className="text-dark/40 text-[13px] leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[13px] text-dark/40 group-hover:text-dark transition-colors">Read more ↗</span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-dark/30 text-[15px]">Blog posts will appear here once published via Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
