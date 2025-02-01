import { createCabin } from "@/api/cabins";
import CabinForm, { formSchema } from "@/components/cabin/CabinForm";
import CabinTable from "@/components/cabin/CabinTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";
import { Button } from "@/components/shadcn/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const CabinsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({
        title: "🎉 Success",
        description: "Cabin created successfully",
        variant: "success",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "⚠️ Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data as any);
  };

  const handleOnCancel = async () => {
    setOpen(false);
  };
  return (
    <>
      <DashboardHeader title="All Cabins">
        <AlertDialog open={open}>
          <Button onClick={() => setOpen(true)}>
            <Plus />
          </Button>
          <AlertDialogContent className="max-w-[800px]">
            <AlertDialogHeader>
              <AlertDialogTitle>New Cabin</AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the form below to create a new cabin.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <CabinForm onSubmit={handleOnSubmit} onCancel={handleOnCancel} isPending={isPending} />
          </AlertDialogContent>
        </AlertDialog>
      </DashboardHeader>
      <CabinTable />
    </>
  );
};

export default CabinsPage;
