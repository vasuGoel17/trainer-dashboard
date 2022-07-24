import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HealthDashboard from "../Components/HealthDashboard/HealthDashboard";
import Nutrition from "../Components/Nutrition/Nutrition";
import Workout from "../Components/Workout/Workout";


export default function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HealthDashboard} />
                <Route path=":id/workout" component={Workout} />
                <Route path=":id/nutrition" component={Nutrition} />
            </Switch>
        </Router>
    );
}


