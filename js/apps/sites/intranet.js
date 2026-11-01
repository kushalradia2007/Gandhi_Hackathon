// http://shreecyberzone.local/ - the café's own site (websites.md sections 1 and 2) + http://quiet.room
import { STARS, TOMMY, CAMERA, CAMERA_EMPTY, BADGE_NETSCAPE, BADGE_IE, BADGE_WIN98, BADGE_Y2K } from './art.js';
import { t640, today, clock } from './util.js';

const TITLE = 'SHREE CYBER ZONE - Nehru Nagar, Bhilai - Est. 1998';
const ATTRS = `bgcolor="#ffffff" background="${STARS}" text="#000000" link="#0000ff" vlink="#800080"`;
const box = inner => t640(`<center><span class="logo"></span></center><hr size="3" noshade>${inner}`, 'border="2" cellpadding="10" cellspacing="0" bgcolor="#ffffff"');
const home = '<br><center><font face="Arial" size="2">[<a href="/">Back to Home</a>]</font></center>';

function visits() {
  let n = 142834;
  try { n = parseInt(localStorage.getItem('scz_visits') || '142834', 10) + 1; localStorage.setItem('scz_visits', String(n)); } catch (e) { /* private mode: the counter still counts this visit */ }
  return String(n).padStart(9, '0');
}
let cameraLoads = 0;

const dark = (title, text, extra = {}) => ({
  title, zone: 'intranet', bodyAttrs: 'bgcolor="#000000" text="#ffffff" link="#ffffff" vlink="#c0c0c0" alink="#ffffff"',
  body: `<pre><font face="Courier New">${text}</font></pre>`, ...extra,
});

const PAGES = {
  '/': () => ({
    title: TITLE,
    body: `<marquee scrollamount="4"><font face="Arial" size="2" color="#800000"><b>Welcome to Shree Cyber Zone! We are open 9 AM to 11 PM. Chai available.</b></font></marquee>` + box(`
<center><font face="Arial" size="5" color="#ff0000"><b>* WELCOME TO SHREE CYBER ZONE *</b></font><br>
<font face="Times New Roman" size="3">Nehru Nagar, Bhilai, Chhattisgarh<br>Phone: (0788) 224-1998</font><br><br>
<span class="uc"></span><br><br>
<table border="1" cellpadding="3" cellspacing="0" width="300" bgcolor="#ffffcc"><tr><th colspan="2" bgcolor="#ff9933"><font face="Arial" size="2">RATES</font></th></tr>
<tr><td>Regular</td><td>Rs. 10/hour</td></tr><tr><td>Night</td><td>Rs. 15/hour (after 10 PM)</td></tr><tr><td>Student</td><td>Rs. 8/hour (with ID)</td></tr><tr><td>Printing</td><td>Rs. 2/page</td></tr><tr><td>Floppy</td><td>Rs. 5 (blank, 1.44 MB)</td></tr></table><br>
<font face="Arial" size="4" color="#000080"><b>* NOW FEATURING *</b></font></center>
<table align="center"><tr><td><font face="Times New Roman" size="3">
&#149; 12 Pentium II computers<br>&#149; ISDN internet (fast!)<br>&#149; Color printing<br>&#149; Air conditioned (working on it)<br>&#149; Chai available (Rs. 5)</font></td></tr></table>
<hr><center><font face="Arial" size="3"><b>LINKS:</b> [<a href="/rates">Rates</a>] [<a href="/rules">Rules</a>] [<a href="/games">Games</a>] [<a href="/contact">Contact Us</a>]</font></center><hr size="3" noshade>
<center><font size="2"><i>Best viewed in Netscape Navigator 4.0 at 800x600</i></font><br><br>
You are visitor number:<br><span data-tip="This counter has not been reset since 1998." data-tipdelay="3000"><table border="1" cellpadding="2" cellspacing="0" bgcolor="#000000"><tr><td><font face="Courier New" size="4" color="#00ff00"><b>${visits()}</b></font></td></tr></table></span><br>
<font size="2">Copyright (C) 1998 SHREE CYBER ZONE. All rights reserved.<br><br>
[<a href="mailto:webmaster@shreecyberzone.local">Email Webmaster</a>] - webmaster@shreecyberzone.local</font><br><br>
<img src="${BADGE_NETSCAPE}" width="88" height="31" alt="Netscape Now!"> <img src="${BADGE_IE}" width="88" height="31" alt="Microsoft IE 4.0"> <img src="${BADGE_WIN98}" width="88" height="31" alt="Made with Windows 98"> <img src="${BADGE_Y2K}" width="88" height="31" alt="Y2K COMPLIANT"></center>`),
  }),

  '/rates': () => ({
    title: 'SHREE CYBER ZONE - Rates 1998',
    body: box(`<center><font face="Arial" size="5" color="#ff0000"><b>* RATES 1998 *</b></font><br><br>
<table border="1" cellpadding="4" cellspacing="0" width="360"><tr bgcolor="#000080"><th><font color="#ffffff" face="Arial" size="2">SERVICE</font></th><th><font color="#ffffff" face="Arial" size="2">RATE</font></th></tr>
<tr><td>Regular internet</td><td>Rs. 10/hour</td></tr><tr><td>Night (after 10 PM)</td><td>Rs. 15/hour</td></tr><tr><td>Student (with ID)</td><td>Rs. 8/hour</td></tr>
<tr><td>Printing (B&amp;W)</td><td>Rs. 2/page</td></tr><tr><td>Printing (Color)</td><td>Rs. 5/page</td></tr><tr><td>Floppy (blank)</td><td>Rs. 5</td></tr>
<tr><td>Scanning</td><td>Rs. 10/page</td></tr><tr><td>CD burning</td><td>Rs. 50/disc</td></tr><tr><td>Chai</td><td>Rs. 5/glass</td></tr><tr><td>Cold drink</td><td>Rs. 10/bottle</td></tr></table></center><br>
<b>NOTE:</b><br>&#149; No refunds.<br>&#149; No food at computers.<br>&#149; Do not download "big files." It slows the internet for everyone.<br>
&#149; <a href="#" data-tip="Too late.">Please don't touch PC 03.</a> That is the admin machine.<br>${home}`),
  }),

  '/rules': () => ({
    title: 'SHREE CYBER ZONE - House Rules',
    body: box(`<center><font face="Arial" size="5" color="#ff0000"><b>* HOUSE RULES *</b></font></center><br><font size="3">
1. Pay before you start. No credit.<br>2. Do not unplug the machines. They take 5 minutes to boot.<br>3. Do not download anything over 5 MB. We will know.<br>
4. Do not print anything without permission. We will know.<br>5. Do not change the wallpaper. We will know.<br>6. If a machine is slow, tell Bhaiya. Do not restart it yourself.<br>
7. Do not touch PC 03.<br>8. If you see something strange on PC 03, do not ask about it.<br>9. If someone asks you to open a floppy, do not open the floppy.<br>
10. Please do not ask what is in the back room.</font><br>${home}`),
  }),

  '/games': () => ({
    title: 'SHREE CYBER ZONE - Games',
    body: box(`<center><font face="Arial" size="5" color="#ff0000"><b>* GAMES AVAILABLE *</b></font><br><span class="uc"></span></center><br><font size="3">
&#149; Solitaire<br>&#149; Minesweeper<br>&#149; Wolfenstein 3D<br>&#149; Doom (shareware)<br>&#149; Prince of Persia<br>&#149; Dave<br>&#149; Skyroads<br></font>
<marquee scrollamount="3" width="400">&#149; <a href="/gta_demo">Grand Theft Auto (DEMO)</a> <font color="#ff0000"><b><blink>&lt;-- NEW!</blink></b></font></marquee><br><br>
<font size="2"><i>Note: We have 1 licensed copy of each. Please do not install your own games. We will know.</i></font><br>${home}`),
  }),

  '/gta_demo': () => ({
    title: 'File not found',
    body: box(`<font face="Arial" size="4"><b>File not found.</b></font><br><br>The file you are looking for was removed in 1998.<br><br>We cannot tell you why.<br>${home}`),
  }),

  '/contact': () => ({
    title: 'SHREE CYBER ZONE - Contact Us',
    body: box(`<center><font face="Arial" size="5" color="#ff0000"><b>* CONTACT US *</b></font></center><br>
<b>Address:</b><br>SHREE CYBER ZONE<br>Nehru Nagar, Sector 4<br>Bhilai, Chhattisgarh 490020<br>India<br><br>
Phone: (0788) 224-1998<br>Fax: (0788) 224-1999<br><br>Email: <a href="mailto:bhaiya@shreecyberzone.local">bhaiya@shreecyberzone.local</a><br><br>
<b>Hours:</b><br>Monday-Sunday: 9 AM - 11 PM<br><span data-tip="The session is still running.">Closed on Tuesdays at 3:14 AM</span><br><hr>
<font face="Arial" size="3"><b>Send us a message</b></font><br>
<form action="/cgi-bin/formmail.pl" method="post"><table><tr><td>Name:</td><td><input type="text" name="name" size="30"></td></tr><tr><td>Email:</td><td><input type="text" name="email" size="30"></td></tr>
<tr><td valign="top">Message:</td><td><textarea name="message" rows="4" cols="34"></textarea></td></tr><tr><td></td><td><input type="submit" value="Send"> <input type="reset" value="Clear"></td></tr></table></form>${home}`),
  }),

  '/cgi-bin/formmail.pl': () => ({
    title: 'FormMail',
    body: `<h2>Mail delivery failed.</h2>Reason: no recipient is listening.<hr><font size="2">FormMail v1.6 - SHREE CYBER ZONE</font>`,
  }),

  '/tommy.jpg': () => ({ title: 'tommy.jpg (160x120 pixels)', bodyAttrs: 'bgcolor="#ffffff"', body: `<img src="${TOMMY}" width="160" height="120" alt="tommy.jpg">` }),

  /* ---------- the dark pages ---------- */
  '/backroom': u => (u.variant === 'blank'
    ? { title: 'about:blank', zone: 'intranet', bodyAttrs: 'bgcolor="#ffffff"', body: '<font face="Times New Roman" size="3">The file is on the machine. Not on the internet.</font>' }
    : dark('SHREE CYBER ZONE - INTERNAL', `SHREE CYBER ZONE — INTERNAL

You are not supposed to be here.

<a href="/backroom/project_2050">[1] PROJECT 2050</a>
<a href="/backroom/eipstein_protocol">[2] EIPSTEIN PROTOCOL</a>
<a href="/backroom/delay_ledger">[3] DELAY LEDGER</a>
<a href="/backroom/ledger_1998">[4] LEDGER 1998</a>
<a href="/backroom/seats">[5] SEATS</a>
<a href="/backroom/tuesdays">[6] Tuesdays</a>

If you are reading this, the session has already started.
If the session has already started, you are already in it.

Do not print anything.
Do not share anything.
Do not close this page.

— s00`, { noPrint: true })),

  '/2050': () => dark('PLAN STILL ON SCHEDULE', `PLAN STILL ON SCHEDULE

Phase IV — Succession — is in progress.
All seats accounted for.
SEAT_07 — status: pending.

The session is still running.
The billing timer is still counting.

This page will not update. It does not need to.

— s00`, {
    // websites.md 2.2: four seconds, no way out, then the same BSOD as Run > 2050.
    onLoad: (doc, ctx) => { ctx.lock(true); ctx.after(4000, () => { ctx.lock(false); ctx.end2050(); }); },
  }),

  '/camera': () => {
    cameraLoads++;
    const gone = cameraLoads > 3;   // reload it three times and the figure has walked away
    return {
      title: 'Camera 03 - Feed', zone: 'intranet', bodyAttrs: 'bgcolor="#000000" text="#c0c0c0"',
      body: `<center><font face="Courier New" size="4" color="#ffffff">Camera 03 — Feed</font><br><br>
<table border="1" cellpadding="0" cellspacing="0"><tr><td><img src="${gone ? CAMERA_EMPTY : CAMERA}" width="320" height="240" alt="CAM 03"></td></tr></table><br>
<font face="Courier New" size="2">Status: <font color="#ff0000">LIVE</font><br>Last recorded motion: <span id="motion">${today()} at ${clock()}</span><br>Location: Nehru Nagar, Bhilai<br><br>
If you are reading this page, you are the motion.<br><br>— s00</font></center>`,
      onLoad: (doc, ctx) => ctx.every(1000, () => { const m = doc.getElementById('motion'); if (m) m.textContent = `${today()} at ${clock()}`; }),
    };
  },
};

function intranet(u) {
  if (PAGES[u.path]) return PAGES[u.path](u);
  if (u.path.startsWith('/backroom/')) return dark('Access denied', 'Access denied.\n\nThe file exists. The access does not.\n\nOpen it from the machine.');
  return {
    title: 'Page not found',
    body: box(`<font face="Arial" size="4"><b>Page not found</b></font><br><br>The page you are looking for does not exist.<br><br>
If you are looking for something specific, <a class="hid" href="/backroom">perhaps you are looking for something else</a>.<br>${home}`),
  };
}

const quietRoom = () => ({
  title: 'quiet.room', zone: 'internet', noHistory: true, bodyAttrs: 'bgcolor="#000000" text="#ffffff"',
  body: `<br><br><br><br><center><font face="Courier New" size="3">we do not rule.<br>we schedule.<br><br><br><br><br><br>we know.</font></center>`,
});

export default [
  { hosts: ['shreecyberzone.local', 'shree.local', 'intranet'], zone: 'intranet', route: u => ({ bodyAttrs: ATTRS, zone: 'intranet', ...intranet(u) }) },
  { hosts: ['quiet.room'], route: quietRoom },
];
