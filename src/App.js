import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Home';
import Movie from './Movie';
import MovieDetail from './Movie/MovieDetail';
import ScrollToTop from './components/ScrollToTop';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Layout>
                    <ScrollToTop>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/movie" exact component={Movie} />
                            <Route path="/movie/:movieId" exact render={(props) => <MovieDetail key={props.match.params.movieId} {...props} />} />
                        </Switch>
                    </ScrollToTop>
                </Layout>
            </Router> 
        )
    }
}

export default App;