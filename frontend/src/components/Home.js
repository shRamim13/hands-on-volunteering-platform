import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    useTheme,
    useMediaQuery,
    IconButton,
    Paper,
    CircularProgress,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import heroImage from '../assets/images/second.jpg';
import darkPattern from '../assets/images/black3.jpg';
import lightPattern from '../assets/images/ssssss.jpg';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [imageError, setImageError] = useState(false);
    const [statsLoading, setStatsLoading] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Simulate loading stats
        const timer = setTimeout(() => {
            setStatsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Check for login/registration redirect
    useEffect(() => {
        const isNewLogin = sessionStorage.getItem('justLoggedIn');
        const isNewRegistration = sessionStorage.getItem('justRegistered');

        if (isNewLogin) {
            sessionStorage.removeItem('justLoggedIn');
            setError('Welcome back!');
            setTimeout(() => setError(null), 3000);
        }

        if (isNewRegistration) {
            sessionStorage.removeItem('justRegistered');
            setError('Welcome to our community!');
            setTimeout(() => setError(null), 3000);
        }
    }, []);

    const features = [
        {
            icon: <VolunteerActivismIcon sx={{ fontSize: 60, color: '#FF6B6B' }} />,
            title: 'Volunteer Together',
            description: 'Join hands with like-minded individuals to make a difference in your community.'
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 60, color: '#4ECDC4' }} />,
            title: 'Build Teams',
            description: 'Create and join teams to tackle larger community projects together.'
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 60, color: '#FFD93D' }} />,
            title: 'Track Impact',
            description: 'Monitor your contributions and see the positive change you\'re making.'
        }
    ];

    const stats = [
        { number: '1000+', label: 'Active Volunteers' },
        { number: '500+', label: 'Community Projects' },
        { number: '50+', label: 'Partner Organizations' },
        { number: '10K+', label: 'Hours Contributed' }
    ];

    const quickActions = [
        {
            title: 'Events',
            description: 'Browse and join community events',
            icon: <EventIcon sx={{ fontSize: 40, color: '#FF6B6B' }} />,
            path: '/events'
        },
        {
            title: 'Help Requests',
            description: 'Respond to community needs',
            icon: <HelpIcon sx={{ fontSize: 40, color: '#4ECDC4' }} />,
            path: '/help-requests'
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            overflow: 'hidden'
        }}>
            {error && (
                <Alert
                    severity="success"
                    sx={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 1000
                    }}
                >
                    {error}
                </Alert>
            )}

            {/* Hero Section */}
            <Box sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? `url(${darkPattern})`
                        : `url(${lightPattern})`,
                    opacity: 0.1,
                    zIndex: 1
                }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography variant="h1" sx={{
                                    fontSize: isMobile ? '2.5rem' : '4rem',
                                    fontWeight: 800,
                                    mb: 3,
                                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Make a Difference Together
                                </Typography>
                                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                    Join our community of volunteers and create lasting impact in your neighborhood.
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 4,
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: isMobile ? 'stretch' : 'flex-start'
                                }}>
                                    {user ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={() => navigate('/events')}
                                                fullWidth={isMobile}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                                    borderRadius: '30px',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                                                    }
                                                }}
                                            >
                                                Browse Events
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                onClick={() => navigate('/help-requests')}
                                                fullWidth={isMobile}
                                                sx={{
                                                    borderColor: '#4ECDC4',
                                                    color: '#4ECDC4',
                                                    borderRadius: '30px',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        borderColor: '#4ECDC4',
                                                        background: 'rgba(78, 205, 196, 0.1)',
                                                    }
                                                }}
                                            >
                                                Help Requests
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                onClick={() => navigate('/login')}
                                                fullWidth={isMobile}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                                    borderRadius: '30px',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                                                    }
                                                }}
                                            >
                                                Sign In
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                onClick={() => navigate('/register')}
                                                fullWidth={isMobile}
                                                sx={{
                                                    borderColor: '#4ECDC4',
                                                    color: '#4ECDC4',
                                                    borderRadius: '30px',
                                                    px: 4,
                                                    py: 1.5,
                                                    '&:hover': {
                                                        borderColor: '#4ECDC4',
                                                        background: 'rgba(78, 205, 196, 0.1)',
                                                    }
                                                }}
                                            >
                                                Get Started
                                            </Button>
                                        </>
                                    )}
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton sx={{ color: '#1877F2' }}>
                                        <FacebookIcon />
                                    </IconButton>
                                    <IconButton sx={{ color: '#1DA1F2' }}>
                                        <TwitterIcon />
                                    </IconButton>
                                    <IconButton sx={{ color: '#E4405F' }}>
                                        <InstagramIcon />
                                    </IconButton>
                                    <IconButton sx={{ color: '#0A66C2' }}>
                                        <LinkedInIcon />
                                    </IconButton>
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Box
                                    component="img"
                                    src={heroImage}
                                    alt="Volunteer Together"
                                    onError={() => setImageError(true)}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 500,
                                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                                        animation: 'float 6s ease-in-out infinite',
                                        objectFit: 'cover',
                                        borderRadius: '20px'
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Quick Actions Section */}
            <Box sx={{ py: 8, background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 700
                    }}>
                        Quick Actions
                    </Typography>
                    <Grid container spacing={4}>
                        {quickActions.map((action, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Paper
                                        onClick={() => navigate(action.path)}
                                        sx={{
                                            p: 4,
                                            cursor: 'pointer',
                                            background: theme.palette.mode === 'dark'
                                                ? 'rgba(255,255,255,0.05)'
                                                : 'rgba(255,255,255,0.8)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '20px',
                                            border: theme.palette.mode === 'dark'
                                                ? '1px solid rgba(255,255,255,0.1)'
                                                : '1px solid rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                            {action.icon}
                                            <Box>
                                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {action.title}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    {action.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {statsLoading ? (
                                        <Box sx={{
                                            height: 100,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CircularProgress size={40} />
                                        </Box>
                                    ) : (
                                        <>
                                            <Typography variant="h3" sx={{
                                                fontWeight: 700,
                                                color: '#FF6B6B',
                                                mb: 1
                                            }}>
                                                {stat.number}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                {stat.label}
                                            </Typography>
                                        </>
                                    )}
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 8, background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 700
                    }}>
                        Why Choose Us
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card sx={{
                                        height: '100%',
                                        background: theme.palette.mode === 'dark'
                                            ? 'rgba(255,255,255,0.05)'
                                            : 'rgba(255,255,255,0.8)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        border: theme.palette.mode === 'dark'
                                            ? '1px solid rgba(255,255,255,0.1)'
                                            : '1px solid rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: theme.palette.mode === 'dark'
                                                ? '0 10px 20px rgba(0,0,0,0.3)'
                                                : '0 10px 20px rgba(0,0,0,0.1)',
                                        }
                                    }}>
                                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                            {feature.icon}
                                            <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                                {feature.description}
                                            </Typography>
                                            <Button
                                                endIcon={<ArrowForwardIcon />}
                                                sx={{
                                                    mt: 2,
                                                    color: '#4ECDC4',
                                                    '&:hover': {
                                                        background: 'rgba(78, 205, 196, 0.1)',
                                                    }
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <IconButton
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                        }
                    }}
                >
                    <ArrowUpwardIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Home;