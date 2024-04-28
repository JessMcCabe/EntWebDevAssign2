import React, { useState } from "react";
import { TVShowT , TVShowReview} from "../types/interfaces";

interface TVShowContextInterface {
    favourites: number[];
    addToFavourites: ((tvShow: TVShowT) => void);
    removeFromFavourites: ((tvShow: TVShowT) => void);
    addReview: ((tvShow: TVShowT, review: TVShowReview) => void);  // NEW
}
const initialContextState = {
    favourites: [],
    addToFavourites: (tvShow: TVShowT) => {tvShow.id },
    removeFromFavourites: (tvShow: TVShowT) => { tvShow.id},
    addReview: (tvShow: TVShowT, review: TVShowReview) => { tvShow.id, review},  // NEW
    
};


export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);;

const TVShowContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<TVShowReview[]>( [] )  // NEW
    const addToFavourites = (tvShow: TVShowT) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(tvShow.id)) {
            updatedFavourites.push(tvShow.id);
        }
        setFavourites(updatedFavourites);
    };
    const removeFromFavourites = (tvShow: TVShowT) => {
        setFavourites(favourites.filter((mId) => mId !== tvShow.id));
    };
    const addReview = (tvShow: TVShowT, review: TVShowReview) => {   // NEW
        setMyReviews( {...myReviews, [tvShow.id]: review } )
      };
    
    return (
        <TVShowContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview, 
            }}
        >
            {props.children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;