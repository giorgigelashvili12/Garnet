"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { id: "node", label: "Node.js" },
  { id: "ruby", label: "Ruby" },
  { id: "python", label: "Python" },
  { id: "php", label: "PHP" },
  { id: "java", label: "Java" },
  { id: "go", label: "Go" },
  { id: "dotnet", label: ".NET" },
];

const codeSnippets = {
  node: [
    { text: 'const garnet = require(\'garnet\')(\'sk_test_4eC39HqLyjWDarj\');', tokens: [{ t: 'const', c: 'text-emerald-400' }, { t: ' garnet = ' }, { t: 'require', c: 'text-emerald-400' }, { t: '(\'' }, { t: 'garnet', c: 'text-amber-300' }, { t: '\')(\'' }, { t: 'sk_test_4eC39HqLyjWDarj', c: 'text-amber-300' }, { t: '\');' }] },
    { text: '' },
    { text: 'const session = await garnet.checkout.sessions.create({', tokens: [{ t: 'const', c: 'text-emerald-400' }, { t: ' session = ' }, { t: 'await', c: 'text-emerald-400' }, { t: ' garnet.checkout.sessions.' }, { t: 'create', c: 'text-emerald-300' }, { t: '({' }] },
    { text: '  payment_method_types: [\'card\'],', tokens: [{ t: '  ' }, { t: 'payment_method_types', c: 'text-emerald-300' }, { t: ': [' }, { t: '\'card\'', c: 'text-amber-300' }, { t: '],' }] },
    { text: '  line_items: [{', tokens: [{ t: '  ' }, { t: 'line_items', c: 'text-emerald-300' }, { t: ': [{ ' }] },
    { text: '    price: \'price_1HKiSf2eZvKYlo2CxjF9qwbr\',', tokens: [{ t: '    ' }, { t: 'price', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'price_1HKiSf2eZvKYlo2CxjF9qwbr\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    quantity: 1,', tokens: [{ t: '    ' }, { t: 'quantity', c: 'text-emerald-300' }, { t: ': ' }, { t: '1', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  }],', tokens: [{ t: '  }],' }] },
    { text: '  mode: \'subscription\',', tokens: [{ t: '  ' }, { t: 'mode', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'subscription\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  success_url: \'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\',', tokens: [{ t: '  ' }, { t: 'success_url', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  cancel_url: \'https://example.com/cancel\',', tokens: [{ t: '  ' }, { t: 'cancel_url', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'https://example.com/cancel\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '});', tokens: [{ t: '});' }] },
  ],
  ruby: [
    { text: 'Garnet.api_key = \'sk_test_4eC39HqLyjWDarj\'', tokens: [{ t: 'Garnet', c: 'text-emerald-400' }, { t: '.api_key = ' }, { t: '\'sk_test_4eC39HqLyjWDarj\'', c: 'text-amber-300' }] },
    { text: '' },
    { text: 'session = Garnet::Checkout::Session.create({', tokens: [{ t: 'session = ' }, { t: 'Garnet::Checkout::Session', c: 'text-emerald-400' }, { t: '.' }, { t: 'create', c: 'text-emerald-300' }, { t: '({' }] },
    { text: '  payment_method_types: [\'card\'],', tokens: [{ t: '  ' }, { t: 'payment_method_types', c: 'text-emerald-300' }, { t: ': [' }, { t: '\'card\'', c: 'text-amber-300' }, { t: '],' }] },
    { text: '  line_items: [{', tokens: [{ t: '  ' }, { t: 'line_items', c: 'text-emerald-300' }, { t: ': [{ ' }] },
    { text: '    price: \'price_1HKiSf2eZvKYlo2CxjF9qwbr\',', tokens: [{ t: '    ' }, { t: 'price', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'price_1HKiSf2eZvKYlo2CxjF9qwbr\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    quantity: 1,', tokens: [{ t: '    ' }, { t: 'quantity', c: 'text-emerald-300' }, { t: ': ' }, { t: '1', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  }],', tokens: [{ t: '  }],' }] },
    { text: '  mode: \'subscription\',', tokens: [{ t: '  ' }, { t: 'mode', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'subscription\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  success_url: \'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\',', tokens: [{ t: '  ' }, { t: 'success_url', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  cancel_url: \'https://example.com/cancel\',', tokens: [{ t: '  ' }, { t: 'cancel_url', c: 'text-emerald-300' }, { t: ': ' }, { t: '\'https://example.com/cancel\'', c: 'text-amber-300' }] },
    { text: '})', tokens: [{ t: '})' }] },
  ],
  python: [
    { text: 'import garnet', tokens: [{ t: 'import', c: 'text-emerald-400' }, { t: ' garnet' }] },
    { text: 'garnet.api_key = "sk_test_4eC39HqLyjWDarj"', tokens: [{ t: 'garnet.api_key = ' }, { t: '"sk_test_4eC39HqLyjWDarj"', c: 'text-amber-300' }] },
    { text: '' },
    { text: 'session = garnet.checkout.Session.create(', tokens: [{ t: 'session = garnet.checkout.Session.' }, { t: 'create', c: 'text-emerald-300' }, { t: '(' }] },
    { text: '    payment_method_types=["card"],', tokens: [{ t: '    ' }, { t: 'payment_method_types', c: 'text-emerald-300' }, { t: '=[' }, { t: '"card"', c: 'text-amber-300' }, { t: '],' }] },
    { text: '    line_items=[{', tokens: [{ t: '    ' }, { t: 'line_items', c: 'text-emerald-300' }, { t: '=[{' }] },
    { text: '        "price": "price_1HKiSf2eZvKYlo2CxjF9qwbr",', tokens: [{ t: '        ' }, { t: '"price"', c: 'text-emerald-300' }, { t: ': ' }, { t: '"price_1HKiSf2eZvKYlo2CxjF9qwbr"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '        "quantity": 1,', tokens: [{ t: '        ' }, { t: '"quantity"', c: 'text-emerald-300' }, { t: ': ' }, { t: '1', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    }],', tokens: [{ t: '    }],' }] },
    { text: '    mode="subscription",', tokens: [{ t: '    ' }, { t: 'mode', c: 'text-emerald-300' }, { t: '=' }, { t: '"subscription"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    success_url="https://example.com/success?session_id={CHECKOUT_SESSION_ID}",', tokens: [{ t: '    ' }, { t: 'success_url', c: 'text-emerald-300' }, { t: '=' }, { t: '"https://example.com/success?session_id={CHECKOUT_SESSION_ID}"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    cancel_url="https://example.com/cancel",', tokens: [{ t: '    ' }, { t: 'cancel_url', c: 'text-emerald-300' }, { t: '=' }, { t: '"https://example.com/cancel"', c: 'text-amber-300' }] },
    { text: ')', tokens: [{ t: ')' }] },
  ],
  php: [
    { text: '$garnet = new \\Garnet\\GarnetClient(\'sk_test_4eC39HqLyjWDarj\');', tokens: [{ t: '$garnet = ' }, { t: 'new', c: 'text-emerald-400' }, { t: ' \\Garnet\\GarnetClient(\'' }, { t: 'sk_test_4eC39HqLyjWDarj', c: 'text-amber-300' }, { t: '\');' }] },
    { text: '' },
    { text: '$session = $garnet->checkout->sessions->create([', tokens: [{ t: '$session = $garnet->checkout->sessions->' }, { t: 'create', c: 'text-emerald-300' }, { t: '([' }] },
    { text: '  \'payment_method_types\' => [\'card\'],', tokens: [{ t: '  ' }, { t: '\'payment_method_types\'', c: 'text-emerald-300' }, { t: ' => [' }, { t: '\'card\'', c: 'text-amber-300' }, { t: '],' }] },
    { text: '  \'line_items\' => [[', tokens: [{ t: '  ' }, { t: '\'line_items\'', c: 'text-emerald-300' }, { t: ' => [[' }] },
    { text: '    \'price\' => \'price_1HKiSf2eZvKYlo2CxjF9qwbr\',', tokens: [{ t: '    ' }, { t: '\'price\'', c: 'text-emerald-300' }, { t: ' => ' }, { t: '\'price_1HKiSf2eZvKYlo2CxjF9qwbr\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    \'quantity\' => 1,', tokens: [{ t: '    ' }, { t: '\'quantity\'', c: 'text-emerald-300' }, { t: ' => ' }, { t: '1', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  ]],', tokens: [{ t: '  ]],' }] },
    { text: '  \'mode\' => \'subscription\',', tokens: [{ t: '  ' }, { t: '\'mode\'', c: 'text-emerald-300' }, { t: ' => ' }, { t: '\'subscription\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  \'success_url\' => \'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\',', tokens: [{ t: '  ' }, { t: '\'success_url\'', c: 'text-emerald-300' }, { t: ' => ' }, { t: '\'https://example.com/success?session_id={CHECKOUT_SESSION_ID}\'', c: 'text-amber-300' }, { t: ',' }] },
    { text: '  \'cancel_url\' => \'https://example.com/cancel\',', tokens: [{ t: '  ' }, { t: '\'cancel_url\'', c: 'text-emerald-300' }, { t: ' => ' }, { t: '\'https://example.com/cancel\'', c: 'text-amber-300' }] },
    { text: ']);', tokens: [{ t: ']);' }] },
  ],
  java: [
    { text: 'Garnet.apiKey = "sk_test_4eC39HqLyjWDarj";', tokens: [{ t: 'Garnet', c: 'text-emerald-400' }, { t: '.apiKey = ' }, { t: '"sk_test_4eC39HqLyjWDarj"', c: 'text-amber-300' }, { t: ';' }] },
    { text: '' },
    { text: 'SessionCreateParams params = SessionCreateParams.builder()', tokens: [{ t: 'SessionCreateParams', c: 'text-emerald-400' }, { t: ' params = SessionCreateParams.' }, { t: 'builder', c: 'text-emerald-300' }, { t: '()' }] },
    { text: '    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)', tokens: [{ t: '    .' }, { t: 'addPaymentMethodType', c: 'text-emerald-300' }, { t: '(SessionCreateParams.PaymentMethodType.CARD)' }] },
    { text: '    .addLineItem(SessionCreateParams.LineItem.builder()', tokens: [{ t: '    .' }, { t: 'addLineItem', c: 'text-emerald-300' }, { t: '(SessionCreateParams.LineItem.builder()' }] },
    { text: '        .setPrice("price_1HKiSf2eZvKYlo2CxjF9qwbr")', tokens: [{ t: '        .' }, { t: 'setPrice', c: 'text-emerald-300' }, { t: '(' }, { t: '"price_1HKiSf2eZvKYlo2CxjF9qwbr"', c: 'text-amber-300' }, { t: ')' }] },
    { text: '        .setQuantity(1L)', tokens: [{ t: '        .' }, { t: 'setQuantity', c: 'text-emerald-300' }, { t: '(' }, { t: '1L', c: 'text-amber-300' }, { t: ')' }] },
    { text: '        .build())', tokens: [{ t: '        .build())' }] },
    { text: '    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)', tokens: [{ t: '    .' }, { t: 'setMode', c: 'text-emerald-300' }, { t: '(SessionCreateParams.Mode.SUBSCRIPTION)' }] },
    { text: '    .setSuccessUrl("https://example.com/success?session_id={CHECKOUT_SESSION_ID}")', tokens: [{ t: '    .' }, { t: 'setSuccessUrl', c: 'text-emerald-300' }, { t: '(' }, { t: '"https://example.com/success?session_id={CHECKOUT_SESSION_ID}"', c: 'text-amber-300' }, { t: ')' }] },
    { text: '    .setCancelUrl("https://example.com/cancel")', tokens: [{ t: '    .' }, { t: 'setCancelUrl', c: 'text-emerald-300' }, { t: '(' }, { t: '"https://example.com/cancel"', c: 'text-amber-300' }, { t: ')' }] },
    { text: '    .build();', tokens: [{ t: '    .build();' }] },
  ],
  go: [
    { text: 'garnet.Key = "sk_test_4eC39HqLyjWDarj"', tokens: [{ t: 'garnet.Key = ' }, { t: '"sk_test_4eC39HqLyjWDarj"', c: 'text-amber-300' }] },
    { text: '' },
    { text: 'params := &garnet.CheckoutSessionParams{', tokens: [{ t: 'params := &' }, { t: 'garnet.CheckoutSessionParams', c: 'text-emerald-400' }, { t: '{' }] },
    { text: '    PaymentMethodTypes: garnet.StringSlice(["card"]),', tokens: [{ t: '    ' }, { t: 'PaymentMethodTypes', c: 'text-emerald-300' }, { t: ': garnet.StringSlice([' }, { t: '"card"', c: 'text-amber-300' }, { t: ']),' }] },
    { text: '    LineItems: []*garnet.CheckoutSessionLineItemParams{{', tokens: [{ t: '    ' }, { t: 'LineItems', c: 'text-emerald-300' }, { t: ': []*garnet.CheckoutSessionLineItemParams{{' }] },
    { text: '        Price: garnet.String("price_1HKiSf2eZvKYlo2CxjF9qwbr"),', tokens: [{ t: '        ' }, { t: 'Price', c: 'text-emerald-300' }, { t: ': garnet.String(' }, { t: '"price_1HKiSf2eZvKYlo2CxjF9qwbr"', c: 'text-amber-300' }, { t: '),' }] },
    { text: '        Quantity: garnet.Int64(1),', tokens: [{ t: '        ' }, { t: 'Quantity', c: 'text-emerald-300' }, { t: ': garnet.Int64(' }, { t: '1', c: 'text-amber-300' }, { t: '),' }] },
    { text: '    }},', tokens: [{ t: '    }},' }] },
    { text: '    Mode: garnet.String("subscription"),', tokens: [{ t: '    ' }, { t: 'Mode', c: 'text-emerald-300' }, { t: ': garnet.String(' }, { t: '"subscription"', c: 'text-amber-300' }, { t: '),' }] },
    { text: '    SuccessURL: garnet.String("https://example.com/success?session_id={CHECKOUT_SESSION_ID}"),', tokens: [{ t: '    ' }, { t: 'SuccessURL', c: 'text-emerald-300' }, { t: ': garnet.String(' }, { t: '"https://example.com/success?session_id={CHECKOUT_SESSION_ID}"', c: 'text-amber-300' }, { t: '),' }] },
    { text: '    CancelURL: garnet.String("https://example.com/cancel"),', tokens: [{ t: '    ' }, { t: 'CancelURL', c: 'text-emerald-300' }, { t: ': garnet.String(' }, { t: '"https://example.com/cancel"', c: 'text-amber-300' }, { t: '),' }] },
    { text: '}', tokens: [{ t: '}' }] },
  ],
  dotnet: [
    { text: 'GarnetConfiguration.ApiKey = "sk_test_4eC39HqLyjWDarj";', tokens: [{ t: 'GarnetConfiguration', c: 'text-emerald-400' }, { t: '.ApiKey = ' }, { t: '"sk_test_4eC39HqLyjWDarj"', c: 'text-amber-300' }, { t: ';' }] },
    { text: '' },
    { text: 'var options = new SessionCreateOptions', tokens: [{ t: 'var', c: 'text-emerald-400' }, { t: ' options = ' }, { t: 'new', c: 'text-emerald-400' }, { t: ' SessionCreateOptions' }] },
    { text: '{', tokens: [{ t: '{' }] },
    { text: '    PaymentMethodTypes = new List<string> { "card" },', tokens: [{ t: '    ' }, { t: 'PaymentMethodTypes', c: 'text-emerald-300' }, { t: ' = ' }, { t: 'new', c: 'text-emerald-400' }, { t: ' List<string> { ' }, { t: '"card"', c: 'text-amber-300' }, { t: ' },' }] },
    { text: '    LineItems = new List<SessionLineItemOptions>', tokens: [{ t: '    ' }, { t: 'LineItems', c: 'text-emerald-300' }, { t: ' = ' }, { t: 'new', c: 'text-emerald-400' }, { t: ' List<SessionLineItemOptions>' }] },
    { text: '    {', tokens: [{ t: '    {' }] },
    { text: '        new SessionLineItemOptions', tokens: [{ t: '        ' }, { t: 'new', c: 'text-emerald-400' }, { t: ' SessionLineItemOptions' }] },
    { text: '        {', tokens: [{ t: '        {' }] },
    { text: '            Price = "price_1HKiSf2eZvKYlo2CxjF9qwbr",', tokens: [{ t: '            ' }, { t: 'Price', c: 'text-emerald-300' }, { t: ' = ' }, { t: '"price_1HKiSf2eZvKYlo2CxjF9qwbr"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '            Quantity = 1,', tokens: [{ t: '            ' }, { t: 'Quantity', c: 'text-emerald-300' }, { t: ' = ' }, { t: '1', c: 'text-amber-300' }, { t: ',' }] },
    { text: '        },', tokens: [{ t: '        },' }] },
    { text: '    },', tokens: [{ t: '    },' }] },
    { text: '    Mode = "subscription",', tokens: [{ t: '    ' }, { t: 'Mode', c: 'text-emerald-300' }, { t: ' = ' }, { t: '"subscription"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    SuccessUrl = "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",', tokens: [{ t: '    ' }, { t: 'SuccessUrl', c: 'text-emerald-300' }, { t: ' = ' }, { t: '"https://example.com/success?session_id={CHECKOUT_SESSION_ID}"', c: 'text-amber-300' }, { t: ',' }] },
    { text: '    CancelUrl = "https://example.com/cancel",', tokens: [{ t: '    ' }, { t: 'CancelUrl', c: 'text-emerald-300' }, { t: ' = ' }, { t: '"https://example.com/cancel"', c: 'text-amber-300' }] },
    { text: '};', tokens: [{ t: '};' }] },
  ],
};

export default function DevLangugages() {
  const [activeLang, setActiveLang] = useState("node");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-[#051a1e] border border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base">
        <div className="px-6 pt-6 pb-4 flex items-center gap-1 sm:gap-2 overflow-x-auto relative scrollbar-none border-b border-emerald-950">
          {languages.map((lang) => {
            const isActive = activeLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`relative px-4 py-2 rounded-full font-bold transition-colors duration-200 z-10 shrink-0 text-sm ${
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

        <div className="p-6 overflow-x-auto relative min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLang}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-1 text-zinc-100"
            >
              {codeSnippets[activeLang]?.map((line, idx) => (
                <div key={idx} className="flex items-start leading-relaxed font-mono">
                  <span className="w-8 shrink-0 text-right pr-4 text-emerald-800/80 select-none text-xs sm:text-sm pt-0.5">
                    {idx + 1}
                  </span>
                  <div className="whitespace-pre">
                    {line.tokens ? (
                      line.tokens.map((token, tIdx) => (
                        <span key={tIdx} className={token.c || "text-zinc-100"}>
                          {token.t}
                        </span>
                      ))
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
