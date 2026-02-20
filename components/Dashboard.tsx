
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product, Order } from '../types';

interface DashboardProps {
    products: Product[];
    orders: Order[];
    onAddProduct: (product: Product) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (id: string) => void;
    onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    products,
    orders,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    onBack
}) => {
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        tagline: '',
        description: '',
        price: 0,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
        features: []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const product: Product = {
            id: editingProduct?.id || `p${Date.now()}`,
            name: formData.name || '',
            tagline: formData.tagline || '',
            description: formData.description || '',
            price: Number(formData.price) || 0,
            category: (formData.category as any) || 'Home',
            imageUrl: formData.imageUrl || '',
            features: formData.features || [],
            longDescription: formData.description // Simplified
        };

        if (editingProduct) {
            onUpdateProduct(product);
        } else {
            onAddProduct(product);
        }

        setIsAddingProduct(false);
        setEditingProduct(null);
        setFormData({ name: '', tagline: '', description: '', price: 0, category: 'Home', features: [] });
    };

    const startEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setIsAddingProduct(true);
    };

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Return to Shop
                        </button>
                        <h1 className="text-4xl font-serif text-[#2C2A26]">Admin Dashboard</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-6 py-2 text-sm font-medium uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-[#2C2A26] text-[#F5F2EB]' : 'text-[#5D5A53] hover:text-[#2C2A26]'}`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-2 text-sm font-medium uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#2C2A26] text-[#F5F2EB]' : 'text-[#5D5A53] hover:text-[#2C2A26]'}`}
                        >
                            Orders
                        </button>
                    </div>
                </div>

                {activeTab === 'products' && (
                    <div className="bg-white/50 backdrop-blur-sm border border-[#D6D1C7] p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif text-[#2C2A26]">Product Management</h2>
                            <button
                                onClick={() => {
                                    setIsAddingProduct(true);
                                    setEditingProduct(null);
                                    setFormData({ name: '', tagline: '', description: '', price: 0, category: 'Home', features: [] });
                                }}
                                className="bg-[#2C2A26] text-[#F5F2EB] px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
                            >
                                Add New Product
                            </button>
                        </div>

                        {isAddingProduct ? (
                            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Price ($)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Tagline</label>
                                    <input
                                        type="text"
                                        value={formData.tagline}
                                        onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors min-h-[100px]"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                                        >
                                            <option value="Audio">Audio</option>
                                            <option value="Wearable">Wearable</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Home">Home</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-[#A8A29E] mb-2 font-medium">Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.imageUrl}
                                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="bg-[#2C2A26] text-[#F5F2EB] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors">
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingProduct(false)}
                                        className="border border-[#D6D1C7] text-[#5D5A53] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:border-[#2C2A26] hover:text-[#2C2A26] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[#D6D1C7]">
                                            <th className="pb-4 text-xs uppercase tracking-widest font-medium text-[#A8A29E]">Product</th>
                                            <th className="pb-4 text-xs uppercase tracking-widest font-medium text-[#A8A29E]">Category</th>
                                            <th className="pb-4 text-xs uppercase tracking-widest font-medium text-[#A8A29E]">Price</th>
                                            <th className="pb-4 text-right text-xs uppercase tracking-widest font-medium text-[#A8A29E]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#D6D1C7]">
                                        {products.map(product => (
                                            <tr key={product.id} className="group hover:bg-[#F5F2EB]/50 transition-colors">
                                                <td className="py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img src={product.imageUrl} className="w-12 h-12 object-cover" alt={product.name} />
                                                        <div>
                                                            <div className="text-base font-serif text-[#2C2A26]">{product.name}</div>
                                                            <div className="text-xs text-[#5D5A53]">{product.tagline}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-6 text-sm text-[#5D5A53]">{product.category}</td>
                                                <td className="py-6 text-sm font-serif text-[#2C2A26]">${product.price}</td>
                                                <td className="py-6 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            onClick={() => startEdit(product)}
                                                            className="text-xs uppercase tracking-tighter font-medium text-[#5D5A53] hover:text-[#2C2A26]"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteProduct(product.id)}
                                                            className="text-xs uppercase tracking-tighter font-medium text-[#A8A29E] hover:text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white/50 backdrop-blur-sm border border-[#D6D1C7] p-8">
                        <h2 className="text-2xl font-serif text-[#2C2A26] mb-8">Order History</h2>

                        {orders.length === 0 ? (
                            <p className="text-[#5D5A53] italic">No orders yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order.id} className="border border-[#D6D1C7] p-6 hover:shadow-lg transition-shadow bg-white/30">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-[#A8A29E] font-medium mb-1">Order #{order.id}</div>
                                                <div className="text-lg font-serif text-[#2C2A26]">{order.customer.name}</div>
                                                <div className="text-xs text-[#5D5A53]">{order.customer.email}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-serif text-[#2C2A26]">${order.total}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-[#A8A29E]">{order.date}</div>
                                                <div className={`mt-2 inline-block px-2 py-1 text-[9px] uppercase tracking-widest font-bold ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex-shrink-0 w-12 h-12 border border-[#D6D1C7]">
                                                    <img src={item.imageUrl} className="w-full h-full object-cover" title={item.name} alt={item.name} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
