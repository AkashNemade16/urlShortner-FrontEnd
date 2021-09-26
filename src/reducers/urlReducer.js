const initialState = {
    urls: [],
    
}

export default function urlState(state = initialState, action) {
    switch (action.type) {
        case 'FETCH':
            return {
                ...state, urls: action.payload
            };
        case 'CREATE':
            return {
                ...state,
                urls: [action.payload]
            };
        
        default:
            return state;
    }
}