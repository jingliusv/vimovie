import React, { Component } from 'react';
import moviedb from '../apis/moviedb';

class ReleaseDate extends Component {
    state = {
        movieId: '',
        releaseDate: ''
    }

    componentDidMount(){
        if(this.props.movieId){
            this.getReleaseDate(this.props.movieId);
        }
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
            this.getReleaseDate(this.state.movieId);
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
            const releaseDate = date.replace('T00:00:00.000Z', '');
            // console.log(releaseDate)
            this.setState({ releaseDate });
        } else {
            this.setState({ releaseDate: this.props.date })
        }

    }

    render() {
        return (
            <React.Fragment>
                {this.state.releaseDate}
            </React.Fragment>
        )
    }
}

export default ReleaseDate;
