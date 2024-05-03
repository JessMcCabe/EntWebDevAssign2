import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieT} from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner'

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  /*const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );*/


  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data: movie, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovie(id||""),
   
  })

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie as MovieT}> 
          <MovieDetails {...movie as MovieT} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;