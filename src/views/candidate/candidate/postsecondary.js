import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Form, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useState from "react-usestateref";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function PostSecondary() {
    const [startDate, setStartDate] = useState(new Date());
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return (
        <React.Fragment>
            <a
                className="text-warning"
                href="#uploadcv" onClick={handleClickOpen}
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
                &nbsp; Add Academic Qualification
            </a>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    Post Secondary School Qualification eg Diploma, Bachelors,
                    Masters.</DialogTitle>
                <DialogContent>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Qualification"
                                placeholder="Qualification"
                                name="qualification"
                            />
                            <Form.Input
                                label="Institution"
                                placeholder="Institution"
                                name="institution"
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="Course Name"
                                placeholder="Course Name"
                                name="courseName"
                            />
                            <Form.Field>
                                Year Of Completion<br/>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field
                                control={Select}
                                label='Attach Certificate (pdf or image)'
                                placeholder='Attach Certificate (pdf or image'
                                type="file"
                            />
                        </Form.Group>
                        <Button onClick={handleClose} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Reset
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
