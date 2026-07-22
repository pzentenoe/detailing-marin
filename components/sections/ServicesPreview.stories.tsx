import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ServicesPreview } from './ServicesPreview'

const meta = {
  title: 'Sections/ServicesPreview',
  component: ServicesPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ServicesPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
