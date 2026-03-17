export default function OverflowMenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* IBM Carbon Overflow Menu Vertical icon */}
      <circle cx="8" cy="3" r="1" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="8" cy="13" r="1" />
    </svg>
  );
}
