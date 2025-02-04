import { uploadCabbinImage } from "@/api/cabins";
import { useCreateCabin } from "@/hooks/use-create-cabin";
import { useToast } from "@/hooks/use-toast";
import { Cabin } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../FormInput";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn/alert-dialog";
import { Button } from "../shadcn/button";
import { Form } from "../shadcn/form";
import { X } from "lucide-react";

export const formSchema = z.object({
  name: z.string().min(5).max(50),
  maxCapacity: z.number().nullable(),
  regularPrice: z.number().nullable(),
  discount: z.number().optional().nullable(),
  description: z.string().max(250).optional(),
  image: z
    .string()
    .refine(
      (filePath) => {
        const validExtensions = [".jpeg", ".jpg", ".png"];
        const isValid = validExtensions.some((ext) => filePath.endsWith(ext));
        if (!filePath) return true;
        return isValid;
      },
      { message: "Only .jpg, .jpeg, and .png formats are supported." }
    )
    .optional(),
});

type PropType = {
  onSuccess: () => void;
  onClose: () => void;
  open?: boolean;
  cabin?: Cabin;
};

const CabinForm = ({ onClose, onSuccess, open, cabin }: PropType) => {
  const queryClient = useQueryClient();
  const { isCreating, createCabin, isSuccess, isError, error } = useCreateCabin();
  const { toast } = useToast();
  const [image, setImage] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      maxCapacity: 0,
      regularPrice: 0,
      discount: 0,
      description: "",
      image: "",
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    if (image) {
      uploadCabbinImage(image).then((res) => {
        const imageurl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${
          res.fullPath
        }`;
        createCabin({
          ...data,
          ...(cabin ? { id: cabin.id } : {}),
          maxCapacity: Number(data.maxCapacity),
          regularPrice: Number(data.regularPrice),
          discount: data.discount ? Number(data.discount) : undefined,
          image: imageurl,
        } as any);
        setImage(undefined);
      });
    } else {
      createCabin({
        ...data,
        image: cabin ? cabin.image : "",
        ...(cabin ? { id: cabin.id } : {}),
        maxCapacity: Number(data.maxCapacity),
        regularPrice: Number(data.regularPrice),
        discount: data.discount ? Number(data.discount) : undefined,
      } as any);
    }
  };

  useEffect(() => {
    if (cabin) {
      for (const key in form.formState.defaultValues) {
        if (key in cabin) {
          if (key === "image" && cabin[key as keyof Cabin]) continue;
          form.setValue(key as keyof z.infer<typeof formSchema>, String(cabin[key as keyof Cabin]));
        }
      }
    }
    return () => {
      for (const key in form.formState.defaultValues) {
        form.setValue(key as keyof z.infer<typeof formSchema>, "");
      }
    };
  }, [cabin]);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setImage(undefined);
      onSuccess();
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

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-[800px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between">
              <span>{cabin ? "Edit" : "New"} Cabin</span>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X />
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the form below to create a new cabin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
              <FormInput type={"text"} label="Name" name="name" placeholder="⛺" form={form} />
              <FormInput
                type={"number"}
                label="Max Capacity"
                name="maxCapacity"
                placeholder="👥"
                form={form}
              />
              <FormInput
                type={"number"}
                label="Regular Price"
                name="regularPrice"
                placeholder="💵"
                form={form}
              />
              <FormInput
                type={"number"}
                label="Discount"
                name="discount"
                placeholder="💸"
                form={form}
              />
              <FormInput
                type={"textarea"}
                label="Description"
                name="description"
                placeholder="📝"
                form={form}
              />
              <FormInput
                type={"file"}
                label="Image"
                name="image"
                onFile={setImage}
                placeholder="🖼️"
                form={form}
              />
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <a className="btn btn-outline" onClick={onClose}>
                  Cancel
                </a>
                <Button type="submit" disabled={isCreating}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CabinForm;
