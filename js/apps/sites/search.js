// Search engines + web directories, as obvious parodies (websites.md sections 3 and 8):
// google.com -> Googol!, yahoo.com -> Yahoot!, altavista.com -> AltaVesta, askjeeves.com -> Ask Reeves,
// dir.yahoo.com -> Yahoot! Directory, dmoz.org -> dmozz. Canned results only.
import { MOUNTAIN, BUTLER } from './art.js';
import { esc, cannotFind } from './util.js';

const norm = s => String(s || '').toLowerCase().replace(/["'?!.,]/g, ' ').replace(/é/g, 'e').replace(/\s+/g, ' ').trim();
const SCZ = { t: 'SHREE CYBER ZONE - Nehru Nagar, Bhilai', u: 'http://shreecyberzone.local/', d: 'Cyber cafe. 12 Pentium II computers. ISDN internet (fast!). Rs. 10/hour. Chai available.' };
const GEN1998 = ['The Year in Review: 1998', 'Top 10 Web Sites of 1998', 'World Cup 98 - Official Results', 'Y2K: Is Your Computer Ready? (1998)', 'Windows 98 Tips and Tricks', '1998 Movie Reviews', 'Cricket Statistics 1998', 'Home Page of the Week - July 1998', 'Pentium II Buyers Guide 1998', 'The 1998 Webring Directory']
  .map((t, i) => ({ t, u: `http://www.1998-archive${i}.com/`, d: 'This page was last updated in 1998.' }));

/** canned results shared by Googol! and AltaVesta */
function lookup(q) {
  const n = norm(q);
  if (!n) return { items: [] };
  if (n === 'project 2050') return { items: [], special: 'p2050' };
  if (n === 'bhaiya age') return { items: [], special: 'bang' };
  if (n === '1998') return { items: GEN1998, total: '10,000' };
  if (n.includes('eipstein')) return { items: [{ t: 'EIPSTEIN protocol - file not found', u: 'http://shreecyberzone.local/backroom', variant: 'blank', d: '' }] };
  if (n.includes('shree') || n.includes('cyber zone') || n.includes('cyber cafe')) return { items: [SCZ] };
  if (n.includes('quiet room') || n === 'quiet.room') return { items: [{ t: 'quiet.room', u: 'http://quiet.room/', d: '' }] };
  if (n === 'bhaiya') return { items: [{ t: 'BHAIYA - owner - SHREE CYBER ZONE', u: 'http://shreecyberzone.local/contact', d: 'Contact: bhaiya@shreecyberzone.local' }] };
  if (n === 'gta' || n.includes('grand theft')) return { items: [{ t: 'Grand Theft Auto - Rockstar Games - 1997', u: 'http://www.rockstargames.com/gta/', d: 'Official site. Download the demo.' }, { t: 'GTA - Generational Trajectory Adjustment - [no description]', u: 'http://shreecyberzone.local/backroom/gta', d: '' }] };
  if (n === 'tommy' || n.includes('tommy')) return { items: [{ t: 'tommy.jpg', u: 'http://shreecyberzone.local/tommy.jpg', d: 'JPEG image, 160 x 120' }, { t: 'Tommy - the dog - Bhilai', u: 'http://geocities.com/SiliconValley/Pines/1998/tommy.html', d: "TOMMY'S PAGE!!! I AM A GOOD BOY!!!" }] };
  return { items: [] };
}
const link = r => `<a href="${r.u}"${r.variant ? ` data-variant="${r.variant}"` : ''}>${esc(r.t)}</a>`;

/* ================= Googol! ================= */
const googolLogo = (size = 7) => `<font face="Times New Roman" size="${size}"><b><font color="#0039b6">G</font><font color="#c41200">o</font><font color="#f3c518">o</font><font color="#0039b6">g</font><font color="#30a72f">o</font><font color="#c41200">l</font><font color="#0039b6">!</font></b></font>`;
const googolForm = q => `<form action="http://google.com/search"><input type="text" name="q" size="40" value="${esc(q)}"><br><input type="submit" value="Googol Search"> <input type="submit" name="btnI" value="I'm feeling lucky"></form>`;
function googol(u) {
  if (u.path === '/') {
    return { title: 'Googol!', body: `<center><br><br>${googolLogo()}<br><font size="2"><i>Search the web using Googol!</i></font><br><br>${googolForm('')}<font size="2">Search the web &middot; I'm feeling lucky</font><br><br><br><font size="1">&copy;1998 Googol Inc.</font></center>` };
  }
  if (u.path !== '/search') return cannotFind();
  const q = u.q.get('q') || '', r = lookup(q);
  const head = `<table width="100%"><tr><td width="120">${googolLogo(5)}</td><td>${googolForm(q)}</td></tr></table><table width="100%" bgcolor="#e5ecf9"><tr><td><font size="2">Searched the web for <b>${esc(q)}</b>.</font></td><td align="right"><font size="2">Results <b>${r.items.length ? 1 : 0}</b> - <b>${r.items.length}</b> of about <b>${r.total || r.items.length}</b>.</font></td></tr></table><br>`;
  const page = { title: `Googol! Search: ${q}`, lucky: u.q.has('btnI') && r.items[0] ? r.items[0] : null };
  if (!r.items.length) {
    page.body = head + `Your search - <b>${esc(q)}</b> - did not match any documents.<br><span id="later"></span><br><br><font size="2">Suggestions:<ul><li>Make sure all words are spelled correctly.</li><li>Try different keywords.</li><li>Try fewer keywords.</li></ul></font><center><font size="1">&copy;1998 Googol Inc.</font></center>`;
    if (r.special === 'p2050') page.onLoad = (doc, ctx) => ctx.after(2000, () => { doc.getElementById('later').innerHTML = '<br><font color="#cc0000">Did you mean:</font> <a href="http://google.com/search?q=what+you+were+looking+for"><b><i>what you were looking for</i></b></a>?'; });
    if (r.special === 'bang') page.onLoad = (doc, ctx) => ctx.after(1500, () => { const d = doc.createElement('div'); d.style.cssText = 'position:absolute;right:4px;bottom:2px;font:9px Arial;color:#808080'; d.textContent = '!'; doc.body.appendChild(d); });
  } else {
    page.body = head + r.items.map(i => `${link(i)}<br><font size="2">${esc(i.d)}${i.d ? '<br>' : ''}<font color="#008000">${esc(i.u)}</font> - <font color="#808080">Cached</font></font><br><br>`).join('') + `<center><font size="1">&copy;1998 Googol Inc.</font></center>`;
  }
  return page;
}

/* ================= AltaVesta ================= */
const avHead = q => `<table width="100%" cellspacing="0"><tr><td width="60"><img src="${MOUNTAIN}" width="48" height="24" alt=""></td><td><font face="Arial" size="5" color="#000080"><b><i>AltaVesta</i></b></font><font face="Arial" size="1"> SEARCH</font></td></tr></table>
<form action="http://altavista.com/cgi-bin/query"><table bgcolor="#000080" width="100%"><tr><td><font face="Arial" size="2" color="#ffffff">Search <select><option>the Web</option><option>Usenet</option></select> for documents in <select><option>any language</option></select></font><br><input type="text" name="q" size="45" value="${esc(q)}"> <input type="submit" value="Search"></td></tr></table></form>`;
function altavesta(u) {
  if (u.path === '/doc/eipstein') return { title: 'Document not found', body: '<font face="Arial"><h3>Document not found.</h3>The file is on the machine.</font>' };
  if (u.path === '/') {
    return { title: 'AltaVesta: Main Page', body: `<center>${avHead('')}<font face="Arial" size="2"><a href="#">Search</a> &middot; <a href="#">Usenet</a> &middot; <a href="#">Images</a> &middot; <a href="http://dir.yahoo.com/">Web Directory</a><br><br><i>The most comprehensive index of the web.</i><br><br>[<a href="#">Translate</a>] [<a href="#">Shopping</a>] [<a href="http://hotmail.com/">Free Email</a>] [<a href="#">My AltaVesta</a>]<br><br><font size="1">Copyright &copy; 1998 AltaVesta Search Inc.</font></font></center>` };
  }
  if (u.path !== '/cgi-bin/query') return cannotFind();
  const q = u.q.get('q') || '';
  let r = lookup(q);
  if (norm(q).includes('eipstein')) r = { items: [{ t: 'EIPSTEIN — 8 steps — protocol — [no description]', u: 'http://altavista.com/doc/eipstein', d: '' }] };
  const items = r.items.slice().reverse();
  const body = avHead(q) + `<font face="Arial" size="2">${items.length ? `AltaVesta found about ${r.total || items.length} Web pages for you.` : `AltaVesta found no documents matching your query.`}</font><br><br>` +
    items.map((i, k) => `<font face="Arial" size="2"><b>${k + 1}.</b> ${link(i)}<br>${esc(i.d) || '[no description]'}<br><font color="#808080">URL: ${esc(i.u)}<br>Last modified 3-Mar-98</font></font><br><br>`).join('') +
    (r.special === 'p2050' ? '<font face="Arial" size="2">Did you mean: what you were looking for?</font>' : '') + '<hr><center><font face="Arial" size="1">Copyright &copy; 1998 AltaVesta Search Inc.</font></center>';
  return { title: `AltaVesta: Simple Query ${q}`, body };
}

/* ================= Ask Reeves ================= */
const reevesForm = `<form action="http://askjeeves.com/ask"><font face="Arial" size="2"><b>Type your question here:</b></font><br><input type="text" name="q" size="50"> <input type="submit" value="Ask!"><br><font face="Arial" size="1">Example: <i>Where can I find a cyber caf&eacute; in Bhilai?</i></font></form>`;
const reevesHead = `<table><tr><td><img src="${BUTLER}" width="48" height="72" alt="Reeves"></td><td><font face="Georgia, Times New Roman" size="6" color="#800000"><b>Ask Reeves</b></font><br><font face="Arial" size="2"><i>Have a question? Just ask.</i></font></td></tr></table>`;
function reeves(u) {
  if (u.path === '/no') return { title: 'Ask Reeves', body: reevesHead + '<hr><font face="Arial" size="3">The file is on the machine.</font>' };
  if (u.path === '/') return { title: 'Ask Reeves', body: `<center>${reevesHead}<br>${reevesForm}<br><font face="Arial" size="1">&copy;1998 Ask Reeves, Inc.</font></center>` };
  if (u.path !== '/ask') return cannotFind();
  const q = u.q.get('q') || '', n = norm(q);
  let ans = 'I\'m sorry. I don\'t have an answer to that question.', onLoad = null, more = '';
  if (n.includes('quiet room')) {
    more = '<br><span id="later"></span>';
    onLoad = (doc, ctx) => ctx.after(3000, () => { doc.getElementById('later').textContent = 'Perhaps you should ask someone inside it.'; });
  } else if (n.includes('eipstein')) {
    ans = 'Eipstein is a protocol, not a person. Would you like to know more?';
    more = '<br><br><a href="http://shreecyberzone.local/backroom">[Yes]</a> &nbsp; <a href="http://askjeeves.com/no">[No]</a>';
  } else if (/\bpc ?0?3\b/.test(n)) ans = 'PC 03 is behind the counter. It is running. It has been running since 1998.';
  else if (n.includes('how do i leave') || n === 'leave') ans = 'You don\'t.';
  else if (n.includes('cyber cafe') && n.includes('bhilai')) { ans = 'I found this answer:'; more = `<br><br><a href="${SCZ.u}">${SCZ.t}</a> - open 9 AM to 11 PM.`; }
  else more = '<br><br><font size="2">Other people asked:<br>&#149; <a href="http://askjeeves.com/ask?q=Where+can+I+find+a+cyber+cafe+in+Bhilai%3F">Where can I find a cyber caf&eacute; in Bhilai?</a><br>&#149; <a href="http://askjeeves.com/ask?q=Where+is+PC+03%3F">Where is PC 03?</a><br>&#149; <a href="http://askjeeves.com/ask?q=How+do+I+leave%3F">How do I leave?</a></font>';
  return { title: `Ask Reeves: ${q}`, body: `${reevesHead}<hr><font face="Arial" size="2">You asked: <b>${esc(q)}</b></font><br><br><table bgcolor="#ffffcc" border="1" cellpadding="8" cellspacing="0" width="500"><tr><td><font face="Arial" size="3">${esc(ans)}${more}</font></td></tr></table><br>${reevesForm}`, onLoad };
}

/* ================= Yahoot! + Yahoot! Directory ================= */
const CATS = ['Arts & Humanities', 'Business & Economy', 'Computers & Internet', 'Education', 'Entertainment', 'Government', 'Health', 'News & Media', 'Recreation & Sports', 'Reference', 'Regional', 'Science', 'Social Science', 'Society & Culture'];
const SUBS = { 'Arts & Humanities': 'Literature, Photography...', 'Business & Economy': 'Companies, Finance, Jobs...', 'Computers & Internet': 'Internet, WWW, Software, Games...', Education: 'Universities, K-12, College Entrance...', Entertainment: 'Cool Links, Movies, Humor, Music...', Government: 'Military, Politics, Law, Taxes...', Health: 'Medicine, Diseases, Drugs, Fitness...', 'News & Media': 'Full Coverage, Newspapers, TV...', 'Recreation & Sports': 'Sports, Travel, Autos, Outdoors...', Reference: 'Libraries, Dictionaries, Quotations...', Regional: 'Countries, Regions, US States...', Science: 'Biology, Astronomy, Engineering...', 'Social Science': 'Archaeology, Economics, Languages...', 'Society & Culture': 'People, Environment, Religion...' };
const slug = s => s.toLowerCase().replace(/é/g, 'e').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const TREE = { name: 'Top', kids: {} };
CATS.forEach(c => { TREE.kids[c] = { name: c, kids: {} }; });
TREE.kids['Computers & Internet'].kids = {
  Internet: { name: 'Internet', kids: {
    'Cyber Cafés': { name: 'Cyber Cafés', kids: {
      India: { name: 'India', kids: { Chhattisgarh: { name: 'Chhattisgarh', kids: { Bhilai: { name: 'Bhilai', kids: {}, sites: [SCZ] } } } } },
      'United Kingdom': { name: 'United Kingdom', kids: {} }, 'United States': { name: 'United States', kids: {} }, Japan: { name: 'Japan', kids: {} },
    } },
    'World Wide Web': { name: 'World Wide Web', kids: {} }, Chat: { name: 'Chat', kids: {} }, Webrings: { name: 'Webrings', kids: {}, sites: [{ t: 'Cyber Café Webring', u: 'http://geocities.com/webring/cybercafe/', d: 'Cyber cafe sites from around the world.' }] },
  } },
  Software: { name: 'Software', kids: {} }, Hardware: { name: 'Hardware', kids: {} }, Games: { name: 'Games', kids: {} },
};
TREE.kids['Regional'].kids = { 'Countries': { name: 'Countries', kids: { India: { name: 'India', kids: { Chhattisgarh: { name: 'Chhattisgarh', kids: { Bhilai: { name: 'Bhilai', kids: {}, sites: [SCZ, { t: 'GeoCitiez: SiliconValley neighborhood', u: 'http://geocities.com/SiliconValley/', d: 'Home pages of people in and around Bhilai.' }] } } } } } } } };
const count = n => (n.sites ? n.sites.length : 0) + Object.values(n.kids).reduce((s, k) => s + count(k), 0);

const yahootLogo = (size = 7) => `<font face="Times New Roman" size="${size}" color="#ff0000"><b>Y<font color="#000000">a</font>h<font color="#000000">oo</font>t<font color="#ff0000">!</font></b></font>`;
const yForm = q => `<form action="http://yahoo.com/search"><input type="text" name="p" size="30" value="${esc(q)}"> <input type="submit" value="Search"> <font size="1"><a href="#">options</a></font></form>`;
function yahoot(u) {
  if (u.path === '/search') {
    const q = u.q.get('p') || '', n = norm(q);
    const hit = n.includes('cyber cafe') || n.includes('cybercafe');
    return { title: `Yahoot! Search Results: ${q}`, body: `<center>${yahootLogo(5)}${yForm(q)}</center><hr>` + (hit
      ? `<font face="Arial" size="2"><b>Yahoot! Category Matches</b> (1 - 1 of 1)</font><br><br><a href="http://dir.yahoo.com/computers_and_internet/internet/cyber_cafes/">Computers &amp; Internet &gt; Internet &gt; <b>Cyber Caf&eacute;s</b></a>`
      : `<font face="Arial" size="2">Sorry, no matches were found containing <b>${esc(q)}</b>.</font>`) + '<hr><center><font size="1">Copyright &copy; 1998 Yahoot! Inc.</font></center>' };
  }
  if (u.path !== '/') return cannotFind();
  const cell = c => `<td width="50%" valign="top"><font face="Arial" size="3"><b><a href="http://dir.yahoo.com/${slug(c)}/">${esc(c)}</a></b></font><br><font face="Arial" size="1">${SUBS[c]}</font></td>`;
  let rows = ''; for (let i = 0; i < CATS.length; i += 2) rows += `<tr>${cell(CATS[i])}${CATS[i + 1] ? cell(CATS[i + 1]) : '<td></td>'}</tr>`;
  return { title: 'Yahoot!', body: `<center><table width="468" border="1" cellpadding="4" cellspacing="0" bgcolor="#ffffcc"><tr><td align="center"><a href="http://geocities.com/"><font face="Comic Sans MS" size="3" color="#008000"><b>GeoCitiez - Get your FREE home page! CLICK HERE!</b></font></a></td></tr></table><br>
${yahootLogo()}<br>${yForm('')}
<font face="Arial" size="1"><a href="#">Shopping</a> - <a href="#">Auctions</a> - <a href="#">Yellow Pages</a> - <a href="#">People Search</a> - <a href="#">Maps</a> - <a href="#">Travel</a> - <a href="#">Classifieds</a> - <a href="#">Personals</a> - <a href="#">Games</a> - <a href="#">Chat</a> - <a href="#">Clubs</a> - <a href="http://mail.yahoo.com/">Email</a></font>
<hr width="600"><table width="600" cellpadding="4">${rows}</table><hr width="600">
<table width="600"><tr><td><font face="Arial" size="2"><b>In the News:</b><br>&#149; Pentium II prices fall again<br>&#149; Y2K bug: banks say they are "almost ready"<br>&#149; Cyber cafes spread to small-town India</font></td></tr></table>
<br><font size="1">Copyright &copy; 1998 Yahoot! Inc. All rights reserved.</font></center>` };
}

function directory(u) {
  const segs = u.path.split('/').filter(Boolean);
  let node = TREE; const trail = [];
  for (const s of segs) {
    const next = Object.values(node.kids).find(k => slug(k.name) === s);
    if (!next) return cannotFind();
    node = next; trail.push(next);
  }
  const base = '/' + segs.map(s => s + '/').join('');
  const crumbs = ['<a href="http://dir.yahoo.com/">Top</a>'].concat(trail.map((t, i) => (i === trail.length - 1 ? `<b>${esc(t.name)}</b>` : `<a href="http://dir.yahoo.com/${segs.slice(0, i + 1).join('/')}/">${esc(t.name)}</a>`))).join(': ');
  const kids = Object.values(node.kids);
  const list = kids.length ? '<ul>' + kids.map(k => `<li><font face="Arial" size="2"><a href="${base}${slug(k.name)}/"><b>${esc(k.name)}</b></a> (${count(k)})</font></li>`).join('') + '</ul>' : '';
  const sites = node.sites ? '<hr><font face="Arial" size="2"><b>Sites</b></font><ul>' + node.sites.map(s => `<li><font face="Arial" size="2">${link(s)} - ${esc(s.d)}</font></li>`).join('') + '</ul>' : '';
  const empty = !kids.length && !node.sites ? '<br><font face="Arial" size="2">There are no sites in this category yet.</font><br>' : '';
  return { title: `Yahoot! Directory - ${trail.length ? trail[trail.length - 1].name : 'Top'}`, body: `<center>${yahootLogo(5)}<br><font face="Arial" size="2"><b>Directory</b></font></center>${yForm('')}<font face="Arial" size="2">${crumbs}</font><br>${list}${sites}${empty}<hr>
<font face="Arial" size="2">Can't find what you're looking for?<br>Try <a href="http://quiet.room/">searching</a> for it.</font><hr><center><font size="1">Copyright &copy; 1998 Yahoot! Inc.</font></center>` };
}

/* ================= dmozz (Open-Ended Directory Project) ================= */
function dmozz(u) {
  const logo = '<font face="Arial" size="6"><b><font color="#008000">dm</font><font color="#000000">ozz</font></b></font><br><font face="Arial" size="2">the Open-Ended Directory Project</font>';
  const form = q => `<form action="http://dmoz.org/search"><input type="text" name="search" size="30" value="${esc(q)}"> <input type="submit" value="Search"></form>`;
  const foot = '<hr><center><font face="Arial" size="1">&copy;1998 Open-Ended Directory Project. Become an editor! (We will know.)</font></center>';
  if (u.path === '/search') {
    const q = u.q.get('search') || '';
    const hit = norm(q).includes('quiet room');
    return { title: `dmozz search: ${q}`, body: `<center>${logo}${form(q)}</center><hr><font face="Arial" size="2">` + (hit
      ? '<b>Open Directory Sites</b> (1 match)<ul><li><a href="http://quiet.room/">Quiet Room</a> - [no description] - [no editor] - [submitted: 1998-03-03]</li></ul>'
      : `No Open Directory Project results were found for <b>${esc(q)}</b>.`) + '</font>' + foot };
  }
  if (u.path !== '/') return cannotFind();
  const cats = ['Arts', 'Business', 'Computers', 'Games', 'Health', 'Home', 'News', 'Recreation', 'Reference', 'Regional', 'Science', 'Shopping', 'Society', 'Sports'];
  let rows = ''; for (let i = 0; i < cats.length; i += 3) rows += '<tr>' + cats.slice(i, i + 3).map(c => `<td width="200"><font face="Arial" size="3"><b><u>${c}</u></b></font></td>`).join('') + '</tr>';
  return { title: 'dmozz - the Open-Ended Directory Project', body: `<center>${logo}${form('')}<table border="0" cellpadding="6">${rows}</table><br><font face="Arial" size="2">1,998 sites - 9 editors - 1 category nobody may edit</font></center>${foot}` };
}

export default [
  { hosts: ['google.com', 'googol.com'], route: googol },
  { hosts: ['altavista.com', 'altavesta.com'], route: altavesta },
  { hosts: ['askjeeves.com', 'askreeves.com'], route: reeves },
  { hosts: ['yahoo.com', 'yahoot.com'], route: yahoot },
  { hosts: ['dir.yahoo.com', 'dir.yahoot.com'], route: directory },
  { hosts: ['dmoz.org', 'dmozz.org'], route: dmozz },
  { hosts: ['rockstargames.com'], route: () => cannotFind() },
];
