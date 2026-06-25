'use strict';
var navigation = (function () {
    // Variables
    var navHoverActive,
        touchedPreviousTarget,
        settings = {},
        vars = {};

    /**
    * Summary: Getting DOM elements and values
    *
    * @return {Object} returns an object of environment DOM elements and values
    */
    var initSettings = function () {
        var env = {};

        env.switchPoint = 860;
        env.navWrap = document.getElementById('main-header');
        env.navbar = document.getElementById('main-header'); // TBD
        env.navbarContainer = document.getElementById('navbar-container');
        env.menu = ( document.getElementById('menu-main-menu-header') ) ? document.getElementById('menu-main-menu-header') : document.getElementById('menu-main-menu-header-jp');
        //env.menu = document.getElementsByClassName('main-menu-header')[0];
        env.activeSubmenuParentClass = 'nav-item__hover'; //Class for element with active sub-menu
        env.menuItemIsParentClass = 'menu-item-has-children'; //Class for element with active sub-menu
        env.menuItemsClass = 'navbar__link--hover'; //- TBD adjust touch script - line 494
        env.menuItemsAria = env.menu.querySelectorAll('.menu-item-link');
        env.menuItems = env.menu.querySelectorAll('.menu-item-has-children > a');
        env.navbarButton = document.getElementById('navbar-button');

        env.isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                 navigator.userAgent &&
                 navigator.userAgent.indexOf('CriOS') == -1 &&
                 navigator.userAgent.indexOf('FxiOS') == -1 &&
                 !navigator.userAgent.match('FxiOS');

        settings.win = (window.innerWidth > env.switchPoint) ? 'wide' : 'small';

        return env;

    };

    /**
    * Summary: Adding transition class separately in order to avoid menu "flash" on page load
    */
    function addTransition() {
        var subMenus = vars.menu.getElementsByClassName('sub-menu'); //sub-menu
        //var subMenus = querySelectorAll('');
        for (var i = 0; i < subMenus.length; i++) {
            subMenus[i].classList.add('nav__dropdown--transition');
        }
    }

    /**
    * Summary: ....
    *
    * @param {String} win = string value to determine navigation display 'wide' for desktop and 'small' for mobile
    * @param {Boolean} reset = boolean to reset submenu height and remove the expand class
    *
    */
    var menuCollapse = function (win, reset) {
        var win = win || settings.win,
            reset = reset || false;
        var subMenus = vars.menu.getElementsByClassName('sub-menu');

        if ((win !== 'small') || (vars.mobileMenuCollapse !== true)) {
            return;
        }

        if (reset === true) {
            for (var i = 0; i < subMenus.length; i++) {
                subMenus[i].previousElementSibling.classList.remove('navbar__link--expand');
                subMenus[i].style.maxHeight = null;
            }
        }

        for (var i = 0; i < subMenus.length; i++) {
            subMenus[i].previousElementSibling.onclick = function () {
                this.classList.toggle('navbar__link--expand');
                var menu = this.nextElementSibling;

                if ((" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf('navbar__link--expand') < 0) {
                    menu.style.maxHeight = null;
                } else {
                    menu.style.maxHeight = menu.scrollHeight + 'px';
                }
            };
        }
    };

    /**
    * Summary: Check if it's touch device
    */
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }


    /**
    * Summary: Getting DOM elements and values
    *
    * @param {String} win = string value to determine navigation display 'wide' for desktop and 'small' for mobile
    * @param {Object} element = DOM element of event target
    * @param {String} action = string value to determine hover active state
    *
    */
    function navHover(win, element, action) {

        if ((navHoverActive === element) && (action == 'setActive')) { //same element
            return;
        }

        navHoverActive = element;
        resetNavbarLinks(element);

        if (action == 'setActive') {
            element.parentNode.className += ' nav-item__hover';
        } else if (action == 'setInactive') {
            element.parentNode.className.replace(/\nav-item__hover\b/g, '');
            navHoverActive = null;
        }
    }

    function resetNavbarLinks(element) {
        for (var i = 0; i < vars.menuItems.length; i++) {

            if (element) {
                vars.menuItems[i].parentNode.classList.remove('nav-item__hover');
            } else if (element !== vars.menuItems[i]) {
                vars.menuItems[i].parentNode.classList.remove('nav-item__hover');
            }
        }
    }

    // ARIA Navigation Functionality
    //ARIA start
    var menuARIA = function (menu) {

        var returnARIA = {},
            menu = menu || vars.menu;

        returnARIA.reset = function () {
            MobileExpand();
            return;
        };

        var MobileExpand = function () {
            if (!vars.mobileMenuCollapse) {

                var ariaExpandedElements = document.querySelectorAll('[aria-expanded]'),
                    ariaExpanded = (settings.win == 'small') ? true : false;

                for (var i = 0; i < ariaExpandedElements.length; i++) {
                    ariaExpandedElements[i].setAttribute('aria-expanded', ariaExpanded);
                }
            } else {
                //TBD if collapsable mobile menu is enabled...
            }
        }

        menu.keyCode = Object.freeze({
            'TAB': 9,
            'RETURN': 13,
            'ESC': 27,
            'SPACE': 32,
            'PAGEUP': 33,
            'PAGEDOWN': 34,
            'END': 35,
            'HOME': 36,
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40
        });

        function ariaActive(el) {
            var tgt = el;

            resetNavbarLinks(tgt);
            navHover(settings.win, tgt, 'setActive');

        }

        function ariaReset() {
            resetNavbarLinks();
        }

        function ariaFirst() {
            vars.menuItemsAria[0].setAttribute('tabindex', '0');
            vars.menuItemsAria[0].focus();
        }

        function ariaLast() {
            vars.menuItemsAria[vars.menuItemsAria.length - 1].setAttribute('tabindex', '0');
            vars.menuItemsAria[vars.menuItemsAria.length - 1].focus();
        }

        function ariaNext(tgt) {

            if (tgt.parentElement.nextElementSibling == null) {
                tgt.setAttribute('tabindex', '-1');
                ariaFirst();
                return;
            }

            var nextTarget = tgt.parentElement.nextElementSibling.querySelector('[tabindex="-1"]');

            tgt.setAttribute('tabindex', '-1');
            nextTarget.setAttribute('tabindex', '0');
            nextTarget.focus();
        }

        function ariaPrevious(tgt) {

            if (tgt.parentElement.previousElementSibling == null) {
                tgt.setAttribute('tabindex', '-1');
                ariaLast();
                return;
            }

            var prevTarget = tgt.parentElement.previousElementSibling.querySelector('[tabindex="-1"]');

            tgt.setAttribute('tabindex', '-1');
            prevTarget.setAttribute('tabindex', '0');
            prevTarget.focus();
        }

        function ariaNextUp(tgt) {

            var current,
                last = tgt.length - 1;

            for (var i = 0; i < tgt.length; i++) {
                if (tgt[i].hasAttribute('aria-dropdown-focus')) {
                    current = i;
                }

                tgt[i].removeAttribute('aria-dropdown-focus');
            }

            if ((!current) || (current == 'undefined')) {
                current = 0;
            }

            if (current == 0) {
                tgt[last].setAttribute('aria-dropdown-focus', '1');
                tgt[last].focus();
            } else {
                tgt[current - 1].setAttribute('aria-dropdown-focus', '1');
                tgt[current - 1].focus();
            }
        }

        function ariaNextDown(tgt) {

            var current;
            for (var i = 0; i < tgt.length; i++) {
                if (tgt[i].hasAttribute('aria-dropdown-focus')) {
                    current = i + 1;
                    break;
                } else {
                    current = 0;
                }
            }

            if (current == 0) {
                tgt[0].setAttribute('aria-dropdown-focus', '1');
                tgt[0].focus();
            } else {
                if (current == tgt.length) {
                    tgt[tgt.length - 1].removeAttribute('aria-dropdown-focus');
                    tgt[0].setAttribute('aria-dropdown-focus', '1');
                    tgt[0].focus();
                    current = 0;
                    return;
                }
                tgt[current - 1].removeAttribute('aria-dropdown-focus');
                tgt[current].setAttribute('aria-dropdown-focus', '1');
                tgt[current].focus();

            }
        }

        function ariaUpDownReset() {
            var items = document.querySelectorAll('li > a[tabindex="-1"]');
            for (var i = 0; i < items.length; i++) {
                items[i].removeAttribute('aria-dropdown-focus');
            }
        }

        function handleKeydown(e) {

            var tgt = this.querySelector('[tabindex="0"]'),
                char = e.key,
                flag = false,
                clickEvent;

            switch (e.keyCode) {

                case this.keyCode.LEFT:
                    ariaReset();
                    ariaPrevious(tgt);
                    flag = true;
                    break;

                case this.keyCode.RIGHT:
                    ariaReset();
                    ariaNext(tgt);
                    flag = true;
                    break;

                case this.keyCode.DOWN:
                    if ((tgt.parentElement.getAttribute('aria-haspopup') == 'true') && (tgt.getAttribute('tabindex') == '0')) {
                        ariaNextDown(tgt.nextElementSibling.querySelectorAll('ul a[tabindex="-1"]'));
                        flag = true;
                    }
                    break;

                case this.keyCode.UP:
                    if ((tgt.parentElement.getAttribute('aria-haspopup') == 'true') && (tgt.getAttribute('tabindex') == '0')) {
                        ariaNextUp(tgt.nextElementSibling.querySelectorAll('ul a[tabindex="-1"]'));
                        flag = true;
                    }
                    break;

                case this.keyCode.HOME:
                case this.keyCode.PAGEUP:
                    ariaFirst();
                    flag = true;
                    break;

                case this.keyCode.END:
                case this.keyCode.PAGEDOWN:
                    ariaLast();
                    flag = true;
                    break;

                case this.keyCode.TAB:
                    ariaReset();
                    break;

                case this.keyCode.ESC:
                    ariaReset();
                    break;

                default:
                    ariaReset();
                    break;
            }

            if (flag) {
                e.stopPropagation();
                e.preventDefault();
            }

        }

        function handleMouseover() {

            if (((" " + this.parentElement.className + " ").replace(/[\n\t]/g, " ").indexOf('nav-item__hover') < 0) && this.hasAttribute('aria-haspopup')) {
                this.setAttribute('aria-expanded', 'true');
            }
        }

        function handleMouseout() {

            if (this.hasAttribute('aria-expanded')) {
                this.setAttribute('aria-expanded', 'false');
            }
        }

        function handleFocus() {

          var focusTarget = this;

          if (settings.win == 'small') {

            //Disables first click if it's a link
            focusTarget.style.pointerEvents = 'none';

            //Enables back the click
            setTimeout(function(){
              focusTarget.style = null;
            }, 300);
          }

          if (focusTarget.parentNode.hasAttribute('aria-haspopup')) {
              ariaActive(focusTarget)
              focusTarget.parentNode.setAttribute('aria-expanded', 'true');
          }

            //
            setActionsNavbarContainerOffset();
        }

        function handleTouch() {
          var touchTarget = this;

          //If it's touch devide with wide screen
          if( (is_touch_device() == true) && (settings.win == 'wide') ){
            if (((" " + touchTarget.parentElement.className + " ").replace(/[\n\t]/g, " ").indexOf('nav-item__touched') < 0) && touchTarget.parentElement.hasAttribute('aria-haspopup')) {

                //Identify the link as touched before making it inactive for the first click
                //and resetting other touched links (if any)
                var touchedLinks = document.querySelectorAll('.nav-item__touched');
                for (var i = 0; i < touchedLinks.length; i++) {
                  touchedLinks[i].classList.remove('nav-item__touched');
                }
                
                //resetNavbarLinks(touchTarget);
                navHover(settings.win, touchTarget, 'setActive');
                touchTarget.parentElement.classList.add('nav-item__touched');
                this.setAttribute('aria-expanded', 'true');

                //Disables first click if it's a link
                touchTarget.style.pointerEvents = 'none';

                //Enables back the click
                setTimeout(function(){
                  touchTarget.style = null;
                }, 300);

                //
                setActionsNavbarContainerOffset();
            }
          } else {
            if ( (this.getAttribute('href') == null) || (this.getAttribute('href') == '#') ){
                if( ((" " + touchTarget.parentElement.className + " ").replace(/[\n\t]/g, " ").indexOf('nav-item__hover') < 0) && touchTarget.parentElement.hasAttribute('aria-haspopup') ){
                  touchTarget.parentElement.classList.add('nav-item__hover');
                } else {
                  touchTarget.parentElement.classList.remove('nav-item__hover');
                }
                //
                //currently disabled
                //setActionsNavbarContainerOffset();
                return;
              }
          }
        }


        function handleBlur() {

            if (this.parentNode.hasAttribute('aria-expanded')) {
                //ariaReset();
                this.parentNode.setAttribute('aria-expanded', 'false');
            }

            //
            setActionsNavbarContainerOffset();

            //reset the sub-nav items focus
            ariaUpDownReset();

        }


        for (var i = 0; i < vars.menuItems.length; i++) {

          if (is_touch_device() == false) {
            vars.menuItems[i].addEventListener('mouseover', handleMouseover);
            vars.menuItems[i].addEventListener('mouseout', handleMouseout);
          }

            vars.menuItems[i].addEventListener('focus', handleFocus);
            vars.menuItems[i].addEventListener('blur', handleBlur);
        }

        menu.addEventListener('keydown', handleKeydown);

        if( (is_touch_device() == false) || (settings.win == 'small') ){

          for (var n = 0; n < vars.menuItems.length; n++) {
            if (vars.isSafari) {
              vars.menuItems[n].addEventListener('mousedown', handleTouch);
            } else {
              vars.menuItems[n].addEventListener('click', handleTouch);
            }
          }
        } else if( (is_touch_device() == true) || (settings.win == 'small') ){

          for (var m = 0; m < vars.menuItems.length; m++) {
            vars.menuItems[m].addEventListener('touchstart', handleTouch);
          }
        }
        window.menuARIA = MobileExpand;

    };
    //ARIA end


    /****
    // Setting "Sign in" and "Request Demo" top links position for mobile
    ****/
  function setActionsNavbarContainerOffset(reset) {
    if (settings.win == 'wide') {
      document.querySelector('.nav__actions').style = null;
      return;
    } //Interrupt for desktop

    if (reset == 'reset') {
      document.querySelector('.nav__actions').style.marginTop = 0;
    } else {
      document.querySelector('.nav__actions').style.marginTop = vars.navbarContainer.offsetHeight + 'px';
    }
  }


    /****
    ****/
    function enableNavigation() {
        window.addEventListener('load', addTransition, false);
        menuCollapse();
        menuARIA(vars.menu);


        //Mobile menu button click
        vars.navbarButton.onclick = function () {

            if (settings.win !== 'small') return;

            vars.navbar.classList.toggle('navbar--header__active');
            vars.navbarButton.classList.toggle('navbar--button__active');

          setActionsNavbarContainerOffset();

        }

        //Handling mouseEnter/mouseLeave events on the menu items
        for (var i = 0; i < vars.menuItems.length; i++) {

            vars.menuItems[i].addEventListener('mouseenter', function () {
                //interrupt if burger menu is active
                if (settings.win !== 'wide') return;


                navHover(settings.win, this, 'setActive');
                setActionsNavbarContainerOffset();
            });

            vars.menuItems[i].addEventListener('mouseleave', function (el) {

                //interrupt if burger menu is active
                if (settings.win !== 'wide') return;


                var element = this,
                    sibling;

                //check if it doesn't have sub-menu
                if ((!element.nextElementSibling) || (element.nextElementSibling == null)) {
                    navHover(settings.win, element, 'setInactive');
                    return;
                } else {
                    sibling = element.nextElementSibling;
                    var e = event.toElement || event.relatedTarget;
                    if (e == element || e == sibling) {
                        sibling.addEventListener('mouseleave', function () {
                            navHover(settings.win, element, 'setInactive');
                            return;
                        });
                        return;
                    } else {
                        navHover(settings.win, element, 'setInactive');
                    }
                }

                //
                setActionsNavbarContainerOffset();
            });
        }

        //Resize window event
        var resize;
        window.addEventListener('resize', function (event) {
            if (resize) {
                window.cancelAnimationFrame(resize);
            }

            // Setup the new requestAnimationFrame()
            window.requestAnimationFrame(function () {

                // Run our scroll functions
                settings.win = (window.innerWidth > vars.switchPoint) ? 'wide' : 'small';

                //Mobile collapsable menu
                if (vars.mobileMenuCollapse == true) {
                    menuCollapse(settings.win, true);
                }

                if (settings.win == 'wide') {
                    //document.body.classList.remove('body--nav__active');
                    //vars.navWrap.classList.remove('navbar--fixed__active');
                    vars.navbar.classList.remove('navbar--header__active');
                    vars.navbarButton.classList.remove('navbar--button__active');
                    //vars.navbarContainer.classList.remove('show');


                    //clear the top margin if added from mobile nav
                    document.querySelector('.nav__actions').style = null;

                    if (document.getElementById('light-background')) {
                        var lightBgr = document.getElementById('light-background');
                        lightBgr.parentElement.removeChild(lightBgr);
                    }

                }
            });
        }, false);
    }

    /**
    * Summary: Initialize Navigation
    *
    * @return {type} return is not essential to function
    */
    function init() {
        vars = initSettings();
        enableNavigation();

        return false;
    }

    return {
        init: init
    }
})();

var headerSearchForm = (function () {
    function init() {

      var targetLabel = document.getElementById('header-search-form-label');
      var targetInput = document.querySelector('#header-search-form #s');

      targetLabel.addEventListener('click', function() {
        this.classList.toggle('opened');
        this.parentNode.classList.toggle('active-search');
      });

      targetInput.addEventListener('focus', function() {
        targetLabel.classList.add('opened');
        targetLabel.parentNode.classList.add('active-search');
      });

      targetInput.addEventListener('blur', function() {
        targetLabel.classList.remove('opened');

        setTimeout(function(){
          targetLabel.parentNode.classList.remove('active-search');
        }, 120);

      });

      // Debounce
      function debounce(func, time){
          var resTime = time || 100; // 100 by default if no param
          var resTimer;
          return function(e){
              if(resTimer) clearTimeout(resTimer);
              resTimer = setTimeout(func, resTime, e);
          };
      }

      function handleHeaderSearch(){

        targetLabel.classList.remove('opened');
        targetLabel.parentNode.classList.remove('active-search');

      }

      window.addEventListener('resize', debounce( handleHeaderSearch, 150 ));

      handleHeaderSearch();
      return false;
    }

    return {
        init: init
    }
})();

// Initialize the menu script
if (document.querySelector('.main-menu-header')) {
    navigation.init();
}

// Initialize the menu script
if (document.querySelector('#header-search-form-label')) {
    headerSearchForm.init();
}
