import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
    Badge,
    Container,
    Fade,
    Slide
} from '@mui/material';
import {
    Menu as MenuIcon,
    Person as PersonIcon,
    Event as EventIcon,
    Group as GroupIcon,
    Help as HelpIcon,
    Logout as LogoutIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    Notifications as NotificationsIcon,
    Dashboard as DashboardIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const theme = useTheme();
    const { darkMode, toggleDarkMode } = useCustomTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsAnchor, setNotificationsAnchor] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotificationsAnchor(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
        handleClose();
    };

    const navItems = [
        { text: 'Events', icon: <EventIcon />, path: '/events' },
        { text: 'Teams', icon: <GroupIcon />, path: '/teams' },
        { text: 'Help Requests', icon: <HelpIcon />, path: '/help-requests' },
    ];

    const drawer = (
        <Box sx={{ width: 280 }}>
            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    HansOn
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {user && (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 1,
                            border: `3px solid ${darkMode ? 'primary.light' : 'primary.main'}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        src={user.avatar}
                    >
                        {user?.name?.[0]}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Box>
            )}
            <Divider sx={{ my: 1 }} />
            <List>
                {navItems.map((item) => (
                    <ListItem
                        key={item.text}
                        button
                        component={RouterLink}
                        to={item.path}
                        selected={location.pathname === item.path}
                        onClick={handleDrawerToggle}
                        sx={{
                            mx: 1,
                            borderRadius: 1,
                            mb: 0.5,
                            '&.Mui-selected': {
                                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                                '&:hover': {
                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'
                                }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Slide appear={false} direction="down" in={!scrolled}>
            <AppBar
                position="sticky"
                elevation={scrolled ? 2 : 0}
                sx={{
                    backgroundColor: darkMode
                        ? scrolled ? 'rgba(18, 18, 18, 0.95)' : 'rgba(18, 18, 18, 0.8)'
                        : scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { md: 'none' },
                                '&:hover': {
                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Fade in={true} timeout={1000}>
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    flexGrow: { xs: 1, md: 0 },
                                    mr: { md: 4 },
                                    textDecoration: 'none',
                                    color: darkMode ? 'primary.light' : 'primary.main',
                                    fontWeight: 700,
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    }
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        '&::before': {
                                            content: '"Hands"',
                                            color: darkMode ? '#4CAF50' : '#2E7D32',
                                            fontWeight: 800,
                                            fontSize: '1.8rem'
                                        }
                                    }}
                                >
                                    On
                                </Box>
                            </Typography>
                        </Fade>

                        {!isMobile && (
                            <Fade in={true} timeout={1000}>
                                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.text}
                                            component={RouterLink}
                                            to={item.path}
                                            color="inherit"
                                            startIcon={item.icon}
                                            sx={{
                                                color: location.pathname === item.path
                                                    ? darkMode ? 'primary.light' : 'primary.main'
                                                    : darkMode ? 'text.primary' : 'text.primary',
                                                fontWeight: 500,
                                                px: 2,
                                                py: 1,
                                                borderRadius: 1,
                                                '&:hover': {
                                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </Button>
                                    ))}
                                </Box>
                            </Fade>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
                                <IconButton
                                    onClick={toggleDarkMode}
                                    sx={{
                                        color: darkMode ? 'primary.light' : 'primary.main',
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'rotate(180deg)',
                                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                                </IconButton>
                            </Tooltip>

                            {user ? (
                                <>
                                    <IconButton
                                        onClick={handleMenu}
                                        sx={{
                                            p: 0.5,
                                            border: `2px solid ${darkMode ? 'primary.light' : 'primary.main'}`,
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            }
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: darkMode ? 'primary.dark' : 'primary.light'
                                            }}
                                            src={user.avatar}
                                        >
                                            {user.name?.[0]}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                minWidth: 200,
                                                borderRadius: 2,
                                                backgroundColor: darkMode ? 'background.paper' : 'background.paper',
                                                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
                                                boxShadow: darkMode
                                                    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                                                    : '0 4px 20px rgba(0, 0, 0, 0.08)'
                                            }
                                        }}
                                    >
                                        <MenuItem
                                            component={RouterLink}
                                            to="/profile"
                                            onClick={handleClose}
                                            sx={{
                                                py: 1.5,
                                                '&:hover': {
                                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon>
                                                <PersonIcon fontSize="small" />
                                            </ListItemIcon>
                                            Profile
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem
                                            onClick={handleLogout}
                                            sx={{
                                                py: 1.5,
                                                color: 'error.main',
                                                '&:hover': {
                                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon>
                                                <LogoutIcon fontSize="small" color="error" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        color="inherit"
                                        sx={{
                                            fontWeight: 500,
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/register"
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            fontWeight: 500,
                                            px: 3,
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)'
                                            },
                                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    );
};

export default Navbar;