// KHONG SUA KHI DOI GAME
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VariantProvider } from "@/fe/context/VariantContext";
import type { VariantId } from "@/variants/registry";
import type { DeviceType } from "@/fe/hooks";
import Index from "./fe/pages/Index";
import NotFound from "./fe/pages/NotFound";

const VariantRoute = ({ variantId, forcedDeviceType }: { variantId: VariantId; forcedDeviceType?: DeviceType }) => (
  <VariantProvider variantId={variantId}>
    <Index forcedDeviceType={forcedDeviceType} />
  </VariantProvider>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/ele" element={<VariantRoute variantId="ele" />} />
      <Route path="/ele/mobile" element={<VariantRoute variantId="ele" forcedDeviceType="mobile" />} />
      <Route path="/ele/desktop" element={<VariantRoute variantId="ele" forcedDeviceType="desktop" />} />
      <Route path="/sec" element={<VariantRoute variantId="sec" />} />
      <Route path="/sec/mobile" element={<VariantRoute variantId="sec" forcedDeviceType="mobile" />} />
      <Route path="/sec/desktop" element={<VariantRoute variantId="sec" forcedDeviceType="desktop" />} />
      <Route path="/" element={<VariantRoute variantId="ele" />} />
      <Route path="/mobile" element={<VariantRoute variantId="ele" forcedDeviceType="mobile" />} />
      <Route path="/desktop" element={<VariantRoute variantId="ele" forcedDeviceType="desktop" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
