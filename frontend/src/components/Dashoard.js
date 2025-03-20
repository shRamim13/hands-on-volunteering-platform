import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome, {user?.name}!
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Your Events</Typography>
                            <Typography variant="body1">
                                You have joined {user?.joinedEvents?.length || 0} events
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Your Teams</Typography>
                            <Typography variant="body1">
                                You are part of {user?.teams?.length || 0} teams
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Your Impact</Typography>
                            <Typography variant="body1">
                                You have contributed to {user?.volunteerHours || 0} volunteer hours
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;