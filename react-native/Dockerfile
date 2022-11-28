FROM node:16-buster-slim

COPY ./react_native /react-native/
WORKDIR /react-native

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN npm install && npm install -g expo-cli
CMD [ "npx", "expo", "start" ]


# Nedan körs istället med --tunnel. Kommer då åt appen via extern proxy server via expo och ngrok.
# Tyvärr har inte appen tillgång till localhost längre...

# RUN npm install && npm install -g expo-cli && npm i @expo/ngrok@^4.1.0
# CMD [ "npx", "expo", "start", "--tunnel" ]
