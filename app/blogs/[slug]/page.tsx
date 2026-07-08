import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { BlogPost } from '@/sanity/lib/types'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery).catch(() => [])
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post: BlogPost = await client.fetch(blogPostBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: post.coverImage
      ? { images: [urlFor(post.coverImage).width(1200).height(630).url()] }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post: BlogPost = await client.fetch(blogPostBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-40 pb-16 px-6 lg:px-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-orange/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[900px] mx-auto relative z-10 text-center">
          {post.category && (
            <FadeUp>
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-orange/10 border border-orange/20 text-orange rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold mb-8">
                {post.category}
              </div>
            </FadeUp>
          )}
          <FadeUp delay={0.1}>
            <h1
              className="text-white font-normal leading-[1.1] mb-8"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {post.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex items-center justify-center gap-4 text-white/50 text-[14px] font-medium uppercase tracking-widest">
              <span>{post.author}</span>
              {post.publishDate && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="bg-dark px-6 lg:px-10 pb-16">
          <div className="max-w-[1000px] mx-auto">
            <FadeUp delay={0.3}>
              <div className="relative w-full aspect-[21/9] rounded-[24px] overflow-hidden border border-white/[0.05] shadow-2xl">
                <Image
                  src={urlFor(post.coverImage).width(1200).height(600).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="bg-dark pb-32 px-6 lg:px-10 min-h-screen">
        <div className="max-w-[800px] mx-auto">
          {post.body && (
            <FadeUp delay={0.4}>
              <div className="prose prose-lg prose-invert prose-orange max-w-none prose-headings:font-normal prose-a:text-orange hover:prose-a:text-orange/80 prose-img:rounded-2xl">
                <PortableText value={post.body} />
              </div>
            </FadeUp>
          )}

          {/* Back link */}
          <FadeUp delay={0.5}>
            <div className="mt-20 pt-10 border-t border-white/[0.05]">
              <Link href="/blogs" className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-orange text-white/60 group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                </div>
                <span className="text-[14px] font-medium tracking-wide">Back to all insights</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
