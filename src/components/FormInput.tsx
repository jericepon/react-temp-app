import { Button } from "./shadcn/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Textarea } from "./shadcn/textarea";
type PropType = {
  type: "text" | "hidden" | "number" | "textarea" | "file";
  label: string;
  name: string;
  form: any;
  placeholder?: string;
  onFile?: (file: any) => void;
};
const FormInput = (props: PropType) => {
  const { type, form, label, name, placeholder, onFile } = props;
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
          {type === "hidden" ? (
            <FormControl>
              <Input type="hidden" placeholder={placeholder} {...field} />
            </FormControl>
          ) : (
            ""
          )}
          {type === "number" ? (
            <FormControl>
              <Input
                type="number"
                placeholder={placeholder}
                {...field}
                {...form.register(field.name, { valueAsNumber: true })}
              />
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
          {type === "file" ? (
            <FormControl>
              <div className="flex">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder={placeholder}
                  {...field}
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue(name, e.target.files[0]);
                      onFile && onFile(e.target.files[0]);
                    }

                    field.onChange(e);
                  }}
                />
                {field.value && (
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="rounded-l-none"
                    onClick={(e) => {
                      form.setValue(name, "");
                      field.onChange(e);
                    }}
                  >
                    CLEAR
                  </Button>
                )}
              </div>
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
