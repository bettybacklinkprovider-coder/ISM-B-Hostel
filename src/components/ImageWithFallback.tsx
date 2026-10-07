import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  gradientFallback?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  gradientFallback = 'from-[#3b1d5c] to-[#120322]',
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      // Try the stable secondary fallback source
      setImgSrc(fallbackSrc);
    }
  };

  if (failed && !imgSrc) {
    // If everything failed, render a gorgeous gradient placeholder with custom styling
    return (
      <div className={`relative bg-gradient-to-br ${gradientFallback} flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cca43b_1px,transparent_1.5px)] bg-[size:10px_10px]" />
        <span className="font-display text-xs text-gold-300 uppercase tracking-widest font-bold">
          {alt || 'Luxury Stay'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Luxury shimmer loader shown while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#160627] flex items-center justify-center animate-pulse z-10">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#cca43b_1px,transparent_1.5px)] bg-[size:10px_10px]" />
          <div className="h-6 w-6 rounded-full border-2 border-gold-400/20 border-t-gold-400 animate-spin" />
        </div>
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        }`}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
