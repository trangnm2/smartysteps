// KHONG SUA KHI DOI GAME
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDeviceDetection, DeviceType } from './useDeviceDetection';
import { useVariant } from '@/fe/context/VariantContext';
import type { AssetSet } from '@/variants/ele/theme/assets';

interface DeviceContextType {
  deviceType: DeviceType;
  assets: AssetSet;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

interface DeviceProviderProps {
  children: ReactNode;
  forcedDeviceType?: DeviceType;
}

export const DeviceProvider = ({ children, forcedDeviceType }: DeviceProviderProps) => {
  const autoDeviceType = useDeviceDetection();
  const { config } = useVariant();

  const deviceType = forcedDeviceType ?? autoDeviceType;
  const assets = config.assets.getAssets(deviceType);

  useEffect(() => {
    document.body.classList.toggle('is-mobile', deviceType === 'mobile');
  }, [deviceType]);

  return (
    <DeviceContext.Provider value={{ deviceType, assets }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};
