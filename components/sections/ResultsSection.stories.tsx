import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ResultsSection } from './ResultsSection'

const meta = {
  title: 'Sections/ResultsSection',
  component: ResultsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ResultsSection>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
