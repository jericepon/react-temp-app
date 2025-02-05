import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { formatCurrency } from "@/lib/helper";
import { Cabin } from "@/types";
import { Check, CopyIcon, Edit, TagIcon, Tent, Trash } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import DashboardCard from "../dashboard/DashboardCard";
import { Button } from "../shadcn/button";

type TableConfigType = {
  label?: string;
};
type TablePropType = {
  children?: ReactNode;
  isLoading?: boolean;
  config?: TableConfigType[];
  render?: (cabin: Cabin) => ReactNode;
};
type RowPropType = {
  row?: Cabin;
  onToggleEdit?: () => void;
  onDuplicateCabin?: () => void;
  onDelete?: () => void;
};

const CabinTable = ({ children, isLoading, config }: TablePropType) => {
  return (
    <DashboardCard className={["relative min-h-[400px]", isLoading && "overflow-hidden"].join(" ")}>
      {!isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              {config?.map((item, index) => (
                <TableHead key={index}>{item.label}</TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
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
  );
};

CabinTable.Row = ({ row, onToggleEdit, onDuplicateCabin, onDelete }: RowPropType) => {
  const [deleteConfirmation, setConfirmation] = useState<boolean>(false);
  const [countdownValue, setCountdownValue] = useState<number>(5);

  const handleDelete = () => {
    setConfirmation(true);
  };
  const confirmDeletion = () => {
    setConfirmation(false);
    onDelete?.();
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
    row && (
      <TableRow>
        <TableCell className="w-[200px]">
          <div className="overflow-hidden rounded-xl max-w-32 h-20">
            {row.image ? (
              <img src={row.image} alt={row.name} className="max-w-32" />
            ) : (
              <div className="max-w-32 h-20 text-foreground bg-muted flex items-center justify-center">
                <Tent />
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>Up to {row.maxCapacity} guests</TableCell>
        <TableCell>{formatCurrency(row.regularPrice)}</TableCell>
        <TableCell>
          <div className="text-green-600 font-bold flex items-center">
            {row.discount && formatCurrency(row.discount)}
            {row.discount && <TagIcon className="inlinesi w-4 ml-1" />}
          </div>
        </TableCell>
        <TableCell className="w-16">
          <div className="flex gap-2">
            <Button
              variant={deleteConfirmation ? "success" : "outline"}
              size="icon"
              className={[
                "uppercase",
                deleteConfirmation &&
                  "hover:bg-success hover:text-success-foreground animate-pulse",
                !deleteConfirmation && "hover:bg-destructive hover:text-destructive-foreground",
              ].join(" ")}
              onClick={() => (!deleteConfirmation ? handleDelete() : confirmDeletion())}
            >
              {deleteConfirmation ? <Check /> : <Trash />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="uppercase hover:bg-primary hover:text-primary-foreground"
              onClick={() => onToggleEdit?.()}
            >
              <Edit />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="uppercase hover:bg-primary hover:text-primary-foreground"
              onClick={() => onDuplicateCabin?.()}
            >
              <CopyIcon />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    )
  );
};

export default CabinTable;
