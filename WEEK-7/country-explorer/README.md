# Country Explorer

A React + Vite application for browsing country information from the REST Countries API. The app loads countries on startup, displays them in a responsive card grid, and lets users search by country name.

## Features

- Fetches country data from `https://restcountries.com/v3.1/all`
- Shows each country's flag, name, capital, population, and region
- Debounced search input for filtering countries by name
- Loading and error states for the API request
- Responsive grid layout styled with Tailwind CSS

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  App.jsx
  Components/
    CountryCard.jsx
    CountryList.jsx
    SearchBar.jsx
```

## API

This project uses the REST Countries API and requests the following fields:

- `name`
- `capital`
- `flags`
- `population`
- `region`
