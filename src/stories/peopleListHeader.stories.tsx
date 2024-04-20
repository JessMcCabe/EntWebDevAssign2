import type { Meta, StoryObj } from '@storybook/react';
import PeopleListHeader from "../components/headerPeopleList";
import { MemoryRouter } from "react-router";
import PeopleContextProvider from "../contexts/peopleContext";
import React from 'react';

const meta = {
    title: 'People/Header',
    component: PeopleListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <PeopleContextProvider>{Story()}</PeopleContextProvider>,
    ],
  } satisfies Meta<typeof PeopleListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover People'}

};
Basic.storyName = "Default";

