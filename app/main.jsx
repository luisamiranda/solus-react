import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'

import PlayerContainer from './containers/PlayerContainer'
import AppContainer from './containers/AppContainer'
import Time from './components/Time'
import Admin from './components/Admin'
import Weather from './components/Weather'

render(
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        {/* <Route path="/time" component={Time} />
        <Route path="/weather" component={Weather} />
        <Route path="/admin" component={Admin} />
        <Route path="/player" component={PlayerContainer} /> */}
      </Route>
    </Router>,
  document.getElementById('main')
)
