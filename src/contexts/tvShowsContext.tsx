import React, { useState } from "react";
import { BaseTVShow , Review} from "../types/interfaces";

interface TVShowContextInterface {
    
}
const initialContextState = {
    
    
};


export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);;

const TVShowContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    

    
    return (
        <TVShowContext.Provider
            value={{
                
                
            }}
        >
            {props.children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;