import { useReducer } from "react";
import { TokenContext, TokenDispatchContext } from "./context.js";
import { tokenReducer } from "./reducer.js";

export default function Store({ children }) {
  const [token, dispatch] = useReducer(tokenReducer, "123");

  return (
    <TokenContext.Provider value={token}>
      <TokenDispatchContext.Provider value={dispatch}>
        {children}
      </TokenDispatchContext.Provider>
    </TokenContext.Provider>
  );
}
