import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Textarea } from "./shadcn/textarea";
type PropType = {
  type: "text" | "number" | "textarea";
  label: string;
  name: string;
  form: any;
  placeholder?: string;
};
const FormInput = (props: PropType) => {
  const { type, form, label, name, placeholder } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {type === "text" ? (
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
          ) : (
            ""
          )}
          {type === "number" ? (
            <FormControl>
              <Input type="number" placeholder={placeholder} {...field} />
            </FormControl>
          ) : (
            ""
          )}
          {type === "textarea" ? (
            <FormControl>
              <Textarea placeholder={placeholder} {...field} />
            </FormControl>
          ) : (
            ""
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
