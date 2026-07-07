import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const homepageQuery = groq`*[_type == "homepage"][0]`

export const servicesQuery = groq`*[_type == "service"] | order(order asc)`

export const servicesByCategoryQuery = groq`
  *[_type == "service" && parentCategory == $category] | order(order asc)
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]
`

export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc)`

export const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc)`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishDate desc) {
    title, slug, author, coverImage, category, publishDate, excerpt
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]
`

export const academyCoursesQuery = groq`*[_type == "academyCourse"] | order(order asc)`

export const promiseItemsQuery = groq`*[_type == "promiseItem"] | order(order asc)`

export const valuePillarsQuery = groq`*[_type == "valuePillar"] | order(order asc)`

export const topLevelServicesQuery = groq`
  *[_type == "service" && parentCategory == "top-level"] | order(order asc)
`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`
export const teamPageQuery = groq`*[_type == "teamPage"][0]`
export const servicesPageQuery = groq`*[_type == "servicesPage"][0]`
export const contactPageQuery = groq`*[_type == "contactPage"][0]`
export const academyPageQuery = groq`*[_type == "academyPage"][0]`

