import React, { useState } from "react";
import { BaseTVShow , Review} from "../types/interfaces";

interface TVShowContextInterface {
    favourites: number[];
    addToFavourites: ((tvShow: BaseTVShow) => void);
    removeFromFavourites: ((tvShow: BaseTVShow) => void);
    
}
const initialContextState = {
    favourites: [],
    addToFavourites: (tvShow: BaseTVShow) => {tvShow.id },
    removeFromFavourites: (tvShow: BaseTVShow) => { tvShow.id},
    
};


export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);;

const TVShowContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const addToFavourites = (tvShow: BaseTVShow) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(tvShow.id)) {
            updatedFavourites.push(tvShow.id);
        }
        setFavourites(updatedFavourites);
    };
    const removeFromFavourites = (tvShow: BaseTVShow) => {
        setFavourites(favourites.filter((mId) => mId !== tvShow.id));
    };
    
    return (
        <TVShowContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {props.children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;