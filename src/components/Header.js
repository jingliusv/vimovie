import React from 'react';
import Video from '../components/Video';
import ReleaseDate from '../components/ReleaseDate';

export const HomeHeader = ({selectedMovie}) => {
    return(
        <React.Fragment>
        {                
            selectedMovie && 
            <div 
                className="header" 
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .8) 28%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, .1)), url(https://image.tmdb.org/t/p/w1280/${selectedMovie.backdrop_path})`
                }}
            >   
                <div className="header__content">                    
                       
                    <h2>{selectedMovie.title}</h2>
                    <span className="header__icon">
                        <i className="calendar alternate outline icon"></i>Preminär <ReleaseDate movieId={selectedMovie.id}/>
                    </span>
                    <p style={{ padding: "2rem 0" }}>{selectedMovie.overview}</p>
                                                         
                </div>
                <Video movieId={selectedMovie.id} /> 
            </div>
        }
        </React.Fragment>
    )
}

export const Header = ({movie, movieId}) => {
    const { title, overview, backdrop_path, vote_average } = movie;

    const headerStyle = {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .8) 28%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, .1)), url(https://image.tmdb.org/t/p/w1280/${backdrop_path})`
    }

    return (
        <div className="header" style={ backdrop_path && headerStyle } >            
            <div className="header__content">
                <h2>{title}</h2>
                <p>{overview}</p>
                {
                    vote_average !== 0.0 &&
                    <span className="header__icon"><i className="thumbs up outline icon"></i>{vote_average} / 10</span>
                }
            </div>
        
            <Video movieId={movieId}/>
        </div>
    );
}


