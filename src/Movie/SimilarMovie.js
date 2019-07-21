import React, { Component } from 'react';
import moviedb from '../apis/moviedb';
import MovieSlider from '../components/MovieSlider';

class SimilarMovie extends Component {
    state = {
        movieId: null,
        movies: [],
        sliderIndex: 0
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.movieId !== prevState.movieId){
            return { movieId: nextProps.movieId }
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.movieId !== this.props.movieId){
            this.setState({ movieId: this.props.movieId });
            this.getSimilarMovieInfo(this.state.movieId);
        } 
    }

    getSimilarMovieInfo = async (id) => {
        const res = await moviedb.get(`/movie/${id}/similar`, {
            params: {
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                page: 1
            }
        })

        const movies = res.data.results;
        this.setState({ movies });
    }


    render() {
        const {movies} = this.state;
        return (
            <React.Fragment>                   
                { movies.length > 0 && 
                    <div>
                        <div className="ui container">
                            <h3>Liknande filmer</h3>
                        </div>
                        <MovieSlider movies={movies} />
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default SimilarMovie;
