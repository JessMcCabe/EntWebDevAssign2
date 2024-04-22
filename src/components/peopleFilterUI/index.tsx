import React, { useState } from "react";
import FilterPeopleCard from "../filterPersonCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BasePerson } from "../../types/interfaces";

export const nameFilter = function (person: BasePerson, value: string) {
  return person.name.toLowerCase().search(value.toLowerCase()) !== -1;
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

interface PersonFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  nameFilter: string;
 
}


const TVShowFilterUI: React.FC<PersonFilterUIProps> = ({ onFilterValuesChange, nameFilter }) => {
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
        <FilterPeopleCard
          onUserInput={onFilterValuesChange}
          nameFilter={nameFilter}
          //genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default TVShowFilterUI;