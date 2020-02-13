import React from 'react';

class SessionUpdate extends React.Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.submitHandler({id: this.props.session.id});
    }

    handleClose(event) {
        event.preventDefault();

        const today = new Date();
        this.props.submitHandler(
            `(
                id: ${this.props.session.id}, 
                data: {active: ${false}, 
                end: "${today}"}
            )`
        );
    }

    render() {
        const el = () => {
            switch(this.props.operation) {
                case "close":
                    return <div>
                            <p>Are you sure that you want to close the Session <b>{this.props.session.name}</b>?</p>
                                <div className='container-default-form-btn'>
                                    <button className='default-form-btn' onClick={this.handleClose}>
                                        Close
                                    </button>
                                </div>
                        </div>;
                case "delete":
                    return <div>
                            <p>Are you sure that you want to delete the Session <b>{this.props.session.name}</b>?</p>
                                <div className='container-default-form-btn'>
                                    <button className='default-form-btn' onClick={this.handleDelete}>
                                        Delete
                                    </button>
                                </div>
                        </div>;
                default: return <span>...</span>;
            }
        }

        return(
            <div className='success-info'>
                { el() }
            </div>
        )}
}

export default SessionUpdate;