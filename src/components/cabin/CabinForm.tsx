import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../FormInput";
import { Button } from "../shadcn/button";
import { Form } from "../shadcn/form";

export const formSchema = z.object({
  name: z.string().min(5).max(50),
  maxCapacity: z.string().min(1),
  regularPrice: z.string().min(1),
  discount: z.string().optional(),
  description: z.string().max(250).optional(),
  image: z.string().optional(),
});

type PropType = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  isPending?: boolean;
};

const CabinForm: FC<PropType> = ({ onSubmit, onCancel, isPending }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      maxCapacity: undefined,
      regularPrice: undefined,
      discount: undefined,
      description: "",
      image: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <FormInput type={"text"} label="Image" name="image" placeholder="🖼️" form={form} />
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CabinForm;
