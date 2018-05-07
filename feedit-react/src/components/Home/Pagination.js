import React,  { Component } from 'react';
import { Item, Icon, Grid, Button } from 'semantic-ui-react';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid stretched columns={3} padded>
                <Grid.Column as='a'>
                    <Icon name='arrow left' size='big' link/>
                </Grid.Column>
                <Grid.Column>
                    <Button disabled>
                        Page {this.props.currentPage} / {this.props.totalPages}
                    </Button>
                </Grid.Column>
                <Grid.Column as='a' floated='right'>
                    <Icon name='arrow right' size='big' link />
                </Grid.Column>
            </Grid>
        )
    }
}

export default Pagination;