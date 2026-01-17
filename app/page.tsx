import Image from "next/image";

import actors from "../src/actors";
import exclusions from "../src/exclusion";

export const metadata = {
  title: "Magic Movies",
  description:
    "A list of movies with multiple actors who have been on Magic the Gathering cards.",
};

export default function Home() {
  const moviesArray: string[] = new Array(
    ...new Set(
      actors.reduce((acc: string[], actor) => {
        const localMovies: string[] = actor.movies || [];
        acc.push(...localMovies);
        return acc;
      }, []),
    ),
  )
    .filter((movie) => !exclusions.includes(movie))
    .sort((a, b) => (b < a ? 1 : -1));
  const movies = moviesArray
    .map((movie) => {
      const actorsInMovie = actors.filter((actor) =>
        actor.movies.includes(movie),
      );
      return {
        name: movie,
        actors: actorsInMovie.map((actor) => actor.name),
      };
    })
    .sort((a, b) => b.actors.length - a.actors.length)
    .filter((movie) => movie.actors.length > 1);
  console.log(movies);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start text-white">
        <div>
          {movies.map((movie) => (
            <div key={movie.name}>
              <p className="font-bold text-2xl">
                {movie.name} ({movie.actors.length})
              </p>
              {movie.actors.map((actor) => (
                <p key={actor}>{actor}</p>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
