import type { Meta, StoryObj } from '@storybook/react';
import TVShowListHeader from "../components/headerTVShowList";
import { MemoryRouter } from "react-router";
import TVShowContextProvider from "../contexts/tvShowsContext";
import React from 'react';

const meta = {
    title: 'TV Shows/Header',
    component: TVShowListHeader,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
      (Story) => <TVShowContextProvider>{Story()}</TVShowContextProvider>,
    ],
  } satisfies Meta<typeof TVShowListHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args:{ title:'Discover TV Shows'}

};
Basic.storyName = "Default";

