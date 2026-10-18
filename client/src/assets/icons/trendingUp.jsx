export const TrendingUp = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="url(#grad1)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="lucide lucide-trending-up" 
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: "#2563EB"}} />
          <stop offset="50%" style={{stopColor: "#60A5FA"}} />
          <stop offset="100%" style={{stopColor: "#22D3EE"}} />
        </linearGradient>
      </defs>
      <path d="M16 7h6v6"/>
      <path d="m22 7-8.5 8.5-5-5L2 17"/>
    </svg>
  );
};
