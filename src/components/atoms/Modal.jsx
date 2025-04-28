import React, { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { cn } from "lib/utils";

export default function Modal({
  showModal,
  setShowModal,
  title,
  className,
  children,
  preventOutsideClose = false,
}) {
  const modalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Use a ref to track if the component is mounted
  const isMounted = useRef(false);

  // Handle modal visibility with animation
  useEffect(() => {
    if (showModal) {
      // Ensure we're fully mounted before animation
      setShouldRender(true);

      // Use requestAnimationFrame for more reliable animation timing
      requestAnimationFrame(() => {
        // Check if component is still mounted (prevents race conditions)
        if (isMounted.current) {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        }
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // Set mounted ref to true on mount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !preventOutsideClose
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal, preventOutsideClose]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay with animation */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out",
          isAnimating ? "opacity-50" : "opacity-0"
        )}
      />

      {/* Modal with animation */}
      <div
        ref={modalRef}
        className={cn(
          "fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-[8px]",
          "w-[95%] md:w-[50%] p-[20px] max-h-[90vh] overflow-y-auto",
          "shadow-[0px_0px_10px_0px_rgba(0,0,0,0.75)] bg-[#242424]",
          "z-50 transition-all duration-300 ease-in-out",
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
      >
        <div className="absolute w-full top-0 left-0 py-2 mb-4">
          <div className="relative">
            <div className="flex-1 text-center font-bold pr-[20px] text-lg">
              {title || <>&nbsp;</>}
            </div>
            <div className="cursor-pointer absolute top-0 right-2 p-1 rounded-full hover:bg-[#545C8F] transition-colors">
              <div onClick={() => setShowModal(false)}>
                <MdOutlineClose className="text-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </>
  );
}
