import React, { Component } from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Menu, Container, Item, Button, Dropdown, Input } from 'semantic-ui-react';
import axios from 'axios';
import Header from './Header';
import ArticleList from './ArticleList';
import AddArticle from './AddArticle';



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: null,
            userId: null,
            redirect: ''
        };

        axios.get('/api/currentuser')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        username: response.data.username,
                        userId: response.data.userId,
                        loggedIn: true
                    });
                }
            }).catch(error => {
                if (error.response) {
                    //todo
                }
            });
    }

    handleSignOut() {
        axios.post('/logout')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        redirect: 'login'
                    });
                }
            }).catch(error => {
                if (error.response) {
                    //todo
                }
            });
    }

    handleRedirectToMyArticles(){

    }

    handleRedirectToAddArticle(){
        this.setState({
            redirect: 'addArticle'
        });
    }

    render() {
        if (this.state.redirect === 'login') {
            return <Redirect to='/login' />
        }

        return (
            <div>
                <Header />
                <Menu fixed='top'>
                    <Container>
                        <Menu.Item as='a' onClick={this.handleRedirectToMyArticles.bind(this)}>
                            Welcome, {this.state.username}
                        </Menu.Item>
                        <Menu.Item as='a' position='right' onClick={this.handleSignOut.bind(this)}>
                            Logout
                        </Menu.Item>
                    </Container>
                </Menu>

                <Container text style={{ marginTop: '6em' }}>
                    <Button style={{ marginBottom: '2em' }}onClick={this.handleRedirectToAddArticle.bind(this)}>Add a new article</Button>
                    
                    {this.state.redirect === 'addArticle' ? <AddArticle /> : <ArticleList /> }
                </Container>

            </div>
        )
    }
}

export default Home;