import React, { Component } from 'react';
import moviedb from '../apis/moviedb';
import Movie from '../components/Movie';
import uuid from 'uuid';
import { InlineLoader } from '../components/Loader';
import Fade from 'react-reveal/Fade';

class NowPlaying extends Component {
    state = {
        movies: [],
        totalPages: null,
        startPage: 1,
        loading: false
    }

    componentDidMount(){
        this.getMovies();
    }

    getMovies = async () => {
        const { startPage } = this.state;

        const res = await moviedb.get(`/movie/now_playing`, {
            params:{
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                page: `${startPage}`,
                region: 'se'
            }
        });

        // console.log(res.data.total_pages)
        this.setState({movies: res.data.results, totalPages: res.data.total_pages - 1, startPage: startPage + 1 });
    }

    fetchMore = async () => {
        const { movies, startPage, totalPages } = this.state;
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ 
                loading: false
            })
        }, 2000)

        if(totalPages > 0){
            const res = await moviedb.get(`/movie/now_playing`, {
                params:{
                    api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                    language: 'sv-SE',
                    page: `${startPage}`,
                    region: 'se'
                }
            });
    
            this.setState({movies: movies.concat(res.data.results), totalPages: totalPages - 1, startPage: startPage + 1 });
        }
    }

    render() {
        const { movies, totalPages } = this.state;
 
        return (
            <Fade right>
                <React.Fragment>
                    <div className="ui container">
                        <h3 style={{ paddingTop: '12rem', textAlign: 'center' }}>Alla filmer På Bio</h3>
                    </div>
                    <div id="scroll">
                        <div className="ui container">                  
                            {
                                movies &&
                                <div className="ui grid upcoming">
                                    {movies.map(movie => ( 
                                        <div key={uuid.v4()} className="ui four wide column">                 
                                            <Movie movie={movie} />
                                        </div>
                                    ))}    
                                </div>
                            }
                                                
                            <button
                                className={ totalPages !== 0 ? 'btn--load' : 'btn--hide'}
                                onClick={this.fetchMore}
                            >
                                <i className="caret down icon"></i> Visa Fler  ({totalPages})<i className="caret down icon"></i>
                            </button>
                            
                            { this.state.loading ? <div className=""><InlineLoader /></div> : "" }
                        </div>               
                    </div>
                </React.Fragment>
            </Fade>
        )
    }
}

export default NowPlaying;
