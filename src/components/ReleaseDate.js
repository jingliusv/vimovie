import React, { Component } from 'react';
import moviedb from '../apis/moviedb';

class ReleaseDate extends Component {
    state = {
        movieId: '',
        releaseDate: '',
        originalDate: ''
    }

    componentDidMount(){
        if(this.props.movieId){
            this.getReleaseDate(this.props.movieId);
            this.setState({ originalDate: this.props.date });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.movieId !== prevState.movieId || nextProps.date !== prevState.date ){
            return { movieId: nextProps.movieId, originalDate: nextProps.date }
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.movieId !== this.props.movieId){
            this.setState({ movieId: this.props.movieId });
            this.getReleaseDate(this.state.movieId);
        }
        if(prevProps.date !== this.props.date){
            this.setState({ originalDate: this.props.date })
        }
    }

    getReleaseDate = async (id) => {
        let data;
        const res = await moviedb.get(`/movie/${id}/release_dates`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY
            }
        })

        if(res.data.results && res.data.results.some(data => data.iso_3166_1 === "SE")){
            data = res.data.results.filter(data => {
                return data.iso_3166_1 === "SE";
            })

            const date = data[0].release_dates[0].release_date;
            const releaseDate = date.replace('T00:00:00.000Z', ' Sverige');
            // console.log(releaseDate)
            this.setState({ releaseDate });
        }
    }

    render() {

        return (
            <React.Fragment>
                {this.state.releaseDate ? this.state.releaseDate : this.state.originalDate }
            </React.Fragment>
        )
    }
}

export default ReleaseDate;
