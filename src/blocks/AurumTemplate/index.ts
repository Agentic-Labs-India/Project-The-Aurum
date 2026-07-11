import type { Block } from 'payload'

import { blockFields } from '@root/fields/blockFields'

import { AurumAboutSection } from './sections/About'
import { AurumAmenitiesSection } from './sections/Amenities'
import { AurumDetailsSection } from './sections/Details'
import { AurumGallerySection } from './sections/Gallery'
import { AurumHeroSection } from './sections/Hero'
import { AurumInteriorSection } from './sections/Interior'
import { AurumRoomsSection } from './sections/Rooms'
import { AurumTestimonialsSection } from './sections/Testimonials'

/**
 * The Aurum Template — page layout block for luxury hotel sections.
 * Nested section blocks are added here as each section is designed from screenshots.
 */
export const AurumTemplate: Block = {
  slug: 'aurumTemplate',
  interfaceName: 'AurumTemplateBlock',
  labels: {
    plural: 'Aurum Templates',
    singular: 'Aurum Template',
  },
  fields: [
    blockFields({
      name: 'aurumTemplateFields',
      fields: [
        {
          name: 'sections',
          type: 'blocks',
          labels: {
            plural: 'Sections',
            singular: 'Section',
          },
          admin: {
            description:
              'Add The Aurum brand sections in order. New section types appear here as they are built from design screenshots.',
            initCollapsed: false,
          },
          blocks: [
            AurumHeroSection,
            AurumAboutSection,
            AurumRoomsSection,
            AurumAmenitiesSection,
            AurumInteriorSection,
            AurumDetailsSection,
            AurumTestimonialsSection,
            AurumGallerySection,
          ],
        },
      ],
    }),
  ],
}
