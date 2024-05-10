# Assignment 2 - React App 

__Name:__ Jessica McCabe

__Video demonstration:__ https://youtu.be/5ijgfjUws0Q

This repository contains an implementation of the Movie Fans Web Application using the ReactJS library. 

### Features

+ Pagination 

Implemented for pages that list multiple cards 

+ Dropdown menu

Dropdown menu list for multiple options of pages to visit

+ Movies

Search movies via a form. Enter a movie name and all matching movies are returned
Movie detail page - This contains a further option to click a link to view cast of the movie or to view crew of the movie

+ TV Shows

TV Shows Home Page 
Todays TV Shows
Favourite TV Shows
Search TV Shows via form
TV Show detail page - This contains a further option to click a link to view similar tv shows

+ People

People Home Page
Favourite Actors
Search People via form
Person detail page - Containing further links to see all the persons movies or all the persons tv shows

+ Clickable Cards

Image area on the card clickable to bring user to the details page for movies, tv shows and people

+ Dark Theme Default

### Setup requirements.



### API endpoints




+ Discover list of movies - discover/movie
+ Movie details - movie/:id
+ Movie genres - /genre/movie/list
+ Movie Images - movie/:id/images
+ Movie Reviews - movie/:id/reviews
+ Upcoming Movies - movie/upcoming
+ Discover list of tv shows - discover/tv
+ TV Show Images - tv/:id/images
+ TV Show Reviews - tv/:id/reviews
+ Tv Show details - tv/:id
+ TV Shows  airing today - tv/airing_today
+ List of popular people - person/popular
+ TV Show Genres - genre/tv
+ Search for a person - person?query=:query
+ Show person details - person/:id
+ Get person images - person/:id/images
+ Get persons movie credits - person/:id/movie_credits
+ Get Persons tv credits - person/:id/tv_credits
+ Get Movie credits for cast and crew- movie/:id/credits
+ Get similar tv shows based on tv show id - tv/:id/similar
+ Search for TV Shows - search/tv?query=:query
+ Search for Movies - search/movie?query=:query
+ Search for people - search/person?query=:query


### Routing


+ /reviews/form - Form for writing a review for a movie
+ /reviews/tv/form - Form for writing a review for a tv show
+ /reviews/:id" - displays a specific review
+ /movies/favourites" - displays list of movies that were added to favourites
+ /movies/playList" - displays a list of movies that were added to playlist
+ /movies/upcoming" - displays a list of upcoming movies
+ /movies/:id" - displays the details of a selected movie
+ /movies/:id/cast" - displays a list of people who are the cast of a selected movie
+ /movies/:id/crew" - displays a list of people who are the crew of a selected movie
+ /movies/search/" - form to enter a movie name to search for movies
+ /movies/search/:query/results" - results of movie search showing a list of returned movies
+ /tvshows/" - page displaying list of tv shows
+ /tvshows/:id" - page to show tv show details of a selected tv show
+ /tvshows/search/" - page to display a form to search for tv shows
+ /tvshows/search/:query/results" - page to display a list of tv shows returned from the search
+ /tvshows/:id/similar" - page to show a list of tv shows similar to a selected tv show
+ /tvshows/favourites/" - page that shows a list of your favourite tv shows
+ /tvshows/today" - page to show a list of tv shows that are airing today
+ /people" - page to show a list of popular people
+ /people/favourites" - page to show a list of your favourite people
+ /people/:id" - page that shows the details of a selected person
+ /people/:id/movies" - page that shows a list of movies for a selected person 
+ /people/:id/tvShows" - page that shows a list of tv shows for a selected person
+ /people/search/" - page to show a form to search for people
+ /people/search/:query/results" - page that shows a list of people from search results



### Assignment 1 integration



+ Frontend and api are deployed via the one cdk but are not integrated.

### Independent learning (If relevant)



+  Menu Item Navigation - https://stackoverflow.com/questions/47873566/how-navigate-using-the-menuitem-material-ui-v1
+  Multiple UseQuery - https://community.apollographql.com/t/multiple-queries-in-a-single-component-with-usequery-hook/3825
+  UserQueries - https://tanstack.com/query/latest/docs/framework/react/reference/useQueries#usequeries
+  Deeper routes issues s3 - https://stackoverflow.com/questions/50727884/react-app-routes-issue-when-deployed-to-aws
+  Vite config issue - https://stackoverflow.com/questions/72618944/get-error-to-build-my-project-in-vite-top-level-await-is-not-available-in-the
