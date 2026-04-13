import { prisma } from "../config/db.js";


const addtoWatchList = async(req, res) => {

    const { movieId, status, rating, notes} = req.body;

    // verify if the movies that i am adding exist in table

    const movie = await prisma.movie.findUnique({
        where: { 
            id:movieId
        }
    });

    if(!movie) {
        return res.status(404).json({
            error: "Movie not found"
        })
    }

    // now lets check if already added


    // When you use @@unique, Prisma generates a
    //  special combined field name (
    // usually field1_field2). 
    // Your findUnique call should now look like this:
 const existingInWatchList = await prisma.watchListItem.findUnique({
  where: {
    userId_movieId: {
      userId: req.user.id,
      movieId: movieId,
    },
  },
});

    if (existingInWatchList) {

        return res.status(400).
        json( {
            error: "Movie already in the watch list"
        })
    };

    const watchListItem = await prisma.watchListItem.create({
        data: {
            title: movie.title,
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes 
        }
    });

    res.status(200).json({
        status: "success",
        data: {
            watchListItem,
        }
    })

}

export default addtoWatchList;