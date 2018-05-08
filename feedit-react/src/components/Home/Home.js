import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
import axios from 'axios';
import ArticleList from './ArticleList';
import AddArticle from './AddArticle';
import MyArticleList from './MyArticleList';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: null,
            userId: null,
            redirect: '',
            forDeletion: new Set(),
            error: ''
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

    handleRedirectToMyArticles() {
        if (this.state.redirect === 'myArticles') {
            this.setState({
                redirect: ''
            });
        } else {
            this.setState({
                redirect: 'myArticles'
            });
        }
    }

    fromAddArticle(success) {
        this.setState({
            redirect: ''
        });
    }

    handleRedirectToAddArticle() {
        this.setState({
            redirect: 'addArticle'
        });
    }

    handleDeleteArticles() {
        this.state.forDeletion.forEach(articleId => {
            axios.delete('api/articles/' + articleId)
            .then(response => this.setState({
                redirect: ''
            }))
            .catch(error => this.setState({
                error: error
            }));
        });

    }

    changeSelected(articleId) {
        if (this.state.forDeletion.has(articleId)) {
            this.state.forDeletion.delete(articleId);
        } else {
            this.state.forDeletion.add(articleId);
        }
    }

    render() {
        if (this.state.redirect === 'login') {
            return <Redirect to='/login' />
        }

        return (
            <div>
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
                    {this.state.redirect === 'myArticles' ?
                        <Button style={{ marginBottom: '2em' }} onClick={this.handleDeleteArticles.bind(this)}>Delete selected</Button> :
                        <Button style={{ marginBottom: '2em' }} onClick={this.handleRedirectToAddArticle.bind(this)}>Add a new article</Button>
                    }
                    {this.state.redirect === 'addArticle'
                        ? <AddArticle
                            username={this.state.username}
                            userId={this.state.userId}
                            fromAddArticle={this.fromAddArticle.bind(this)} />
                        : this.state.redirect === 'myArticles' ? <MyArticleList userId={this.state.userId} changeSelected={this.changeSelected.bind(this)} /> :
                            <ArticleList />}

                </Container>

            </div>
        )
    }
}

export default withRouter(Home);