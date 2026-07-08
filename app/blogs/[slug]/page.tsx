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

// Custom serializers for PortableText to style rich text with Tailwind
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden my-10 border border-white/[0.05] shadow-2xl">
          <Image src={urlFor(value).url()} alt={value.alt || 'Blog Image'} fill className="object-cover" />
        </div>
      )
    }
  },
  block: {
    normal: ({ children }: any) => <p className="text-white/70 text-[16px] leading-[1.8] mb-6">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-white font-normal text-4xl sm:text-5xl mb-6 mt-14 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-white font-normal text-3xl sm:text-4xl mb-5 mt-12 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-white font-normal text-2xl sm:text-3xl mb-4 mt-10 leading-tight">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-white font-normal text-xl sm:text-2xl mb-3 mt-8 leading-tight">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-orange pl-6 py-2 my-10 text-white/50 italic text-xl sm:text-2xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-outside ml-5 mb-8 space-y-3 text-white/70 marker:text-orange/80">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-outside ml-5 mb-8 space-y-3 text-white/70 marker:text-orange/80">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="pl-2 leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-white/80">{children}</em>,
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-orange hover:text-orange/80 underline underline-offset-4 decoration-orange/30 hover:decoration-orange transition-all duration-300">
          {children}
        </a>
      )
    },
  },
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
              <div className="font-light">
                <PortableText value={post.body} components={portableTextComponents} />
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
