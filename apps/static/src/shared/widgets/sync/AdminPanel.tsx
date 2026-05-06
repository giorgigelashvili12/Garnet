"use client";

const AdminPanel = () => {
  const transactions = [
    { amount: '$1,000.00', currency: 'USD', status: 'Succeeded', account: 'GBank •••• 1234', date: 'Jun 24, 2:18 PM' },
    { amount: '$2,100.00', currency: 'USD', status: 'Succeeded', account: 'GBank •••• 1234', date: 'Jun 16, 2:29 PM' },
    { amount: '$900.00', currency: 'USD', status: 'Disputed', account: 'GBank •••• 1234', date: 'Jun 9, 2:41 PM' },
    { amount: '$1,200.00', currency: 'USD', status: 'Succeeded', account: 'GBank •••• 1234', date: 'Jun 2, 2:09 PM' },
    { amount: '$1,000.00', currency: 'USD', status: 'Succeeded', account: 'GBank •••• 1234', date: 'May 26, 2:02 PM' },
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-600">
      <div className="grid grid-cols-[1.5fr_1fr_2fr_1.5fr] px-4 py-3 border-b border-pink-100 text-xs font-semibold uppercase tracking-wider">
        <div>Amount</div>
        <div></div>
        <div>Account</div>
        <div>Date</div>
      </div>

      <div className="flex flex-col">
        {transactions.map((tx, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[1.5fr_1fr_2fr_1.5fr] items-center px-4 py-4 border-b border-pink-50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-slate-900 font-bold text-lg">{tx.amount}</span>
              <span className="text-slate-400 font-medium">{tx.currency}</span>
            </div>

            <div>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                tx.status === 'Succeeded' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}>
                {tx.status}
              </span>
            </div>

            <div className="text-slate-500 font-medium">
              {tx.account}
            </div>

            <div className="text-slate-500 font-medium">
              {tx.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;