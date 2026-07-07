export default {
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'story',
      title: 'Our Story Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'paragraph1', title: 'Paragraph 1', type: 'text' },
        { name: 'paragraph2', title: 'Paragraph 2', type: 'text' },
      ],
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. 4+)', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'teamTeaser',
      title: 'Team Teaser Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
      ],
    },
  ],
}
