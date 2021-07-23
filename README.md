
  

<p  align="center">

  

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo_text.svg"  width="320"  alt="Nest Logo"  /></a>

<img  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"  width="320"  alt="Nest Logo"  />

  

</p>

  

## Description

  

  

Marvel API proxy built by [Nest](https://github.com/nestjs/nest) framework TypeScript.

  

  

## Installation

  

  

```bash

$ npm install
  
```

  

  

## Running the app

  

### 1. Run redis (skip this if you already installed redis in local)

  

```bash

docker-compose -f utils/docker-compose.yml -p marvel-api up

```

  

### 2. Setup .env file

  

```bash

APP_PORT=3000 # applicatoin port
MARVEL_API_URL=http://gateway.marvel.com/v1/public/
MARVEL_API_PRIVATE_KEY= #put your marvel api private key
MARVEL_API_PUBLIC_KEY= #put your marvel api public key
EVENT_CONSUMER_PORT=3210 #event consumer port
REDIS_HOST=localhost #redis host
REDIS_PORT=6379 #redis port

```

### 3. Run the application

  

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

```

  

  

## Test

  

  

```bash

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## How it works

```
swagger url: http://localhost:{your_port}/api
```

this project have 2 apis, which is: 
1. `GET /characters/:id` # retrieve the selected character id  
2. `GET /characters`.  # retrieve all the characters id

The caching strategy is implemented in `GET /characters`. I use **redis** as a storage and use **scheduler** and **event messaging** as caching mechanism. 

So, the first thing that you need to do is run the scheduler before using the API. If there is no cache, the API  will return `503 Error`. 


### Scheduler
Based on the [documentation]([https://developer.marvel.com/documentation/attribution]), ideally the scheduler should run every 24 hours. However for test purpose I set the scheduler to run every minute.

By running the `npm run start:dev`  , the scheduler will run in the background. If you see this `Running the CacheCharactersIdScheduler...` in terminal mean the scheduler is running and you need to wait for a few minute before its done.

To see more on how's the scheduler work, you can see in `src/Character/scheduler/CacheCharactersIdScheduler`

 ### Event Messaging
 I use a simple microservice tools by [Nest.js](https://docs.nestjs.com/microservices/basics). By running the `npm run start:dev`, the listener will run in the background.
 
Event messaging is used as a backup plan in case the scheduler has some issue. Basically everytime the `GET /characters` is called and there is no cache data, it will return `503 Error` and send an event to the listener and then it will fetch all the characters id and store it in redis.

You need to wait for a few minutes before the `GET /characters` can return all the characters id as expected.

 To see more on how's the scheduler work, you can see in `src/Character/scheduler/CacheAllCharactersIdController`
  

## Support

  

  

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

  

  

## Stay in touch

  

  

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)

  

- Website - [https://nestjs.com](https://nestjs.com/)

  

- Twitter - [@nestframework](https://twitter.com/nestframework)

  

  

## License

  

  

Nest is [MIT licensed](LICENSE).
