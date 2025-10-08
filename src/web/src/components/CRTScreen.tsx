import { ReactNode } from 'react';

interface CRTScreenProps {
  children: ReactNode;
}

export const CRTScreen = ({ children }: CRTScreenProps) => {
  return (
    <div className="min-h-screen flex items-start justify-center p-4 scanlines-bg bg-black">
      <div className="relative w-full max-w-7xl">
        <div className="crt-screen relative bg-[#000000] p-6 rounded overflow-hidden">
          <div className="crt-flicker"></div>

          <div className="relative z-10 text-[#ffb000] font-mono">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .scanlines-bg {
          background-color: #000000;
          position: relative;
        }

        .scanlines-bg::before {
          content: '';
          position: fixed;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 176, 0, 0.15) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 9999;
          animation: scanline-move 8s linear infinite;
        }

        .scanlines-bg > * {
          position: relative;
          z-index: 2;
        }

        .crt-screen {
          box-shadow: inset 0 0 60px rgba(255, 176, 0, 0.15);
          text-shadow:
            0 0 8px rgba(255, 176, 0, 0.8),
            0 0 12px rgba(255, 176, 0, 0.6);
          min-height: 600px;
        }

        @keyframes scanline-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        .crt-flicker {
          position: absolute;
          inset: 0;
          background: rgba(255, 176, 0, 0.03);
          pointer-events: none;
          z-index: 4;
          animation: flicker 0.15s infinite;
        }

        @keyframes flicker {
          0% {
            opacity: 0.95;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.93;
          }
        }

        .crt-screen::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 176, 0, 0.05) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 3;
        }

        .crt-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 176, 0, 0.1) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};
