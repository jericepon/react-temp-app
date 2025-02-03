import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/shadcn/form";
import { useSettings } from "@/hooks/use-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SettingsPage = () => {
  const { settings, isLoading, error } = useSettings();

  const formSchema = z.object({
    minBookingLength: z.number().min(1).max(365),
    maxBookingLength: z.number().min(1).max(365),
    maxGuestsBooking: z.number().min(1).max(20),
    breakfastPrice: z.number().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minBookingLength: settings?.minBookingLength,
      maxBookingLength: settings?.maxBookingLength,
      maxGuestsBooking: settings?.maxGuestsBooking,
      breakfastPrice: settings?.breakfastPrice,
    },
  });

  const handleOnSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="flex grow flex-wrap gap-4 overflow-y-auto no-scrollbar">
        <DashboardCard>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
              <FormInput
                type={"number"}
                label="Min Booking Length"
                name="minBookingLength"
                placeholder="🕜"
                form={form}
              />
              <FormInput
                type={"number"}
                label="Max Booking Length"
                name="minBookingLength"
                placeholder="🕜"
                form={form}
              />
              <FormInput
                type={"number"}
                label="Max Guests Booking"
                name="maxGuestsBooking"
                placeholder="👥"
                form={form}
              />
              <FormInput
                type={"number"}
                label="Break Fast Price"
                name="breakfastPrice"
                placeholder="💵"
                form={form}
              />
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <a className="btn btn-outline">Cancel</a>
                {/* <Button type="submit" disabled={isPending}>
                Submit
              </Button> */}
              </div>
            </form>
          </Form>
        </DashboardCard>
      </div>
    </>
  );
};

export default SettingsPage;
