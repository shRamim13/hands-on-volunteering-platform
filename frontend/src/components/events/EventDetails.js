import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Chip,
    Avatar,
    CircularProgress,
    Alert
} from '@mui/material';
import { eventsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventsAPI.getEventById(id);
                setEvent(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            </Container>
        );
    }

    if (!event) return null;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body1" paragraph>
                    {event.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={`Location: ${event.location}`}
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={`Category: ${event.category}`}
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={`Date: ${new Date(event.date).toLocaleDateString()}`}
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Participants ({event.participants?.length || 0}/{event.maxParticipants})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {event.participants?.map((participant) => (
                            <Chip
                                key={participant._id}
                                avatar={<Avatar>{participant.name[0]}</Avatar>}
                                label={participant.name}
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/events')}
                    >
                        Back to Events
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EventDetails;