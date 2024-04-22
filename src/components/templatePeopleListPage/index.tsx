import React from "react";
import Header from "../headerPeopleList";
import Grid from "@mui/material/Grid";
import PeopleList from "../peopleList";
import {  PeopleListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#000000",
  }
};

const PeopleListPageTemplate: React.FC<PeopleListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5} >
      <PeopleList action={props.action} people={props.people} />
      </Grid>
    </Grid>
  );
}
export default PeopleListPageTemplate;