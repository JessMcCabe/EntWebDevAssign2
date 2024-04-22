import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import PeopleDetails from "../components/peopleDetails";
import { PersonT} from "../types/interfaces";
import PageTemplate from "../components/templatePeoplePage";
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const PeopleDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: person, error, isLoading, isError } = useQuery<PersonT, Error>(
    ["person", id],
    ()=> getPerson(id||"")
  );

  if (isLoading) {
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