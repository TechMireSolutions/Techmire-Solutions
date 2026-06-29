import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Section' },
    { name: 'services', title: 'Services Section' },
    { name: 'whyUs', title: 'Why Us Section' },
    { name: 'clients', title: 'Clients Section' },
    { name: 'cta', title: 'CTA Banner' },
    { name: 'promise', title: 'Promise Section' },
  ],
  fields: [
    // --- Hero Section ---
    defineField({ name: 'heroHeadingLine1', title: 'Hero Heading Line 1', type: 'string', group: 'hero' }),
    defineField({
      name: 'heroRotatingWords',
      title: 'Hero Rotating Words',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'hero',
    }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', group: 'hero' }),
    defineField({ name: 'heroCTALabel', title: 'Hero CTA Label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroCTALink', title: 'Hero CTA Link', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    
    // --- About Section ---
    defineField({ name: 'aboutHeading', title: 'About Section Heading', type: 'string', group: 'about' }),
    defineField({ name: 'aboutParagraph', title: 'About Section Paragraph', type: 'text', group: 'about' }),
    defineField({ name: 'statYears', title: 'Stat: Years', type: 'string', group: 'about' }),
    defineField({ name: 'statPeople', title: 'Stat: People', type: 'string', group: 'about' }),
    defineField({ name: 'aboutImage', title: 'About Section Image', type: 'image', options: { hotspot: true }, group: 'about' }),
    
    // --- Services Section ---
    defineField({ name: 'servicesHeading', title: 'Services Section Heading', type: 'string', group: 'services' }),
    defineField({ name: 'servicesBackgroundImage', title: 'Services Background Image', type: 'image', options: { hotspot: true }, group: 'services' }),
    
    // --- Why Us Section ---
    defineField({ name: 'whyUsHeading', title: 'Why Us Heading', type: 'string', group: 'whyUs' }),
    
    // --- Clients Section ---
    defineField({ name: 'clientsHeading', title: 'Clients Section Heading', type: 'string', group: 'clients' }),
    
    // --- CTA Banner ---
    defineField({ name: 'ctaBannerHeading', title: 'CTA Banner Heading', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBannerParagraph', title: 'CTA Banner Paragraph', type: 'text', group: 'cta' }),
    defineField({
      name: 'ctaBannerBullets',
      title: 'CTA Banner Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'cta',
    }),
    defineField({ name: 'ctaBannerImage', title: 'CTA Banner Image', type: 'image', options: { hotspot: true }, group: 'cta' }),
    
    // --- Promise Section ---
    defineField({ name: 'promiseHeading', title: 'Pinky Promise Heading', type: 'string', group: 'promise' }),
  ],
})
