// Modules
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Containers
import YearPage from './containers/YearPage/YearPage';
import MonthPage from './containers/MonthPage/MonthPage';
import DayPage from './containers/DayPage/DayPage';
import EventPage from './containers/EventPage/EventPage';
import EventPageContainer from './containers/EventPageContainer/EventPageContainer';
import NotFound from './containers/NotFound/NotFound';


const Routes = () => (
  <Switch>
    <Route exact path="/event" component={EventPage} />
    <Route exact path="/event/:edit" component={EventPage} />
    <Route exact path="/event-page/:id" component={EventPageContainer} />
    <Route exact strict path="/:year" render={({ match }) => <YearPage {...match} />} />
    <Route exact strict path="/:year/:month" render={({ match }) => <MonthPage {...match} />} />
    <Route exact path="/:year/:month/:day" render={({ match }) => <DayPage {...match} />} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
