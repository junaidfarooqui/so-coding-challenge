# SO-coding-challenge

## Project setup
Go to project root via terminal and run 
``` npm install ```

## Server Setup
Go to server/ folder via terminal run commands ``` npm install ``` then ``` node server.js ``` after successful run server wil be running on ``` http://localhost:4021/``` 

### Run for development Env
``` npm run start ``` after this command you able to see application on ```http://localhost:8080``` also the availability of port, in-case port not available it will auto switch and you should able to see which port application running in the terminal


### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Docker (Recommended)
docker script is also setup in the project, if you have docker machine installed already then goto project root dir via terminal and run below command. 
```
docker-compose up
```

After successful run, you should be able to see application on ``` http://localhost:4022 ```