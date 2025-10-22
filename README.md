Nice — I updated your project write-up to include **Database** and **Report View** in the improvements. Polished and ready to paste into your README or repo description:

---

# 💼 Capitec SafePay :bank:

A stealth emergency alert system disguised as a banking app that secretly helps GBV victims

**Demo:** [https://ayandaluthuli.github.io/Capitec_SafePay/](https://ayandaluthuli.github.io/Capitec_SafePay/)

Discreetly alerts trusted contacts when victims of gender-based violence (GBV) enter a secret PIN (`0800`). Designed for South African users where banking apps are common and rarely questioned.

## 🔑 Key Features

1. **Plausible Deniability**

   * Fully functional "banking app" UI
   * Hidden trigger only activates with PIN `0800`
   * GBV hotline number (`0800 150 150`) shown as "Forgot PIN" helpline

2. **Instant Location Sharing**

   * Sends GPS coordinates via email (Formspree) linked to developer email

3. **Safety First**

   * No app installation needed (web-based)

4. **Responsive Design**

   * Works on all devices (feature phones to desktop)

## 🚀 How This App Can Be Improved

1. **Enhanced Stealth**

   * Add fake transaction history and account activity to appear more authentic

2. **Offline Functionality**

   * Store draft alerts when offline and send when connection resumes

3. **Multi-channel Alerts**

   * Send alerts to nearby police, hotlines, and community responders

4. **Database & Reporting**

   * Persist alerts, contact lists, and event metadata in a secure database (e.g., Supabase/Postgres) for reliability and auditability
   * Add a **Reports View** for trusted contacts or administrators to review alert history, recurring hotspots, and response times (with strict access controls and privacy safeguards)

---

If you want, I can:

* add a short tech stack / architecture section showing how the DB + reports would integrate, or
* produce a small "roadmap" checklist you can pin in the repo. Which one next?
