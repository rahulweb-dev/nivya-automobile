// hooks/useHeroTabs.js
'use client';
import { useState, useCallback } from 'react';

export default function useHeroTabs(initialTab = 'newCars') {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'newCars', label: 'New Cars' },
    { id: 'preOwned', label: 'Certified Pre-Owned' },
    { id: 'service', label: 'Book a Service' },
  ];

  // memoized setter to avoid unnecessary re-renders
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return { activeTab, handleTabChange, tabs };
}
