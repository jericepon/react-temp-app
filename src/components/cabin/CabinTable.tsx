import { deleteCabin, getCabins, removeCabinImage } from "@/api/cabins";
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
import { Check, Edit, TagIcon, Tent, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCard from "../dashboard/DashboardCard";
import { Button } from "../shadcn/button";
import { Cabin } from "@/types";

const CabinTable = ({ onToggleEdit }: { onToggleEdit: (cabin: Cabin) => void }) => {
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
                <CabinTable.Row key={cabin.id} cabin={cabin} onToggleEdit={onToggleEdit} />
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

CabinTable.Row = ({ cabin, onToggleEdit }: { cabin: Cabin, onToggleEdit?: (cabin: Cabin) => void }) => {
  const { toast } = useToast();
  const [deleteConfirmation, setConfirmation] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number>(5);
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteCabin"],
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
  const handleDelete = () => {
    setConfirmation(true);
  };
  const confirmDeletion = (cabin: Cabin) => {
    setConfirmation(false);
    if (cabin.image)
    {
      removeCabinImage(cabin.image).then(() => {
        mutate(cabin);
      });
    } else
    {
      mutate(cabin);
    }
  };
  useEffect(() => {
    if (deleteConfirmation)
    {
      const countdown = setInterval(() => {
        setCountdownValue((prev) => {
          if (prev === 1)
          {
            clearInterval(countdown);
            setConfirmation(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [deleteConfirmation]);
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
        <div className="text-green-600 font-bold flex items-center">
          {cabin.discount && formatCurrency(cabin.discount)}
          {cabin.discount && <TagIcon className="inlinesi w-4 ml-1" />}
        </div>
      </TableCell>
      <TableCell className="w-16">
        <div className="flex gap-4">
          <Button
            variant={deleteConfirmation ? "destructive" : "outline"}
            size="sm"
            className="uppercase hover:bg-destructive hover:text-destructive-foreground min-w-[90px]"
            onClick={() => (!deleteConfirmation ? handleDelete() : confirmDeletion(cabin))}
            disabled={isPending}
          >
            {deleteConfirmation ? <Check /> : <Trash />}
            {deleteConfirmation ? <span className="text-lg">{countdownValue}</span> : "Delete"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="uppercase hover:bg-primary hover:text-primary-foreground"
            onClick={() => onToggleEdit && onToggleEdit(cabin)}
          >
            <Edit /> Edit
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CabinTable;
