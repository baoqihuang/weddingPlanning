export interface RouteProps {
  tripUnlocked: boolean;
  onUnlockTrip: () => void;
  showTripModal: boolean;
  onTripModalSuccess: (role: 'groomBride' | 'groomsmenBridesmaid') => void;
  onTripModalCancel: () => void;
}
