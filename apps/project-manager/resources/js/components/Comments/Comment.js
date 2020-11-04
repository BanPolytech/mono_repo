import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Comment(props) {


    return (
        <React.Fragment>
            {props.content}
        </React.Fragment>
    )
}

Comment.propTypes = {
    content: PropTypes.string
}
