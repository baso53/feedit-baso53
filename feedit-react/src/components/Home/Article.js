import React, { Component } from 'react';
import { Item, Icon, Checkbox } from 'semantic-ui-react';
import Votes from './Votes';
import axios from 'axios';


class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voted: props.voted,
            message: ''
        }
    }

    vote(type) {
        if (this.props.voted !== type) {
            let numberOfVotes = type === 'up' ? this.props.voted ? 2 : 1 : this.props.voted ? -2 : -1;
            axios.patch('/api/articles/' + this.props.articleid,
                {
                    votes: this.props.votes + numberOfVotes,
                    voted: type
                })
                .then(response => {
                    if (response.status === 200) {
                        this.props.getArticlesVanilla();
                    }
                }).catch(error => {
                    this.setState({
                        message: "Could't make a vote!"
                    });
                });
        }
    }

    didVote(type) {
        if (this.props.voted) {
            return this.props.voted === type;
        } else {
            return false;
        }
    }

    handleSelected(event, data) {
        this.props.changeSelected(this.props.articleid);
    }

    render() {
        return (
            <Item>
                <Votes number={this.props.votes} />

                <Item.Content>
                    <Item.Header as='a' onClick={() => window.open(this.props.link, "_blank")}>{this.props.title}</Item.Header>
                    <Item.Meta>by {this.props.author}</Item.Meta>
                </Item.Content>

                {this.props.deletion ?
                    <Checkbox onChange={this.handleSelected.bind(this)} /> :
                    <div>
                        <Icon link={!this.didVote('up')} name='arrow up' size='large' disabled={this.didVote('up')} onClick={this.vote.bind(this, 'up')} />
                        <Icon link={!this.didVote('down')} name='arrow down' size='large' disabled={this.didVote('down')} onClick={this.vote.bind(this, 'down')} />
                    </div>
                }
            </Item>
        )
    }
}

export default Article;