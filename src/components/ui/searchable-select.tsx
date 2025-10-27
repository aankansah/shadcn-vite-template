"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  error?: boolean;
}

export function SearchableSelect({
  options,
  selectedValue,
  onValueChange,
  loading = false,
  placeholder = "Select option",
  className,
  showAllOption = false,
  allOptionLabel = "All Options",
  disabled = false,
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  error = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Get selected option label
  const selectedOptionLabel = options.find(
    (option) => option.value === selectedValue
  )?.label;

  const handleSelect = (value: string) => {
    onValueChange(value);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            error && "border-red-500",
            className
          )}
          disabled={loading || disabled}
        >
          {selectedValue === "all" && showAllOption ? (
            allOptionLabel
          ) : selectedOptionLabel ? (
            <span className="truncate">{selectedOptionLabel}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? "Loading options..." : emptyMessage}
            </CommandEmpty>
            <CommandGroup>
              {showAllOption && (
                <CommandItem
                  value="all"
                  onSelect={() => handleSelect("all")}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === "all" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {allOptionLabel}
                </CommandItem>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}