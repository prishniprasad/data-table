type Props = {
  status: 'Completed' | 'Failed';
  className?: string;
};

// Completed = green circle with checkmark, Failed = red circle with X
export default function StatusIcon({ status, className }: Props) {
  if (status === 'Completed') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        {/* Green checkmark circle */}
        <circle cx="8" cy="8" r="7.5" stroke="#42be65" />
        <path
          d="M5 8.5l2 2 4-4"
          stroke="#42be65"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* Red X circle */}
      <circle cx="8" cy="8" r="7.5" stroke="#fa4d56" fill="#fa4d56" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
