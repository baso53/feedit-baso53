import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false
        };

    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event, { name, value }) => this.setState({ [name]: value });

    handleSignIn(event) {
        event.preventDefault();

        const params = new URLSearchParams();
        params.append('username', this.state.username);
        params.append('password', this.state.password);

        axios.post('/authenticate', params)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        redirect: true
                    });
                }
            }).catch(error => {
                if (error.response) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/home',
                state: { isAuthenticated: true }
            }} />
        }

        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                    height: 100%;
                }`}</style>

                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Feedit
                        </Header>
                        <Form size='large' onSubmit={this.handleSignIn.bind(this)}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username' 
                                    value={this.state.username}
                                    name='username' 
                                    onChange={this.handleChange.bind(this)}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password} 
                                    name='password'
                                    onChange={this.handleChange.bind(this)}
                                />

                                <Button color='teal' fluid size='large' disabled={!this.validateForm()}>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;