import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Article from './Article';

class ArticleList extends Component{
    constructor(props){
        super(props);

        this.state = {
            pageSize: 10,
            pageNumber: 0,
            articles: []
        };

        axios.get('/api/articles', {
            params: {
                size: this.state.pageSize,
                page: this.state.pageNumber
            }
        })
        .then(response => {
            this.setState({
                articles: response.data._embedded.articles
            });
        }).catch(error => {
            //todo
        });
    }

    renderChildrenForArticle(articles){
        return articles.map((article, key) => {
            return (
                <Article key={key}
                    title={article.title}
                    link={article.link}
                    author={article.author}
                    votes={article.votes}
                />
            )
        })
    }

    render(){

        return (<div>
            <button>Add a new article</button>
            <div>{this.renderChildrenForArticle(this.state.articles)}</div>

        </div>)
    }
}
//<Pagination />

export default ArticleList;