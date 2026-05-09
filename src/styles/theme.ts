export const theme = {
  colors: {
    primaryLight: '#e8d5f5',   // light purple
    primary: '#c9a5e0',        // purple
    primaryDark: '#9b6dc6',    // darker purple
    secondaryLight: '#fef9e7', // light yellow
    secondary: '#fdf2c5',      // yellow
    secondaryDark: '#f5e08a',  // darker yellow
    white: '#ffffff',
    background: '#faf7fc',     // very light purple tint
    text: '#3d2c4e',           // dark purple for text
    textLight: '#6b5a7a',
    textMuted: '#9e8fb0',
    border: '#e0d4eb',
    success: '#6abf69',
    danger: '#e06b6b',
    cardBg: '#ffffff',
  },
};

export const cssVariables = `
  :root {
    --color-primary-light: ${theme.colors.primaryLight};
    --color-primary: ${theme.colors.primary};
    --color-primary-dark: ${theme.colors.primaryDark};
    --color-secondary-light: ${theme.colors.secondaryLight};
    --color-secondary: ${theme.colors.secondary};
    --color-secondary-dark: ${theme.colors.secondaryDark};
    --color-white: ${theme.colors.white};
    --color-background: ${theme.colors.background};
    --color-text: ${theme.colors.text};
    --color-text-light: ${theme.colors.textLight};
    --color-text-muted: ${theme.colors.textMuted};
    --color-border: ${theme.colors.border};
    --color-success: ${theme.colors.success};
    --color-danger: ${theme.colors.danger};
    --color-card-bg: ${theme.colors.cardBg};

    --font-family: 'Segoe UI', 'Noto Sans TC', sans-serif;
    --border-radius: 12px;
    --shadow: 0 2px 12px rgba(155, 109, 198, 0.1);
    --shadow-lg: 0 4px 24px rgba(155, 109, 198, 0.15);
    --max-width: 1100px;
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: var(--color-primary-dark);
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: var(--font-family);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 20px;
  }

  .section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 2rem;
    color: var(--color-primary-dark);
    margin-bottom: 30px;
    text-align: center;
  }

  .card {
    background: var(--color-card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 24px;
    margin-bottom: 16px;
    border: 1px solid var(--color-border);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    transition: var(--transition);
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }
  .btn-primary:hover {
    background: var(--color-primary-dark);
  }

  .btn-secondary {
    background: var(--color-secondary);
    color: var(--color-text);
  }
  .btn-secondary:hover {
    background: var(--color-secondary-dark);
  }

  .btn-outline {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary-dark);
  }
  .btn-outline:hover {
    background: var(--color-primary-light);
  }

  .btn-danger {
    background: var(--color-danger);
    color: white;
  }

  .btn-sm {
    padding: 6px 14px;
    font-size: 0.85rem;
  }

  input, select, textarea {
    font-family: var(--font-family);
    padding: 10px 14px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 1rem;
    color: var(--color-text);
    background: white;
    transition: var(--transition);
    width: 100%;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(201, 165, 224, 0.2);
  }

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: var(--color-text-light);
    font-size: 0.9rem;
  }

  .form-group {
    margin-bottom: 16px;
  }

  /* ── Travel: Route Toggle ── */
  .route-toggle { display: flex; gap: .5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .route-btn {
    flex: 1 1 140px;
    padding: .65rem 1rem;
    border: 2px solid var(--color-primary-light);
    border-radius: 10px;
    background: var(--color-primary-light);
    cursor: pointer;
    font-size: .9rem;
    font-weight: 600;
    color: var(--color-text-light);
    transition: all .2s;
    text-align: center;
    font-family: var(--font-family);
  }
  .route-btn.active { border-color: var(--color-primary); color: var(--color-primary-dark); box-shadow: 0 0 0 2px var(--color-primary); }

  /* ── Travel: Journey Steps ── */
  .journey-steps { position: relative; padding-left: 2.2rem; }
  .step { position: relative; margin-bottom: 1.25rem; }
  .step::before { content: ''; position: absolute; left: -1.75rem; top: 1.6rem; bottom: -1.25rem; width: 2px; background: var(--color-primary-light); }
  .step:last-child::before { display: none; }
  .step-num {
    position: absolute; left: -2.2rem; top: .1rem;
    width: 1.6rem; height: 1.6rem; border-radius: 50%;
    background: var(--color-primary); color: white;
    font-size: .75rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .step-body { background: var(--color-primary-light); border-radius: 10px; padding: .85rem 1rem; border-left: 3px solid var(--color-primary); }
  .step-body h3 { font-size: .95rem; color: var(--color-primary-dark); margin-bottom: .3rem; }
  .step-body p  { font-size: .85rem; color: var(--color-text-light); line-height: 1.5; margin-bottom: .3rem; }
  .step-body p:last-of-type { margin-bottom: 0; }
  .step-meta { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .5rem; }
  .meta-chip { font-size: .75rem; padding: .2rem .6rem; border-radius: 999px; font-weight: 600; }
  .chip-time { background: #e3f2fd; color: #1565c0; }
  .chip-cost { background: #e8f5e9; color: #2e7d32; }
  .chip-tip  { background: var(--color-secondary-light); color: #8a7200; }
  .chip-warn { background: #ffebee; color: #c62828; }

  /* ── Travel: Tip/Warning Boxes ── */
  .tip-box  { display: flex; gap: .75rem; background: var(--color-secondary-light); border: 1px solid #f0d88a; border-radius: 10px; padding: .85rem 1rem; margin-bottom: .75rem; font-size: .875rem; line-height: 1.5; color: var(--color-text); align-items: flex-start; }
  .warn-box { display: flex; gap: .75rem; background: #ffebee; border: 1px solid #ef9a9a; border-radius: 10px; padding: .85rem 1rem; margin-bottom: .75rem; font-size: .875rem; line-height: 1.5; color: #b71c1c; align-items: flex-start; }
  .tip-icon { font-size: 1.2rem; flex-shrink: 0; }

  /* ── Travel: Attractions ── */
  .attractions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
  .attraction-card { background: var(--color-primary-light); border-radius: 10px; padding: 1rem; border-top: 3px solid var(--color-primary); }
  .attraction-card h3 { font-size: .95rem; color: var(--color-primary-dark); margin-bottom: .3rem; }
  .attraction-card .sub { font-size: .75rem; color: var(--color-secondary-dark); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; margin-bottom: .4rem; }
  .attraction-card p { font-size: .83rem; color: var(--color-text-light); line-height: 1.5; }

  /* ── Travel: Essentials ── */
  .essentials-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .85rem; }
  .essential-item { background: var(--color-primary-light); border-radius: 10px; padding: .85rem 1rem; display: flex; gap: .7rem; align-items: flex-start; }
  .essential-item .e-icon { font-size: 1.3rem; flex-shrink: 0; }
  .essential-item h4 { font-size: .85rem; font-weight: 700; color: var(--color-primary-dark); margin-bottom: .15rem; }
  .essential-item p  { font-size: .78rem; color: var(--color-text-light); line-height: 1.4; }

  /* ── Travel: Venue ── */
  .venue-en-name { font-size: .85rem; color: var(--color-text-light); margin-bottom: .4rem; }
  .venue-address { font-size: .82rem; color: var(--color-text-light); line-height: 1.5; margin-bottom: .5rem; }

  /* ── RSVP: Hero Card ── */
  .rsvp-hero-card {
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 55%, var(--color-secondary-dark) 100%);
    color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 2.5rem 1.5rem 2rem;
    text-align: center;
    margin-bottom: 1.25rem;
  }
  .rsvp-hero-card .rsvp-tag { font-size: .78rem; text-transform: uppercase; letter-spacing: .14em; opacity: .8; margin-bottom: .5rem; }
  .rsvp-hero-card h2 { font-size: 2rem; font-weight: 300; margin-bottom: .35rem; }
  .rsvp-hero-card h2 strong { font-weight: 700; }
  .rsvp-hero-card .rsvp-date { font-size: 1rem; font-weight: 600; opacity: .9; margin-bottom: .2rem; }
  .rsvp-hero-card .rsvp-loc  { font-size: .85rem; opacity: .75; }

  /* ── RSVP: Attendance Buttons ── */
  .rsvp-attend-btns { display: flex; gap: .75rem; margin: .75rem 0; flex-wrap: wrap; }
  .rsvp-attend-btn {
    flex: 1 1 160px;
    padding: .75rem .5rem;
    border: 2px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-primary-light);
    cursor: pointer;
    font-size: .9rem;
    font-weight: 600;
    color: var(--color-text-light);
    transition: all .2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .3rem;
    font-family: var(--font-family);
  }
  .rsvp-attend-btn .ra-icon { font-size: 1.4rem; }
  .rsvp-attend-btn:hover { border-color: var(--color-primary); color: var(--color-primary-dark); }
  .rsvp-attend-btn.selected-yes { border-color: #4caf50; background: #e8f5e9; color: #2e7d32; box-shadow: 0 0 0 2px #4caf50; }
  .rsvp-attend-btn.selected-no  { border-color: #ef5350; background: #ffebee; color: #c62828; box-shadow: 0 0 0 2px #ef5350; }

  /* ── RSVP: Name Hint ── */
  .rsvp-name-hint { font-size: .82rem; padding: .45rem .75rem; border-radius: 8px; margin-bottom: .75rem; }
  .rsvp-name-hint.found     { background: #e8f5e9; color: #2e7d32; }
  .rsvp-name-hint.not-found { background: var(--color-secondary-light); color: #8a7200; }

  /* ── RSVP: Thank You ── */
  .rsvp-thanks-wrap { text-align: center; padding: 3rem 1.5rem; }
  .rsvp-thanks-wrap .thanks-icon { font-size: 3.5rem; margin-bottom: 1rem; }
  .rsvp-thanks-wrap h2 { color: var(--color-primary-dark); margin-bottom: .5rem; font-size: 1.4rem; }
  .rsvp-thanks-wrap p  { color: var(--color-text-light); font-size: .95rem; line-height: 1.6; margin-bottom: 1.5rem; }

  /* ── Form rows ── */
  .form-row { display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: .75rem; }
  .form-row input, .form-row select, .form-row textarea {
    flex: 1 1 180px;
    padding: .55rem .8rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color .2s;
    background: white;
    font-family: var(--font-family);
    color: var(--color-text);
  }
  .form-row input:focus, .form-row select:focus, .form-row textarea:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(201, 165, 224, 0.2); }

  /* ── Mobile overrides (must be last) ── */
  @media (max-width: 768px) {
    .section-title { font-size: 1.5rem; }
    .section { padding: 40px 0; }
    .form-row { flex-direction: column; }
    .container { padding: 0 12px; }
    .card { padding: 16px; margin-bottom: 12px; }
    .btn { padding: 10px 18px; font-size: .9rem; }
    .rsvp-hero-card { padding: 1.5rem 1rem 1.5rem; }
    .rsvp-hero-card h2 { font-size: 1.4rem; }
    .rsvp-attend-btns { flex-direction: column; }
    .rsvp-attend-btn { flex: 1 1 auto; padding: .6rem .5rem; font-size: .85rem; }
    .rsvp-attend-btn .ra-icon { font-size: 1.2rem; }
    .route-toggle { flex-direction: column; }
    .route-btn { flex: 1 1 auto; }
    .attractions-grid { grid-template-columns: 1fr; }
    .essentials-grid { grid-template-columns: 1fr; }
    .journey-steps { padding-left: 1.8rem; }
    .step-num { left: -1.8rem; width: 1.4rem; height: 1.4rem; font-size: .65rem; }
    .overview-hero h1 { font-size: 1.6rem !important; }
    .overview-hero p { font-size: .82rem !important; }
    input, select, textarea { padding: 8px 12px; font-size: 1rem; }
    .form-row input, .form-row select, .form-row textarea {
      padding: 8px 12px;
      font-size: 1rem;
      flex: 1 1 auto;
    }
  }
`;
