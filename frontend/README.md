# Quotes Frontend

A React TypeScript frontend application for displaying and creating quotes, built with Material UI and Vite.

## Features

- **Display Quotes**: View quotes in a responsive grid layout
- **Create Quotes**: Add new quotes with optional categories
- **Search & Filter**: Search quotes by category
- **Pagination**: Navigate through multiple pages of quotes
- **Responsive Design**: Works on desktop and mobile devices
- **Material UI**: Modern, accessible UI components

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - UI component library
- **Fetch API** - HTTP client (no Axios)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the backend API at `http://localhost:8000`. All quotes are created with a hardcoded author ID of 1.

### API Endpoints Used

- `GET /quotes/` - Fetch quotes with pagination and filtering
- `POST /quotes/` - Create new quotes
- `GET /users/` - Fetch users (for future features)

## Project Structure

```
src/
├── api/
│   └── client.ts          # API client using fetch
├── components/
│   ├── CreateQuoteForm.tsx # Form for creating quotes
│   └── QuotesList.tsx     # List of quotes with pagination
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Features in Detail

### Quote Display
- Quotes are displayed in a responsive grid
- Each quote shows the text, category (if any), and metadata
- Cards are styled with Material UI components

### Quote Creation
- Simple form with text area for quote content
- Optional category field
- All quotes are attributed to User ID 1 (hardcoded)
- Form validation and error handling

### Search & Pagination
- Search quotes by category with real-time filtering
- Pagination controls for navigating through results
- Loading states and error handling

## Development

The application uses:
- **Material UI Theme**: Custom theme with primary/secondary colors
- **TypeScript**: Full type safety for API responses and components
- **React Hooks**: useState, useEffect for state management
- **Fetch API**: Native browser API for HTTP requests

## Future Enhancements

- User authentication and management
- Quote editing and deletion
- User profiles and quote attribution
- Advanced filtering and sorting
- Quote sharing and social features