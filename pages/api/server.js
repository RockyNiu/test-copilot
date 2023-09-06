// Create a server with the following specifications:

// 1. import express and dotenv node modules
// 3. create the server with express and name it app
// 4. use port 8080 as default port
// 5. enable body parser to accept json data
// 6. state which port the server is listening to and log it to the console
// 7. export the server as app

// 1. import express and dotenv node modules
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// 2. configure dotenv
dotenv.config();

// 3. create the server with express and name it app
const app = express();

// 4. use port 8080 as default port
const port = process.env.PORT || 8080;

// 5. enable body parser to accept json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 6. state which port the server is listening to and log it to the console
app.listen(port, () => console.log(`Server is running on port ${port}`));

// 7. export the server as app
export default app;



