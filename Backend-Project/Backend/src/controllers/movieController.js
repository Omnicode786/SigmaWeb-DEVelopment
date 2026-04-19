import { prisma } from "../config/db.js";

export const showAllMovie =async (req,res) => {

    const movies = await prisma.movie.findMany()

    if (!movies) {
        return res.json({
            message: "No movies found"
        });
    };
    return res.status(200).json({
        status: "success",
        data: movies
    });
}