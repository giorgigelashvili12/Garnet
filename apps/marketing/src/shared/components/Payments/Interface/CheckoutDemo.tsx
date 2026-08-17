import React, { useState, useEffect, useRef } from "react";
import Cart from "./Checkout/Cart";
import Review from "./Checkout/Review";
import Checkout from "./Checkout/Checkout";

export default function CheckoutDemo() {
	const sectionsData = [
		{
			id: "01",
			title: "1. Cart",
			paragraphs: [
				"Review your selected items and verify quantities before proceeding. Every product in your cart is automatically reserved for 15 minutes to guarantee inventory availability while you complete your purchase.",
				"Apply promo codes, view estimated shipping fees, and see your real-time subtotal updates dynamically. Adjust quantities or remove items instantly without refreshing the page.",
				"Once you're satisfied with your order selection, move seamlessly to the next step to confirm your delivery details and order overview.",
			],
			component: <Cart />
		},
		{
			id: "02",
			title: "2. Review",
			paragraphs: [
				"Take a quick moment to verify your order itemization, subtotal breakdown, and applicable discounts. Transparent pricing ensures no hidden fees or unexpected charges at payment.",
				"Our automated validation checks your item availability against real-time warehouse stock and calculates exact delivery timeframes based on your region.",
				"Enjoy peace of mind with our 30-day money-back guarantee and hassle-free return policy outlined right alongside your summary before final commitment.",
			],
			component: <Review />
		},
		{
			id: "03",
			title: "3. Checkout",
			paragraphs: [
				"Complete your purchase quickly using auto-filled shipping details or express 1-click payment options like Apple Pay, Google Pay, or credit card.",
				"Your transaction is shielded with enterprise-grade 256-bit SSL encryption. Payment data is tokenized securely and never stored on our servers.",
				"Click confirm to finalize your order. You'll receive instant order confirmation, tracking details via email, and live status updates right to your account dashboard.",
			],
			component: <Checkout />
		},
	];

	const [activeId, setActiveId] = useState(sectionsData[0].id);
	const sectionRefs = useRef({});

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "-20% 0px -40% 0px",
			threshold: 0.2,
		};

		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.dataset.id);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		Object.values(sectionRefs.current).forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	const activeSection = sectionsData.find((s) => s.id === activeId) || sectionsData[0];

	return (
		<div className="bg-background-950 text-background-100 min-h-screen mt-35 max-[409px]:scale-80">
			<h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight px-6 text-center">
				Building The Checkout For You
			</h2>

			<div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start gap-8 md:gap-16 min-[1650px]:p-0">
				<div className="w-full md:w-1/2 flex flex-col">
					{sectionsData.map((section) => (
						<section
							key={section.id}
							data-id={section.id}
							ref={(el) => (sectionRefs.current[section.id] = el)}
							className="flex flex-col gap-6 py-20 border-b border-background-800/80 last:border-b-0 min-h-[80vh] justify-center"
						>
							<h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
								{section.title}
							</h2>
							{section.paragraphs.map((p, idx) => (
								<p key={idx} className="text-background-400 leading-relaxed text-base">
									{p}
								</p>
							))}
						</section>
					))}
				</div>

				<div className="w-full md:w-1/2 sticky top-74">
					<div className="bg-background-900 border border-background-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 max-[409px]:p-0 ">
						{activeSection.component}
					</div>
				</div>
			</div>
		</div>
	);
}