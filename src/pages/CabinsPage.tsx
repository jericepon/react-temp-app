import { supabase } from "@/api/supabase";
import CabinTable from "@/components/cabin/CabinTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

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
      <DashboardHeader title="All Cabins" />
      <CabinTable />
    </>
  );
};

export default CabinsPage;
