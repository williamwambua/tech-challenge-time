import React from 'react';

class SessionSearchForm extends React.Component {
    constructor() {
        super()
        this.handleSearch = this.handleSearch.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleSearch(event) {
        event.preventDefault()
        const data = {
            name: event.target.elements.name.value,
            period: event.target.elements.period.value,
        }

        this.props.searchHandler(data);
    }

    handleAdd(event) {
        event.preventDefault()
        this.props.addHandler();
    }

    handleClose(event) {
        event.preventDefault()
        this.props.closeHandler();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input id="name" type="text" placeholder="Session name?" name="name" />
                            <span className="focus-inputText"></span>
                            <label className="label-inputText" htmlFor="name">
                                <span className="lnr lnr-magnifier"></span>
                            </label>
                        </div>
                        <select name="period" className="search-drop-down">
                            <option value="select">Select duration</option>
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                        <div className="input-field fifth-wrap">
                            <input type="submit" value="SEARCH" className="btn-search" />
                        </div>
                    </div>
                </form>
                <div>
                    <form>
                        <div className="inner-form2">
                            <span>
                            <div className="input-field fifth-wrap">
                                {
                                    this.props.hasActiveSession ?
                                        <button className="btn-add" onClick={this.handleClose}>STOP SESSION</button>
                                        :
                                        <button className="btn-add" onClick={this.handleAdd}>TRACK SESSION</button>
                                }
                            </div>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SessionSearchForm;