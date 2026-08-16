export interface PaymentModule {
    id: string;
    name: string;
    logo: string;
    type: "bank_gateway" | "wallet" | "bnpl" | "bank_transfer";
    description: string;
    supportedNetworks: string[];
    pricing: {
        transactionFee: string;
        fixedFee?: string;
        monthlyFee?: string;
    };
}

export const MODULES: Record<"georgia" | "europe", PaymentModule[]> = {
    georgia: [
        {
            id: "tbc-bank",
            name: "TBC Bank",
            logo: "/banks/tbc.png",
            type: "bank_gateway",
            description: "Direct card processing gateway, currencies in GEL, EUR and more.",
            supportedNetworks: ["Visa", "Mastercard", "Amex"],
            pricing: {
                transactionFee: "1.5%",
                fixedFee: "0.20 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "bog",
            name: "Bank of Georgia (BOG)",
            logo: "/banks/bog.png",
            type: "bank_gateway",
            description: "Gateway with support of BOG and Plus Points.",
            supportedNetworks: ["Visa", "Mastercard", "Amex"],
            pricing: {
                transactionFee: "1.4%",
                fixedFee: "0.20 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "credo-bank",
            name: "Credo Bank",
            logo: "/banks/credo.png",
            type: "bank_gateway",
            description: "Gateway for small e-commerce.",
            supportedNetworks: ["Visa", "Mastercard"],
            pricing: {
                transactionFee: "1.8%",
                fixedFee: "0.15 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "liberty-bank",
            name: "Liberty Bank",
            logo: "/banks/liberty.png",
            type: "bank_gateway",
            description: "Gateway with the support of multiple currencies.",
            supportedNetworks: ["Visa", "Mastercard"],
            pricing: {
                transactionFee: "1.7%",
                fixedFee: "0.20 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "keepz",
            name: "Keepz",
            logo: "/banks/keepz.png",
            type: "wallet",
            description: "QR-code and instant mobile payment platform popular for fast checkout.",
            supportedNetworks: ["Keepz App", "Visa", "Mastercard"],
            pricing: {
                transactionFee: "1.0%",
                fixedFee: "0.10 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "tbc-space-bnpl",
            name: "TBC Space BNPL",
            logo: "/banks/tbc.png",
            type: "bnpl",
            description: "Split purchases into 4 interest-free payments via Space app.",
            supportedNetworks: ["TBC Space"],
            pricing: {
                transactionFee: "3.5%",
                fixedFee: "0.00 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "bog-installment",
            name: "BOG Installment",
            logo: "/banks/bog.png",
            type: "bnpl",
            description: "Instant digital installment approval directly at checkout for Bank of Georgia users.",
            supportedNetworks: ["BOG App"],
            pricing: {
                transactionFee: "3.0%",
                fixedFee: "0.00 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "credo-installment",
            name: "Credo Installment",
            logo: "/banks/credo.png",
            type: "bnpl",
            description: "Long-term monthly payment plans integrated into checkout.",
            supportedNetworks: ["Credo Direct"],
            pricing: {
                transactionFee: "3.2%",
                fixedFee: "0.00 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "emoney",
            name: "eMoney",
            logo: "/banks/emoney.png",
            type: "wallet",
            description: "Popular digital wallet in Georgia for online gaming, utility, and retail payments.",
            supportedNetworks: ["eMoney Wallet"],
            pricing: {
                transactionFee: "2.0%",
                fixedFee: "0.30 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "apple-pay-georgia",
            name: "Apple Pay",
            logo: "/banks/apple.png",
            type: "wallet",
            description: "One-touch biometric checkout for iOS and macOS users paired with local banks.",
            supportedNetworks: ["Visa", "Mastercard"],
            pricing: {
                transactionFee: "1.5%",
                fixedFee: "0.20 GEL",
                monthlyFee: "0 GEL"
            }
        },
        {
            id: "google-pay-georgia",
            name: "Google Pay",
            logo: "/banks/googlepay.png",
            type: "wallet",
            description: "Fast tokenized payments for Android and web browser users.",
            supportedNetworks: ["Visa", "Mastercard"],
            pricing: {
                transactionFee: "1.5%",
                fixedFee: "0.20 GEL",
                monthlyFee: "0 GEL"
            }
        }
    ],
    europe: [
        {
            id: "sepa",
            name: "SEPA Direct Debit",
            logo: "/banks/sepa.png",
            type: "bank_transfer",
            description: "Standardized pan-European bank account transfers and recurring billing.",
            supportedNetworks: ["SEPA Instant", "SEPA Credit"],
            pricing: {
                transactionFee: "0.8%",
                fixedFee: "€0.25",
                monthlyFee: "€0.00"
            }
        },
        {
            id: "klarna",
            name: "Klarna",
            logo: "/banks/klarna.png",
            type: "bnpl",
            description: "Pay in 30 days or split into 3-4 interest-free installments across Europe.",
            supportedNetworks: ["Klarna Network"],
            pricing: {
                transactionFee: "2.99%",
                fixedFee: "€0.35",
                monthlyFee: "€0.00"
            }
        },
        {
            id: "ideal",
            name: "iDEAL",
            logo: "/banks/ideal.svg",
            type: "bank_transfer",
            description: "Dominant Dutch payment method enabling direct online bank transfers.",
            supportedNetworks: ["Dutch Banking Network"],
            pricing: {
                transactionFee: "0.0%",
                fixedFee: "€0.29",
                monthlyFee: "€0.00"
            }
        },
        {
            id: "bancontact",
            name: "Bancontact",
            logo: "/banks/bancontact.png",
            type: "bank_gateway",
            description: "The leading electronic payment scheme in Belgium for online and mobile checkouts.",
            supportedNetworks: ["Bancontact Cards", "Payconiq"],
            pricing: {
                transactionFee: "1.4%",
                fixedFee: "€0.20",
                monthlyFee: "€0.00"
            }
        },
        {
            id: "apple-pay-europe",
            name: "Apple Pay (EU)",
            logo: "/banks/apple.png",
            type: "wallet",
            description: "Seamless mobile wallet processing for European cardholders.",
            supportedNetworks: ["Visa", "Mastercard", "Maestro"],
            pricing: {
                transactionFee: "1.4%",
                fixedFee: "€0.25",
                monthlyFee: "€0.00"
            }
        },
        {
            id: "google-pay-europe",
            name: "Google Pay (EU)",
            logo: "/banks/googlepay.png",
            type: "wallet",
            description: "Encrypted 1-tap checkout for web and mobile Android users in the EU.",
            supportedNetworks: ["Visa", "Mastercard", "Maestro"],
            pricing: {
                transactionFee: "1.4%",
                fixedFee: "€0.25",
                monthlyFee: "€0.00"
            }
        }
    ]
};