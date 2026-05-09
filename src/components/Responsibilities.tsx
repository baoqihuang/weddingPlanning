import { useLang } from '../context/LanguageContext';

export function Responsibilities() {
  const { lang } = useLang();

  const sections = [
    {
      titleEN: 'Bridesmaid Responsibilities (A–C)',
      titleZH: '伴娘分工表（A–C）',
      descEN: 'Bridesmaid A (Personal Assistant), B (Game Host), C (Items Manager)',
      descZH: '伴娘A（貼身助理）、伴娘B（遊戲主持）、伴娘C（物品主管）',
      img: '/images/bride_groom_responsibilities1.png',
    },
    {
      titleEN: 'Bridesmaid D & Shared Duties',
      titleZH: '伴娘D及共同職責',
      descEN: 'Bridesmaid D (Coordinator) + duties all bridesmaids share',
      descZH: '伴娘D（人員對接）及所有伴娘需要一起做的事',
      img: '/images/bride_groom_responsibilities2.png',
    },
    {
      titleEN: 'Groomsman Responsibilities (A–C)',
      titleZH: '伴郎分工表（A–C）',
      descEN: 'Groomsman A (Personal Assistant), B (Communications), C (Items Manager)',
      descZH: '伴郎A（貼身助理）、伴郎B（人員溝通）、伴郎C（物品主管）',
      img: '/images/bride_groom_responsibilities3.png',
    },
    {
      titleEN: 'Groomsman D & Shared Duties',
      titleZH: '伴郎D及共同職責',
      descEN: 'Groomsman D (Motorcade Manager) + duties all groomsmen share',
      descZH: '伴郎D（車隊主管）及所有伴郎需要一起做的事',
      img: '/images/bride_groom_responsibilities4.png',
    },
  ];

  const isZH = lang === 'zh-TW';

  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">{isZH ? '伴郎伴娘分工表' : 'Wedding Party Responsibilities'}</h1>
      <p style={{ textAlign: 'center', fontSize: '.9rem', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.6 }}>
        {isZH
          ? '提前整理好伴郎伴娘的分工明細，把事情落實到個人，婚禮當天井然有序！'
          : 'A clear breakdown of roles for bridesmaids and groomsmen so everything runs smoothly on the big day!'}
      </p>

      {sections.map((s, i) => (
        <div className="card" key={i} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '.5rem' }}>{isZH ? s.titleZH : s.titleEN}</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
            {isZH ? s.descZH : s.descEN}
          </p>
          <img
            src={s.img}
            alt={isZH ? s.titleZH : s.titleEN}
            style={{ width: '100%', maxWidth: '480px', borderRadius: '12px', display: 'block', margin: '0 auto' }}
          />
        </div>
      ))}
    </div>
  );
}
