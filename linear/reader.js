// minimal implementation of WPUB spec, which does everything the spec requires
// by Dave Cramer 21 May 2018


// find manifest
var manifestLink = document.querySelectorAll('link[rel=publication]')[0].href

// create main element
var mainFrame = document.createElement('main');

//fetch manifest

let manifest = fetch(manifestLink).then(response => response.json()).then(response => response.spine);

// machinery to display content in iframe

manifest.then(json => {
  for (i=0; i < json.length; i++) {
  var iframe= document.createElement('iframe');
  iframe.setAttribute('name', json[i]);
  iframe.setAttribute('id', json[i]);
  iframe.setAttribute('src', json[i]);
  mainFrame.appendChild(iframe);
  };
window.location.hash = json[0];
});


// add iframes to body
  
    document.getElementsByTagName('body')[0].appendChild(mainFrame);
    
    
// User agents MUST provide an affordance for moving forward and backward in the default reading order of a Web Publication.    

 function nextPage() {
  var currentTarget = window.location.hash.split('#')[1];
  
  manifest.then(json => {
  var length = json.length -1;
  var current = json.map((el) => el).indexOf(currentTarget);
if (current < length) {
window.location.hash = json[current + 1];
};
})};


 function prevPage() {
  var currentTarget = window.location.hash.split('#')[1];
  
  manifest.then(json => {
var current = json.map((el) => el).indexOf(currentTarget);
// don't try to go before the first item in the reading order
if (current > 0) {
window.location.hash = json[current - 1];
};


})};


var prevButton = document.createElement('button');
prevButton.innerHTML = '&lt;';
prevButton.setAttribute('id', 'prev');
prevButton.setAttribute('onclick', 'prevPage();');
prevButton.style.position = 'fixed';
prevButton.style.top = '50%';
prevButton.style.backgroundColor = 'rebeccapurple';
prevButton.style.color = 'white';
prevButton.style.fontWeight = 'bold';
prevButton.style.fontSize = '30px';
prevButton.style.borderStyle = 'solid';
prevButton.style.borderColor = 'rebeccapurple';
prevButton.style.paddingBottom = '44px';
prevButton.style.paddingLeft = '0px';
prevButton.style.left = '0';
prevButton.style.borderTopRightRadius = '30px';
prevButton.style.borderBottomRightRadius = '30px';
prevButton.style.height = '30px';
prevButton.style.width = '30px';
document.body.prepend(prevButton);
    
var nextButton = document.createElement('button');
nextButton.innerHTML = '&gt;';
nextButton.setAttribute('id', 'next');
nextButton.setAttribute('onclick', 'nextPage();');
nextButton.style.position = 'fixed';
nextButton.style.top = '50%';
nextButton.style.backgroundColor = 'rebeccapurple';
nextButton.style.color = 'white';
nextButton.style.fontWeight = 'bold';
nextButton.style.fontSize = '30px';
nextButton.style.borderStyle = 'solid';
nextButton.style.borderColor = 'rebeccapurple';
nextButton.style.paddingBottom = '44px';
nextButton.style.right = '0';
nextButton.style.borderTopLeftRadius = '30px';
nextButton.style.borderBottomLeftRadius = '30px';
nextButton.style.height = '30px';
nextButton.style.width = '30px';
document.body.prepend(nextButton);

// incomplete
 function interceptClickEvent(e) {
    var href;
    var target = e.target || e.srcElement;
    if (target.tagName === 'A') {
        href = target.getAttribute('href');


   var linkTargetIframe = href.split('#')[0];
   window.location.hash = linkTargetIframe;
   console.log(linkTargetIframe);
   
   var newframe = document.getElementById(linkTargetIframe);
   
   console.log(href.split('#')[1]);

//newframe.contentWindow.document.getElementById(href.split('#')[1]).scrollIntoView();
   
        //put your logic here...
        if (true) {

           //tell the browser not to respond to the link click
           e.preventDefault();
        }
    }
}