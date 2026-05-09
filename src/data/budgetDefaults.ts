export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  estimated: number;
  actual: number;
  paid: boolean;
  notes: string;
}

export const budgetCategories = [
  'Venue',
  'Catering',
  'Photography',
  'Videography',
  'Flowers & Décor',
  'Attire',
  'Music / DJ',
  'Transportation',
  'Invitations & Stationery',
  'Wedding Rings',
  'Gifts & Favors',
  'Miscellaneous',
] as const;

export const defaultBudgetItems: BudgetItem[] = [
  { id: 'b1', category: 'Venue', name: 'Venue rental', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b2', category: 'Catering', name: 'Banquet dinner', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b3', category: 'Photography', name: 'Photographer', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b4', category: 'Videography', name: 'Videographer', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b5', category: 'Flowers & Décor', name: 'Floral arrangements', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b6', category: 'Attire', name: 'Wedding dress', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b7', category: 'Attire', name: 'Groom suit', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b8', category: 'Music / DJ', name: 'DJ / Music', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b9', category: 'Transportation', name: 'Guest transportation', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b10', category: 'Invitations & Stationery', name: 'Invitations printing', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b11', category: 'Wedding Rings', name: 'Wedding bands', estimated: 0, actual: 0, paid: false, notes: '' },
  { id: 'b12', category: 'Gifts & Favors', name: 'Guest favors', estimated: 0, actual: 0, paid: false, notes: '' },
];
