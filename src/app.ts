import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import reportesRoute from "./routes/reportesRoute";
import imagesRoute from "./routes/imagesRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes);
app.use("/reportes", reportesRoute);
app.use("/images", imagesRoute)


export default app;
