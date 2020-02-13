import React from 'react';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class SessionItem extends React.Component {
    constructor(props) {
        super(props)

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleEditClick = (id) => {
        this.props.editHandler(id);
    }

    handleDeleteClick = (id) => {
        this.props.deleteHandler(id);
    }

    render () {
        return (
            <li className="table-row">
                <div className="colm colm-1" data-label="Name">{this.props.name}</div>
                <div className="colm colm-2" data-label="Start"><Moment format="YYYY-MM-DD h:mm A">{this.props.start}</Moment></div>
                <div className="colm colm-3" data-label="End">{this.props.active ? "On-going" : <Moment format="YYYY-MM-DD h:mm A">{this.props.end}</Moment>}</div>
                <div className="colm colm-4" data-label="Edit" data-edit-id={this.props.id}>
                    <button onClick={ () => this.handleEditClick(this.props.id)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </div>
                <div className="colm colm-5" data-label="Delete" data-delete-id={this.props.id}>
                    <button onClick={ () => this.handleDeleteClick(this.props.id)} >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </li>
        )
    }
}

export default SessionItem;