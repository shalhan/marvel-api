
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

  

## Support

  

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

  

## Stay in touch

  

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)

- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

  

## License

  

Nest is [MIT licensed](LICENSE).