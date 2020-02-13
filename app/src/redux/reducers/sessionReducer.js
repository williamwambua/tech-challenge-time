const initialState = {
    isLoading: false,
    isFailure: false,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SESSIONS_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'ADD_SESSION_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
                showResults: true,
            }
        case 'ADD_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: action.data,
            }
        case 'UPDATE_SESSION_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
                showResults: true,
            }
        case 'UPDATE_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: action.data,
            }
        case 'CLEAR_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: null,
                showResults: false,
            }
        case 'SESSIONS_RECEIVE':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                sessions: action.data,
            }
        case 'ACTIVE_SESSION':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'ACTIVE_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: action.data
            }
        case 'RETRIEVE_SESSION_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'RETRIEVE_SESSION_RESULTS':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: action.data
            }
        case 'DEFAULT_SESSION_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
            }
        case 'DEFAULT_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                session: action.data
            }
        case 'DELETE_SESSION_REQUEST':
            return {
                ...state,
                isLoading: true,
                isFailure: false,
                showResults: true,
            }
        case 'DELETE_SESSION_RESULT':
            return {
                ...state,
                isLoading: false,
                isFailure: false,
            }
        case 'SESSIONS_FAILURE':
            return {
                ...state,
                isLoading: false,
                isFailure: true,
            }
        default:
            return state
    }
};

export default sessionReducer;