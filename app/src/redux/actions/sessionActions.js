import ApiService from '../../services/ApiService'

const sessionsRequest = () => ({
    type: 'SESSIONS_REQUEST'
})

const sessionsReceive = (data) => ({
    type: 'SESSIONS_RECEIVE',
    data
})

const addSessionRequest = () => ({
    type: 'ADD_SESSION_REQUEST'
})

const addSessionResult = (data) => ({
    type: 'ADD_SESSION_RESULT',
    data
})

const updateSessionRequest = () => ({
    type: 'UPDATE_SESSION_REQUEST'
})

const updateSessionResult = (data) => ({
    type: 'UPDATE_SESSION_RESULT',
    data
})

const clearSessionResult = () => ({
    type: 'CLEAR_SESSION_RESULT',
})

const sessionFailure = () => ({
    type: 'SESSIONS_FAILURE'
})

const activeSessionRequest = () => ({
    type: 'ACTIVE_SESSION'
})

const retrieveSessionRequest = () => ({
    type: 'RETRIEVE_SESSION_REQUEST'
})

const retrieveSessionResult = (data) => ({
    type: 'RETRIEVE_SESSION_RESULTS',
    data
})

const deleteSessionRequest = () => ({
    type: 'DELETE_SESSION_REQUEST'
})

const deleteSessionResult = () => ({
    type: 'DELETE_SESSION_RESULT'
})

const defaultSessionRequest = () => ({
    type: 'DEFAULT_SESSION_REQUEST'
})

const defaultSessionResults = (data) => ({
    type: 'DEFAULT_SESSION_RESULT',
    data
})

export const loadSessions = (params, cookies) => async dispatch => {
    try {
        dispatch(sessionsRequest())
        const data = await ApiService.getSessions(params)

        // create or update the cookie that stores the current task (if any) being tracked
        if (data.length <= 0) {
            cookies.remove('active-session', { path: '/' });
        }
        else {
            dispatch(activeSessionRequest())
            const updatedParams = {
                userId: params.userId,
                active: true
            }
            const data2 = await ApiService.getActiveSession(updatedParams)

            if (!data2) {
                cookies.remove('active-session', { path: '/' });
            }
            else {
                let expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                cookies.set('active-session', data2.id, { path: '/', expires: expiry });
            }
        }

        // update the expiry time for the cookies that store the user's session data
        cookies && updateCookies(cookies);

        dispatch(sessionsReceive(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

const updateCookies = (cookies) => {
    let expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);
  
    cookies.set('auth-token', cookies.get('auth-token'), { path: '/', expires: expiry });
    cookies.set('name', cookies.get('name'), { path: '/', expires: expiry });
    cookies.set('email', cookies.get('email'), { path: '/', expires: expiry });
    cookies.set('userId', cookies.get('userId'), { path: '/', expires: expiry });
}

export const defaultSession = (params) => async dispatch => {
    try {
        dispatch(defaultSessionRequest())
        const data = await ApiService.getLatestSession(params)
        dispatch(defaultSessionResults(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

export const createSession = (params ) => async dispatch => {
    try {
        dispatch(addSessionRequest())
        const data = await ApiService.createSession(params);

        dispatch(addSessionResult(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

export const retrieveSessionForUpdate = (params) => async dispatch => {
    try {
        dispatch(retrieveSessionRequest())
        const data = await ApiService.getSession(params)
        dispatch(retrieveSessionResult(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

export const updateSession = (params) => async dispatch => {
    try {
        dispatch(updateSessionRequest())
        const data = await ApiService.updateSession(params)
        dispatch(updateSessionResult(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

export const deleteSession = (params) => async dispatch => {
    try {
        dispatch(deleteSessionRequest())
        const data = await ApiService.deleteSession(params)
        dispatch(deleteSessionResult(data))
    } catch(e) {
        console.error(e.message)
        dispatch(sessionFailure())
    }
}

export const clearSessionResults = () => async dispatch => {
    dispatch(clearSessionResult())
}