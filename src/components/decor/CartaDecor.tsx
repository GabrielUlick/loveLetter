"use client";

export default function CartaDecor() {
  return (
    <div className="carta-decor pointer-events-none" aria-hidden>
      {/* Ribbon across top */}
      <span className="carta-ribbon" />

      {/* Wax seal bottom-right */}
      <span className="wax-seal">
        <span className="wax-heart" />
      </span>

      {/* Floating love stamps */}
      <span className="love-stamp s1" />
      <span className="love-stamp s2" />

      {/* Decorative quill feather */}
      <span className="quill-wrap">
        <svg className="quill" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 100 C40 80, 70 60, 100 20" stroke="#FFD1DC" strokeWidth="3" strokeLinecap="round"/>
          <path d="M28 90 C46 76, 74 52, 98 24" stroke="#FF7AB6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M35 85 C56 70, 76 50, 94 30" stroke="#FF4FA3" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    </div>
  );
}
