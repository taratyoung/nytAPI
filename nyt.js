//revisit
//11
//33

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1 - 
//Here we declare the baseURL of the API. This is the required API endpoint for the New York Times data.
const key = 'GkR0f4amvS7fmQO4dFsUAsUGFfAvtbKV'; //2 - 
//This will let the NYT know exactly what user is using their API.
let url; //3 - 
//--it's "open" variable for search 

//querySelector() method - It returns the first Element within the document that matches the specified selector or group of selectors. If no matches are found, null is returned.

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
//RESULTS SECTION
const section = document.querySelector('section');

//VARIABLE - to set the initial style to none: do this to hide the "Previous"/"Next" navigation when the page loads, before we do a search. We don't want it turned on immediately when there are no results to page through.
nav.style.display = 'none';

//--Set the pageNumber to 0 by default, and set displayNav to false to further ensure that it won't be visible until we want it to be:
let pageNumber = 0;
let displayNav = false;
//--console.log('PageNumber:', pageNumber); 


//EVENT LISTENERS - DOM is listening for all kinds of events. We'll send some event listener methods so that the DOM can listen for activity.

//addEventListner() - This method will help identify a target and then add an event listener on that target. 
//1 - Want to submit a form that contains a query: "Sports", "Politics", "Weather", etc.
//2 - Want to be able to toggle through the results when we click on the next or previous button.

//--event method that tells form or buttons to wait for an action/data, and gives the function to execute said action
//1                        //2   
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

//searchForm variable targets the 'form' element in the HTML
//and call the addEventListener method on it
//want to listen for things happening on the searchForm

//1
//The 'event' we're looking for is the HTML form event 'submit'
//Note that the 'submit' fires on a 'form' not a 'button'
//when this event happens, the form is submitted by pressing the 'submit' button
//we'll fire off a function called 'fetchResults', the second parameter in the function

//2
//the same is true for the other two items, except they call 'click' events
//clicking the next button, fires off the 'nextPage' function
//clicking the prev button, fires off the 'prevPage' function

//Note - 'click' event is fired when a pointing device is pressed and released on a single element


//FETCH RESULTS 01
//ACCESSING A REST API

//The little (e) is part of something in Javascript called an event handling function
//--function that grabs the results from the API and jsonifys it to interpret 
//1

//FETCH RESULTS 02
//preventDefault()
function fetchResults(e) {
    e.preventDefault(); //1
    //--stops default event during any stage of flow; submitting a form defaults to refreshing a page so e.preventDefault(); stops that refresh
    //even though we tell code to submit data, don't actually want anythng submitted. 
    //instead, want to GET data.

    //console.log(e); //2
// Assemble the full URL
//: ?, &, and &q= in a URL string. What are those?
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3 - reference NYT API
    //--creating new variable to be url to process search path  
    console.log(url); //4
    //--will show new URL in conosle.log



//FETCH RESULTS 04
//DATES

//--statement to do any value, strict unequal to blank
if(startDate.value !== '') {
    //--shows start in console.log
    console.log(startDate.value)
    //--adds new date data to current path, add to url path variable action, cancatination shorthand
  url += '&begin_date=' + startDate.value;
};
//statement with strict unequal for the end date, not an empty string
if(endDate.value !== '') {
    //--shows us end date value in console.log
    console.log(endDate.value)
    //add the new end date value to URL variable
    url += '&end_date=' + endDate.value;
};



//FETCH RESULTS 03
  //1
  fetch(url)
  //--then grabs the promise sucess case and result is the parameter(placeholder) to take response data recieved from the promise, .then is the resolver
    .then(function(result) {
  //--to show result in console
    console.log(result)
    //--return and chain on json to continue adding/manipulating data, translating result to json
    return result.json(); //2
  })
  //--second resolver to grab json from previous resolver 
  .then(function(json) {
    //t--o show json data in console.log
      //console.log(json); //3
    //--function to display the json data, sends data to the displayResults function below, 
    //--connects the next function to this code
    displayResults(json); //1 & //3
  });
}
  

//fetch above explained:
//1- We make the fetch request.
//2- We pass in the NYT url.
//3- We create a promise .then that returns a response object called result.
//4- The promise asynchronously returns a function that converts the result into usable json format - result.json() is that function call.
//5- We create a second promise that has a function that takes in the json object.
//6- We log the json object for now.




//DISPLAY RESULTS 01
//--function to grab json data and attaching/display data on webpage w/ html idtentifiers, tell data where to be displayed
function displayResults(json) {
    //--attaches child node to section part of html by removing primary child and replacing it, either previous results or blank space
    while (section.firstChild) {
      section.removeChild(section.firstChild);
    }
  //--creating variable name for all json data, var = articles, json = object and . digs in for response
    let articles = json.response.docs;
  //--creating parameters for different article links, NYT gives an array of 10 articles, here it checks if there are any/no results
    if (articles.length === 0) {
      //no results for things that don't exist
      console.log('No results');
    } else {
      //--length greater than zero, till hits full length, for loop that iterates the length of the article array
      for (let i = 0; i < articles.length; i++) {
        //--variables being created to label and place data from the article and API, creating elements 
        let article = document.createElement('article');
        let heading = document.createElement('h2');
        let link = document.createElement('a');
        let img = document.createElement('img');
        let para = document.createElement('p');
        let clearfix = document.createElement('div');
        //--creates variable to name current articles on page
        let current = articles[i];
        //--to show what your current list is called
        console.log('Current:', current);
        //--creates link to current article seeing/refrencing
        link.href = current.web_url;
        //--console.log new link created
        console.log(link);
        //--pulls and links article content associated with each section
        link.textContent = current.headline.main;
  
        //--adding keyword text content to the paragraph section to HTML, to replace child node with specified string
        para.textContent = 'Keywords: ';
        //allowing however many keywords there are to take over the section of paragraph, setting the length
        for (let j = 0; j < current.keywords.length; j++) {
          //--span is an inline cotainer used to mark up a part of a text or document, provides no display change but can be given changes when called on
          let span = document.createElement('span');
          span.textContent += current.keywords[j].value + ' ';
          //--attached span to paragraph section we created
          para.appendChild(span);
        }
        //--setting how to organize and display media 
        if (current.multimedia.length > 0) {
          //--get directory of where to pull img
          img.src = 'http://www.nytimes.com/' + current.
          //--first image in array of article
          multimedia[0].url;
          //--display main headline if no image
          img.alt = current.headline.main;
        }
        //--naming the div and setting class
        clearfix.setAttribute('class', 'clearfix');
        //--appendChild adds child as last child of the node
        article.appendChild(heading); //attach article data to heading
        heading.appendChild(link); //attach link to the heading
        article.appendChild(img); //attach the img to the article
        article.appendChild(para); //attach the paragraph
        article.appendChild(clearfix);//add onto div we created
        section.appendChild(article);//add article section
      }
    }
  //--only going to show 10 articles, in block per display, and stop the loop with else of none
    if (articles.length === 10) { //if else to only 
      nav.style.display = 'block'; // display 10 articles
    } else {
      nav.style.display = 'none'; //at a time
    }
  }
  //--function to grab current page data, add one onto current page, fetch results for new page number, console log displays the page you're on
  function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log('Page Number:', pageNumber);
  }
  //--function to grab current page data, subtract one form current page place, 
  //fetch new page content data from API 
  function previousPage(e) {
    if (pageNumber > 0) {
      pageNumber--;
      fetchResults(e);
    } else {
      //--esult = nada if the page is already at the beginning
      return;
    }
    fetchResults(e);
    console.log('Page:', pageNumber);
  }