import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  return (
    <>
      <Skeleton className="h-1/2 rounded-2xl shadow-md" />
      <Skeleton className="h-1/2 rounded-2xl shadow-md" />
    </>
  );
};

export default HomePage;
