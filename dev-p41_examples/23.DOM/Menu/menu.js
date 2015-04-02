/*Определяет горизонтальную координату родительского элемента */
function getLeft(element) {
	var iPos = 0;
	while (element!=null) {
		iPos+=element.offsetLeft;
		element = element.offsetParent;
	}
	return iPos;
}

/*Определяет вертикальную координату родительского элемента */
function getTop(element) {
	var iPos = 0;
	while (element!=null) {
		iPos+=element.offsetTop;
		element = element.offsetParent;
	}
	return iPos;
}

/*Открывает выпадающее меню*/
function OpenSubMenu( parent, menu )
{
	var parentelement = document.getElementById(parent);
	var menutelement = document.getElementById(menu);

	menutelement.style.left = getLeft(parentelement);
	menutelement.style.top = getTop(parentelement) + parentelement.offsetHeight;
	menutelement.style.visibility = "visible";
}

/*Закрывает выпадающее меню*/
function CloseSubMenu( menu )
{
		document.getElementById(menu).style.visibility = "hidden";
}
