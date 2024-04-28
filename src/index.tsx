import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import PeopleHomePage from "./pages/peopleHomePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieCast from "./pages/movieCastPage";
import MovieCrew from "./pages/movieCrewPage";
import PersonMoviesPage from "./pages/personMoviesPage";
import PersonTVShowsPage from "./pages/personTVShowsPage";
import TVShow from "./pages/tvShowDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import FavouriteTVShowsPage from "./pages/favouriteTVShowsPage"; 
import FavouritePeoplePage from "./pages/favouritePeoplePage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import PeopleDetailPage from "./pages/peopleDetailPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import PeopleContextProvider from "./contexts/peopleContext";
import AddMovieTVShowPage from './pages/addTVShowReviewPage'
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import TVShowsAiringTodayPage from './pages/tvShowsAiringTodayPage'
import PlayListMoviesPage from "./pages/playListPage";
import TVShowsHomePage from "./pages/tvShowsHomePage";
import TVShowContextProvider from "./contexts/tvShowsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
        <MoviesContextProvider>
        <TVShowContextProvider>
        <PeopleContextProvider>
        <Routes>
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/reviews/tv/form" element={<AddMovieTVShowPage/>} />
        <Route path="/reviews/:id" element={<MovieReviewPage/>} />
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/playList" element={<PlayListMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/:id/cast" element={<MovieCast />} />
        <Route path="/movies/:id/crew" element={<MovieCrew />} />
        <Route path="/tvshows/" element={<TVShowsHomePage />} />
        <Route path="/tvshows/:id" element={<TVShow />} />
        <Route path="/tvshows/favourites/" element={<FavouriteTVShowsPage />} />
        <Route path="/tvshows/today" element={<TVShowsAiringTodayPage />} />
        <Route path="/people" element={<PeopleHomePage />} />
        <Route path="/people/favourites" element={<FavouritePeoplePage />} />
        <Route path="/people/:id" element={<PeopleDetailPage />} />
        <Route path="/people/:id/movies" element={<PersonMoviesPage />} />
        <Route path="/people/:id/tvShows" element={<PersonTVShowsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </PeopleContextProvider>
        </TVShowContextProvider>
        </MoviesContextProvider>
        <SiteHeader />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)