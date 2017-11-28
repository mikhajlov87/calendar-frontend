// Modules
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Containers
import YearPage from './containers/YearPage/YearPage';
import MonthPage from './containers/MonthPage/MonthPage';
import DayPage from './containers/DayPage/DayPage';
import EventPage from './containers/EventPage/EventPage';
import ViewEventPage from './containers/ViewEventPage/ViewEventPage';
import NotFound from './containers/NotFound/NotFound';


const Routes = () => (
  <Switch>
    <Route exact path="/create-event" component={EventPage} />
    <Route exact path="/edit-event" render={() => <Redirect to="/create-event" />} />
    <Route exact path="/edit-event/:eventItemId" component={EventPage} />
    <Route exact path="/event-page" render={() => <Redirect to="/create-event" />} />
    <Route exact path="/event-page/:eventItemId" component={ViewEventPage} />
    <Route exact strict path="/:year" render={({ match }) => <YearPage {...match} />} />
    <Route exact strict path="/:year/:month" render={({ match }) => <MonthPage {...match} />} />
    <Route exact path="/:year/:month/:day" render={({ match }) => <DayPage {...match} />} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
