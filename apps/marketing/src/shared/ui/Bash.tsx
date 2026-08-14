"use client";

import { useState } from "react";
import { LuClipboardList, LuSparkles } from "react-icons/lu";

interface BashProps {
	type?: string;
	command: string;
}

export default function Bash({ type = "bash", command }: BashProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative w-full max-w-2xl bg-[#323946] rounded-xl border border-[#3f4756] shadow-2xl">
			<div className="flex items-center justify-between px-4 py-2.5 bg-[#3c4452] rounded-t-xl">
				<span className="text-[11px] font-extrabold tracking-wider text-slate-200 uppercase">
					{type}
				</span>

				<div className="flex items-center gap-1 relative">
					{copied && (
						<div className="absolute -top-10 left-[14px] -translate-x-1/2 bg-white text-slate-900 text-xs font-semibold px-3 py-1 rounded-md shadow-lg flex flex-col items-center animate-in fade-in slide-in-from-bottom-1 duration-150 z-30 pointer-events-none">
							Copied!
							<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
						</div>
					)}

					<button
						onClick={handleCopy}
						className={`p-1.5 rounded-md transition-colors ${
							copied
								? "bg-[#335678] text-white border border-[#486e96]"
								: "text-slate-300 hover:bg-[#4a5464] hover:text-white"
						}`}
						title="Copy Command"
					>
						<LuClipboardList className="w-4 h-4" />
					</button>

					{/* <button
						className="p-1.5 rounded-md text-slate-300 hover:bg-[#4a5464] hover:text-white transition-colors"
						title="AI Assistant"
					>
						<LuSparkles className="w-4 h-4" />
					</button> */}
				</div>
			</div>

			<div className="px-4 py-3 bg-[#2d333f] border-t border-[#3c4452] rounded-b-xl">
				<code className="font-mono text-sm text-slate-100 tracking-wide select-all">
					{command}
				</code>
			</div>
		</div>
	);
}