
import type { Meta, StoryObj } from '@storybook/react';
import PeopleList from "../components/peopleList";
import SamplePerson from "./sampleDataPeople";
import { MemoryRouter } from "react-router";

import AddToFavouritesIconPerson from "../components/cardIcons/addToFavouritePerson";
import Grid from "@mui/material/Grid";
import PeopleContextProvider from "../contexts/peopleContext";


const meta = {
  title: "People/PeopleList",
  component: PeopleList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <PeopleContextProvider><Story /></PeopleContextProvider>,
    ],
    
} satisfies Meta<typeof PeopleList>;
export default meta;


export const Basic = () => {
  const people = [
    { ...SamplePerson, id: 1 },
    { ...SamplePerson, id: 2 },
    { ...SamplePerson, id: 3 },
    { ...SamplePerson, id: 4 },
    { ...SamplePerson, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <PeopleList
        people={people}
        action={(people) => <AddToFavouritesIconPerson {...people} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


