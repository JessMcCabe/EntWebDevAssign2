import React from "react";
import TVShow from "../tvShowCard/";
import Grid from "@mui/material/Grid";
import { BaseTVShow } from "../../types/interfaces";

interface TVShowListProps {
  tvShow: BaseTVShow[],
  action: (m: BaseTVShow) => React.ReactNode;
}

const TVShowList: React.FC<TVShowListProps> = (props) => {
  const tvShow=props.tvShow;
  let tvShowCards = tvShow.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVShow key={m.id} tvShow={m}  action={props.action}/>
    </Grid>
  ));
  return tvShowCards;
}

  export default TVShowList;