import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import QuotesList from './components/QuotesList';
import CreateQuoteForm from './components/CreateQuoteForm';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0066ff',
      light: '#3385ff',
      dark: '#0052cc',
    },
    secondary: {
      main: '#ff6b35',
      light: '#ff8a5c',
      dark: '#e55a2b',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    divider: '#2a2a2a',
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #2a2a2a',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: '#404040',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        contained: {
          background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
          boxShadow: '0 2px 4px rgba(0, 102, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #3385ff 0%, #0066ff 100%)',
            boxShadow: '0 4px 8px rgba(0, 102, 255, 0.4)',
          },
        },
        outlined: {
          borderColor: '#404040',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#0066ff',
            backgroundColor: 'rgba(0, 102, 255, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0a0a0a',
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#404040',
            },
            '&:hover fieldset': {
              borderColor: '#666666',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066ff',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a0a0a0',
            '&.Mui-focused': {
              color: '#0066ff',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
          '& .MuiFormHelperText-root': {
            color: '#666666',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          color: '#ffffff',
          border: '1px solid #404040',
          fontWeight: 500,
        },
        filled: {
          backgroundColor: '#0066ff',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#3385ff',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          "&.MuiAlert-filled.MuiAlert-colorSuccess": {
            backgroundColor: '#10b981',
          },
          "&.MuiAlert-filled.MuiAlert-colorError": {
            backgroundColor: '#ef4444',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#a0a0a0',
            border: '1px solid #404040',
            '&:hover': {
              backgroundColor: '#2a2a2a',
            },
            '&.Mui-selected': {
              backgroundColor: '#0066ff',
              color: '#ffffff',
              borderColor: '#0066ff',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuoteCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar position="sticky" elevation={0}>
          <Toolbar sx={{ py: 1 }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0066ff 0%, #3385ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              QuoteVault
            </Typography>
            <Typography variant="body2" color="text.secondary">
              all systems normal
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Model Library
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Browse our library of inspiring quotes that are ready to discover and share in seconds.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 6 }}>
            <CreateQuoteForm onQuoteCreated={handleQuoteCreated} />
          </Box>
          
          <Box>
            <QuotesList key={refreshKey} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;