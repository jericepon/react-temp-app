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
import { Cabin } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, CopyIcon, Edit, TagIcon, Tent, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCard from "../dashboard/DashboardCard";
import { Button } from "../shadcn/button";
import { useCreateCabin } from "@/hooks/use-create-cabin";

type TablePropType = {
  onToggleEdit: (cabin: Cabin) => void;
};

type RowPropType = {
  cabin: Cabin;
  onToggleEdit?: (cabin: Cabin) => void;
  onDuplicateCabin?: (cabin: Cabin) => void;
};

const CabinTable = ({ onToggleEdit }: TablePropType) => {
  const { createCabin, isSuccess, isError, error } = useCreateCabin();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDuplicateCabin = (cabin: Cabin) => {
    createCabin({
      name: "Copy of " + cabin.name,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image,
      description: cabin.description,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({
        title: "🎉 Success",
        description: "Cabin created successfully",
        variant: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    isError && toast({ title: "⚠️ Error", description: error?.message, variant: "destructive" });
  }, [isError]);

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
                <CabinTable.Row
                  key={cabin.id}
                  cabin={cabin}
                  onToggleEdit={onToggleEdit}
                  onDuplicateCabin={handleDuplicateCabin}
                />
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

CabinTable.Row = ({ cabin, onToggleEdit, onDuplicateCabin }: RowPropType) => {
  const { toast } = useToast();
  const [deleteConfirmation, setConfirmation] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [countdownValue, setCountdownValue] = useState<number>(5);
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
    if (cabin.image) {
      removeCabinImage(cabin.image).then(() => {
        mutate(cabin);
      });
    } else {
      mutate(cabin);
    }
  };
  useEffect(() => {
    if (deleteConfirmation) {
      const countdown = setInterval(() => {
        setCountdownValue((prev) => {
          if (prev === 1) {
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
        <div className="flex gap-2">
          <Button
            variant={deleteConfirmation ? "success" : "outline"}
            size="icon"
            className={[
              "uppercase",
              deleteConfirmation && "hover:bg-success hover:text-success-foreground animate-pulse",
              !deleteConfirmation && "hover:bg-destructive hover:text-destructive-foreground",
            ].join(" ")}
            onClick={() => (!deleteConfirmation ? handleDelete() : confirmDeletion(cabin))}
            disabled={isPending}
          >
            {deleteConfirmation ? <Check /> : <Trash />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="uppercase hover:bg-primary hover:text-primary-foreground"
            onClick={() => onToggleEdit && onToggleEdit(cabin)}
          >
            <Edit />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="uppercase hover:bg-primary hover:text-primary-foreground"
            onClick={() => onDuplicateCabin && onDuplicateCabin(cabin)}
          >
            <CopyIcon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CabinTable;
