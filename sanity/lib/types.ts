export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface SiteSettings {
  siteName: string
  tagline: string
  logo?: SanityImage
  email: string
  receiverEmail?: string
  phone1: string
  phone2: string
  address: string
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  tiktok?: string
  whatsapp?: string
  footerText: string
}

export interface HomepageData {
  heroHeadingLine1: string
  heroRotatingWords: string[]
  heroSubtitle: string
  heroCTALabel: string
  heroCTALink: string
  heroBackgroundImage?: SanityImage
  aboutHeading: string
  aboutParagraph: string
  statYears: string
  statPeople: string
  aboutImage?: SanityImage
  servicesHeading: string
  servicesBackgroundImage?: SanityImage
  whyUsHeading: string
  ctaBannerHeading: string
  ctaBannerParagraph: string
  ctaBannerBullets: string[]
  ctaBannerImage?: SanityImage
  clientsHeading: string
  promiseHeading: string
}

export interface SubService {
  _key: string
  title: string
  description?: string
  image?: SanityImage
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  parentCategory: string
  tagline?: string
  shortDescription: string
  fullDescription?: any[]
  // featureList?: string[]
  processSteps?: { _key: string, title: string, description: string, icon?: string }[]
  subServices?: SubService[]
  coverImage?: SanityImage
  order: number
  seo?: SEO
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  photo?: SanityImage
  linkedin?: string
  order: number
}

export interface ClientLogo {
  _id: string
  company: string
  logo?: SanityImage
  websiteUrl?: string
  order: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  author: string
  coverImage?: SanityImage
  category: string
  publishDate: string
  excerpt: string
  body?: any[]
  seo?: SEO
}

export interface AcademyCourse {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: SanityImage
  shortDescription: string
  fullDescription?: any[]
  status: 'available' | 'coming-soon'
  ctaLink?: string
  order: number
}

export interface PromiseItem {
  _id: string
  label: string
  illustration?: SanityImage
  order: number
}

export interface ValuePillar {
  _id: string
  title: string
  description: string
  iconName?: string
  order: number
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

export interface AboutPageData {
  hero: { title: string; subtitle: string; overline: string }
  story: { title: string; paragraph1: string; paragraph2: string }
  stats: { value: string; label: string }[]
  teamTeaser: { title: string; buttonText: string }
}

export interface TeamPageData {
  hero: { title: string; subtitle: string; overline: string }
  cta: { title: string; subtitle: string; buttonText: string; email: string }
}

export interface ServicesPageData {
  hero: { title: string; subtitle: string; overline: string }
  cta: { title: string; subtitle: string; buttonText: string }
}

export interface ContactPageData {
  hero: { title: string; subtitle: string; overline: string }
  locations: { title: string; address: string; phone: string }[]
  emails: { support: string; sales: string; general: string }
}

export interface AcademyPageData {
  hero: { title: string; subtitle: string; overline: string }
  intro: { title: string; description: string }
  studentPortalUrl?: string
}
