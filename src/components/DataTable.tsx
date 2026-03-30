import { useState, useRef, useEffect, useMemo } from 'react';
import { tableData, type TableRow } from '../data/tableData';
import StatusIcon from './icons/StatusIcon';
import OverflowMenuIcon from './icons/OverflowMenuIcon';
import MoreVertIcon from './icons/MoreVertIcon';
import HeaderSortAscIcon from './icons/HeaderSortAscIcon';
import HeaderSortDescIcon from './icons/HeaderSortDescIcon';
import DropdownMenu from './DropdownMenu';

function DistributionIdCell({ value, isBoundary, isResizing }: { value: string; isBoundary: boolean; isResizing: boolean }) {
  const startChars = value.length > 5 ? value.slice(0, -5) : value;
  const endChars = value.length > 5 ? value.slice(-5) : '';

  return (
    <div
      className={`flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full min-w-0 ${isBoundary ? 'border-r border-r-[#393939]' : ''
        } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
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

function AssetNameCell({ value, isBoundary, isResizing }: { value: string; isBoundary: boolean; isResizing: boolean }) {
  return (
    <div
      className={`flex items-center h-14 px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
        } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
    >
      <span className="text-[#c6c6c6] text-base leading-6 overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 font-normal font-[Noto_Sans,sans-serif]">
        {value}
      </span>
    </div>
  );
}

function DateTimeCell({ date, time, isBoundary, isResizing }: { date?: string | null; time?: string; isBoundary: boolean; isResizing: boolean }) {
  if (!date) {
    return (
      <div
        className={`h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
          } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
      />
    );
  }
  return (
    <div
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
        } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
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

function PlatformLicenseCell({ platform, license, isBoundary, isResizing }: { platform: string | null; license?: string; isBoundary: boolean; isResizing: boolean }) {
  if (!platform) {
    return (
      <div
        className={`h-14 border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
          } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
      />
    );
  }
  return (
    <div
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
        } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
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

function StatusCell({ status, isBoundary, isResizing }: { status: 'Completed' | 'Failed'; isBoundary: boolean; isResizing: boolean }) {
  const isCompleted = status === 'Completed';
  return (
    <div
      className={`flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-full ${isBoundary ? 'border-r border-r-[#393939]' : ''
        } ${isResizing ? 'border-r border-r-[#676767]' : ''}`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center h-6 shrink-0">
          <StatusIcon status={status} className="w-4 h-4 shrink-0" />
        </div>
        <span
          className={`text-base leading-6 whitespace-nowrap font-normal font-[Noto_Sans,sans-serif] ${isCompleted ? 'text-[#42be65]' : 'text-[#fa4d56]'
            }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function ActionHeader({ isActionBoundary }: { isActionBoundary: boolean }) {
  return (
    <div
      className={`bg-[#262626] h-10 w-14 shrink-0 border-b border-[#525252] flex items-center justify-center relative ${isActionBoundary ? 'border-l border-l-[#393939]' : ''
        }`}
    />
  );
}

function OverflowMenuCell() {
  return (
    <div className="flex h-14 items-center px-4 py-[10px] border-b border-[var(--color-cell-border)] shrink-0 w-14">
      <div
        className="flex items-center justify-center p-1 rounded text-[#c6c6c6] cursor-default pointer-events-none"
        title="More options"
      >
        <OverflowMenuIcon className="w-4 h-4" />
      </div>
    </div>
  );
}

type MenuOptionType = 'sort-asc' | 'sort-desc' | 'group' | 'freeze';

function ColumnHeader({
  label,
  allowedOptions = ['sort-asc', 'sort-desc', 'group', 'freeze'],
  index,
  frozenColumnIndex,
  onFreeze,
  onUnfreeze,
  isBoundary,
  onResizeStart,
  onResizeDoubleClick,
  isResizing,
  sortDirection,
  onSort,
  onClearSort
}: {
  label: string;
  allowedOptions?: MenuOptionType[];
  index: number;
  frozenColumnIndex: number | null;
  onFreeze: (index: number) => void;
  onUnfreeze: () => void;
  isBoundary: boolean;
  onResizeStart: (e: React.MouseEvent) => void;
  onResizeDoubleClick: () => void;
  isResizing: boolean;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (dir: 'asc' | 'desc') => void;
  onClearSort: () => void;
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
        className={`group ${isMenuOpen ? 'bg-[#333333]' : 'bg-[#262626]'
          } hover:bg-[var(--header-hover-bg)] transition-colors duration-200 cursor-pointer border-b border-[#525252] flex items-center justify-between h-10 px-4 py-[10px] shrink-0 w-full relative ${isResizing ? 'border-r border-r-[#676767]' : isBoundary ? 'border-r border-r-[#393939]' : ''
          }`}
      >
        <div className="flex items-center gap-[6px] flex-1 min-w-0">
          <span className="text-[#c6c6c6] text-[14px] leading-[18px] tracking-[0.022px] overflow-hidden text-ellipsis whitespace-nowrap font-normal font-['Noto_Sans',sans-serif]">
            {label}
          </span>
          {sortDirection === 'asc' && <HeaderSortAscIcon className="w-4 h-4 shrink-0" />}
          {sortDirection === 'desc' && <HeaderSortDescIcon className="w-4 h-4 shrink-0" />}
        </div>
        <div
          onClick={toggleMenu}
          className={`${isMenuOpen ? 'opacity-100 bg-[#525252]' : 'opacity-0 group-hover:opacity-100'
            } transition-all duration-200 text-[#c6c6c6] flex shrink-0 items-center justify-center w-4 h-4 rounded-[4px] relative z-10 cursor-pointer hover:bg-[#525252]`}
        >
          <MoreVertIcon className="w-full h-full" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[rgba(141,141,141,0.58)] h-[28px] w-[4px] rounded-tl-[1px] rounded-bl-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Resize Handle */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[4px] cursor-col-resize z-20 group-hover:bg-[#393939]/30 transition-colors"
          onMouseDown={onResizeStart}
          onDoubleClick={onResizeDoubleClick}
        />
      </div>

      {isMenuOpen && anchorRect && (
        <DropdownMenu
          anchorRect={anchorRect}
          onClose={() => setIsMenuOpen(false)}
          options={([
            {
              id: 'sort-asc',
              label: sortDirection === 'asc' ? 'Sorted ascending' : 'Sort ascending',
              icon: 'asc' as const,
              isActive: sortDirection === 'asc',
              onClear: sortDirection === 'asc' ? onClearSort : undefined,
              onClick: () => onSort('asc')
            },
            {
              id: 'sort-desc',
              label: sortDirection === 'desc' ? 'Sorted descending' : 'Sort descending',
              icon: 'desc' as const,
              isActive: sortDirection === 'desc',
              onClear: sortDirection === 'desc' ? onClearSort : undefined,
              onClick: () => onSort('desc')
            },
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
  { id: 'asset-name', label: 'Asset name', minWidth: 240, maxWidth: 400, allowedOptions: ['sort-asc', 'sort-desc', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-id', label: 'Distribution ID', minWidth: 220, allowedOptions: ['freeze'] as MenuOptionType[] },
  { id: 'creation-date', label: 'Creation date', minWidth: 160, allowedOptions: ['sort-asc', 'sort-desc', 'group', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-date', label: 'Distribution date', minWidth: 160, allowedOptions: ['sort-asc', 'sort-desc', 'group', 'freeze'] as MenuOptionType[] },
  { id: 'platform-license', label: 'Platform - License', minWidth: 188, allowedOptions: ['group', 'freeze'] as MenuOptionType[] },
  { id: 'distribution-status', label: 'Distribution status', minWidth: 160, allowedOptions: ['group', 'freeze'] as MenuOptionType[] },
];

export default function DataTable() {
  const initialRows = useRef<TableRow[]>(tableData);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    COLUMNS.map(col => col.minWidth)
  );
  const [resizingIndex, setResizingIndex] = useState<number | null>(null);
  const [frozenColumnIndex, setFrozenColumnIndex] = useState<number | null>(null);
  const [showActionBorder, setShowActionBorder] = useState(false);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [sortState, setSortState] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sortedRows = useMemo(() => {
    const base = [...initialRows.current];
    if (!sortState) return base;

    const { columnId, direction } = sortState;
    const compare = (a: TableRow, b: TableRow): number => {
      let valA: string | number | null | undefined;
      let valB: string | number | null | undefined;

      switch (columnId) {
        case 'asset-name': valA = a.assetName; valB = b.assetName; break;
        case 'distribution-id': valA = a.distributionId; valB = b.distributionId; break;
        case 'creation-date': valA = a.creationDate; valB = b.creationDate; break;
        case 'distribution-date': valA = a.distributionDate ?? ''; valB = b.distributionDate ?? ''; break;
        case 'platform-license': valA = a.platform ?? ''; valB = b.platform ?? ''; break;
        case 'distribution-status': valA = a.distributionStatus; valB = b.distributionStatus; break;
        default: return 0;
      }

      if (valA == null) valA = '';
      if (valB == null) valB = '';

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      if (strA < strB) return direction === 'asc' ? -1 : 1;
      if (strA > strB) return direction === 'asc' ? 1 : -1;
      return 0;
    };

    return base.sort(compare);
  }, [sortState]);

  const handleSort = (columnId: string, direction: 'asc' | 'desc') => {
    setSortState({ columnId, direction });
  };

  const handleClearSort = () => {
    setSortState(null);
  };

  const handleResizeStart = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capture current visual widths of all columns to prevent "jumping"
    let startWidth = columnWidths[index];
    if (scrollContainerRef.current) {
      const columnElements = Array.from(scrollContainerRef.current.querySelectorAll('.col-wrapper')) as HTMLElement[];
      const currentWidths = columnElements.map(el => el.getBoundingClientRect().width);
      if (currentWidths.length > 0) {
        setColumnWidths(currentWidths);
        startWidth = currentWidths[index];
      }
    }
    
    setResizingIndex(index);
    
    const startX = e.pageX;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX;
      const newWidth = Math.max(
        COLUMNS[index].minWidth,
        Math.min(COLUMNS[index].maxWidth || 1000, startWidth + deltaX)
      );

      setColumnWidths(prev => {
        const next = [...prev];
        next[index] = newWidth;
        return next;
      });

      document.body.style.cursor = 'col-resize';
    };

    const onMouseUp = () => {
      setResizingIndex(null);
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleResizeDoubleClick = (index: number) => {
    setColumnWidths(prev => {
      const next = [...prev];
      next[index] = COLUMNS[index].minWidth;
      return next;
    });
  };

  // Calculate sticky left offsets based on CURRENT column widths
  const columnOffsets = columnWidths.reduce((acc, _, idx) => {
    if (idx === 0) acc.push(0);
    else acc.push(acc[idx - 1] + columnWidths[idx - 1]);
    return acc;
  }, [] as number[]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrolledLeft(scrollLeft > 0);
      setShowActionBorder(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll(); // Initial check
      container.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  const renderCell = (colId: string, row: TableRow, isBoundary: boolean, isResizing: boolean) => {
    switch (colId) {
      case 'asset-name':
        return <AssetNameCell key={row.id} value={row.assetName} isBoundary={isBoundary} isResizing={isResizing} />;
      case 'distribution-id':
        return <DistributionIdCell key={row.id} value={row.distributionId} isBoundary={isBoundary} isResizing={isResizing} />;
      case 'creation-date':
        return <DateTimeCell key={row.id} date={row.creationDate} time={row.creationTime} isBoundary={isBoundary} isResizing={isResizing} />;
      case 'distribution-date':
        return <DateTimeCell key={row.id} date={row.distributionDate} time={row.distributionTime} isBoundary={isBoundary} isResizing={isResizing} />;
      case 'platform-license':
        return <PlatformLicenseCell key={row.id} platform={row.platform} license={row.licenseRange} isBoundary={isBoundary} isResizing={isResizing} />;
      case 'distribution-status':
        return <StatusCell key={row.id} status={row.distributionStatus} isBoundary={isBoundary} isResizing={isResizing} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`w-full overflow-x-auto selection:bg-transparent ${showActionBorder ? 'has-more-right' : ''}`}
    >
      <div className="flex w-full min-w-full">
        {COLUMNS.map((col, idx) => {
          const isSticky = frozenColumnIndex !== null && idx <= frozenColumnIndex;
          const leftOffset = columnOffsets[idx];
          const isBoundary = frozenColumnIndex !== null && idx === frozenColumnIndex;

          return (
            <div 
              key={col.id} 
              className={`flex flex-col relative col-wrapper ${isSticky ? 'sticky z-20 bg-[#161616]' : ''} ${resizingIndex === idx ? 'is-resizing' : ''}`}
              style={{ 
                width: `${columnWidths[idx]}px`,
                flex: resizingIndex !== null ? `0 0 ${columnWidths[idx]}px` : `1 0 ${columnWidths[idx]}px`,
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
                onResizeStart={(e) => handleResizeStart(idx, e)}
                onResizeDoubleClick={() => handleResizeDoubleClick(idx)}
                isResizing={resizingIndex === idx}
                sortDirection={sortState?.columnId === col.id ? sortState.direction : null}
                onSort={(dir) => handleSort(col.id, dir)}
                onClearSort={handleClearSort}
              />
              {sortedRows.map((row) => renderCell(col.id, row, isBoundary, resizingIndex === idx))}

              {isBoundary && (
                <div
                  className="absolute left-full top-0 bottom-0 w-[6px] pointer-events-none transition-opacity duration-200 ease-in-out z-10"
                  style={{
                    background: 'var(--scroll-shadow-gradient)',
                    opacity: isScrolledLeft ? 1 : 0
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Column 7: Overflow menu — fixed 56px, sticky right */}
        <div className={`flex flex-col w-14 sticky right-0 z-30 bg-[#161616] shrink-0 transition-colors duration-200 relative ${showActionBorder ? 'border-l-[1px] border-l-[#393939]' : ''
          }`}>
          {/* Action Column Shadow */}
          <div
            className="absolute right-full top-0 bottom-0 w-[6px] pointer-events-none transition-opacity duration-200 ease-in-out z-10"
            style={{
              background: 'var(--scroll-shadow-gradient-left)',
              opacity: showActionBorder ? 1 : 0
            }}
          />
          <ActionHeader
            isActionBoundary={showActionBorder}
          />
          {sortedRows.map((row) => (
            <OverflowMenuCell key={row.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
