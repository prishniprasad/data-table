import { useEffect, useRef, useState, useLayoutEffect } from 'react';
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
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none'
  });

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

  useLayoutEffect(() => {
    if (menuRef.current) {
      const top = anchorRect.bottom + 4;
      
      // Enforce right alignment: Set left to anchor right edge and translate back by 100%
      // This ensures right-aligned behavior regardless of the menu's dynamic width.
      let left = anchorRect.right;
      
      // Basic viewport safety: ensure it doesn't go off-screen left
      const menuRect = menuRef.current.getBoundingClientRect();
      const menuWidth = menuRect.width > 0 ? menuRect.width : 160;
      
      if (left - menuWidth < 4) {
        // If it overlaps left, align to the left of the viewport with 4px margin
        // and remove the transform
        setStyle({
          position: 'fixed',
          top,
          left: 4,
          width: 'fit-content',
          minWidth: '160px',
          maxWidth: '256px',
          opacity: 1,
          pointerEvents: 'auto',
          transform: 'none'
        });
      } else {
        setStyle({
          position: 'fixed',
          top,
          left,
          width: 'fit-content',
          minWidth: '160px',
          maxWidth: '256px',
          opacity: 1,
          pointerEvents: 'auto',
          transform: 'translateX(-100%)'
        });
      }
    }
  }, [anchorRect]);

  const menuContent = (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-[#262626] border border-[#393939] rounded-b-[4px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.3)] flex flex-col transition-opacity duration-150"
      style={style}
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
          {!option.icon && option.indented && <div className="w-0" />}
          <span className="truncate">{option.label}</span>
        </div>
      ))}
      <div className="h-1 w-full" /> {/* Bottom spacer */}
    </div>
  );

  return createPortal(menuContent, document.body);
}
