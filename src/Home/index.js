import React from 'react';
import moviedb from '../apis/moviedb';
import MoviesInCinema from './MoviesInCinema';
import UpcomingMovies from './UpcomingMovies';
import TopMovies from './TopMovies';
import { Loader } from '../components/Loader';


class Home extends React.Component{
    state = {
        moviesInCinema: [],
        upcomingMovies: [],
        topMovies: [],
        selectedMovie: null
    }

    componentDidMount(){
        this.getMovies('/movie/now_playing', 'cinema');
        this.getMovies('/movie/upcoming', 'upcoming');
        this.getMovies('/trending/movie/week', 'top');
    }

    // get all the movies from different places
    getMovies = async (location, type) => {
        const res = await moviedb.get(`${location}`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                page: 1,
                region: 'SE'
            }
        });

        if(type === "upcoming"){
            this.setState({ upcomingMovies: res.data.results.splice(0, 8) });
        } else if(type === "top"){
            this.setState({ topMovies: res.data.results });
        } else if(type === "cinema"){
            const movies = res.data.results.splice(0, 5);
            this.setState({ moviesInCinema: movies });
            this.setState({ selectedMovie: movies[0] });
        }
        
    }
    
    onSelectMovie = (id) => {
        const movie = this.state.moviesInCinema.find(element => {
            return element.id === id;
        })

        this.setState({selectedMovie: movie});
    }

    render(){
        const { upcomingMovies, moviesInCinema, topMovies, selectedMovie } = this.state;

        if(!moviesInCinema || !upcomingMovies || !topMovies){
            return(
                <Loader />
            )
        }

        return(
            <React.Fragment>
                <section>
                    <MoviesInCinema 
                        moviesInCinema={moviesInCinema} 
                        selectedMovie={selectedMovie} 
                        onSelectMovie={this.onSelectMovie}
                    />
                </section>
                <section>
                    <UpcomingMovies 
                        upcomingMovies={upcomingMovies}
                    />
                </section>
                <section>
                    <TopMovies 
                        topMovies={topMovies}
                    />
                </section>
            </React.Fragment>            
        )
    }
}

export default Home;