import React from 'react';
import moviedb from '../apis/moviedb';
import { InlineLoader } from '../components/Loader';
import Search from '../components/Search';
import Movie from '../components/Movie';
import uuid from 'uuid';

class MoviePage extends React.Component{
    state = {
        movies: [],
        startPage: 1,
        totalPages: null,
        loading: false,
        isSearch: false,
        searchTerm: ''
    }

    componentDidMount(){
        this.getMovies();          
    }

    getMovies =  async () => {        
        const res = await moviedb.get('/movie/popular', {
            params: {
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                page: 1
            }
        })
        this.setState({ movies: res.data.results, totalPages: res.data.total_pages - 1 });
        this.setState({ startPage: this.state.startPage + 1 });
    }

    fetchMore = async (location, query="") => {
        const { startPage, totalPages } = this.state;
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ 
                loading: false
            })
        }, 2000)

        const res = await moviedb.get(`${location}`, {
            params: {
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                page: `${startPage}`,
                query: `${query}`
            }
        })
        this.setState({ movies: this.state.movies.concat(res.data.results), startPage: startPage + 1, totalPages: totalPages - 1 });
    }

    onSearchTermSubmit = async (term) => {
        this.setState({ searchTerm: term });
        const res = await moviedb.get('/search/movie', {
            params: {
                api_key: process.env.REACT_APP_THE_MOVIE_DB_API_KEY,
                language: 'sv-SE',
                region: 'se',
                page: 1,
                query: `${term}`
            }
        })
        this.setState({ movies: res.data.results, isSearch: true, totalPages: res.data.total_pages - 1, searchPage: this.state.searchPage + 1 });
    }

    
    render(){
        const { movies, isSearch, searchTerm, totalPages } = this.state;

        return(
            <React.Fragment>
                <div className="ui container">
                    <Search onSearchTermSubmit={this.onSearchTermSubmit}/> 
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
                        { movies.length === 0 && <h5>Tyvärr, vi hittade inte filmer med texten "{searchTerm}".</h5> }                        
                        <button 
                            className={ totalPages !== 0 ? 'btn--load' : 'btn--hide'} 
                            onClick={() => isSearch ? this.fetchMore('/search/movie', searchTerm) : this.fetchMore('/movie/popular') }
                        >
                            <i className="caret down icon"></i> Visa Fler ({totalPages})  <i className="caret down icon"></i>
                        </button>
                        
                        { this.state.loading ? <div className=""><InlineLoader /></div> : "" }
                    </div>               
                </div>
            </React.Fragment>
        )
    }
}

export default MoviePage;