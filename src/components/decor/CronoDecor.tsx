"use client";

export default function CronoDecor() {
  return (
    <div className="crono-decor pointer-events-none" aria-hidden>
      {/* Cupid arrow passing periodically */}
      <span className="cupid" />

      {/* Garland of hearts at top */}
      <div className="garland">
        {Array.from({ length: 10 }).map((_, i) => {
          const id = `g-${i}`;
          return <span className="garland-heart" key={id} style={{ ['--i' as any]: i }} />;
        })}
      </div>

      {/* Floating balloons */}
      <div className="balloons">
        <span className="balloon b1" />
        <span className="balloon b2" />
        <span className="balloon b3" />
      </div>
    </div>
  );
}
