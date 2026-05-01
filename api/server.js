require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/validar", async (req, res) => {
  const { texto } = req.body;

  const prompt = `Actúa como un filtro de seguridad. Analiza si el siguiente texto es una justificación coherente de un humano o si es puro ruido/garabatos (letras aleatorias, repeticiones sin sentido).
    Responde ÚNICAMENTE con la palabra 'COHERENTE' o 'BASURA'.
    Texto: "${texto}"`;

  try {
    const result = await model.generateContent(prompt);
    const respuestaIA = result.response.text().trim();

    res.json({ resultado: respuestaIA });
  } catch (error) {
    res.status(500).json({ error: "Error con la IA" });
  }
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000"),
);
