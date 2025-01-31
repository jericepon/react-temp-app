import { deleteCabin, getCabins } from "@/api/cabins";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tent, Trash } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";
import { Button } from "../shadcn/button";

type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  created_at: string;
};

const CabinTable = () => {
  const {
    isLoading,
    data: cabins,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return (
    <div className="w-full grow">
      <DashboardCard
        className={["relative min-h-[400px]", isLoading && "overflow-hidden"].join(" ")}
      >
        {!isLoading && cabins && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Cabin</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {cabins.map((cabin) => (
                <CabinTable.Row key={cabin.id} cabin={cabin} />
              ))}
            </TableBody>
          </Table>
        )}
        {isLoading && (
          <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-background bg-opacity-70">
            <div className="size-20 animate-ping bg-primary fixed rounded-full"></div>
            <div className="size-16 animate-ping delay-150 bg-yellow-400 fixed rounded-full"></div>
            <div className="size-14 animate-ping delay-200 bg-yellow-400 fixed rounded-full"></div>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

CabinTable.Row = ({ cabin }: { cabin: Cabin }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteCabin", cabin.id],
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast({
        title: "Success 🎉",
        description: "Cabin deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error ⚠️",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <TableRow>
      <TableCell className="w-[200px]">
        <div className="overflow-hidden rounded-xl max-w-32 h-20">
          {cabin.image ? (
            <img src={cabin.image} alt={cabin.name} className="max-w-32" />
          ) : (
            <div className="max-w-32 h-20 text-foreground bg-muted flex items-center justify-center">
              <Tent />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{cabin.name}</TableCell>
      <TableCell>Up to {cabin.maxCapacity} guests</TableCell>
      <TableCell>{formatCurrency(cabin.regularPrice)}</TableCell>
      <TableCell>
        <span className="text-green-600 font-bold">{formatCurrency(cabin.discount)}</span>
      </TableCell>
      <TableCell className="w-16">
        <Button
          size="sm"
          className="uppercase"
          onClick={() => mutate(cabin.id)}
          disabled={isPending}
        >
          <Trash /> Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CabinTable;
