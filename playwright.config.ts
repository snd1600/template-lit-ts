import { PlaywrightTestConfig } from '@playwright/test';

const port = 3080;

const config: PlaywrightTestConfig = {
  webServer: {
    command: `pnpm dev -- --port ${port}`,
    port,
  },
};

export default config;
