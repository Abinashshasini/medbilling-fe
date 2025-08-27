import { TypographyH2, TypographyP } from '@/components/ui/typography';
import React from 'react';
import SuplierTable from './components/SuplierTable';
import MedicineType from './components/MedicineType';

const Settings = () => {
  return (
    <main className="peer-[.header-fixed]/header:mt-16 px-4 py-6">
      <div>
        <TypographyH2 text="Settings" />
        <div className="border-b-gray-300 border-b pb-3">
          <TypographyP
            text="Manage your account settings and set preferences."
            className="font-medium mt-1"
          />
        </div>
      </div>
      <SuplierTable />
      <MedicineType />
    </main>
  );
};

export default Settings;
