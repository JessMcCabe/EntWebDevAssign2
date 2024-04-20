import type { Meta, StoryObj } from '@storybook/react';
import PeopleCard from "../components/peopleCard";
import SamplePerson from "./sampleDataPeople";
import { MemoryRouter } from "react-router";
import PeopleContextProvider from "../contexts/peopleContext";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIconPerson from "../components/cardIcons/addToFavouriteTVShow";
import React from 'react';

const meta = {
  title: 'People/PeopleCard',
  component: PeopleCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <PeopleContextProvider>{Story()}</PeopleContextProvider>,
  ],
} satisfies Meta<typeof PeopleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (person ) => <AddToFavouritesIconPerson {...person} />,
    person: SamplePerson,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SamplePerson, profile_path: undefined };
export const Exceptional: Story = {
  args: {
    person: sampleNoPoster,
    action: (person ) => <AddToFavouritesIconPerson  {...person} />,
  }
};
Exceptional.storyName = "Exception";