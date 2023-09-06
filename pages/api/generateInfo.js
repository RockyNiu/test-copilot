/*
Create a controller with the following specifications:

1. import the OpenAPI class from the openai npm module
3. create a new instance of the OpenAIApi class
4. create an async function called generateInfo that accepts a request and response object as parameters
5. use try to make a request to the OpenAI completetion api and return the response
6. use catch to catch any errors and return the error include a message to the user
7. export the generateInfo function as a module
*/
// 1. import the OpenAPI class from the openai npm module
import OpenAI from 'openai';
import { requireFile } from './utils.js';

// add the prompt to the top of the file
const { recipePrompt } = requireFile('../../data/prompt.json');

// 3. create a new instance of the OpenAIApi class
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 4. create an async function called generateInfo that accepts a request and response object as parameters
const generateInfo = async (req, res) => {
  // 5. use try to make a request to the OpenAI completetion api and return the response
  try {
    // 1. destructure the request body
    const { prompt, maxTokens, temperature, topP, n, stream, recipe } =
      req.body;
    // 2. create a variable called response and assign it to the response from the OpenAI completetion api
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `${prompt ?? recipePrompt}${recipe}` },
      ],
      max_tokens: maxTokens ?? 200,
      temperature: temperature ?? 0,
      n: n ?? 1,
    });

    const response = completion.choices[0].message.content;
    // 3. return the response from the api to the client
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    // 6. use catch to catch any errors and return the error include a message to the user
    if (error instanceof OpenAI.APIError) {
      return res.status(401).json({
        error: 'Please provide a valid API key.',
      });
    }
    return res.status(500).json({
      error:
        'An error occurred while generating recipe information. Please try again later.',
    });
  }
};

// 7. export the generateInfo function as a module
export default generateInfo;
