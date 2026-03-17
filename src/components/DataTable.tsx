import { useState, useRef } from 'react';
import { tableData, type TableRow } from '../data/tableData';
import StatusIcon from './icons/StatusIcon';
import OverflowMenuIcon from './icons/OverflowMenuIcon';
import MoreVertIcon from './icons/MoreVertIcon';
import DropdownMenu from './DropdownMenu';

function DistributionIdCell({ value }: { value: string }) {
  // We want to preserve at least the first block and exactly the last 5 chars.
  // We split the ID so CSS can truncate the first part with an ellipsis
  // while keeping the last 5 characters fully visible at all times.
  const startChars = value.length > 5 ? value.slice(0, -5) : value;
  const endChars = value.length > 5 ? value.slice(-5) : '';

  return (
    <div className="flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full min-w-0">
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

function AssetNameCell({ value }: { value: string }) {
  return (
    <div className="flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full">
      <span className="text-[#c6c6c6] text-base leading-6 overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 font-normal font-[Noto_Sans,sans-serif]">
        {value}
      </span>
    </div>
  );
}

function DateTimeCell({ date, time }: { date?: string | null; time?: string }) {
  if (!date) {
    return <div className="h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full" />;
  }
  return (
    <div className="flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full">
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

function PlatformLicenseCell({ platform, license }: { platform: string | null; license?: string }) {
  if (!platform) {
    return <div className="h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full" />;
  }
  return (
    <div className="flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full">
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

function StatusCell({ status }: { status: 'Completed' | 'Failed' }) {
  const isCompleted = status === 'Completed';
  return (
    <div className="flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full">
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
  allowedOptions = ['sort-asc', 'sort-desc', 'group', 'freeze'] 
}: { 
  label: string; 
  width?: string;
  allowedOptions?: MenuOptionType[];
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
        } hover:bg-[var(--header-hover-bg)] transition-colors duration-200 cursor-pointer border-b border-[#525252] flex items-center justify-between h-10 px-4 py-[10px] shrink-0 w-full relative`}
        style={width ? { width } : undefined}
      >
        <span className="text-[#c6c6c6] text-sm leading-[18px] tracking-[0.022px] overflow-hidden text-ellipsis whitespace-nowrap font-normal font-[Noto_Sans,sans-serif]">
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
            { id: 'freeze', label: 'Freeze', indented: true, onClick: () => console.log('Freeze') },
          ] as const)
            .filter(opt => allowedOptions.includes(opt.id as MenuOptionType))
            .map(({ id, ...rest }) => rest as any)}
        />
      )}
    </>
  );
}

export default function DataTable() {
  const rows: TableRow[] = tableData;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-full min-w-fit">
        {/* Column 1: Asset name — flex fill, min 240px */}
        <div className="flex flex-col flex-1 min-w-[240px]">
          <ColumnHeader label="Asset name" allowedOptions={['sort-asc', 'sort-desc', 'freeze']} />
          {rows.map((row) => (
            <AssetNameCell key={row.id} value={row.assetName} />
          ))}
        </div>

        {/* Column 2: Distribution ID — flex fill, min 268px */}
        <div className="flex flex-col flex-1 min-w-[268px]">
          <ColumnHeader label="Distribution ID" allowedOptions={['freeze']} />
          {rows.map((row) => (
            <DistributionIdCell key={row.id} value={row.distributionId} />
          ))}
        </div>

        {/* Column 3: Creation date — flex fill, min 160px */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <ColumnHeader label="Creation date" />
          {rows.map((row) => (
            <DateTimeCell key={row.id} date={row.creationDate} time={row.creationTime} />
          ))}
        </div>

        {/* Column 4: Distribution date — flex fill, min 160px */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <ColumnHeader label="Distribution date" />
          {rows.map((row) => (
            <DateTimeCell key={row.id} date={row.distributionDate} time={row.distributionTime} />
          ))}
        </div>

        {/* Column 5: Platform - License — flex fill, min 188px */}
        <div className="flex flex-col flex-1 min-w-[188px]">
          <ColumnHeader label="Platform - License" allowedOptions={['group', 'freeze']} />
          {rows.map((row) => (
            <PlatformLicenseCell key={row.id} platform={row.platform} license={row.licenseRange} />
          ))}
        </div>

        {/* Column 6: Distribution status — flex fill, min 160px */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <ColumnHeader label="Distribution status" allowedOptions={['group', 'freeze']} />
          {rows.map((row) => (
            <StatusCell key={row.id} status={row.distributionStatus} />
          ))}
        </div>

        {/* Column 7: Overflow menu — fixed 56px, sticky right */}
        <div className="flex flex-col w-14 sticky right-0 z-10 bg-[#161616] shrink-0">
          <div className="bg-[#262626] border-b border-[#525252] h-10 w-14 shrink-0" />
          {rows.map((row) => (
            <OverflowMenuCell key={row.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
