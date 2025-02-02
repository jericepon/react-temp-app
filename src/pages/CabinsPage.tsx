import CabinForm from "@/components/cabin/CabinForm";
import CabinTable from "@/components/cabin/CabinTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const CabinsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState<any>(null);
  const handleOnCancel = async () => {
    setModalOpen(false);
    setCabinToEdit(null);
  };
  const handleOnToggleEdit = (cabin: any) => {
    setModalOpen(true);
    setCabinToEdit(cabin);
  };
  return (
    <>
      <DashboardHeader title="All Cabins">
        <Button onClick={() => setModalOpen(true)}>
          <Plus />
        </Button>
      </DashboardHeader>
      <CabinTable onToggleEdit={handleOnToggleEdit} />
      <CabinForm onSuccess={handleOnCancel} onCancel={handleOnCancel} open={modalOpen} cabin={cabinToEdit} />
    </>
  );
};

export default CabinsPage;
