import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.forehand.app',
  appName: 'Forehand',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
