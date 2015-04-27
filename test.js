var settings = null;
var gistFav = [];
var gistArray = [];

function Gist(link, description) {
  this.link = link;
  this.description = description;
}

function getURL() {

  var url = 'https://api.github.com/gists';
  var Webpage = document.getElementsByName('pages')[0].value;


  for ( var i = 0; i < Webpage; i++ ) {
    var newRequest = new XMLHttpRequest();
    if( !newRequest ) 
      throw 'Unable to initiate HTTP Request!'; 

    newRequest.onreadystatechange = function() {
      if ( newRequest.readyState === 4 ) {
	    if ( newRequest.status === 200 ) {
	      var httpParse = JSON.parse(this.responseText);
		  for ( var key in httpParse ) {
		    gistArray.push(httpParse[key]);
		  }
		  
		} 
		createGistList(gistArray);
	 }
	}
  }

	url += '?pages=' + Webpage
    newRequest.open('GET', url);
    newRequest.send();
}



window.onload = function() {
  var list = localStorage.getItem('gistList');
  if( list === null ) {
    list = {'gists':[]};
	localStorage.setItem('gistList', JSON.stringify(list));
  }
  else {
    list = JSON.parse(localStorage.getItem('gistList'));
  }
  displayFavorite();
}


function displayFavorite() {
  var list = document.getElementById('display');
  var ul = document.createElement('ul');
  for ( var key in localStorage ) {
    var item = document.createElement('li');
	item.innerHTML = localStorage[key];
	this.deleteButton = document.createElement('button');
	this.deleteButton.innerHTML = "Remove";
	this.deleteButton.onclick = function() {
	  this.parentNode.style.display='none';
	  this.localStorage.clear();
	  this.displayFavorite();
	}
	item.appendChild(deleteButton);
	ul.appendChild(item);
	list.appendChild(ul);
  }
  return list; 
}


function createGistList(array) {
  var list = document.getElementById('gist-list');
  var ul = document.createElement('ul');

  for ( var i = 0; i < array.length; i++ ) {
    var item = document.createElement('li');
	if ( array[i].description === null || array[i].description.length === 0 ) {
	 var divURL = document.createElement('div');
	 divURL.innerHTML = '<a href="'+ array[i].url + '">' + "No Description" + '</a>';
	 item.appendChild(divURL);
	}
	else {
	 var divURL = document.createElement('div')
	 divURL.innerHTML = '<a href="'+ array[i].url + '">' + array[i].description + '</a>';
	 item.appendChild(divURL);
	}

	this.favorite = document.createElement('button');
	this.favorite.innerHTML = "Click to Favorite";
	this.favorite.onclick = function() {
	  localStorage.setItem('gistList', JSON.stringify(this.parentNode.textContent));
	  this.parentNode.style.display='none';
	  displayFavorite();
	}
	 item.appendChild(favorite);
	 ul.appendChild(item);
	 list.appendChild(ul);
  }
  return list;
}


