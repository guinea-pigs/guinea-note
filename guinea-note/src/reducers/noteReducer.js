
const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            let index = state.findIndex(note => note.id === action.data.id)
            if (index === -1) {
                return [...state, action.data]
            }
            return state;
        case 'DELETE':
            return state.filter((note) => note.id !== action.id)
        case 'EDIT':
            return state.map((note) => note.id === action.id ? { ...note, editing: !note.editing } : note)

        case 'ADD_EDIT_POST':
            return state.map((note) => {
                if (note.id === action.data.id) {
                    note.title = action.data.title
                    note.message = action.data.message
                    note.editing = !action.data.editing
                    return note;
                }

                return note;
            })
        case 'ADDING_NOTE':
            return state;
        case 'POST_EDIT_ERROR':
            return state.map((note) => {
                if (note.id === action.id) {
                    note.errorMessage = action.message;
                    return note;
                }
                return note;
            })
        case 'CLEAR_ERROR':
            return state.map((note) => {
                if (note.id === action.id) {
                    note.errorMessage = '';
                    return note;
                }
                return note;
            })
        default:
            return state
    }
}

export default noteReducer;