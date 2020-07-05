import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {hashHistory} from 'react-router';

import {currentUser, signup} from '../queries';

import AuthForm from './AuthForm';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            errors: []
        };
    }

    componentWillUpdate(nextProps) {
        if(!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query: currentUser}]
        }).catch(err => {
            const errors = err.graphQLErrors.map(e => e.message);
            this.setState({ errors });
        });
    }
    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit}/>
            </div>
        );
    }
};
export default graphql(currentUser)(
    graphql(signup)(SignupForm)
);