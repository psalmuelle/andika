import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";

/* ROUTE IMPORTS */
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import adminRoutes from "./routes/admin";
import projectRoutes from "./routes/project";
import deliverableRoutes from "./routes/deliverable";

/* CONFIGURATIONS */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "sam_the_dev",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000 * 60 * 60,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
app.get("/", async (req, res) => {
  res.send("Andika Backend API");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/deliverable", deliverableRoutes);

/* SERVER */
const port = Number(process.env.PORT) || 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
