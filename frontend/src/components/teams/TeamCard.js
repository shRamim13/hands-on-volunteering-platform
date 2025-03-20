import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar,
    AvatarGroup,
    Box,
    Chip,
    Snackbar,
    Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { teamsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const TeamCard = ({ team, onUpdate }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    // Safely get members array, filtering out any invalid members
    const validMembers = team.members?.filter(member => member && member.user) || [];

    // Check if user is a member, safely handle null user and member data
    const isMember = user && validMembers.some(
        member => member.user._id === user.userId
    );

    const handleJoin = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await teamsAPI.joinTeam(team._id);
            if (onUpdate) {
                onUpdate();
            }
        } catch (err) {
            console.error('Error joining team:', err);
            setError(err.response?.data?.message || 'Failed to join team');
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
                transition: 'transform 0.2s ease-in-out'
            }
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {team.name}
                    </Typography>
                    {team.isPrivate && (
                        <LockIcon color="action" fontSize="small" />
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                    {team.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip
                        icon={<CategoryIcon />}
                        label={team.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        icon={<GroupIcon />}
                        label={`${validMembers.length} members`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                    />
                </Box>

                <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Team Members
                    </Typography>
                    <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                        {validMembers.map((member) => (
                            <Avatar
                                key={member.user._id}
                                alt={member.user.name || 'Team Member'}
                                src={member.user.avatar}
                            >
                                {member.user.name ? member.user.name[0] : '?'}
                            </Avatar>
                        ))}
                    </AvatarGroup>
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="small"
                    onClick={() => navigate(`/teams/${team._id}`)}
                >
                    View Details
                </Button>
                {!isMember && (
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleJoin}
                        disabled={loading}
                        sx={{ ml: 'auto' }}
                    >
                        {loading ? 'Joining...' : 'Join Team'}
                    </Button>
                )}
                {isMember && (
                    <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        disabled
                        sx={{ ml: 'auto' }}
                    >
                        Member
                    </Button>
                )}
            </CardActions>

            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default TeamCard;