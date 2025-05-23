import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import notesRoutes from "./routes/notesRoutes.js";
import {verifyToken} from "./middleware/verifyToken.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "https://b-01-450713.uc.r.appspot.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/notes", verifyToken, notesRoutes);
app.use( userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database & tabel berhasil disinkronisasi");
  })
  .catch((err) => {
    console.error("❌ Gagal sinkronisasi database:", err);
  });
