import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadingLine1', title: 'Hero Heading Line 1', type: 'string' }),
    defineField({
      name: 'heroRotatingWords',
      title: 'Hero Rotating Words',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({ name: 'heroCTALabel', title: 'Hero CTA Label', type: 'string' }),
    defineField({ name: 'heroCTALink', title: 'Hero CTA Link', type: 'string' }),
    defineField({ name: 'heroImages', title: 'Hero Carousel Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'aboutHeading', title: 'About Section Heading', type: 'string' }),
    defineField({ name: 'aboutParagraph', title: 'About Section Paragraph', type: 'text' }),
    defineField({ name: 'statYears', title: 'Stat: Years', type: 'string' }),
    defineField({ name: 'statPeople', title: 'Stat: People', type: 'string' }),
    defineField({ name: 'aboutImage', title: 'About Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'servicesHeading', title: 'Services Section Heading', type: 'string' }),
    defineField({ name: 'whyUsHeading', title: 'Why Us Heading', type: 'string' }),
    defineField({ name: 'ctaBannerHeading', title: 'CTA Banner Heading', type: 'string' }),
    defineField({ name: 'ctaBannerParagraph', title: 'CTA Banner Paragraph', type: 'text' }),
    defineField({
      name: 'ctaBannerBullets',
      title: 'CTA Banner Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'ctaBannerImage', title: 'CTA Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'clientsHeading', title: 'Clients Section Heading', type: 'string' }),
    defineField({ name: 'promiseHeading', title: 'Pinky Promise Heading', type: 'string' }),
  ],
})
