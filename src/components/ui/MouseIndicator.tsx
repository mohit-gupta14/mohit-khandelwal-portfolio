import React, { useEffect, useState, useRef } from 'react';

export const MouseIndicator: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse positions
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  // Detect pointer capability (desktop vs mobile touch)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp loop for outer ring
  useEffect(() => {
    if (!isPointerDevice) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smoothly interpolate ring towards mouse position
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.22);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.22);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) ${
          isClicked ? 'scale(0.85)' : isHovered ? 'scale(1.5)' : 'scale(1)'
        }`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) ${
          isClicked ? 'scale(0.7)' : isHovered ? 'scale(0.85)' : 'scale(1)'
        }`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPointerDevice, isHovered, isClicked]);

  // Event listeners for mouse move, hover, down, up, leave
  useEffect(() => {
    if (!isPointerDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        // Snap ring to initial mouse entrance position
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .clickable'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isPointerDevice, isVisible]);

  return (
    <>
      {/* Top 2px Gradient Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[10000] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Custom Mouse Cursor (Desktop Pointer Only) */}
      {isPointerDevice && (
        <>
          {/* Inner Cyan Dot */}
          <div
            ref={dotRef}
            aria-hidden="true"
            className={`fixed top-0 left-0 pointer-events-none z-[9999] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] will-change-transform transition-opacity duration-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Outer Trailing Ring */}
          <div
            ref={ringRef}
            aria-hidden="true"
            className={`fixed top-0 left-0 pointer-events-none z-[9998] h-9 w-9 rounded-full border transition-[border-color,background-color,opacity] duration-200 backdrop-blur-[1px] will-change-transform ${
              isHovered
                ? 'border-cyan-400 bg-cyan-400/15 shadow-[0_0_16px_rgba(34,211,238,0.3)]'
                : 'border-cyan-400/40 bg-transparent'
            } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </>
  );
};
