export interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  dueDate: string;
  status: 'notStarted' | 'inProgress' | 'done';
  assignee: string;
}

export const weddingPartyMembers = [
  // Bridesmaids
  'Curly Zhao',
  'Wennie He',
  'Janet Tran',
  'Le Au',
  'Weilu Pan',
  // Groomsmen
  'Carl Fung',
  'David Wong',
  'Steven Sun',
  'Dizai',
  'Longlong',
] as const;

export const bridesmaids = ['Curly Zhao', 'Wennie He', 'Janet Tran', 'Le Au', 'Weilu Pan'] as const;
export const groomsmen = ['Carl Fung', 'David Wong', 'Steven Sun', 'Dizai', 'Longlong'] as const;

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
  'Bridesmaid A (貼身助理)',
  'Bridesmaid B (遊戲主持)',
  'Bridesmaid C (物品主管)',
  'Bridesmaid D (人員對接)',
  'Bridesmaid (共同職責)',
  'Groomsman A (貼身助理)',
  'Groomsman B (人員溝通)',
  'Groomsman C (物品主管)',
  'Groomsman D (車隊主管)',
  'Groomsman (共同職責)',
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

  // ── Bridesmaid A (貼身助理) ──
  { id: 'bm-a1', task: '保管新娘的婚包', category: 'Bridesmaid A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-a2', task: '關注新娘妝容和狀態，隨時提醒不要駝背', category: 'Bridesmaid A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-a3', task: '整理新娘婚紗裙擺，提醒補妝', category: 'Bridesmaid A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-a4', task: '陪同新人迎賓，收發及保管紅包', category: 'Bridesmaid A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-a5', task: '陪同新娘敬酒，倒上酒水飲料', category: 'Bridesmaid A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Bridesmaid B (遊戲主持) ──
  { id: 'bm-b1', task: '主持堵門及接親遊戲環節', category: 'Bridesmaid B (遊戲主持)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-b2', task: '接親環節控制時間，活躍氣氛，避免冷場', category: 'Bridesmaid B (遊戲主持)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-b3', task: '保管遊戲道具和拍照道具（小喜字、小禮炮）', category: 'Bridesmaid B (遊戲主持)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-b4', task: '所有伴娘一起藏婚鞋', category: 'Bridesmaid B (遊戲主持)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-b5', task: '隨時用手機拍點婚禮當天小花絮，記錄重要時刻', category: 'Bridesmaid B (遊戲主持)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Bridesmaid C (物品主管) ──
  { id: 'bm-c1', task: '保管應急物品（急救包、對戒、誓言卡）', category: 'Bridesmaid C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-c2', task: '準備敬茶環節的茶具、托盤、跪墊', category: 'Bridesmaid C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-c3', task: '敬茶環節遞敬茶杯', category: 'Bridesmaid C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-c4', task: '在新郎抱新娘下車時為新娘撐紅傘（看習俗）', category: 'Bridesmaid C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-c5', task: '婚禮現場送戒指、誓言卡', category: 'Bridesmaid C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Bridesmaid D (人員對接) ──
  { id: 'bm-d1', task: '保管新娘手機，隨時查看是否有信息或電話', category: 'Bridesmaid D (人員對接)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-d2', task: '提醒新娘婚車的出發時間，對接伴郎B，確認婚車到位', category: 'Bridesmaid D (人員對接)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-d3', task: '提醒新娘行程時間，重要時間點多多提醒', category: 'Bridesmaid D (人員對接)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-d4', task: '跟進化妝師、攝像攝影師到位情況', category: 'Bridesmaid D (人員對接)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-d5', task: '與婚慶、主持人保持聯繫', category: 'Bridesmaid D (人員對接)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Bridesmaid (共同職責) ──
  { id: 'bm-all1', task: '儀式上新娘入場時，負責在兩邊維持秩序，攔住過往的人', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-all2', task: '退場時如需撒花瓣，花瓣花籃由伴郎C負責保管，與他對接', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-all3', task: '退場結束後，需要全場撒紅包', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-all4', task: '所有伴娘空餘時間都在婚禮現場接待賓客，指引座位等', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-all5', task: '敬酒時陪同敬酒，結束後幫助新娘收拾東西', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'bm-all6', task: '改口敬茶環節時配合新郎新娘', category: 'Bridesmaid (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Groomsman A (貼身助理) ──
  { id: 'gm-a1', task: '替新郎保管收到的禮金，並記錄是誰送的', category: 'Groomsman A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-a2', task: '保管接親紅包，準備好車隊的喜煙喜糖', category: 'Groomsman A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-a3', task: '到達女方家，見人發放喜煙喜糖', category: 'Groomsman A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-a4', task: '接親遊戲環節發放紅包，遊戲中活躍氣氛', category: 'Groomsman A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-a5', task: '陪同新郎敬酒，倒上酒水飲料', category: 'Groomsman A (貼身助理)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Groomsman B (人員溝通) ──
  { id: 'gm-b1', task: '和伴娘溝通到達時間', category: 'Groomsman B (人員溝通)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-b2', task: '提醒新郎行程時間，關注新郎髮型和妝容', category: 'Groomsman B (人員溝通)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-b3', task: '與攝影、攝像保持聯繫', category: 'Groomsman B (人員溝通)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-b4', task: '協助新郎接待賓客', category: 'Groomsman B (人員溝通)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-b5', task: '及時處理人員溝通中的突發事件', category: 'Groomsman B (人員溝通)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Groomsman C (物品主管) ──
  { id: 'gm-c1', task: '保管新郎應急包（紙巾、手機、充電器等）', category: 'Groomsman C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-c2', task: '保管拍照及接親道具', category: 'Groomsman C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-c3', task: '檢查攜帶手捧花、胸花、鑽戒、誓言卡', category: 'Groomsman C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-c4', task: '管理、攜帶、分配禮花炮', category: 'Groomsman C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-c5', task: '對接婚禮主持，婚禮現場遞捧花、遞話筒', category: 'Groomsman C (物品主管)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Groomsman D (車隊主管) ──
  { id: 'gm-d1', task: '對接車隊到達及出發時間', category: 'Groomsman D (車隊主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-d2', task: '確認婚車裝飾問題', category: 'Groomsman D (車隊主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-d3', task: '清點接迎親人員及工作人員，確保大家全部上車', category: 'Groomsman D (車隊主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-d4', task: '與車隊確認來回路線', category: 'Groomsman D (車隊主管)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-d5', task: '交代人員幫拿陪嫁物品', category: 'Groomsman D (車隊主管)', dueDate: '', status: 'notStarted', assignee: '' },

  // ── Groomsman (共同職責) ──
  { id: 'gm-all1', task: '儀式上新郎上場時，維持秩序，營造氛圍', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-all2', task: '退場時如需撒花瓣，花瓣花籃由伴郎C負責保管，與他對接', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-all3', task: '退場結束後，需要全場撒紅包', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-all4', task: '所有伴郎空餘時間都在婚禮現場接待賓客，指引座位等', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-all5', task: '敬酒時陪同敬酒，結束後幫助新郎收拾東西', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
  { id: 'gm-all6', task: '改口敬茶環節時配合新郎新娘', category: 'Groomsman (共同職責)', dueDate: '', status: 'notStarted', assignee: '' },
];
