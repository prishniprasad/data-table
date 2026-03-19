import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import SortAscIcon from './icons/SortAscIcon';
import SortDescIcon from './icons/SortDescIcon';

interface DropdownMenuProps {
  anchorRect: DOMRect;
  onClose: () => void;
  options: {
    label: string;
    icon?: 'asc' | 'desc';
    indented?: boolean;
    disabled?: boolean;
    onClick: () => void;
  }[];
}

export default function DropdownMenu({ anchorRect, onClose, options }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const menuContent = (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-[#262626] border border-[#393939] rounded-b-[4px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] flex flex-col"
      style={{
        top: anchorRect.bottom + 4,
        left: anchorRect.left - (anchorRect.left + 256 > window.innerWidth ? 256 - anchorRect.width : 0),
        width: 'fit-content',
        minWidth: '160px',
        maxWidth: '256px',
      }}
    >
      <div className="h-1 w-full" /> {/* Top spacer */}
      {options.map((option, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 px-4 py-[11px] text-[#8d8d8d] hover:text-[#c6c6c6] text-[14px] leading-[18px] font-normal font-['Noto_Sans',sans-serif] hover:bg-[#333333] cursor-pointer transition-colors ${
            option.indented ? 'pl-[40px]' : ''
          } ${option.disabled ? 'opacity-40 pointer-events-none' : ''}`}
          onClick={() => {
            if (option.disabled) return;
            option.onClick();
            onClose();
          }}
        >
          {option.icon === 'asc' && <SortAscIcon className="w-4 h-4 shrink-0" />}
          {option.icon === 'desc' && <SortDescIcon className="w-4 h-4 shrink-0" />}
          {!option.icon && option.indented && <div className="w-0" />} {/* Spacer for consistency if needed */}
          <span className="truncate">{option.label}</span>
        </div>
      ))}
      <div className="h-1 w-full" /> {/* Bottom spacer */}
    </div>
  );

  return createPortal(menuContent, document.body);
}
