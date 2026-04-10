import { createContext, useContext, ReactNode } from "react";
import { variantRegistry, VariantId, VariantConfig } from "@/variants/registry";

interface VariantContextType {
  variantId: VariantId;
  config: VariantConfig;
}

const VariantContext = createContext<VariantContextType | null>(null);

interface VariantProviderProps {
  variantId: VariantId;
  children: ReactNode;
}

export const VariantProvider = ({ variantId, children }: VariantProviderProps) => {
  const config = variantRegistry[variantId];
  return (
    <VariantContext.Provider value={{ variantId, config }}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const ctx = useContext(VariantContext);
  if (!ctx) throw new Error("useVariant must be used within VariantProvider");
  return ctx;
};
