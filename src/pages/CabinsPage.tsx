import { supabase } from "@/api/supabase";
import CabinTable from "@/components/cabin/CabinTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/shadcn/button";
import { Plus } from "lucide-react";

const CabinsPage = () => {
  supabase
    .from("cabins")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
    });
  return (
    <>
      <DashboardHeader title="All Cabins">
        <Button>
          <Plus />
        </Button>
      </DashboardHeader>
      <CabinTable />
    </>
  );
};

export default CabinsPage;
