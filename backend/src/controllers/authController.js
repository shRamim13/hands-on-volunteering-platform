const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register Controller
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create new user
        user = new User({
            name,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message
        });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    skills: user.skills,
                    causes: user.causes,
                    bio: user.bio
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message
        });
    }
};

// Get Profile Controller
exports.getProfile = async (req, res) => {
    try {
        console.log('1. Fetching profile for user:', req.user.userId);

        const user = await User.findById(req.user.userId)
            .select('-password')
            .populate({
                path: 'joinedEvents',
                select: 'title date location status',
                options: { sort: { date: 1 } }
            })
            .populate({
                path: 'createdEvents',
                select: 'title date location status',
                options: { sort: { date: 1 } }
            });

        if (!user) {
            console.log('2. User not found');
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('3. Found user profile:', {
            id: user._id,
            joinedEventsCount: user.joinedEvents?.length || 0,
            createdEventsCount: user.createdEvents?.length || 0,
            joinedEventIds: user.joinedEvents?.map(e => e._id),
            createdEventIds: user.createdEvents?.map(e => e._id)
        });

        // Double check the arrays are properly populated
        console.log('4. Joined Events:', JSON.stringify(user.joinedEvents, null, 2));
        console.log('5. Created Events:', JSON.stringify(user.createdEvents, null, 2));

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                skills: user.skills,
                causes: user.causes,
                joinedEvents: user.joinedEvents || [],
                createdEvents: user.createdEvents || [],
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};

// Update Profile Controller
exports.updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, bio, skills, causes } = req.body;

        const updateData = {
            ...(name && { name }),
            ...(bio && { bio }),
            ...(skills && { skills }),
            ...(causes && { causes })
        };

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};