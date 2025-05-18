import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import tecnicosRoute from "./routes/tecnicosRoute";
import reportesRoute from "./routes/reportesRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes);
app.use("/tecnicos", tecnicosRoute);
app.use("/reportes", reportesRoute);


export default app;
