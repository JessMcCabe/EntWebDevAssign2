import React, {MouseEvent, useContext} from "react";
import { TVShowContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseTVShow} from "../../types/interfaces"

const AddToFavouritesIconTVSHow: React.FC<BaseTVShow> = (tvShow) => {
  const context = useContext(TVShowContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(tvShow);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIconTVSHow;