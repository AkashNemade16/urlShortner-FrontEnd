const initialState = {
    userUrls: []
}

export default function userUrlState(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USER_URLS':
            return {
                ...state, userUrls: [action.payload]
            };
        default:
            return state;
    }
}