import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'TenderWise India Editorial Photograph',
  className = 'w-full h-full object-cover',
  containerClassName = '',
  fallbackTitle,
  fallbackCategory,
  priority = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If image fails or src is empty, render institutional editorial fallback
  if (error || !src) {
    return (
      <div
        className={`bg-stone-200 border border-stone-300 flex flex-col items-center justify-center p-6 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 mb-3 rounded-full bg-stone-300/80 border border-stone-400/50 flex items-center justify-center text-stone-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#0F766E] block mb-1">
          {fallbackCategory || 'Procurement Research Archive'}
        </span>
        <p className="text-xs font-serif font-semibold text-stone-800 line-clamp-2 max-w-xs">
          {fallbackTitle || alt}
        </p>
        <span className="text-[10px] text-stone-500 mt-2 font-mono">
          Official Reference Photographic Archive
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Subtle skeleton shimmer before load */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          console.warn(`[TenderWise Visuals] Image load failed for: ${src}`);
          setError(true);
        }}
        {...props}
      />
    </div>
  );
};
