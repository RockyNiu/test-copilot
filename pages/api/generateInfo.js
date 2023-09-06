/*
Create a controller with the following specifications:

1. import the Configuration class and the OpenAIApi class from the openai npm module
2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
3. create a new instance of the OpenAIApi class and pass in the configuration object
4. create an async function called generateInfo that accepts a request and response object as parameters
5. use try to make a request to the OpenAI completetion api and return the response
6. use catch to catch any errors and return the error include a message to the user
7. export the generateInfo function as a module
*/
// 1. import the Configuration class and the OpenAIApi class from the openai npm module
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { getSession } from 'next-auth/client';
import { getAccessToken } from 'next-auth/jwt';

// 2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// 3. create a new instance of the OpenAIApi class and pass in the configuration object
const openai = new OpenAIApi(configuration);

// 4. create an async function called generateInfo that accepts a request and response object as parameters
const generateInfo = async (req, res) => {
  // 5. use try to make a request to the OpenAI completetion api and return the response
  try {
    // 1. destructure the request body
    const { prompt, maxTokens, temperature, topP, n, stream } = req.body;
    // 2. create a variable called response and assign it to the response from the OpenAI completetion api
    const response = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: maxTokens,
      temperature: temperature,
      topP: topP,
      n: n,
      stream: stream,
      stop: ['\n', "Human:", "AI:"],
    });
    // 3. return the response from the api to the client
    res.status(200).json(response);
  } catch (error) {
    // 6. use catch to catch any errors and return the error include a message to the user
    res.status(400).json({ message: error.message });
  }
};

// 7. export the generateInfo function as a module
export default generateInfo;
