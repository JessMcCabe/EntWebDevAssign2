import React, { useState } from "react";
import { BaseTVShow , Review} from "../types/interfaces";

interface TVShowContextInterface {
    addToFavourites: ((tvShow: BaseTVShow) => void);
    
}
const initialContextState = {
    addToFavourites: (tvShow: BaseTVShow) => {tvShow.id },
    
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

    
    return (
        <TVShowContext.Provider
            value={{
                addToFavourites,
                
            }}
        >
            {props.children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;