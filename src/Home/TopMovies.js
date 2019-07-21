import React from 'react';
import MovieSlider from '../components/MovieSlider';

const TopMovies = ({ topMovies, sliderIndex, nextMovie, prevMovie }) => {
    return(
        <div className="trending">
            <div className="ui container">
                <h3>
                    <i className="film icon"></i> Nyligen populär
                </h3>
            </div>
            <MovieSlider movies={topMovies} />
        </div>
    );
}

export default TopMovies;