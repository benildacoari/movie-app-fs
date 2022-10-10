import { GraphQLServer } from 'graphql-yoga';
import Movie from "./models/MoviesCatalog.js";
import conection from "./dbConection.js";
import path from 'path';
import { fileURLToPath } from 'url';

conection();

// obtener dirname sin babel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//resolvers
const resolvers = {
    Query: {
        movies: () => Movie.find({})
    },
    Mutation: {
        createMovie: async (_, {movie}) => {
            const newMovie = new Movie(movie)
            await newMovie.save()
            return newMovie;
        },
        deleteMovie: async (_, {movieId}) => {
            const movieDeleted = await Movie.findByIdAndDelete(movieId)
            return movieDeleted;
        },
        incrementLikes: async (_, { movieId }) => {
            const movieLikes = await Movie.findById(movieId);
            console.log("aqui", movieLikes)
            movieLikes.likes = movieLikes.likes + 1
            movieLikes.save()
            return movieLikes
        },
    }
}

// creacion del servidor
const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "graphql/schema.graphql"),
    resolvers
})

// ejecucion del servidor
server.start({port: 4000}, ({port}) => {
    console.log(`Server running at ${port}`)
})
