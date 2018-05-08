import React, { Component } from 'react';
import { Item, Container, Dropdown, Input, Label } from 'semantic-ui-react';
import Pagination from './Pagination';
import axios from 'axios';
import Article from './Article';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            redirect: '',
            sort: 'votes',
            desc: true,
            page: {
                "size": 10,
                "totalElements": 0,
                "totalPages": 0,
                "number": 0
            }
        };

        this.getArticlesVanilla();
    }

    selectionOptions = [
        {
            key: 'votes',
            value: 'votes',
            text: 'Votes'
        },
        {
            key: 'title',
            value: 'title',
            text: 'Title'
        },
        {
            key: 'author',
            value: 'author',
            text: 'Author'
        }
    ]

    getArticlesVanilla(changePage = 0) {
        axios.get('/api/articles', {
            params: {
                size: this.state.page.size,
                page: this.state.page.number + changePage,
                sort: this.state.desc ? this.state.sort + ',desc' : this.state.sort
            }
        })
            .then(response => {
                this.setState({
                    articles: response.data._embedded.articles,
                    page: response.data.page
                });

            }).catch(error => {
                //todo
            });
    }

    changePageSize(size) {
        axios.get('/api/articles', {
            params: {
                size: size,
                page: 0,
                sort: this.state.desc ? this.state.sort + ',desc' : this.state.sort
            }
        })
            .then(response => {
                this.setState({
                    articles: response.data._embedded.articles,
                    page: response.data.page
                });
            }).catch(error => {
                //todo
            });
    }

    changePagePrevious() {
        if (this.state.page.number > 0) {
            this.getArticlesVanilla(-1);
        }
    }

    changePageNext() {
        if (this.state.page.number + 1 < this.state.page.totalPages) {
            this.getArticlesVanilla(1);
        }
    }

    renderChildrenForArticle(articles) {
        return articles.map((article, key) => {
            return (
                <Article key={key}
                    title={article.title}
                    link={article.link}
                    author={article.author}
                    votes={article.votes}
                    voted={article.voted}
                    articleid={/[^/]*$/.exec(article._links.self.href)[0]}
                    getArticlesVanilla={this.getArticlesVanilla.bind(this)}
                />
            )
        })
    }

    handleSort(event, data) {
        axios.get('/api/articles', {
            params: {
                size: this.state.page.size,
                page: this.state.page.number,
                sort: data.value === this.state.sort && this.state.desc === false ? data.value + ',desc' : data.value
            }
        })
            .then(response => {
                this.setState({
                    articles: response.data._embedded.articles,
                    sort: data.value,
                    desc: data.value === this.state.sort ? !this.state.desc : false,
                    page: response.data.page
                });
            }).catch(error => {
                //todo
            });
    }

    handleSearch(event, data) {
        if (data.value.length > 2) {
            axios.get('/api/articles/search/findByTitleIgnoreCaseContaining', {
                params: {
                    title: data.value,
                    size: this.state.page.size,
                    page: 0
                }
            })
                .then(response => {
                    this.setState({
                        articles: response.data._embedded.articles
                    });
                }).catch(error => {
                });
        } else {
            this.getArticlesVanilla();
        }
    }

    render() {
        return (
            <Container>
                <Dropdown
                    placeholder='Sort by'
                    selection options={this.selectionOptions}
                    style={{ marginBottom: '1em' }}
                    onChange={this.handleSort.bind(this)}
                />
                
                <Input onChange={this.handleSearch.bind(this)} fluid style={{ marginBottom: '2em' }} placeholder='Search articles' />

                {this.state.articles.length === 0
                    ? <Label
                        basic
                        color='red'
                        horizontal
                        style={{ marginBottom: '1em' }}>
                        Trenutno nema članaka za prikaz
                    </Label>
                    : null}

                {this.state.articles.length !==0 ? <Item.Group>{this.renderChildrenForArticle(this.state.articles)}</Item.Group> : null }

                <Pagination
                    page={this.state.page}
                    changePagePrevious={this.changePagePrevious.bind(this)}
                    changePageNext={this.changePageNext.bind(this)}
                    changePageSize={this.changePageSize.bind(this)}
                />
            </Container>
        );
    }
}

export default ArticleList;