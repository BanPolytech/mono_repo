import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Comment from "./Comment";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    saveButton: {
        display: "inline-block",
        fontSize: "small",
        verticalAlign: "bottom"
    }
}));

export default function CommentList(props) {

    const classes = useStyles();

    // useEffect if update
    useEffect(() => {
        //wip
    }, [props.comments])

    return (
        <List className={classes.root}>
            {props.comments.map((comment, indexComment) => (
                <div key={indexComment}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={comment.author + ' le ' + new Date(comment.date).toLocaleString()}
                            secondary={
                                <Comment
                                    content={comment.message}
                                />
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array
}
