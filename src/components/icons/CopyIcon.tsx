export default function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* IBM Carbon Copy icon */}
      <path d="M10 1H2v11h1V2h7V1z" />
      <path d="M4 4v11h10V4H4zm9 10H5V5h8v9z" />
    </svg>
  );
}
