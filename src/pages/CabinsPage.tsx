import { createEditCabin, getCabins, removeCabinImage } from "@/api/cabins";
import CabinForm from "@/components/cabin/CabinForm";
import CabinTable from "@/components/cabin/CabinTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/shadcn/button";
import { useCreateCabin } from "@/hooks/use-create-cabin";
import { useDeleteCabin } from "@/hooks/use-delete-cabin";
import { useToast } from "@/hooks/use-toast";
import { Cabin } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const CabinsPage = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState<any>(null);
  const { createCabin, isSuccess, isError, error } = useCreateCabin();
  const { deleteCabin, isSuccessDeleting, isErrorDeleting, errorDeleting } = useDeleteCabin();
  const queryClient = useQueryClient();

  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const handleOnCancel = async () => {
    setModalOpen(false);
    setCabinToEdit(null);
  };

  const handleOnToggleEdit = (cabin: any) => {
    setModalOpen(true);
    setCabinToEdit(cabin);
  };

  const confirmDeletion = (cabin: Cabin) => {
    if (cabin.image) {
      removeCabinImage(cabin.image).then(() => {
        deleteCabin(cabin);
      });
    } else {
      deleteCabin(cabin);
    }
  };

  const handleOnDuplicateCabin = (cabin: Cabin) => {
    const { name, maxCapacity, regularPrice, discount, image, description } = cabin;
    createCabin({
      name: "Copy of " + name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  useEffect(() => {
    (isError || isErrorDeleting) &&
      toast({
        title: "⚠️ Error",
        description: error?.message || errorDeleting?.message,
        variant: "destructive",
      });
  }, [isError, isErrorDeleting]);

  useEffect(() => {
    if (isSuccess || isSuccessDeleting) {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({
        title: "🎉 Success",
        description: [
          "Cabin",
          isSuccess ? "created" : "",
          isSuccessDeleting ? "deleted" : "",
          "successfully",
        ].join(" "),
        variant: "success",
      });
    }
  }, [isSuccess || isSuccessDeleting]);

  return (
    <>
      <DashboardHeader title="All Cabins">
        <Button onClick={() => setModalOpen(true)}>
          <Plus />
        </Button>
      </DashboardHeader>
      <CabinTable isLoading={isLoading} rows={cabins || []}>
        {cabins &&
          cabins.map((cabin) => (
            <CabinTable.Row
              key={cabin.id}
              cabin={cabin}
              onToggleEdit={() => handleOnToggleEdit(cabin)}
              onDuplicateCabin={() => handleOnDuplicateCabin(cabin)}
              onDelete={() => confirmDeletion(cabin)}
            />
          ))}
      </CabinTable>
      <CabinForm
        onSuccess={handleOnCancel}
        onCancel={handleOnCancel}
        open={modalOpen}
        cabin={cabinToEdit}
      />
    </>
  );
};

export default CabinsPage;
