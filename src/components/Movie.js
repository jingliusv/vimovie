import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../img/no-image-w500.png';

const Movie = ({ movie, noTitle=false }) => {
    return (
        <React.Fragment>
            <Link to={`/movie/${movie.id}`}>
                <img className={noTitle ? "" : "ui medium image"} src={ movie.poster_path ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}` : Image } alt={movie.title}/> 
            </Link>
            {!noTitle && <h4>{movie.title}</h4>}
        </React.Fragment>
    );
};

export default Movie;