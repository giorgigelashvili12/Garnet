"use client";
import React from "react";

import { useState, useEffect } from "react";

function local(text, speed = 50, delay = 0) {
	const [displayText, setDisplayText] = useState("");
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		setDisplayText("");
		setIsComplete(false);

		const startTimeout = setTimeout(() => {
			let index = 0;

			const timer = setInterval(() => {
				if (index < text.length) {
					setDisplayText(text.slice(0, index + 1));
					index++;
				} else {
					setIsComplete(true);
					clearInterval(timer);
				}
			}, speed);

			return () => clearInterval(timer);
		}, delay);

		return () => clearTimeout(startTimeout);
	}, [text, speed, delay]);

	return { displayText, isComplete };
}

export default function Typewriter({
	text,
	placeholder = "",
	speed = 90,
	delay = 1000,
	className = "",
  }) {
	const [displayText, setDisplayText] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
  
	useEffect(() => {
	  setDisplayText("");
	  setIsTyping(false);
	  setIsComplete(false);
  
	  const delayTimer = setTimeout(() => {
		setIsTyping(true);
		let index = 0;
  
		const typeInterval = setInterval(() => {
		  if (index < text.length) {
			setDisplayText(text.slice(0, index + 1));
			index++;
		  } else {
			setIsComplete(true);
			setIsTyping(false);
			clearInterval(typeInterval);
		  }
		}, speed);
  
		return () => clearInterval(typeInterval);
	  }, delay);
  
	  return () => clearTimeout(delayTimer);
	}, [text, speed, delay]);
  
	return (
	  <span className={`inline-flex items-center ${className}`}>
		{!isTyping && displayText === "" ? (
		  <span className="text-gray-400 select-none">{placeholder}</span>
		) : (
		  <span>{displayText}</span>
		)}
  
		{!isComplete && (
		  <span className="inline-block w-[2px] h-[1.1em] ml-0.5 bg-emerald-600 animate-pulse" />
		)}
	  </span>
	);
  }