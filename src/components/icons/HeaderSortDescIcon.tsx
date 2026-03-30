export default function HeaderSortDescIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <mask id="mask0_header_desc" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
        <rect width="16" height="16" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_header_desc)">
        <path d="M7.24175 2.53125V10.5642L3.59608 6.91858L2.53125 8.00008L8.00008 13.4689L13.4689 8.00008L12.4041 6.91858L8.75842 10.5642V2.53125H7.24175Z" fill="white"/>
      </g>
    </svg>
  );
}
