# STARTUP PROGRESS SERVER

This project has been built using nodejs and graphQL with Apollo Server.

Is a little application backend that stores the progress of a startup in a in-memory "database" in node. Specifically, the project stores the completiono of different tasks that a startup could have. These tasks are grouped by phases. To complete any task, it is required that all the task in the previous phases are completed.

## Develop

To start development on this project, simply run `npm install` in the root folder and then `npm run dev`. This npm script will serve a little frontend in http://localhost:4000 that will give the option to be redirected to https://studio.apollographql.com/sandbox/explorer. This is an Apollo tool that can be used to start making graphql queries to http://localhost:4000 via POST http method so the application functionality can be tested while developing it.

## Deploy

There is no specific implementation for deploying this project to any server, but you can simply run `npm run build` to compile the project to javascript and host the resulting build however you consider
