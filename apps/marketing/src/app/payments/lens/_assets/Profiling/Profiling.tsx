import { Circle } from 'lucide-react'
import React from 'react'

export default function Profiling() {
    const steps = [
        {
            title: "Business Verification",
            description: "Verify official Business registration, legal name, tax identification numbers and active status against official government registries. Check the entity against global sanctions."
        },
        {
            title: "KYC Verification",
            description: "Verify official government-issued documents, to prevent forgery and fake identities. Validation is done through different aspects and components."
        },
        {
            title: "Website & Domain Analysis",
            description: "Verification for missing Terms of Service agreements, check domain age, registration history and ownershup details to flag high-risk hosting providers."
        },
        {
            title: "Risk Profiling",
            description: "Assign baseline risk score derived from the merchant's MCC, expected transaction volume and refund/chargeback estimates."
        }
    ]

    return (
        <div className="px-60 gap-20 w-full mx-auto flex">
            <div className="relative pl-12 flex flex-col gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-start gap-2">
                        <div className="absolute -left-12 top-0 flex flex-col items-center h-full">
                            <span className="flex items-center justify-center bg-emerald-500 w-9 h-9 rounded-full text-white text-lg font-bold shrink-0 z-10">
                                {index + 1}
                            </span>
                            {index < steps.length - 1 && (
                                <div className="w-1 bg-emerald-500 rounded-xl grow my-1"></div>
                            )}
                        </div>

                        <div className="pt-1">
                            <h2 className="text-xl font-bold text-gray-800 tracking-wide dark:text-white">
                                {step.title}
                            </h2>
                            <p className="text-gray-600 mt-1 leading-relaxed dark:text-gray-300">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-4'>
                <h2 className='text-3xl font-medium'>Garnet Lens Integrated Everywhere, Whilst:</h2>

                <div className='flex flex-col gap-2'>
                    <span className='flex gap-1 items-center text-emerald-600 border border-emerald-600 px-2 py-0.5 rounded-xs w-fit bg-emerald-50'>
                        <Circle className='w-3 h-3' />
                        Registering
                    </span>

                    <p className='pl-4'>
                        Verify customers, stop fraudulent ones from registering and having the chance to abuse features.
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='flex gap-1 items-center text-emerald-600 border border-emerald-600 px-2 py-0.5 rounded-xs w-fit bg-emerald-50'>
                        <Circle className='w-3 h-3' />
                        Paying
                    </span>

                    <p className='pl-4'>
                        To detect and block fraudulent transactions
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='flex gap-1 items-center text-emerald-600 border border-emerald-600 px-2 py-0.5 rounded-xs w-fit bg-emerald-50'>
                        <Circle className='w-3 h-3' />
                        Using Features
                    </span>

                    <p className='pl-4'>
                        Once again, prevent feature abuse when it comes to application UI components and financial features such as refunds, payouts.
                    </p>
                </div>
            </div>
        </div>
    )
}


/*
2. Real-Time Transaction Monitoring (In-Flight)
Evaluates risk during transaction processing within milliseconds to approve, decline, or step up authentication.

Rule Engine: Custom and pre-built logic flags (e.g., X transactions in Y minutes, High-value foreign card, Velocity spikes).

Machine Learning Scoring: Predictive scoring model outputting a risk score (e.g., 0–100) based on historical behavior patterns.

Device Fingerprinting: Captures IP geolocation, proxy/VPN usage, browser headers, canvas fingerprinting, and device behavior.

3D Secure (3DS) Routing: Dynamic decisioning to force 3DS (Challenge) or request Frictionless flow based on risk score and TRA (Transaction Risk Analysis) exemptions under PSD2/SCA.

3. Post-Transaction Analysis & Behavioral Monitoring
Monitors activity after approval to catch slow-burn or complex fraud patterns.

Velocity & Anomaly Detection: Flags sudden deviations from baseline merchant or cardholder volume.

Mule & Network Analysis: Graph-based analysis linking shared cards, device IDs, IP addresses, or bank accounts across multiple merchant accounts.

Batch Screening: Re-running active merchant/customer lists against updated global sanctions and watchlist databases.

4. Chargeback & Dispute Management
Handles incoming disputes and manages network compliance thresholds.

Dispute / Chargeback Lifecycle Tracking: Direct integration with card scheme interfaces (Visa VROL, Mastercard MasterCom) to track notifications (RDR/Ethoca/Verifi alerts), retrievals, and chargebacks.

Representment & Evidence Engine: Automated collection of transaction logs, delivery proofs, IP logs, and 3DS payloads to submit evidence against fraudulent chargebacks.

Ratio Monitoring: Alerts merchants when chargeback-to-transaction ratios approach card brand thresholds (e.g., 0.9% or 100 count/month).

5. Case Management & Operations (Analyst Portal)
The interface for your internal risk team to investigate and take action.

Transaction Queue & Review: Manual review queues for transactions held in conditional status.

Action Workflows: Capabilities to refund, block, whitelist, blacklists (cards, IPs, device IDs), or trigger full merchant account freezes.

Audit Logging: Complete immutable logs of who reviewed a case, what action was taken, and why.

6. Analytics, Rules Configuration & Reporting
Allows risk managers to configure policies and monitor overall fraud performance.

Rule Builder: Visual or code-based UI to create, test, and deploy new fraud rules (with backtesting against historical data).

Fraud Metrics Dashboard: KPIs including approval rate, fraud rate (bps), false positive rate, chargeback ratio, and manual review turnaround times.

Scheme Reporting: Automated generation of required scheme fraud compliance reports (SAFE/TC40).
*/
