import { prisma } from "../config/db.js";


export const addtoWatchList = async(req, res) => {

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



export const removeFromWatchList = async (req, res) => {
    const watchListItem = await prisma.watchListItem.findUnique({
        where: {id: req.params.id}
    })
    if (!watchListItem) {
        return res.status(404)
        .json({
            error: "WatchList Item not found."

        })
    };
    if (watchListItem.userId != req.user.id) {
        return res.status(404)
        .json({
            error: "YOu are not authorized to remove this movie from watch list item"
        })
    }

    await prisma.watchListItem.delete({
        where: {id: req.params.id}
    })


    return res
    .status(200)
    .json({
        "status": "success",
        "message": "Movie removed from watch list"
    })


}



export const updateIntoWatchList = async (req, res) => {
    const {status, rating, notes} = req.body;
    const watchListItem = await prisma.watchListItem.findUnique({
        where: {id: req.params.id}
    })
    if (!watchListItem) {
        return res.status(404)
        .json({
            error: "WatchList Item not found."

        })
    };
    if (watchListItem.userId != req.user.id) {
        return res.status(404)
        .json({
            error: "YOu are not authorized to update this movie from watch list item"
        })
    }

  const updatedWatchItem =   await prisma.watchListItem.update({
        where: {id: req.params.id},
        data:{
            status:status,
            rating:rating,
            notes:notes
        }
    })


    return res
    .status(200)
    .json({
        "status": "success",
        "message": "Movie updated into watch list",
        data: {
            updatedWatchItem
        }
    })


}

export const showAllWatchList = async (req, res) => {
        const watchListItems = await prisma.watchListItem.findMany({
            where: {userId: req.user.id}
        })

    if (!watchListItems) {
        return res.json({
            message: "No watchListItem found"
        });
    };
    return res.status(200).json({
        status: "success",
        data: watchListItems
    });
}