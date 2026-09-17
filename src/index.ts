import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";
import invalidJsonMiddleware from "./middlewares/invalidJsonMiddleware.ts";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.ts";

import usersRoutes from "./routes/usersRoutes.ts";
import itemRoutes from "./routes/itemsRoutes.ts";

const app = express();
const port = 3000;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz #2 - API service");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Quiz #2 - API service",
  });
});

app.get("/student", (req: Request, res: Response) => {
  res.status(200).json({
     success: true,
     message: "Student Infomation",
     data: {
        studentId: "680610714",
        firstName: "Warintorn",
        lastName: "Sriti",
        section: "001"
     }
  })
});

app.use("/api/v714/", usersRoutes);
app.use("/api/v714/basket" , itemRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
