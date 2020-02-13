import React from 'react';
import { connect } from 'react-redux';

import SessionList from '../components/sessionList';
import Pagination from '../components/pagination';
import SessionSearchForm from '../forms/sessionSearchForm';
import SessionFormContainer from './sessionFormContainer';

import { 
    loadSessions, 
    clearSessionResults } from '../redux/actions/sessionActions';

import Background from '../images/hourglass.jpg';

class SessionListContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formItems: null,
            userId: props.cookies.get('userId'),
            currentPage: 1,
            sessionsPerPage: 5,
            sessions: [],
            isSearch: false
        };
    }

    addSessionTimeline(event) {
        event.preventDefault();

        this.props.checkTimeline();
    }

    showForm(operation, session) {
        const sessionForm = 
        <SessionFormContainer 
            operation={operation}
            userId={this.state.userId}
            cookies={this.props.cookies}
            _session={session}
            reloadList={ 
                this.reload.bind(this) 
            }
            removeForm={
                this.removeSessionForm.bind(this)
            }
        />;

        this.setState({
            formItems: sessionForm
        });
    }

    showAddForm() {
        this.showForm("create", {});
    }

    showSessionCloseForm() {
        const _id = parseInt(this.props.cookies.get('active-session'), 10);
        this.showForm("close", this.userSessions(_id));
    }

    showEditForm(_id) {
        this.showForm("edit", this.userSessions(_id));
    }

    showDeleteConfirmation(_id) {
        this.showForm("delete", this.userSessions(_id));
    }

    userSessions(_id) {
        return this.props.sessions.find(({id}) => id == _id);
    }

    removeSessionForm(event) {
        event.preventDefault();
        const newState = this.state;

        newState.formItems = null;
        this.setState(newState);
        const data = {
            userId: parseInt(this.state.userId, 10)
        };
        const {cookies} = this.props;
        this.props.clearForm(data, cookies);
    }

    searchSessions(data) {
        const _name = data.name.trim();
        if (_name==="" && data.period==="select")
            this.setState({ sessions: this.props.sessions });
        else {
            const _start = new Date();
            const end = new Date();

            if (data.period === "day")
                _start.setDate(_start.getDate() - 1);
            else if (data.period === "week")
                _start.setDate(_start.getDate() - 7);
            else if (data.period === "month")
                _start.setMonth(_start.getMonth() - 1);

            if (_name==="") {
                let sessions = this.props.sessions.filter(({start}) =>
                    Date.parse(start) > _start && Date.parse(start) < end
                );
                this.setState({ sessions });
            }
            else {
                if (data.period==="select") {
                    let sessions = this.props.sessions.filter(({name}) =>
                        name === _name
                    );
                    this.setState({ sessions });
                }
                else {
                    let sessions = this.props.sessions.filter(
                        ({name, start}) => name === _name &&
                        (Date.parse(start) > _start && Date.parse(start) < end)
                    );
                    this.setState({ sessions });
                }
            }
        }
        this.setState({isSearch: true});
    }

    reload() {
        this.setState({ sessions: this.props.sessions, isSearch: false });
    }

    componentDidMount() {
        //load sessions here
        const data = {
            userId: parseInt(this.state.userId, 10)
        };
        const {cookies} = this.props;
        this.props.loadSessions(data, cookies);
    }

    render() {
        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>;
        }

        if (this.props.isFailure) {
            return <span>Error loading sessions!</span>;
        }

        var sectionStyle = {
            backgroundImage: `url(${Background})`
        };

        let sessions = [];

        this.state.isSearch ?
            sessions = this.state.sessions || []
        :
            sessions = this.props.sessions;

        const indexOfLastSession = this.state.currentPage * this.state.sessionsPerPage;
        const indexOfFirstSession = indexOfLastSession - this.state.sessionsPerPage;
        const currentSessions = sessions && sessions.slice(indexOfFirstSession, indexOfLastSession);

        const paginate = pageNumber => this.setState({currentPage: pageNumber});

        return (
            <div className="search-container">
                { this.state.formItems && this.state.formItems }
                <div className="search-form" style={ sectionStyle } >
                    <SessionSearchForm 
                        searchHandler={ this.searchSessions.bind(this) }
                        addHandler={ this.showAddForm.bind(this) }
                        closeHandler={ this.showSessionCloseForm.bind(this) }
                        userId={ this.state.userId }
                        cookies={ this.props.cookies }
                        hasActiveSession={ this.props.cookies.get('active-session') }
                    />
                </div>
                <div className="list-wrapper">
                    <div className="list-wrapper-first">
                        <div className="list-wrapper-second">
                            <div className="list-wrapper-title">Sessions</div>
                            { 
                                this.props.sessions && 
                                    (<>
                                    <SessionList 
                                        sessions={ currentSessions }
                                        editHandler={ this.showEditForm.bind(this) }
                                        deleteHandler={ this.showDeleteConfirmation.bind(this) }
                                    /> 
                                    <Pagination 
                                        sessionsPerPage={ this.state.sessionsPerPage } 
                                        totalSessions={ sessions.length }
                                        paginate={ paginate } />
                                    </>
                                    )
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ session }, ownProps) => {
    return {
        ...session,
        cookies: ownProps.cookies
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessions: (params, cookies) => {
            dispatch(loadSessions(params, cookies))

        },
        clearForm: (params, cookies) => {
            dispatch(clearSessionResults())
            dispatch(loadSessions(params, cookies))
         },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionListContainer);