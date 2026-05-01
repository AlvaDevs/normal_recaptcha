const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.all("*", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ resultado: "BASURA" });
  }

  try {
    const prompt = `Analiza si el siguiente texto es coherente o basura. Responde solo 'COHERENTE' o 'BASURA'. Texto: "${texto}"`;
    const result = await model.generateContent(prompt);
    const respuestaIA = result.response.text().toUpperCase();

    console.log("Respuesta de Gemini:", respuestaIA);
    res.json({ resultado: respuestaIA });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ error: "Fallo en la IA", detalles: error.message });
  }
});

module.exports = app;
