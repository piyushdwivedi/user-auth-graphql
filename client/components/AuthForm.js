import React, {Component} from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.onSubmit({email, password});
    }

    render() {
        const errorStyle = {
            color: 'red',
            fontWeight: 'bold'
        };
        return (
            <div className="row">
                <form className="col s6" onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <input value={this.state.email} placeholder="Email"
                            onChange={e => this.setState({email: e.target.value})}
                        />
                    </div>
                    <div className="input-field">
                        <input value={this.state.password} placeholder="Password"
                            type="password"
                            onChange={e => this.setState({password: e.target.value})}    
                        />
                    </div>
                    <div className="errors" style={errorStyle}>
                        {
                            this.props.errors.map(error => {
                                return (
                                    <div key={error}>
                                        {error}
                                    </div>
                                );
                            })
                        }
                    </div>
                    
                    <button className="btn">Submit</button>
                </form>
            </div>
            
        );
    }
}
export default AuthForm;