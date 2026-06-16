import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quoteRequest',
  title: 'Quote Request',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'service', title: 'Service Interested In', type: 'string' }),
    defineField({ name: 'budget', title: 'Project Budget', type: 'string' }),
    defineField({ name: 'description', title: 'Project Description', type: 'text' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
})
