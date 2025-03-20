import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { helpRequestsAPI } from '../../services/api';

const urgencyLevels = ['low', 'medium', 'high'];

const CreateHelpRequest = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        urgencyLevel: '',
        volunteersNeeded: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await helpRequestsAPI.create(formData);
            navigate('/help-requests');
        } catch (error) {
            console.error('Failed to create help request:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>Create Help Request</Typography>
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
                        label="Urgency Level"
                        name="urgencyLevel"
                        margin="normal"
                        value={formData.urgencyLevel}
                        onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                        required
                    >
                        {urgencyLevels.map(level => (
                            <MenuItem key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Volunteers Needed"
                        name="volunteersNeeded"
                        type="number"
                        margin="normal"
                        value={formData.volunteersNeeded}
                        onChange={(e) => setFormData({ ...formData, volunteersNeeded: e.target.value })}
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Create Help Request
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateHelpRequest; 