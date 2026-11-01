// Helpers shared by the fake-site modules. A "page" is { title, body, bodyAttrs?, head?, noHistory?, onLoad?(doc, ctx) }.
// Pages are 1998 HTML strings: tables, <font>, <center>, <marquee>, <hr>, <br>. Behaviour lives in onLoad, never in the HTML.

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const today = () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
export const clock = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
export const city = () => (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown/Somewhere').split('/').pop().replace(/_/g, ' ');

/** 640px fixed table, the layout of every 1998 home page. */
export const t640 = (inner, attrs = 'border="0" cellpadding="6" cellspacing="0"') => `<center><table width="640" ${attrs}><tr><td>${inner}</td></tr></table></center>`;

/** Internet Explorer 5's own error page (DNS failure). */
export function cannotDisplay(raw) {
  return {
    title: 'The page cannot be displayed',
    bodyAttrs: 'bgcolor="#ffffff"',
    zone: 'internet',
    body: `<table width="410" cellpadding="3" cellspacing="5"><tr><td valign="top" width="30"><font face="Wingdings" size="6" color="#ff0000">&#215;</font></td>
<td><font face="Verdana, Arial" size="2"><font size="4"><b>The page cannot be displayed</b></font><br><br>
The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.</font></td></tr>
<tr><td></td><td><font face="Verdana, Arial" size="2"><hr color="#c0c0c0" noshade>Please try the following:<ul>
<li>Click the <a href="#" data-act="refresh">Refresh</a> button, or try again later.<br><br></li>
<li>If you typed the page address in the Address bar, make sure that it is spelled correctly.<br><br></li>
<li>To check your connection settings, click the <b>Tools</b> menu, and then click <b>Internet Options</b>. On the <b>Connections</b> tab, click <b>Settings</b>. The settings should match those provided by your local area network (LAN) administrator or Internet service provider (ISP).<br><br></li>
<li>See if your Internet connection settings are being detected. You can set Microsoft Windows to examine your network and automatically discover network connection settings (if your network administrator has enabled this setting).
<ol><li>Click the <b>Tools</b> menu, and then click <b>Internet Options</b>.</li><li>On the <b>Connections</b> tab, click <b>LAN Settings</b>.</li><li>Select <b>Automatically detect settings</b>, and then click <b>OK</b>.</li></ol><br></li>
<li>Click the <a href="#" data-act="back">Back</a> button to try another link.</li></ul>
<form><input type="button" value="Detect Network Settings" data-act="detect"></form>
<hr color="#c0c0c0" noshade>Cannot find server or DNS Error<br>Internet Explorer</font></td></tr></table>`,
  };
}

/** Internet Explorer 5's own HTTP 404 page. */
export function cannotFind() {
  return {
    title: 'The page cannot be found',
    bodyAttrs: 'bgcolor="#ffffff"',
    zone: 'internet',
    body: `<table width="410" cellpadding="3" cellspacing="5"><tr><td><font face="Verdana, Arial" size="2"><font size="4"><b>The page cannot be found</b></font><br><br>
The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.<hr color="#c0c0c0" noshade>
Please try the following:<ul><li>If you typed the page address in the Address bar, make sure that it is spelled correctly.</li><li>Click the <a href="#" data-act="back">Back</a> button to try another link.</li></ul>
<hr color="#c0c0c0" noshade>HTTP 404 - File not found<br>Internet Explorer</font></td></tr></table>`,
  };
}
