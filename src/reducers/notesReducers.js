const myState = [];

const notesReducer = (state=myState,action) => {
    switch (action.type) {
        case "ADD":
            let {id,title,body,date} = action.payload;
            return [...state,{id,title,body,date}];
        case "REMOVE":
            let filtered = state.filter((el) => el.id !== action.payload.id);
            return filtered;
        case "REMOVE_ALL":
            return [];
        default:
            return state;
    }
}

export default notesReducer;