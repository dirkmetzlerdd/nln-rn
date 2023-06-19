# NLN App - Neighborhood Life News (WIP)
### Focus on your Life - receive only meaningful notifications

The majority of notifications we receive from news apps and social media have little to no impact on our lives.  
Instead of providing value, they merely serve as distractions.  
However, when something important occurs in close proximity, notifications fail to reach you.  
The mission of the NLN-App: Less distraction, more real life, but with real-time essential information.  
NLN-App enables services to send messages with real-time notifications.  
Subscribe to local services such as the city council or a local newspaper to receive valuable notifications.

### Stack:
 - React Native (Expo)
 - TypeScript
 - Firebase (Auth, Firestore, Storage)

### Setup
 - Requirements: Node 16 or higher, Google Firebase Account, Expo Go App
 - clone the repo
 - create **config.ts** in **/firebase** and save your Firebase Config:
```
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```
- npm i
- npm run start
- Scan the QR code in the terminal with Expo Go (Android) or the Camera app (iOS)
