const express = require("express");
const openai = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

openai.apiKey = OPENAI_API_KEY;

app.post("/api/analyze-code-diff", async (req, res) => {

  const codeDiff = req.body.codeDiff;

  try {

    const prompt = `Analyze the following Git diff for bugs, optimizations, comments, and security improvements:\n\n${codeDiff}\n`;

    const response = await openai.Completion.create({
      engine: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.send({ feedback: response.choices[0].text.trim() });
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    res.status(500).send({ error: "Error retrieving feedback" });
  }
});

const PORT = process.env.PORT || 4175;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
