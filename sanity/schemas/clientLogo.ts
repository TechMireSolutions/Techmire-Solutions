import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company Name', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'company', media: 'logo' },
  },
})
