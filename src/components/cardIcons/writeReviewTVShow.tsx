import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {TVShowT} from "../../types/interfaces";
import { Link } from "react-router-dom";

const WriteReviewIconTVShow:React.FC<TVShowT> = (tvShow) => {
  return (
    <Link
    to={'/reviews/tv/form'}
    state={{
      tvShowId: tvShow.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIconTVShow;