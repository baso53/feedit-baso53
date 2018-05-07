import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Header, Form, Segment, Button } from 'semantic-ui-react';


class AddArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            link: '',
            author: ''
        };
    }

    handleSubmit(){

    }

    render() {


        return (
            <Container>
                <Header as='h1' textAlign='center'>Add a new article</Header>
                <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
                    <Segment stacked>
                        <Form.Input
                            fluid
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
            </Container>
        )
    }
}
{/* <div>
    <form onSubmit={this.handlePublish.bind(this)}>
        <label htmlFor="votes">Vote #:</label>
        <input type="text" name="votes" id="votes" disabled value={0} />

        <label htmlFor="user">By User:</label>
        <input type="text" name="user" id="user" disabled value={this.props.username}/>

        <label htmlFor="headline">Headline:</label>
        <input type="text" name="headline" id="headline"/>

        <label htmlFor="link">Link:</label>
        <input type="text" name="link" id="link"/>

        <label htmlFor="author">Author:</label>
        <input type="text" name="author" id="author"/>

    </form>
</div> */}

export default AddArticle;