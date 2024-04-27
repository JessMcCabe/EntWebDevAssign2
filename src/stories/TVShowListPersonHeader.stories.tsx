import type { Meta, StoryObj } from '@storybook/react';
import TVShowListHeader from "../components/headerPeopleTVShow";
import { MemoryRouter } from "react-router";
import TVShowContextProvider from "../contexts/tvShowsContext";
import React from 'react';
import SamplePerson from "./sampleDataPeople";
import PersonHeader from "../components/headerPeople";

const meta = {
    title: 'People/TVShowListHeaderPerson',
    component: TVShowListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <TVShowContextProvider>{Story()}</TVShowContextProvider>,
    ],
  } satisfies Meta<typeof TVShowListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;
  export const Basic: Story = {
      args: {
          ...SamplePerson
      }
  };
  Basic.storyName = "Default";