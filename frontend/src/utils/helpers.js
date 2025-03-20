import { format } from 'date-fns';

export const formatDate = (date) => {
    return format(new Date(date), 'PPP');
};

export const formatDateTime = (date) => {
    return format(new Date(date), 'PPp');
};

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

export const getInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

export const urgencyLevels = [
    { value: 'low', label: 'Low', color: '#4caf50' },
    { value: 'medium', label: 'Medium', color: '#ff9800' },
    { value: 'high', label: 'High', color: '#f44336' }
];

export const eventCategories = [
    'Community Service',
    'Environmental',
    'Education',
    'Health',
    'Animal Welfare',
    'Elderly Care',
    'Youth Development',
    'Disaster Relief',
    'Other'
]; 