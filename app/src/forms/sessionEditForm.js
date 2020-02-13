import React from 'react';

class SessionForm extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()

        const updateStartDate = event.target.elements.updateStartDate ? 
            event.target.elements.updateStartDate.checked
            : false;
        
        this.props.submitHandler(
            `(
                id: ${this.props.session.id}, 
                data: {name: "${event.target.elements.name.value}", 
                updateStartDate: ${updateStartDate}}
            )`
        );
    }

    handleClear(event) {
        event.preventDefault();
        this.props.clearHandler();
    }

    render() {
        if (this.props.session===null)
            return <span>Loading...</span>;

        return (
            <form className="default-form validate-form" onSubmit={this.handleSubmit}>
                <div className="wrap-inputText validate-input">
                    <input type="text" name="name" placeholder='Session name' defaultValue={this.props.session.name} className='inputText' />
                    <span className="focus-inputText"></span>
                    <label className="label-inputText" htmlFor="name">
						<span className="lnr lnr-pencil"></span>
					</label>
				</div>
                {this.props.session.active ?
                    (<div className="wrap-inputText validate-input checkBox">
                        Update start time? <input type="checkbox" name="updateStartDate" /> 
                    </div>)
                    :
                    ('')
                }
                <div className='container-default-form-btn'>
                    <input type="submit" value="Submit" className='default-form-btn' />
                </div>
            </form>
        );
    }
}

export default SessionForm;