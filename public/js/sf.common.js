var igSfForms = function () {
    'use strict';

    var logoutBaseUrl = "/logout.aspx?ReturnUrl=",
        userOptions = {
            basePath: "/wp-content/themes/reveal/js/" /* /rs/123-ABC-456images/ if in SalesForce Design Studio */
        },
        emailProhibitLists = [
            {
                name: "free",
                file: "freemail.csl.txt",
                error: "Looks like a free ESP"
            }
        ], prohibitEmailFirstError;
    var errMsgs = {
        "en": {
            "required": "This field is required.",
            "email": "Must be a valid email: example@yourdomain.com",
            "businessEmail": "Email must be a business email address",
            "tel": "Must be a valid phone number.",
            "url": "Must be a valid url: www.example.com",
            "postalcode": "Must be a valid Zip/Postal code",
            "apiError": "Sorry, we had trouble pre-filling the marketo form with your user account details."
        },
        "ja": {
            "required": "この項目は必須です。",
            "email": "有効なメール：example@yourdomain.comである必要があります",
            "businessEmail": "メールアドレスは会社のメールアドレスである必要があります",
            "tel": "有効な電話番号である必要があります",
            "url": "有効なURLである必要があります：www.example.com",
            "postalcode": "有効な郵便番号でなければなりません",
            "apiError": "申し訳ありませんが、お客様のアカウント情報でmarketoフォームを事前入力する際に​​問題が発生しました。"
        }
    };

    var sfUtils = {
        hasClass: function hasClass(el, cls) {
            return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
        },
        addClass: function addClass(el, cls) {
            el.className += " " + cls;
        },
        removeClass: function removeClass(el, cls) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            el.className = el.className.replace(reg, "").replace(/\s\s+/g, " ");
        },
        removeValidationClass: function removeValidationClass(el) {
            // var reg = new RegExp("(\\s|^)fieldValid|fieldInvalid(\\s|$)");
            // el.className = el.className.replace(reg, "").replace(/\s\s+/g, " ");
            el.classList.remove('fieldValid');
            el.classList.remove('fieldInvalid');
        },
        _debounce: function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },
        /***
         * TODO: Potentially, convert txt files managed in assets/modern folder into a new DocType that can be managed within Umbraco.
         * ***/
        initEmailDomainProhibitList: function initEmailDomainProhibitList() {
            // this function should be initialized at beginning of whenReadyCallback for marketo form
            emailProhibitLists.forEach(function (list) {
                var txtFile = new XMLHttpRequest();
                txtFile.open("GET", userOptions.basePath + list.file, true);
                txtFile.onreadystatechange = function () {
                    if (txtFile.readyState === 4) {
                        // Makes sure the document is ready to parse.
                        if (txtFile.status === 200) {
                            list.RE = txtFile.responseText;
                        }
                    }
                };
                txtFile.send(null);
            });
        },
        inputIsValid: function inputIsValid(el, errorContainer) {
            sfUtils.removeValidationClass(el);
            sfUtils.addClass(el, "fieldValid");

            if (errorContainer) {
                errorContainer.parentNode.removeChild(errorContainer);
            }
            if (document.querySelector(".lead-tracker-form #formInvalidEmail")) {
                document.querySelector(".lead-tracker-form #formInvalidEmail").style.display = "none";
            }
            if (document.querySelector(".lead-tracker-form #formInvalidFreeEmail")) {
                document.querySelector(".lead-tracker-form #formInvalidFreeEmail").style.display = "none";
            }
        },
        inputIsInvalid: function inputIsInvalid(el, errorContainer, msg) {
            sfUtils.removeValidationClass(el);
            sfUtils.addClass(el, "fieldInvalid");

            if (!errorContainer) {
                el.insertAdjacentHTML("afterend", "<div class=\"field-validation-error-msg\">" + msg + "</div>");
            } else {
                errorContainer.innerText = msg;
            }
        },
        checkValidEmail: function checkValidEmail(el, lang, prohibitFreeMail) {
            var errorContainer = el.parentElement.querySelector(".field-validation-error-msg");
            var isRequired = sfUtils.hasClass(el, "required");

            if(prohibitFreeMail){sfUtils.initEmailDomainProhibitList();}

            if (el.type === "email") {
                // Field will validate if it is empty and not required OR matches regex
                if (el.value === "" && isRequired === false || el.value.match(/^([a-zA-Z0-9_\-\.\"\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,25})$/g)) {
                    // If valid, check if a prohibit email validation (prohibitFreeMail) is true. If false, immediately validate. If true, validate input against prohibited domain list.
                    if (prohibitFreeMail && emailProhibitLists.some(function (list) {
                        if (list.RE && list.RE.indexOf(el.value.split("@").pop()) !== -1) {
                            prohibitEmailFirstError = list.error;
                            return true;
                        }
                        return false;
                    })) {
                        // Email is found in list, invalid field
                        sfUtils.inputIsInvalid(el, errorContainer, errMsgs[lang].businessEmail);
                    } else {
                        // Email not found, validate field
                        //sfUtils.inputIsValid(el, errorContainer);
                        sfUtils.checkLength(el, lang);
                    }
                } else {
                    sfUtils.inputIsInvalid(el, errorContainer, errMsgs[lang].email);
                }
            }
        },
        validateRequired: function validateRequired(el) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en";

            var errorContainer = el.parentElement.querySelector(".field-validation-error-msg");
            var isRequired = sfUtils.hasClass(el, "required");
            if (isRequired === true && !/email|url|tel|checkbox/g.test(el.type)) {
                if (el.value === "" || el.value === null) {
                    sfUtils.inputIsInvalid(el, errorContainer, errMsgs[lang].required);
                } else {
                    //sfUtils.inputIsValid(el, errorContainer);
                    sfUtils.checkLength(el, lang);
                }
            }
        },
        checkLength: function (el, lang) {
            var min = el.getAttribute("data-val-length-min"),
                max = el.getAttribute("data-val-length-max"),
                msg = el.getAttribute("data-val-length");
            // TODO: Finalize dynamic error messages
            var isRequired = sfUtils.hasClass(el, "required");
            var errorContainer = el.parentElement.querySelector(".field-validation-error-msg");
            //(min !== null && max !== null) ||
            if ((((el.value.length < min && isRequired) || (!isRequired && el.value.length < min && el.value.length > 0)) || (max !== null && el.value.length > max))) {
                // If input type is either text, email url, tel
                sfUtils.inputIsInvalid(el, errorContainer, msg);
            } else {
                sfUtils.inputIsValid(el, errorContainer);
            }
        },
        validateLength: function (el, lang) {
            var isRequired = sfUtils.hasClass(el, "required");
            if (isRequired === false && !/email|url|tel|checkbox/g.test(el.type)) {
                sfUtils.checkLength(el, lang);
            }
        },
        validateEmail: function validateForProhibitedEmail(el, lang, prohibitFreemail) {
            // Must Initliate sfUtils.initEmailDomainProhibitList() function on whenReadyCallback
            var l = lang || "en";
            var isProhibitEmail = prohibitFreemail || false;
            sfUtils.checkValidEmail(el, l, isProhibitEmail);
        },
        validatePhone: function validatePhone(el) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en";

            var errorContainer = el.parentElement.querySelector(".field-validation-error-msg");
            var isRequired = sfUtils.hasClass(el, "required");
            if (el.type === "tel") {
                // Field will validate if it is empty and not required OR matches regex
                // Marketo Regex: ^([0-9()+. \t-])+(\s?(x|ext|extension)\s?([0-9()])+)?$
                // IG Regex: /^(?=(.*\d.*){6,})[0-9a-zA-Z\.\-\+\(\)\s]*$/g
                if (el.value === "" && isRequired === false || el.value.match(/^([0-9()+. \t-])+(\s?(x|ext|extension)\s?([0-9()])+)?$/g)) {
                    //sfUtils.inputIsValid(el, errorContainer);
                    sfUtils.checkLength(el, lang);
                } else {
                    sfUtils.inputIsInvalid(el, errorContainer, errMsgs[lang].tel);
                }
            }
        },
        validateUrl: function validateUrl(el) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en";

            var errorContainer = el.parentElement.querySelector(".field-validation-error-msg");
            var isRequired = sfUtils.hasClass(el, "required");
            if (el.type === "url") {
                // Field will validate if it is empty and not required OR matches regex
                if (el.value === "" && isRequired === false || el.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    //sfUtils.inputIsValid(el, errorContainer);
                    sfUtils.checkLength(el, lang);
                } else {
                    sfUtils.inputIsInvalid(el, errorContainer, errMsgs[lang].url);
                }
            }
        },
        validateCheckbox: function validateCheckbox(el) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en",
                hideError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "false",
                errorContainer = el.parentElement.parentElement.querySelector(".field-validation-error-msg"),
                checkRequired = sfUtils.hasClass(el.parentElement, "required"),
                checkValid = sfUtils.hasClass(el.parentElement, "mktoValid");

            if (el.type === "checkbox") {
                if (checkRequired && !checkValid && !hideError) {
                    sfUtils.inputIsInvalid(el.parentElement, errorContainer, errMsgs[lang].required);
                } else if (checkRequired && checkValid && !hideError) {
                    sfUtils.inputIsValid(el.parentElement, errorContainer);
                }
            }
        }
    };


    return {
        errMsgs: errMsgs,
        sfUtils: sfUtils
    };
}();