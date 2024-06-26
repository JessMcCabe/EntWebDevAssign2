import React, {MouseEvent, useContext} from "react";
import { PeopleContext } from "../../contexts/peopleContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BasePerson} from "../../types/interfaces"

const AddToFavouritesIconPerson: React.FC<BasePerson> = (person) => {
  const context = useContext(PeopleContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(person);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIconPerson;