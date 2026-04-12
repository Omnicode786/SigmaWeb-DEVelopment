import { PrismaClient } from "@prisma/client";
import { Prisma } from "../src/generated/prisma/client";


// seed files are basically used to create new mock data for developer
// like me to test their application out

// this file is not going to be part of our main 
//  API
// its a script
// that we run when we want to add mroe stuff to our database


const prisma = new PrismaClient()

const creatorId = "e3e27ade-d0e3-43cb-b245-85b434208417";


const movies = [
  {
    title: "Interstellar",
    overview: "A team travels through a wormhole to save humanity.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: 169,
    postedUrl: "https://example.com/interstellar",
    createdBy: creatorId,
  },
  {
    title: "Inception",
    overview: "A thief steals secrets through dream-sharing technology.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Action"],
    runtime: 148,
    postedUrl: "https://example.com/inception",
    createdBy: creatorId,
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker in Gotham City.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    postedUrl: "https://example.com/dark-knight",
    createdBy: creatorId,
  },
  {
    title: "Avengers: Endgame",
    overview: "The Avengers assemble for one final battle.",
    releaseYear: 2019,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 181,
    postedUrl: "https://example.com/endgame",
    createdBy: creatorId,
  },
  {
    title: "Parasite",
    overview: "A poor family schemes to infiltrate a rich household.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    postedUrl: "https://example.com/parasite",
    createdBy: creatorId,
  },
  {
    title: "Joker",
    overview: "The origin story of Gotham’s most infamous villain.",
    releaseYear: 2019,
    genres: ["Drama", "Crime"],
    runtime: 122,
    postedUrl: "https://example.com/joker",
    createdBy: creatorId,
  },
  {
    title: "Spider-Man: No Way Home",
    overview: "Spider-Man faces villains from different universes.",
    releaseYear: 2021,
    genres: ["Action", "Adventure", "Fantasy"],
    runtime: 148,
    postedUrl: "https://example.com/spiderman",
    createdBy: creatorId,
  },
  {
    title: "The Matrix",
    overview: "A hacker discovers reality is a simulation.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    postedUrl: "https://example.com/matrix",
    createdBy: creatorId,
  }
];
