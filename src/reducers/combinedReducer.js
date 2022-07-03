import { combineReducers } from "redux";
import bodyReducer from "./bodyReducer";
import notesReducer from "./notesReducers";
import titleReducer from "./titleReducer";

const combinedReducer = combineReducers({
    notes: notesReducer,
    title: titleReducer,
    body: bodyReducer
});

export default combinedReducer;