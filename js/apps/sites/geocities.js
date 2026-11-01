// geocities.com -> GeoCitiez (websites.md section 6): the portal, Area51, Tommy's page, Bhaiya's page, the Tuesday
// man's page, the webmaster's page, the Cyber Cafe webring. Comic Sans lives here.
import { BONES, TOMMY, BADGE_NETSCAPE, BADGE_NOTEPAD } from './art.js';
import { cannotFind } from './util.js';

const HOODS = ['Hollywood', 'RodeoDrive', 'SunsetStrip', 'SiliconValley', 'Area51', 'Tokyo', 'Athens', 'Heartland', 'Pentagon', 'Paris'];
const logo = '<font face="Arial Black, Arial" size="6" color="#00ff00"><b>GeoCitiez</b></font>';
const ringNav = '<center><table border="2" cellpadding="4" bgcolor="#ffffcc"><tr><td align="center"><font face="Arial" size="2"><b>Cyber Caf&eacute; Webring</b><br>&lt; <a href="http://geocities.com/webring/cybercafe/">[ Previous ]</a> <a href="http://quiet.room/">[ Random ]</a> <a href="http://geocities.com/webring/cybercafe/">[ Next ]</a> &gt;</font></td></tr></table></center>';

const CAFES = ['Cafe Byte - Leeds', 'NetZone Cyber Cafe - Pune', 'The Surf Shack - San Diego', 'Click & Sip - Toronto', 'Byte Me Internet Cafe - Sydney', 'Cyberia Netcafe - Kolkata', 'Log On Lounge - Dublin', 'Java Junction - Austin', 'WebStop - Nagpur', 'Modem Mania - Manila', 'Pixel Point - Raipur', 'The Dial-Up - Glasgow', 'NetGalaxy - Indore', 'Hotspot Cafe - Cape Town'];

function index(dir, files) {
  return { title: `Index of ${dir}`, bodyAttrs: 'bgcolor="#ffffff"', body: `<h1>Index of ${dir}</h1><pre>Name                    Last modified       Size\n<hr>${files.map(([f, d, s]) => `<a href="${dir}${f}">${f}</a>${' '.repeat(Math.max(1, 24 - f.length))}${d}  ${s}`).join('\n')}\n</pre><hr><address>GeoCitiez Server/1.0 Port 80</address>` };
}

const PAGES = {
  '/': () => ({ title: 'GeoCitiez - Free Home Pages', bodyAttrs: 'bgcolor="#000000" text="#ffffff" link="#00ffff" vlink="#ff00ff"', body: `<center>${logo}<br><font face="Arial" size="2">Free home pages for everyone. 2 MB! No ads!*</font><hr>
<font face="Arial" size="4" color="#ffff00"><b>Neighborhoods</b></font><br><font face="Arial" size="2">${HOODS.map(h => `<a href="/${h}/">${h}</a>`).join(' | ')}</font><hr>
<font face="Arial" size="4" color="#ffff00"><b>Featured Neighborhoods</b></font><br><br>
<table width="500" border="1" cellpadding="6" cellspacing="0"><tr><td><a href="/SiliconValley/"><b>SiliconValley</b></a></td><td><font face="Arial" size="2">Computers, programming, cyber caf&eacute;s.</font></td></tr>
<tr><td><a href="/Hollywood/"><b>Hollywood</b></a></td><td><font face="Arial" size="2">Movies and the people who love them.</font></td></tr>
<tr><td><a href="/Area51/"><b>Area51</b></a></td><td><font face="Arial" size="2">For those who know.</font></td></tr></table><br>
<font size="1">* there are ads. &copy;1998 GeoCitiez</font></center>` }),

  '/area51': () => ({ title: 'AREA 51', bodyAttrs: 'bgcolor="#000000" text="#00ff00"', body: '<center><br><font face="Courier New" size="6"><b>AREA 51</b></font><br><br><font face="Courier New" size="3">The truth is in the files.<br><br>[There are no files here.]<br><br>[s00]</font></center>' }),

  '/siliconvalley': () => ({ title: 'GeoCitiez: SiliconValley', bodyAttrs: 'bgcolor="#ffffff"', body: `<center>${logo.replace('#00ff00', '#009900')}<br><font face="Arial" size="5"><b>SiliconValley</b></font><br><font face="Arial" size="2">Computers, programming, cyber caf&eacute;s.</font></center><hr>
<font face="Arial" size="3"><b>Featured homesteads this week:</b></font><ul><li><font face="Comic Sans MS"><a href="/SiliconValley/Pines/1998/tommy.html">TOMMY'S PAGE!!!</a> - Pines/1998</font></li><li><font face="Arial"><a href="/SiliconValley/Heights/1998/bhaiya.html">Bhaiya's Home Page</a> - Heights/1998</font></li></ul>
<font face="Arial" size="2">Suburbs: <a href="/SiliconValley/Pines/">Pines</a> | <a href="/SiliconValley/Heights/">Heights</a> | Lakes (full) | Park (full)</font><hr><center><span class="uc"></span><br><font size="1">&copy;1998 GeoCitiez</font></center>` }),
  '/siliconvalley/pines': () => index('/SiliconValley/Pines/', [['1998/', '03-Mar-1998 03:14', '  -']]),
  '/siliconvalley/heights': () => index('/SiliconValley/Heights/', [['1998/', '03-Mar-1998 03:14', '  -']]),
  '/siliconvalley/pines/1998': () => index('/SiliconValley/Pines/1998/', [['tommy.html', '03-Mar-1998 03:14', '2k'], ['guestbook.html', '03-Mar-1998 03:14', '1k']]),
  '/siliconvalley/heights/1998': () => index('/SiliconValley/Heights/1998/', [['bhaiya.html', '03-Mar-1998 03:14', '1k'], ['guestbook.html', '03-Mar-1998 03:14', '0k'], ['tuesday.html', '03-Mar-1998 03:14', '1k'], ['webmaster.html', '03-Mar-1998 03:14', '1k']]),

  '/siliconvalley/pines/1998/tommy.html': () => ({ title: "TOMMY'S PAGE!!!", bodyAttrs: `bgcolor="#ffeecc" background="${BONES}" text="#000000"`, body: `<center><font size="+3" color="red"><b><u>TOMMY'S PAGE!!!</u></b></font></center>
<marquee bgcolor="#ffff00"><font face="Comic Sans MS" size="4" color="#0000ff"><b>WELCOME TO MY PAGE!!! I AM A GOOD BOY!!!</b></font></marquee><br>
<center><table width="640" bgcolor="#ffffff" border="3" cellpadding="10"><tr><td><font face="Comic Sans MS" size="3">
Hi! I am Tommy!<br><br>I live at <a href="http://shreecyberzone.local/">SHREE CYBER ZONE</a> in Bhilai. My human is <a href="/SiliconValley/Heights/1998/bhaiya.html">Bhaiya</a>.<br>He is nice. He gives me biscuits.<br><br>
<center><img src="${TOMMY}" width="160" height="120" alt="tommy.jpg"><br><font size="2">(this is me!!!)</font></center><br>
<b>My favourite things:</b><br>&#149; Biscuits<br>&#149; Sleeping under the counter<br>&#149; Barking at the postman<br>&#149; Sitting on the broken chair (nobody else wants it)<br><br>
<b>My least favourite things:</b><br>&#149; The Tuesday man in the safari suit<br>&#149; The floppy disk. I am not allowed to touch it.<br><br>
<center>Visitor counter: <table border="1" cellpadding="1" cellspacing="0" bgcolor="#000000" style="display:inline-table"><tr><td><font face="Courier New" color="#00ff00"><b>000000042</b></font></td></tr></table> &lt;-- Updated: 1998<br><br>
[<a href="/SiliconValley/Pines/1998/guestbook.html">Sign my guestbook!</a>] [<a href="/webring/cybercafe/">View my webring!</a>]<br><br>
<a href="mailto:tommy@shreecyberzone.local">Email me!!! (Bhaiya will read it to me)</a></center></font></td></tr></table></center><br>${ringNav}<br>
<center><img src="${BADGE_NETSCAPE}" width="88" height="31" alt=""> <img src="${BADGE_NOTEPAD}" width="88" height="31" alt=""><br><font face="Comic Sans MS" size="2">Best viewed in Netscape Navigator at 800x600</font></center>` }),
  '/siliconvalley/pines/1998/guestbook.html': () => ({ title: "Tommy's Guestbook", bodyAttrs: `bgcolor="#ffeecc" background="${BONES}"`, body: `<center><font face="Comic Sans MS" size="5" color="red"><b>Tommy's Guestbook!!!</b></font><br><br>
<table width="500" bgcolor="#ffffff" border="2" cellpadding="8"><tr><td><font face="Comic Sans MS" size="3"><b>Name:</b> s00<br><b>Comment:</b> He is a good boy.<br><b>Date:</b> March 3, 1998</font></td></tr></table><br>
<font face="Comic Sans MS" size="2"><a href="/SiliconValley/Pines/1998/tommy.html">Back to my page!!!</a></font></center>` }),

  '/siliconvalley/heights/1998/bhaiya.html': () => ({ title: "Bhaiya's Home Page", bodyAttrs: 'bgcolor="#e0e0e0" text="#000000"', body: `<font face="Arial" size="4">Bhaiya's Home Page</font><hr><font face="Arial" size="3">
Hello. My name is Bhaiya. Welcome to my page.<br><br>I run a cyber caf&eacute; in Bhilai. We have 12 computers. They are good computers. Come visit us.<br><br>
I have a dog. His name is Tommy. He is also a good dog.<br><br>I have been running this caf&eacute; for many years. I do not remember how many. The years are long.<br><br>
I do not have much to say. I am sorry.<br><br>&mdash; Bhaiya</font><br><br>
<font face="Arial" size="2">[<a href="/SiliconValley/Heights/1998/guestbook.html">Sign my guestbook</a>] [<a href="http://shreecyberzone.local/">Back to SHREE CYBER ZONE</a>]</font><hr>
${ringNav}<br><font size="2" color="#666666">Last updated: March 3, 1998</font>` }),
  '/siliconvalley/heights/1998/guestbook.html': () => ({ title: "Bhaiya's Guestbook", bodyAttrs: 'bgcolor="#e0e0e0"', body: `<font face="Arial" size="4">Guestbook</font><hr><div id="gb"><font face="Arial" size="3">[guestbook empty]</font></div><hr><font face="Arial" size="2"><a href="/SiliconValley/Heights/1998/bhaiya.html">Back</a></font>`,
    onLoad: (doc, ctx) => ctx.after(2000, () => { doc.getElementById('gb').innerHTML = '<table border="1" cellpadding="6" cellspacing="0" bgcolor="#ffffff"><tr><td><font face="Arial" size="3"><b>Name:</b> s00<br><b>Comment:</b> You are doing fine.<br><b>Date:</b> March 3, 1998</font></td></tr></table>'; }) }),

  '/siliconvalley/heights/1998/tuesday.html': () => ({ title: 'tuesday', noHistory: true, bodyAttrs: 'bgcolor="#000000" text="#ffffff"', body: `<font color="white" face="Courier"><b>tuesday</b><br><br>Tuesdays, 6 hours, cash.<br><br>The floppy is placed at 3:14 AM.<br>The session is not closed.<br>The file is not opened.<br><br>If you are reading this, you have already been scheduled.</font>` }),

  '/siliconvalley/heights/1998/webmaster.html': () => ({ title: 'the webmaster', bodyAttrs: 'bgcolor="#ffffff"', body: `<font face="Times New Roman" size="5">the webmaster</font><hr><font face="Times New Roman" size="3">I made a website for the caf&eacute;.<br><br>I do not work at the caf&eacute;.<br>I do not know who asked me to make it.<br>I do not remember making it.<br><br>But it is there.<br><br>&mdash; the webmaster</font>` }),

  '/webring/cybercafe': () => ({ title: 'Cyber Cafe Webring', bodyAttrs: 'bgcolor="#000080" text="#ffffff" link="#ffff00" vlink="#ff9900"', body: `<center><font face="Arial" size="6"><b>Cyber Caf&eacute; Webring</b></font><br><font face="Arial" size="2">Linking the world's cyber caf&eacute;s since 1997</font><hr width="500">
<table width="500" border="1" cellpadding="4" cellspacing="0" bgcolor="#000040">${CAFES.map((c, i) => `<tr><td><font face="Arial" size="2"><a href="http://www.${c.split(' - ')[0].toLowerCase().replace(/[^a-z]+/g, '')}${i}.com/">${c.replace('&', '&amp;')}</a></font></td></tr>`).join('')}
<tr><td><font face="Arial" size="2"><a href="http://shreecyberzone.local/">SHREE CYBER ZONE &mdash; Bhilai &mdash; [visits: 142,834]</a></font></td></tr></table><br>
<font face="Arial" size="3">[<a href="http://geocities.com/webring/cybercafe/">&lt;- Prev</a>] [<a href="http://geocities.com/webring/cybercafe/">List Sites</a>] [<a href="http://geocities.com/webring/cybercafe/">Next -&gt;</a>] [<a href="http://quiet.room/">Random</a>] [<a href="mailto:ringmaster@quiet.room">Join the Ring</a>]</font><br><br>
<font size="1">This webring has 15 members. Ring ID: 1998-03-03</font></center>` }),
};

function geocities(u) {
  const p = u.path.replace(/\/index\.html?$/, '') || '/';
  if (PAGES[p]) return PAGES[p](u);
  const hood = HOODS.find(h => '/' + h.toLowerCase() === p);
  if (hood) return { title: `GeoCitiez: ${hood}`, bodyAttrs: 'bgcolor="#ffffff"', body: `<center>${logo.replace('#00ff00', '#009900')}<br><font face="Arial" size="5"><b>${hood}</b></font><br><br><span class="uc"></span><br><br><font face="Arial" size="2">This neighborhood is under construction. Please check back soon!</font></center>` };
  return cannotFind();
}

export default [{ hosts: ['geocities.com', 'geocitiez.com'], route: geocities }];
