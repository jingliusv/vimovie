import React from 'react';
import moviedb from '../apis/moviedb';
import { Loader } from '../components/Loader';
import Cast from './Cast';
import SimilarMovie from './SimilarMovie';
import { Header } from '../components/Header';


class MovieDetail extends React.Component{
    state = {
        movie: [],
        movieId: null,
        director: {}
    }

    componentDidMount(){
        const { movieId } = this.props.match.params;
        this.setState({ movieId });
        this.getMovieDetail(movieId);
    }

    getMovieDetail = async (id) => {
        const res = await moviedb.get(`/movie/${id}`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE'
            }
        })
        this.setState({ movie: res.data });
    }

    render(){
        const { title, overview, runtime, poster_path, homepage, genres, release_date } = this.state.movie;

        const { movieId, movie } = this.state;

        if(!this.state.movie){
            return <Loader />;
        }


        return(
            <React.Fragment>
                <Header movie={movie} movieId={movieId} />        

                <div className="ui container">
                    <h3>Info</h3>

                    <div className="ui grid">
                        <div className="eleven wide column">
                            {
                                overview && 
                                <div className="ui inverted segment">
                                    <h5>Berättelse:</h5>
                                    <span>{overview}</span>
                                </div>
                            }
                            {
                                release_date &&
                                <div className="ui inverted segment">
                                    <h5>Preminär:</h5>
                                    <span>{release_date}</span>
                                </div>
                            }
                            {
                                runtime !== 0 &&
                                <div className="ui inverted segment">
                                    <h5>Tid: </h5>
                                    <span>{runtime} minuter</span><br/>
                                </div>
                            }

                            <div className="ui inverted segment">
                                <h5>Genre:</h5>
                                { genres && 
                                    genres.map(genre => (
                                            <span key={genre.id}>{genre.name} </span>
                                    ))
                                }
                            </div>

                            { homepage && 
                                <div className="ui inverted segment">
                                    <a target="_blank" rel="noopener noreferrer" href={homepage}><i className="linkify icon"></i></a>
                                </div>
                            }
                        </div>

                        <div className="five wide column">
                            { poster_path && <img className="ui fluid image" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />}
                        </div>
                    </div>
                    
                </div>

                <Cast movieId={movieId}/>

                <SimilarMovie movieId={movieId}/>
            </React.Fragment>
        )
    }
}

export default MovieDetail;