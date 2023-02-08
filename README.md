
# The Backend

The backend of the route planning algorithm application is a crucial component in ensuring efficient management of orders and riders. The backend serves as an intermediary between the web and app clients and the databases, performing tasks such as running the algorithms, processing requests, and returning data.

## Setup Instructions

Install Node JS and PG Admin for running the application.

Run the following commands to install all the dependencies and initialize the database. 
    
```
yarn install
yarn db-generate
yarn db-update
```
To build the application, run the command

```
yarn build
```
To start the server, run the command

```
yarn start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. This file has to be placed inside the root directory. 

`PORT=8000`

`DB_URL=postgresql://<username>:<passowrd>@localhost:5432/interiit`

`GOOGLE_MAP_API_KEY=<your google api key>`

`JWT_SECRET=<your JWT secret token>` 
