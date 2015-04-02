function BrowserInfo() {
  var agt = navigator.userAgent.toLowerCase();
  this.version = parseFloat(navigator.appVersion);
  this.isIE = (agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1);
  this.isIE4up = this.isIE && (this.version >= 4);
  if (this.isIE) {
    if (this.isIE4up) {
      if (agt.indexOf("msie 6") != -1) this.version = 6;
      else if (agt.indexOf("msie 5.5") != -1) this.version = 5.5;
      else if (agt.indexOf("msie 5") != -1) this.version = 5;
    } else
      this.version = 3;
  }
  this.isIE5up = this.isIE && (this.version >= 5);
  this.isIE5_5up = this.isIE && (this.version >= 5.5);
  this.isIE6up = this.isIE && (this.version >= 6);
  this.isNN = (agt.indexOf('mozilla') != -1) && (agt.indexOf('spoofer') == -1) &&
              (agt.indexOf('compatible') == -1) && (agt.indexOf('opera') == -1) &&
              (agt.indexOf('webtv') == -1) && (agt.indexOf('hotjava') == -1);
  this.isNN4up = this.isNN && (this.version >= 4);
  this.isNN6up = this.isNN && (this.version >= 5);
  this.isOnline = true;
  if (this.isIE4up)
    this.isOnline = navigator.onLine;
  this.isOpera = false;
  this.isCHM = false;
  this.name = "Unknown";
  if (this.isIE)
    this.name = "Internet Explorer";
  else if (agt.indexOf("netscape6/") != -1) {
    this.name = "Netscape";
    this.version = parseFloat(agt.substr(agt.indexOf("netscape6/") + 10));
    if (!this.version) this.version = 6;
  } else if (agt.indexOf('gecko') != -1)
    this.name = "Mozilla";
  else if (this.isNN)
    this.name = "Netscape Navigator";
  else if (agt.indexOf("aol") != -1) {
    this.name = "AOL Browser";
    if (this.version < 4) this.version = 3;
  }
  else if (agt.indexOf("opera") != -1) {
    this.isOpera = true;
    this.name = "Opera";
    this.version = parseFloat(agt.substr(agt.indexOf("opera") + 6));
  }
  else if (agt.indexOf("webtv") != -1)
    this.name = "WebTV";
  else if ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1))
    this.name = "AOL TV Navigator";
  else if (agt.indexOf("hotjava") != -1)
    this.name = "HotJava";
  this.fullName = this.name + ' ' + this.version;
  if (this.version == Math.floor(this.version))
    this.fullName += '.0';
}

function addBanner(flag) {
  with (currentBrowser) {
    if (isCHM) {
      tdBanner.style.display="none";
      return;
    }
    if ((flag != isIE4up) || !isOnline)
      return;
  }
  var userid = 160692;
  var page = 2;
  var rndnum = Math.round(Math.random() * 10000);
  var html = '<DIV CLASS="banner"><A HREF="http://ad.tbn.ru/bb.cgi?cmd=go&pubid=' + userid + '&pg=' + page + '&vbn=188&num=1&w=468&h=60&nocache=' + rndnum + '" target="_blank">' +
    '<IMG SRC="http://ad.tbn.ru/bb.cgi?cmd=ad&pubid=' + userid + '&pg=' + page + '&vbn=188&num=1&w=468&h=60&nocache=' + rndnum + '" width=468 height=60 Alt="TBN.ru - ÑÅÒÜ, ÆÈÂÓÙÀß ÏÎ ÏÐÀÂÈËÀÌ" border=0></A></DIV>';
  if (currentBrowser.isIE4up)
    tdBanner.innerHTML = html;
  else
    document.write(html);
}

// Global object with current browser info.
var currentBrowser = new BrowserInfo();

// This line must be uncommented only for DEBUGGING!
//currentBrowser.isOnline = false;
// This line must be uncommented only for WDH Offline COMPILING!
//currentBrowser.isCHM = true;

// Change document to link the appropriate CSS file.
var css;
with (currentBrowser) {
  if (isNN6up)
    css="nn5";
  else if (isNN)
    css = "nn4";
  else if (isIE5up || isOpera)
    css = "ie5";
  else
    css = "ie4";
}
document.write('<link rel="stylesheet" type="text/css" href="global/' + css + '.css">');
if (currentBrowser.isIE5up && !currentBrowser.isCHM)
  document.write('<script type="text/javascript" src="global/trange.js"></script>');
