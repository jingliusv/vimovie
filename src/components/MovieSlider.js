import React, { Component } from 'react';
import Movie from './Movie';

class MovieSlider extends Component {
    state = {
        movies: [],
        sliderIndex: 0
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.movies !== prevState.movies){
            return { movies: nextProps.movies }
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.movies !== this.props.movies){
            this.setState({ movieId: this.props.movies });
        }
    }

    nextMovie = () => {
        const { movies, sliderIndex} = this.state;
        if(sliderIndex <= movies.length - 18){
            const newIndex = this.state.sliderIndex + 1;
            this.setState({ sliderIndex: newIndex });
        }
    }

    prevMovie = () => {
        const { sliderIndex } = this.state;
        if(sliderIndex > 0){
            const newIndex = this.state.sliderIndex - 1;
            this.setState({ sliderIndex: newIndex });
        }
    }
    

    render() {
        const { movies, sliderIndex } = this.state;

        return (
            <React.Fragment>
                {
                    movies &&
                    <div className="slider">
                        <div className="slider-wrapper" style={{ transform: `translateX(-${sliderIndex * 100}vw)`, transition: 'all .8s ease' }}>
                            {movies.map(movie => (
                                <Movie key={movie.id} movie={movie} noTitle={true} />
                            ))}
                        </div>
                        <div className="slider__buttons">
                            <button disabled={sliderIndex === 0} onClick={this.prevMovie}>
                                <i className="chevron left icon"></i>
                            </button>
                            <button disabled={sliderIndex === 3} onClick={this.nextMovie}>
                                <i className="chevron right icon"></i>
                            </button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default MovieSlider;
