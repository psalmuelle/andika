"use client";
export default function Hero() {
  return (
    <div className="mx-auto mt-10 max-w-5xl px-[5%]">
      {/* For small screens */}
      <img
        className="block rounded-t-lg md:hidden"
        src="/dashboard-small.png"
        alt="Andika dashboard for managing projects"
      />
      {/* For medium and larger screens */}
      <img
        className="hidden rounded-t-lg md:block"
        src="/dashboard-large.png"
        alt="Andika dashboard for managing projects (Desktop view)"
      />
    </div>
  );
}
