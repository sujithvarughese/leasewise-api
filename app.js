import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import "express-async-errors";
//security package imports
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// router imports
import authRouter from "./routes/auth-router.js"
import unitRouter from "./routes/unit-router.js";
import messageRouter from "./routes/message-router.js";
import financeRouter from "./routes/finance-router.js";
import registrationRouter from "./routes/registration-router.js"
import accountRouter from "./routes/account-router.js"
import mortgageRouter from './routes/mortgage-router.js'
import expenseRouter from './routes/expense-router.js'
import incomeRouter from './routes/income-router.js'
import researchRouter from './routes/research-router.js'
import newsRouter from './routes/news-router.js'

// remaining middleware imports
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions, authorizeSystemAdmin } from "./middleware/authentication.js";

//---------------//
const app = express()
dotenv.config();

app.use(cors({
	origin: [
		"http://localhost:5173",
		"https://lease-wise.com",
		"https://wwww.lease-wise.com",
		"https://sgs-properties.com",
		"https://realty-solutions.netlify.app",
		"https://leasewise.netlify.app",
		"https://leasewise-client-2025.pages.dev",
		"https://leasewise-client-2025-1.onrender.com"
	],
	credentials: true,
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));


if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// in production
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", (req, res) => {
	res.send("realty-solutions-home")
})
app.get("/api/v1", (req, res) => {
	res.send("realty-solutions API")
})

app.use("/api/v1/auth", authRouter);  // login, logout, register
app.use("/api/v1/units", unitRouter)
app.use("/api/v1/messages", messageRouter)
app.use("/api/v1/incomes", incomeRouter)
app.use("/api/v1/mortgages", mortgageRouter)
app.use("/api/v1/research", researchRouter)
app.use("/api/v1/expenses", expenseRouter)
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/registration", registrationRouter)
app.use("/api/v1/news", newsRouter)
app.use("/api/v1/finance", financeRouter)

app.use(notFound);
app.use(errorHandler);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})

export default app