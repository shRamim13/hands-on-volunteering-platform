import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Grid,
    Chip,
    Avatar,
    CircularProgress,
    Alert,
    IconButton,
    Tooltip,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AddIcon from '@mui/icons-material/Add';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        console.log('Fetching profile data...');
        fetchProfile();
    }, [location.key, refreshKey]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await authAPI.getProfile();
            console.log('Profile data received:', response.data);
            setProfile(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
            setError('Failed to load profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* Profile Header */}
                    <Grid item xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(45deg, #1a237e 30%, #283593 90%)'
                                    : 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                p: 2,
                                display: 'flex',
                                gap: 1
                            }}>
                                <Tooltip title="Refresh Profile">
                                    <IconButton onClick={handleRefresh} sx={{ color: 'white' }}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/profile/edit')}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.3)'
                                        }
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        fontSize: '3rem',
                                        border: '4px solid rgba(255, 255, 255, 0.3)'
                                    }}
                                >
                                    {profile?.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {profile?.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 3, color: 'rgba(255, 255, 255, 0.9)' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon />
                                            <Typography>{profile?.email}</Typography>
                                        </Box>
                                        {profile?.location && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOnIcon />
                                                <Typography>{profile.location}</Typography>
                                            </Box>
                                        )}
                                        {profile?.occupation && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <WorkIcon />
                                                <Typography>{profile.occupation}</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Stats Cards */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{
                                    borderRadius: 3,
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <VolunteerActivismIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            {profile?.volunteerHours || 0}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Volunteer Hours
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{
                                    borderRadius: 3,
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <EventIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            {profile?.joinedEvents?.length || 0}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Events Joined
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{
                                    borderRadius: 3,
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <AddIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                            {profile?.createdEvents?.length || 0}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Events Created
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card sx={{
                                    borderRadius: 3,
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <EventIcon sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                                            {(profile?.joinedEvents?.length || 0) + (profile?.createdEvents?.length || 0)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Events
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Bio Section */}
                    {profile?.bio && (
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                                        About
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        {profile.bio}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* Skills Section */}
                    {profile?.skills?.length > 0 && (
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                                        Skills
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {profile.skills.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                color="primary"
                                                sx={{
                                                    borderRadius: '16px',
                                                    '& .MuiChip-label': { px: 2 },
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 1
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* Events Sections */}
                    <Grid item xs={12} md={6}>
                        {profile?.joinedEvents?.length > 0 && (
                            <Card sx={{ borderRadius: 3, height: '100%' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                                        Events Joined
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {profile.joinedEvents.map((event) => (
                                            <Chip
                                                key={event._id}
                                                label={event.title}
                                                onClick={() => navigate(`/events/${event._id}`)}
                                                color="primary"
                                                sx={{
                                                    borderRadius: '16px',
                                                    '& .MuiChip-label': { px: 2 },
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 1
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {profile?.createdEvents?.length > 0 && (
                            <Card sx={{ borderRadius: 3, height: '100%' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                                        Events Created
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {profile.createdEvents.map((event) => (
                                            <Chip
                                                key={event._id}
                                                label={event.title}
                                                onClick={() => navigate(`/events/${event._id}`)}
                                                color="success"
                                                sx={{
                                                    borderRadius: '16px',
                                                    '& .MuiChip-label': { px: 2 },
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 1
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Profile;