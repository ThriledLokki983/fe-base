import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook for managing focus during route changes
 * Ensures proper accessibility for screen readers and keyboard users
 */
export const useFocusManagement = () => {
  const location = useLocation();
  const skipToMainRef = useRef<HTMLElement | null>(null);
  const announcementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Find the main content element
    const mainContent =
      document.getElementById('main-content') ||
      document.querySelector('main') ||
      document.querySelector('[role="main"]');

    if (mainContent) {
      skipToMainRef.current = mainContent;

      // Make main content focusable temporarily
      const originalTabIndex = mainContent.getAttribute('tabindex');
      mainContent.setAttribute('tabindex', '-1');

      // Focus the main content
      mainContent.focus();

      // Announce route change to screen readers
      announceRouteChange(mainContent.getAttribute('aria-label') || 'Page loaded');

      // Clean up: restore original tabindex
      const cleanup = () => {
        if (originalTabIndex === null) {
          mainContent.removeAttribute('tabindex');
        } else {
          mainContent.setAttribute('tabindex', originalTabIndex);
        }
      };

      // Clean up after a short delay
      const timeoutId = setTimeout(cleanup, 100);

      return () => {
        clearTimeout(timeoutId);
        cleanup();
      };
    }
  }, [location.pathname]);

  const announceRouteChange = (message: string) => {
    // Create or update announcement element
    if (!announcementRef.current) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `;
      document.body.appendChild(announcement);
      announcementRef.current = announcement;
    }

    // Announce the change
    announcementRef.current.textContent = message;

    // Clear the announcement after it's been read
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = '';
      }
    }, 1000);
  };

  return { skipToMainRef, announceRouteChange };
};

/**
 * Component wrapper for focus management
 */
export const FocusManager = ({ children }: { children: React.ReactNode }) => {
  useFocusManagement();
  return children as React.ReactElement;
};
