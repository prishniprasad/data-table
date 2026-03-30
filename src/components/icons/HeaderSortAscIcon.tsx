export default function HeaderSortAscIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <mask id="mask0_header_asc" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
        <rect width="16" height="16" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_header_asc)">
        <path d="M7.24175 13.4689V5.43592L3.59608 9.08158L2.53125 8.00008L8.00008 2.53125L13.4689 8.00008L12.4041 9.08158L8.75842 5.43592V13.4689H7.24175Z" fill="white"/>
      </g>
    </svg>
  );
}
