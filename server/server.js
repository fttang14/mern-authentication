// jshint esversion:10
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
// import _ from "lodash";
import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import connectMongo from "connect-mongo";
import passport from "passport";
import passportLM from "passport-local-mongoose";
import path from "path";
import {fileURLToPath} from "url";

// Config init
import {SetupPassport} from "./config/passport.js";
dotenv.config({path: "./config/config.env"});

// Route init
import homeRouter from "./src/routes/home.js";
import debugRouter from "./src/routes/debug.js";
import listRouter from "./src/routes/list.js";
import loginRouter from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import registerRouter from "./src/routes/register.js";

// App (express) init
const app = express();
const MongoStore = connectMongo(session);
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI || "mongodb://localhost:27017/userDB";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
	origin: process.env.CORS_ORIGIN || "http://localhost:3000",
	credentials: true
}));
app.use(session({
	store: new MongoStore({url: URI}),
	secret: process.env.SECRET || "Thisisasecret.",
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
SetupPassport(passport);

// Routes
app.use("/", homeRouter);
app.use("/debug", debugRouter);
app.use("/list", listRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);

// Build production init
if(process.env.NODE_ENV === "production"){
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});
}

// MongoDB and Port setup
mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`);
		});
	})
	.catch((err) => {
		console.log(`Server error: ${err.message}...`);
	});
mongoose.connection
	.once("open", () => {
		console.log(`MongoDB connection established at ${URI}...`);
	});
