import React from "react"
import { connect } from "react-redux"
import { push } from "connected-react-router"

export const mapStateToProps = (state) => {
  return {
    "counter": state.counter,
  }
}
export const mapDispatchToProps = (dispatch) => ({
  "increment": () => dispatch ({ "type": "COUNTER_PLUS_ONE" }),
  "push": (path) => dispatch (push (path)),
})

let NavBar = (props) => {
  return (
    <div>
      <button onClick={() => props.push ("/foo")}>Foo</button>
      <button onClick={() => props.push ("/bar")}>Bar</button>
      <button onClick={() => props.push ("/somecomponent")}>Some component</button>
      <hr />
      Counter: {props.counter}
      <button onClick={props.increment}>Increment</button>
      <hr />
    </div>
  )
}

NavBar = connect (
  mapStateToProps,
  mapDispatchToProps,
) (NavBar)

export default NavBar
