'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { SlidersHorizontal, X } from 'lucide-react';

interface ComparisonButtonProps {
  language?: 'nl' | 'en';
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({ language = 'nl' }) => {
  const { selectedPropertyIds, openComparison, clearComparison } = useComparison();
  
  // Don't render if no properties are selected
  if (selectedPropertyIds.length === 0) return null;
  
  // Translations
  const translations = {
    nl: {
      compare: 'Vergelijk',
      properties: 'woningen',
      clear: 'Wissen',
    },
    en: {
      compare: 'Compare',
      properties: 'properties',
      clear: 'Clear',
    }
  };
  
  const t = translations[language];
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-white rounded-full shadow-lg p-1 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearComparison}
          className="rounded-full"
        >
          <X className="h-4 w-4 mr-1" />
          {t.clear}
        </Button>
        
        <Button 
          variant="cta" 
          onClick={openComparison}
          className="rounded-full shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {t.compare} ({selectedPropertyIds.length} {t.properties})
        </Button>
      </div>
    </div>
  );
};

export default ComparisonButton;

