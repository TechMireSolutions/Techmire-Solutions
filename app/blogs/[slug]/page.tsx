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
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react'

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
        <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden my-12 border border-white/[0.05] shadow-2xl group">
          <Image src={urlFor(value).url()} alt={value.alt || 'Blog Image'} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        </div>
      )
    }
  },
  block: {
    normal: ({ children }: any) => <p className="text-white/70 text-[17px] leading-[1.85] mb-8">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-white font-normal text-4xl sm:text-5xl mb-8 mt-16 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-white font-normal text-3xl sm:text-4xl mb-6 mt-14 leading-[1.2]">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-white font-normal text-2xl sm:text-3xl mb-5 mt-12 leading-tight">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-white font-normal text-xl sm:text-2xl mb-4 mt-10 leading-tight">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="relative pl-8 py-4 my-12 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-orange before:to-orange/10 text-white/60 italic text-2xl sm:text-3xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-outside ml-6 mb-10 space-y-4 text-white/70 marker:text-orange text-[17px]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-outside ml-6 mb-10 space-y-4 text-white/70 marker:text-orange text-[17px]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-3 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="pl-3 leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-white tracking-wide">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-white/80">{children}</em>,
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-orange hover:text-orange/80 underline underline-offset-[6px] decoration-orange/30 hover:decoration-orange transition-all duration-300">
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
      {/* Hero Section */}
      <section className="bg-dark pt-40 pb-48 px-6 lg:px-10 relative overflow-hidden border-b border-white/[0.02]">
        {/* Cinematic abstract background */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-orange/20 blur-[150px] rounded-full pointer-events-none opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
        
        <div className="max-w-[1000px] mx-auto relative z-10 text-center flex flex-col items-center">
          {post.category && (
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-full text-white/70 text-[11px] uppercase tracking-[0.2em] font-medium mb-10 backdrop-blur-md shadow-2xl">
                <Tag size={12} className="text-orange" />
                {post.category}
              </div>
            </FadeUp>
          )}
          
          <FadeUp delay={0.1}>
            <h1
              className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 font-normal leading-[1.05] mb-12 max-w-[900px]"
              style={{ fontSize: 'clamp(40px, 6vw, 85px)' }}
            >
              {post.title}
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/60 text-[13px] font-medium">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-orange/50 transition-colors">
                  <User size={18} className="text-orange" />
                </div>
                <span className="uppercase tracking-[0.15em]">{post.author}</span>
              </div>
              
              {post.publishDate && (
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-orange/50 transition-colors">
                    <Calendar size={18} className="text-orange" />
                  </div>
                  <span className="uppercase tracking-[0.15em]">
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Cover image (Overlapping the Hero) */}
      {post.coverImage && (
        <div className="bg-dark px-6 lg:px-10 pb-20">
          <div className="max-w-[1100px] mx-auto -mt-32 relative z-20">
            <FadeUp delay={0.3}>
              <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden border border-white/[0.08] shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10 pointer-events-none" />
                <Image
                  src={urlFor(post.coverImage).width(1600).height(800).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* Main Body Layout */}
      <section className="bg-dark pb-32 px-6 lg:px-10 min-h-screen relative">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Sidebar for Desktop */}
          <div className="hidden lg:block w-[60px] shrink-0">
            <div className="sticky top-40 flex flex-col items-center gap-8">
              <span className="rotate-180 text-white/30 text-[11px] uppercase tracking-[0.3em] font-medium" style={{ writingMode: 'vertical-rl' }}>
                Share Post
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent" />
              <button className="w-12 h-12 rounded-full border border-white/10 hover:border-orange hover:bg-orange/10 flex items-center justify-center text-white/50 hover:text-orange transition-all duration-300 shadow-xl">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-grow max-w-[800px] mx-auto lg:mx-0 w-full">
            {post.body && (
              <FadeUp delay={0.4}>
                {/* 
                  Drop-cap & Editorial styling:
                  - The first letter of the first paragraph is massive and floats left.
                  - The first line is capitalized for a magazine feel.
                */}
                <div className="font-light 
                  [&>p:first-of-type]:first-letter:text-[90px] 
                  [&>p:first-of-type]:first-letter:font-normal 
                  [&>p:first-of-type]:first-letter:text-orange 
                  [&>p:first-of-type]:first-letter:float-left 
                  [&>p:first-of-type]:first-letter:mr-6 
                  [&>p:first-of-type]:first-letter:mt-2 
                  [&>p:first-of-type]:first-letter:leading-[0.75]
                  [&>p:first-of-type]:first-line:uppercase 
                  [&>p:first-of-type]:first-line:tracking-widest
                  [&>p:first-of-type]:first-line:text-white/50
                  [&>p:first-of-type]:first-line:font-medium
                ">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              </FadeUp>
            )}

            {/* Footer / Back Link */}
            <FadeUp delay={0.5}>
              <div className="mt-24 pt-10 border-t border-white/[0.05] flex items-center justify-between">
                <Link href="/blogs" className="group inline-flex items-center gap-5 text-white/50 hover:text-white transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full border border-white/10 group-hover:border-orange group-hover:bg-orange/10 flex items-center justify-center transition-all duration-300 text-white/50 group-hover:text-orange">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.2em] font-medium">Back to Insights</span>
                </Link>

                {/* Mobile share button */}
                <div className="flex lg:hidden items-center gap-4">
                  <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-orange hover:border-orange transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
          
        </div>
      </section>
    </>
  )
}
