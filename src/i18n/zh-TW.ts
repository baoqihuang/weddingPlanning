import type { Translations } from '../context/LanguageContext';

export const zhTW: Translations = {
  // Nav
  nav: {
    overview: '概覽',
    budget: '預算',
    checklist: '待辦事項',
    rsvp: '回覆出席',
    guests: '賓客名單',
    travelGuide: '交通指南',
    schedule: '日程',
    faq: '常見問題',
    langToggle: 'EN',
  },

  // Splash
  splash: {
    enter: '進入',
    subtitle: '誠邀您出席',
  },

  // Overview
  overview: {
    title: '我們的婚禮',
    countdown: {
      title: '倒數計時',
      days: '天',
      hours: '小時',
      minutes: '分鐘',
      seconds: '秒',
    },
    venue: {
      title: '婚禮場地',
      name: '石城森林溫泉度假酒店',
      address: '江西省·贛州市·石城縣·贛江源北大道·濱江路·福湖路',
    },
    dressCode: {
      title: '著裝要求',
      description: '我們希望這一天的色彩是柔和而溫暖的——請穿上大地色系，與我們同框，正式裝束。',
      colors: ['大地色', '淺黃', '卡其', '沙色'],
    },
    date: '2026年11月1日',
    sections: '探索',
  },

  // Budget
  budget: {
    title: '預算',
    accessPrompt: '請輸入訪問碼查看預算',
    totalEstimated: '預計總額',
    totalActual: '實際總額',
    remaining: '剩餘',
    addItem: '新增項目',
    category: '類別',
    item: '項目',
    estimated: '預計金額',
    actual: '實際金額',
    paid: '已付款',
    notes: '備註',
    save: '儲存',
    cancel: '取消',
    delete: '刪除',
    edit: '編輯',
    noItems: '此類別暫無項目。',
  },

  // Checklist
  checklist: {
    title: '婚禮待辦事項',
    accessPrompt: '請輸入訪問碼查看待辦事項',
    readOnly: '（僅供查看）',
    status: {
      notStarted: '未開始',
      inProgress: '進行中',
      done: '已完成',
    },
    filterAll: '全部',
    assignee: '負責人',
    dueDate: '截止日期',
    addTask: '新增任務',
    task: '任務',
    unassigned: '— 未分配 —',
    addNote: '添加備註...',
    save: '儲存',
    cancel: '取消',
    delete: '刪除',
  },

  // RSVP
  rsvp: {
    title: '回覆出席',
    subtitle: '我們衷心期待與您一同慶祝！',
    name: '您的姓名',
    email: '電子郵件（選填）',
    attending: '您會出席嗎？',
    yes: '欣然接受',
    no: '遺憾婉拒',
    numAdults: '成人人數',
    bringingKids: '是否攜帶小孩？',
    numKids: '小孩人數',
    dietaryRestrictions: '飲食限制',
    notes: '其他備註',
    needHotel: '需要住宿安排嗎？',
    submit: '提交回覆',
    thankYou: '感謝您的回覆！',
    alreadySubmitted: '您已提交過回覆。是否要更新？',
    update: '更新回覆',
    viewResponses: '查看所有回覆',
    guestList: '賓客名單',
    totalGuests: '總賓客數',
    totalAdults: '成人總數',
    totalKids: '小孩總數',
    needingHotel: '需要住宿',
    attending_label: '出席',
    declined: '婉拒',
  },

  // Travel Guide
  travel: {
    title: '交通指南',
    subtitle: '從三藩市前往贛州石城',
    step1: {
      title: '第一步：飛行 SFO → HKG',
      flight: 'CX2873',
      date: '2026年10月24日（星期六）',
      route: '三藩市 (SFO) → 香港 (HKG)',
      time: '00:20 – 06:15+1',
      duration: '14小時55分鐘',
      class: '經濟艙 · 波音 777-300ER',
      note: '推薦航班——10月25日上午抵達香港。',
    },
    step2: {
      title: '第二步：高鐵 西九龍 → 贛州西',
      train: 'G902 復興號',
      route: '香港西九龍站 → 贛州西站',
      time: '11:35 – 13:56',
      duration: '2小時21分鐘',
      pricing: '二等座 ¥339 · 一等座 ¥542 · 商務座 ¥1,150',
      note: '高速鐵路——刷身份證進出站。',
    },
    step3: {
      title: '第三步：贛州西站 → 酒店',
      description: '從贛州西站打車或叫網約車至石城森林溫泉度假酒店（約1.5小時）。我們會在婚禮前安排團體交通。',
      hotelName: '石城森林溫泉度假酒店',
      address: '江西省贛州市石城縣贛江源北大道濱江路福湖路8號',
      rating: '4.7 · 豪華型 · 2020年開業',
    },
    activities: {
      title: '婚後旅遊推薦',
      subtitle: '延長您的旅程！從贛州出發，搭高鐵即可到達的精彩目的地',
      items: [
        {
          emoji: '🏯',
          name: '廈門',
          description: '海濱風情——鼓浪嶼、海鮮美食和殖民時期建築。從贛州搭高鐵約3.5小時。',
        },
        {
          emoji: '🌄',
          name: '桂林·陽朔',
          description: '標誌性的喀斯特山水與灕江遊船。搭火車至桂林約5小時，再騎車探索陽朔。',
        },
        {
          emoji: '🏙️',
          name: '深圳',
          description: '毗鄰香港的現代化大都市——美食、購物和科技文化。高鐵約2.5小時。',
        },
        {
          emoji: '🏔️',
          name: '張家界',
          description: '「阿凡達山」——玻璃橋、聳立的砂岩石柱和國家森林公園。經長沙轉車約4小時。',
        },
        {
          emoji: '🎎',
          name: '景德鎮',
          description: '中國瓷都——參觀古窯、體驗陶藝工作坊、探索陶瓷藝術博物館。火車約3小時。',
        },
        {
          emoji: '⛰️',
          name: '黃山',
          description: '聯合國世界遺產——以雲海日出、奇松和溫泉聞名。高鐵至黃山北站約4.5小時。',
        },
      ],
    },
  },

  // Guests
  guests: {
    title: '賓客名單',
    accessPrompt: '請輸入訪問碼管理賓客',
    addTitle: '新增賓客',
    addBtn: '新增',
    cancel: '取消',
    namePh: '賓客姓名',
    emailPh: '電子郵件（選填）',
    dietaryPh: '飲食需求',
    notesPh: '備註',
    invited: '已邀請',
    confirmed: '已確認',
    declinedStatus: '已婉拒',
    brideSide: '新娘方',
    groomSide: '新郎方',
    bothSide: '雙方',
    listTitle: '所有賓客',
    searchPh: '按姓名或郵箱搜索...',
    filterAll: '全部',
    colName: '姓名',
    colEmail: '郵箱',
    colSide: '方別',
    colStatus: '狀態',
    colRoom: '房間',
    remove: '移除',
    empty: '尚未添加賓客。在上方添加第一位賓客！',
    notFound: '沒有符合搜索條件的賓客。',
    totalLabel: '總計',
    confirmedLabel: '已確認',
    declinedLabel: '已婉拒',
    pendingLabel: '待確認',
    roomPlaceholder: '如：套房201',
  },

  // Role Select
  roleSelect: {
    welcome: '歡迎！',
    subtitle: '請選擇您的身份',
    guest: '我是賓客',
    guestHint: '回覆出席、交通資訊等',
    crew: '婚禮團隊',
    crewHint: '預算、待辦事項及籌備',
    codePlaceholder: '請輸入團隊密碼',
    codeError: '密碼不正確，請重試。',
    enter: '進入',
  },

  // Schedule
  schedule: {
    title: '婚禮日程',
    date: '2026年11月1日',
  },

  // FAQ
  faq: {
    title: '常見問題',
  },

  // Responsibilities
  responsibilities: {
    title: '伴郎伴娘分工表',
    subtitle: '提前整理好伴郎伴娘的分工明細，把事情落實到個人，婚禮當天井然有序！',
  },

  // Access Code Modal
  accessCode: {
    title: '請輸入訪問碼',
    placeholder: '訪問碼',
    submit: '確認',
    error: '訪問碼不正確，請重試。',
    cancel: '取消',
  },

  // Common
  common: {
    loading: '載入中...',
    back: '返回',
    close: '關閉',
  },
};
