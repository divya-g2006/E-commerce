// import { useState, useEffect  } from 'react';
// import { Edit, Trash2, Plus, X } from 'lucide-react';
// import api from '../lib/api';
// import { useAuth } from '../contexts/AuthContext';
// import { formatINR } from '../lib/format';

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   stock: number;
// }

// type AdminPanelProps = {
//   onClose: () => void;
// };

// export default function AdminPanel({ onClose }: AdminPanelProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     category: 'Electronics',
//     stock: '',
//   });
//   const { user } = useAuth();
//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//     if (isAdmin) {
//       loadProducts();
//     }
//   }, [isAdmin]);

//   const loadProducts = async () => {
//     try {
//       const response = await api.get('/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error loading products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const productData = {
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       image: formData.image,
//       category: formData.category,
//       stock: parseInt(formData.stock),
//     };

//     try {
//       if (editingProduct) {
//         await api.put(`/products/${editingProduct._id}`, productData);
//         alert('Product updated successfully!');
//       } else {
//         await api.post('/products', productData);
//         alert('Product created successfully!');
//       }
      
//       resetForm();
//       loadProducts();
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to save product');
//     }
//   };

//   const handleEdit = (product: Product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description,
//       price: product.price.toString(),
//       image: product.image,
//       category: product.category,
//       stock: product.stock.toString(),
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (productId: string) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//       await api.delete(`/products/${productId}`);
//       alert('Product deleted successfully!');
//       loadProducts();
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to delete product');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       description: '',
//       price: '',
//       image: '',
//       category: 'Electronics',
//       stock: '',
//     });
//     setEditingProduct(null);
//     setShowForm(false);
//   };

//   if (!isAdmin) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-600 mb-6">You don't have permission to access this panel.</p>
//           <button
//             onClick={onClose}
//             className="w-full bg-[#7C3AED] text-white py-2 px-4 rounded-lg hover:bg-[#6D28D9]"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-8">
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//       <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-8 my-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-[#7C3AED]">Admin Panel</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="mb-6">
//           <button
//             onClick={() => setShowForm(true)}
//             className="flex items-center space-x-2 bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9]"
//           >
//             <Plus size={20} />
//             <span>Add Product</span>
//           </button>
//         </div>

//         {showForm && (
//           <div className="mb-8 p-6 border border-gray-200 rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">
//               {editingProduct ? 'Edit Product' : 'Add New Product'}
//             </h3>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                 >
//                   <option value="Electronics">Electronics</option>
//                   <option value="Clothing">Clothing</option>
//                   <option value="Books">Books</option>
//                   <option value="Home">Home</option>
//                   <option value="Sports">Sports</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//                 <input
//                   type="number"
//                   value={formData.stock}
//                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                   rows={3}
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//                 <input
//                   type="text"
//                   value={formData.image}
//                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2 flex space-x-4">
//                 <button
//                   type="submit"
//                   className="bg-[#7C3AED] text-white px-6 py-2 rounded-lg hover:bg-[#6D28D9]"
//                 >
//                   {editingProduct ? 'Update Product' : 'Add Product'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left p-2">Image</th>
//                 <th className="text-left p-2">Name</th>
//                 <th className="text-left p-2">Price</th>
//                 <th className="text-left p-2">Category</th>
//                 <th className="text-left p-2">Stock</th>
//                 <th className="text-left p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-b">
//                   <td className="p-2">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-2 font-medium">{product.name}</td>
//                   <td className="p-2">{formatINR(product.price)}</td>
//                   <td className="p-2">{product.category}</td>
//                   <td className="p-2">{product.stock}</td>
//                   <td className="p-2">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="p-1 text-blue-600 hover:text-blue-700"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="p-1 text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { formatINR } from '../lib/format';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

type AdminPanelProps = {
  onClose: () => void;
};

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Electronics',
    stock: '',
  });

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      stock: parseInt(formData.stock),
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productData);
        alert('Product updated successfully!');
      } else {
        await api.post('/products', productData);
        alert('Product created successfully!');
      }

      resetForm();
      loadProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${productId}`);
      alert('Product deleted successfully!');
      loadProducts();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'Electronics',
      stock: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this panel.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#7C3AED] text-white py-2 px-4 rounded-lg hover:bg-[#6D28D9]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-8 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#7C3AED]">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D28D9]"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Home</option>
                <option>Sports</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="md:col-span-2 w-full px-3 py-2 border rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="md:col-span-2 w-full px-3 py-2 border rounded-lg"
                required
              />

              <div className="md:col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="bg-[#7C3AED] text-white px-6 py-2 rounded-lg hover:bg-[#6D28D9]"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE SECTION */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Stock</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{formatINR(product.price)}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}