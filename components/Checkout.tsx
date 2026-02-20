
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
  onPlaceOrder: (customer: { name: string, email: string }) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onPlaceOrder }) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.email || !customer.firstName) {
      alert("Please enter at least your name and email.");
      return;
    }
    onPlaceOrder({
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          type="button"
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Shop
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C2A26] mb-4">Checkout</h1>
            <p className="text-sm text-[#5D5A53] mb-12">Complete your order details below.</p>

            <div className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      value={customer.firstName}
                      onChange={e => setCustomer({ ...customer, firstName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={customer.lastName}
                      onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    />
                  </div>
                  <input type="text" placeholder="Address" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                    <input type="text" placeholder="Postal code" className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-black transition-colors"
                >
                  Pay Now — ${total}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Order Summary</h2>

            <div className="space-y-6 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#EBE7DE] relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                    <p className="text-xs text-[#A8A29E]">{item.category}</p>
                  </div>
                  <span className="text-sm text-[#5D5A53]">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t border-[#D6D1C7] mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xl text-[#2C2A26]">Total</span>
                <div className="flex items-end gap-2">
                  <span className="text-xs text-[#A8A29E] mb-1">USD</span>
                  <span className="font-serif text-2xl text-[#2C2A26]">${total}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;