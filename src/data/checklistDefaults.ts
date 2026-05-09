export interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  dueDate: string;
  status: 'notStarted' | 'inProgress' | 'done';
  assignee: string;
}

export const checklistCategories = [
  'Venue & Catering',
  'Attire & Beauty',
  'Photography & Video',
  'Flowers & Décor',
  'Music & Entertainment',
  'Stationery',
  'Logistics',
  'Ceremony',
  'Final Week',
] as const;

export const defaultChecklistItems: ChecklistItem[] = [
  // Venue & Catering
  { id: 'c1', task: 'Confirm venue booking', category: 'Venue & Catering', dueDate: '2026-05-01', status: 'notStarted', assignee: '' },
  { id: 'c2', task: 'Finalize catering menu', category: 'Venue & Catering', dueDate: '2026-08-01', status: 'notStarted', assignee: '' },
  { id: 'c3', task: 'Arrange cake / desserts', category: 'Venue & Catering', dueDate: '2026-09-01', status: 'notStarted', assignee: '' },

  // Attire & Beauty
  { id: 'c4', task: 'Choose wedding dress', category: 'Attire & Beauty', dueDate: '2026-06-01', status: 'notStarted', assignee: '' },
  { id: 'c5', task: 'Choose groom attire', category: 'Attire & Beauty', dueDate: '2026-07-01', status: 'notStarted', assignee: '' },
  { id: 'c6', task: 'Book makeup artist', category: 'Attire & Beauty', dueDate: '2026-07-01', status: 'notStarted', assignee: '' },
  { id: 'c7', task: 'Final dress fitting', category: 'Attire & Beauty', dueDate: '2026-10-15', status: 'notStarted', assignee: '' },

  // Photography & Video
  { id: 'c8', task: 'Book photographer', category: 'Photography & Video', dueDate: '2026-05-01', status: 'notStarted', assignee: '' },
  { id: 'c9', task: 'Book videographer', category: 'Photography & Video', dueDate: '2026-05-01', status: 'notStarted', assignee: '' },
  { id: 'c10', task: 'Plan photo locations', category: 'Photography & Video', dueDate: '2026-09-01', status: 'notStarted', assignee: '' },

  // Flowers & Décor
  { id: 'c11', task: 'Choose florist & bouquet style', category: 'Flowers & Décor', dueDate: '2026-07-01', status: 'notStarted', assignee: '' },
  { id: 'c12', task: 'Plan table centerpieces', category: 'Flowers & Décor', dueDate: '2026-08-01', status: 'notStarted', assignee: '' },

  // Music & Entertainment
  { id: 'c13', task: 'Book DJ or band', category: 'Music & Entertainment', dueDate: '2026-06-01', status: 'notStarted', assignee: '' },
  { id: 'c14', task: 'Create playlist / song requests', category: 'Music & Entertainment', dueDate: '2026-10-01', status: 'notStarted', assignee: '' },

  // Stationery
  { id: 'c15', task: 'Design invitations', category: 'Stationery', dueDate: '2026-06-01', status: 'notStarted', assignee: '' },
  { id: 'c16', task: 'Send invitations', category: 'Stationery', dueDate: '2026-07-01', status: 'notStarted', assignee: '' },
  { id: 'c17', task: 'Create seating chart', category: 'Stationery', dueDate: '2026-10-15', status: 'notStarted', assignee: '' },

  // Logistics
  { id: 'c18', task: 'Arrange guest hotel rooms', category: 'Logistics', dueDate: '2026-08-01', status: 'notStarted', assignee: '' },
  { id: 'c19', task: 'Organize group transportation', category: 'Logistics', dueDate: '2026-09-01', status: 'notStarted', assignee: '' },
  { id: 'c20', task: 'Purchase wedding rings', category: 'Logistics', dueDate: '2026-09-01', status: 'notStarted', assignee: '' },

  // Ceremony
  { id: 'c21', task: 'Write vows', category: 'Ceremony', dueDate: '2026-10-15', status: 'notStarted', assignee: '' },
  { id: 'c22', task: 'Plan ceremony program', category: 'Ceremony', dueDate: '2026-10-01', status: 'notStarted', assignee: '' },

  // Final Week
  { id: 'c23', task: 'Confirm all vendor bookings', category: 'Final Week', dueDate: '2026-10-25', status: 'notStarted', assignee: '' },
  { id: 'c24', task: 'Final guest count to caterer', category: 'Final Week', dueDate: '2026-10-25', status: 'notStarted', assignee: '' },
  { id: 'c25', task: 'Rehearsal dinner', category: 'Final Week', dueDate: '2026-10-31', status: 'notStarted', assignee: '' },
  { id: 'c26', task: 'Pack for honeymoon', category: 'Final Week', dueDate: '2026-10-30', status: 'notStarted', assignee: '' },

  // Additional items
  { id: 'c27', task: '選Photo Booth', category: 'Photography & Video', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c28', task: '買一次性膠片機', category: 'Photography & Video', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c29', task: '選花', category: 'Flowers & Décor', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c30', task: '選甜品', category: 'Venue & Catering', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c31', task: '檸檬茶在草坪婚禮', category: 'Venue & Catering', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c32', task: '和文兄說打麻將', category: 'Music & Entertainment', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c33', task: '選清吧地址', category: 'Venue & Catering', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c34', task: '草坪婚禮活動', category: 'Ceremony', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c35', task: '喜糖選擇', category: 'Logistics', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'c36', task: '喜糖包裝', category: 'Logistics', dueDate: '', status: 'notStarted', assignee: '' },
];
