# Stud Pay Frontend

This is the React frontend for the Stud Pay application, a student payment system for HTTC (Higher Technical Teachers' Training College).

## Features

- **Payment Form**: Student payment interface with form validation
- **Stripe Integration**: Secure payment processing using Stripe Elements
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Stripe Elements** - Secure payment form components
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js v18 or higher
- Backend API running (see main README)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

   Configure the following variables:
   ```env
   VITE_API_URL="http://localhost:3001/api"
   VITE_STRIPE_PUBLIC_KEY="pk_test_..."
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/              # API client functions
│   ├── client.ts     # Base fetch wrapper
│   ├── payment.ts    # Payment API calls
│   └── references.ts # Reference data API calls
├── components/       # Reusable React components
│   └── CheckoutForm.tsx
├── lib/              # Utility libraries
│   └── stripe.ts     # Stripe configuration
├── pages/            # Page components
│   └── PayScreen.tsx # Main payment page
├── index.css         # Global styles
└── main.tsx          # Application entry point
```

## Environment Variables

- `VITE_API_URL` - Backend API base URL
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key for client-side operations