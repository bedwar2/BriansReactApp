import React, { PropTypes} from "react";

export const AddItUp = (props) => {

    /*
    AddItUp.propTypes = {
        a: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired
    };
    */

    return (
        <>
        { props.a == null || props.b == null || props.a.length === 0 || props.b.length === 0  ? 
            <p>Waiting for Input</p>
            :
            <h2>
                {props.a} + {props.b} = {Number(props.a) + Number(props.b)}
            </h2>
        }   
        </>
    );


}