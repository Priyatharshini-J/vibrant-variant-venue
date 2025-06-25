import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VariantOption {
  id: string;
  label: string;
  value: string;
  available: boolean;
}

interface ColorOption extends VariantOption {
  hex: string;
}

export interface VariantSelectorProps {
  label: string;
  options: VariantOption[] | ColorOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  variant: "size" | "color";
}

const VariantSelector = ({
  label,
  options,
  selectedValue,
  onChange,
  variant,
}: VariantSelectorProps) => {
  const [hoverValue, setHoverValue] = useState<string | null>(null);
  const [isColor, setIsColor] = useState(false);

  // Determine if we're dealing with colors (with hex values)
  useEffect(() => {
    if (options.length > 0 && "hex" in options[0]) {
      setIsColor(true);
    }
  }, [options]);

  const renderColorOption = (option: ColorOption) => (
    <button
      key={option.id}
      type="button"
      onClick={() => option.available && onChange(option.value)}
      onMouseEnter={() => setHoverValue(option.value)}
      onMouseLeave={() => setHoverValue(null)}
      disabled={!option.available}
      className={cn(
        "relative h-10 w-10 rounded-full border-2 transition-all duration-200",
        selectedValue === option.value
          ? "border-primary ring-2 ring-background ring-offset-2 ring-offset-primary/30"
          : option.available
          ? "border-border hover:border-primary/50"
          : "border-border opacity-30 cursor-not-allowed"
      )}
      aria-label={option.label}
    >
      <span className="sr-only">{option.label}</span>
      <span
        className="absolute inset-1 rounded-full"
        style={{ backgroundColor: option.hex }}
      />
      {selectedValue === option.value && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check size={16} className="text-primary-foreground drop-shadow-md" />
        </div>
      )}
    </button>
  );

  const renderSizeOption = (option: VariantOption) => (
    <button
      key={option.id}
      type="button"
      onClick={() => option.available && onChange(option.value)}
      onMouseEnter={() => setHoverValue(option.value)}
      onMouseLeave={() => setHoverValue(null)}
      disabled={!option.available}
      className={cn(
        "min-w-[4rem] h-10 px-3 rounded-md border transition-all duration-200",
        selectedValue === option.value
          ? "border-primary bg-primary text-primary-foreground"
          : option.available
          ? "border-border hover:border-primary/30 hover:bg-primary/5"
          : "border-border bg-muted text-muted-foreground/50 cursor-not-allowed"
      )}
    >
      {option.label}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        {hoverValue && (
          <span className="text-sm text-muted-foreground animate-fade-in">
            {options.find((o) => o.value === hoverValue)?.label}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {isColor
          ? (options as ColorOption[]).map(renderColorOption)
          : options.map(renderSizeOption)}
      </div>
    </div>
  );
};

export default VariantSelector;
