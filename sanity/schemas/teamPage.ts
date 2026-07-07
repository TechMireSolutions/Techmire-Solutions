export default {
  name: 'teamPage',
  title: 'Team Page',
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
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
      ],
    },
  ],
}
