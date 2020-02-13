import React from 'react';
import Moment from 'react-moment';

class SessionUpdateResult extends React.Component {
    constructor() {
        super()
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(event) {
        this.props.closeHandler(event);
        this.props.reloadHandler();
    }

    render() {
        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.isFailure) {
            return (
                <div className='success-info'>
                    <p>Failed to update <b>{ this.props.session.name }</b>, please try again later.</p>
                    <div className='container-default-form-btn'>
                        <button className='default-form-btn' onClick={this.handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )
        }

        const el = () => {
            switch(this.props.operation) {
                case "create":
                    return <p>Session <b>{this.props.session.name}</b> has been started successfully!</p>;
                case "close":
                    return <p>Session <b>{this.props.session.name}</b> has been stopped successfully!</p>;
                case "edit":
                    return <p>Session <b>{this.props.session.name}</b> has been updated successfully!</p>;
                case "delete":
                    return <p>Session <b>{this.props.session.name}</b> has been deleted successfully!</p>;
                default: return <span>...</span>;
            }
        }

        return(
            <div className='success-info'>
                { el() }
                <p>Start: <b><Moment format="YYYY-MM-DD h:mm A">{this.props.session.start}</Moment></b></p>
                {this.props.operation === "close" ?
                    (<p>End: <b><Moment format="YYYY-MM-DD h:mm A">{this.props.session.end}</Moment></b></p>)
                    :
                    ('')
                }
                <div className='container-default-form-btn'>
                    <button className='default-form-btn' onClick={this.handleClose}>
                        Close
                    </button>
                </div>
            </div>                                                                                          
        )
    }
}

export default SessionUpdateResult;