import React from 'react';
import {Card, Dropdown} from 'semantic-ui-react'
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));
const JobSettings = () => {
    const classes = useStyles();
    const options = [
        {key: 'angular', text: 'Angular', value: 'angular'},
        {key: 'css', text: 'CSS', value: 'css'},
        {key: 'design', text: 'Graphic Design', value: 'design'},
        {key: 'ember', text: 'Ember', value: 'ember'},
        {key: 'html', text: 'HTML', value: 'html'},
        {key: 'ia', text: 'Information Architecture', value: 'ia'},
        {key: 'javascript', text: 'Javascript', value: 'javascript'},
        {key: 'mech', text: 'Mechanical Engineering', value: 'mech'},
        {key: 'meteor', text: 'Meteor', value: 'meteor'},
        {key: 'node', text: 'NodeJS', value: 'node'},
        {key: 'plumbing', text: 'Plumbing', value: 'plumbing'},
        {key: 'python', text: 'Python', value: 'python'},
        {key: 'rails', text: 'Rails', value: 'rails'},
        {key: 'react', text: 'React', value: 'react'},
        {key: 'repair', text: 'Kitchen Repair', value: 'repair'},
        {key: 'ruby', text: 'Ruby', value: 'ruby'},
        {key: 'ui', text: 'UI Design', value: 'ui'},
        {key: 'ux', text: 'User Experience', value: 'ux'},
    ]

    const DropdownExampleMultipleSelection = () => (
        <Dropdown placeholder='Skills' fluid multiple selection options={options}/>
    )

    return (
        <>
            <Card fluid>
                <Card.Content>
                    <Card.Header>Preferred Counties</Card.Header>
                </Card.Content>
                <Card.Content>
                    <DropdownExampleMultipleSelection/>
                </Card.Content>
            </Card>
            <Card fluid>
                <Card.Content>
                    <Card.Header>Interest areas</Card.Header>
                </Card.Content>
                <Card.Content>
                    <DropdownExampleMultipleSelection/>
                </Card.Content>
            </Card>
            <Card fluid>
                <Card.Content>
                    <Card.Header>Notification Setings</Card.Header>
                </Card.Content>
                <Card.Content>
                    <DropdownExampleMultipleSelection/>
                </Card.Content>
            </Card>
        </>

    )
}

export default JobSettings;