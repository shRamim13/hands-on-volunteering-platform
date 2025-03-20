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

const Register = () => {
    const navigate = useNavigate();
    const { register, error: authError, setError } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const success = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            if (success) {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                                Create Account
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Join our community of volunteers
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
                                label="Full Name"
                                name="name"
                                value={formData.name}
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
                                label="Confirm Password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                {loading ? <CircularProgress size={24} /> : 'Create Account'}
                            </Button>
                        </Box>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        color: '#4ECDC4',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Register;





// import React, { useState } from 'react';
// import {
//     Box,
//     Container,
//     Paper,
//     Typography,
//     TextField,
//     Button,
//     Link,
//     Alert,
//     CircularProgress,
//     InputAdornment,
//     IconButton,
//     useTheme
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { authAPI } from '../../services/api';
// import { useAuth } from '../../contexts/AuthContext';

// const Register = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();
//     const theme = useTheme();
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }

//         try {
//             setLoading(true);
//             setError('');
//             const response = await authAPI.register({
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password
//             });
            
//             if (response.success) {
//                 // Auto login after successful registration
//                 const loginResponse = await authAPI.login({
//                     email: formData.email,
//                     password: formData.password
//                 });
                
//                 if (loginResponse.success) {
//                     login(loginResponse.data.token, loginResponse.data.user);
//                     navigate('/dashboard');
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Registration failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{
//             minHeight: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
//             position: 'relative',
//             overflow: 'hidden',
//             pt: 8 // Add padding top for navbar
//         }}>
//             {/* Background Animation */}
//             <Box sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: 'url("/pattern.png")',
//                 opacity: 0.1,
//                 animation: 'float 20s linear infinite'
//             }} />

//             <Container maxWidth="sm">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <Paper
//                         elevation={24}
//                         sx={{
//                             p: 4,
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             backdropFilter: 'blur(10px)',
//                             borderRadius: '20px',
//                             border: '1px solid rgba(255, 255, 255, 0.2)',
//                             boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
//                         }}
//                     >
//                         <Box sx={{ textAlign: 'center', mb: 4 }}>
//                             <Typography variant="h4" component="h1" sx={{ 
//                                 fontWeight: 700,
//                                 background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
//                                 WebkitBackgroundClip: 'text',
//                                 WebkitTextFillColor: 'transparent'
//                             }}>
//                                 Create Account
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 Join our community of volunteers
//                             </Typography>
//                         </Box>

//                         {error && (
//                             <Alert severity="error" sx={{ mb: 2 }}>
//                                 {error}
//                             </Alert>
//                         )}

//                         <Box component="form" onSubmit={handleSubmit}>
//                             <TextField
//                                 fullWidth
//                                 label="Full Name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 sx={{
//                                     mb: 2,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '10px',
//                                         '&:hover fieldset': {
//                                             borderColor: '#4ECDC4',
//                                         }
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Email"
//                                 name="email"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 sx={{
//                                     mb: 2,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '10px',
//                                         '&:hover fieldset': {
//                                             borderColor: '#4ECDC4',
//                                         }
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Password"
//                                 name="password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     mb: 2,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '10px',
//                                         '&:hover fieldset': {
//                                             borderColor: '#4ECDC4',
//                                         }
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Confirm Password"
//                                 name="confirmPassword"
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                                 edge="end"
//                                             >
//                                                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     mb: 3,
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: '10px',
//                                         '&:hover fieldset': {
//                                             borderColor: '#4ECDC4',
//                                         }
//                                     }
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 size="large"
//                                 disabled={loading}
//                                 sx={{
//                                     py: 1.5,
//                                     borderRadius: '10px',
//                                     textTransform: 'none',
//                                     fontSize: '1.1rem',
//                                     background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
//                                     '&:hover': {
//                                         background: 'linear-gradient(45deg, #FF8E53, #FF6B6B)',
//                                     },
//                                 }}
//                             >
//                                 {loading ? <CircularProgress size={24} /> : 'Create Account'}
//                             </Button>
//                         </Box>

//                         <Box sx={{ mt: 3, textAlign: 'center' }}>
//                             <Typography variant="body2" color="text.secondary">
//                                 Already have an account?{' '}
//                                 <Link
//                                     component="button"
//                                     variant="body2"
//                                     onClick={() => navigate('/login')}
//                                     sx={{
//                                         color: '#4ECDC4',
//                                         textDecoration: 'none',
//                                         fontWeight: 600,
//                                         '&:hover': {
//                                             textDecoration: 'underline',
//                                         },
//                                     }}
//                                 >
//                                     Sign in
//                                 </Link>
//                             </Typography>
//                         </Box>
//                     </Paper>
//                 </motion.div>
//             </Container>
//         </Box>
//     );
// };

// export default Register;






