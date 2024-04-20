import type { Meta, StoryObj } from '@storybook/react';
import TVShowCard from "../components/tvShowCard";
import SampleTVShow from "./sampleDataTVShow";
import { MemoryRouter } from "react-router";
import TVShowsContextProvider from "../contexts/tvShowsContext";
import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouriteTVShow";
import React from 'react';

const meta = {
  title: 'TV Shows/TVShowCard',
  component: TVShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TVShowsContextProvider>{Story()}</TVShowsContextProvider>,
  ],
} satisfies Meta<typeof TVShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
    tvShow: SampleTVShow,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTVShow, poster_path: "../images/film-poster-placeholder.png" };
export const Exceptional: Story = {
  args: {
    tvShow: sampleNoPoster,
    action: (tvShow ) => <AddToFavouritesIcon {...tvShow} />,
  }
};
Exceptional.storyName = "Exception";