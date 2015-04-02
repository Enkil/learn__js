var  xmlHttp = new XMLHttpRequest();
function process(){
      xmlHttp.open("GET", "async.txt", true);
      xmlHttp.onreadystatechange = handleRequestStateChange;
      xmlHttp.send(null);
 }
function handleRequestStateChange() {
  myDiv = document.getElementById('myDivElement');
 if (xmlHttp.readyState == 4)   {
       response = xmlHttp.responseText;
		myDiv.style.color += response;     
  }
}
