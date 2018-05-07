import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Header, Form, Segment, Button } from 'semantic-ui-react';


class AddArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: 0,
            username: props.username,
            title: '',
            link: '',
            author: ''
        };


    }

    validateForm() {
        return this.state.username.length > 0;
    }

    handleChange = (event, { name, value }) => this.setState({ [name]: value });

    handleSubmit() {

    }

    render() {

        console.log(this.state)

        return (
            <Container>
                <Header as='h1' textAlign='center'>Add a new article</Header>
                <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            disabled
                            value={0}
                            name='votes'
                            label='Vote #'
                        />
                        <Form.Input
                            fluid
                            value={this.state.username}
                            disabled
                            name='username'
                            label='Username'
                        />
                        <Form.Input
                            fluid
                            placeholder='Title'
                            value={this.state.title}
                            name='title'
                            onChange={this.handleChange.bind(this)}
                            label='Title'
                        />
                        <Form.Input
                            fluid
                            placeholder='Link'
                            value={this.state.link}
                            name='link'
                            onChange={this.handleChange.bind(this)}
                            label='Link'
                        />
                        <Form.Input
                            fluid
                            placeholder='Author'
                            value={this.state.author}
                            name='author'
                            onChange={this.handleChange.bind(this)}
                            label='Author'
                        />
                        

                        <Button color='teal' size='large'>Publish</Button>
                        <Button size='large'>Cancel</Button>
                    </Segment>
                </Form>
            </Container>
        )
    }
}

export default AddArticle;