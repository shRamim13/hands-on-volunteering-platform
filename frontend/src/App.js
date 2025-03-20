// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import EventList from './components/events/EventList';
// import CreateEvent from './components/events/CreateEvent';
// import TeamList from './components/teams/TeamList';
// import CreateTeam from './components/teams/CreateTeam';
// import HelpRequestList from './components/helpRequests/HelpRequestList';
// import CreateHelpRequest from './components/helpRequests/CreateHelpRequest';
// import Profile from './components/profile/Profile';
// import EditProfile from './components/profile/EditProfile';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#1976d2',
//         },
//         secondary: {
//             main: '#dc004e',
//         },
//     },
// });

// function App() {
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <AuthProvider>
//                 <Router>
//                     <div className="App">
//                         <Navbar />
//                         <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
//                             <Routes>
//                                 {/* Public routes */}
//                                 <Route path="/login" element={<Login />} />
//                                 <Route path="/register" element={<Register />} />

//                                 {/* Protected routes */}
//                                 <Route path="/events" element={
//                                     <PrivateRoute>
//                                         <EventList />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/events/create" element={
//                                     <PrivateRoute>
//                                         <CreateEvent />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/teams" element={
//                                     <PrivateRoute>
//                                         <TeamList />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/teams/create" element={
//                                     <PrivateRoute>
//                                         <CreateTeam />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/help-requests" element={
//                                     <PrivateRoute>
//                                         <HelpRequestList />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/help-requests/create" element={
//                                     <PrivateRoute>
//                                         <CreateHelpRequest />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/profile" element={
//                                     <PrivateRoute>
//                                         <Profile />
//                                     </PrivateRoute>
//                                 } />
//                                 <Route path="/profile/edit" element={
//                                     <PrivateRoute>
//                                         <EditProfile />
//                                     </PrivateRoute>
//                                 } />

//                                 {/* Default route */}
//                                 <Route path="/" element={
//                                     <PrivateRoute>
//                                         <EventList />
//                                     </PrivateRoute>
//                                 } />
//                             </Routes>
//                         </main>
//                         <Footer />
//                     </div>
//                 </Router>
//             </AuthProvider>
//         </ThemeProvider>
//     );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Main Components
import Home from './components/Home';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';

// Event Components
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/events/CreateEvent';

// Team Components
import TeamList from './components/teams/TeamList';
import TeamDetails from './components/teams/TeamDetails';
import CreateTeam from './components/teams/CreateTeam';

// Help Request Components
import HelpRequestList from './components/helpRequests/HelpRequestList';
import HelpRequestDetails from './components/helpRequests/HelpRequestDetails';
import CreateHelpRequest from './components/helpRequests/CreateHelpRequest';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Create App wrapper component to use theme context
const AppContent = () => {
    const { darkMode } = useTheme();

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
            background: {
                default: darkMode ? '#121212' : '#f5f5f5',
                paper: darkMode ? '#1e1e1e' : '#ffffff',
            },
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        transition: 'background-color 0.3s ease',
                    },
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Navbar />
                        <main style={{
                            minHeight: 'calc(100vh - 120px)',
                            padding: '20px',
                            backgroundColor: theme.palette.background.default,
                            transition: 'background-color 0.3s ease'
                        }}>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    {/* Profile Routes */}
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profile/edit" element={<EditProfile />} />

                                    {/* Event Routes */}
                                    <Route path="/events" element={<EventList />} />
                                    <Route path="/events/:id" element={<EventDetails />} />
                                    <Route path="/events/create" element={<CreateEvent />} />

                                    {/* Team Routes */}
                                    <Route path="/teams" element={<TeamList />} />
                                    <Route path="/teams/create" element={<CreateTeam />} />
                                    <Route path="/teams/:id" element={<TeamDetails />} />

                                    {/* Help Request Routes */}
                                    <Route path="/help-requests" element={<HelpRequestList />} />
                                    <Route path="/help-requests/:id" element={<HelpRequestDetails />} />
                                    <Route path="/help-requests/create" element={<CreateHelpRequest />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </MuiThemeProvider>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;