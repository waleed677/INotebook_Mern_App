import React from 'react';

const Alert = (props) => {
    return (
        props.content && ( <div className={`alert alert-${props.content.type}`} role="alert">
            {props.content.message}
        </div>
     ) );

};

export default Alert;
