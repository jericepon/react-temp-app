import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/shadcn/button";
import { Form } from "@/components/shadcn/form";
import { useEditSettings } from "@/hooks/use-edit-settings";
import { useSettings } from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SettingsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isPending, isSuccess, editSettings, isError, error: editError } = useEditSettings();
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
      minBookingLength: settings?.length && settings[0]?.minBookingLength,
      maxBookingLength: settings?.length && settings[0].maxBookingLength,
      maxGuestsBooking: settings?.length && settings[0].maxGuestsBooking,
      breakfastPrice: settings?.length && settings[0].breakfastPrice,
    },
  });

  const handleOnSubmit = (data: any) => {
    editSettings(data);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "🎉 Success",
        description: "Settings updated successfully",
        variant: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    isError &&
      toast({ title: "⚠️ Error", description: editError?.message, variant: "destructive" });
  }, [isError]);
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="flex grow flex-wrap gap-4 overflow-y-auto no-scrollbar relative">
        <DashboardCard>
          {!isLoading && (
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
                  name="maxBookingLength"
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
                  <Button type="submit" disabled={isPending}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
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
    </>
  );
};

export default SettingsPage;
