import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Container, Item, Image, Icon } from 'semantic-ui-react';
import Votes from './Votes';

class Article extends Component {
    constructor(props) {
        super(props);

    }

    vote(type) {

    }

    didVote(type) {
        if (this.props.voted) {
            return this.props.voted === 'up' ? true : false;
        } else {
            return false;
        }
    }

    render() {
        return (
            <Item>

                <Votes number={this.props.votes} />

                <Item.Content>
                    <Item.Header as='a' onClick={() => window.open(this.props.link, "_blank")}>{this.props.title}</Item.Header>
                    <Item.Meta>by {this.props.author}</Item.Meta>
                </Item.Content>

                <Icon link name='arrow up' size='large' onClick={this.vote.bind(this, 'upvote')} disabled={this.didVote('up')} />
                <Icon link name='arrow down' size='large' onClick={this.vote.bind(this, 'downvote')} disabled={this.didVote('down')} />
            </Item>
        )
    }
}

export default Article;