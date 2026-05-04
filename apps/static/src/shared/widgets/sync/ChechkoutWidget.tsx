"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  CreditCard, 
  Landmark, 
  MoreHorizontal, 
  ChevronRight, 
  ShieldCheck, 
  Smartphone 
} from "lucide-react";

export default function CheckoutWidget() {
  const [method, setMethod] = useState("card");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-8 bg-[#f9fafb] min-h-screen font-sans text-[#1a1f36]">

      <div className="relative">
        <div className="w-[280px] h-[520px] bg-[#f3f3f5] rounded-[3rem] border-[8px] border-[#e6e6e9] shadow-2xl overflow-hidden relative z-10">
          <div className="bg-white m-2 h-[calc(100%-1rem)] rounded-[2.2rem] overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col items-center flex-grow">
              <div className="w-full flex justify-start mb-4">
                <span className="text-zinc-300 text-xl">✕</span>
              </div>
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-1">Total</p>
              <h2 className="text-4xl font-bold mb-2">$6.88</h2>
              <p className="text-zinc-400 text-[10px] mb-8">Tap, insert, or swipe to pay</p>
              
              <div className="w-full space-y-4 text-sm px-2">
                <div className="flex justify-between font-medium">
                  <span>Mocha latte</span>
                  <span>$6.32</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Loyalty (10% off)</span>
                  <span className="text-emerald-600">-$0.63</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Tax</span>
                  <span>$1.19</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>$6.88</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <button className="w-full py-4 bg-[#f2994a] hover:bg-[#e88a35] text-white rounded-xl font-bold transition-colors">
                Continue to tip
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-32 bg-white rounded-xl shadow-lg border border-zinc-200 z-0 flex items-center p-4">
           <div className="flex items-center gap-3 rotate-90 origin-center translate-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#eb001b] opacity-90" />
                <div className="w-8 h-8 rounded-full bg-[#f79e1b] opacity-90" />
              </div>
              <span className="text-[10px] font-mono tracking-tighter text-zinc-400 uppercase">commercial</span>
           </div>
        </div>
      </div>

      <div className="max-w-[480px] w-full bg-white p-10 rounded-2xl shadow-sm border border-zinc-100">
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-24 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100">
             <div className="w-16 h-16 bg-zinc-200 rounded animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">1x Signature Blend<br/>10oz bag</h3>
            <div className="flex gap-2 mt-1">
              <span className="text-zinc-400 line-through text-sm">$24.00</span>
              <span className="text-zinc-600 font-semibold text-sm">$12.00</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold mb-2">Shipping Address</label>
          <input 
            type="text" 
            placeholder="Enter address"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-[#635bff] focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <button className="w-full bg-black py-3 rounded-lg flex items-center justify-center mb-6">
          <div className="flex items-center gap-1 text-white">
            <Smartphone size={18} />
            <span className="font-medium text-lg">Pay</span>
          </div>
        </button>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-zinc-100"></div>
            <span className="flex-shrink mx-4 text-zinc-400 text-xs font-medium">Or pay another way</span>
            <div className="flex-grow border-t border-zinc-100"></div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { id: "card", label: "Card", icon: CreditCard },
            { id: "bank", label: "Bank account", icon: Landmark },
            { id: "affirm", label: "Affirm", icon: null },
            { id: "more", label: "", icon: MoreHorizontal },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMethod(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                method === item.id 
                  ? "border-zinc-800 ring-1 ring-zinc-800" 
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {item.icon ? <item.icon size={20} className={method === item.id ? "text-zinc-800" : "text-zinc-400"} /> : <span className="text-[#4a3aff] font-black text-xs">a</span>}
              <span className="text-[10px] mt-1 font-bold text-zinc-500">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold">Card information</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="1234 1234 1234 1234"
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 text-sm outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-60">
              <div className="w-6 h-4 bg-blue-800 rounded-sm" />
              <div className="w-6 h-4 bg-orange-500 rounded-sm" />
              <div className="w-6 h-4 bg-red-600 rounded-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Expiration date" className="px-4 py-3 rounded-lg border border-zinc-200 text-sm outline-none" />
            <input type="text" placeholder="Security code" className="px-4 py-3 rounded-lg border border-zinc-200 text-sm outline-none" />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 text-[#635bff] focus:ring-[#635bff]" />
            <span className="text-xs text-zinc-500 font-medium">Billing address is the same as shipping</span>
          </label>
        </div>

        <div className="mt-10 border border-zinc-100 rounded-xl overflow-hidden">
            <div className="p-4 flex gap-3 items-start bg-white">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-zinc-300" />
                <div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#635bff]" />
                        <span className="text-sm font-bold">Save my info for secure 1-click checkout</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">Pay faster on [merchant] and thousands of sites.</p>
                </div>
            </div>
            <div className="border-t border-zinc-100 p-4 bg-zinc-50/50 flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-zinc-200 rounded text-xs font-medium">
                    🇺🇸 +1
                </div>
                <input 
                    type="text" 
                    placeholder="(234) 567-8901" 
                    className="bg-transparent text-sm w-full outline-none"
                />
            </div>
        </div>
      </div>
    </div>
  );
}