import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourorg.forehand',
  appName: 'Forehand',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
