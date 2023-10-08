function tokenReducer(state, action) {
  switch (action.type) {
    case "changed": {
      return 123123123;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
