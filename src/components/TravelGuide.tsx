import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAccess } from '../context/AccessContext';
import { AccessCodeModal } from './AccessCodeModal';

export function TravelGuide() {
  const { lang } = useLang();
  const [route, setRoute] = useState<'us' | 'hk'>('us');
  const { isGroomBride, setAccessTier } = useAccess();
  const [showTripModal, setShowTripModal] = useState(false);

  return lang === 'zh-TW'
    ? <TravelZH route={route} setRoute={setRoute} tripUnlocked={isGroomBride} onUnlockTrip={() => { if (isGroomBride) return; setShowTripModal(true); }} showTripModal={showTripModal} onTripModalSuccess={(r) => { setAccessTier(r); setShowTripModal(false); }} onTripModalCancel={() => setShowTripModal(false)} />
    : <TravelEN route={route} setRoute={setRoute} tripUnlocked={isGroomBride} onUnlockTrip={() => { if (isGroomBride) return; setShowTripModal(true); }} showTripModal={showTripModal} onTripModalSuccess={(r) => { setAccessTier(r); setShowTripModal(false); }} onTripModalCancel={() => setShowTripModal(false)} />;
}

interface RouteProps {
  route: 'us' | 'hk';
  setRoute: (r: 'us' | 'hk') => void;
  tripUnlocked: boolean;
  onUnlockTrip: () => void;
  showTripModal: boolean;
  onTripModalSuccess: (role: 'groomBride' | 'groomsmenBridesmaid') => void;
  onTripModalCancel: () => void;
}

function TravelEN({ route, setRoute, tripUnlocked, onUnlockTrip, showTripModal, onTripModalSuccess, onTripModalCancel }: RouteProps) {
  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">Travel Guide</h1>

      <div className="card">
        <h2>Getting to Jiangxi Province, China</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Our wedding is in <strong>Ganzhou, Jiangxi Province</strong> (贛州, 江西省). Below you'll find step-by-step travel guides for guests flying from the <strong>United States</strong> and guests travelling from <strong>Hong Kong</strong>.
        </p>
        <div className="route-toggle">
          <button className={`route-btn${route === 'us' ? ' active' : ''}`} onClick={() => setRoute('us')}>✈️ From the United States</button>
          <button className={`route-btn${route === 'hk' ? ' active' : ''}`} onClick={() => setRoute('hk')}>🚌 From Hong Kong</button>
        </div>

        {route === 'us' && (
          <>
            <div className="warn-box">
              <span className="tip-icon">📖</span>
              <div><strong>China Visa Required for US Citizens</strong> — US passport holders must obtain a Chinese tourist visa (L visa) before travelling to mainland China. Apply at your nearest Chinese consulate at least 4–6 weeks in advance. Hong Kong is visa-free for US citizens (90 days).</div>
            </div>
            <div className="journey-steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h3>Fly: San Francisco (SFO) → Hong Kong (HKG)</h3>
                  <p>Recommended flight: <strong>CX2873</strong> on <strong>Sat, October 24, 2026</strong>. Non-stop Cathay Pacific, Boeing 777-300ER.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">00:20 – 06:15+1 (14h 55m)</span>
                    <span className="meta-chip chip-tip">Book 3–6 months early for best fares</span>
                  </div>
                  <img src="/images/flight.png" alt="Flight info" style={{ marginTop: '12px', borderRadius: '8px', maxWidth: '100%' }} />
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h3>Arrive at Hong Kong International Airport (HKG)</h3>
                  <p>Clear Hong Kong Immigration — US citizens get <strong>90 days visa-free</strong>. Take the Airport Express (AEL) to Hong Kong Station, then walk or take the MTR to West Kowloon Station.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">AEL ~24 min</span>
                    <span className="meta-chip chip-cost">~HKD 115 (~USD 15)</span>
                    <span className="meta-chip chip-tip">Octopus card works on all HK transit</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h3>HK West Kowloon Station (香港西九龍站)</h3>
                  <p>This is the terminus for high-speed rail to mainland China. From Hong Kong Station it's a 10-min walk, or take MTR to <strong>Austin Station</strong> (exit A). Arrive <strong>45 minutes early</strong> — you clear HK departure and China entry customs here ("co-location").</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">Bring your passport + China visa</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div className="step-body">
                  <h3>High-Speed Train: HK West Kowloon → Ganzhou West (贛州西站)</h3>
                  <p>Take train <strong>G902 Fuxing Express</strong>. Book on <strong>Trip.com</strong> (English) or the official <strong>12306</strong> app; your passport number is required.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">Departs 11:35 → Arrives 13:56 (2h 21min)</span>
                  </div>
                  <img src="/images/high_speed_train.jpg" alt="Train info" style={{ marginTop: '12px', borderRadius: '8px', maxWidth: '320px', width: '100%' }} />
                  <div className="tip-box" style={{ marginTop: '10px' }}>
                    <span className="tip-icon">🎫</span>
                    <div>
                      <strong>Booking guide for foreign passport holders:</strong><br/>
                      1. Download <strong>Trip.com</strong> app (supports English & foreign credit cards)<br/>
                      2. Create an account and add your <strong>passport number</strong><br/>
                      3. Search for your route and select your preferred train<br/>
                      4. At the station, use the <strong>Foreign Passport lane</strong> at the ticket counter to collect your ticket<br/>
                      5. Alternatively, some stations have self-service machines that scan passports
                    </div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">5</div>
                <div className="step-body">
                  <h3>Arrive: Ganzhou West Station (贛州西站)</h3>
                  <p>Take a taxi or pre-arranged hotel transfer to the venue. <strong>DiDi</strong> (滴滴) is China's Uber equivalent and works well in Ganzhou.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">Download DiDi before your trip</span>
                    <span className="meta-chip chip-tip">WeChat Pay or cash for taxis</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {route === 'hk' && (
          <>
            <div className="tip-box">
              <span className="tip-icon">✅</span>
              <div><strong>No Visa Required for HK Permanent Residents & Chinese Citizens</strong> — SAR passport or Home Return Permit (回鄉證) holders can use fast-track eGate lanes at West Kowloon.</div>
            </div>
            <div className="journey-steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h3>Travel to HK West Kowloon Station (香港西九龍站)</h3>
                  <p>Take the MTR to <strong>Austin Station</strong> (exit A, 1-min walk) or <strong>Jordan Station</strong> (5-min walk). Arrive at least 45 minutes before your train.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">Octopus card for MTR</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h3>Check In & Clear Border Control</h3>
                  <p>West Kowloon uses <strong>co-location</strong> — HK departure and mainland China arrival customs are both handled inside the station.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">Bring passport or Home Return Permit</span>
                    <span className="meta-chip chip-time">Allow 30–45 min</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h3>High-Speed Train: HK West Kowloon → Ganzhou West (贛州西站)</h3>
                  <p>Take train <strong>G902 Fuxing Express</strong>. Book on <strong>Trip.com</strong> or <strong>12306</strong>; ticket machines at West Kowloon also accept Octopus card and credit cards.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">Departs 11:35 → Arrives 13:56 (2h 21min)</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div className="step-body">
                  <h3>Arrive: Ganzhou West Station (贛州西站)</h3>
                  <p>Taxis, DiDi (滴滴), and hotel shuttles are available at the station.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">WeChat Pay widely accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Venue */}
      <div className="card">
        <h2>🏨 Wedding Venue & Hotel</h2>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '.15rem' }}>石城森林温泉度假酒店</h3>
        <p className="venue-en-name">Shicheng Forest Hot Spring Resort</p>
        <p className="venue-address">📍 No. 8, Fuhu Road, Binjiang Road, Ganjiāngyuán North Avenue, Shicheng County, Ganzhou, Jiangxi</p>
        <div className="tip-box" style={{ marginTop: '.85rem' }}>
          <span className="tip-icon">🏨</span>
          <div>This resort is both our <strong>wedding venue and the recommended hotel</strong> for guests. Staying here means you're right at the celebration — no extra transport needed on the big day!</div>
        </div>
      </div>

      {/* Alipay Setup Guide */}
      <div className="card">
        <h2>💳 Setting Up Alipay (For US Guests)</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Cash is rarely used in mainland China — almost everything is paid via <strong>mobile QR codes</strong>. Setting up <strong>Alipay</strong> before your trip is highly recommended.
        </p>
        <div className="journey-steps">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-body">
              <h3>Download Alipay</h3>
              <p>Search <strong>"Alipay"</strong> in the App Store (iOS) or Google Play Store (Android) and install the app.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-body">
              <h3>Sign Up with Your US Phone Number</h3>
              <p>Open the app, tap <strong>"Sign Up"</strong>, select country code <strong>+1 (United States)</strong>, enter your phone number, and complete SMS verification.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-body">
              <h3>Complete Identity Verification</h3>
              <p>Go to <strong>"Me" → "Tour Pass"</strong> or <strong>"My Cards"</strong>. Upload a clear photo of your <strong>passport</strong> and enter your details exactly as shown. Approval is usually instant (can take up to 24 hours).</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-body">
              <h3>Bind Your VISA Credit Card</h3>
              <p>Go to <strong>"Me" → "Bank Cards" → "Add Card"</strong>. Enter your VISA card details and billing address. Alipay may run a small pre-authorization charge to verify your card.</p>
              <div className="step-meta">
                <span className="meta-chip chip-tip">Mastercard & JCB also supported</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">5</div>
            <div className="step-body">
              <h3>Top Up via "Tour Pass"</h3>
              <p>Alipay's <strong>Tour Pass</strong> lets you load RMB from your VISA card (min ¥100). The balance is valid for <strong>90 days</strong> and can be topped up as needed. Unspent funds are automatically refunded.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">6</div>
            <div className="step-body">
              <h3>Pay by Scanning QR Codes</h3>
              <p>Use the <strong>"Scan"</strong> button to scan a merchant's QR code, or show your <strong>"Pay"</strong> QR code for the merchant to scan. It works at restaurants, shops, taxis, street vendors — almost everywhere!</p>
            </div>
          </div>
        </div>
        <div className="warn-box" style={{ marginTop: '1rem' }}>
          <span className="tip-icon">⚠️</span>
          <div>
            <strong>Important tips:</strong><br/>
            • Call your bank before traveling to <strong>pre-authorize China transactions</strong> — some US banks block them by default.<br/>
            • No Chinese bank account is needed — the Tour Pass is designed for foreign visitors.<br/>
            • You <strong>cannot withdraw cash</strong> from Tour Pass — bring your debit card for ATM withdrawals if you need cash.
          </div>
        </div>
      </div>

      {/* Essential Tips */}
      <div className="card">
        <h2>Essential Tips for All Guests</h2>
        <div className="essentials-grid">
          {[
            { icon: '💳', title: 'Currency & Payments', body: 'China uses CNY / RMB (¥). WeChat Pay and Alipay are the dominant payment methods. See the Alipay setup guide above to get started.' },
            { icon: '📱', title: 'Mobile & Internet', body: 'Google, WhatsApp, Instagram & most Western apps are blocked in mainland China. Download a VPN before entering China.' },
            { icon: '🗺', title: 'Maps & Navigation', body: 'Google Maps works poorly in China. Download Baidu Maps (百度地圖) or Amap (高德地圖) for offline navigation.' },
            { icon: '🌡️', title: 'Weather in Jiangxi', body: 'November is autumn — mild and pleasant, 10–20°C. Light layers and a jacket are recommended.' },
            { icon: '🚉', title: 'Train Tickets', body: 'Book high-speed rail on Trip.com (English) or 12306.cn. Your passport number is required. Book 2–3 weeks ahead.' },
            { icon: '💬', title: 'WeChat', body: "Install WeChat before the trip. It's used for payments, messaging, and navigation. Link a foreign card to enable WeChat Pay." },
            { icon: '📍', title: 'Health & Safety', body: 'Tap water is not drinkable — use bottled water. International travel insurance is strongly recommended.' },
            { icon: '👔', title: 'Dress Code', body: 'Attire is formal. Avoid all-white or all-black outfits (associated with mourning in Chinese culture). Earth tones are encouraged!' },
          ].map((e) => (
            <div key={e.title} className="essential-item">
              <span className="e-icon">{e.icon}</span>
              <div><h4>{e.title}</h4><p>{e.body}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Ganzhou & Jiangxi */}
      <div className="card">
        <h2>Explore Jiangxi</h2>
        <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          Make the most of your visit — Jiangxi is full of history, natural beauty, and culture!
        </p>
        <div className="attractions-grid">
          {[
            { sub: 'Ganzhou City', name: 'Ancient City Walls (贛州古城牆)', desc: "One of China's best-preserved Song Dynasty city walls. Walk the ramparts along the river for stunning views." },
            { sub: 'Ganzhou City', name: 'Bajing Tower (八境台)', desc: 'A historic tower at the confluence of the Zhang and Gong rivers, offering panoramic views over the city.' },
            { sub: 'Ganzhou City', name: 'Hakka Culture (客家文化)', desc: 'Ganzhou is the "Hakka Capital of the World." Explore ancestral halls, Hakka cuisine, and rich folk traditions.' },
            { sub: '~3 hrs from Ganzhou', name: 'Wuyuan County (婺源)', desc: "Often called \"China's most beautiful countryside\" — white-walled villages, rolling hills, and yellow rapeseed flower fields." },
            { sub: 'Northern Jiangxi', name: 'Lushan Mountain (廬山)', desc: 'A UNESCO World Heritage site with dramatic peaks, waterfalls, and ancient temples.' },
            { sub: 'Eastern Jiangxi', name: 'San Qing Mountain (三清山)', desc: 'A UNESCO World Heritage site famous for its granite peaks, ancient pines, and sea of clouds. Often compared to Huangshan — one of China\'s most spectacular mountain landscapes.' },
            { sub: 'Northern Jiangxi', name: 'Jingdezhen (景德鎮)', desc: 'The "Porcelain Capital of the World." Browse stunning ceramics, visit working kilns, and pick up handmade pieces.' },
          ].map((a) => (
            <div key={a.name} className="attraction-card">
              <div className="sub">{a.sub}</div>
              <h3>{a.name}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Wedding Trip — groom/bride only */}
      {!tripUnlocked ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>🧳 Our Post-Wedding Trip</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>This section is only visible to the bride & groom.</p>
          <button className="btn btn-outline" onClick={onUnlockTrip}>🔒 Unlock</button>
          {showTripModal && <AccessCodeModal onSuccess={onTripModalSuccess} onCancel={onTripModalCancel} />}
        </div>
      ) : (
      <div className="card">
        <h2>🧳 Our Post-Wedding Trip</h2>
        <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          After the wedding, we'll be traveling across China! Guests are welcome to join us for any part of the journey.
        </p>
        <div className="journey-steps">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-body">
              <h3>Ganzhou → Nanchang</h3>
              <p>High-speed train to Jiangxi's capital city.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 3 · ~2.5 hrs by train</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-body">
              <h3>📍 Nanchang (南昌)</h3>
              <p>Explore the capital of Jiangxi — Tengwang Pavilion, Poyang Lake, and the vibrant riverside night scene.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 3–5 · 3 days</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-body">
              <h3>📍 Jingdezhen (景德鎮)</h3>
              <p>The Porcelain Capital — visit ancient kilns, ceramic markets, and try making pottery.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 6–8 · 3 days</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-body">
              <h3>📍 Shanghai (上海)</h3>
              <p>China's dazzling metropolis — the Bund, Yu Garden, French Concession, and world-class dining.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 9–12 · 4 days</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">5</div>
            <div className="step-body">
              <h3>📍 Chongqing (重慶)</h3>
              <p>Mountain city famous for hot pot, night views, Ciqikou ancient town, and Yangtze river scenery.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 13–15 · 3 days</span>
                <span className="meta-chip chip-warn">✈️ Fly from Shanghai</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">6</div>
            <div className="step-body">
              <h3>📍 Chengdu (成都)</h3>
              <p>Giant Panda Base, Sichuan cuisine, Jinli Ancient Street, and the laid-back teahouse culture.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 16–18 · 3 days</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">7</div>
            <div className="step-body">
              <h3>📍 Hong Kong (香港)</h3>
              <p>Final stop before flying home — dim sum, Victoria Peak, and last-minute shopping.</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 19 · 1 day</span>
                <span className="meta-chip chip-warn">✈️ Fly from Chengdu</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">✈️</div>
            <div className="step-body">
              <h3>Hong Kong → San Francisco</h3>
              <p>Fly home!</p>
              <div className="step-meta">
                <span className="meta-chip chip-time">Nov 20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function TravelZH({ route, setRoute, tripUnlocked, onUnlockTrip, showTripModal, onTripModalSuccess, onTripModalCancel }: RouteProps) {
  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">交通指南</h1>

      <div className="card">
        <h2>前往中國江西省</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
          我們的婚禮在<strong>江西省贛州市</strong>舉行。以下為來自<strong>美國</strong>及<strong>香港</strong>賓客的詳細交通指南。
        </p>
        <div className="route-toggle">
          <button className={`route-btn${route === 'us' ? ' active' : ''}`} onClick={() => setRoute('us')}>✈️ 從美國出發</button>
          <button className={`route-btn${route === 'hk' ? ' active' : ''}`} onClick={() => setRoute('hk')}>🚌 從香港出發</button>
        </div>

        {route === 'us' && (
          <>
            <div className="warn-box">
              <span className="tip-icon">📖</span>
              <div><strong>美國公民須申請中國簽證</strong> — 持美國護照人士須於出發前申請中國旅遊簽證（L簽）。請提前4至6週向最近的中國領事館申辦。香港方面，美國公民可免簽逗留90天。</div>
            </div>
            <div className="journey-steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h3>航班：舊金山（SFO）→ 香港（HKG）</h3>
                  <p>推薦航班：<strong>CX2873</strong>，<strong>2026年10月24日（星期六）</strong>，國泰航空直飛，波音777-300ER。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">00:20 – 06:15+1（14小時55分鐘）</span>
                    <span className="meta-chip chip-tip">建議提前3至6個月購票</span>
                  </div>
                  <img src="/images/flight.png" alt="航班資訊" style={{ marginTop: '12px', borderRadius: '8px', maxWidth: '100%' }} />
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h3>抵達香港國際機場（HKG）</h3>
                  <p>辦理香港入境手續——美國公民可<strong>免簽逗留90天</strong>。乘搭機場快線（AEL）至香港站，再步行或乘搭港鐵前往西九龍站。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">機場快線約24分鐘</span>
                    <span className="meta-chip chip-cost">約港幣115元（約15美元）</span>
                    <span className="meta-chip chip-tip">八達通通用於所有香港公共交通</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h3>前往香港西九龍站</h3>
                  <p>西九龍站是高鐵前往中國大陸的總站。由香港站步行約10分鐘，或乘港鐵至<strong>柯士甸站</strong>（A出口）。請提前<strong>45分鐘</strong>抵達——在此站內同時辦理香港離港及中國入境手續（「一地兩檢」）。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">請攜帶護照及中國簽證</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div className="step-body">
                  <h3>高鐵：香港西九龍 → 贛州西站</h3>
                  <p>乘搭<strong>G902 復興號</strong>。請提前在<strong>Trip.com</strong>或<strong>12306</strong>購票，購票需填寫護照號碼。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">11:35出發 → 13:56抵達（2小時21分鐘）</span>
                  </div>
                  <img src="/images/high_speed_train.jpg" alt="高鐵資訊" style={{ marginTop: '12px', borderRadius: '8px', maxWidth: '320px', width: '100%' }} />
                  <div className="tip-box" style={{ marginTop: '10px' }}>
                    <span className="tip-icon">🎫</span>
                    <div>
                      <strong>外國護照持有人購票指南：</strong><br/>
                      1. 下載 <strong>Trip.com</strong> 應用程式（支援英文及海外信用卡）<br/>
                      2. 註冊帳號並添加<strong>護照號碼</strong><br/>
                      3. 搜索路線並選擇合適的車次<br/>
                      4. 到站後前往<strong>外國護照專用窗口</strong>取票<br/>
                      5. 部分車站亦設有可掃描護照的自助取票機
                    </div>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">5</div>
                <div className="step-body">
                  <h3>抵達：贛州西站</h3>
                  <p>可在站外乘搭計程車或提前安排酒店接送。<strong>滴滴出行</strong>是中國版Uber，在贛州廣泛使用。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">出發前下載滴滴App</span>
                    <span className="meta-chip chip-tip">可使用微信支付或現金</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {route === 'hk' && (
          <>
            <div className="tip-box">
              <span className="tip-icon">✅</span>
              <div><strong>香港永久居民及中國公民無需簽證</strong> — 持特區護照或回鄉證的人士可在西九龍站使用快速e道通道。</div>
            </div>
            <div className="journey-steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h3>前往香港西九龍站</h3>
                  <p>乘港鐵至<strong>柯士甸站</strong>（A出口，步行約1分鐘）或<strong>佐敦站</strong>（步行約5分鐘）。請提前45分鐘抵達。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">可使用八達通乘搭港鐵</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h3>辦理報到及過境清關</h3>
                  <p>西九龍採用「一地兩檢」——香港離港及中國大陸入境手續均在車站內一次辦妥。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">請攜帶護照或回鄉證</span>
                    <span className="meta-chip chip-time">預留30至45分鐘</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h3>高鐵：香港西九龍 → 贛州西站</h3>
                  <p>乘搭<strong>G902 復興號</strong>。可在<strong>Trip.com</strong>或<strong>12306</strong>購票；西九龍站自動售票機亦接受八達通及信用卡。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-time">11:35出發 → 13:56抵達（2小時21分鐘）</span>
                  </div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div className="step-body">
                  <h3>抵達：贛州西站</h3>
                  <p>站外有計程車、滴滴出行及酒店接送服務。</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-tip">微信支付廣泛用於計程車付款</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Venue */}
      <div className="card">
        <h2>🏨 婚禮場地及酒店</h2>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '.15rem' }}>石城森林溫泉度假酒店</h3>
        <p className="venue-en-name">Shicheng Forest Hot Spring Resort</p>
        <p className="venue-address">📍 江西省贛州市石城縣贛江源北大道濱江路福湖路8號</p>
        <div className="tip-box" style={{ marginTop: '.85rem' }}>
          <span className="tip-icon">🏨</span>
          <div>此度假酒店既是我們的<strong>婚禮場地，亦是推薦賓客入住的酒店</strong>。入住於此，婚禮當天無需另行安排交通！</div>
        </div>
      </div>

      {/* Alipay Setup Guide */}
      <div className="card">
        <h2>💳 設定支付寶（適用於美國賓客）</h2>
        <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
          中國大陸幾乎不使用現金——絕大部分消費都透過<strong>手機QR碼支付</strong>。強烈建議在出發前設定好<strong>支付寶（Alipay）</strong>。
        </p>
        <div className="journey-steps">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-body">
              <h3>下載支付寶</h3>
              <p>在 App Store（iOS）或 Google Play（Android）搜尋<strong>「Alipay」</strong>並安裝應用程式。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-body">
              <h3>使用美國手機號碼註冊</h3>
              <p>打開應用程式，點擊<strong>「註冊」</strong>，選擇國家代碼<strong>+1（美國）</strong>，輸入手機號碼並完成短訊驗證。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-body">
              <h3>完成身份驗證</h3>
              <p>進入<strong>「我的」→「Tour Pass」</strong>或<strong>「我的銀行卡」</strong>。上傳清晰的<strong>護照照片</strong>，並按護照上的資料準確填寫。審批通常即時完成（最多可能需要24小時）。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-body">
              <h3>綁定 VISA 信用卡</h3>
              <p>進入<strong>「我的」→「銀行卡」→「添加銀行卡」</strong>。輸入 VISA 卡資料及帳單地址。支付寶可能會進行小額預授權以驗證卡片。</p>
              <div className="step-meta">
                <span className="meta-chip chip-tip">亦支援 Mastercard 及 JCB</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">5</div>
            <div className="step-body">
              <h3>透過「Tour Pass」充值</h3>
              <p>支付寶的<strong>Tour Pass</strong>可用 VISA 卡充值人民幣（最低¥100）。餘額有效期為<strong>90天</strong>，可隨時充值。未用完的金額會自動退回。</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">6</div>
            <div className="step-body">
              <h3>掃碼付款</h3>
              <p>使用<strong>「掃一掃」</strong>功能掃描商家QR碼，或出示你的<strong>「付款碼」</strong>讓商家掃描。餐廳、商店、的士、路邊攤——幾乎無處不可用！</p>
            </div>
          </div>
        </div>
        <div className="warn-box" style={{ marginTop: '1rem' }}>
          <span className="tip-icon">⚠️</span>
          <div>
            <strong>重要提示：</strong><br/>
            • 出發前請致電銀行<strong>預先授權中國大陸交易</strong>——部分美國銀行會預設攔截此類交易。<br/>
            • 無需中國銀行帳戶——Tour Pass 專為外國旅客設計。<br/>
            • Tour Pass <strong>不可提取現金</strong>——如需現金，請攜帶銀行卡在ATM提款。
          </div>
        </div>
      </div>

      {/* Essential Tips */}
      <div className="card">
        <h2>所有賓客注意事項</h2>
        <div className="essentials-grid">
          {[
            { icon: '💳', title: '貨幣及支付', body: '中國大陸使用人民幣（CNY/¥）。微信支付及支付寶是主要付款方式。請參閱上方的支付寶設定指南。' },
            { icon: '📱', title: '手機及網絡', body: 'Google、WhatsApp、Instagram等大部分西方應用程式在中國大陸均被封鎖。請在進入中國前下載VPN。' },
            { icon: '🗺', title: '地圖及導航', body: 'Google Maps在中國效果欠佳。請下載百度地圖或高德地圖供離線使用。' },
            { icon: '🌡️', title: '江西天氣', body: '十一月為秋季，氣候溫和宜人，氣溫約10至20°C。建議穿著薄外套及多層衣物。' },
            { icon: '🚉', title: '購買火車票', body: '可在Trip.com或12306.cn購票，須填寫護照號碼。建議提前2至3週購票。' },
            { icon: '💬', title: '微信（WeChat）', body: '請出發前安裝微信。它是中國最主要的通訊、付款及導航工具。請綁定外國信用卡以啟用微信支付。' },
            { icon: '📍', title: '健康及安全', body: '自來水不可直接飲用，請使用瓶裝水。強烈建議購買國際旅遊保險。' },
            { icon: '👔', title: '著裝要求', body: '請避免穿著全白或全黑服裝（在中國文化中與喪事相關）。歡迎穿著大地色系的正式裝束！' },
          ].map((e) => (
            <div key={e.title} className="essential-item">
              <span className="e-icon">{e.icon}</span>
              <div><h4>{e.title}</h4><p>{e.body}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Ganzhou */}
      <div className="card">
        <h2>探索江西</h2>
        <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          趁婚禮之行，好好感受江西的歷史、自然風光與文化！
        </p>
        <div className="attractions-grid">
          {[
            { sub: '贛州市內', name: '贛州古城牆', desc: '中國保存最完好的宋代城牆之一。沿江城牆漫步，欣賞古城贛州的秀麗景色。' },
            { sub: '贛州市內', name: '八境台', desc: '位於章江與貢江交匯處的歷史名樓，可俯瞰整個城市，是贛州的標誌性地標。' },
            { sub: '贛州市內', name: '客家文化', desc: '贛州素有「客家搖籃」之稱。可遊覽客家祠堂、品嚐客家菜、體驗當地豐富的民間文化。' },
            { sub: '距贛州約3小時', name: '婺源縣', desc: '素有「中國最美鄉村」之稱——連綿起伏的山丘、白牆黛瓦的古村落、金黃油菜花田。' },
            { sub: '江西北部', name: '廬山', desc: '聯合國教科文組織世界遺產，擁有壯觀山峰、瀑布和古廟。' },
            { sub: '江西東部', name: '三清山', desc: '聯合國教科文組織世界遺產，以花崗岩奇峰、古松和雲海聞名。常被與黃山相提並論——中國最壯觀的山岳風景之一。' },
            { sub: '江西北部', name: '景德鎮', desc: '「世界瓷都」。可瀏覽精美陶瓷、參觀傳統窯廠，選購獨特手工藝品作為紀念品。' },
          ].map((a) => (
            <div key={a.name} className="attraction-card">
              <div className="sub">{a.sub}</div>
              <h3>{a.name}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Wedding Trip — groom/bride only */}
      {!tripUnlocked ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>🧳 婚後旅行計劃</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>此部分僅限新郎新娘查看。</p>
          <button className="btn btn-outline" onClick={onUnlockTrip}>🔒 解鎖</button>
          {showTripModal && <AccessCodeModal onSuccess={onTripModalSuccess} onCancel={onTripModalCancel} />}
        </div>
      ) : (
      <div className="card">
        <h2>🧳 婚後旅行計劃</h2>
        <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          婚禮過後，我們將遊歷中國各地！歡迎賓客加入旅程的任何部分。
        </p>
        <div className="journey-steps">
          <div className="step"><div className="step-num">1</div><div className="step-body"><h3>贛州 → 南昌</h3><p>乘高鐵前往江西省會南昌。</p><div className="step-meta"><span className="meta-chip chip-time">11月3日 · 約2.5小時</span></div></div></div>
          <div className="step"><div className="step-num">2</div><div className="step-body"><h3>📍 南昌</h3><p>遊覽滕王閣、鄱陽湖及秋水廣場夜景。</p><div className="step-meta"><span className="meta-chip chip-time">11月3–5日 · 3天</span></div></div></div>
          <div className="step"><div className="step-num">3</div><div className="step-body"><h3>📍 景德鎮</h3><p>世界瓷都——參觀古窯、逛陶瓷市集、體驗製陶。</p><div className="step-meta"><span className="meta-chip chip-time">11月6–8日 · 3天</span></div></div></div>
          <div className="step"><div className="step-num">4</div><div className="step-body"><h3>📍 上海</h3><p>國際大都會——外灘、豫園、法租界及世界級美食。</p><div className="step-meta"><span className="meta-chip chip-time">11月9–12日 · 4天</span></div></div></div>
          <div className="step"><div className="step-num">5</div><div className="step-body"><h3>📍 重慶</h3><p>山城火鍋、夜景、磁器口古鎮及長江風光。</p><div className="step-meta"><span className="meta-chip chip-time">11月13–15日 · 3天</span><span className="meta-chip chip-warn">✈️ 從上海飛往</span></div></div></div>
          <div className="step"><div className="step-num">6</div><div className="step-body"><h3>📍 成都</h3><p>大熊貓基地、川菜、錦里古街及悠閒茶館文化。</p><div className="step-meta"><span className="meta-chip chip-time">11月16–18日 · 3天</span></div></div></div>
          <div className="step"><div className="step-num">7</div><div className="step-body"><h3>📍 香港</h3><p>回程前最後一站——飲茶、太平山及最後採購。</p><div className="step-meta"><span className="meta-chip chip-time">11月19日 · 1天</span><span className="meta-chip chip-warn">✈️ 從成都飛往</span></div></div></div>
          <div className="step"><div className="step-num">✈️</div><div className="step-body"><h3>香港 → 三藩市</h3><p>回家！</p><div className="step-meta"><span className="meta-chip chip-time">11月20日</span></div></div></div>
        </div>
      </div>
      )}
    </div>
  );
}
