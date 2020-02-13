import React from 'react';
import { connect } from 'react-redux';

import SessionCreateForm from '../forms/sessionCreateForm';
import SessionEditForm from '../forms/sessionEditForm';
import SessionUpdateResult from '../components/sessionUpdateResult';
import SessionUpdate from '../components/sessionUpdate';

import { createSession, updateSession, deleteSession } from '../redux/actions/sessionActions';

class SessionFormContainer extends React.Component {

    render() {
        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.isFailure) {
            return <span>Error loading sessions!</span>
        }

        const title = () => {
            switch(this.props.operation) {
                case "create":
                    return <span>Track Session</span>
                case "close":
                    return <span>Close Session</span>
                case "edit":
                    return <span>Edit Session</span>
                case "delete":
                    return <span>Delete Session</span>
                default: return <span>Nothing to load...</span>
            }
        }

        const sessionUpdateResult = () => {
            return <SessionUpdateResult 
                session={this.props.session}
                closeHandler={this.props.removeForm}
                reloadHandler={this.props.reloadList}
                operation={this.props.operation} />
        }

        const body = () => {
            switch(this.props.operation) {
                case "create":
                    return this.props.session && this.props.showResults ? sessionUpdateResult()
                        : 
                        <SessionCreateForm 
                            userId={this.props.userId}
                            cookies={this.props.cookies}
                            submitHandler={this.props.saveForm}
                            clearHandler={this.props.clearForm} />;
                case "close":
                    return this.props.session && this.props.showResults ? sessionUpdateResult()
                        : 
                        <SessionUpdate
                            submitHandler={this.props.updateForm}
                            clearHandler={this.props.clearForm}
                            session={this.props._session}
                            operation={this.props.operation} />;
                case "edit":
                    return this.props.session && this.props.showResults ? sessionUpdateResult()
                        : 
                        <SessionEditForm 
                            submitHandler={this.props.updateForm}
                            clearHandler={this.props.clearForm}
                            session={this.props._session} />;
                case "delete":
                    return this.props.session && this.props.showResults ? sessionUpdateResult()
                        :
                        <SessionUpdate
                            submitHandler={this.props.deleteForm}
                            clearHandler={this.props.clearForm}
                            session={this.props._session}
                            operation={this.props.operation} />;
                default: return <span>Nothing to load...</span>
            }
        }

        return (
            <div className="form-container" ref='sessionFormContainer'>
                <div className="wrap-form">
                    <button className="btn-hide-contact100" onClick={this.props.removeForm}>
                        <i className="zmdi zmdi-close"></i>
                    </button>
                    <div className="default-form-title" >
                        { title() }
                    </div>
                        { body() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ session }) => {
    return {
        ...session
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveForm: (params) => {
            dispatch(createSession(params))
        },
        updateForm: (params) => {
            dispatch(updateSession(params))
        },
        deleteForm: (params) => {
            dispatch(deleteSession(params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionFormContainer);