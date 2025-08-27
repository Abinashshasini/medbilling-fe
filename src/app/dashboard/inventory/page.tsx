'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import MedicineStockTable from './components/MedicineStockTable';
import AddMedicine from './components/AddMedicine';

const Inventory = () => {
  const [showAddMedicineModal, setShowAddMedicineModal] =
    useState<boolean>(false);

  return (
    <main className="peer-[.header-fixed]/header:mt-16 px-4 py-6">
      <div>
        <TypographyH2 text="Inventory" />
        <div className="flex justify-between items-center">
          <TypographyP
            text="This is the inventory page where you can manage your medicines."
            className="font-medium"
          />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="font-semibold"
              onClick={() => setShowAddMedicineModal(true)}
            >
              <MdOutlineFileDownload />
              Import
            </Button>
            <Button
              className="font-semibold"
              onClick={() => setShowAddMedicineModal(true)}
            >
              <IoMdAdd />
              Add New
            </Button>
          </div>
        </div>

        {/* Medicine Stock table */}
        <AddMedicine
          open={showAddMedicineModal}
          onClose={setShowAddMedicineModal}
        />
        <MedicineStockTable />
      </div>
    </main>
  );
};

export default Inventory;
