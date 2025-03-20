import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { helpRequestsAPI } from '../../services/api';
import HelpRequestCard from './HelpRequestCard';

const HelpRequestList = () => {
    const [helpRequests, setHelpRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHelpRequests();
    }, []);

    const fetchHelpRequests = async () => {
        try {
            const response = await helpRequestsAPI.getAll();
            setHelpRequests(response.data);
        } catch (error) {
            console.error('Failed to fetch help requests:', error);
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4">Help Requests</Typography>
                <Button variant="contained" onClick={() => navigate('/help-requests/create')}>
                    Create Help Request
                </Button>
            </Box>
            <Grid container spacing={3}>
                {helpRequests.map(request => (
                    <Grid item xs={12} sm={6} md={4} key={request._id}>
                        <HelpRequestCard request={request} onUpdate={fetchHelpRequests} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HelpRequestList; 