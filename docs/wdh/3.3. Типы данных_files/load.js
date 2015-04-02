var fromFrame = (window.name == "wdhmain");

function showMask(obj) {
  if (obj.filters.length > 1)
    obj.filters(1).color = 0x00BFFF;
}

function hideMask(obj) {
  if (obj.filters.length > 1)
    obj.filters(1).color = 0x6495ED;
}

function setFilters(obj) {
  obj.style.filter = "chroma(color=#000000) mask(color=#6495ED)";
  obj.style.display = "block";
}

function showNormal(obj) {
  var s = obj.name;
  document[s].src = eval(s.substr(0, s.length - 1) + "0.src");
}

function showSelected(obj) {
  var s = obj.name;
  document[s].src = eval(s.substr(0, s.length - 1) + "1.src");
}

var months =  ["января", "февраля", "марта", "апреля",  "мая",  "июня", "июля", "августа", "сентября", "октября", "ноября",  "декабря"];
var leftDoc, rightDoc, leftTitle, rightTitle, imgFile, navFilter;

function initDoc() {
  parent.docLoaded = true;
  if (!currentBrowser.isIE4up && !currentBrowser.isNN6up) return;
  var links;
  if (currentBrowser.isNN6up) {
    imgdown0 = new Image(); imgdown0.src = "images/nndown.gif";
    imgleft0 = new Image(); imgleft0.src = "images/nnleft.gif";
    imgright0 = new Image(); imgright0.src = "images/nnright.gif";
    imgup0 = new Image(); imgup0.src = "images/nnup.gif";
    imgdown1 = new Image(); imgdown1.src = "images/nndown1.gif";
    imgleft1 = new Image(); imgleft1.src = "images/nnleft1.gif";
    imgright1 = new Image(); imgright1.src = "images/nnright1.gif";
    imgup1 = new Image(); imgup1.src = "images/nnup1.gif";
    navFilter = '" onmouseover="showSelected(this)" onmouseout="showNormal(this)"';
    imgFile = "nn";
    links = document.getElementsByTagName("LINK");
  } else if (currentBrowser.isIE4up) {
    navFilter = '" style="display: none" onload="setFilters(this)" onmouseover="showMask(this)" onmouseout="hideMask(this)"';
    imgFile = "nav";
    links = document.all.tags("LINK");
  }
  leftDoc = links[0].href;
  leftTitle = links[0].title;
  rightDoc = links[1].href;
  rightTitle = links[1].title;
  var lastModDate = new Date(document.lastModified);
  var year = lastModDate.getFullYear();
  if (year < 2000) year += 100;	// for IE4
  var modDate = lastModDate.getDate().toString() + ' ' + months[lastModDate.getMonth()] + ' ' + year.toString() + ' г.';
  var navOpen = '<hr size="2"><table width="100%" height="24" border="0" cellpadding="0" cellspacing="0" style="margin: 0"><tr>';
  var navClose = '</tr></table><hr size="2">';
  var addText = '<p style="text-indent: 0; text-align: center; margin: 0; font-family: arial, sans-serif; color: #0000CC">';
  var navHeader = addText + 'Ю. Лукач «Справочник Веб-разработчика»</p>';
  var navFooter = addText + 'Последнее изменение страницы: ' + modDate + '</p>';
  if (!currentBrowser.isCHM) {
    navHeader += navOpen + navRow("a") + navClose;
    navFooter = navOpen + navRow("b") + navClose + navFooter;
  } else {
    var hr = '<hr size="2" color="#0000CC">';
    navHeader += hr;
    navFooter = hr + navFooter;
    divHeader.style.height = divFooter.style.height = "30px";
  }
  if (currentBrowser.isNN6up) {
    if (document.getElementById("divFooter")) document.getElementById("divFooter").innerHTML = navFooter;
    if (document.getElementById("divHeader")) document.getElementById("divHeader").innerHTML = navHeader;
  } else {
    if (divFooter) divFooter.innerHTML = navFooter;
    if (divHeader) divHeader.innerHTML = navHeader;
  }
}

function navRow(imgName) {
  var wd = fromFrame ? '50%' : '33%';
  var aTarget = fromFrame ? 'target="_self" ' : '';
  var aDir = imgName == "a" ? "up" : "down";
  var s = '<td width="' + wd + '" align="left"><a ' + aTarget + 'href="' + leftDoc + '"><img border="0" name="imgleft' + imgName + '" src="images/' + imgFile + 'left.gif" alt="" title="' + leftTitle + navFilter + '></a></td>';
  if (!fromFrame) s += '<td width="34%" align="center"><a href="contents.htm"><img border="0" name="img' + aDir + imgName + '" src="images/' + imgFile + aDir + '.gif" alt="" title="Содержание' + navFilter + '></a></td>';
  s += '<td width="' + wd + '" align="right"><a ' + aTarget + 'href="' + rightDoc + '"><img border="0" name="imgright' + imgName + '" src="images/' + imgFile + 'right.gif" alt="" title="'+ rightTitle + navFilter + '></a></td>';
  return s;
}
