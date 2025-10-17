import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { QuoteCreate } from '../types';
import { apiClient } from '../api/client';

interface CreateQuoteFormProps {
  onQuoteCreated?: () => void;
}

const CreateQuoteForm: React.FC<CreateQuoteFormProps> = ({ onQuoteCreated }) => {
  const [formData, setFormData] = useState<QuoteCreate>({
    text: '',
    category: '',
    author: 1, // Hardcoded user ID as requested
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof QuoteCreate) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.text.trim()) {
      setError('Quote text is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const quoteToCreate: QuoteCreate = {
        text: formData.text.trim(),
        category: formData.category?.trim() || undefined,
        author: 1, // Hardcoded user ID
      };

      const response = await apiClient.createQuote(quoteToCreate);

      if (response.success) {
        setSuccess(true);
        setFormData({
          text: '',
          category: '',
          author: 1,
        });
        
        // Call the callback to refresh the quotes list
        if (onQuoteCreated) {
          onQuoteCreated();
        }
      } else {
        setError('Failed to create quote');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Generate a random profile picture URL
  const profilePictureUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar 
          src={profilePictureUrl}
          sx={{ 
            width: 48, 
            height: 48, 
            mr: 2,
            border: '2px solid #0066ff',
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            What's your quote for today?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Share wisdom that inspires others
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <PhotoCameraIcon />
        </IconButton>
      </Box>

      <Stack spacing={2}>
        {error && (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" variant="filled">
            Your quote has been shared! ✨
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your daily wisdom..."
              value={formData.text}
              onChange={handleInputChange('text')}
              required
              disabled={loading}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0a0a0a',
                  borderRadius: 3,
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                placeholder="Add a category (optional)"
                value={formData.category}
                onChange={handleInputChange('category')}
                disabled={loading}
                variant="outlined"
                size="small"
                sx={{ 
                  flexGrow: 1, 
                  mr: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0a0a0a',
                    borderRadius: 3,
                  },
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !formData.text.trim()}
                sx={{ 
                  minWidth: 100,
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Share'
                )}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default CreateQuoteForm;
