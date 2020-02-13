import React from 'react';

class SessionCreateForm extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        
        const data = {
            name: event.target.elements.name.value,
            userId: parseInt(this.props.userId, 10)
        }
        this.props.submitHandler(data, this.props.cookies);
    }

    handleClear(event) {
        event.preventDefault()
        this.props.clearHandler()
    }

    render() {
        return (
            <form className="default-form validate-form" onSubmit={this.handleSubmit}>
                <div className="wrap-inputText validate-input">
                    <input type="text" name="name" placeholder='Session name' className='inputText' />
                    <span className="focus-inputText"></span>
                    <label className="label-inputText" htmlFor="name">
						<span className="lnr lnr-pencil"></span>
					</label>
				</div>
                <div className='container-default-form-btn'>
                    <input type="submit" value="Submit" className='default-form-btn' />
                </div>
            </form>
        );
    }
}

export default SessionCreateForm;