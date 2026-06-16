import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'academyCourse',
  title: 'Academy Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text' }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: [{ title: 'Available', value: 'available' }, { title: 'Coming Soon', value: 'coming-soon' }] },
    }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'coverImage' },
  },
})
