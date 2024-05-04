import type { Meta, StoryObj } from '@storybook/react';
import MoviePersonHeader from "../components/headerPeopleMovie";
import { MemoryRouter } from "react-router";
import TVShowContextProvider from "../contexts/tvShowsContext";
//import React from 'react';
import SamplePerson from "./sampleDataPeople";
//import PersonHeader from "../components/headerPeople";

const meta = {
    title: 'People/MovieListHeaderPerson',
    component: MoviePersonHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <TVShowContextProvider>{Story()}</TVShowContextProvider>,
    ],
  } satisfies Meta<typeof MoviePersonHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;
  export const Basic: Story = {
      args: {
          ...SamplePerson
      }
  };
  Basic.storyName = "Default";