import React from "react";
import Person from "../peopleCard/";
import Grid from "@mui/material/Grid";
import { BasePerson } from "../../types/interfaces";

interface PeopleListProps {
  people: BasePerson[],
  action: (m: BasePerson) => React.ReactNode;
}

const PeopleList: React.FC<PeopleListProps> = (props) => {
  const person=props.people;
  let personCards = person.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Person key={m.id} person={m}  action={props.action}/>
    </Grid>
  ));
  return personCards;
}

  export default PeopleList;