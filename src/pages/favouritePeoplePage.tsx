import React, { useContext } from "react"
import PageTemplate from "../components/templatePeopleListPage";
import { PeopleContext } from "../contexts/peopleContext";
import { useQueries } from "react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import PeopleFilterUI, {
  nameFilter
} from "../components/peopleFilterUI";
import { PersonT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavouritesPerson";


const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};



const FavouritePeoplePage: React.FC = () => {
  const { favourites: peopleIds } = useContext(PeopleContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouritePeopleQueries = useQueries(
    peopleIds.map((peopleId) => {
      return {
        queryKey: ["people", peopleId ],
        queryFn: () => getPerson(peopleId.toString()),
      };
    })
  );
   // Check if any of the parallel queries is still loading.
   const isLoading = favouritePeopleQueries.find((m) => m.isLoading === true);

   if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouritePeopleQueries.map((q) => q.data);
  const displayPeople = allFavourites
  ? filterFunction(allFavourites)
  : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite People"
        people={displayPeople}
        action={(people) => {
          return (
            <>
              <RemoveFromFavourites {...people} />
              
            </>
          );
        }}
      />
      <PeopleFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};

export default FavouritePeoplePage;