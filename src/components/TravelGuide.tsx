import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { TravelEN } from './travel/TravelEN';
import { TravelZH } from './travel/TravelZH';

export function TravelGuide() {
  const { lang } = useLang();
  const { isGroomBride, setAccessTier } = useAccess();
  const [showTripModal, setShowTripModal] = useState(false);

  const props = {
    tripUnlocked: isGroomBride,
    onUnlockTrip: () => { if (!isGroomBride) setShowTripModal(true); },
    showTripModal,
    onTripModalSuccess: (r: 'groomBride' | 'groomsmenBridesmaid') => { setAccessTier(r); setShowTripModal(false); },
    onTripModalCancel: () => setShowTripModal(false),
  };

  return lang === 'zh-TW' ? <TravelZH {...props} /> : <TravelEN {...props} />;
}

