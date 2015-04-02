function process()
{
  // create the first text node
  oHello = document.createTextNode
                    ("Here's a cool list of colors for you:");

  // create the <ul> element
  oUl = document.createElement("ul")

  // create the first <ui> element and add a text node to it
  oLiBlack = document.createElement("li");
  oBlack = document.createTextNode("Black");
  oLiBlack.appendChild(oBlack);

  // create the second <ui> element and add a text node to it
  oLiOrange = document.createElement("li");
  oOrange = document.createTextNode("Orange");
  oLiOrange.appendChild(oOrange);

  // create the third <ui> element and add a text node to it
  oLiPink = document.createElement("li");
  oPink = document.createTextNode("Pink");
  oLiPink.appendChild(oPink);


  oLiRed = document.createElement("li");
  oRed = document.createTextNode("Red");
  oLiRed.appendChild(oRed);

  // add the <ui> elements as children to the <ul> element
  oUl.appendChild(oLiBlack);
  oUl.appendChild(oLiOrange);
  oUl.appendChild(oLiPink);
  oUl.appendChild(oLiRed);

  // obtain a reference to the <div> element on the page
  myDiv = document.getElementById("myDivElement");

  // add content to the <div> element
  myDiv.appendChild(oHello);
  myDiv.appendChild(oUl);
}
