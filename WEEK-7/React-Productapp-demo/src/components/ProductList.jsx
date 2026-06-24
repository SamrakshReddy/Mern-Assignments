import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function ProductsList() {

  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)
  let [searchTerm, setSearchTerm] = useState("")
  let [selectedCategory, setSelectedCategory] = useState("all")

  const Navigate = useNavigate()

  const gotoProduct = (productObj) => {
    Navigate('/product', { state: { product: productObj } })
  }

  useEffect(() => {

    async function getProducts() {
      try {
        setLoading(true)
        let res = await fetch("https://fakestoreapi.com/products")

        if (res.status === 200) {
          let productsData = await res.json()
          setProducts(productsData)
        } else {
          throw new Error("Failed to fetch")
        }

      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProducts()

  }, [])

  // 🔥 Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))]

  // 🔥 Combined Filter (Search + Category)
  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <p className="text-center text-2xl text-blue-500">Loading...</p>
  }

  if (error) {
    return (
      <p className="text-center text-2xl text-red-500">
        {error.message}
      </p>
    )
  }

  return (
    <div className="p-6">

      {/* 🔥 FILTER SECTION */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow w-72"
        />

        {/* 🔽 Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded shadow"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* 🔥 PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((productObj) => (
            <div
              onClick={() => gotoProduct(productObj)}
              key={productObj.id}
              className="border p-4 rounded shadow cursor-pointer hover:scale-105 transition"
            >
              <img
                src={productObj.image}
                alt={productObj.title}
                className="h-40 mx-auto object-contain"
              />
              <h2 className="text-lg font-semibold mt-4">
                {productObj.title}
              </h2>
              <p className="text-gray-600 mt-2">
                ${productObj.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {productObj.category}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-4">
            No products found
          </p>
        )}
      </div>

    </div>
  )
}

export default ProductsList