import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { eventsAPI } from '../../services/api';
import { eventCategories } from '../../utils/helpers';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        maxParticipants: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventsAPI.create(formData);
            navigate('/events');
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>Create Event</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        margin="normal"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        margin="normal"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="datetime-local"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        margin="normal"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                    />
                    <TextField
                        fullWidth
                        select
                        label="Category"
                        name="category"
                        margin="normal"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    >
                        {eventCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Maximum Participants"
                        name="maxParticipants"
                        type="number"
                        margin="normal"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Create Event
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateEvent; 