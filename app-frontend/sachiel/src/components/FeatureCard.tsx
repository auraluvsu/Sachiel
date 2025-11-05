import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div
      className="
        group
        backdrop-blur-xl 
        bg-white/5 
        border 
        border-white/10 
        rounded-2xl 
        p-6
        transition-all 
        duration-500
        hover:border-[#d3af37]
        hover:shadow-[0_0_30px_rgba(211,175,55,0.3)]
        hover:scale-105
        cursor-pointer
      "
    >
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-[#f2f2f2] mb-2">{title}</h3>
      <p className="text-[#f2f2f2]/70">{description}</p>
    </div>
  );
}
