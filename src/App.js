// @flow
import React from "react"
import { composeWithDevTools } from "redux-devtools-extension"
import { Route } from "react-router"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import createHistory from "history/createHashHistory"
import { connectRouter, ConnectedRouter, routerMiddleware } from "connected-react-router"
import { hot } from "react-hot-loader"

import reducers from "./reducers/"

import NavBar from "./containers/NavBar.js"
import SomeComponent from "./components/SomeComponent.js"

const Home = () => <div>Home</div>
const Foo = () => <div>Foo</div>
const Bar = () => <div>Bar</div>
const NotFound = (props) => <div>Route not found: {props.location.pathname}</div>

// eslint-disable-next-line no-shadow
const history = createHistory ()

const allMiddleware = applyMiddleware (
  routerMiddleware (history),
)

const allReducers = combineReducers ({
  ...reducers,
})

const initialStore = {}
const store = createStore (
  connectRouter (history) (allReducers),
  initialStore,
  composeWithDevTools (allMiddleware),
)

const Routes = hot (module) (() =>
  <div>
    <NavBar />
    <Route exact path="/" component={Home} />
    <Route exact path="/foo" component={Foo} />
    <Route exact path="/bar" component={Bar} />
    <Route exact path="/somecomponent" component={SomeComponent} />
  </div>
)

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
)
