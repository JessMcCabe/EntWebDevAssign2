import React, { useContext } from "react"
import PageTemplate from "../components/templateTVShowListPage";
import { TVShowContext } from "../contexts/tvShowsContext";
import { keepPreviousData,useQueries } from "@tanstack/react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter
} from "../components/tvShowFilterUI";
import { TVShowT } from "../types/interfaces";
import RemoveFromFavouriteTVShow from "../components/cardIcons/removeFromFavouritesTVShow";
import WriteReviewTVShow from "../components/cardIcons/writeReviewTVShow";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (tvShow: TVShowT, value: string) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = tvShow.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteTVShowsPage: React.FC = () => {
  const { favourites: tvShowIds } = useContext(TVShowContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
 /* const favouriteTVShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId ],
        queryFn: () => getTVShow(tvShowId.toString()),
      };
    })
  );*/

  const favouriteTVShowQueries = useQueries({
    queries: tvShowIds.map((tvShowId) => ({
      queryKey: ['movie', tvShowId],
      queryFn: () => getTVShow(tvShowId.toString()),
      staleTime: Infinity,
    })),
  })



   // Check if any of the parallel queries is still loading.
   const isLoading = favouriteTVShowQueries.find((m) => m.isLoading === true);

   if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTVShowQueries.map((q) => q.data);
  const displayTVShows = allFavourites
  ? filterFunction(allFavourites)
  : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        tvShows={displayTVShows}
        action={(tvShow) => {
          return (
            <>
              <RemoveFromFavouriteTVShow {...tvShow} />
              <WriteReviewTVShow {...tvShow} />
            </>
          );
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteTVShowsPage;