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
      <section className="bg-dark pt-36 pb-16 px-6">
        <div className="max-w-[900px] mx-auto">
          {post.category && (
            <FadeUp>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">{post.category}</span>
            </FadeUp>
          )}
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3 leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              {post.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-4 mt-6 text-body text-[14px]">
              <span>{post.author}</span>
              {post.publishDate && (
                <>
                  <span>·</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="bg-dark px-6 pb-0">
          <div className="max-w-[900px] mx-auto">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(900).height(500).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <section className="bg-light py-16 px-6">
        <div className="max-w-[900px] mx-auto">
          {post.body && (
            <FadeUp>
              <div className="prose prose-lg prose-gray max-w-none">
                <PortableText value={post.body} />
              </div>
            </FadeUp>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link href="/blogs" className="text-[#e8522a] text-[14px] font-medium hover:underline">
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
