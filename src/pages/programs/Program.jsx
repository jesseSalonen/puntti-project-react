import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Program() {
  const { id } = useParams();
  const { t } = useTranslation(['common', 'programs']);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{t('programs:programDetails')}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">{t('programs:program')} ID: {id}</h2>
        {/* Program details content will be added here */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('programs:programContentPlaceholder')}
        </p>
      </div>
    </div>
  );
}

export default Program;
