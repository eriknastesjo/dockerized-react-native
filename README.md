# Trying out react-native in Docker-container

## Setup

The react-native app needs to know your private local IP address to be able to fetch data from the express server that is running on localhost:3000.

Open up your wifi network properties.
![Properties of your wifi network](/react-native/react_native/assets/2.png)

Scroll down and copy your IP address (IPv4).
![List of properties](/react-native/react_native/assets/3.png)

Create two files .env
- in root folder.
- in folder react-native/react_native (two folders down)
![Folder tree structure](/react-native/react_native/assets/4.png)

Add your IP address as a variable in both .env files:
`IP="xxx.xxx.x.xx"`

## Docker
Start up Docker desktop.
In the project directory, you can then run:

### `docker-compose up`
Docker will start up containers, the express server and the react-native app. Scan QR-code in app expo go to the app on mobile device.

### `docker-compose down`
Docker will stop the containers.

## Unfixed issues
- Not being able to see updates after running the image.

## Technical study

### The challenges
When I tried to run my react-native app in a docker container I encountered a blue screen saying "Something went wrong". The mobile device could not connect "the usual way" through expo go.
Eventually I was able to connect by running expo --tunnel but even then I wasn't able to fetch data from my backend server that was running on localhost.

Down below I will describe my first two solutions with react-native web and expo tunnel. These solutions might still work in other project contexts but unfortunately not in the project that I'm currently working with. In the end, the solution that worked best was to specify the IP address of the local device and connect through expo LAN.

### Running react-native web
When searching on google for "docker react-native" I encountered an article that described how to run a react-native as a web app instead of a mobile app https://medium.com/@ganiilhamirsyadi/dockerize-react-native-expo-app-152c1e65e76c. Instead of using npm start you use npm run watch to run the application on a web browser.

This solution works well enough in case you are not using any mobile specific mechanism. But if you intend to use for example react-native-maps https://www.npmjs.com/package/react-native-maps you quickly realize that the application will run into an error.

### Connecting through expo tunnel
By running an application on a proxy server is can be accessed from any device with internet access. This is referred to as "tunneling". Expo provides built-in support for tunneling via ngrok https://docs.expo.dev/workflow/expo-cli/.

I found an article that used this method to run react-native in a docker-container https://dev.to/taher07/running-a-dockerized-react-native-application-1dd9. The good news is that we get our react-native app working even without the need to worry about ports in docker. The bad news is that we can't acccess any server running on the local device anymore since we are running the react-native app on an external server.

Hence, this solution works really well if you are planning on fetching data from external servers but not if you want to fetch from a server running on local network.

### Connecting through expo LAN
Somehow we need to make the react-native app talk to the local network inside of the Docker container. Of course, why don't we use ports? So I specified these in the docker-compose file and ended up with the same problem as this guy https://stackoverflow.com/questions/59638451/metro-bundler-with-expo-dockerized-app-is-not-working.

Here is where magic started to happen. I followed the advices from the article to add environment variables EXPO_DEVTOOLS_LISTEN_ADDRESS and REACT_NATIVE_PACKAGER_HOSTNAME. Suddenly the app was running smoothly through expo LAN.

I am currently not sure how these two variables make the solution work. A drawback is that you need to specify the IP addess of the local network in the REACT_NATIVE_PACKAGER_HOSTNAME variable. In this project we specify that in an .env file that is not visible on the remote repository.

### Fetching from backend on localhost
We also need to specify the IP address every time we're trying to fetch from server running on localhost. I found a video that explained how this can be done inside our react-native code https://www.youtube.com/watch?v=XxjPCRQL-vk&ab_channel=FullStackNiraj.
I didn't like that the IP addres was hard coded so I created another env. file. Turns out this is a little trickier in react-native than in other applications. This article https://dev.to/dallington256/using-env-file-in-react-native-application-3961 thought me how to download the correct babel plugin and configure the babel.config.js file accordingly.
The env file was working well but typescript complained that it couldn't find the module @env. This was fixed by creating a folder called types and declaring the module in file env.d.ts https://stackoverflow.com/questions/71712037/cannot-find-module-env-or-its-corresponding-type-declarations. Again here - mysterious forces are at work with no apparent explanation from google. But at least Typescript was satisfied.

