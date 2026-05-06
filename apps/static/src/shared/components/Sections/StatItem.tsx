
export const StatItem = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="group transition-all duration-500 ease-out relative flex flex-col items-center justify-center p-8 cursor-default">
      <div className="absolute top-0 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 ease-out group-hover:w-full group-hover:left-0" />
      
      <h3 className="text-5xl font-bold text-slate-900 dark:text-(--foreground) mb-2 transition-transform duration-300 group-hover:-translate-y-1">
        {value}
      </h3>
      <p className="text-slate-500 dark:text-(--foreground) text-sm font-medium text-center max-w-[180px] leading-relaxed">
        {label}
      </p>

      <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500 ease-out group-hover:w-full group-hover:left-0" />
    </div>
  );
};
