# chat-app
first chat app
This chat app is created using react native which is a javascript framework for building mobile apps
            Set up Development Environment
1. npm install expo-cli --global
2. Create an Expo account and sign in
3. expo init to create new project
4. Can start project with npm start or expo start

Navigation
In order for the user to transition from one screen to another I installed:
npm install --save react-navigation
npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

This app could be used on Emulator/Simulator
Had to enable on pc:
Hyper-V
Virtual Machine Platform
Windows Hypervisor Platform
Windows Sandbox

Then download and install Android Virtual Device

The Gifted Chat library was then install with
npm install react-native-gifted-chat --save

After working on the Chat's UI (keyboard, buttons, background colors)

Implemented Firebase storage/ database
first creating an account then install it within the code
npm install --save firebase@7.9.0
the project has to be register on the firebase website and include key blow into code:
apiKey, authDomain, databaseURL, projectId, storageBucket, messagignSenderId

Setting up Client side storage
expo install @react-native-community/async-storage

Netinfo usage online/offline
expo install @react-native-community/netinfo

Added communication features
Below gets the users permission for images/microphone etc.
expo install expo-permissions
expo install expo-image-picker

Used to gather the users location
expo install expo-location
expo install react-native-maps
