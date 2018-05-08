import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Form, Segment, Button, Label } from 'semantic-ui-react';

class AddArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: 0,
            username: props.username,
            userId: props.userId,
            title: '',
            link: '',
            author: '',
            error: ''
        };
    }

    messages = {
        emptyAuthor: "Please enter an author!",
        emptyTitle: "Please enter a title!",
        emptyLink: "Please enter a link!",
        wrongLink: "Entered link doesn't exist!"
    };

    handleChange = (event, { name, value }) => this.setState({ [name]: value });

    handleSubmit() {
        if (this.state.title.length === 0) {
            this.setState({
                error: 'emptyTitle'
            });

            return;
        } else if (this.state.author.length === 0) {
            this.setState({
                error: 'emptyAuthor'
            });

            return;
        } else if (this.state.link.length === 0) {
            this.setState({
                error: 'emptyLink'
            });

            return;
        } else {
            let link = this.state.link;
            if (this.state.link.indexOf('http://') === -1
                && this.state.link.indexOf('https://') === -1) {
                link = 'http://' + this.state.link;
            }

            fetch(link, {
                mode: 'no-cors'
            }).then(response => {
                axios.post('/api/articles', {
                    title: this.state.title,
                    link: link,
                    author: this.state.author,
                    usernameid: this.state.userId
                }).then(response => {
                    this.props.fromAddArticle(true);
                });
            })
            .catch(error => {
                this.setState({
                    error: 'wrongLink'
                });
            });
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.fromAddArticle();
    }

    render() {

        return (
            <Container>
                <Header as='h1' textAlign='center'>Add a new article</Header>
                {this.state.error ? <Label basic color='red' pointing='below'>{this.messages[this.state.error]}</Label> : null}
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
                        <Button size='large' onClick={this.handleCancel.bind(this)}>Cancel</Button>
                    </Segment>
                </Form>
            </Container>
        )
    }
}

export default AddArticle;