export interface BaseMovie {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  playList?: boolean;
}

export interface BaseMovieList { 
  movies: BaseMovie[];
}

export interface MovieT extends BaseMovie {
  genres: {
    id: number;
    name: string;
  }[]
  ,
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}


export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface ListedMovie extends BaseMovie {
  genre_ids: number[];
}

export type FilterOption = "title" | "genre";

export type FilterOptionTVShow = "name" | "genre";

export type FilterOptionPerson = "name" | "gender";


export interface MovieListPageTemplateProps {
  movies: ListedMovie[];
  title: string;
  action: (m: ListedMovie) => React.ReactNode;
}

export interface Review{
  id: string;
  content: string;
  author: string;
}


export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovie[];
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

interface UpcomingMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovie[];
}


export interface BaseTVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids:number[];
  homepage: string | undefined;
  tagline: string;
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  favourite?: boolean;
  playList?: boolean;
}


export interface knownFor
{
  backdrop_path: string;
  id: number;
  original_title: string;
  overview:string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language:string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BasePerson
{
  adult: boolean;
  gender: number ;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: knownFor[];// could this be tv show either?
}


export interface TVShowListPageTemplateProps {
  tvShows: BaseTVShow[];
  title: string;
  action: (m: BaseTVShow) => React.ReactNode;
}

interface DiscoverTVShows {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseTVShow[];
}


export interface TVShowImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface TVShowT extends BaseTVShow {
  genres: {
    id: number;
    name: string;
  }[]}

  interface AiringTodayTVShows {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseTVShow[];
  }


  export interface PeopleListPageTemplateProps {
    people: BasePerson[];
    title: string;
    action: (m: BasePerson) => React.ReactNode;
  }


  export interface GenderData {
    genders: {
      id: string;
      name: string;
    }[];
  }

  export interface PersonT extends BasePerson {
    gender: {
      id: number;
      name: string;
    }[]}


    interface DiscoverPeople {
      page: number;	
      total_pages: number;
      total_results: number;
      results: BasePerson[];
    }




export interface PersonT extends BasePerson
{
 
  biography: string;
  also_known_as: string[];
  birthday: string ;
  place_of_birth: string;
  favourite: boolean
  
}


export interface PeopleImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}