import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CTASection } from './CTASection'

const meta = {
  title: 'Sections/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
    react: {
      rsc: false,
    },
  },
} satisfies Meta<typeof CTASection>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
