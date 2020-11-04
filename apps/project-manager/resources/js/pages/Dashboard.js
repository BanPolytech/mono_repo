import React from 'react';
import {Redirect} from "react-router-dom";

export default function Dashboard() {
    console.log("Dashboard")
    return (
        <Redirect from="/" to="/project" />
    )
}
