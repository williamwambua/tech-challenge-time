# Session Tracker

This is app enables the user to track sessions by capturing the name of the session, the time the session was started and the time the session was stopped.

## The Stack

The stack is composed of three layers:

### `1. Database server`

This is a mySQL database server running version 5.7. For the development environment (local), the automated deploy script (docker-compose) will create and configure a development database as per the provided environment variables i.e. MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_ROOT_PASSWORD.

### `2. GraphQL API Endpoint`

This is a nodejs application exposing a graphQL endpoint via expressjs. Once deployed, the application will configure the database previously created with the application schema.

### `3. React App`

This is the front-end of our stack and runs on an nginx server. Once started, users can create an account, login and start tracking sessions. The front-end is secured via a combination of user authentication via account login and a JWT authentication token which is appended to the user's application's session upon successful login.

## Running the stack locally

You can either deploy the stack locally using docker-compose or copy the application source files then compile and run them. <br>

### `Option 1: Using docker-compose`

Simply clone the repository and run `docker-compose up` or `docker-compose up --build` if you need to rebuild the stack's docker images. You will need to ensure that you have installed docker on your computer. That's it! To launch the application, open the url `http://localhost:9090` on your browser. 

### `Option 2: Compiling and running the source files`

Ensure that a local instance of mySQL server is running. Create the database, database user, and set the db user password. Add the three variables to the .env file located under `/api/.env`. <br>

For the graphQL endpoint, run the command `npm install` under the `/api` directory to add the package dependencies of the application. Then follow this up by running `npm run start`. <br>

Finally, for the react front-end application, run the command `yarn install` under the `/app` directory to add the package dependencies. Then follow this up by running `yarn start`. <br>

Once `yarn start` successfully runs, copy and paste the link displayed on your terminal on to your browser to interact with the application. This will probably be `http://localhost:3000`.

NB: For the local database to deploy successfully when using `Option 1`, you'll need to ensure that you are not already running an instance of mysql server on your PC.
