import React from 'react';
import img from '../img/no-image.png';

const Actor = ({ actor }) => {
    return (
        <React.Fragment>
            <img className="cast__img" src={actor.profile_path ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}` : img} alt={actor.name}/>
            <span>{actor.name}</span><br/>
            <span style={{ fontWeight: '300', opacity: '0.5', marginTop: '-2rem'}}>{actor.character}</span>
        </React.Fragment>
    );
}

export default Actor;
