import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TeamCard from './TeamCard';
import { teamsAPI } from '../../services/api';

const TeamList = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await teamsAPI.getAllTeams();
            console.log('Teams response:', response); // Debug log
            setTeams(response.data || []);
        } catch (err) {
            console.error('Error fetching teams:', err);
            setError(err.response?.data?.message || 'Failed to load teams');
            setTeams([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleCreateTeam = () => {
        navigate('/teams/create');
    };

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
                <Typography variant="h4" component="h1">
                    Teams
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateTeam}
                >
                    Create Team
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {!error && teams.length === 0 ? (
                <Alert severity="info">
                    No teams available. Create one to get started!
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {teams.map((team) => (
                        <Grid item xs={12} sm={6} md={4} key={team._id}>
                            <TeamCard
                                team={team}
                                onUpdate={fetchTeams}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default TeamList;