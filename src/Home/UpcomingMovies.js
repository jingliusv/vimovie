import React from 'react';
import Movie from '../components/Movie';
import Fade from 'react-reveal/Fade';

const UpcomingMovies = ({ upcomingMovies }) => {        
    return (
        <div className="ui container">            
            <h3>
                <i className="film icon"></i> Kommande filmer
            </h3>
            {
                upcomingMovies &&
                <div className="ui grid upcoming">
                    {upcomingMovies.map(movie => (
                        <Fade bottom key={movie.id}>
                            <div className="four wide column">
                                <Movie movie={movie} />
                            </div> 
                        </Fade>
                    ))}    
                </div>
            }

        </div>
    )
}

export default UpcomingMovies;
