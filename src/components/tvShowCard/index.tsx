import React, {useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
//import { BaseMovie } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { CardActionArea } from '@mui/material';

import { TVShowContext } from "../../contexts/tvShowsContext";
import { TVShowT } from "../../types/interfaces";


const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};



interface TVShowProps {
  tvShow:TVShowT,
  action: (m: TVShowT) => React.ReactNode;
}


const TVShowCard: React.FC<TVShowProps> = (props) => {
  const tvShow = {...props.tvShow, favourite: false};
  const { favourites } = useContext(TVShowContext);
  
  if (favourites.find((id) => id === tvShow.id)) 
    tvShow.favourite = true;
 
 
  return (
    <Card sx={styles.card}>
      <CardActionArea>
      <Link to={`/tvshows/${tvShow.id}`}>
      <CardHeader
        avatar={
          tvShow.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tvShow.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
            : img
        }
      />
       </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tvShow.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions >
      {props.action(tvShow)}
        <Link to={`/tvshows/${tvShow.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
        </Link>
      </CardActions>
     
      </CardActionArea>
    </Card>
  );
}

export default TVShowCard;