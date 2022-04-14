import reducer from "./reducers";
import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(
  reducer,
  /* preloadedState, */ composeWithDevTools()
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
);

export default store;
