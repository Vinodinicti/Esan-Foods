import React from 'react';

export function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}

/* Realistic Value Proposition Icons */

// 1. Cold Stone Milled: Traditional stone grinding mill (திருகைக்கல்)
export function StoneMillIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <ellipse cx="12" cy="17" rx="8.5" ry="3.8" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="12" cy="10.5" rx="7.5" ry="3.2" />
      <path d="M4.5 10.5v6.5c0 1.8 3.36 3.2 7.5 3.2s7.5-1.4 7.5-3.2v-6.5" />
      <ellipse cx="12" cy="10.5" rx="2" ry="0.9" fill="currentColor" fillOpacity="0.35" />
      <path d="M15.5 10.5V5.5a1 1 0 0 0-1-1h-1" />
      <circle cx="8" cy="17" r="0.6" fill="currentColor" />
      <circle cx="16" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

// 2. No Preservatives: Pure botanical leaf with natural veins & dewdrop
export function PureOrganicLeafIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-4.5 3.5-8.5 8-11 4.5 2.5 8 6.5 8 11a7 7 0 0 1-7 7z" fill="currentColor" fillOpacity="0.15" />
      <path d="M11 20V4" />
      <path d="M11 9l4-2.5" />
      <path d="M11 12.5l-4-2.5" />
      <path d="M11 15.5l3.5-2" />
      <circle cx="15.5" cy="12" r="1.1" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

// 3. Rich in Vitamins: Immunity protection shield with vitality pulse
export function ImmunityShieldIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
      <path d="M7.5 12h2.2l1.3-3 2 6 1.2-3h2.3" strokeWidth="2" />
      <circle cx="15.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

// 4. Delivered Fresh: Express delivery van directly to doorstep
export function DoorstepDeliveryIcon({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 5h11v11H2z" fill="currentColor" fillOpacity="0.15" />
      <path d="M13 8h4.5l2.5 3.5V16h-7V8z" />
      <circle cx="6" cy="18" r="2" fill="currentColor" />
      <circle cx="17" cy="18" r="2" fill="currentColor" />
      <path d="M5.5 8.5h4v4h-4z" strokeDasharray="1 1" />
      <line x1="0.5" y1="8" x2="1.5" y2="8" />
      <line x1="0" y1="11" x2="1.5" y2="11" />
    </svg>
  );
}
