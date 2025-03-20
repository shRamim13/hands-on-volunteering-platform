import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    Avatar,
    AvatarGroup,
    Alert,
    IconButton,
    Tooltip,
    Divider,
    LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
    Event as EventIcon,
    LocationOn as LocationIcon,
    Group as GroupIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const EventCard = ({ event, onEventUpdate }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const { darkMode } = useCustomTheme();

    const isParticipant = event.participants?.some(
        participant => participant._id === user._id
    );

    const isFull = event.participants?.length >= event.maxParticipants;
    const participationPercentage = (event.participants?.length / event.maxParticipants) * 100;

    const handleJoin = async () => {
        try {
            setLoading(true);
            setError(null);
            await eventsAPI.join(event._id);
            if (onEventUpdate) {
                onEventUpdate();
            }
        } catch (error) {
            console.error('Error joining event:', error);
            setError(error.response?.data?.message || 'Failed to join event');
        } finally {
            setLoading(false);
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Community Service': { light: '#4CAF50', dark: '#81C784', bg: '#E8F5E9' },
            'Education': { light: '#1976D2', dark: '#64B5F6', bg: '#E3F2FD' },
            'Environmental': { light: '#00796B', dark: '#4DB6AC', bg: '#E0F2F1' },
            'Healthcare': { light: '#D32F2F', dark: '#E57373', bg: '#FFEBEE' },
            'Animal Welfare': { light: '#F57C00', dark: '#FFB74D', bg: '#FFF3E0' },
            'Arts & Culture': { light: '#7B1FA2', dark: '#BA68C8', bg: '#F3E5F5' },
            'Sports & Recreation': { light: '#C2185B', dark: '#F06292', bg: '#FCE4EC' },
            'Technology': { light: '#455A64', dark: '#90A4AE', bg: '#ECEFF1' },
            'Food & Nutrition': { light: '#5D4037', dark: '#A1887F', bg: '#EFEBE9' },
            'Other': { light: '#616161', dark: '#9E9E9E', bg: '#F5F5F5' }
        };
        return colors[category] || colors['Other'];
    };

    const categoryColors = getCategoryColor(event.category);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                position: 'relative',
                overflow: 'visible',
                bgcolor: darkMode ? 'background.paper' : '#ffffff',
                boxShadow: darkMode
                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                    : '0 2px 12px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: darkMode
                        ? '0 8px 25px rgba(0, 0, 0, 0.4)'
                        : '0 12px 28px rgba(0, 0, 0, 0.08)',
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    bgcolor: darkMode ? categoryColors.dark : categoryColors.light,
                    color: '#fff',
                    py: 0.6,
                    px: 2,
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    zIndex: 1,
                    textTransform: 'uppercase'
                }}
            >
                {event.category}
            </Box>

            <CardContent
                sx={{
                    flexGrow: 1,
                    pt: 3,
                    pb: 2,
                    px: 3,
                    background: darkMode
                        ? 'transparent'
                        : `linear-gradient(to bottom right, ${categoryColors.bg}, #ffffff)`
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        mb: 2,
                        color: darkMode ? 'text.primary' : '#1a1a1a',
                        lineHeight: 1.3
                    }}
                >
                    {event.title}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2.5,
                        gap: 2.5,
                        flexWrap: 'wrap'
                    }}
                >
                    <Tooltip title="Event Date" arrow>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: darkMode ? 'text.secondary' : 'rgba(0, 0, 0, 0.7)',
                                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                py: 0.5,
                                px: 1,
                                borderRadius: 1.5
                            }}
                        >
                            <EventIcon sx={{ fontSize: 18, mr: 0.7 }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {new Date(event.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Box>
                    </Tooltip>

                    <Tooltip title="Location" arrow>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: darkMode ? 'text.secondary' : 'rgba(0, 0, 0, 0.7)',
                                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                py: 0.5,
                                px: 1,
                                borderRadius: 1.5
                            }}
                        >
                            <LocationIcon sx={{ fontSize: 18, mr: 0.7 }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                                {event.location}
                            </Typography>
                        </Box>
                    </Tooltip>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        mb: 3,
                        color: darkMode ? 'text.secondary' : 'rgba(0, 0, 0, 0.7)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '4.5em',
                        lineHeight: '1.5em',
                        fontSize: '0.9rem'
                    }}
                >
                    {event.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                            bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                            p: 1,
                            borderRadius: 2
                        }}
                    >
                        <GroupIcon sx={{ fontSize: 20, mr: 1, color: darkMode ? 'text.secondary' : 'rgba(0, 0, 0, 0.7)' }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: darkMode ? 'text.secondary' : 'rgba(0, 0, 0, 0.7)',
                                fontWeight: 500
                            }}
                        >
                            {event.participants?.length || 0}/{event.maxParticipants} participants
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={participationPercentage}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                            mb: 2,
                            '& .MuiLinearProgress-bar': {
                                bgcolor: isFull
                                    ? darkMode ? '#ef5350' : '#d32f2f'
                                    : darkMode ? '#66bb6a' : '#2e7d32',
                                borderRadius: 4
                            }
                        }}
                    />

                    <Box sx={{ mt: 2 }}>
                        <AvatarGroup
                            max={4}
                            sx={{
                                justifyContent: 'flex-start',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.9rem',
                                    border: `2px solid ${darkMode ? '#1a1a1a' : '#ffffff'}`,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        zIndex: 2
                                    }
                                }
                            }}
                        >
                            {event.participants?.map((participant) => (
                                <Tooltip key={participant._id} title={participant.name} arrow>
                                    <Avatar
                                        alt={participant.name}
                                        src={participant.avatar}
                                        sx={{
                                            bgcolor: participant._id === user._id
                                                ? darkMode ? categoryColors.dark : categoryColors.light
                                                : undefined
                                        }}
                                    >
                                        {participant.name[0]}
                                    </Avatar>
                                </Tooltip>
                            ))}
                        </AvatarGroup>
                    </Box>
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            border: '1px solid rgba(211, 47, 47, 0.3)'
                        }}
                    >
                        {error}
                    </Alert>
                )}
            </CardContent>

            <Divider sx={{ opacity: darkMode ? 0.1 : 0.05 }} />

            <CardActions sx={{ p: 2.5, gap: 1.5 }}>
                <Button
                    size="medium"
                    onClick={() => navigate(`/events/${event._id}`)}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        color: darkMode ? 'text.primary' : 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                            bgcolor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    View Details
                </Button>
                <Button
                    size="medium"
                    variant={isParticipant ? "outlined" : "contained"}
                    color={isParticipant ? "success" : "primary"}
                    onClick={handleJoin}
                    disabled={loading || isParticipant || isFull}
                    sx={{
                        ml: 'auto',
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: isParticipant ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                            boxShadow: isParticipant ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }
                    }}
                >
                    {loading ? "Joining..." :
                        isParticipant
                            ? "Joined"
                            : isFull
                                ? "Event Full"
                                : "Join Event"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;