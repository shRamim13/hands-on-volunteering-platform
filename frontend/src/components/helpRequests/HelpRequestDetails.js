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
import { helpRequestsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const HelpRequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [helpRequest, setHelpRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHelpRequest = async () => {
            try {
                const response = await helpRequestsAPI.getHelpRequestById(id);
                setHelpRequest(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load help request details');
            } finally {
                setLoading(false);
            }
        };

        fetchHelpRequest();
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

    if (!helpRequest) return null;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {helpRequest.title}
                </Typography>
                <Typography variant="body1" paragraph>
                    {helpRequest.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={`Location: ${helpRequest.location}`}
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={`Urgency: ${helpRequest.urgencyLevel}`}
                        color={helpRequest.urgencyLevel === 'High' ? 'error' : 'default'}
                        sx={{ mr: 1 }}
                    />
                    <Chip
                        label={`Status: ${helpRequest.status}`}
                    />
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Volunteers
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {helpRequest.volunteers?.map((volunteer) => (
                            <Chip
                                key={volunteer._id}
                                avatar={<Avatar>{volunteer.name[0]}</Avatar>}
                                label={volunteer.name}
                            />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/help-requests')}
                    >
                        Back to Help Requests
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default HelpRequestDetails;