import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import Product from "./components/Product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "contactus",
          element: <ContactUs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;