import express from "express";
import cors from "cors";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});