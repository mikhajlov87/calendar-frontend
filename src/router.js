import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Year from './components/Year/Year';
import Month from './components/Month/Month';
import Day from './components/Day/Day';
import Event from './components/Events/Events';

const Router = () =>
  (<Switch>
    <Route
      exact path="/:year"
      render={newYear => (
        <Year
          {...newYear}
        />)}
    />
    <Route
      exact path="/:year/:month"
      render={(newMonth, newYear) => (
        <Month
          {...newMonth}
          {...newYear}
        />)}
    />
    <Route
      exact path="/:year/:month/:day"
      render={(newDay, newMonth) => (
        <Day
          {...newDay}
          {...newMonth}
        />)}
    />
    <Route
      exact path="/:year/:month/:day/:event"
      render={(newDay, newMonth) => (
        <Event
          {...newDay}
          {...newMonth}
          pageName="add event"
          resetName="clear"
          submitName="save"
        />)}
    />
    <Route
      exact path="/:year/:month/:day/:event/:eventId"
      render={(newDay, newMonth, id) => (
        <Event
          {...newDay}
          {...newMonth}
          {...id}
          pageName="update event"
          resetName="cancel"
          submitName="update"
        />)}
    />
  </Switch>);

export default Router;
