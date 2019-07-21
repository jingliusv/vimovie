import React from 'react';
import Movie from '../components/Movie';

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
                        <div key={movie.id} className="four wide column">
                            <Movie movie={movie} />
                        </div> 
                    ))}    
                </div>
            }

        </div>
    )
}

export default UpcomingMovies;
