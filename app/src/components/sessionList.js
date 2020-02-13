import React from 'react';
import SessionItem from './sessionItem';

const SessionsList = (props) => {
    return (
        <div className="session-list">
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="colm colm-1">Name</div>
                    <div className="colm colm-2">Start</div>
                    <div className="colm colm-3">End</div>
                    <div className="colm colm-4">Edit</div>
                    <div className="colm colm-5">Delete</div>
                </li>
                {
                    props.sessions.map((session, index) => {
                        return <SessionItem 
                            key={index} 
                            {...session}
                            editHandler={props.editHandler}
                            deleteHandler={props.deleteHandler} />;
                    })
                }
            </ul>
        </div>
    )
}

export default SessionsList