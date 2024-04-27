
import type { Meta, StoryObj } from '@storybook/react';
import TVShowList from "../components/tvShowList";
import SampleTVShow from "./sampleDataTVShow";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavouriteTVShow";
import Grid from "@mui/material/Grid";
import TVShowsContextProvider from "../contexts/tvShowsContext";


const meta = {
  title: "People/TVShowListPerson",
  component: TVShowList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <TVShowsContextProvider><Story /></TVShowsContextProvider>,
    ],
    
} satisfies Meta<typeof TVShowList>;
export default meta;


export const Basic = () => {
  const tvShows = [
    { ...SampleTVShow, id: 1 },
    { ...SampleTVShow, id: 2 },
    { ...SampleTVShow, id: 3 },
    { ...SampleTVShow, id: 4 },
    { ...SampleTVShow, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TVShowList
        tvShow={tvShows}
        action={(tvShow) => <AddToFavouritesIcon {...tvShow} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


