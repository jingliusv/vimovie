import React from 'react';
import moviedb from '../apis/moviedb';
import Actor from './Actor';

class Cast extends React.Component{
    state = {
        movieId: null,
        cast: [],
        castIndex: 0,
        director: ''
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
            this.getCastInfo(this.state.movieId);
        }
    }

    getCastInfo = async (id) => {
        const res = await moviedb.get(`/movie/${id}/credits`, {
            params: {
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY
            }
        })

        const cast = res.data.cast;
        this.setState({ cast });
        const director = res.data.crew.find(person => {
            return person.job === 'Director';
        })

        if(director){
            this.setState({ director: director.name });
        }
    }

    prevCast = () => {        
        const { castIndex } = this.state;
        if(castIndex > 0){
            const newIndex = castIndex - 1;
            this.setState({ castIndex: newIndex });
        }
    }

    nextCast = () => {
        const { cast, castIndex } = this.state;

        const index = this.sliderCount(cast.length);

        if( castIndex < index){
            const newIndex = castIndex + 1;
            this.setState({ castIndex: newIndex });
        }
    }

    sliderCount = (count) => {
        return count % 5 === 0 ? (count / 5) - 1 : Math.floor(count / 5);
    }

    render(){
        const { cast, castIndex } = this.state;

        return(
            <React.Fragment>
                <div className="ui container">
                    <h3>Skådspelare</h3>
                </div>
                <div className="cast-slider">
                    <div className="cast-wrapper" style={{ transform: `translateX(-${castIndex * 100}vw)`, transition: 'all .8s ease' }}>
                        {cast.map(actor => (
                            <div className="cast-box" key={actor.cast_id}>
                                <Actor actor={actor} />
                            </div>
                        ))}
                    </div>
                    <div className="slider__buttons">
                        <button disabled={castIndex === 0} onClick={this.prevCast}>
                            <i className="chevron left icon"></i>
                        </button>
                        <button disabled={castIndex === this.sliderCount(cast.length)} onClick={this.nextCast}>
                            <i className="chevron right icon"></i>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Cast;