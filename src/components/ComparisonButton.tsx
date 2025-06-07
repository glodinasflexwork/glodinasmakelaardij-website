'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { useComparison } from '@/context/ComparisonContext';
import PropertyComparison from '@/components/PropertyComparison';

interface ComparisonButtonProps {
  language?: 'nl' | 'en';
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({ language = 'nl' }) => {
  const { selectedPropertyIds, properties, isComparisonOpen, openComparison, closeComparison } = useComparison();

  const translations = {
    nl: {
      compare: 'Vergelijken',
      compareSelected: 'Vergelijk Geselecteerde',
      properties: 'woningen',
    },
    en: {
      compare: 'Compare',
      compareSelected: 'Compare Selected',
      properties: 'properties',
    }
  };

  const t = translations[language];

  if (selectedPropertyIds.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={openComparison}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <BarChart3 className="h-5 w-5" />
          <span className="font-medium">
            {t.compareSelected} ({selectedPropertyIds.length})
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {isComparisonOpen && (
        <PropertyComparison
          properties={properties}
          onClose={closeComparison}
          language={language}
        />
      )}
    </>
  );
};

export default ComparisonButton;

