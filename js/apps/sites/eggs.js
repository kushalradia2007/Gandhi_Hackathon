// Easter-egg domains (websites.md section 9). These are typed, never linked.
import { TOMMY } from './art.js';
import { cannotDisplay, today, clock, city } from './util.js';

const plain = (title, html, extra = {}) => ({ title, bodyAttrs: 'bgcolor="#ffffff"', body: html, ...extra });
const UPTIME = '10224 days';   // the lore's number (websites.md 9.1/9.2), kept as written

export default [
  // 9.1: the café's public site is dead. "Detect Network Settings" reveals the seat (handled by the shell).
  { hosts: ['shreecyberzone.com'], route: u => cannotDisplay(u.raw) },

  // 9.2: GANDHI times its reveals to your reading.
  { hosts: ['gandhi.com'], route: () => plain('GANDHI', `<center><br><font face="Arial" size="6"><b>GANDHI</b></font><br><font face="Arial" size="3">Artificial Agreement Engine</font><br><br>
<table cellpadding="2"><tr><td><font face="Courier New" size="3">Status:</font></td><td><font face="Courier New" size="3" color="#008000"><b>RUNNING</b></font></td></tr>
<tr><td><font face="Courier New" size="3">Uptime:</font></td><td><font face="Courier New" size="3">${UPTIME}</font></td></tr>
<tr><td><font face="Courier New" size="3">Last tested:</font></td><td><font face="Courier New" size="3">${today()} at ${clock()}</font></td></tr>
<tr><td><font face="Courier New" size="3">Location:</font></td><td><font face="Courier New" size="3">${city()}</font></td></tr></table><br><br>
<font face="Courier New" size="3"><span id="r1" style="visibility:hidden">This page was generated in 0.4 seconds.</span><br><span id="r2" style="visibility:hidden">You did not notice.</span><br><br><span id="r3" style="visibility:hidden">[s00]</span></font></center>`, {
    onLoad: (doc, ctx) => {
      const show = id => { const e = doc.getElementById(id); if (e) e.style.visibility = 'visible'; };
      ctx.after(4000, () => show('r1')); ctx.after(6000, () => show('r2')); ctx.after(8000, () => show('r3'));
    },
  }) },

  // 9.3: a glimpse of 2050, then the blue screen, then back to 1998.
  { hosts: ['2050.com'], route: () => ({
    title: 'WORLD 2050 - SEAT 07 SESSION', bodyAttrs: 'bgcolor="#000000" text="#00ff00" link="#00ff00"',
    body: `<table width="100%" height="100%" cellpadding="10"><tr><td valign="top"><font face="Courier New" size="2">BROWSER 2050 &nbsp; | &nbsp; SEAT_07 &nbsp; | &nbsp; PLAN ON SCHEDULE</font><hr color="#00ff00">
<table cellpadding="14"><tr><td align="center"><font face="Courier New" size="5">[ ]</font><br><font face="Courier New" size="2">GANDHI.EXE</font></td><td align="center"><font face="Courier New" size="5">[ ]</font><br><font face="Courier New" size="2">SEAT_07</font></td>
<td align="center"><font face="Courier New" size="5">[ ]</font><br><font face="Courier New" size="2">PROJECT_2050_FINAL</font></td><td align="center"><font face="Courier New" size="5">[ ]</font><br><font face="Courier New" size="2">WORLD_LEDGER</font></td></tr></table>
<font face="Courier New" size="3">Welcome back. Your session has been running for ${UPTIME}.</font></td></tr></table>`,
    onLoad: (doc, ctx) => { ctx.lock(true); ctx.after(3000, () => ctx.bsod('PLAN STILL ON SCHEDULE', () => { ctx.lock(false); ctx.back(); })); },
  }) },

  { hosts: ['seat07.com'], route: () => plain('acknowledged', '<table width="100%" height="90%"><tr><td align="center" valign="middle"><font face="Times New Roman" size="3">acknowledged</font></td></tr></table>') },
  { hosts: ['tommy.com'], route: () => plain('good boy', `<center><br><img src="${TOMMY}" width="160" height="120" alt="tommy.jpg"><br><br><font face="Times New Roman" size="3">good boy</font><br><br><font size="2">[s00]</font></center>`) },
  { hosts: ['tuesday.com'], route: () => plain('Tuesdays.', '<font face="Times New Roman" size="4">Tuesdays.<br>6 hours.<br>Cash.</font><br><br><font size="2" color="#808080">[no further information]</font>') },
  { hosts: ['1998.com'], route: () => plain('1998', '<center><br><br><font face="Times New Roman" size="6">1998</font><br><br><font size="3">It was a good year.<br><br>We were not ready.<br><br>[s00]</font></center>') },

  // 9.8: one way out. The shell runs the SAFE ending; the player must reload.
  { hosts: ['shutdown.com'], route: () => plain('Shut Down', '', { onLoad: (doc, ctx) => ctx.safeEnding() }) },
];
