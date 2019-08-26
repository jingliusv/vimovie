import React from 'react';
import { Link } from 'react-router-dom';
import { HomeHeader } from '../components/Header';
import Zoom from 'react-reveal/Zoom';

const MoviesInCinema = ({ moviesInCinema, selectedMovie, onSelectMovie }) => {  
    return(
        <div className="segment inCinema__wrapper">
            <Zoom>
                <HomeHeader selectedMovie={selectedMovie} /> 
            </Zoom>         
           
            <div className="ui container inCinema">

                {moviesInCinema.map(movie => (
                    <img key={movie.id} src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} alt={movie.title} onClick={() => {onSelectMovie(movie.id);}} />
                ))}
                
                
                <Link style={{ display: 'flex', alignItems: 'center', fontSize: '1.6rem', fontWeight: '400', opacity: '0.8', zIndex: '-1' }} to="/nowplaying" className="ui black icon button">Visa Fler <i className="angle double right icon"></i></Link>                
            </div>   
        </div>       
    )
}    

export default MoviesInCinema;