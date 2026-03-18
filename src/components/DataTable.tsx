import { useState, useRef, useEffect } from 'react';
import { tableData, type TableRow } from '../data/tableData';
import StatusIcon from './icons/StatusIcon';
import OverflowMenuIcon from './icons/OverflowMenuIcon';
import MoreVertIcon from './icons/MoreVertIcon';
import DropdownMenu from './DropdownMenu';

function DistributionIdCell({ value, isBoundary }: { value: string; isBoundary: boolean }) {
  const startChars = value.length > 5 ? value.slice(0, -5) : value;
  const endChars = value.length > 5 ? value.slice(-5) : '';

  return (
    <div 
      className={`flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full min-w-0 ${
        isBoundary ? 'border-r border-r-[#393939]' : ''
      }`}
    >
      <div 
        className="flex min-w-0 flex-1 text-[#c6c6c6] text-base leading-6 font-normal font-[Noto_Sans,sans-serif]"
        title={value}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap min-w-[5ch]">
          {startChars}
        </span>
        <span className="shrink-0 whitespace-nowrap">
          {endChars}
        </span>
      </div>
    </div>
  );
}

function AssetNameCell({ value, isBoundary }: { value: string; isBoundary: boolean }) {
  return (
    <div 
      className={`flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${
        isBoundary ? 'border-r border-r-[#393939]' : ''
      }`}
    >
      <span className="text-[#c6c6c6] text-base leading-6 overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 font-normal font-[Noto_Sans,sans-serif]">
        {value}
      </span>
    </div>
  );
}

function DateTimeCell({ date, time, isBoundary }: { date?: string | null; time?: string; isBoundary: boolean }) {
  if (!date) {
    return (
      <div 
        className={`h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full ${
          isBoundary ? 'border-r border-r-[#393939]' : ''
        }`}
      />
    );
  }
  return (
    <div 
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${
        isBoundary ? 'border-r border-r-[#393939]' : ''
      }`}
    >
      <div className="flex flex-col min-w-0 w-full">
        <span className="text-[#c6c6c6] text-base leading-6 overflow-hidden text-ellipsis whitespace-nowrap font-normal font-[Noto_Sans,sans-serif]">
          {date}
        </span>
        {time && (
          <span className="text-[#8d8d8d] text-xs leading-4 tracking-[0.032px] overflow-hidden text-ellipsis whitespace-nowrap font-normal font-[Noto_Sans,sans-serif]">
            {time}
          </span>
        )}
      </div>
    </div>
  );
}

function PlatformLicenseCell({ platform, license, isBoundary }: { platform: string | null; license?: string; isBoundary: boolean }) {
  if (!platform) {
    return (
      <div 
        className={`h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full ${
          isBoundary ? 'border-r border-r-[#393939]' : ''
        }`}
      />
    );
  }
  return (
    <div 
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${
        isBoundary ? 'border-r border-r-[#393939]' : ''
      }`}
    >
      <div className="flex flex-col min-w-0 w-full">
        <span className="text-[#c6c6c6] text-base leading-6 overflow-hidden text-ellipsis whitespace-nowrap font-normal font-[Noto_Sans,sans-serif]">
          {platform}
        </span>
        {license && (
          <span className="text-[#8d8d8d] text-xs leading-4 tracking-[0.032px] overflow-hidden text-ellipsis whitespace-nowrap font-normal font-[Noto_Sans,sans-serif]">
            {license}
          </span>
        )}
      </div>
    </div>
  );
}

function StatusCell({ status, isBoundary }: { status: 'Completed' | 'Failed'; isBoundary: boolean }) {
  const isCompleted = status === 'Completed';
  return (
    <div 
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${
        isBoundary ? 'border-r border-r-[#393939]' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center h-6 shrink-0">
          <StatusIcon status={status} className="w-4 h-4 shrink-0" />
        </div>
        <span
          className={`text-base leading-6 whitespace-nowrap font-normal font-[Noto_Sans,sans-serif] ${
            isCompleted ? 'text-[#42be65]' : 'text-[#fa4d56]'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function OverflowMenuCell() {
  return (
    <div className="flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-14">
      <button
        className="flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-[#c6c6c6]"
        title="More options"
      >
        <OverflowMenuIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

type MenuOptionType = 'sort-asc' | 'sort-desc' | 'group' | 'freeze';

function ColumnHeader({ 
  label, 
  width, 
  allowedOptions = ['sort-asc', 'sort-desc', 'group', 'freeze'],
  index,
  frozenColumnIndex,
  onFreeze,
  onUnfreeze,
  isBoundary
}: { 
  label: string; 
  width?: string;
  allowedOptions?: MenuOptionType[];
  index: number;
  frozenColumnIndex: number | null;
  onFreeze: (index: number) => void;
  onUnfreeze: () => void;
  isBoundary: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (headerRef.current) {
      setAnchorRect(headerRef.current.getBoundingClientRect());
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <>
      <div
        ref={headerRef}
        className={`group ${
          isMenuOpen ? 'bg-[#333333]' : 'bg-[#262626]'
        } hover:bg-[var(--header-hover-bg)] transition-colors duration-200 cursor-pointer border-b border-[#525252] flex items-center justify-between h-10 px-4 py-[10px] shrink-0 w-full relative ${
          isBoundary ? 'border-r border-r-[#393939]' : ''
        }`}
        style={width ? { width } : {}}
      >
        <span className="text-[#c6c6c6] text-[14px] leading-[18px] tracking-[0.022px] overflow-hidden text-ellipsis whitespace-nowrap font-normal font-['Noto_Sans',sans-serif]">
          {label}
        </span>
        <div 
          onClick={toggleMenu}
          className={`${
            isMenuOpen ? 'opacity-100 bg-[#525252]' : 'opacity-0 group-hover:opacity-100'
          } transition-all duration-200 text-[#c6c6c6] flex shrink-0 items-center justify-center w-4 h-4 rounded-[4px] relative z-10 cursor-pointer hover:bg-[#525252]`}
        >
          <MoreVertIcon className="w-full h-full" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[rgba(141,141,141,0.58)] h-[28px] w-[4px] rounded-tl-[1px] rounded-bl-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
      
      {isMenuOpen && anchorRect && (
        <DropdownMenu
          anchorRect={anchorRect}
          onClose={() => setIsMenuOpen(false)}
          options={([
            { id: 'sort-asc', label: 'Sort ascending', icon: 'asc' as const, onClick: () => console.log('Sort asc') },
            { id: 'sort-desc', label: 'Sort descending', icon: 'desc' as const, onClick: () => console.log('Sort desc') },
            { id: 'group', label: 'Group', indented: true, onClick: () => console.log('Group') },
            { 
              id: 'freeze', 
              label: isBoundary ? 'Unfreeze' : 'Freeze', 
              indented: true, 
              disabled: frozenColumnIndex !== null && index < frozenColumnIndex,
              onClick: () => {
                if (isBoundary) onUnfreeze();
                else onFreeze(index);
              } 
            },
          ] as const)
            .filter(opt => allowedOptions.includes(opt.id as MenuOptionType))
            .map(({ id, ...rest }) => rest as any)}
        />
      )}
    </>
  );
}

const COLUMNS = [
  { id: 'asset-name', label: 'Asset name', minWidth: 240, allowedOptions: ['sort-asc', 'sort-desc', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-id', label: 'Distribution ID', minWidth: 220, allowedOptions: ['freeze'] as MenuOptionType[] },
  { id: 'creation-date', label: 'Creation date', minWidth: 160, allowedOptions: ['sort-asc', 'sort-desc', 'group', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-date', label: 'Distribution date', minWidth: 160, allowedOptions: ['sort-asc', 'sort-desc', 'group', 'freeze'] as MenuOptionType[] },
  { id: 'platform-license', label: 'Platform - License', minWidth: 188, allowedOptions: ['group', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-status', label: 'Distribution status', minWidth: 160, allowedOptions: ['group', 'freeze'] as MenuOptionType[] },
];

export default function DataTable() {
  const rows: TableRow[] = tableData;
  const [frozenColumnIndex, setFrozenColumnIndex] = useState<number | null>(null);
  const [showActionBorder, setShowActionBorder] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate sticky left offsets
  const columnOffsets = COLUMNS.reduce((acc, _col, idx) => {
    if (idx === 0) acc.push(0);
    else acc.push(acc[idx - 1] + COLUMNS[idx - 1].minWidth);
    return acc;
  }, [] as number[]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Show border if not scrolled all the way to the right
      // We use a small threshold (1px) to avoid rounding issues
      setShowActionBorder(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll(); // Initial check
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  const renderCell = (colId: string, row: TableRow, isBoundary: boolean) => {
    switch (colId) {
      case 'asset-name':
        return <AssetNameCell key={row.id} value={row.assetName} isBoundary={isBoundary} />;
      case 'distribution-id':
        return <DistributionIdCell key={row.id} value={row.distributionId} isBoundary={isBoundary} />;
      case 'creation-date':
        return <DateTimeCell key={row.id} date={row.creationDate} time={row.creationTime} isBoundary={isBoundary} />;
      case 'distribution-date':
        return <DateTimeCell key={row.id} date={row.distributionDate} time={row.distributionTime} isBoundary={isBoundary} />;
      case 'platform-license':
        return <PlatformLicenseCell key={row.id} platform={row.platform} license={row.licenseRange} isBoundary={isBoundary} />;
      case 'distribution-status':
        return <StatusCell key={row.id} status={row.distributionStatus} isBoundary={isBoundary} />;
      default:
        return null;
    }
  };

  return (
    <div ref={scrollContainerRef} className="w-full overflow-x-auto selection:bg-transparent">
      <div className="flex w-full min-w-max">
        {COLUMNS.map((col, idx) => {
          const isSticky = frozenColumnIndex !== null && idx <= frozenColumnIndex;
          const leftOffset = columnOffsets[idx];
          const isBoundary = frozenColumnIndex !== null && idx === frozenColumnIndex;

          return (
            <div 
              key={col.id} 
              className={`flex flex-col flex-1 ${isSticky ? 'sticky z-20 bg-[#161616]' : ''}`}
              style={{ 
                minWidth: col.minWidth,
                ...(isSticky ? { left: leftOffset } : {})
              }}
            >
              <ColumnHeader 
                label={col.label} 
                allowedOptions={col.allowedOptions}
                index={idx}
                frozenColumnIndex={frozenColumnIndex}
                onFreeze={(i) => setFrozenColumnIndex(i)}
                onUnfreeze={() => setFrozenColumnIndex(null)}
                isBoundary={isBoundary}
              />
              {rows.map((row) => renderCell(col.id, row, isBoundary))}
            </div>
          );
        })}

        {/* Column 7: Overflow menu — fixed 56px, sticky right */}
        <div className={`flex flex-col w-14 sticky right-0 z-30 bg-[#161616] shrink-0 transition-colors duration-200 ${
          showActionBorder ? 'border-l-[1px] border-l-[#393939]' : ''
        }`}>
          <div className="bg-[#262626] h-10 w-14 shrink-0 border-b border-[#525252]" />
          {rows.map((row) => (
            <OverflowMenuCell key={row.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
