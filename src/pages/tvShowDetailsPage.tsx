import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TVShowDetails from "../components/tvShowDetails";
import { TVShowT} from "../types/interfaces";
import PageTemplate from "../components/templateTVShowPage";
import { getTVShow } from '../api/tmdb-api'
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner'

const TVShowDetailsPage: React.FC = () => {
  const { id } = useParams();
  /*const { data: tvShow, error, isLoading, isError } = useQuery<TVShowT, Error>(
    ["tvShow", id],
    ()=> getTVShow(id||"")
  );*/


  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data: tvShow, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['tvShow', id],
    queryFn: () => getTVShow(id||""),
    placeholderData: keepPreviousData,
  })

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <>
        <PageTemplate tvShow={tvShow as TVShowT}> 
          <TVShowDetails {...tvShow as TVShowT} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for tv show details</p>
    )}
    </>
  );
};

export default TVShowDetailsPage;