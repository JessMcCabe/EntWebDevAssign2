import React, { useState } from "react";
import FilterTVShowsCard from "../filterTVShowCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTVShow } from "../../types/interfaces";

export const nameFilter = function (tvShow: BaseTVShow, value: string) {
  return tvShow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (tvShow: BaseTVShow, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? tvShow.genre_ids.includes(genreId) : true;
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface TVShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  nameFilter: string;
  genreFilter: string;
}


const TVShowFilterUI: React.FC<TVShowFilterUIProps> = ({ onFilterValuesChange, nameFilter, genreFilter }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterTVShowsCard
          onUserInput={onFilterValuesChange}
          nameFilter={nameFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default TVShowFilterUI;