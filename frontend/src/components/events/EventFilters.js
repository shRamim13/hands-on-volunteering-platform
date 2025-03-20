import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Typography
} from '@mui/material';

const categories = [
    'Community Service',
    'Education',
    'Environmental',
    'Healthcare',
    'Animal Welfare',
    'Arts & Culture',
    'Sports & Recreation',
    'Technology',
    'Food & Nutrition',
    'Other'
];

const EventFilters = ({ selectedCategories, onCategoryChange }) => {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        onCategoryChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Filter Events
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="category-filter-label">Categories</InputLabel>
                <Select
                    labelId="category-filter-label"
                    multiple
                    value={selectedCategories}
                    onChange={handleChange}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default EventFilters; 