import { useEffect, useState } from 'react';

export default function DeveloperPage() {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowName(true), 1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-3xl font-semibold">
      Hi, my name is{" "}
      <span
        className={`ml-2 transition-opacity duration-1000 ${
          showName ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Pavan
      </span>
    </div>
  );
}
