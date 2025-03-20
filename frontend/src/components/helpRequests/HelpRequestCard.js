import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext'; // Change this import
import { helpRequestsAPI } from '../../services/api';

const HelpRequestCard = ({ request, onUpdate }) => {
    const { user } = useAuth(); // Use AuthContext instead of Redux
    const hasVolunteered = request.volunteers?.includes(user?._id);

    const handleVolunteer = async () => {
        try {
            await helpRequestsAPI.volunteer(request._id);
            onUpdate();
        } catch (error) {
            console.error('Failed to volunteer:', error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>{request.title}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {request.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={request.urgencyLevel}
                        color={
                            request.urgencyLevel === 'high' ? 'error' :
                                request.urgencyLevel === 'medium' ? 'warning' : 'success'
                        }
                        size="small"
                        sx={{ mr: 1 }}
                    />
                    <Chip label={request.location} size="small" />
                </Box>
                <Typography variant="body2">
                    Volunteers needed: {request.volunteers?.length || 0} / {request.volunteersNeeded}
                </Typography>
            </CardContent>
            <CardActions>
                {user && !hasVolunteered && (
                    <Button size="small" onClick={handleVolunteer}>
                        Volunteer
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default HelpRequestCard;