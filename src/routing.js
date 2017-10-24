import React from 'react';
import { Switch, Route } from 'react-router-dom';
import YearPage from './containers/yearPage/YearPage';
import MonthPage from './containers/monthPage/MonthPage';
import DayPage from './containers/dayPage/DayPage';
import EventPage from './containers/eventPage/EventPage';
import NotFound from './containers/notFound/NotFound';


const Routes = () => (
  <Switch>
    <Route path="/create-event" component={EventPage} />
    <Route exact strict path="/:year" render={({ match }) => <YearPage {...match} />} />
    <Route exact strict path="/:year/:month" render={({ match }) => <MonthPage {...match} />} />
    <Route exact path="/:year/:month/:day" render={({ match }) => <DayPage {...match} />} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
