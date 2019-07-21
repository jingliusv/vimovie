import React from 'react';

class Search extends React.Component {
    state = { searchTerm: '' }

    onInputChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSearchTermSubmit(this.state.searchTerm);
    }

    render(){
        return (
            <div className="search-bar ui search" style={{ padding: "9rem 0 2rem 0" }}>
                <form onSubmit={this.onFormSubmit} className="ui icon input">
                    <input className="prompt" type="text" placeholder="Sök film... (Tryck Enter)" onChange={this.onInputChange} value={this.state.searchTerm} />
                    <i className="search icon"></i>
                </form>
            </div>
        );
    }
};

export default Search;