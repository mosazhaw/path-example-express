import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const frameworkPath = process.env.PATH_FRAMEWORK_DIR
  ?? path.resolve(__dirname, '../path/dist/release');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:8082',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && node dist/server/server.js',
    url: 'http://127.0.0.1:8082',
    reuseExistingServer: !process.env.CI,
    env: {
      ...process.env,
      PATH_FRAMEWORK_DIR: frameworkPath,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
