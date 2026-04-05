import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import { logRequest, errorHandler } from "./middlewares/index.js";
import { createCustomersTable } from "./data/createCustomersTable.js";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

createCustomersTable();

// Middlewares
app.use(express.json());
app.use(logRequest("logs.txt"));

// Routes
app.use("/api/user", userRouter);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
