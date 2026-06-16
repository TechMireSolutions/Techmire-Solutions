import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promiseItem',
  title: 'Promise Item',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'illustration', title: 'Illustration Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'label', media: 'illustration' },
  },
})
