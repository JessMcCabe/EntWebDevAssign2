import React from "react";
import HeaderPeople from "../headerPeople";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPersonImages } from "../../api/tmdb-api";
import { PeopleImage, PersonT } from "../../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../spinner';


const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 250,
        height: '100vh',
    },
};

interface TemplatePeoplePageProps {
    person: PersonT;
    children: React.ReactElement;
}


const TemplatePeoplePage: React.FC<TemplatePeoplePageProps> = (props) => {
    const { person, children } = props;
  /*  const { data, error, isLoading, isError } = useQuery<PeopleImage[], Error>(
        ["images", person.id],
        () => getPersonImages(person.id)
    );*/


    //const [page, setPage] = React.useState(1)
  
    const {  isError, error, data, isFetching } =
    useQuery({
      queryKey: ['images', person.id],
      queryFn: () =>getPersonImages(person.id),
      placeholderData: keepPreviousData,
    })

    if (isFetching) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }
    console.log(data)
    const images = data as PeopleImage[];

    return (
        <>
            <HeaderPeople {...person} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: PeopleImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplatePeoplePage;