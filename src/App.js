// @flow
import React from "react"
import Component from "./Component.js"
import * as r from "recompose"

const StatelessApp = ({ style, count }) => {
  return (
    <div style={style}>
      {count}
      <Component />
    </div>
  )
}

const withCounter = r.compose (
  r.withState ("count", "setCount", 0),
  r.lifecycle ({
    componentDidMount () {
      this.interval = setInterval (
        () => this.props.setCount (this.props.count + 1),
        200,
      )
    },

    componentWillUnmount () {
      clearInterval (this.interval)
    },
  }),
)

const App = r.compose (
  r.pure,
  withCounter,
  r.withProps ({ "style": { "color": "blue" } }),
) (StatelessApp)

export default require ("react-hot-loader").hot (module) (App)
