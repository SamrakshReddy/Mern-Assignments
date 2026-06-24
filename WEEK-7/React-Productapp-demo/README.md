# React Product App Demo

A React + Vite product browsing demo that fetches products from Fake Store API. The app includes page navigation, a product listing page, search and category filters, and a product detail view.

## Features

- Fetches products from `https://fakestoreapi.com/products`
- Product grid with image, title, price, and category
- Search products by title
- Filter products by category
- Click a product card to open its detail page
- Client-side routing for Home, Products, Product Details, and Contact Us pages
- Loading and error states for product data
- Tailwind CSS utility styling

## Tech Stack

- React 19
- Vite 7
- React Router 7
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

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products` | Product list with search and category filtering |
| `/product` | Product detail page for the selected product |
| `/contactus` | Contact Us |

## Project Structure

```text
src/
  App.jsx
  components/
    ContactUs.jsx
    Footer.jsx
    Header.jsx
    Home.jsx
    Product.jsx
    ProductList.jsx
    RootLayout.jsx
```

## API

This project uses Fake Store API product data, including:

- `title`
- `price`
- `description`
- `category`
- `image`
