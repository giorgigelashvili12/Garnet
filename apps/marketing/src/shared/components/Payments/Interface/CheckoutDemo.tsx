import React from "react";

export default function CheckoutDemo() {
  const sectionsData = [
    {
      id: "01",
      title: "First Feature",
      paragraphs: [
        "Scroll down to see the text move while the card on the right remains fixed within this section's boundaries.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      ],
      cardTitle: "Fixed Box 1",
      cardText: "This stays stuck until you reach the bottom of Section 1, then it scrolls out naturally.",
      accentColor: "from-emerald-500 to-teal-500",
    },
    {
      id: "02",
      title: "Second Feature",
      paragraphs: [
        "Now that Section 1 has left the viewport, Section 2 takes over with its own sticky element.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      ],
      cardTitle: "Fixed Box 2",
      cardText: "This object is pinned only while Section 2 is active on screen.",
      accentColor: "from-emerald-400 to-green-500",
    },
    {
      id: "03",
      title: "Third Feature",
      paragraphs: [
        "Final section demonstration showcasing independent scrolling text on the left.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      ],
      cardTitle: "Fixed Box 3",
      cardText: "Unique content locked to the right for the third section.",
      accentColor: "from-teal-400 to-emerald-600",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {sectionsData.map((section) => (
        <section
          key={section.id}
          className="flex flex-col md:flex-row items-start gap-8 md:gap-16 max-w-6xl mx-auto px-6 py-20 border-b border-slate-800/80 last:border-b-0"
        >
          {/* LEFT: Scrolling Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="text-xs font-bold tracking-widest uppercase text-emerald-400">
              Section {section.id}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {section.title}
            </h2>
            {section.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-400 leading-relaxed text-base">
                {p}
              </p>
            ))}
          </div>

          {/* RIGHT: Fixed/Sticky Object */}
          <div className="w-full md:w-1/2 sticky top-16">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle visual gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.accentColor}`}
              />
              
              <h3 className="text-xl font-bold text-emerald-400 mb-3">
                {section.cardTitle}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {section.cardText}
              </p>

              {/* Demo Content Block */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  {section.id}
                </div>
                <span>Sticky element active for Section {section.id}</span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}