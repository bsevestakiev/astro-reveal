// Global Vars
var lazyLoad, lazyLoadIframe, vwISMobileMenu = 860;

//Detect Firefox
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

// Helper Functions
// _extends - Merge two objects together. Exists with LazyLoad Plugin
// _forEach - Loop through node list
var _forEach = function (arr, callback, scope) {
    for (var i = 0; i < arr.length; i++) {
        callback.call(scope, i, arr[i]); // passes back stuff we need
    }
},
    /**
    * Summary: Checks when DOM Content Loaded is ready and executes callback
    *
    * @param {requestCallback}   callback    Callback function that handles the response
    * @return {Function|EventListener} Checks document state and if ready, will instantiate callback function or will return an event listner for DOM Content Ready with callback function
    */
    _whenDOMReady = function (callback) {
        return document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener("DOMContentLoaded", callback);
    },
    /**
    * Summary: Read cookie based off of name and returns value if it exists
    *
    * @param {String}   name        Cookie Name
    * @return {String|Object} Returns the string value of the selected cookie if it exists; otherwise it returns null
    */
    _readCookie = function (name) {
        name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return null;
    },
    /**
    * Summary: Function to fade in elements
    *
    * @param {Object}   el          Selected Element.
    * @param {Object}   config      Object containing configurations for fadeOut.
    * @param {Number}   config.fadeIncrement Decimal value of how you want to increment the fade opacity value
    * @param {String}   config.displayType   String value to set display for the element as the animation begins
    *
    * @return {type} return is not essential to function
    */
    _fadeIn = function (el, config) {
        if (!el) { return false; }

        config.fadeIncrement = config.fadeIncrement || 0.1;
        el.style.opacity = 0;
        el.style.display = config.displayType || "block";
        var raf;

        (function fade() {
            var val = parseFloat(el.style.opacity);
            //var val = el.style.opacity;
            if (!((val += config.fadeIncrement) > 1)) {
                el.style.opacity = val;
                raf = requestAnimationFrame(fade);
                return false;
            } else {
                cancelAnimationFrame(raf);
            }
        })();
    },
    /**
    * Summary: Function to fade out elements
    *
    * @param {object}   el          Selected Element.
    * @param {Object}   config      Object containing configurations for fadeOut.
    * @param {Number}   config.fadeIncrement Decimal value of how you want to increment the fade opacity value
    * @param {Boolean}  config.removeEl      Boolean value to determine if user want to remove element upon completion of animation.
    *
    * @return {type} return is not essential to function
    */
    _fadeOut = function (el, config) {
        if (!el) { return false; }

        el.style.opacity = el.style.opacity || 1;
        config.removeEl = config.removeEl || false;
        config.fadeIncrement = config.fadeIncrement || false;
        var raf;

        (function fade() {
            if ((el.style.opacity -= config.fadeIncrement) < 0) {
                el.style.display = "none";
                if (config.removeEl) {
                    el.parentNode.removeChild(el);
                }
                cancelAnimationFrame(raf);
                return false;
            }
            raf = requestAnimationFrame(fade);
        })();
    },
    /**
    * Summary: Function to generate scrollTo Options
    *
    * @param {object}   el          Selected Element.
    * @param {Object}   opts        Object containing options for generateScrollToOpts.
    * @param {Boolean}  opts.useLeft       Boolean value to whether to get left value. If not provider or set to false, it will set to 0.
    * @param {String}   opts.behavior      String value to set the behavior property of the ScrollToOptions. Options can be "smooth" or "auto"
    * @param {Number}   opts.offsetTop     Number value to offset top position
    *
    * @return {Object} return object of ScrollToOptions to use within window.scrollTo
    */
    _generateScrollToOpts = function (el, opts) {
        opts.useLeft = opts.useLeft || false;
        opts.behavior = opts.behavior || 'smooth';
        opts.offsetTop = opts.offsetTop || 0;
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: (rect.top + scrollTop) - opts.offsetTop, left: ((opts.useLeft) ? scrollLeft : 0), behavior: opts.behavior };
    };

//
function initTinySliders() {
    if (document.querySelector('.tns-slider--reviews')) {
        var reviewsSlider = tns({
            container: '.tns-slider--reviews',
            items: 1,
            slideBy: 'page',
            controls: false,
            navPosition: 'bottom'
        });
    }
    if (document.querySelector('.tns-slider--learningLibrary')) {
        var learningLibrary = tns({
            container: '.tns-slider--learningLibrary',
            items: 1,
            slideBy: 'page',
            nav: false,
            controlsText: ['&laquo;', '&raquo;'],
            loop: false,
            gutter: 20,
            lazyload: true,
            responsive: {
                576: {
                    items: 2
                },
                800: {
                    items: 3
                }
            }
        });
    }
    if (document.querySelector('.tns-slider--quotes')) {
        var quotesSlider = tns({
            container: '.tns-slider--quotes',
            items: 1,
            autoplay: true,
            loop: true,
            controls: false,
            controlsPosition: 'bottom',
            gutter: 40,
            mouseDrag: true,
            navPosition: 'bottom',
            slideBy: 'page',
            speed: 800,
            swipeAngle: true,
            responsive: {
                480: {
                    items: 1
                },
                576: {
                    items: 2
                },
                800: {
                    items: 3
                }
            }
        });

        function equalizeQuoteCardHeights() {
            var items = document.querySelectorAll('.tns-slider--quotes .tns-item');
            items.forEach(function(item) { item.style.height = ''; });
            var maxH = 0;
            items.forEach(function(item) { maxH = Math.max(maxH, item.offsetHeight); });
            items.forEach(function(item) { item.style.height = maxH + 'px'; });
        }

        equalizeQuoteCardHeights();
        window.addEventListener('resize', equalizeQuoteCardHeights);
    }


    /*
  
    - The tinySlider triggers for each element that have class "tns-slider--regular"
  
    - All settings can come from "data" attributes, for example:
      data-items="6" data-autoplaydirection="backward" data-loop="true" data-autoplay="true" data-autoplayhoverpause="false" data-autoplaybuttonoutput="false" data-controls="false" data-nav="false" data-speed="3300" data-autoplaytimeout="0" data-preventactionwhenrunning="true" data-mousedrag="false" data-fixedwidth="120" data-gutter="0"
  
    - data-externalNav attribute defines a container (by it's ID) which child elements will be linked to the slider items as navigation buttons. The order of the clicked child element triggers the slide in the same order position. For example the external navigation container will have ID "sliderNavExternal" and the slider container will have data attribute data-externalNav="sliderNavExternal".
  
    */
  
      if (document.querySelector('.tns-slider--regular')) {
  
        var availableConfigSettings = ['mode','axis','items','gutter','edgePadding','fixedWidth','autoWidth','viewportMax','slideBy','center','controls','controlsPosition','controlsText','controlsContainer','prevButton','prevButton','nextButton','nav','navPosition','navContainer','navAsThumbnails','arrowKeys','speed','autoplay','autoplayPosition','autoplayTimeout','autoplayDirection','autoplayText','autoplayHoverPause','autoplayButton','autoplayButtonOutput','autoplayResetOnVisibility','animateIn','animateOut','animateNormal','animateDelay','loop','rewind','autoHeight','responsive','lazyload', 'lazyloadSelector','touch','mouseDrag','swipeAngle','preventActionWhenRunning','preventScrollOnTouch','nested','freezable','disable','startIndex','useLocalStorage','nonce'];
  
        //Since indexOf is case sensitive, we need to convert the settings
        var settingsSmallCase = [];
        for (var i = 0; i < availableConfigSettings.length; i++) {
            settingsSmallCase.push(availableConfigSettings[i].toLowerCase());
        }
  
        var sliderInit =[];
        var containers = document.getElementsByClassName('tns-slider--regular');
  
        for (var i = 0; i < containers.length; i++) {
  
          //target slider container
          var container = containers[i];
  
          //variable for linked external navigation
          var externalNavContainer = null;
  
          //Getting the data configuration attributes
          var data = {};
          var sliderSettings = [];
  
          [].forEach.call(container.attributes, function(attr) {
            if (/^data-/.test(attr.name)) {
  
              var dataName = attr.name.replace(/data-/,'').toLowerCase();
  
              if (dataName == 'externalnav') {
                externalNavContainer = document.getElementById(attr.value);
              }
  
              //Check if boolean (true/false)
              if (String(attr.value).toLowerCase() == "true") {data[dataName] = true;}
              else if (String(attr.value).toLowerCase() == "false") {data[dataName] = false;}
  
              //Check if is number
              else if ( (String(attr.value).toLowerCase() !== "false") && (String(attr.value).toLowerCase() !== "true") && !isNaN(attr.value) ) {
                data[dataName] = parseInt(attr.value);
              }
  
              else {data[dataName] = attr.value;}
  
            }
          });
  
          for (var property in data) {
           if (settingsSmallCase.indexOf(property) !== -1) {
             sliderSettings[availableConfigSettings[settingsSmallCase.indexOf(property)]] = data[property];
           }
          }
  
          sliderSettings['container'] = container;
          sliderSettings['slideInit'] = slideInit(); //Trigger function on slider initialization(currently for handling the loader/spinner)
          sliderInit[i] = tns(sliderSettings);
  
          function slideInit() {
  
            //Function for slider initialization (currently set for laoder)
            //Important:
            // 1 - Have main container ID for the slider container as "main-tns-container"
            // 2 - position the loader element right above the slider main container (using same parent)
  
            //Stop the function if the container is missing the 'main-tns-container' ID or if it doesn't exist
            if (typeof document.getElementById('main-tns-container') === 'undefined' || document.getElementById('main-tns-container') === null) {
                return;
            }
  
            var container = document.getElementById('main-tns-container');
            var loader = container.previousElementSibling;
  
            if (isFirefox) { 
  
              container.style.opacity = '0';
              container.style.display = 'block';
              container.style.position = 'absolute';
              
              //Delay because FF is starting the slider with wrong speend and wrong direction if the script is not fully loaded
              setTimeout(function() {
      
                container.style.position = 'relative';
                loader.style.display = 'none';
                container.style.opacity = '1';
  
               }, 3300);
            } else {
              loader.style.display = 'none';
              container.style.display = 'block';
            }
  
          }
  
          //check and trigger external navigation
          if ( (externalNavContainer !== 'undefined') && (externalNavContainer !== '') && (externalNavContainer !== null) ) {
            [].forEach.call(externalNavContainer.children, function(child, index) {
              var slider = i;
              child.addEventListener('click', function () {
                sliderInit[slider].goTo(index);
              });
            });
          }
        }
  
        //re-creating the sliders on screen resize
        window.addEventListener('resize', function(){
          [].forEach.call(sliderInit, function(slider, index) {
  
            //re-creating the sliders
            sliderInit[index].destroy();
            sliderInit[index] = sliderInit[index].rebuild();
  
            //re-initialize LazyLoad in case the slider images are using b-lazy class
            lazyLoad = new LazyLoad({
                elements_selector: '.b-lazy'
            });
          });
        });
  
      }
}

// Event Listener Functions
function linkScrollToContent(e) {
    var $clicker = (e.target.closest("a")) ? e.target.closest("a") : e.target;

    // Disable empty hash links
    if ($clicker.matches("a[href=\"#\"]") || $clicker.matches("a[href$=\"#\"]")) {
        e.preventDefault();

        // If Back to Top link, scroll to top of page
        if($clicker.id === "back-to-top") {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }
    else if ($clicker.matches("a")) {
        var $link_to = $clicker.getAttribute("href"),
            $path = window.location.href,
            elem, $elem, url_arr = $link_to.split("#");

    // If search exists and contains fr=1, bypass
        if ($clicker.search && $clicker.search.indexOf('fr=1') >= 0) {
            return;
        }
        if ($link_to.indexOf('#') > -1 && $path.indexOf(url_arr[0] >= 0)) {
            elem = $link_to.substring($link_to.indexOf("#") + 1);
            $elem = document.querySelector('#' + elem);
            if (elem) {
                if ($elem) {
                    e.preventDefault();
                    //Addition for the sticky nav
                    var navWrapStyleHeight = 0;
                    if(window.innerWidth > vwISMobileMenu) {
                      var navWrap = document.querySelector('#main-header .nav__container');
                      navWrapStyleHeight = (navWrap !== null) ? navWrap.offsetHeight : 0;
                    }
    
                    // Fire off Animation
                    var opts = _generateScrollToOpts($elem, { offsetTop: (navWrapStyleHeight + 10) });
                    window.scrollTo(opts);
                }
            }
        }
    }
}

// When Document is Ready
_whenDOMReady(function () {
    // Initialize conditional mobile content display
    mobileDeviceDisplay.init();
    // Trigger GDPR Message Check
    // if (document.querySelector('#gdpr')) {
    //     gdpr.init();
    // }

    // Enable Sticky Nav, Back to Top, and Pricing Options
    stickyNav.enable();
    revealBackToTop.enable();
    pricingOptions.init();

    // Enable Accordions if they exist on page
    var $accordions = document.querySelectorAll('.accordion');
    for (var i = 0; i < $accordions.length; i++) {
      var allowMulti = ($accordions[i].getAttribute('data-accordion-multiopen')) ? $accordions[i].getAttribute('data-accordion-multiopen') === "true" : false;
      accordion.init($accordions[i], allowMulti);
    }

    // Initialize LazyLoad Content
    lazyLoad = new LazyLoad({
        elements_selector: '.b-lazy'
    });
    lazyLoadIframe = new LazyLoad({
        elements_selector: '.b-lazy-iframe',
        // TODO: If LazyLoad Plugin is upgrade to v11+, then this method switches to callback_loaded
        callback_load: function (el) {
            _fadeOut(el.parentNode.querySelector(".spinner"), { fadeIncrement: 0.05, removeEl: true });
            return false;
        }
    });

    var filterDomContent = new FilterDomContent();

    if(document.querySelector('.vid-replace')) {
        replaceVideos.init();
    }

    // TODO: Potentially expand to make it more of an all-purose modal. Add Accessibility features
    videoModal.init();
    customModal.init();

    // TODO: Optimize initTinySliders to be more configurable
    initTinySliders();

    // Trigger plugin to animate content into viewport
    myAnimation = new AnimateMe({
        classSelector: "animate-me"
    });

    /********
    Event Listeners
    ********/
    // Click
    document.addEventListener('click', function (e) {
        // Local Scroll: On Click
        linkScrollToContent(e);
    }, false);
});

window.addEventListener('load', function () {
    /********
    Local Scroll: On Load
    ********/
    setTimeout(function () {
        var hash = window.location.hash;
        if (hash) {
            var $elem = document.querySelector(hash.toString()), opts;
            if ($elem) {
                opts = _generateScrollToOpts($elem, { offsetTop: 125 });
                window.scrollTo(opts);
            }
        }
    }, 10);

});


/********
Input Phone
********/
document.addEventListener("DOMContentLoaded", function() {
const inputs = document.querySelectorAll("[id^='Phone_']");

 if (inputs.length === 0) {
    console.log("No ID 'Phone_'");
    return;
  }

inputs.forEach(input => {
  window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: callback => {
      fetch("https://ipapi.co/json").then(res => res.json()).then(data => callback(data.country_code)).catch(() => callback("us"));
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.16/build/js/utils.js",
  });
});
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // IntersectionObserver configuration
    const options = {
        root: null, // use the viewport as the observation area
        rootMargin: '200px', // load when the element is 200px away from being visible
        threshold: 0.1 // percentage of visibility needed to trigger loading
    };

    // Callback for IntersectionObserver
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source.lazy-video');
                
                // Only load if src is in data-src
                if (source && source.getAttribute('data-src')) {
                    source.src = source.getAttribute('data-src');
                    video.load(); // Load the video
                    
                    // If video has autoplay, try to play it
                    if (video.autoplay) {
                        video.play().catch(e => console.log('Autoplay prevented:', e));
                    }
                    
                    observer.unobserve(video); // Stop observing
                }
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Find all videos that should have lazy loading
    const videos = document.querySelectorAll('video source.lazy-video');

    // Prepare videos for lazy loading
    videos.forEach(videoSource => {
        const video = videoSource.closest('video');
        
        // Store original src in data-src and remove it from src
        if (videoSource.src) {
            videoSource.setAttribute('data-src', videoSource.src);
            videoSource.removeAttribute('src');
        }
        
        // Observe the container video element
        observer.observe(video);
    });
});