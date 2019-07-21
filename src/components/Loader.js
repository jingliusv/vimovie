import React from 'react';

export const InlineLoader = () => {
    return(
        <div className="ui active inline loader centered" style={{ marginTop: "1.5rem"}}></div>
    )
}

export const Loader = () => {
    return(
        <div className="ui active dimmer">
            <div className="ui large text loader">Ladda data...</div>
        </div>
    )
}