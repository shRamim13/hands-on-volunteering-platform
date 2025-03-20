import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import { eventsAPI } from '../../services/api';
import EventCard from './EventCard';
import EventFilters from './EventFilters';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await eventsAPI.getAll();

            // Check if response.data exists and is an array
            if (response && Array.isArray(response.data)) {
                setEvents(response.data);
            } else {
                console.error('Invalid response format:', response);
                setError('Failed to load events: Invalid data format');
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(error.response?.data?.message || 'Failed to load events');
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventUpdate = () => {
        fetchEvents(); // Refresh the events list
    };

    const filteredEvents = events.filter(event =>
        selectedCategories.length === 0 || selectedCategories.includes(event.category)
    );

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4">
                    Available Events
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/events/create')}
                >
                    Create Event
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <EventFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
            />

            {!error && filteredEvents.length === 0 ? (
                <Alert severity="info">
                    {selectedCategories.length > 0
                        ? 'No events found for the selected categories.'
                        : 'No events available at the moment.'}
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {filteredEvents.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event._id}>
                            <EventCard
                                event={event}
                                onEventUpdate={handleEventUpdate}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default EventList;