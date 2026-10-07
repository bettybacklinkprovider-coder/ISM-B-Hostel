import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  gradientFallback?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  gradientFallback = 'from-[#3b1d5c] to-[#120322]',
  alt,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync src whenever prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Handle cached images immediately
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError && !currentSrc) {
    return (
      <div className={`relative bg-gradient-to-br ${gradientFallback} flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#cca43b_1px,transparent_1.5px)] bg-[size:10px_10px]" />
        <span className="font-display text-xs text-gold-300 uppercase tracking-widest font-bold z-10 px-2 text-center">
          {alt || 'ISM B Hostel'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#160627] ${className}`}>
      {/* Subtle loader shimmer if still loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#160627] flex items-center justify-center z-0">
          <div className="h-6 w-6 rounded-full border-2 border-gold-400/20 border-t-gold-400 animate-spin" />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt || 'Hostel Image'}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
        {...props}
      />
    </div>
  );
}

