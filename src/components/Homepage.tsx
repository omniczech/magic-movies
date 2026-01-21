"use client";

import { useState } from "react";
import actors from "../actors";
import exclusions from "../exclusion";
import Film from "./Film";
import Options from "./options";

const Homepage = () => {
  const [includePotential, setIncludePotential] = useState(false);
  const moviesArray: string[] = new Array(
    ...new Set(
      actors.reduce((acc: string[], actor) => {
        const localMovies: string[] = actor.movies || [];
        if (actor.potential) {
          console.log(actor.name);
          return acc;
        } else {
          acc.push(...localMovies);
          return acc;
        }
      }, []),
    ),
  )
    .filter((movie) => !exclusions.includes(movie))
    .sort((a, b) => (b < a ? 1 : -1));

  const movies: {
    name: string;
    actors: string[];
    potential?: boolean;
  }[] = moviesArray
    .map((movie) => {
      const actorsInMovie = actors.filter(
        (actor) => actor.movies.includes(movie) && !actor.potential,
      );
      return {
        name: movie,
        actors: actorsInMovie.map((actor) => actor.name),
        potential: false,
      };
    })
    .sort((a, b) => b.actors.length - a.actors.length)
    .filter((movie) => movie.actors.length > 1);

  const moviesArrayWithPotentialActors: string[] = new Array(
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

  const moviesWithPotentialActors: {
    name: string;
    actors: string[];
    potential?: boolean;
  }[] = moviesArrayWithPotentialActors
    .map((movie) => {
      const actorsInMovie = actors.filter((actor) =>
        actor.movies.includes(movie),
      );
      return {
        name: movie,
        actors: actorsInMovie.map((actor) => actor.name),
        potential: actorsInMovie.some((actor) => actor.potential),
      };
    })
    .sort((a, b) => b.actors.length - a.actors.length)
    .filter((movie) => movie.actors.length > 1);
  const moviesFinal = includePotential ? moviesWithPotentialActors : movies;

  console.log(movies, moviesWithPotentialActors, moviesFinal);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black text-black dark:text-white">
      <aside className=" text-black dark:text-white">
        <Options
          includePotential={includePotential}
          setIncludePotential={setIncludePotential}
        />
      </aside>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <p>{moviesFinal.length} movies </p>
          {moviesFinal.map((movie) => (
            <Film key={movie.name} film={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
