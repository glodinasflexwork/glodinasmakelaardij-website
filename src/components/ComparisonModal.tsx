'use client';

import React from 'react';
import { useComparison } from '@/context/ComparisonContext';
import PropertyComparison from '@/components/PropertyComparison';

interface ComparisonModalProps {
  language?: 'nl' | 'en';
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ language = 'nl' }) => {
  const { isComparisonOpen, properties, closeComparison } = useComparison();
  
  if (!isComparisonOpen || properties.length === 0) {
    return null;
  }
  
  return (
    <PropertyComparison
      properties={properties}
      onClose={closeComparison}
      language={language}
    />
  );
};

export default ComparisonModal;

