export default (state = 0, action) => {
  switch (action.type) {
  case "COUNTER_PLUS_ONE":
    return state + 1

  default: return state
  }
}
