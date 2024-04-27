import type { Meta, StoryObj } from '@storybook/react';
import HeaderPeople from "../components/headerPeople";
import { MemoryRouter } from "react-router";
import TVShowContextProvider from "../contexts/tvShowsContext";
import React from 'react';
import SamplePerson from "./sampleDataPeople";
import PersonHeader from "../components/headerPeople";

const meta = {
    title: 'People/HeaderPerson',
    component: HeaderPeople,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <TVShowContextProvider>{Story()}</TVShowContextProvider>,
    ],
  } satisfies Meta<typeof HeaderPeople>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;
  export const Basic: Story = {
      args: {
          ...SamplePerson
      }
  };
  Basic.storyName = "Default";