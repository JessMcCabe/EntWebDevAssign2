import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import PeopleDetails from "../components/peopleDetails";
import { PersonT} from "../types/interfaces";
import PageTemplate from "../components/templatePeoplePage";
import { getPerson } from '../api/tmdb-api'
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner'


const PeopleDetailsPage: React.FC = () => {
  const { id } = useParams();
 /* const { data: person, error, isLoading, isError } = useQuery<PersonT, Error>(
    ["person", id],
    ()=> getPerson(id||"")
  );*/

  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data: person, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id||""),
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
      {person ? (
        <>
        <PageTemplate person={person as PersonT}> 
          <PeopleDetails {...person as PersonT} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for person details</p>
    )}
    </>
  );
};

export default PeopleDetailsPage;