import { useState } from "react";

const INITIAL = { title: "", brand: "", description: "", price: "", priority: "Low", image: "" };

function AddTaskForm({ addTask }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Product name is required";
    else if (form.title.trim().length < 3) e.title = "Must be at least 3 characters";
    if (!form.brand.trim()) e.brand = "Brand is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price.trim()) e.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) < 0) e.price = "Enter a valid price";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    addTask({ id: Date.now(), ...form, price: parseFloat(form.price).toFixed(2), completed: false });
    setForm(INITIAL);
    setErrors({});
  };

  const inputCls = (field) =>
    `w-full border ${errors[field] ? "border-red-400" : "border-gray-300"} rounded-lg px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-700">Add New Product Task</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Product Name *</label>
          <input className={inputCls("title")} placeholder="e.g. Nike Air Max" value={form.title} onChange={set("title")} />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Brand *</label>
          <input className={inputCls("brand")} placeholder="e.g. Nike" value={form.brand} onChange={set("brand")} />
          {errors.brand && <p className="text-red-500 text-xs">{errors.brand}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Price *</label>
          <input className={inputCls("price")} placeholder="e.g. 129.99" value={form.price} onChange={set("price")} type="number" min="0" step="0.01" />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Priority</label>
          <select className={inputCls("priority")} value={form.priority} onChange={set("priority")}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Image URL</label>
        <input className={inputCls("image")} placeholder="https://..." value={form.image} onChange={set("image")} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Description *</label>
        <textarea
          className={`${inputCls("description")} resize-none`}
          rows={2}
          placeholder="Short product description..."
          value={form.description}
          onChange={set("description")}
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;