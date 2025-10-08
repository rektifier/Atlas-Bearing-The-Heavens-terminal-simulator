import { useState, useEffect } from 'react';
import { MenuOption } from '../types/terminal';
import { SoundEffect } from '../hooks/useAudioPlayer';

interface MenuProps {
  options: MenuOption[];
  onSelect: (index: number) => void;
  body?: string;
  animateBody?: boolean;
  playSound?: (sound: SoundEffect) => void;
}

export const Menu = ({ options, onSelect, body, animateBody = false, playSound }: MenuProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedBody, setDisplayedBody] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (body && animateBody) {
      setIsAnimating(true);
      setDisplayedBody('');
      let index = 0;
      const interval = setInterval(() => {
        if (index <= body.length) {
          setDisplayedBody(body.substring(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 1);
      return () => clearInterval(interval);
    } else if (body) {
      setDisplayedBody(body);
    }
  }, [body, animateBody]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          playSound?.('menu_nav');
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          playSound?.('menu_nav');
          setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(selectedIndex);
          break;
        case 'Escape':
          e.preventDefault();
          const backIndex = options.findIndex((opt) => opt.label === 'BACK');
          if (backIndex !== -1) {
            onSelect(backIndex);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, options, onSelect, isAnimating, playSound]);

  return (
    <div className="space-y-4">
      {displayedBody && (
        <pre className="text-xs sm:text-sm leading-tight mb-6 whitespace-pre-wrap break-words">
          {displayedBody}
        </pre>
      )}

      <div className="space-y-1">
        {options.map((option, index) => (
          <div
            key={index}
            className={`py-1 cursor-pointer transition-colors flex items-center ${
              index === selectedIndex
                ? 'text-[#ffd666]'
                : 'text-[#ffb000]'
            }`}
            onClick={() => onSelect(index)}
            onMouseEnter={() => {
              if (index !== selectedIndex) {
                playSound?.('menu_nav');
              }
              setSelectedIndex(index);
            }}
          >
            <span className="w-8 text-left">
              {index === selectedIndex ? '>' : ''}
            </span>
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
