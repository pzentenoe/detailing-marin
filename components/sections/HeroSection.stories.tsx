import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HeroSection } from './HeroSection'

const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    react: {
      rsc: false,
    },
  },
} satisfies Meta<typeof HeroSection>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
