export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'overline', title: 'Overline', type: 'string' },
      ],
    },
    {
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Office Title', type: 'string' },
            { name: 'address', title: 'Address', type: 'text' },
            { name: 'phone', title: 'Phone Number', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'emails',
      title: 'Contact Emails',
      type: 'object',
      fields: [
        { name: 'support', title: 'Support Email', type: 'string' },
        { name: 'sales', title: 'Sales Email', type: 'string' },
        { name: 'general', title: 'General Email', type: 'string' },
      ],
    },
  ],
}
