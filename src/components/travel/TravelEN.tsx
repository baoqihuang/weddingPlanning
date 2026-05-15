import { CollapsibleCard } from './CollapsibleCard';
import { AccessCodeModal } from '../AccessCodeModal';
import type { RouteProps } from './types';

export function TravelEN({ tripUnlocked, onUnlockTrip, showTripModal, onTripModalSuccess, onTripModalCancel }: RouteProps) {
  return (
    <div className="container section" style={{ paddingTop: '80px' }}>
      <h1 className="section-title">Travel Guide</h1>

      <CollapsibleCard title="Getting to Jiangxi Province, China" defaultOpen>
        <p style={{ fontSize: '.9rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Our wedding is in <strong>Ganzhou, Jiangxi Province</strong> (贛州, 江西省). Below you'll find step-by-step travel guides for guests flying from the <strong>United States</strong> and guests travelling from <strong>Hong Kong</strong>.
        </p>

        <CollapsibleCard title="✈️ From the United States">
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
                  <p>Please <strong>contact the bride (Heilam)</strong> in advance and share your arrival date & time so we can arrange a bus or car from Ganzhou West Station to the wedding hotel.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">Let us know your arrival time!</span>
                    <span className="meta-chip chip-tip">Download DiDi before your trip</span>
                    <span className="meta-chip chip-tip">WeChat Pay or cash for taxis</span>
                  </div>
                </div>
              </div>
            </div>
        </CollapsibleCard>

        <CollapsibleCard title="🚌 From Hong Kong">
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
                  <p>Please <strong>contact the bride (Heilam)</strong> in advance and share your arrival date & time so we can arrange a bus or car from Ganzhou West Station to the wedding hotel.</p>
                  <div className="step-meta">
                    <span className="meta-chip chip-warn">Let us know your arrival time!</span>
                    <span className="meta-chip chip-tip">WeChat Pay widely accepted</span>
                  </div>
                </div>
              </div>
            </div>
        </CollapsibleCard>
      </CollapsibleCard>

      {/* Venue */}
      <CollapsibleCard title="🏨 Wedding Venue & Hotel">
        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '.15rem' }}>石城森林温泉度假酒店</h3>
        <p className="venue-en-name">Shicheng Forest Hot Spring Resort</p>
        <p className="venue-address">📍 No. 8, Fuhu Road, Binjiang Road, Ganjiāngyuán North Avenue, Shicheng County, Ganzhou, Jiangxi</p>
        <div className="tip-box" style={{ marginTop: '.85rem' }}>
          <span className="tip-icon">🏨</span>
          <div>This resort is both our <strong>wedding venue and the recommended hotel</strong> for guests. Staying here means you're right at the celebration — no extra transport needed on the big day!</div>
        </div>
      </CollapsibleCard>

      {/* Alipay Setup Guide */}
      <CollapsibleCard title="💳 Setting Up Alipay (For US Guests)">
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
      </CollapsibleCard>

      {/* Essential Tips */}
      <CollapsibleCard title="Essential Tips for All Guests">
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
      </CollapsibleCard>

      {/* Explore Ganzhou & Jiangxi */}
      <CollapsibleCard title="Explore Jiangxi">
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
      </CollapsibleCard>

      {/* Post-Wedding Trip — groom/bride only */}
      {!tripUnlocked ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>🧳 Our Post-Wedding Trip</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>This section is only visible to the bride & groom.</p>
          <button className="btn btn-outline" onClick={onUnlockTrip}>🔒 Unlock</button>
          {showTripModal && <AccessCodeModal onSuccess={onTripModalSuccess} onCancel={onTripModalCancel} />}
        </div>
      ) : (
      <CollapsibleCard title="🧳 Our Post-Wedding Trip">
        <p style={{ fontSize: '.85rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
          After the wedding, we'll be traveling across China! Guests are welcome to join us for any part of the journey.
        </p>
        <div className="journey-steps">
          <div className="step"><div className="step-num">1</div><div className="step-body"><h3>Ganzhou → Nanchang</h3><p>High-speed train to Jiangxi's capital city.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 3 · ~2.5 hrs by train</span></div></div></div>
          <div className="step"><div className="step-num">2</div><div className="step-body"><h3>📍 Nanchang (南昌)</h3><p>Explore the capital of Jiangxi — Tengwang Pavilion, Poyang Lake, and the vibrant riverside night scene.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 3–5 · 3 days</span></div></div></div>
          <div className="step"><div className="step-num">3</div><div className="step-body"><h3>📍 Jingdezhen (景德鎮)</h3><p>The Porcelain Capital — visit ancient kilns, ceramic markets, and try making pottery.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 6–8 · 3 days</span></div></div></div>
          <div className="step"><div className="step-num">4</div><div className="step-body"><h3>📍 Shanghai (上海)</h3><p>China's dazzling metropolis — the Bund, Yu Garden, French Concession, and world-class dining.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 9–12 · 4 days</span></div></div></div>
          <div className="step"><div className="step-num">5</div><div className="step-body"><h3>📍 Chongqing (重慶)</h3><p>Mountain city famous for hot pot, night views, Ciqikou ancient town, and Yangtze river scenery.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 13–15 · 3 days</span><span className="meta-chip chip-warn">✈️ Fly from Shanghai</span></div></div></div>
          <div className="step"><div className="step-num">6</div><div className="step-body"><h3>📍 Chengdu (成都)</h3><p>Giant Panda Base, Sichuan cuisine, Jinli Ancient Street, and the laid-back teahouse culture.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 16–18 · 3 days</span></div></div></div>
          <div className="step"><div className="step-num">7</div><div className="step-body"><h3>📍 Hong Kong (香港)</h3><p>Final stop before flying home — dim sum, Victoria Peak, and last-minute shopping.</p><div className="step-meta"><span className="meta-chip chip-time">Nov 19 · 1 day</span><span className="meta-chip chip-warn">✈️ Fly from Chengdu</span></div></div></div>
          <div className="step"><div className="step-num">✈️</div><div className="step-body"><h3>Hong Kong → San Francisco</h3><p>Fly home!</p><div className="step-meta"><span className="meta-chip chip-time">Nov 20</span></div></div></div>
        </div>
      </CollapsibleCard>
      )}
    </div>
  );
}
