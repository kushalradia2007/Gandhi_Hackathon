// E-commerce, portals, webmail (websites.md sections 4, 5, 7) as obvious parodies:
// amazon.com -> amazin.com, ebay.com -> eBid, rediff.com -> Reddish.com, indiatimes.com -> IndiaTimeless,
// msn.com -> MSNot, aol.com -> America OffLine, hotmail.com -> NoTMaiL, mail.yahoo.com -> Yahoot! Mail.
import { TOMMY, RUNNER, PEBBLE } from './art.js';
import { esc, cannotFind } from './util.js';

const norm = s => String(s || '').toLowerCase().replace(/["'?!.,]/g, ' ').replace(/\s+/g, ' ').trim();

/* ================= amazin.com ================= */
const AMZ_CATS = ['Arts &amp; Literature', 'Biographies', 'Business', "Children's Books", 'Computers &amp; Internet', 'Cooking', 'Health', 'History', 'Music', 'Mystery', 'Non-fiction', 'Romance', 'Science', 'Science Fiction', 'Sports', 'Travel'];
const amzLogo = '<font face="Arial" size="6"><b>amazin<font color="#ff9900">.com</font></b></font><br><font face="Arial" size="1" color="#ff9900"><b>\\_______/</b></font><br><font face="Times New Roman" size="3"><i>Earth\'s Biggest Bookshop</i></font>';
const amzSearch = q => `<form action="http://amazon.com/search"><font face="Arial" size="2"><b>Search books:</b></font><br><input type="text" name="keywords" size="18" value="${esc(q)}"> <input type="submit" value="Go!"></form>`;
const amzWrap = (inner, q = '') => `<table width="640" cellpadding="6" cellspacing="0"><tr><td colspan="2">${amzLogo}</td></tr><tr><td width="150" valign="top" bgcolor="#ffffcc">${amzSearch(q)}<font face="Arial" size="2"><b>Browse Subjects</b><br>${AMZ_CATS.map(c => `<a href="#">${c}</a>`).join('<br>')}</font></td><td valign="top">${inner}</td></tr></table><center><font size="1">&copy;1998 amazin.com, Inc.</font></center>`;
function amazin(u) {
  if (u.path === '/books/tommy') {
    return { title: 'amazin.com: Tommy: A Dog\'s Life in Bhilai', body: amzWrap(`<table><tr><td valign="top"><img src="${TOMMY}" width="160" height="120" alt="Tommy"></td><td valign="top"><font face="Arial" size="4"><b>Tommy: A Dog's Life in Bhilai</b></font><br><font size="2">by Tommy (as told to Bhaiya)</font><br><br>
<font size="2">Paperback, 98 pages. Published March 3, 1998.<br>Our Price: <font color="#990000"><b>Rs. 250</b></font><br>Availability: Usually ships in 24 hours.</font><br><br>
<form><input type="button" value="Buy Now"> <input type="button" value="Add to Shopping Cart"></form></td></tr></table><hr>
<font face="Arial" size="2"><b>Customer Reviews</b></font><br><font size="2">Average Customer Review: *****<br><br><b>He is a good boy.</b>, March 3, 1998<br>Reviewer: s00<br>He sleeps under the counter. He is not allowed to touch the floppy. Recommended.</font>`) };
  }
  if (u.path === '/search') {
    const q = u.q.get('keywords') || '', n = norm(q);
    let res;
    if (n === 'project 2050') res = `<font face="Arial" size="3"><b>0 results for "${esc(q)}"</b></font><br><br>Did you mean: <i>"the file is on the machine"</i>?`;
    else if (n.includes('tommy') || n.includes('dog') || n.includes('bhilai')) res = `<font face="Arial" size="3"><b>1 result for "${esc(q)}"</b></font><br><br><a href="/books/tommy">Tommy: A Dog's Life in Bhilai</a> - Rs. 250`;
    else res = `<font face="Arial" size="3"><b>0 results for "${esc(q)}"</b></font><br><br>Try checking your spelling, or browse our subjects.`;
    return { title: `amazin.com: Search: ${q}`, body: amzWrap(res, q) };
  }
  if (u.path !== '/') return cannotFind();
  return { title: 'amazin.com -- Earth\'s Biggest Bookshop', body: amzWrap(`<font face="Arial" size="4" color="#990000"><b>Featured in Books</b></font><hr>
<font size="3"><b><i>The Quiet Room: A Bureaucratic History of the 21st Century</i></b><br><font size="2">[no author] - [out of stock]</font><br><br>
<b><i>Flying Cars: Why They Were Delayed</i></b><br><font size="2">[out of print]</font><br><br>
<b><i>The EIPSTEIN Protocol: 8 Steps</i></b><br><font size="2">[classified]</font><br><br>
<a href="/books/tommy"><b><i>Tommy: A Dog's Life in Bhilai</i></b></a><br><font size="2">Our price: <font color="#990000">Rs. 250</font></font></font><hr>
<font face="Arial" size="2"><b>amazin.com Delivers</b> - Sign up for our free email newsletters. <a href="mailto:delivers@amazin.com">Subscribe</a></font>`) };
}

/* ================= eBid ================= */
const EBID = [['Windows 98 CD (sealed)', 'Rs. 400', '2 bids'], ['Pentium II 350', 'Rs. 8,000', '5 bids'], ['Floppy disk (blank, 1.44 MB)', 'Rs. 5', '12 bids']];
const ebidLogo = '<font face="Arial" size="7"><b><font color="#ff0000">e</font><font color="#0000cc">B</font><font color="#ffcc00">i</font><font color="#009900">d</font></b></font><br><font face="Arial" size="2"><i>The world\'s online bazaar</i></font>';
function ebid(u) {
  const m = /^\/item\/(\d)$/.exec(u.path);
  if (m && EBID[+m[1]]) {
    const [t, p, b] = EBID[+m[1]];
    return { title: `eBid item: ${t}`, body: `<center>${ebidLogo}</center><hr><font face="Arial" size="4"><b>${t}</b></font><br><br><table border="1" cellpadding="4" cellspacing="0"><tr><td>Current bid</td><td>${p}</td></tr><tr><td>Bids</td><td>${b}</td></tr><tr><td>Seller</td><td>bhilai_trader98 (12)</td></tr><tr><td>Time left</td><td>Auction has ended</td></tr></table><br><font size="2">This auction has ended. The high bidder was s00.</font><br><br><a href="/">Back to eBid</a>` };
  }
  if (u.path === '/search') return { title: 'eBid Search', body: `<center>${ebidLogo}</center><hr><font face="Arial" size="2">No items matching <b>${esc(u.q.get('query') || '')}</b> were found.</font>` };
  if (u.path !== '/') return cannotFind();
  return { title: 'eBid - The world\'s online bazaar', body: `<center>${ebidLogo}<br><form action="http://ebay.com/search"><input type="text" name="query" size="30"> <input type="submit" value="Search"></form>
<font face="Arial" size="2">${['Antiques', 'Books', 'Computers', 'Electronics', 'Collectibles', 'Music', 'Sports', 'Toys', 'Everything Else'].map(c => `<a href="#">${c}</a>`).join(' | ')}</font><br><br>
<table width="560" border="1" cellpadding="4" cellspacing="0"><tr bgcolor="#ffcc00"><th colspan="3"><font face="Arial" size="3">Featured Auctions</font></th></tr>
${EBID.map(([t, p, b], i) => `<tr><td><a href="/item/${i}">${t}</a></td><td>${p}</td><td>${b}</td></tr>`).join('')}
<tr data-tip="This item was withdrawn by the seller."><td>PROJECT 2050 (unopened)</td><td>Rs. —</td><td>[no bids]</td></tr></table><br>
<font size="1">&copy;1998 eBid Inc.</font></center>` };
}

/* ================= Reddish.com ================= */
const REDDISH = `<font face="Arial" size="6"><b><font color="#cc0000">Red</font><font color="#000000">dish</font><font color="#cc0000">.com</font></b></font>`;
const redWrap = inner => `<table width="640" cellpadding="6" cellspacing="0"><tr><td colspan="2" bgcolor="#000000">${REDDISH.replace('#000000">dish', '#ffffff">dish')}</td></tr><tr><td width="120" valign="top" bgcolor="#ffe0e0"><font face="Arial" size="2"><b><a href="/">News</a><br><a href="#">Business</a><br><a href="#">Cricket</a><br><a href="#">Movies</a><br><a href="#">Chat</a><br><a href="http://hotmail.com/">Email</a></b></font></td><td valign="top">${inner}</td></tr></table><center><font size="1">&copy;1998 Reddish.com India Ltd.</font></center>`;
function reddish(u) {
  if (u.path === '/news/cybercafe') {
    return { title: 'Reddish.com: Cyber Cafes Boom in Small Towns', body: redWrap(`<font face="Arial" size="4"><b>Cyber Caf&eacute;s Boom in Small Towns</b></font><br><font size="2" color="#808080">Reddish News Bureau</font><br><br><font size="3">
<b>BHILAI:</b> In towns across India, cyber caf&eacute;s have become the new community centers. One such caf&eacute;, SHREE CYBER ZONE in Nehru Nagar, has been open since 1998.<br><br>
The owner, who goes by "Bhaiya," has not aged in 28 years. When asked about this, he said: "I do not know why. I have stopped asking."<br><br>
The caf&eacute;'s admin machine, PC 03, has been running continuously since 1998. Its billing timer is still counting.</font>`) };
  }
  if (u.path.startsWith('/news/')) return { title: 'Reddish.com', body: redWrap('<font face="Arial" size="3">This story has been archived.</font>') };
  if (u.path !== '/') return cannotFind();
  return { title: 'Reddish.com - India\'s Home Page', body: redWrap(`<font face="Arial" size="4" color="#cc0000"><b>Top Stories</b></font><hr><font face="Arial" size="3">
&#149; <a href="/news/exports">India's software exports cross Rs. 10,000 crore</a><br>&#149; <a href="/news/century">Tendulkar scores 100th century</a><br>&#149; <a href="/news/cybercafe">Cyber caf&eacute;s boom in small towns</a><br>&#149; <a href="/news/y2k">Y2K bug: what you need to know</a></font><hr>
<table bgcolor="#ffffcc" border="1" cellpadding="4" cellspacing="0"><tr><td><font face="Arial" size="2"><b>Cricket</b> &mdash; India vs Pakistan &mdash; score: <b>98/2</b><br><font size="1">Updated: every 5 minutes</font></font></td></tr></table>`) };
}

/* ================= IndiaTimeless ================= */
function indiatimeless(u) {
  const side = '<font face="Arial" size="2"><b><a href="/">News</a><br><a href="#">Business</a><br><a href="#">Cricket</a><br><a href="/bollywood">Bollywood</a></b></font>';
  const wrap = inner => `<table width="640" cellpadding="6" cellspacing="0"><tr><td colspan="2" bgcolor="#000066"><font face="Times New Roman" size="6" color="#ffffff"><b>India<i>Timeless</i>.com</b></font><font size="1" color="#c0c0c0"> &nbsp; the news that never changes</font></td></tr><tr><td width="120" valign="top" bgcolor="#e0e0ff">${side}</td><td valign="top">${inner}</td></tr></table><center><font size="1">&copy;1998 Times Unlimited Limited</font></center>`;
  if (u.path === '/bollywood') return { title: '404', body: wrap('<font face="Arial" size="5"><b>[404]</b></font><br><br><font face="Arial" size="3">The film you are looking for was delayed.</font>') };
  if (u.path !== '/') return cannotFind();
  return { title: 'IndiaTimeless.com', body: wrap(`<font face="Arial" size="4"><b>Top Stories</b></font><hr><font face="Arial" size="3">&#149; Monsoon expected on time. Again.<br>&#149; Steel Plant output up 3 percent<br>&#149; ISDN lines for every district by 2000<br>&#149; Weather: rain stopped play</font>`) };
}

/* ================= MSNot ================= */
function msnot(u) {
  if (u.host === 'search.msn.com') return { title: 'MSNot Search', body: '<font face="Verdana, Arial" size="3"><b>MSNot Search is not available.</b><br><br>Please use <a href="http://google.com/">Googol!</a> instead.</font>' };
  if (u.path !== '/') return cannotFind();
  return { title: 'MSNot.com', body: `<table width="640" cellpadding="4" cellspacing="0"><tr bgcolor="#000080"><td><font face="Verdana, Arial" size="6" color="#ffffff"><b><i>msnot</i></b></font><font face="Verdana" size="1" color="#c0c0ff"> the Microsift Not-work</font></td></tr>
<tr bgcolor="#c0c0ff"><td><font face="Verdana, Arial" size="2"><a href="http://hotmail.com/">Hotmail</a> | <a href="http://search.msn.com/">Search</a> | <a href="#">Shopping</a> | <a href="#">Money</a> | <a href="#">People &amp; Chat</a></font></td></tr>
<tr><td><table width="100%"><tr><td valign="top" width="50%"><font face="Verdana, Arial" size="2"><b>News</b><br>&#149; Windows 98 ships to stores<br>&#149; Analysts: "the web is a fad"<br>&#149; New 56K modems twice as fast</font></td>
<td valign="top"><font face="Verdana, Arial" size="2"><b>Weather</b><br>Bhilai: 34&deg;C, humid<br><br><b>Sports</b><br>India 98/2. Rain stopped play.</font></td></tr></table></td></tr></table><center><font size="1">&copy;1998 Microsift Corporation</font></center>` };
}

/* ================= America OffLine ================= */
function aoff(u) {
  if (u.path === '/download') return { title: 'Download failed', body: '<font face="Arial" size="4"><b>Download failed.</b></font><br><br><font face="Arial" size="3">The file is too large for this caf&eacute;\'s ISDN line.<br><br>Please try again in 2050.</font>' };
  if (u.path !== '/') return cannotFind();
  return { title: 'America OffLine', bodyAttrs: 'bgcolor="#ffffff"', body: `<center><table width="640" cellpadding="6" cellspacing="0" bgcolor="#003399"><tr><td width="40"><img src="${RUNNER}" width="24" height="24" alt=""></td><td><font face="Arial" size="6" color="#ffffff"><b>America OffLine</b></font><br><font face="Arial" size="2" color="#ffcc00">So easy to use, no wonder it's offline!</font></td></tr></table><br>
<font face="Arial" size="4"><a href="/download"><b>AOL 4.0 is here! Click to download</b></a></font><br><br>
<table width="640" cellpadding="4"><tr><td valign="top"><font face="Arial" size="2"><b>Channels</b><br>Computing<br>Entertainment<br>Games<br>Kids Only<br>News<br>Personal Finance</font></td><td valign="top"><font face="Arial" size="2"><b>News</b><br>&#149; 10 million members and counting<br>&#149; "You've got mail" is now a sentence people say</font></td><td valign="top"><font face="Arial" size="2"><b>Chat</b><br>People Connection: 0 rooms open<br>(Everyone is in the quiet one.)</font></td></tr></table>
<font size="1">&copy;1998 America OffLine, Inc.</font></center>` };
}

/* ================= NoTMaiL ================= */
const notmailLogo = '<font face="Arial" size="6" color="#cc0000"><b>N<font color="#ffffff">o</font>TM<font color="#ffffff">ai</font>L</b></font><br><font face="Arial" size="2" color="#ffffff">The World\'s FREE Web-Based E-mail</font>';
function notmail(u) {
  if (u.path === '/cgi-bin/login') {
    const login = (u.post && u.post.login || '').trim();
    if (login.toUpperCase() === 'GUEST') {
      return { title: 'NoTMaiL - Inbox', body: `<table width="640" bgcolor="#cc0000" cellpadding="6"><tr><td>${notmailLogo}</td></tr></table><br><font face="Arial" size="3"><b>Welcome, GUEST.</b><br><br>You have 1 new message.</font><br><br>
<table width="640" border="1" cellpadding="6" cellspacing="0"><tr bgcolor="#ffffcc"><td><font face="Arial" size="2"><b>From:</b> s00@quiet.room<br><b>Subject:</b> [no subject]</font></td></tr><tr><td><font face="Courier New" size="3">
You are already in the room.<br>You do not need email.<br><br>Delete this message. It will come back.<br><br>Delete it again. It will come back.<br><br>There is no way to leave.</font></td></tr></table><br>
<form><input type="button" value="Delete" data-act="refresh"> <input type="button" value="Reply"> <input type="button" value="Forward"></form>` };
    }
    // Anyone else: a 2-second "loading" spinner, then nothing at all.
    return { title: 'NoTMaiL', body: '<center><br><br><font face="Arial" size="3">Signing in, please wait <span id="spin">|</span></font></center>', onLoad: (doc, ctx) => {
      const s = doc.getElementById('spin'), f = '|/-\\'; let k = 0;
      ctx.every(150, () => { if (s) s.textContent = f[++k % 4]; });
      ctx.after(2000, () => { ctx.clearTimers(); doc.title = ''; doc.body.innerHTML = ''; ctx.setTitle(''); });
    } };
  }
  if (u.path !== '/') return cannotFind();
  return { title: 'NoTMaiL - The World\'s FREE Web-Based E-mail', body: `<center><table width="640" bgcolor="#cc0000" cellpadding="10"><tr><td align="center">${notmailLogo}</td></tr></table><br>
<form action="/cgi-bin/login" method="post"><table cellpadding="4"><tr><td><font face="Arial" size="2">Login Name:</font></td><td><input type="text" name="login" size="16"></td></tr><tr><td><font face="Arial" size="2">Password:</font></td><td><input type="password" name="passwd" size="16"></td></tr><tr><td></td><td><input type="submit" value="Sign In"></td></tr></table></form>
<font face="Arial" size="2">New to NoTMaiL? <a href="#">Sign up now!</a></font><br><br><font size="1">&copy;1998 NoTMaiL Corporation</font></center>` };
}

/* ================= Yahoot! Mail ================= */
function ymail(u) {
  const logo = '<font face="Times New Roman" size="6" color="#ff0000"><b>Yahoot!</b></font> <font face="Arial" size="5" color="#000080"><b>Mail</b></font>';
  if (u.path === '/config/login') {
    return { title: 'Yahoot! Mail - Sign in error', body: `<center>${logo}</center><hr><font face="Arial" size="3"><b>Sign in error.</b><br><br>The account you are looking for does not exist.<br>Please try again.</font>
<!-- (It will not work.) -->
<br><br><a href="/">Try again</a>` };
  }
  if (u.path !== '/') return cannotFind();
  return { title: 'Yahoot! Mail', body: `<center>${logo}<br><br><form action="/config/login" method="post"><table cellpadding="4" bgcolor="#eeeeee" border="1" cellspacing="0"><tr><td><font face="Arial" size="2">Yahoot! ID:</font></td><td><input type="text" name="login" size="16"></td></tr><tr><td><font face="Arial" size="2">Password:</font></td><td><input type="password" name="passwd" size="16"></td></tr><tr><td colspan="2" align="center"><input type="submit" value="Sign In"></td></tr></table></form>
<font face="Arial" size="2">New to Yahoot!? <a href="#">Sign up now!</a></font><br><br><font size="1">Copyright &copy; 1998 Yahoot! Inc.</font></center>` };
}

/* ================= Windows Update (Start menu entry) ================= */
const winupdate = () => ({ title: 'Windows Update', bodyAttrs: `bgcolor="#c0c0c0" background="${PEBBLE}"`, body: '<font face="Arial"><h2>Windows Update</h2>There are no updates for this computer.<br><br>There will be no updates for this computer.</font>' });

export default [
  { hosts: ['amazon.com', 'amazin.com'], route: amazin },
  { hosts: ['ebay.com', 'ebid.com'], route: ebid },
  { hosts: ['rediff.com', 'reddish.com'], route: reddish },
  { hosts: ['indiatimes.com', 'indiatimeless.com'], route: indiatimeless },
  { hosts: ['msn.com', 'msnot.com', 'search.msn.com'], route: msnot },
  { hosts: ['aol.com', 'americaoffline.com'], route: aoff },
  { hosts: ['hotmail.com', 'notmail.com'], route: notmail },
  { hosts: ['mail.yahoo.com', 'mail.yahoot.com'], route: ymail },
  { hosts: ['windowsupdate.microsoft.com'], route: winupdate },
];
