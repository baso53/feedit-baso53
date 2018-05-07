import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Menu, Container, Item } from 'semantic-ui-react';
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
            redirect: ''
        };

        axios.get('/api/currentuser')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        username: response.data,
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

    render() {
        if (this.state.redirect === 'login') {
            return <Redirect to='/login' />
        }

        return (
            <div>
                <Header username={this.state.username} handleSignOut={this.handleSignOut.bind(this)}></Header>
                <Menu fixed='top'>
                    <Container>
                        <Menu.Item as='a' onClick={this.handleRedirectToMyArticles.bind(this)}>
                            Welcome, {this.state.username}
                        </Menu.Item>
                        <Menu.Item position='right'>
                            Logout
                        </Menu.Item>
                    </Container>
                </Menu>

                <Container text style={{ marginTop: '12em' }}>
                    <AddArticle />
                    {/*<ArticleList /> */}
                </Container>

            </div>
        )
    }
}

export default Home;