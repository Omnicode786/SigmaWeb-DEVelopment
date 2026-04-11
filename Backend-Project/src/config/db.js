import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({

log: process.env.NODE_ENV === "development" 
? ["query", "error", "warn"] 
: ["error"],

});
// the above helps in autocompletetion



const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");



    } catch (error) {
        console.error("database connection error: ", error.message);


        process.exit(1);
        // it stops our node js apps completely and tells our app that it ended because
        // of an error that we have logged above
    }
}

const disconnectDB = async () => {

     await prisma.$disconnect();
}
export {prisma, connectDB, disconnectDB};

