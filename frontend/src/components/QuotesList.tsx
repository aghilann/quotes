import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Pagination,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { Quote } from '../types';
import { apiClient } from '../api/client';

const QuotesList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchCategory, setSearchCategory] = useState('');

  const fetchQuotes = async (pageNum = 1, category?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getQuotes(pageNum, 10, category);
      
      if (response.success) {
        setQuotes(response.data);
        setTotalPages(Math.ceil(response.total / 10));
      } else {
        setError('Failed to fetch quotes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(page, searchCategory || undefined);
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchCategory(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchQuotes(1, value || undefined);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  if (loading && quotes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Stack spacing={4}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
            🔥 Trending quotes
          </Typography>
          
          <TextField
            variant="outlined"
            placeholder="Search by category..."
            value={searchCategory}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 300 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="All" variant="filled" />
          <Chip label="Inspiration" variant="outlined" />
          <Chip label="Wisdom" variant="outlined" />
          <Chip label="Motivation" variant="outlined" />
          <Chip label="Life" variant="outlined" />
        </Box>
      </Paper>
      {quotes.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, #2a2a2a 0%, #404040 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <FormatQuoteIcon sx={{ fontSize: 40, color: '#666666' }} />
          </Box>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
            No quotes found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Be the first to deploy some wisdom to the community!
          </Typography>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
            {quotes.map((quote) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={quote.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: '#404040',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack spacing={2} sx={{ height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 1.5, 
                            background: 'linear-gradient(135deg, #0066ff 0%, #3385ff 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                            Q
                          </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography 
                            variant="body1" 
                            component="p" 
                            sx={{ 
                              fontStyle: 'italic',
                              fontSize: '1rem',
                              lineHeight: 1.5,
                              color: 'text.primary',
                            }}
                          >
                            "{quote.text}"
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {quote.category && (
                            <Chip 
                              label={quote.category} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontWeight: 500 }}
                            />
                          )}
                          <Chip 
                            label="Quote" 
                            size="small" 
                            variant="filled"
                            sx={{ fontWeight: 500 }}
                          />
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          #{quote.id}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 'auto', pt: 1 }}>
                        <Divider sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          Author: User {quote.author}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Card sx={{ p: 2 }}>
              <Box display="flex" justifyContent="center">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            </Card>
          )}
        </>
      )}
    </Stack>
  );
};

export default QuotesList;
