const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// ChatGPT OpenAI API
// API Documentation: https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/analyze-code-diff", async (req, res) => {

  const diff = req.body.diff;

  try {

    const getChatGPTData = async () => {

      const prompt = `Can you provide a very short description the code changes and in a sentence or two analyze this Git diff for bugs, code optimizations and any other recommendations? \n${diff}`;
    
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 2000,
        temperature: 0.7,
      });

      if(completion && completion.data && completion.data.choices) {
        console.log(completion.data)
        res.status(201).send({ data: completion.data.choices });
      } else {
        res.status(404).send({ error: "Not choices retrieved from ChatGPT" });
      }
    };

    getChatGPTData();

  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    res.status(500).send({ error: "Error retrieving feedback" });
  }
});


const PORT = process.env.PORT || 4175;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
