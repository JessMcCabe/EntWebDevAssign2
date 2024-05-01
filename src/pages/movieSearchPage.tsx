import React from "react";
import PageTemplate from "../components/templateMovieSearch";
import SearchMovies from "../components/searchMovies";


const MovieSearch: React.FC = () => {
    

  
    return (
        <>
          
                    <PageTemplate >
                        <SearchMovies  />
                    </PageTemplate>
            
        </>
    );
};

export default MovieSearch;
