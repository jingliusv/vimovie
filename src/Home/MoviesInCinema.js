import React from 'react';
import { HomeHeader } from '../components/Header';

const MoviesInCinema = ({ moviesInCinema, selectedMovie, onSelectMovie }) => {  
    return(
        <div className="segment inCinema__wrapper">
            <HomeHeader selectedMovie={selectedMovie} />          
           
            <div className="ui container inCinema">
                {moviesInCinema.map(movie => (
                    <img key={movie.id} src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} alt={movie.title} onClick={() => {onSelectMovie(movie.id);}} />
                ))}
            </div>   
        </div>       
    )
}    

export default MoviesInCinema;