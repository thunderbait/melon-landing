function translateToPixel(number) {
  return number.toString() + "px";
}

// Toggle Navbar
function openNav() {
  document.getElementById("navbar").style.width = "250px";
  document.getElementById("openNav").style.visibility = "hidden";
  document.getElementById("closeNav").style.visibility = "visible";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0";
  document.getElementById("openNav").style.visibility = "visible";
  document.getElementById("closeNav").style.visibility = "hidden";
}


// ---------------- Navbar Selector --------------------

function verticalNavSelector(selector, nav, targets) {
  selector.style.top = translateToPixel(nav.offsetTop);
  var hideSelectorHeight = 300;

  // Selectors Scrollable Height
  const links = nav.children;
  const scrollHeight = links[links.length - 1].offsetTop - links[0].offsetTop;

  // Displacement of each target
  var sectionHeights = [];
  for (var i=0; i < targets.length - 1; i++) {
    sectionHeights.push(targets[i + 1].offsetTop - targets[i].offsetTop);
  }

  // Function that moves the selector
  function selectorScroll(pageScroll) {
    var linkDisplacements = scrollHeight / sectionHeights.length;

    // If page is within hideSelectorHeight hide selector
    if (pageScroll < hideSelectorHeight) {
      selector.style.visibility = "hidden";

    // If page has scrolled past final target then keep selector on bottom link
    } else if (pageScroll > targets[targets.length - 1].offsetTop) {
      selector.style.visibility = "visible";
      selector.style.top = translateToPixel(links[links.length - 1].offsetTop);
      
    } else {
      selector.style.visibility = "visible";
      for (var i = 0; i < sectionHeights.length; i++) {
        // For each section scroll between correct links in proportion to the section size
        if (pageScroll <= targets[i+1].offsetTop && pageScroll > targets[i].offsetTop) {
          var scrollPercentage = (pageScroll - targets[i].offsetTop) / sectionHeights[i];
          var selectorOffset = scrollPercentage * linkDisplacements + links[i].offsetTop;
          selector.style.top = translateToPixel(selectorOffset)
        }
      }
    }
  }

  // The scroll event listener 
  window.addEventListener("scroll", function() {
      selectorScroll(window.scrollY);
    }
  );
}

var selector = document.getElementById("selector");

// adjust selectors horizontal position
// var selectorOffsetLeft = selector.offsetLeft + 10;
// selector.style.left = translateToPixel(selectorOffsetLeft);

var about = document.getElementById("about");
var product = document.getElementById("product");
var contact = document.getElementById("contact");

var targets = [about, product, contact]
var navigation = document.getElementById("navigation");

verticalNavSelector(selector, navigation, targets);
window.addEventListener("resize", function() {
  verticalNavSelector(selector, navigation, targets);
})

// ----------------- Links ---------------------------------

var aboutLink = navigation.children[0];
var productLink = navigation.children[1];

aboutLink.addEventListener("click", function(e){
  about.scrollIntoView({behavior: 'smooth'});
  e.preventDefault();
});

productLink.addEventListener("click", function(e){
  product.scrollIntoView({behavior: 'smooth'});
  e.preventDefault();
});

document.getElementById("logo-link").addEventListener("click", function(e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

var contactLinks = document.getElementsByClassName("contact-link");

for (var i = 0; i < contactLinks.length; i++) {
  contactLinks[i].addEventListener("click", function(e){
    contact.scrollIntoView({behavior: 'smooth'});
    e.preventDefault();
  });
}

