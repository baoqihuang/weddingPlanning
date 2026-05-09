import { useLang } from '../context/LanguageContext';
import { PugMascot, PoodleMascot } from './DogMascots';

export function Schedule() {
  const { lang } = useLang();

  const events = lang === 'en' ? [
    { time: '10:00 AM', title: 'Guest Arrival & Welcome', desc: 'Check in at the resort, freshen up, and enjoy the hot spring facilities.', icon: '🏨' },
    { time: '12:00 PM', title: 'Wedding Ceremony', desc: 'Join us for the ceremony. Please be seated 15 minutes early.', icon: '💒' },
    { time: '12:30 PM', title: 'Family Photos', desc: 'Group photos with family and the wedding party.', icon: '📸' },
    { time: '1:00 PM', title: 'Wedding Banquet', desc: 'Traditional Chinese wedding banquet with multiple courses.', icon: '🍽️' },
    { time: '3:00 PM', title: 'Toasts & Speeches', desc: 'Heartfelt words from family and friends.', icon: '🥂' },
    { time: '4:00 PM', title: 'Free Time & Hot Springs', desc: 'Relax, enjoy the resort, and unwind in the hot springs.', icon: '♨️' },
    { time: '6:00 PM', title: 'Evening Reception', desc: 'Music, games, and celebration into the evening!', icon: '🎶' },
  ] : [
    { time: '上午 10:00', title: '賓客抵達', desc: '入住度假酒店，稍作休息，享受溫泉設施。', icon: '🏨' },
    { time: '中午 12:00', title: '婚禮儀式', desc: '請提前15分鐘就座。', icon: '💒' },
    { time: '下午 12:30', title: '家庭合照', desc: '與家人和婚禮團隊拍攝合照。', icon: '📸' },
    { time: '下午 1:00', title: '婚宴', desc: '傳統中式婚宴，多道佳餚。', icon: '🍽️' },
    { time: '下午 3:00', title: '祝酒致辭', desc: '家人和朋友的祝福致辭。', icon: '🥂' },
    { time: '下午 4:00', title: '自由活動 & 溫泉', desc: '放鬆身心，享受度假村的溫泉設施。', icon: '♨️' },
    { time: '下午 6:00', title: '晚間派對', desc: '音樂、遊戲，歡慶到夜晚！', icon: '🎶' },
  ];

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">{lang === 'en' ? 'Wedding Day Schedule' : '婚禮日程'}</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '8px', fontSize: '.95rem' }}>
        {lang === 'en' ? 'November 1, 2026' : '2026年11月1日'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
        <PugMascot size={36} />
        <PoodleMascot size={36} />
      </div>

      <div className="journey-steps" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {events.map((ev, i) => (
          <div key={i} className="step">
            <div className="step-num" style={{ fontSize: '1rem' }}>{ev.icon}</div>
            <div className="step-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <h3>{ev.title}</h3>
                <span className="meta-chip chip-time">{ev.time}</span>
              </div>
              <p>{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
