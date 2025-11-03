import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a MongoDB Atlas:", err));

// Esquema de comentario
const comentarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  curso: String,
  comentario: String,
  estrellas: Number
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

// POST: guardar comentario
app.post("/comentarios", async (req, res) => {
  try {
    const nuevoComentario = new Comentario(req.body);
    await nuevoComentario.save();
    res.status(201).json(nuevoComentario);
  } catch (err) {
    console.error("Error al guardar comentario:", err);
    res.status(500).json({ error: "Error al guardar comentario" });
  }
});

// GET: obtener todos los comentarios
app.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comentario.find().sort({ _id: -1 });
    res.json(comentarios);
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

app.listen(3000, () => console.log("Servidor escuchando en puerto 3000"));
