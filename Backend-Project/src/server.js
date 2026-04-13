import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB, disconnectDB, prisma } from "./config/db.js";

const app = express();

// body parsing middlewares

app.use(express.json());

app.use(express.urlencoded({extended: true}));

connectDB();


// API routes 

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist",watchListRoutes);


// so basically now we use the router as a variable
// we use the movies routes and then can acces whichever rutes exist inside the movie routes



const PORT = 5001;
app.get("/", (req, res)=> {
    res.send("The home route is working")
})

const server = app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})


// ==============================
// 🔥 GLOBAL ERROR HANDLERS
// ==============================


// handle unhandled promise rejections eg database connection errors


// Unhandled Promise Rejections
process.on("unhandledRejection", async (reason, promise) => {
    console.error("❌ Unhandled Rejection:", reason);

    try {
        await prisma.$disconnect();
        console.log("Prisma disconnected after unhandled rejection");
    } catch (err) {
        console.error("Error during disconnect:", err.message);
    }

    process.exit(1); // Exit app (recommended for production)
});


// Uncaught Exceptions (sync errors)
process.on("uncaughtException", async (error) => {
    console.error("💥 Uncaught Exception:", error.message);

    try {
        await prisma.$disconnect();
        console.log("Prisma disconnected after uncaught exception");
    } catch (err) {
        console.error("Error during disconnect:", err.message);
    }

    process.exit(1); // Immediately crash (app is in unstable state)
});


// SIGTERM (graceful shutdown - e.g. from Docker, Render, etc.)
process.on("SIGTERM", async () => {
    console.log("📦 SIGTERM received. Shutting down gracefully...");

    try {
        await prisma.$disconnect();
        console.log("Prisma disconnected");

        process.exit(0); // Clean exit
    } catch (err) {
        console.error("Error during SIGTERM shutdown:", err.message);
        process.exit(1);
    }
});