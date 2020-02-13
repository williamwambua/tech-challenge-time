
class ApiService {
    constructor() {
        const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/graphql';
        this.apiUrl = API_BASE_URL
        this.sessionFields = `{
            id
            name
            start
            end
            active
        }`
        this.sessionDeleteFields = `{
            returning {
                id
                name
                start
                end
                active
            }
        }`
        this.userFields = `{
            id
            name
            email
            jwt
        }`;
    }

    getCookie = (name) => {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    async getUserLogin(resource, params, fields) {
        const query = `{${resource} ${this.paramsToString(params, "select")} ${fields}}`
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query}),
        })
        if (res.ok) {
            const body = await res.json();
            return body.data
        } else {
            throw new Error(res.status);
        }
    }

    async createUserLogin(resource, params, fields, operation) {
        const query = `mutation {${resource} ${this.paramsToString(params, operation)} ${fields}}`
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query}),
        })
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    async getGraphQlData(resource, params, fields) {
        const query = `{${resource} ${this.paramsToString(params, "select")} ${fields}}`
        const token = this.getCookie('auth-token');
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({query}),
        })
        if (res.ok) {
            const body = await res.json();
            return body.data
        } else {
            throw new Error(res.status);
        }
    }

    async updateGraphQlData(resource, params, fields, operation) {
        const query = `mutation {${resource} ${this.paramsToString(params, operation)} ${fields}}`
        const token = this.getCookie('auth-token');
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({query}),
        })
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    async loginUser(params = {}) {
        const data =await this.getUserLogin('loginUser', params, this.userFields)
        return data.loginUser
    }

    async registerUser(params = {}) {
        const data =await this.createUserLogin('createUser', params, this.userFields, "create")
        return data.createUser
    }

    async getSessions(params = {}) {
        const data = await this.getGraphQlData('sessions', params, this.sessionFields)
        return data.sessions
    }

    async getSession(params = {}) {
        const data = await this.getGraphQlData('session', params, this.sessionFields)
        return data.session
    }

    async getActiveSession(params = {}) {
        const data = await this.getGraphQlData('activeSession', params, this.sessionFields)
        return data.activeSession
    }

    async createSession(params = {}) {
        const data = await this.updateGraphQlData('createSession', params, this.sessionFields, "create")
        return data.createSession
    }

    async updateSession(params = {}) {
        const data = await this.updateGraphQlData('updateSession', params, this.sessionFields, "update")
        return data.updateSession
    }

    async deleteSession(params = {}) {
        const data = await this.updateGraphQlData('deleteSession', params, this.sessionDeleteFields, "delete")
        return data.deleteSession
    }

    paramsToString(params, operation) {
        if (operation==="update") {
            return params
        }

        let paramString = ''
        if (params.constructor === Object && Object.keys(params).length) {
            let tmp = [];
            for (let key in params) {
                let paramStr = params[key];
                if(paramStr !== '') {
                    if (typeof params[key] === 'string') {
                        paramStr = `"${paramStr}"`
                    }
                    tmp.push(`${key}:${paramStr}`)
                }
            }
            if (tmp.length) {
                switch(operation) {
                    case "create":
                        return paramString = `(data:{${tmp.join()}})`
                    default: return paramString = `(${tmp.join()})`
                }
            }
        }
        return paramString
    }
}

export default new ApiService()