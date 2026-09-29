import { cn } from "@/utils/utils";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import RequiredSign from "./RequiredSign";
import { Search, X } from "lucide-react";

interface BSSelectProps extends React.ComponentProps<"select"> {
  name: string;
  label?: string;
  labelClassName?: string;
  selectTrigger?: string;
  selectItems: { value: string; label: string; disabled?: boolean }[];
  showRequiredSign?: boolean;
  selectContentClassName?: string;
  showOptionalSign?: boolean;
  onSelectChange?: () => void;
  align?: "start" | "end" | "center" | undefined;
  placeholder?: string;
  searchable?: boolean; // ← NEW
  searchPlaceholder?: string; // ← NEW
}

export default function BSSelect({
  name,
  label,
  labelClassName,
  selectItems,
  disabled = false,
  className,
  onSelectChange,
  showOptionalSign = false,
  selectContentClassName,
  showRequiredSign = false,
  align,
  placeholder,
  searchable = false,
  searchPlaceholder = "Search...",
}: BSSelectProps) {
  const { control, setValue } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return selectItems;
    const q = searchTerm.toLowerCase();
    return selectItems?.filter((item) => item.label.toLowerCase().includes(q));
  }, [selectItems, searchTerm, searchable]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const hasValue = Boolean(field.value);
        const showClear = showOptionalSign && hasValue && !disabled;

        return (
          <FormItem className="font-sans" data-field={name}>
            {label && (
              <FormLabel
                className={cn(
                  "inline-flex items-center gap-0 font-sans",
                  labelClassName
                )}
              >
                <span>{label}</span>
                {showRequiredSign && (
                  <span>
                    <RequiredSign />
                  </span>
                )}
                {showOptionalSign && (
                  <span className="text-xs text-neutral-500">(Optional)</span>
                )}
              </FormLabel>
            )}

            <div className="relative">
              <Select
                name={name}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ""
                }
                onValueChange={(value) => {
                  field.onChange(value);
                  onSelectChange?.();
                }}
                onOpenChange={(open) => {
                  // dropdown bondho hole search reset kore dao
                  if (!open) setSearchTerm("");
                }}
                disabled={disabled}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "h-10! w-full rounded-[8px]! py-3 font-sans",
                      showOptionalSign && "[&>svg]:hidden",
                      className
                    )}
                    aria-invalid={errors[name] ? true : false}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent
                  className={cn(
                    "z-9999 bg-white font-sans text-lg font-medium",
                    selectContentClassName
                  )}
                  align={align}
                >
                  {searchable && (
                    <div
                      className="sticky top-0 z-10 bg-white p-1.5"
                      // key events (ArrowDown/Up/Enter) Radix er default
                      // item-navigation e interfere na kore, tai stop kora hocche
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <div className="relative">
                        <Search
                          size={14}
                          className="absolute top-1/2 left-2 -translate-y-1/2 text-neutral-400"
                        />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder={searchPlaceholder}
                          className="w-full rounded-md border border-neutral-200 py-1.5 pr-2 pl-7 font-sans text-sm outline-none focus:border-neutral-400"
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {filteredItems?.length ? (
                    filteredItems.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-value" value="__no-data__" disabled>
                      No data
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {showClear && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue(name, "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    onSelectChange?.();
                  }}
                  className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-neutral-100 p-0.5 text-neutral-600 transition-colors"
                  aria-label={`Clear ${label ?? name}`}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              )}
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
