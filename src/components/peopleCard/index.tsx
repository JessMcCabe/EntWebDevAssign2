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

import { PeopleContext } from "../../contexts/peopleContext";
import { BasePerson } from "../../types/interfaces";


const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};



interface PeopleListProps {
  person:BasePerson,
  action: (m: BasePerson) => React.ReactNode;
}


const PersonCard: React.FC<PeopleListProps> = (props) => {
  const person = {...props.person, favourite: false};
  const { favourites, addToFavourites } = useContext(PeopleContext);
  
  if (favourites.find((id) => id === person.id)) 
    person.favourite = true;
 
 
  return (
    <Card sx={styles.card}>
      <CardActionArea>
      <Link to={`/people/${person.id}`}>
      <CardHeader
        avatar={
          person.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {person.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
            : img
        }
      />
       </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {person.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions >
      {props.action(person)}
        <Link to={`/people/${person.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info ...
        </Button>
        </Link>
      </CardActions>
     
      </CardActionArea>
    </Card>
  );
}

export default PersonCard;