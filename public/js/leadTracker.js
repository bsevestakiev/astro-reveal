    // Helper to get cookies with a specific prefix
    function _getCookiesValuesWithLeadSourcePrefix(cookiePrefix) {
        const cookiesValues = {};
        if (!cookiePrefix) return cookiesValues;
        const cookies = document.cookie?.split(';')?.map(cookie => cookie?.trim());
        if ((cookies?.length ?? 0) === 0) return cookiesValues;
        const filteredCookies = cookies.filter(cookie => cookie.startsWith(cookiePrefix));
        if ((filteredCookies?.length ?? 0) === 0) return cookiesValues;
        for (let i = 0; i < filteredCookies.length; i++) {
            const prefixedCookie = filteredCookies[i];
            const [cookieName, cookieValue] = prefixedCookie.split('=');
            if (cookieValue)
                cookiesValues[cookieName] = cookieValue;
        }
        return cookiesValues;
    }

// Utility to get app API host (for legacy endpoints)
function getAppApiHost() {
    var cfg = window.__REVEAL_CONFIG__;

    return (cfg.deployEnv === 'production') ? 'www.infragistics.com' : 'staging.infragistics.com';
}

// Resolve the lead-tracking API base. Prefer __REVEAL_CONFIG__.leadApiBase
// (injected from PUBLIC_LEAD_API_BASE); fall back to legacy host detection.
function _apiBase() {
    var cfg = window.__REVEAL_CONFIG__;
    return (cfg && cfg.leadApiBase)
        ? cfg.leadApiBase
        : window.location.protocol + '//' + getAppApiHost();
}

function leadTrackingURL() {
    var cfg = window.__REVEAL_CONFIG__;
    return cfg.leadTrackingPath;
}

var leadTracker = {};
leadTracker._getCurrentSlug = function () {
    var path = (window.location.pathname || '').replace(/\/+$/, '');
    var parts = path.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : '';
};

leadTracker._shouldBypassWhitepaperGate = function () {
    var fwp = new URLSearchParams(window.location.search || '').get('fwp');
    if (fwp === null) return false;
    var normalized = String(fwp).trim().toLowerCase();
    return normalized === '0' || normalized === 'false';
};

leadTracker.ungate = function (displayGatedContentType) {
    var currentWhitepaper = leadTracker._getCurrentSlug(),
            storedWhitepapers = JSON.parse(localStorage.getItem('available-whitepapers')) || [],
      inStorage = (storedWhitepapers.indexOf(currentWhitepaper) !== -1) ? true : false;

    // Gate Hide
    var gatedSection = document.getElementById('gated-content'),
        gatingArea = document.getElementById('gating-area');

        if (!gatedSection || !gatingArea) return;

    // Show Gated Area and remove Form
    gatedSection.classList.remove('hidden');
    gatedSection.classList.remove('d-none');
    gatingArea.parentNode.removeChild(gatingArea);

    // bypass gate
    if (displayGatedContentType === 'bypass') return;

    // Set localStorage to remember if user filled whitepaper
    if (!inStorage) {
        storedWhitepapers.push(currentWhitepaper);
        localStorage.setItem('available-whitepapers', JSON.stringify(storedWhitepapers));
    }

    // Smooth Scroll behavior
    if (displayGatedContentType === 'smooth') {
        var offset = gatedSection.previousElementSibling.offsetTop,
            topOfElement = gatedSection.offsetTop - offset;

        window.scroll({ top: topOfElement, behavior: 'smooth' });
    }
};

leadTracker.initWhitepaperGate = function () {
    var gatedSection = document.getElementById('gated-content');
    var gatingArea = document.getElementById('gating-area');
    if (!gatedSection || !gatingArea) return;

    var currentWhitepaper = leadTracker._getCurrentSlug();
    var storedWhitepapers = JSON.parse(localStorage.getItem('available-whitepapers')) || [];
    var inStorage = currentWhitepaper ? storedWhitepapers.indexOf(currentWhitepaper) !== -1 : false;
    var bypassByQuery = leadTracker._shouldBypassWhitepaperGate();

    if (inStorage || bypassByQuery) {
        leadTracker.ungate('bypass');
    }
};

leadTracker.handleVideo = function(){
    //console.log('coming soon...');

    var URI = document.baseURI.substring(document.baseURI.lastIndexOf('/') + 1),
        currentWebinarRaw = URI.indexOf('?') > 0 ? URI.substring(0, URI.indexOf('?')) : URI,
        currentWebinar = URI.lastIndexOf('#') > 0 ? currentWebinarRaw.replace('#', '') : currentWebinarRaw,

        watchedWebinarsListCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('slingshot-watched-webinars='))
        ?.split('=')[1] || null,

        watchedWebinarsList = JSON.parse(watchedWebinarsListCookie) || [],
        currentWebinarInStorage = (watchedWebinarsList.indexOf(currentWebinar) !== -1) ? true : false;

        

    // Set Cookie to remember if user have registered for the webinar
    if (!currentWebinarInStorage) {
        watchedWebinarsList.push(currentWebinar);
        document.cookie = `slingshot-watched-webinars=${JSON.stringify(watchedWebinarsList)}`;
        
        //AJAX video area update
        var url = window.location.href;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        var spinner = `<div id="showVideoLoader" class="loader__container spinner__container" style="min-height: 200px;"><div class="spinner spinner--border"></div></div>`;

        document.getElementById('videoContainer').innerHTML = spinner;

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('showVideo=true');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                document.getElementById('videoContainer').innerHTML = this.responseText; 
            }
        }

    } else {
        //console.log('Existing record ...');
    }

};



leadTracker.execute = function (settings) {
    leadTracker._renderWithSettings(settings);
};

// Internal function to render the form with merged settings
leadTracker._renderWithSettings = function(settings) {
    // ...existing code from inside leadTracker.execute...

    var productCode = settings.productCode,
        leadProductCode = settings.leadProductCode || productCode,
        redirectUrl = settings.redirectUrl,
        reaptchaKey = settings.reaptchaKey,
        macroLang = settings.lang,
        zoomWebinarId = settings.zoomWebinarId || "",
        goalType = settings.googleEventType || "",
        goalLabel = settings.googleEventLabel || "",
        goalDownloadType = settings.googleEventTypeDownload || "",
        goalDownloadLabel = settings.googleEventLabelDownload || "",
        apiUrl = getAppApiHost(),
        leadFormID = settings.leadFormID,
        formContainerId = settings.formContainerId,
        tier = settings.tier,
        formLocation = settings.formLocation,
        formValue = settings.formValue,
        productName = settings.productName,
        recaptchaToken;

    //interrupt if there is no form
    if ( document.querySelector('#' + leadFormID) == null ){
        return;
    }

  // Events
    leadTracker.initWhitepaperGate();

  $leadTrackForm = document.querySelector('#' + leadFormID);
  $isLeadFormAvailable = $leadTrackForm;
  $formSubmitSelector = $leadTrackForm.querySelector('.submit');
  $acceptGDPRSelector = $leadTrackForm.querySelector('.accept-gdpr');
  if ($formSubmitSelector) {
    $formSubmitSelector.addEventListener('click', (e) => {
      e.preventDefault();
      var _this = e.target;
      _this.setAttribute('disabled', true);

      var $form = _this.closest('form');
      var inputs = $form.querySelectorAll('input, select, textarea'), i;
      for(i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'email') {
            igSfForms.sfUtils.validateEmail(inputs[i], macroLang, false);
        }
        else if (inputs[i].type === 'tel') {
            igSfForms.sfUtils.validatePhone(inputs[i], macroLang);
        }
        else if (inputs[i].type === 'url') {
            igSfForms.sfUtils.validateUrl(inputs[i], macroLang);
        }
        else if (inputs[i].type === 'text' || inputs[i].tagName.toLowerCase() === 'textarea' || inputs[i].tagName.toLowerCase() === 'select') {
            igSfForms.sfUtils.validateRequired(inputs[i], macroLang);
        } else if (inputs[i].type === 'checkbox') {
            igSfForms.sfUtils.validateCheckbox(inputs[i], macroLang, true);
        } else {
            igSfForms.sfUtils.validateLength(inputs[i], macroLang);
        }
      }
      var errors = $form.querySelectorAll('.fieldInvalid');
      if (errors.length > 0) {
          // Errors Found
          errors[0].focus();
          // Renable button after errors are found
          _this.removeAttribute('disabled');
      } else {
        // No Errors Found
        // Determine which macro is being used to know what APIs to call
        // If reCAPTCHA isn't loaded (PUBLIC_RECAPTCHA_SITE_KEY empty), skip
        // token fetch and submit directly. Otherwise fetch a token and attach.
        var recaptchaAvailable = (typeof grecaptcha !== 'undefined') && reaptchaKey;
        if (leadTrackerFormUtility) {
          if (recaptchaAvailable) {
            grecaptcha.ready(function () {
                grecaptcha.execute(reaptchaKey, { action: 'leadEvent' }).then(function (token) {
                    if (token) {
                        recaptchaToken = token;
                        submitLeadTrackingForm();
                    } else {
                        _this.closest('form').querySelector('#recaptchaError').style.display = "block";
                    }
                });
            });
          } else {
            submitLeadTrackingForm();
          }
        }
        if(leadTrackerDownloadFormUtility) {
          if (recaptchaAvailable) {
            grecaptcha.ready(function () {
              grecaptcha.execute(reaptchaKey, { action: 'downloadEvent' }).then(function (token) {
                if (token) {
                  recaptchaToken = token;
                  submitDownloadLeadTrackingForm();
                } else {
                  _this.closest('form').querySelector('#recaptchaError').style.display = "block";
                }
              });
            });
          } else {
            submitDownloadLeadTrackingForm();
          }
        }
        }
    });
  }

  function renderForm() {

    var $form = document.querySelector('#' + settings.leadFormID)
    var $inputs = $form.querySelectorAll('input, textarea, select');
    for(const i of $inputs){
      i.addEventListener('keyup', igSfForms.sfUtils._debounce((e) => {
        if ([9, 13, 16, 17, 20, 27, 144].indexOf(e.keyCode) <= -1) {
            igSfForms.sfUtils.validateEmail(i, macroLang, false);
            igSfForms.sfUtils.validatePhone(i, macroLang);
            igSfForms.sfUtils.validateUrl(i, macroLang);
            igSfForms.sfUtils.validateLength(i, macroLang);
            igSfForms.sfUtils.validateRequired(i, macroLang);
        }
      }, 500));
      i.addEventListener('blur', () => {
        igSfForms.sfUtils.validateEmail(i, macroLang, false);
        igSfForms.sfUtils.validatePhone(i, macroLang);
        igSfForms.sfUtils.validateUrl(i, macroLang);
        igSfForms.sfUtils.validateLength(i, macroLang);
        igSfForms.sfUtils.validateRequired(i, macroLang);
        igSfForms.sfUtils.validateCheckbox(i, macroLang, true);
      });
      i.addEventListener('change', function () {
        igSfForms.sfUtils.validateRequired(i, macroLang);

	// Handle job title display and filtering of titles by department
        // If Pre-populate Department select exists...
        if(i.getAttribute('name') === 'Department' && i.classList.contains('prepopulated')) {
          // If Job title exists...
          if($form.querySelector('[name=Title]')) {
            // if current value is equal to the first value or last value, then hide job/role field
            var depts = i.querySelectorAll('option');
            var options = $form.querySelectorAll('[name=Title] option');
            options[0].selected = 'selected';
            if(i.value === depts[0].value || i.value === depts[depts.length - 1].value) {
              $form.querySelector('.jobtitle').classList.add('d-none');
              return false;
            }

            $form.querySelector('.jobtitle').classList.remove('d-none');
            for (var option of options) {
              if (option.dataset.department === i.value || option.dataset.department === 'all') {
                option.classList.remove('d-none');
              } else {
                option.classList.add('d-none');
              }
            }
          }
        }
      });
    }

    _fadeOut(document.querySelector("#" + leadFormID + "-loader.loader__container"), { fadeIncrement: 0.05, removeEl: true });
    _fadeIn($form,{ fadeIncrement: 0.5 });

    $form.querySelector('input[class*="accept-gdpr"]').addEventListener('change', (e) => {
      igSfForms.sfUtils.validateCheckbox(e.target, macroLang, true);
      $form.querySelector('.submit').disabled = e.target.checked ? 0 : 1;
    });
  }
  // Check if accept GDPR is checked and enable button
  if ($acceptGDPRSelector) {
    if ($acceptGDPRSelector.checked) {
        $formSubmitSelector.removeAttribute('disabled');
    }
  }

  function submitLeadTrackingForm() {
      var eventTypeParam, eventDetailParam;
      // Override some params with the macro value, if set
      if (settings.eventTypeParam) {
          eventTypeParam = settings.eventTypeParam;
      }

      if (settings.eventDetailParam) {
          eventDetailParam = settings.eventDetailParam;
      }

      submitLead(eventTypeParam, eventDetailParam, false);
  }
  function submitDownloadLeadTrackingForm() {
      // Set params default values
      var eventTypeParam = `${productResource.type} Download`,
          eventDetailParam = productResource.name;

      // Override some params with the macro value, if set
      if (settings.eventTypeParam) {
          eventTypeParam = settings.eventTypeParam;
      }

      if (settings.eventDetailParam) {
          eventDetailParam = settings.eventDetailParam;
      }

      submitLead(eventTypeParam, eventDetailParam, true);
  }
  function _readCookie(name) {
      name = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(name) === 0) {
              var cookieValue = c.substring(name.length, c.length);
              try {
                  return decodeURIComponent(cookieValue);
              } catch (e) {
                  return cookieValue;
              }
          }
      }
      return null;
  };
  // REF: https://kbarker.dev/blog/serialize-form-data-into-an-array-in-vanilla-js/
  function _serializeArray(form) {
    // Create a new FormData object
    const formData = new FormData(form);

    // Create an array to hold the name/value pairs
    const pairs = [];

    // Add each name/value pair to the array
    for (const [name, value] of formData) {
      pairs.push({ name, value });
    }

    // Return the array
    return pairs;
  }
  function _populateUtmFields(leadInfo) {
    var utms = ['id', 'content', 'source', 'medium', 'campaign', 'term', 'gclid'],
        cookieKey = ['utm_id', 'utm_content', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'],
        cookiePrefix = settings.CookiesPrefix || settings.cookiesPrefix || settings.cookiePrefix,
        i = 0, utmVal = "";

    for (i; i < utms.length; i++) {
        utmVal = _readCookie(cookieKey[i]);
        if (!utmVal && cookiePrefix) {
            utmVal = _readCookie(cookiePrefix + cookieKey[i]);
        }
        if (!utmVal) { utmVal = ""; } // If utm value not found, reset to empty
        leadInfo["Tracking" + (utms[i].charAt(0).toUpperCase() + utms[i].slice(1))] = utmVal;
    }
    return leadInfo;
}

  function _collectAdditionalFormData() {
    var $form = document.querySelector('#' + settings.leadFormID),
        leadFields = _serializeArray($form), additionalFields = {};
    var honeypotIndex;
    for (var i = 0; i < leadFields.length; i++) {
        var isHoneypot = settings.honeypot && leadFields[i].name === settings.honeypot;
        honeypotIndex = isHoneypot ? i : honeypotIndex;
        if (!isHoneypot && leadFields[i].name !== "Email" && leadFields[i].name !== "RequestDemo" && leadFields[i].value !== "") {
            if (additionalFields.hasOwnProperty(leadFields[i].name)) {
                additionalFields[leadFields[i].name] += ", " + leadFields[i].value;
            } else {
                additionalFields[leadFields[i].name] = leadFields[i].value;
            }
        }
    }
    var leadSourceNumber = (settings.leadSourceNumber) ? settings.leadSourceNumber : '';
    if (leadSourceNumber)
        additionalFields['leadSourceNumber'] = leadSourceNumber;

    if (honeypotIndex !== undefined && leadFields[honeypotIndex].value !== "")
        additionalFields['honeypot'] = leadFields[honeypotIndex].value;

    // Add ig_testing_key from URL query params
    var urlParams = new URLSearchParams(window.location.search);
    var igTestingKey = urlParams.get('ig_testing_key');
    if (igTestingKey)
        additionalFields['IgTestingKey'] = igTestingKey;

    // Add prefixed cookies if available
    var cookiePrefix = settings.CookiesPrefix || settings.cookiesPrefix || settings.cookiePrefix;
    var prefixedCookies = _getCookiesValuesWithLeadSourcePrefix(cookiePrefix);
    if (Object.keys(prefixedCookies).length > 0)
        Object.assign(additionalFields, prefixedCookies);

    return additionalFields;
  }

  function submitLead(eventTypeParam, eventDetailParam, includeDownload = false) {
      // Get form data
      var $form = document.querySelector('#' + settings.leadFormID),
          $submitBtn = $form.querySelector('.submit');
      var trackingDataRequest = {
          recaptchaToken: recaptchaToken,
	      zoomwebinarId: zoomWebinarId,
          email: $form.querySelector('input[name="Email"').value,
          productCode: leadProductCode,
          eventType: eventTypeParam,
          eventDetail: eventDetailParam,
          productLanguage: macroLang,
          prohibitFreeMail: false,
          prohibitDisposableMail: false,
          acceptConditions: $form.querySelector('.accept-gdpr').checked,
          additionalFields: _collectAdditionalFormData(),
          tier: tier,
          //formLocation: formLocation,
          //formValue: formValue,
          productName: productName
      };

      if (settings.showRequestDemo) {
          trackingDataRequest.additionalFields.requestDemo = ($leadTrackForm.querySelector(".request-demo").checked) ? true : false;
      }

      // Get UTM params
      trackingDataRequest.additionalFields = _populateUtmFields(trackingDataRequest.additionalFields);
      // $.ajax is used here instead of $.post so we can set the contentType. API doesn't know how to bind additional Fields
      // when $.post defaults the contentType to encodedURI

      var url = leadTrackingURL();
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', url);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              var headerHeight = document.querySelector('.header__main .header__nav--wrap'),
                  headerHeight = (headerHeight) ? headerHeight.offsetHeight : 0,
                  navWrap = (document.querySelector('#navWrap')) ? document.querySelector('#navWrap').classList.contains('navbar--fixed') : false;
                  offset = (navWrap) ? headerHeight : 0,
                  fOffset = (window.pageYOffset < 360) ? headerHeight*2 : offset;
                            if (xhr.status === 200) {
                                    var trackingId = JSON.parse(xhr.responseText);
                                    var timeOut = 0;
                                    // Google Data Layer push for form_submit event
                                    var emailVal = $form.querySelector('input[name="Email"') ? $form.querySelector('input[name="Email"').value : '';
                                    var firstNameVal = $form.querySelector('input[name="FirstName"') ? $form.querySelector('input[name="FirstName"').value : '';
                                    var lastNameVal = $form.querySelector('input[name="LastName"') ? $form.querySelector('input[name="LastName"').value : '';
                                    dataLayer.push({
                                        event: 'form_submit',
                                        formLocation: (settings.formLocation) ? settings.formLocation : 'body',
                                        form_details: [
                                            {
                                                email: emailVal,
                                                first_name: firstNameVal,
                                                last_name: lastNameVal
                                            }
                                        ],
                                        form_name: (settings.formName) ? settings.formName : 'LEAD EVENT DETAIL FROM FORM',
                                        form_tier: settings.tier || '',
                                        form_type: settings.eventTypeParam || '',
                                        form_value: settings.formValue || '',
                                        product_name: settings.productName || ''
                                    });

                                    if (goalType !== "" && goalLabel !== "") {
                                            // X-Domain Conversion Tracking
                                            dataLayer.push({
                                                    'event': 'trackGoal',
                                                    'goalType': goalType,
                                                    'goalLabel': goalLabel
                                            });

                                            //GTM Enhanced Conversion - Start
                                            var ecd_email = emailVal;
                                            var ecd_phone = trackingDataRequest.additionalFields.Phone;

                                            if (ecd_email && ecd_phone) {
                                                dataLayer.push({
                                                        'event':'ec_form_submission',
                                                        'enhanced_conversion_data': {
                                                        "email": ecd_email,
                                                        "phone_number": ecd_phone
                                                        }
                                                });
                                            }
                                            //GTM Enhanced Conversion - END

                                            timeOut = (navigator.userAgent.indexOf('Firefox') !== -1) ? 150 : 0;
                                    }

                  if (settings.macro === "WebinarLeadTrackerLibrary") {
                    leadTracker.handleVideo();
                  }

                   if (settings.macro === "SEOWhitepaperLeadTracker") {
                      leadTracker.ungate("smooth");
                  }
                  
                  // Initiate download only if needed
                   if (includeDownload) {
                      // Redirect to thank you page only if available
                      if (redirectUrl) {
                          setTimeout(function(){ redirectToThankYouPage(trackingId); }, timeOut);

                          //Render "Thank you" message if available
                          if(settings.thankYouMessage){
                              renderThankYouMessage();
                          }
                      } else {
                          // Otherwise we should render the thank you message and initiate the download on the currently page
                          renderThankYouMessage();
                          initDownload(trackingId);
                      }
                  } else {
                      // If general lead tracker
                      if (redirectUrl) {
                          setTimeout(function(){ redirectToThankYouPage(); }, timeOut);

                          //Render "Thank you" message if available
                          if(settings.thankYouMessage){
                              renderThankYouMessage();
                          }
                      } else {
                          // Otherwise we should render the thank you message and initiate the download on the currently page
                          renderThankYouMessage();
                      }
                  }
              }
              else if (xhr.status === 400) {
                  var error = JSON.parse(xhr.responseText);


                const isJA = trackingDataRequest.productLanguage === 'ja';

                const messages = {
                validEmail: isJA
                    ? '有効なメール：example@yourdomain.comである必要があります'
                    : 'Must be a valid email: example@yourdomain.com',
                businessEmail: isJA
                    ? 'メールアドレスは会社のメールアドレスである必要があります'
                    : 'Email must be a business email address',
                acceptTerms: isJA
                    ? '送信するには、フォームの利用規約に同意してください。'
                    : "Please accept the form's terms and conditions to successfully submit."
                };

                const $formError = $form.querySelector('.formInvalidConditionForm');
                const $recaptchaError = $form.querySelector('.recaptchaError');

                // Map error codes to message keys
                const errorMap = {
                    BAD_EMAIL: 'validEmail',
                    EMAIL_STATE_NOT_ALLOWED: 'validEmail',

                    FREE_EMAIL_NOT_ALLOWED: 'businessEmail',
                    MINIMUM_EMAIL_SCORE_NOT_MET: 'businessEmail',
                    EMAIL_REASON_NOT_ALLOWED: 'businessEmail',
                    DISPOSABLE_EMAIL_NOT_ALLOWED: 'businessEmail'
                };

                // Hide all errors first
                $formError.style.display = 'none';
                $recaptchaError.style.display = 'none';

                // Handle reCAPTCHA error
                if (error.code === 'INVALID_RECAPTCHA') {
                    $recaptchaError.style.display = 'block';
                    return;
                }

                // Handle missing error.code (terms not accepted)
                if (error.message === "User didn't accept lead form conditions") {
                    $formError.textContent = messages.acceptTerms;
                    $formError.style.display = 'block';
                    return;
                }

                // Handle mapped email errors
                const messageKey = errorMap[error.code];
                if (messageKey) {
                    $formError.textContent = messages[messageKey];
                    $formError.style.display = 'block';
                }

		          if (error.message === "Required registrant information not provided") {
                      $form.querySelector('#zoomRequiredFields').style.display = 'block';
                  }
                  // 429
                  if (error.message === "Daily Quota Reached") {
                      $form.querySelector('#zoomAlreadyRegisterLimit').style.display = 'block';
                  }
                  // 3027
                  if (error.message == "Host Cannot Register") {
                      $form.querySelector('#zoomHostNoRegister').style.display = 'block';
                  }
                  // 3030
                  if (error.message == "Webinar Over") {
                      $form.querySelector('#zoomWebinarOver').style.display = 'block';
                  }
                  // 300 || 3000 || 3001 || 3034 || 3075
                  if (error.message == "Zoom General Error") {
                      $form.querySelector('#zoomGeneralErrors').style.display = 'block';
                      // $form.querySelector('#zoomGeneralErrors').setAttribute("data-zoom-error", exceptionMsg.code);
                  }
                  window.scroll({ top: ($form.getBoundingClientRect().top + window.pageYOffset)  - fOffset, behavior: 'smooth' });
                  $submitBtn.removeAttribute('disabled');
              }
              else {
                  $form.querySelector('.apiError').style.display = "block";
                  window.scroll({ top: ($form.querySelector('.apiError').getBoundingClientRect().top + window.pageYOffset)  - fOffset, behavior: 'smooth' });
                  $submitBtn.removeAttribute('disabled');
              }
          }
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(trackingDataRequest));
  }

  function initDownload(trackingId) {
      var $form = document.querySelector('#' + leadFormID)
      // Create InitiateDownloadRequest payload
      var initiateDownloadRequest = {
          leadTrackingEventId: trackingId
      };

      if (goalDownloadType !== "" && goalDownloadLabel !== "") {
          dataLayer.push({
              'event': 'trackGoal',
              'goalType': goalDownloadType,
              'goalLabel': goalDownloadLabel
          });

            //GTM Enhanced Conversion - Start
            var formContainer = document.getElementById(settings.formContainerId);
            var ecd_email = (formContainer !== null) ? formContainer.querySelector('input[name="Email"').value : '';
            var ecd_phone = (trackingDataRequest.additionalFields.Phone !== null) ? trackingDataRequest.additionalFields.Phone : '';

            if (ecd_email && ecd_phone) {
                dataLayer.push({
                    'event': 'ec_form_submission',
                    'enhanced_conversion_data': {
                        "email": ecd_email,
                        "phone_number": ecd_phone
                    }
                });
            }
            //GTM Enhanced Conversion - END

      }

      // Post the request to initiate the download
    var url = `${_apiBase()}/api/productresources/${productResource.id}/initiatedownload`;
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', url);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  // Start download
                  var downloadUrl = JSON.parse(xhr.responseText);
                  document.location = downloadUrl;
              } else {
                  if (xhr.status === 404) {
                      console.error('Download process encountered a 404 error. Asset could not be found');
                  } else {
                      console.error('There was an error during the download process.');
                  }
                  $form.querySelector('.apiError').style.display = "block";
              }
          }
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(initiateDownloadRequest));
  }

  function renderThankYouMessage() {
      console.log('Render Thank you');
      // Hide the form and render Thank You Message
      var selector = (formContainerId) ? formContainerId : leadFormID;

      //interrupt if needed
      if ( document.querySelector('#' + selector) == null ){
        return;
      }

      if (formContainerId && formContainerId !== leadFormID) {
        var $elem = document.querySelector('#' + selector);
        var insertedNode = $elem.parentNode.insertBefore(document.querySelector('.thankyou__' + leadFormID), $elem);
      }

      //console.log(selector);
      document.querySelector('#' + selector).style.display = 'none'; // hide
      document.querySelector('.thankyou__' + leadFormID).style.display = 'block'; // show
  }

  function redirectToThankYouPage(trackingId) {
      if (trackingId) {
          // Stores necessary params to temp local storage
          var initDownloadParams = {
              productResourceId: productResource.id,
              leadTrackingEventId: trackingId,
              ga: {
                  goalType: goalDownloadType,
                  goalLabel: goalDownloadLabel
              }
          };

          // Set local storage
          var initDownloadParamsJson = JSON.stringify(initDownloadParams);
          sessionStorage.setItem('initDownloadParams', initDownloadParamsJson);
      }

      // Redirect to thank you page
      document.location = redirectUrl;
  }


  //
  // FORM UTILITIES
  // Determine which macro is being used and define specific props and initialize utility
  if ((settings.macro === 'LeadTracker' || settings.macro === 'WebinarLeadTracker' || settings.macro === 'WebinarLeadTrackerLibrary' || settings.macro === 'SEOWhitepaperLeadTracker' && $isLeadFormAvailable)) {
      var leadTrackerFormUtility = {};
      leadTrackerFormUtility.init = function () {
          renderForm();

          //For on-demand video - click on the locked overlay to focus the form
          if (document.getElementById('videoOverlay')) {
            document.getElementById('videoOverlay').onclick = function(){
                document.querySelector('#webinar__register-form form input').focus();
            }
          }
      };

      leadTrackerFormUtility.init();
  }
  if (settings.macro === 'DownloadLeadTracker') {
        var leadTrackerDownloadFormUtility = {},
            productResource, $form = document.querySelector('#' + leadFormID);

        leadTrackerDownloadFormUtility.init = function () {
          // Get the product resource object(s) via product code
          var packageName = settings.packageName,
              productResourceType = settings.productResourceType,
              productLanuage = macroLang,
              osSupport = settings.osSupport,
              installerType = settings.installerType;

              // TODO: Generate url with non empty query string params
              const url = `${_apiBase()}/api/productresources?productCode=${productCode}&productLanguage=${productLanuage}&packageName=${packageName}&productResourceType=${productResourceType}&osSupport=${osSupport}&installerType=${installerType}&singleResult=true`;

              var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
              xhr.open("GET", url, true);
              xhr.onload = function (e) {
                  if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                          productResource = JSON.parse(xhr.responseText);
                          if (productResource.length > 1) {
                            console.error('Too many download assets found and caused an error.');
                            $form.querySelector('.apiError').style.display = "block";
                          }
                          productResource = productResource[0];
                          
                          // Once all custom logic is complete, render the form
                          renderForm();
                      } else { // Server responded with some error
                          if (xhr.status === 404) {
                              console.error('Sorry, but the download asset could not be located.');
                          } else {
                              console.error('There was an error with the API and the data could not be obtained.');
                          }
                          $form.querySelector('.apiError').style.display = "block";
                      }
                  }
              };

              // What to do if there's an error with the request
              xhr.onerror = function (e) {
                  window.location.href = '/error';
              }; // End of error handling

              // Send the request to the server
              xhr.send(null);
        };
        leadTrackerDownloadFormUtility.init();
    }
};
