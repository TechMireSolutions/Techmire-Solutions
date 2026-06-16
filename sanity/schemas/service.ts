import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'string',
      options: {
        list: [
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Web Development', value: 'web-development' },
          { title: 'Software Development', value: 'software-solution' },
          { title: 'SEO', value: 'search-engine-optimization' },
          { title: 'Top Level', value: 'top-level' },
        ],
      },
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description (for cards)', type: 'text' }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'featureList', title: 'Feature List', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'parentCategory', media: 'coverImage' },
  },
})
