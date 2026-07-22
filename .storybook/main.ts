import type { StorybookConfig } from '@storybook/nextjs-vite'
import { fileURLToPath } from 'node:url'

const nextIntlServer = fileURLToPath(new URL('./next-intl-server.ts', import.meta.url))

const config: StorybookConfig = {
  stories: ['../components/sections/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  framework: '@storybook/nextjs-vite',
  features: {
    experimentalRSC: true,
  },
  viteFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        'next-intl/server': nextIntlServer,
      },
    },
  }),
}

export default config
