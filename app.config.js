import 'dotenv/config';

export default {
  "expo": {
    "name": "AutoPlan",
    "slug": "AutoPlan",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./app/assets/icon.png",
    "splash": {
      "image": "./app/assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./app/assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.plannedOut"
    },
    "web": {
      "favicon": "./app/assets/favicon.png"
    },
    extra: {
      API_KEY:             process.env.API_KEY,
      AUTH_DOMAIN:         process.env.AUTH_DOMAIN,
      PROJECT_ID:          process.env.PROJECT_ID,
      STORAGE_BUCKET:      process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID:              process.env.APP_ID
    }
  }
}
