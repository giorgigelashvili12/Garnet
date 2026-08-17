"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "@/shared/ui/Code";
import Link from "next/link";

const languages = [
  { id: "node", label: "Node.js", language: "javascript", filename: "server.js" },
  { id: "dotnet", label: ".NET", language: "csharp", filename: "Program.cs" },
  { id: "php", label: "PHP", language: "php", filename: "server.php" },
  { id: "go", label: "Go", language: "go", filename: "main.go" },
  { id: "rust", label: "Rust", language: "rust", filename: "main.rs" },
  { id: "ruby", label: "Ruby", language: "ruby", filename: "server.rb" },
  { id: "java", label: "Java", language: "java", filename: "Server.java" },
  { id: "python", label: "Python", language: "python", filename: "server.py" },
];

const codeSnippets: Record<string, string> = {
  node: `const garnet = require('garnet')('sk_test_4eC39HqLyjWDarj');

const session = await garnet.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel',
});`,
  dotnet: `GarnetConfiguration.ApiKey = "sk_test_4eC39HqLyjWDarj";

var options = new SessionCreateOptions
{
    PaymentMethodTypes = new List<string> { "card" },
    LineItems = new List<SessionLineItemOptions>
    {
        new SessionLineItemOptions
        {
            Price = "price_1HKiSf2eZvKYlo2CxjF9qwbr",
            Quantity = 1,
        },
    },
    Mode = "subscription",
    SuccessUrl = "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    CancelUrl = "https://example.com/cancel",
};`,
  php: `$garnet = new \\Garnet\\GarnetClient('sk_test_4eC39HqLyjWDarj');

$session = $garnet->checkout->sessions->create([
  'payment_method_types' => ['card'],
  'line_items' => [[
    'price' => 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
    'quantity' => 1,
  ]],
  'mode' => 'subscription',
  'success_url' => 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url' => 'https://example.com/cancel'
]);`,
  go: `garnet.Key = "sk_test_4eC39HqLyjWDarj"

params := &garnet.CheckoutSessionParams{
    PaymentMethodTypes: garnet.StringSlice(["card"]),
    LineItems: []*garnet.CheckoutSessionLineItemParams{{
        Price: garnet.String("price_1HKiSf2eZvKYlo2CxjF9qwbr"),
        Quantity: garnet.Int64(1),
    }},
    Mode: garnet.String("subscription"),
    SuccessURL: garnet.String("https://example.com/success?session_id={CHECKOUT_SESSION_ID}"),
    CancelURL: garnet.String("https://example.com/cancel"),
}`,
  rust: `use garnet::{Client, CheckoutSessionParams, CheckoutSessionLineItemParams, Mode};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("sk_test_4eC39HqLyjWDarj");

    let params = CheckoutSessionParams {
        payment_method_types: vec!["card".to_string()],
        line_items: vec![CheckoutSessionLineItemParams {
            price: "price_1HKiSf2eZvKYlo2CxjF9qwbr".to_string(),
            quantity: 1,
        }],
        mode: Mode::Subscription,
        success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}".to_string(),
        cancel_url: "https://example.com/cancel".to_string(),
    };

    let session = client.checkout_sessions.create(params).await?;

    Ok(())
}`,
  ruby: `Garnet.api_key = 'sk_test_4eC39HqLyjWDarj'

session = Garnet::Checkout::Session.create({
  payment_method_types: ['card'],
  line_items: [{
    price: 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel'
})`,
  java: `Garnet.apiKey = "sk_test_4eC39HqLyjWDarj";

SessionCreateParams params = SessionCreateParams.builder()
    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
    .addLineItem(SessionCreateParams.LineItem.builder()
        .setPrice("price_1HKiSf2eZvKYlo2CxjF9qwbr")
        .setQuantity(1L)
        .build())
    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
    .setSuccessUrl("https://example.com/success?session_id={CHECKOUT_SESSION_ID}")
    .setCancelUrl("https://example.com/cancel")
    .build();`,
  python: `import garnet
garnet.api_key = "sk_test_4eC39HqLyjWDarj"

session = garnet.checkout.Session.create(
    payment_method_types=["card"],
    line_items=[{
        "price": "price_1HKiSf2eZvKYlo2CxjF9qwbr",
        "quantity": 1,
    }],
    mode="subscription",
    success_url="https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url="https://example.com/cancel",
)`,
};

export default function DevLanguages() {
  const [activeLang, setActiveLang] = useState("node");

  const currentLangConfig =
    languages.find((lang) => lang.id === activeLang) || languages[0];

  return (
    <div className="px-50 py-10 mt-20 flex items-center justify-between w-screen bg-emerald-950 dark:bg-emerald-950/50 max-[1248px]:flex-col max-[1248px]:gap-10 max-[737px]:px-10">
       <div className="flex flex-col gap-4">
        <h2 className="text-emerald-100 font-bold text-xl">Garnet Dev</h2>
        <h1 className="text-white text-3xl font-medium">The Fastest Way To Implement Garnet</h1>

        <Link href="docs.garnet.com/checkout" className="px-4 py-0.5 bg-emerald-200 text-black rounded-xl cursor-pointer hover:bg-emerald-300 transition-all w-fit">
          Explore Docs
        </Link>
      </div>

      <div className="bg-[#051a1e] border border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base max-[737px]:scale-80 max-[586px]:w-160 max-[530px]:w-130 max-[447px]:w-100">
        <div className="px-6 pt-6 pb-4 flex items-center gap-1 sm:gap-2 overflow-x-auto relative scrollbar-none border-b border-emerald-950">
          {languages.map((lang) => {
            const isActive = activeLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`relative px-4 py-2 rounded-full font-bold transition-colors duration-200 z-10 shrink-0 text-sm cursor-pointer ${
                  isActive ? "text-zinc-950" : "text-zinc-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-md shadow-emerald-500/20"
                  />
                )}
                {lang.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 overflow-x-auto relative min-h-[360px] -mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLang}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <CodeBlock
                language={currentLangConfig.language}
                filename={currentLangConfig.filename}
                code={codeSnippets[activeLang] || ""}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
