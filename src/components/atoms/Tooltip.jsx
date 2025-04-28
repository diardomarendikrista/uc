import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "lib/utils";

export default function Tooltip({
  className,
  text,
  children,
  placement = "top",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect();

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      let top, left;

      switch (placement) {
        case "top":
          top = triggerRect.top + scrollTop - (tooltipRect?.height || 0) - 8;
          left = triggerRect.left + scrollLeft + triggerRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + scrollTop + 8;
          left = triggerRect.left + scrollLeft + triggerRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + scrollTop + triggerRect.height / 2;
          left = triggerRect.left + scrollLeft - (tooltipRect?.width || 0) - 8;
          break;
        case "right":
          top = triggerRect.top + scrollTop + triggerRect.height / 2;
          left = triggerRect.right + scrollLeft + 8;
          break;
        default:
          top = triggerRect.top + scrollTop - (tooltipRect?.height || 0) - 8;
          left = triggerRect.left + scrollLeft + triggerRect.width / 2;
      }

      setPosition({ top, left });
    }
  }, [isVisible, placement]);

  // Tooltip styles based on placement
  const getTooltipStyles = () => {
    const baseStyles = {
      position: "absolute",
      zIndex: 1000,
      ...position,
    };

    const placementStyles = {
      top: { transform: "translateX(-50%)" },
      bottom: { transform: "translateX(-50%)" },
      left: { transform: "translateY(-50%)" },
      right: { transform: "translateY(-50%)" },
    };

    return {
      ...baseStyles,
      ...(placementStyles[placement] || placementStyles.top),
    };
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            style={getTooltipStyles()}
            className={cn(
              "bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg pointer-events-none",
              className
            )}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
