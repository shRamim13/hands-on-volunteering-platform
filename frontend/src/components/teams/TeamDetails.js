import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Avatar,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip
} from '@mui/material';
import { teamsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const TeamDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTeam = useCallback(async () => {
        try {
            const response = await teamsAPI.getTeamById(id);
            if (response.data.success) {
                setTeam(response.data.data);
            } else {
                setError(response.data.message || 'Failed to load team details');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load team details');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

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

    if (!team) return null;

    const isAdmin = team.members?.some(
        member => member.user._id === user?.userId && member.role === 'admin'
    );

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">
                        {team.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label={team.category} color="primary" />
                        {team.isPrivate && (
                            <Chip label="Private" color="secondary" />
                        )}
                    </Box>
                </Box>

                <Typography variant="body1" paragraph>
                    {team.description}
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Team Members ({team.members?.length || 0})
                    </Typography>
                    <List>
                        {team.members?.map((member) => (
                            <React.Fragment key={member.user._id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>{member.user.name[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={member.user.name}
                                        secondary={`${member.role.charAt(0).toUpperCase() + member.role.slice(1)} • Joined ${new Date(member.joinedAt).toLocaleDateString()}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/teams')}
                    >
                        Back to Teams
                    </Button>
                    {isAdmin && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(`/teams/${team._id}/edit`)}
                        >
                            Edit Team
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default TeamDetails;