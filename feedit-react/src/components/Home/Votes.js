import React from 'react';

const style = {
    background: '#cccccc',
    borderRadius: '0.8em',
    color: '#ffffff',
    display: 'inline-block',
    fontWeight: 'bold',
    lineHeight: '4em',
    marginRight: '5px',
    textAlign: 'center',
    width: '4em'
}

const Votes = ({ number }) =>
    <span
        style={style}
    >
        {number}
    </span>

export default Votes;