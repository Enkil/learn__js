/* book Object 
{ 
	id : Number,  // уникальный идентификатор книги
	title : String,  // название книги
	authors : [String],  // массив авторов
	image : String,  // путь до изображения
	works : [{ title : String, description : String }],  // массив объектов произведений, собраных в книге. В каждом объекте - название и описание
	isFavorite : Boolean  // метка любимого произведения
}
*/
function bookTemplate(book) {
	var i;

	var divItem = document.createElement('div');
	divItem.className = 'item';
	
	var img = document.createElement('img');
	img.src = 'images/books/' + book.image;
	divItem.appendChild(img);
	
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	td1.className = 'left';
	var h2 = document.createElement('h2');
	h2.innerHTML = book.title;
	td1.appendChild(h2);
	var td2 = document.createElement('td');	
	td2.className = 'right';
	var divLike = document.createElement('div');
	divLike.id = "like_" + book.id;
	divLike.className = "like cornerAll";
	td2.appendChild(divLike);
	tr.appendChild(td1);
	tr.appendChild(td2);
	table.appendChild(tr);
	divItem.appendChild(table);
	
	var pAuthor = document.createElement('p');
	var labelAuthor = document.createElement('label');
	labelAuthor.innerHTML = 'Автор (-ы):';
	var spanAuthor = document.createElement('span');
	spanAuthor.innerHTML = book.authors.join(', ');
	pAuthor.appendChild(labelAuthor);
	pAuthor.appendChild(spanAuthor);
	divItem.appendChild(pAuthor);
	
	var pWork = document.createElement('p');
	var labelWork = document.createElement('label');
	labelWork.innerHTML = 'Произведения:';
	var spanWork = document.createElement('span');
	spanWork.innerHTML = '';
	for (i in book.works) {
		spanWork.innerHTML += '"' + book.works[i].title + '", ';
	}
	spanWork.innerHTML = spanWork.innerHTML.substring(0, spanWork.innerHTML.length-2);
	pWork.appendChild(labelWork);
	pWork.appendChild(spanWork);
	divItem.appendChild(pWork);
	
	var pDescription = document.createElement('p');
	var labelDescription = document.createElement('label');
	labelDescription.innerHTML = 'Описание:';
	var spanDescription = document.createElement('span');
	spanDescription.innerHTML = '';
	for (i in book.works) {
		spanDescription.innerHTML += '<b>"' + book.works[i].title + '"</b>: ' + book.works[i].description + '<br>';
	}
	spanDescription.innerHTML = spanDescription.innerHTML.substring(0, spanDescription.innerHTML.length-4);
	pDescription.appendChild(labelDescription);
	pDescription.appendChild(spanDescription);
	divItem.appendChild(pDescription);
	
	return divItem;
}

/* book Object 
{ 
	id : Number,  // уникальный идентификатор книги
	title : String,  // название книги
	authors : [String],  // массив авторов
	image : String,  // путь до изображения
	works : [{ title : String, description : String }],  // массив объектов произведений, собраных в книге. В каждом объекте - название и описание
	isFavorite : Boolean  // метка любимого произведения
}
*/
function favoriteTemplate(book) {
	var li = document.createElement('li');
	
	var b = document.createElement('b');
	
	var aBook = document.createElement('a');
	aBook.className = "book";
	aBook.id = "book_" + book.id;
	aBook.href = "#";
	aBook.innerHTML = book.title;
	aBook.onclick = function(){
		printCatalogue(1, book.title);
		return false;
	}
	
	var aAuthor = document.createElement('a');
	aAuthor.className = "author";
	aAuthor.href = "#";
	aAuthor.innerHTML = book.authors.join(', ');
	aAuthor.onclick = function(){
		printCatalogue(1, book.authors.join(', '));
		return false;
	}
	
	b.appendChild(aBook);
	
	li.appendChild(document.createTextNode(" "));
	li.appendChild(b);
	li.appendChild(document.createTextNode(" \u2013 "));
	li.appendChild(aAuthor);
	
	return li;
}

function printCatalogue(page, searchString) {

	document.getElementById('changeable').innerHTML = '';	
	
	var relevantBooks = [];
	
	if (searchString != '') {
		for (var i in books) {
			if 	(
			
					books[i].title.indexOf(searchString) != -1 ||
					books[i].authors.join(', ').indexOf(searchString) != -1 
					
				) {
				relevantBooks.push(books[i]);
			}
		}
	} else {
		relevantBooks = books;
	}
	
	
	drawPager(relevantBooks.length, page, searchString);
	
	for (var i = (page - 1) * booksPerPage; i < page * booksPerPage; i++) {
		if (relevantBooks[i] != undefined) {
			document.getElementById('changeable').appendChild(bookTemplate(relevantBooks[i]));
		}
	}
}


function bindPageChange(element, page, searchString) {
	element.onclick = function(){
		printCatalogue(page, searchString);
		return false;
	}
}


function drawPager(itemNumber, page, searchString) {
	var paginator = document.createElement('div');
	var pageNumber = Math.ceil(itemNumber / booksPerPage);
	var spanPag;
	var aPag;
	for (var i = 1; i <= pageNumber; i++) {
		if (i == page) {
			spanPag = document.createElement('span');
			spanPag.innerHTML = i;
			paginator.appendChild(spanPag);
		} else {
			aPag = document.createElement('a');
			aPag.innerHTML = i;
			aPag.href = "#";
			bindPageChange(aPag, i, searchString);
			paginator.appendChild(aPag);			
		}
	}
	document.getElementById('paginator').innerHTML = '';
	document.getElementById('paginator').appendChild(paginator);
}


function printFavorites() {
	var list = document.getElementById("favoritesList");
	for (var i in books) {
		//var book = books[i];
		if (books[i].isFavorite == true) {
			var readyElement = favoriteTemplate(books[i]);
			list.appendChild(readyElement);
		}
	}
}