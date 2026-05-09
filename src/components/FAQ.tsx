import { useLang } from '../context/LanguageContext';
import { DogDivider } from './DogMascots';

export function FAQ() {
  const { lang } = useLang();

  const faqs = lang === 'en' ? [
    { q: 'What should I wear?', a: 'We kindly ask guests to dress in earth tones — earthy brown, pale gold, khaki, or sand. Formal attire please. Avoid all-white or all-black outfits.' },
    { q: 'Can I bring my kids?', a: 'Of course! Children are welcome. Please include them in your RSVP so we can prepare accordingly.' },
    { q: 'Is there parking at the venue?', a: 'Yes, the Shicheng Forest Hot Spring Resort has free parking for hotel guests.' },
    { q: 'Will there be vegetarian options?', a: "Yes! Please note any dietary restrictions in your RSVP and we'll make sure you're taken care of." },
    { q: 'Can I take photos during the ceremony?', a: "We'd love for you to be present in the moment! We have a professional photographer. Feel free to take photos during the reception." },
    { q: 'What about gifts?', a: "Your presence is the greatest gift of all. If you'd like to give a gift, a red envelope (紅包) is the traditional Chinese custom." },
    { q: 'Where should I stay?', a: "We recommend staying at the wedding venue — Shicheng Forest Hot Spring Resort. It's also a hot spring resort, so you can relax after the celebration!" },
    { q: 'Do I need a visa to enter China?', a: 'US passport holders need a Chinese tourist visa (L visa). Apply 4-6 weeks in advance. Hong Kong is visa-free for US citizens. See our Travel Guide for details.' },
  ] : [
    { q: '我應該穿什麼？', a: '我們請賓客穿著大地色系——大地色、淺黃、卡其或沙色。請穿著正式服裝。避免全白或全黑裝束。' },
    { q: '可以帶小孩嗎？', a: '當然可以！歡迎帶小朋友一起來。請在回覆出席時註明，以便我們做好安排。' },
    { q: '場地有停車位嗎？', a: '有的，石城森林溫泉度假酒店為住店客人提供免費停車。' },
    { q: '有素食選項嗎？', a: '有的！請在回覆出席時註明飲食需求，我們會為您特別準備。' },
    { q: '儀式中可以拍照嗎？', a: '我們希望您在儀式中能專注於當下！我們有專業攝影師。宴會期間歡迎自由拍照。' },
    { q: '關於禮物？', a: '您的出席就是最好的禮物。如果您想送禮，紅包是中國傳統習俗。' },
    { q: '我應該住哪裡？', a: '推薦入住婚禮場地——石城森林溫泉度假酒店。它同時也是溫泉度假村，慶祝後可以好好放鬆！' },
    { q: '進入中國需要簽證嗎？', a: '美國護照持有人需要中國旅遊簽證（L簽）。請提前4-6週申請。香港對美國公民免簽。詳情請參閱交通指南。' },
  ];

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">{lang === 'en' ? 'FAQ' : '常見問題'}</h1>
      <DogDivider />
      {faqs.map((faq, i) => (
        <div key={i} className="card" style={{ marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
            💬 {faq.q}
          </h3>
          <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
            {faq.a}
          </p>
        </div>
      ))}
    </div>
  );
}

