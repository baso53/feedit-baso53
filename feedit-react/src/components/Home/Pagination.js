import React, { Component } from 'react';
import { Icon, Grid, Button, Dropdown } from 'semantic-ui-react';

class Pagination extends Component {
    selectionOptions = [
        {
            key: 10,
            value: 10,
            text: 10
        },
        {
            key: 25,
            value: 25,
            text: 25
        },
        {
            key: 50,
            value: 50,
            text: 50
        }
    ]

    handleChangeSize(event, data){
        this.props.changePageSize(data.value);
    }

    render() {
        return (
            <Grid columns={4} textAlign='center'>
                <Grid.Column as='a'>
                    <Icon name='arrow left' size='big' link onClick={this.props.changePagePrevious}/>
                </Grid.Column>
                <Grid.Column>
                    <Button disabled>
                        Page {this.props.page.number + 1} / {this.props.page.totalPages}
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Dropdown
                        placeholder='Page size'
                        selection options={this.selectionOptions}
                        fluid
                        onChange={this.handleChangeSize.bind(this)}
                    />
                </Grid.Column>
                <Grid.Column as='a'>
                    <Icon name='arrow right' value='next' size='big' link onClick={this.props.changePageNext}/>
                </Grid.Column>
            </Grid>

        )
    }
}

export default Pagination;