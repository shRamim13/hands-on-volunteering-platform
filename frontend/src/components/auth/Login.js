// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//     Container,
//     Paper,
//     TextField,
//     Button,
//     Typography,
//     Box,
//     Alert,
//     CircularProgress
// } from '@mui/material';
// import { useAuth } from '../../contexts/AuthContext';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { login, error, user } = useAuth();
//     const navigate = useNavigate();

//     // Redirect if already logged in
//     useEffect(() => {
//         if (user) {
//             navigate('/');
//         }
//     }, [user, navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             const success = await login(formData);
//             if (success) {
//                 navigate('/');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
//                 <Typography variant="h4" component="h1" align="center" gutterBottom>
//                     Login
//                 </Typography>
//                 {error && (
//                     <Alert severity="error" sx={{ mb: 2 }}>
//                         {error}
//                     </Alert>
//                 )}
//                 <Box component="form" onSubmit={handleSubmit}>
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         margin="normal"
//                         required
//                         disabled={isSubmitting}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Password"
//                         name="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                         margin="normal"
//                         required
//                         disabled={isSubmitting}
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
//                     </Button>
//                     <Box textAlign="center">
//                         <Typography variant="body2">
//                             Don't have an account?{' '}
//                             <Link to="/register">Register</Link>
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Paper>
//         </Container>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Link,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, error: authError, setError } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const success = await login(formData);
            if (success) {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            position: 'relative',
            overflow: 'hidden',
            pt: 8
        }}>
            {/* Animated Background */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: theme.palette.mode === 'dark'
                    ? 'url("/dark-pattern.png")'
                    : 'url("/light-pattern.png")',
                opacity: 0.1,
                animation: 'float 20s linear infinite'
            }} />

            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={24}
                        sx={{
                            p: 4,
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(30, 30, 30, 0.9)'
                                : 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: theme.palette.mode === 'dark'
                                ? '1px solid rgba(255, 255, 255, 0.1)'
                                : '1px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                                : '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" component="h1" sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Sign in to continue your journey
                            </Typography>
                        </Box>

                        {authError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {authError}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        '&:hover fieldset': {
                                            borderColor: '#4ECDC4',
                                        }
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        '&:hover fieldset': {
                                            borderColor: '#4ECDC4',
                                        }
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
                                    },
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Sign In'}
                            </Button>
                        </Box>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        color: '#4ECDC4',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign up
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Login;