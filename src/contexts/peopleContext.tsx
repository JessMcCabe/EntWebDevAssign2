import React, { useState } from "react";
import { BasePerson , Review} from "../types/interfaces";

interface PeopleContextInterface {
    favourites: number[];
    addToFavourites: ((person: BasePerson) => void);
    
}
const initialContextState = {
    favourites: [],
    addToFavourites: (person: BasePerson) => {person.id },
    
};


export const PeopleContext = React.createContext<PeopleContextInterface>(initialContextState);;

const PeopleContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const addToFavourites = (person: BasePerson) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(person.id)) {
            updatedFavourites.push(person.id);
        }
        setFavourites(updatedFavourites);
    };

    
    return (
        <PeopleContext.Provider
            value={{
                favourites,
                addToFavourites,
                
            }}
        >
            {props.children}
        </PeopleContext.Provider>
    );
};

export default PeopleContextProvider;