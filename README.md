<img alt="Mockup" src="/assets/posts/PlantManager_react_native.gif">

## 💇🏻‍♂️ About the project

This project is an APP that reminds people to give water to their lovely plant.

## 💻 Screens

<img alt="Mockup" src="/assets/posts/home.jpg">
<img alt="Mockup" src="/assets/posts/home-start.jpg">
<img alt="Mockup" src="/assets/posts/choose-plant.jpg">
<img alt="Mockup" src="/assets/posts/plant.jpg">

## 🚀 Technologies

Technologies that I used to develop this web client

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Getting started

### Requirements

**Start Setup

💻 [Setup PC/Laptop ](https://www.notion.so/Configura-es-do-ambiente-79e0e4c3e992462a9b11f2745b0f2785)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/robsonamendonca/nlw5-rn-plant-manger
```

**Follow the steps below for Web Version**

```js
  # Go to project folder
  cd nlw5-rn-plant-manger

  # Install the dependencies
  $ yarn install

  # Install expo on your phone

  # Start project
   1. start API:

     a) - edit file: \src\services\api.ts
	   -- (line: 4) replace: baseURL: 'http://192.168.15.5:3333', 
              to 
                                 baseURL: 'http://999.999.99.9:3333',
 
           -- replace 999.999.99.9 to YourIP

     b) - json-server src/services/server.json --host 999.999.99.9 --port 3333 --delay 700
           -- replace 999.999.99.9 to YourIP

   -- replace 999.999.99.9 to YourIP (example: 192.168.1.10)
	
   2. start EXPO
     - expo start

  # Open the project on your phone scanning the QR code
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

---

Made with 💜 by Robson Mendonça during NLW #5 👋 [See my linkedin](https://www.linkedin.com/in/robsonamendonca/)
