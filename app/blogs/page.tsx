import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { BlogPost } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and stories from the TechmireSolutions team.',
}

export default async function BlogsPage() {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery).catch(() => [])

  return (
    <>
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Our Blog</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
            >
              Insights & Stories
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="bg-light py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <FadeUp key={post._id} delay={i * 0.06}>
                  <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-52 bg-gray-50 overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).width(600).height(350).url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <span className="text-gray-300 text-5xl">◆</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {post.category && (
                        <span className="text-[11px] uppercase tracking-widest text-[#e8522a] font-medium">
                          {post.category}
                        </span>
                      )}
                      <h2 className="text-dark font-medium text-xl mt-2 mb-2 leading-tight line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-5">
                        <span className="text-gray-400 text-[12px]">
                          {post.publishDate ? new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </span>
                        <Link
                          href={`/blogs/${post.slug.current}`}
                          className="text-[#e8522a] text-[13px] font-medium hover:gap-3 transition-all"
                        >
                          Read More ↗
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Blog posts will appear here once published via Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
