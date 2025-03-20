const Event = require('../models/Event');
const mongoose = require('mongoose');
const User = require('../models/User');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        // Debug logs
        console.log('1. Request body:', req.body);
        console.log('2. Auth user:', req.user);

        if (!req.user || !req.user.userId) {
            console.log('3. Authentication failed - no user ID');
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Validate required fields
        const { title, description, date, location, category } = req.body;

        if (!title || !description || !date || !location || !category) {
            console.log('4. Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create event object
        const eventData = {
            title,
            description,
            date: new Date(date),
            location,
            category,
            creator: req.user.userId,
            participants: [req.user.userId]
        };

        console.log('5. Event data to be saved:', eventData);

        // Create and save the event
        const event = new Event(eventData);
        console.log('6. Created event instance:', event);

        const savedEvent = await event.save();
        console.log('7. Saved event:', savedEvent);

        // Update user's createdEvents and joinedEvents arrays
        await User.findByIdAndUpdate(
            req.user.userId,
            {
                $addToSet: {
                    createdEvents: savedEvent._id,
                    joinedEvents: savedEvent._id
                }
            }
        );
        console.log('8. Updated user createdEvents and joinedEvents');

        // Populate creator details
        await savedEvent.populate('creator', 'name email');
        console.log('9. Populated event:', savedEvent);

        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: savedEvent
        });

    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            errors: error.errors
        });

        return res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: error.message,
            details: error.errors
        });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('creator', 'name email')
            .populate('participants', 'name email')
            .sort({ date: 1 });

        return res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message
        });
    }
};

// Get single event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('creator', 'name email')
            .populate('participants', 'name email');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching event',
            error: error.message
        });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        console.log('Update request received:', {
            eventId: req.params.id,
            body: req.body,
            user: req.user
        });

        // Validate event ID
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: 'Event ID is required'
            });
        }

        // Find event
        const event = await Event.findById(req.params.id);
        console.log('Found event:', event);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check authorization
        if (event.creator.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event'
            });
        }

        // Update event
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    location: req.body.location
                }
            },
            { new: true }
        ).populate('creator', 'name email')
            .populate('participants', 'name email');

        console.log('Updated event:', updatedEvent);

        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent
        });

    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
};

// Join event
exports.joinEvent = async (req, res) => {
    try {
        console.log('1. Starting join event process');
        console.log('User ID:', req.user.userId);
        console.log('Event ID:', req.params.id);

        // Validate IDs
        if (!req.user.userId || !req.params.id) {
            console.log('Invalid IDs:', { userId: req.user.userId, eventId: req.params.id });
            return res.status(400).json({
                success: false,
                message: 'Invalid user or event ID'
            });
        }

        // Find event
        let event;
        try {
            event = await Event.findById(req.params.id);
            console.log('2. Event found:', event ? 'Yes' : 'No');
        } catch (findError) {
            console.error('Error finding event:', findError);
            return res.status(500).json({
                success: false,
                message: 'Error finding event',
                error: findError.message
            });
        }

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is already a participant
        const isParticipant = event.participants.some(
            participantId => participantId.toString() === req.user.userId
        );
        console.log('3. Is already participant:', isParticipant);

        if (isParticipant) {
            return res.status(400).json({
                success: false,
                message: 'Already joined this event'
            });
        }

        // Update event participants
        let updatedEvent;
        try {
            console.log('4. Updating event participants');
            updatedEvent = await Event.findByIdAndUpdate(
                event._id,
                { $addToSet: { participants: req.user.userId } },
                { new: true }
            ).populate('participants', 'name email');
            console.log('5. Event updated successfully');
        } catch (eventUpdateError) {
            console.error('Error updating event:', eventUpdateError);
            return res.status(500).json({
                success: false,
                message: 'Error updating event participants',
                error: eventUpdateError.message
            });
        }

        // Update user's joinedEvents
        try {
            console.log('6. Updating user joinedEvents');
            await User.findByIdAndUpdate(
                req.user.userId,
                { $addToSet: { joinedEvents: event._id } }
            );
            console.log('7. User updated successfully');
        } catch (userUpdateError) {
            console.error('Error updating user:', userUpdateError);
            // If user update fails, revert event update
            try {
                await Event.findByIdAndUpdate(
                    event._id,
                    { $pull: { participants: req.user.userId } }
                );
            } catch (revertError) {
                console.error('Error reverting event update:', revertError);
            }
            return res.status(500).json({
                success: false,
                message: 'Error updating user joined events',
                error: userUpdateError.message
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully joined event',
            data: updatedEvent
        });
    } catch (error) {
        console.error('Unexpected error in joinEvent:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: 'Unexpected error joining event',
            error: error.message
        });
    }
};



