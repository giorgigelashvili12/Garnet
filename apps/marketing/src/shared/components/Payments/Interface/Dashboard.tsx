import React, { useState } from 'react'
import { 
  ChevronRight, 
  Pencil, 
  X, 
  Monitor, 
  Smartphone, 
  CreditCard, 
  ShoppingBag, 
  ShieldCheck, 
  Plus, 
  Sparkles,
  Truck,
  Check
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function CheckoutStudio() {
  const [deviceView, setDeviceView] = useState('desktop')

  const [showBranding, setShowBranding] = useState(true)
  const [requirePhone, setRequirePhone] = useState(true)
  const [requireCompany, setRequireCompany] = useState(false)
  const [enableOrderBump, setEnableOrderBump] = useState(true)
  const [enableExpressPay, setEnableExpressPay] = useState(true)

  return (
    <div className="min-h-fit overflow-auto bg-zinc-950 text-zinc-100 flex flex-col font-sans rounded-xl">
      <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-3 flex items-center justify-between shrink-0 rounded-xl">
        <div className="flex items-center gap-5">
          <button className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 rounded-md hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>

          <div className="h-5 w-[1px] bg-zinc-800" />

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-200">Checkout Page</span>
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            Draft
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                deviceView === 'desktop'
                  ? 'bg-zinc-800 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                deviceView === 'mobile'
                  ? 'bg-zinc-800 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>

          <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-lg transition-colors">
            <span>Implement</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden rounded-b-xl">
        <aside className="w-80 border-r border-zinc-800 bg-zinc-900 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-5 border-b border-zinc-800">
            <h2 className="text-base font-bold text-zinc-100 tracking-tight">Customize</h2>
            <p className="text-xs text-zinc-400 mt-1">Configure checkout behavior & elements</p>
          </div>

          <div className="p-5 space-y-6 text-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-200">Show Merchant Logo</span>
                <Switch checked={showBranding} onCheckedChange={setShowBranding} />
              </div>
              <p className="text-xs text-zinc-500">Displays your uploaded logo on the top left of checkout.</p>
            </div>

            <hr className="border-zinc-800" />

            <div className="space-y-3">
              <span className="font-semibold text-zinc-300 text-xs uppercase tracking-wider block">Form Fields</span>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-300 text-xs">Phone Number</span>
                  <Switch checked={requirePhone} onCheckedChange={setRequirePhone} />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-300 text-xs">Company Name</span>
                  <Switch checked={requireCompany} onCheckedChange={setRequireCompany} />
                </div>
              </div>

              <button className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 pt-1 font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Custom Field
              </button>
            </div>

            <hr className="border-zinc-800" />

            <div className="space-y-3">
              <span className="font-semibold text-zinc-300 text-xs uppercase tracking-wider block">Conversion Hooks</span>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div>
                    <span className="text-zinc-300 text-xs block">Express Checkout</span>
                    <span className="text-[10px] text-zinc-500 block">Apple Pay, Google Pay</span>
                  </div>
                  <Switch checked={enableExpressPay} onCheckedChange={setEnableExpressPay} />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div>
                    <span className="text-zinc-300 text-xs block">Order Bump (Upsell)</span>
                    <span className="text-[10px] text-zinc-500 block">1-Click add-on at summary</span>
                  </div>
                  <Switch checked={enableOrderBump} onCheckedChange={setEnableOrderBump} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-zinc-950 p-8 overflow-y-auto flex justify-center items-start">
          <div
            className={`w-full transition-all duration-200 border border-zinc-800 rounded-2xl bg-zinc-900 shadow-2xl p-8 ${
              deviceView === 'mobile' ? 'max-w-md my-4' : 'max-w-4xl'
            }`}
          >
            <div className="border-b border-zinc-800 pb-6 mb-6 flex items-center justify-between">
              {showBranding ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    QM
                  </div>
                  <span className="font-bold text-zinc-100 text-base">QUICK MARKET</span>
                </div>
              ) : (
                <span className="text-xs text-zinc-500 italic">Branding Hidden</span>
              )}
            </div>

            <div className={`grid gap-8 ${deviceView === 'mobile' ? 'grid-cols-1' : 'grid-cols-12'}`}>
              
              <div className={deviceView === 'mobile' ? 'col-span-1' : 'col-span-7'}>
                <div className="space-y-6">
                  {enableExpressPay && (
                    <div className="space-y-3">
                      <span className="text-xs font-medium text-zinc-400 block">Express Checkout</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-zinc-100 text-zinc-950 font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-white">
                          <span>Pay with</span>
                          <span className="font-bold">Apple Pay</span>
                        </button>
                        <button className="bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-zinc-750">
                          <span>Google Pay</span>
                        </button>
                      </div>
                      <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-zinc-800" />
                        <span className="shrink-0 px-3 text-[11px] text-zinc-500 uppercase">Or pay with card</span>
                        <div className="flex-grow border-t border-zinc-800" />
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-400" /> Shipping Details
                    </h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">First Name *</label>
                          <input
                            type="text"
                            readOnly
                            value="Giorgi"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Last Name *</label>
                          <input
                            type="text"
                            readOnly
                            value="Gelashvili"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {requireCompany && (
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Company Name</label>
                          <input
                            type="text"
                            readOnly
                            placeholder="Optional"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none"
                          />
                        </div>
                      )}

                      {requirePhone && (
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Phone Number *</label>
                          <input
                            type="text"
                            readOnly
                            value="+1 (555) 019-2834"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Street Address *</label>
                        <input
                          type="text"
                          readOnly
                          value="742 Evergreen Terrace"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" /> Payment Method
                    </h3>
                    <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full border-4 border-emerald-400 bg-zinc-950" />
                        <span className="text-xs text-zinc-200 font-medium">Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-1.5 text-zinc-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={deviceView === 'mobile' ? 'col-span-1' : 'col-span-5'}>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4 sticky top-6">
                  <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" /> Order Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Pro Subscription (Annual)</span>
                      <span className="text-zinc-200 font-medium">$120.00</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Estimated Tax</span>
                      <span className="text-zinc-200 font-medium">$12.00</span>
                    </div>
                  </div>

                  {enableOrderBump && (
                    <div className="p-3.5 border border-amber-500/20 bg-amber-500/5 rounded-xl space-y-2">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-0.5 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                            Priority Support (+ $15.00)
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                            Get responses under 15 minutes, under your phone number.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="border-zinc-800" />

                  <div className="flex items-center justify-between text-sm font-bold text-zinc-100">
                    <span>Total Due</span>
                    <span className="text-emerald-400">{enableOrderBump ? '$147.00' : '$132.00'}</span>
                  </div>

                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/10">
                    Complete Purchase
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
