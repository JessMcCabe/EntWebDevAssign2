import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { MoviesContext } from "../../contexts/moviesContext";
import {ListedMovie} from "../../types/interfaces";

const RemoveFromPlayListIcon: React.FC<ListedMovie> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromPlayList(movie);
  };

return (
  <IconButton
    aria-label="remove from playlist"
    onClick={onUserRequest}
  >
    <PlaylistRemoveIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromPlayListIcon;