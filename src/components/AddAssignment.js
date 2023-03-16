import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { SERVER_URL } from '../constants.js';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class AddAssignment extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        name: '',
        dueDate: '',
        courseId: '',
        redirect: false,
    };
}

// Method to handle changes in the input fields
handleChange = (event) => {
this.setState({ [event.target.name]: event.target.value });
};

// Method to handle form submission
handleSubmit = (event) => {
    event.preventDefault();
    const token = Cookies.get('XSRF-TOKEN');

    // Creating an assignment object from the input fields
    const assignment = {
        name: this.state.name,
        dueDate: new Date(this.state.dueDate).toISOString(), // parse dueDate into date object
        courseId: this.state.courseId,
    };

    // Sending a POST request to the server to add the assignment to the course
    fetch(`${SERVER_URL}/course/${this.state.courseId}/assignment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token,
        },
        body: JSON.stringify(assignment),
    })
    // Handling the response from the server
    .then((response) => {
        if (response.ok) {
        toast.success('Assignment added successfully.', {
            position: toast.POSITION.TOP_RIGHT
        });
        this.setState({ redirect: true });
        } else {
        toast.error('Failed to add assignment.', {
            position: toast.POSITION.TOP_RIGHT
        });
        }
    })
    .catch((error) => console.error(error));
    };


    
    // Render method to render the component
    render() {
        if (this.state.redirect) {
        // Checking if the redirect flag is true, and redirecting the user to the addAssignment page
        return <Redirect to="/addAssignment" />;
        }
        // Rendering the component UI
        return (
            <div align="left">
            <h2>Add Assignment</h2>
            <form onSubmit={this.handleSubmit}>
                <TextField
                required
                label="Assignment Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
                />
                <TextField
                required
                label="Due Date"
                name="dueDate"
                value={this.state.dueDate}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
                />
                <TextField
                required
                label="Course ID"
                name="courseId"
                value={this.state.courseId}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Add Assignment
                </Button>
            </form>
            <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default AddAssignment;