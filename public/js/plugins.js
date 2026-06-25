/*!
  LazyLoad (Vanilla LazyLoading) - v10.19 (https://github.com/verlok/lazyload)
  LazyLoad is a fast, lightweight and flexible script that speeds up your web application by loading images as they enter the viewport.
  It's written in plain "vanilla" JavaScript, uses IntersectionObserver, and supports responsive images. It's also SEO-friendly and it has some other notable features.
  (c) Andrea Verlicchi - @verlok - https://www.andreaverlicchi.eu/lazyload/
*/
var _extends = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var n = arguments[e]; for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]) } return t }, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }; !function (t, e) { "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoad = e() }(this, function () { "use strict"; function t(t, e, n) { var o = e._settings; !n && i(t) || (C(o.callback_enter, t), R.indexOf(t.tagName) > -1 && (N(t, e), I(t, o.class_loading)), E(t, e), a(t), C(o.callback_set, t)) } var e = { elements_selector: "img", container: document, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", class_loading: "loading", class_loaded: "loaded", class_error: "error", load_delay: 0, callback_load: null, callback_error: null, callback_set: null, callback_enter: null, callback_finish: null, to_webp: !1 }, n = function (t) { return _extends({}, e, t) }, o = function (t, e) { return t.getAttribute("data-" + e) }, r = function (t, e, n) { var o = "data-" + e; null !== n ? t.setAttribute(o, n) : t.removeAttribute(o) }, a = function (t) { return r(t, "was-processed", "true") }, i = function (t) { return "true" === o(t, "was-processed") }, s = function (t, e) { return r(t, "ll-timeout", e) }, c = function (t) { return o(t, "ll-timeout") }, l = function (t) { return t.filter(function (t) { return !i(t) }) }, u = function (t, e) { return t.filter(function (t) { return t !== e }) }, d = function (t, e) { var n, o = new t(e); try { n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: o } }) } catch (t) { (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: o }) } window.dispatchEvent(n) }, f = function (t, e) { return e ? t.replace(/\.(jpe?g|png)/gi, ".webp") : t }, _ = "undefined" != typeof window, v = _ && !("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), g = _ && "IntersectionObserver" in window, h = _ && "classList" in document.createElement("p"), b = _ && function () { var t = document.createElement("canvas"); return !(!t.getContext || !t.getContext("2d")) && 0 === t.toDataURL("image/webp").indexOf("data:image/webp") }(), m = function (t, e, n, r) { for (var a, i = 0; a = t.children[i]; i += 1) if ("SOURCE" === a.tagName) { var s = o(a, n); p(a, e, s, r) } }, p = function (t, e, n, o) { n && t.setAttribute(e, f(n, o)) }, y = function (t, e) { var n = b && e.to_webp, r = o(t, e.data_src), a = o(t, e.data_bg); if (r) { var i = f(r, n); t.style.backgroundImage = 'url("' + i + '")' } if (a) { var s = f(a, n); t.style.backgroundImage = s } }, w = { IMG: function (t, e) { var n = b && e.to_webp, r = e.data_srcset, a = t.parentNode; a && "PICTURE" === a.tagName && m(a, "srcset", r, n); var i = o(t, e.data_sizes); p(t, "sizes", i); var s = o(t, r); p(t, "srcset", s, n); var c = o(t, e.data_src); p(t, "src", c, n) }, IFRAME: function (t, e) { var n = o(t, e.data_src); p(t, "src", n) }, VIDEO: function (t, e) { var n = e.data_src, r = o(t, n); m(t, "src", n), p(t, "src", r), t.load() } }, E = function (t, e) { var n = e._settings, o = t.tagName, r = w[o]; if (r) return r(t, n), e._updateLoadingCount(1), void (e._elements = u(e._elements, t)); y(t, n) }, I = function (t, e) { h ? t.classList.add(e) : t.className += (t.className ? " " : "") + e }, L = function (t, e) { h ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "") }, C = function (t, e) { t && t(e) }, O = function (t, e, n) { t.addEventListener(e, n) }, k = function (t, e, n) { t.removeEventListener(e, n) }, x = function (t, e, n) { O(t, "load", e), O(t, "loadeddata", e), O(t, "error", n) }, A = function (t, e, n) { k(t, "load", e), k(t, "loadeddata", e), k(t, "error", n) }, z = function (t, e, n) { var o = n._settings, r = e ? o.class_loaded : o.class_error, a = e ? o.callback_load : o.callback_error, i = t.target; L(i, o.class_loading), I(i, r), C(a, i), n._updateLoadingCount(-1) }, N = function (t, e) { var n = function n(r) { z(r, !0, e), A(t, n, o) }, o = function o(r) { z(r, !1, e), A(t, n, o) }; x(t, n, o) }, R = ["IMG", "IFRAME", "VIDEO"], S = function (e, n, o) { t(e, o), n.unobserve(e) }, M = function (t) { var e = c(t); e && (clearTimeout(e), s(t, null)) }, j = function (t, e, n) { var o = n._settings.load_delay, r = c(t); r || (r = setTimeout(function () { S(t, e, n), M(t) }, o), s(t, r)) }, D = function (t) { return t.isIntersecting || t.intersectionRatio > 0 }, T = function (t) { return { root: t.container === document ? null : t.container, rootMargin: t.thresholds || t.threshold + "px" } }, U = function (t, e) { this._settings = n(t), this._setObserver(), this._loadingCount = 0, this.update(e) }; return U.prototype = { _manageIntersection: function (t) { var e = this._observer, n = this._settings.load_delay, o = t.target; n ? D(t) ? j(o, e, this) : M(o) : D(t) && S(o, e, this) }, _onIntersection: function (t) { t.forEach(this._manageIntersection.bind(this)) }, _setObserver: function () { g && (this._observer = new IntersectionObserver(this._onIntersection.bind(this), T(this._settings))) }, _updateLoadingCount: function (t) { this._loadingCount += t, 0 === this._elements.length && 0 === this._loadingCount && C(this._settings.callback_finish) }, update: function (t) { var e = this, n = this._settings, o = t || n.container.querySelectorAll(n.elements_selector); this._elements = l(Array.prototype.slice.call(o)), !v && this._observer ? this._elements.forEach(function (t) { e._observer.observe(t) }) : this.loadAll() }, destroy: function () { var t = this; this._observer && (this._elements.forEach(function (e) { t._observer.unobserve(e) }), this._observer = null), this._elements = null, this._settings = null }, load: function (e, n) { t(e, this, n) }, loadAll: function () { var t = this; this._elements.forEach(function (e) { t.load(e) }) } }, _ && function (t, e) { if (e) if (e.length) for (var n, o = 0; n = e[o]; o += 1) d(t, n); else d(t, e) }(U, window.lazyLoadOptions), U });

/*
 * International Telephone Input v17.0.19
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

/*
 * International Telephone Input v25.3.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// UMD
(function(factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    window.intlTelInput = factory();
  }
}(() => {

var factoryOutput=(()=>{var L=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var F=(l,t)=>{for(var e in t)L(l,e,{get:t[e],enumerable:!0})},B=(l,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of O(t))!R.call(l,n)&&n!==e&&L(l,n,{get:()=>t[n],enumerable:!(i=H(t,n))||i.enumerable});return l};var j=l=>B(L({},"__esModule",{value:!0}),l);var Y={};F(Y,{Iti:()=>w,default:()=>q});var D=[["af","93"],["ax","358",1],["al","355"],["dz","213"],["as","1",5,["684"]],["ad","376"],["ao","244"],["ai","1",6,["264"]],["ag","1",7,["268"]],["ar","54"],["am","374"],["aw","297"],["ac","247"],["au","61",0,null,"0"],["at","43"],["az","994"],["bs","1",8,["242"]],["bh","973"],["bd","880"],["bb","1",9,["246"]],["by","375"],["be","32"],["bz","501"],["bj","229"],["bm","1",10,["441"]],["bt","975"],["bo","591"],["ba","387"],["bw","267"],["br","55"],["io","246"],["vg","1",11,["284"]],["bn","673"],["bg","359"],["bf","226"],["bi","257"],["kh","855"],["cm","237"],["ca","1",1,["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","584","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","879","902","905"]],["cv","238"],["bq","599",1,["3","4","7"]],["ky","1",12,["345"]],["cf","236"],["td","235"],["cl","56"],["cn","86"],["cx","61",2,["89164"],"0"],["cc","61",1,["89162"],"0"],["co","57"],["km","269"],["cg","242"],["cd","243"],["ck","682"],["cr","506"],["ci","225"],["hr","385"],["cu","53"],["cw","599",0],["cy","357"],["cz","420"],["dk","45"],["dj","253"],["dm","1",13,["767"]],["do","1",2,["809","829","849"]],["ec","593"],["eg","20"],["sv","503"],["gq","240"],["er","291"],["ee","372"],["sz","268"],["et","251"],["fk","500"],["fo","298"],["fj","679"],["fi","358",0],["fr","33"],["gf","594"],["pf","689"],["ga","241"],["gm","220"],["ge","995"],["de","49"],["gh","233"],["gi","350"],["gr","30"],["gl","299"],["gd","1",14,["473"]],["gp","590",0],["gu","1",15,["671"]],["gt","502"],["gg","44",1,["1481","7781","7839","7911"],"0"],["gn","224"],["gw","245"],["gy","592"],["ht","509"],["hn","504"],["hk","852"],["hu","36"],["is","354"],["in","91"],["id","62"],["ir","98"],["iq","964"],["ie","353"],["im","44",2,["1624","74576","7524","7924","7624"],"0"],["il","972"],["it","39",0],["jm","1",4,["876","658"]],["jp","81"],["je","44",3,["1534","7509","7700","7797","7829","7937"],"0"],["jo","962"],["kz","7",1,["33","7"],"8"],["ke","254"],["ki","686"],["xk","383"],["kw","965"],["kg","996"],["la","856"],["lv","371"],["lb","961"],["ls","266"],["lr","231"],["ly","218"],["li","423"],["lt","370"],["lu","352"],["mo","853"],["mg","261"],["mw","265"],["my","60"],["mv","960"],["ml","223"],["mt","356"],["mh","692"],["mq","596"],["mr","222"],["mu","230"],["yt","262",1,["269","639"],"0"],["mx","52"],["fm","691"],["md","373"],["mc","377"],["mn","976"],["me","382"],["ms","1",16,["664"]],["ma","212",0,null,"0"],["mz","258"],["mm","95"],["na","264"],["nr","674"],["np","977"],["nl","31"],["nc","687"],["nz","64"],["ni","505"],["ne","227"],["ng","234"],["nu","683"],["nf","672"],["kp","850"],["mk","389"],["mp","1",17,["670"]],["no","47",0],["om","968"],["pk","92"],["pw","680"],["ps","970"],["pa","507"],["pg","675"],["py","595"],["pe","51"],["ph","63"],["pl","48"],["pt","351"],["pr","1",3,["787","939"]],["qa","974"],["re","262",0,null,"0"],["ro","40"],["ru","7",0,null,"8"],["rw","250"],["ws","685"],["sm","378"],["st","239"],["sa","966"],["sn","221"],["rs","381"],["sc","248"],["sl","232"],["sg","65"],["sx","1",21,["721"]],["sk","421"],["si","386"],["sb","677"],["so","252"],["za","27"],["kr","82"],["ss","211"],["es","34"],["lk","94"],["bl","590",1],["sh","290"],["kn","1",18,["869"]],["lc","1",19,["758"]],["mf","590",2],["pm","508"],["vc","1",20,["784"]],["sd","249"],["sr","597"],["sj","47",1,["79"]],["se","46"],["ch","41"],["sy","963"],["tw","886"],["tj","992"],["tz","255"],["th","66"],["tl","670"],["tg","228"],["tk","690"],["to","676"],["tt","1",22,["868"]],["tn","216"],["tr","90"],["tm","993"],["tc","1",23,["649"]],["tv","688"],["ug","256"],["ua","380"],["ae","971"],["gb","44",0,null,"0"],["us","1",0],["uy","598"],["vi","1",24,["340"]],["uz","998"],["vu","678"],["va","39",1,["06698"]],["ve","58"],["vn","84"],["wf","681"],["eh","212",1,["5288","5289"],"0"],["ye","967"],["zm","260"],["zw","263"]],N=[];for(let l=0;l<D.length;l++){let t=D[l];N[l]={name:"",iso2:t[0],dialCode:t[1],priority:t[2]||0,areaCodes:t[3]||null,nodeById:{},nationalPrefix:t[4]||null}}var f=N;var U={ad:"Andorra",ae:"United Arab Emirates",af:"Afghanistan",ag:"Antigua & Barbuda",ai:"Anguilla",al:"Albania",am:"Armenia",ao:"Angola",ar:"Argentina",as:"American Samoa",at:"Austria",au:"Australia",aw:"Aruba",ax:"\xC5land Islands",az:"Azerbaijan",ba:"Bosnia & Herzegovina",bb:"Barbados",bd:"Bangladesh",be:"Belgium",bf:"Burkina Faso",bg:"Bulgaria",bh:"Bahrain",bi:"Burundi",bj:"Benin",bl:"St. Barth\xE9lemy",bm:"Bermuda",bn:"Brunei",bo:"Bolivia",bq:"Caribbean Netherlands",br:"Brazil",bs:"Bahamas",bt:"Bhutan",bw:"Botswana",by:"Belarus",bz:"Belize",ca:"Canada",cc:"Cocos (Keeling) Islands",cd:"Congo - Kinshasa",cf:"Central African Republic",cg:"Congo - Brazzaville",ch:"Switzerland",ci:"C\xF4te d\u2019Ivoire",ck:"Cook Islands",cl:"Chile",cm:"Cameroon",cn:"China",co:"Colombia",cr:"Costa Rica",cu:"Cuba",cv:"Cape Verde",cw:"Cura\xE7ao",cx:"Christmas Island",cy:"Cyprus",cz:"Czechia",de:"Germany",dj:"Djibouti",dk:"Denmark",dm:"Dominica",do:"Dominican Republic",dz:"Algeria",ec:"Ecuador",ee:"Estonia",eg:"Egypt",eh:"Western Sahara",er:"Eritrea",es:"Spain",et:"Ethiopia",fi:"Finland",fj:"Fiji",fk:"Falkland Islands",fm:"Micronesia",fo:"Faroe Islands",fr:"France",ga:"Gabon",gb:"United Kingdom",gd:"Grenada",ge:"Georgia",gf:"French Guiana",gg:"Guernsey",gh:"Ghana",gi:"Gibraltar",gl:"Greenland",gm:"Gambia",gn:"Guinea",gp:"Guadeloupe",gq:"Equatorial Guinea",gr:"Greece",gt:"Guatemala",gu:"Guam",gw:"Guinea-Bissau",gy:"Guyana",hk:"Hong Kong SAR China",hn:"Honduras",hr:"Croatia",ht:"Haiti",hu:"Hungary",id:"Indonesia",ie:"Ireland",il:"Israel",im:"Isle of Man",in:"India",io:"British Indian Ocean Territory",iq:"Iraq",ir:"Iran",is:"Iceland",it:"Italy",je:"Jersey",jm:"Jamaica",jo:"Jordan",jp:"Japan",ke:"Kenya",kg:"Kyrgyzstan",kh:"Cambodia",ki:"Kiribati",km:"Comoros",kn:"St. Kitts & Nevis",kp:"North Korea",kr:"South Korea",kw:"Kuwait",ky:"Cayman Islands",kz:"Kazakhstan",la:"Laos",lb:"Lebanon",lc:"St. Lucia",li:"Liechtenstein",lk:"Sri Lanka",lr:"Liberia",ls:"Lesotho",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ly:"Libya",ma:"Morocco",mc:"Monaco",md:"Moldova",me:"Montenegro",mf:"St. Martin",mg:"Madagascar",mh:"Marshall Islands",mk:"North Macedonia",ml:"Mali",mm:"Myanmar (Burma)",mn:"Mongolia",mo:"Macao SAR China",mp:"Northern Mariana Islands",mq:"Martinique",mr:"Mauritania",ms:"Montserrat",mt:"Malta",mu:"Mauritius",mv:"Maldives",mw:"Malawi",mx:"Mexico",my:"Malaysia",mz:"Mozambique",na:"Namibia",nc:"New Caledonia",ne:"Niger",nf:"Norfolk Island",ng:"Nigeria",ni:"Nicaragua",nl:"Netherlands",no:"Norway",np:"Nepal",nr:"Nauru",nu:"Niue",nz:"New Zealand",om:"Oman",pa:"Panama",pe:"Peru",pf:"French Polynesia",pg:"Papua New Guinea",ph:"Philippines",pk:"Pakistan",pl:"Poland",pm:"St. Pierre & Miquelon",pr:"Puerto Rico",ps:"Palestinian Territories",pt:"Portugal",pw:"Palau",py:"Paraguay",qa:"Qatar",re:"R\xE9union",ro:"Romania",rs:"Serbia",ru:"Russia",rw:"Rwanda",sa:"Saudi Arabia",sb:"Solomon Islands",sc:"Seychelles",sd:"Sudan",se:"Sweden",sg:"Singapore",sh:"St. Helena",si:"Slovenia",sj:"Svalbard & Jan Mayen",sk:"Slovakia",sl:"Sierra Leone",sm:"San Marino",sn:"Senegal",so:"Somalia",sr:"Suriname",ss:"South Sudan",st:"S\xE3o Tom\xE9 & Pr\xEDncipe",sv:"El Salvador",sx:"Sint Maarten",sy:"Syria",sz:"Eswatini",tc:"Turks & Caicos Islands",td:"Chad",tg:"Togo",th:"Thailand",tj:"Tajikistan",tk:"Tokelau",tl:"Timor-Leste",tm:"Turkmenistan",tn:"Tunisia",to:"Tonga",tr:"Turkey",tt:"Trinidad & Tobago",tv:"Tuvalu",tw:"Taiwan",tz:"Tanzania",ua:"Ukraine",ug:"Uganda",us:"United States",uy:"Uruguay",uz:"Uzbekistan",va:"Vatican City",vc:"St. Vincent & Grenadines",ve:"Venezuela",vg:"British Virgin Islands",vi:"U.S. Virgin Islands",vn:"Vietnam",vu:"Vanuatu",wf:"Wallis & Futuna",ws:"Samoa",ye:"Yemen",yt:"Mayotte",za:"South Africa",zm:"Zambia",zw:"Zimbabwe"},A=U;var z={selectedCountryAriaLabel:"Selected country",noCountrySelected:"No country selected",countryListAriaLabel:"List of countries",searchPlaceholder:"Search",zeroSearchResults:"No results found",oneSearchResult:"1 result found",multipleSearchResults:"${count} results found",ac:"Ascension Island",xk:"Kosovo"},S=z;var K={...A,...S},T=K;for(let l=0;l<f.length;l++)f[l].name=T[f[l].iso2];var V=0,k={allowDropdown:!0,autoPlaceholder:"polite",containerClass:"",countryOrder:null,countrySearch:!0,customPlaceholder:null,dropdownContainer:null,excludeCountries:[],fixDropdownWidth:!0,formatAsYouType:!0,formatOnDisplay:!0,geoIpLookup:null,hiddenInput:null,i18n:{},initialCountry:"",loadUtils:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",showFlags:!0,separateDialCode:!1,strictMode:!1,useFullscreenPopup:typeof navigator<"u"&&typeof window<"u"?/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=500:!1,validationNumberTypes:["MOBILE"]},$=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"],I=l=>l.replace(/\D/g,""),M=(l="")=>l.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),P=l=>{let t=I(l);if(t.charAt(0)==="1"){let e=t.substr(1,3);return $.includes(e)}return!1},W=(l,t,e,i)=>{if(e===0&&!i)return 0;let n=0;for(let s=0;s<t.length;s++){if(/[+0-9]/.test(t[s])&&n++,n===l&&!i)return s+1;if(i&&n===l+1)return s}return t.length},m=(l,t,e)=>{let i=document.createElement(l);return t&&Object.entries(t).forEach(([n,s])=>i.setAttribute(n,s)),e&&e.appendChild(i),i},b=(l,...t)=>{let{instances:e}=r;Object.values(e).forEach(i=>i[l](...t))},w=class{constructor(t,e={}){this.id=V++,this.a=t,this.c=null,this.d=Object.assign({},k,e),this.e=!!t.getAttribute("placeholder")}_init(){this.d.useFullscreenPopup&&(this.d.fixDropdownWidth=!1),this.d.onlyCountries.length===1&&(this.d.initialCountry=this.d.onlyCountries[0]),this.d.separateDialCode&&(this.d.nationalMode=!1),this.d.allowDropdown&&!this.d.showFlags&&!this.d.separateDialCode&&(this.d.nationalMode=!1),this.d.useFullscreenPopup&&!this.d.dropdownContainer&&(this.d.dropdownContainer=document.body),this.isAndroid=typeof navigator<"u"?/Android/i.test(navigator.userAgent):!1,this.isRTL=!!this.a.closest("[dir=rtl]");let t=this.d.allowDropdown||this.d.separateDialCode;this.showSelectedCountryOnLeft=this.isRTL?!t:t,this.d.separateDialCode&&(this.isRTL?this.originalPaddingRight=this.a.style.paddingRight:this.originalPaddingLeft=this.a.style.paddingLeft),this.d.i18n={...T,...this.d.i18n};let e=new Promise((n,s)=>{this.h=n,this.i=s}),i=new Promise((n,s)=>{this.i0=n,this.i1=s});this.promise=Promise.all([e,i]),this.s={},this._b(),this._f(),this._h(),this._i(),this._i3()}_b(){this._d(),this._d2(),this._d0(),this._sortCountries()}_sortCountries(){this.d.countryOrder&&(this.d.countryOrder=this.d.countryOrder.map(t=>t.toLowerCase())),this.p.sort((t,e)=>{let{countryOrder:i}=this.d;if(i){let n=i.indexOf(t.iso2),s=i.indexOf(e.iso2),o=n>-1,u=s>-1;if(o||u)return o&&u?n-s:o?-1:1}return t.name.localeCompare(e.name)})}_c(t,e,i){e.length>this.dialCodeMaxLen&&(this.dialCodeMaxLen=e.length),this.q.hasOwnProperty(e)||(this.q[e]=[]);for(let s=0;s<this.q[e].length;s++)if(this.q[e][s]===t)return;let n=i!==void 0?i:this.q[e].length;this.q[e][n]=t}_d(){let{onlyCountries:t,excludeCountries:e}=this.d;if(t.length){let i=t.map(n=>n.toLowerCase());this.p=f.filter(n=>i.includes(n.iso2))}else if(e.length){let i=e.map(n=>n.toLowerCase());this.p=f.filter(n=>!i.includes(n.iso2))}else this.p=f}_d0(){for(let t=0;t<this.p.length;t++){let e=this.p[t].iso2.toLowerCase();this.d.i18n.hasOwnProperty(e)&&(this.p[t].name=this.d.i18n[e])}}_d2(){this.dialCodes={},this.dialCodeMaxLen=0,this.q={};for(let t=0;t<this.p.length;t++){let e=this.p[t];this.dialCodes[e.dialCode]||(this.dialCodes[e.dialCode]=!0),this._c(e.iso2,e.dialCode,e.priority)}for(let t=0;t<this.p.length;t++){let e=this.p[t];if(e.areaCodes){let i=this.q[e.dialCode][0];for(let n=0;n<e.areaCodes.length;n++){let s=e.areaCodes[n];for(let o=1;o<s.length;o++){let u=s.substr(0,o),a=e.dialCode+u;this._c(i,a),this._c(e.iso2,a)}this._c(e.iso2,e.dialCode+s)}}}}_f(){this.a.classList.add("iti__tel-input"),!this.a.hasAttribute("autocomplete")&&!(this.a.form&&this.a.form.hasAttribute("autocomplete"))&&this.a.setAttribute("autocomplete","off");let{allowDropdown:t,separateDialCode:e,showFlags:i,containerClass:n,hiddenInput:s,dropdownContainer:o,fixDropdownWidth:u,useFullscreenPopup:a,countrySearch:h,i18n:d}=this.d,p="iti";t&&(p+=" iti--allow-dropdown"),i&&(p+=" iti--show-flags"),n&&(p+=` ${n}`),a||(p+=" iti--inline-dropdown");let c=m("div",{class:p});if(this.a.parentNode?.insertBefore(c,this.a),t||i||e){this.k=m("div",{class:"iti__country-container"},c),this.showSelectedCountryOnLeft?this.k.style.left="0px":this.k.style.right="0px",t?(this.selectedCountry=m("button",{type:"button",class:"iti__selected-country","aria-expanded":"false","aria-label":this.d.i18n.selectedCountryAriaLabel,"aria-haspopup":"true","aria-controls":`iti-${this.id}__dropdown-content`,role:"combobox"},this.k),this.a.disabled&&this.selectedCountry.setAttribute("disabled","true")):this.selectedCountry=m("div",{class:"iti__selected-country"},this.k);let g=m("div",{class:"iti__selected-country-primary"},this.selectedCountry);if(this.l=m("div",{class:"iti__flag"},g),this.selectedCountryA11yText=m("span",{class:"iti__a11y-text"},this.l),t&&(this.u=m("div",{class:"iti__arrow","aria-hidden":"true"},g)),e&&(this.t=m("div",{class:"iti__selected-dial-code"},this.selectedCountry)),t){let C=u?"":"iti--flexible-dropdown-width";if(this.dropdownContent=m("div",{id:`iti-${this.id}__dropdown-content`,class:`iti__dropdown-content iti__hide ${C}`}),h&&(this.searchInput=m("input",{type:"text",class:"iti__search-input",placeholder:d.searchPlaceholder,role:"combobox","aria-expanded":"true","aria-label":d.searchPlaceholder,"aria-controls":`iti-${this.id}__country-listbox`,"aria-autocomplete":"list",autocomplete:"off"},this.dropdownContent),this.searchResultsA11yText=m("span",{class:"iti__a11y-text"},this.dropdownContent)),this.countryList=m("ul",{class:"iti__country-list",id:`iti-${this.id}__country-listbox`,role:"listbox","aria-label":d.countryListAriaLabel},this.dropdownContent),this._g(),h&&this._p4(),o){let y="iti iti--container";a?y+=" iti--fullscreen-popup":y+=" iti--inline-dropdown",this.dropdown=m("div",{class:y}),this.dropdown.appendChild(this.dropdownContent)}else this.k.appendChild(this.dropdownContent)}}if(c.appendChild(this.a),this._updateInputPadding(),s){let g=this.a.getAttribute("name")||"",C=s(g);if(C.phone){let y=this.a.form?.querySelector(`input[name="${C.phone}"]`);y?this.hiddenInput=y:(this.hiddenInput=m("input",{type:"hidden",name:C.phone}),c.appendChild(this.hiddenInput))}if(C.country){let y=this.a.form?.querySelector(`input[name="${C.country}"]`);y?this.hiddenInputCountry=y:(this.hiddenInputCountry=m("input",{type:"hidden",name:C.country}),c.appendChild(this.hiddenInputCountry))}}}_g(){for(let t=0;t<this.p.length;t++){let e=this.p[t],i=t===0?"iti__highlight":"",n=m("li",{id:`iti-${this.id}__item-${e.iso2}`,class:`iti__country ${i}`,tabindex:"-1",role:"option","data-dial-code":e.dialCode,"data-country-code":e.iso2,"aria-selected":"false"},this.countryList);e.nodeById[this.id]=n;let s="";this.d.showFlags&&(s+=`<div class='iti__flag iti__${e.iso2}'></div>`),s+=`<span class='iti__country-name'>${e.name}</span>`,s+=`<span class='iti__dial-code'>+${e.dialCode}</span>`,n.insertAdjacentHTML("beforeend",s)}}_h(t=!1){let e=this.a.getAttribute("value"),i=this.a.value,s=e&&e.charAt(0)==="+"&&(!i||i.charAt(0)!=="+")?e:i,o=this._5(s),u=P(s),{initialCountry:a,geoIpLookup:h}=this.d,d=a==="auto"&&h;if(o&&!u)this._v(s);else if(!d||t){let p=a?a.toLowerCase():"";p&&this._y(p,!0)?this._z(p):o&&u?this._z("us"):this._z()}s&&this._u(s)}_i(){this._j(),this.d.allowDropdown&&this._i2(),(this.hiddenInput||this.hiddenInputCountry)&&this.a.form&&this._i0()}_i0(){this._a14=()=>{this.hiddenInput&&(this.hiddenInput.value=this.getNumber()),this.hiddenInputCountry&&(this.hiddenInputCountry.value=this.getSelectedCountryData().iso2||"")},this.a.form?.addEventListener("submit",this._a14)}_i2(){this._a9=e=>{this.dropdownContent.classList.contains("iti__hide")?this.a.focus():e.preventDefault()};let t=this.a.closest("label");t&&t.addEventListener("click",this._a9),this._a10=()=>{this.dropdownContent.classList.contains("iti__hide")&&!this.a.disabled&&!this.a.readOnly&&this._n()},this.selectedCountry.addEventListener("click",this._a10),this._a11=e=>{this.dropdownContent.classList.contains("iti__hide")&&["ArrowUp","ArrowDown"," ","Enter"].includes(e.key)&&(e.preventDefault(),e.stopPropagation(),this._n()),e.key==="Tab"&&this._2()},this.k.addEventListener("keydown",this._a11)}_i3(){let{loadUtils:t,initialCountry:e,geoIpLookup:i}=this.d;t&&!r.utils?(this._handlePageLoad=()=>{window.removeEventListener("load",this._handlePageLoad),r.attachUtils(t)?.catch(()=>{})},r.documentReady()?this._handlePageLoad():window.addEventListener("load",this._handlePageLoad)):this.i0(),e==="auto"&&i&&!this.s.iso2?this._i4():this.h()}_i4(){r.autoCountry?this.handleAutoCountry():r.startedLoadingAutoCountry||(r.startedLoadingAutoCountry=!0,typeof this.d.geoIpLookup=="function"&&this.d.geoIpLookup((t="")=>{let e=t.toLowerCase();e&&this._y(e,!0)?(r.autoCountry=e,setTimeout(()=>b("handleAutoCountry"))):(this._h(!0),b("rejectAutoCountryPromise"))},()=>{this._h(!0),b("rejectAutoCountryPromise")}))}_nWithPlus(){this._n(),this.searchInput.value="+",this._p3("",!0)}_j(){let{strictMode:t,formatAsYouType:e,separateDialCode:i,formatOnDisplay:n,allowDropdown:s,countrySearch:o}=this.d,u=!1;/\p{L}/u.test(this.a.value)&&(u=!0),this._a12=a=>{if(this.isAndroid&&a?.data==="+"&&i&&s&&o){let c=this.a.selectionStart||0,g=this.a.value.substring(0,c-1),C=this.a.value.substring(c);this.a.value=g+C,this._nWithPlus();return}this._v(this.a.value)&&this._8();let h=a?.data&&/[^+0-9]/.test(a.data),d=a?.inputType==="insertFromPaste"&&this.a.value;h||d&&!t?u=!0:/[^+0-9]/.test(this.a.value)||(u=!1);let p=a?.detail&&a.detail.isSetNumber&&!n;if(e&&!u&&!p){let c=this.a.selectionStart||0,C=this.a.value.substring(0,c).replace(/[^+0-9]/g,"").length,y=a?.inputType==="deleteContentForward",v=this._9(),_=W(C,v,c,y);this.a.value=v,this.a.setSelectionRange(_,_)}},this.a.addEventListener("input",this._a12),(t||i)&&(this._handleKeydownEvent=a=>{if(a.key&&a.key.length===1&&!a.altKey&&!a.ctrlKey&&!a.metaKey){if(i&&s&&o&&a.key==="+"){a.preventDefault(),this._nWithPlus();return}if(t){let h=this.a.value,d=h.charAt(0)==="+",p=!d&&this.a.selectionStart===0&&a.key==="+",c=/^[0-9]$/.test(a.key),g=i?c:p||c,C=h.slice(0,this.a.selectionStart)+a.key+h.slice(this.a.selectionEnd),y=this._6(C),v=r.utils.getCoreNumber(y,this.s.iso2),_=this.maxCoreNumberLength&&v.length>this.maxCoreNumberLength,E=!1;if(d){let x=this.s.iso2;E=this._getCountryFromNumber(y)!==x}(!g||_&&!E&&!p)&&a.preventDefault()}}},this.a.addEventListener("keydown",this._handleKeydownEvent))}_j2(t){let e=parseInt(this.a.getAttribute("maxlength")||"",10);return e&&t.length>e?t.substr(0,e):t}_trigger(t,e={}){let i=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:e});this.a.dispatchEvent(i)}_n(){let{fixDropdownWidth:t,countrySearch:e}=this.d;if(t&&(this.dropdownContent.style.width=`${this.a.offsetWidth}px`),this.dropdownContent.classList.remove("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","true"),this._o(),e){let i=this.countryList.firstElementChild;i&&(this._x(i,!1),this.countryList.scrollTop=0),this.searchInput.focus()}this._p(),this.u.classList.add("iti__arrow--up"),this._trigger("open:countrydropdown")}_o(){if(this.d.dropdownContainer&&this.d.dropdownContainer.appendChild(this.dropdown),!this.d.useFullscreenPopup){let t=this.a.getBoundingClientRect(),e=this.a.offsetHeight;this.d.dropdownContainer&&(this.dropdown.style.top=`${t.top+e}px`,this.dropdown.style.left=`${t.left}px`,this._a4=()=>this._2(),window.addEventListener("scroll",this._a4))}}_p(){this._a0=n=>{let s=n.target?.closest(".iti__country");s&&this._x(s,!1)},this.countryList.addEventListener("mouseover",this._a0),this._a1=n=>{let s=n.target?.closest(".iti__country");s&&this._1(s)},this.countryList.addEventListener("click",this._a1);let t=!0;this._a2=()=>{t||this._2(),t=!1},document.documentElement.addEventListener("click",this._a2);let e="",i=null;if(this._a3=n=>{["ArrowUp","ArrowDown","Enter","Escape"].includes(n.key)&&(n.preventDefault(),n.stopPropagation(),n.key==="ArrowUp"||n.key==="ArrowDown"?this._q(n.key):n.key==="Enter"?this._r():n.key==="Escape"&&this._2()),!this.d.countrySearch&&/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(n.key)&&(n.stopPropagation(),i&&clearTimeout(i),e+=n.key.toLowerCase(),this._searchForCountry(e),i=setTimeout(()=>{e=""},1e3))},document.addEventListener("keydown",this._a3),this.d.countrySearch){let n=()=>{let o=this.searchInput.value.trim();o?this._p3(o):this._p3("",!0)},s=null;this._a7=()=>{s&&clearTimeout(s),s=setTimeout(()=>{n(),s=null},100)},this.searchInput.addEventListener("input",this._a7),this.searchInput.addEventListener("click",o=>o.stopPropagation())}}_searchForCountry(t){for(let e=0;e<this.p.length;e++){let i=this.p[e];if(i.name.substr(0,t.length).toLowerCase()===t){let s=i.nodeById[this.id];this._x(s,!1),this._3(s);break}}}_p3(t,e=!1){let i=!0;this.countryList.innerHTML="";let n=M(t);for(let s=0;s<this.p.length;s++){let o=this.p[s],u=M(o.name),a=o.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(d=>d[0]).join("").toLowerCase(),h=`+${o.dialCode}`;if(e||u.includes(n)||h.includes(n)||o.iso2.includes(n)||a.includes(n)){let d=o.nodeById[this.id];d&&this.countryList.appendChild(d),i&&(this._x(d,!1),i=!1)}}i&&this._x(null,!1),this.countryList.scrollTop=0,this._p4()}_p4(){let{i18n:t}=this.d,e=this.countryList.childElementCount,i;e===0?i=t.zeroSearchResults:e===1?i=t.oneSearchResult:i=t.multipleSearchResults.replace("${count}",e.toString()),this.searchResultsA11yText.textContent=i}_q(t){let e=t==="ArrowUp"?this.c?.previousElementSibling:this.c?.nextElementSibling;!e&&this.countryList.childElementCount>1&&(e=t==="ArrowUp"?this.countryList.lastElementChild:this.countryList.firstElementChild),e&&(this._3(e),this._x(e,!1))}_r(){this.c&&this._1(this.c)}_u(t){let e=t;if(this.d.formatOnDisplay&&r.utils&&this.s){let i=this.d.nationalMode||e.charAt(0)!=="+"&&!this.d.separateDialCode,{NATIONAL:n,INTERNATIONAL:s}=r.utils.numberFormat,o=i?n:s;e=r.utils.formatNumber(e,this.s.iso2,o)}e=this._7(e),this.a.value=e}_v(t){let e=this._getCountryFromNumber(t);return e!==null?this._z(e):!1}_ensureHasDialCode(t){let{dialCode:e,nationalPrefix:i}=this.s;if(t.charAt(0)==="+"||!e)return t;let o=i&&t.charAt(0)===i&&!this.d.separateDialCode?t.substring(1):t;return`+${e}${o}`}_getCountryFromNumber(t){let e=t.indexOf("+"),i=e?t.substring(e):t,n=this.s.iso2,s=this.s.dialCode;i=this._ensureHasDialCode(i);let o=this._5(i,!0),u=I(i);if(o){let a=I(o),h=this.q[a];if(!n&&this.j&&h.includes(this.j))return this.j;let d=n&&h.includes(n)&&(u.length===a.length||!this.s.areaCodes);if(!(s==="1"&&P(u))&&!d){for(let c=0;c<h.length;c++)if(h[c])return h[c]}}else{if(i.charAt(0)==="+"&&u.length)return"";if((!i||i==="+")&&!this.s.iso2)return this.j}return null}_x(t,e){let i=this.c;if(i&&(i.classList.remove("iti__highlight"),i.setAttribute("aria-selected","false")),this.c=t,this.c){this.c.classList.add("iti__highlight"),this.c.setAttribute("aria-selected","true");let n=this.c.getAttribute("id")||"";this.selectedCountry.setAttribute("aria-activedescendant",n),this.d.countrySearch&&this.searchInput.setAttribute("aria-activedescendant",n)}e&&this.c.focus()}_y(t,e){for(let i=0;i<this.p.length;i++)if(this.p[i].iso2===t)return this.p[i];if(e)return null;throw new Error(`No country data for '${t}'`)}_z(t){let{separateDialCode:e,showFlags:i,i18n:n}=this.d,s=this.s.iso2?this.s:{};if(this.s=t?this._y(t,!1)||{}:{},this.s.iso2&&(this.j=this.s.iso2),this.l){let o="",u="";t&&i?(o=`iti__flag iti__${t}`,u=`${this.s.name} +${this.s.dialCode}`):(o="iti__flag iti__globe",u=n.noCountrySelected),this.l.className=o,this.selectedCountryA11yText.textContent=u}if(this._z3(t,e),e){let o=this.s.dialCode?`+${this.s.dialCode}`:"";this.t.innerHTML=o,this._updateInputPadding()}return this._0(),this._updateMaxLength(),s.iso2!==t}_updateInputPadding(){if(this.selectedCountry){let e=(this.selectedCountry.offsetWidth||this._z2())+6;this.showSelectedCountryOnLeft?this.a.style.paddingLeft=`${e}px`:this.a.style.paddingRight=`${e}px`}}_updateMaxLength(){let{strictMode:t,placeholderNumberType:e,validationNumberTypes:i}=this.d,{iso2:n}=this.s;if(t&&r.utils)if(n){let s=r.utils.numberType[e],o=r.utils.getExampleNumber(n,!1,s,!0),u=o;for(;r.utils.isPossibleNumber(o,n,i);)u=o,o+="0";let a=r.utils.getCoreNumber(u,n);this.maxCoreNumberLength=a.length,n==="by"&&(this.maxCoreNumberLength=a.length+1)}else this.maxCoreNumberLength=null}_z3(t=null,e){if(!this.selectedCountry)return;let i;t&&!e?i=`${this.s.name}: +${this.s.dialCode}`:t?i=this.s.name:i="Unknown",this.selectedCountry.setAttribute("title",i)}_z2(){if(this.a.parentNode){let t=this.a.parentNode.cloneNode(!1);t.style.visibility="hidden",document.body.appendChild(t);let e=this.k.cloneNode();t.appendChild(e);let i=this.selectedCountry.cloneNode(!0);e.appendChild(i);let n=i.offsetWidth;return document.body.removeChild(t),n}return 0}_0(){let{autoPlaceholder:t,placeholderNumberType:e,nationalMode:i,customPlaceholder:n}=this.d,s=t==="aggressive"||!this.e&&t==="polite";if(r.utils&&s){let o=r.utils.numberType[e],u=this.s.iso2?r.utils.getExampleNumber(this.s.iso2,i,o):"";u=this._7(u),typeof n=="function"&&(u=n(u,this.s)),this.a.setAttribute("placeholder",u)}}_1(t){let e=this._z(t.getAttribute("data-country-code"));this._2(),this._4(t.getAttribute("data-dial-code")),this.a.focus(),e&&this._8()}_2(){this.dropdownContent.classList.add("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","false"),this.selectedCountry.removeAttribute("aria-activedescendant"),this.c&&this.c.setAttribute("aria-selected","false"),this.d.countrySearch&&this.searchInput.removeAttribute("aria-activedescendant"),this.u.classList.remove("iti__arrow--up"),document.removeEventListener("keydown",this._a3),this.d.countrySearch&&this.searchInput.removeEventListener("input",this._a7),document.documentElement.removeEventListener("click",this._a2),this.countryList.removeEventListener("mouseover",this._a0),this.countryList.removeEventListener("click",this._a1),this.d.dropdownContainer&&(this.d.useFullscreenPopup||window.removeEventListener("scroll",this._a4),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._handlePageLoad&&window.removeEventListener("load",this._handlePageLoad),this._trigger("close:countrydropdown")}_3(t){let e=this.countryList,i=document.documentElement.scrollTop,n=e.offsetHeight,s=e.getBoundingClientRect().top+i,o=s+n,u=t.offsetHeight,a=t.getBoundingClientRect().top+i,h=a+u,d=a-s+e.scrollTop;if(a<s)e.scrollTop=d;else if(h>o){let p=n-u;e.scrollTop=d-p}}_4(t){let e=this.a.value,i=`+${t}`,n;if(e.charAt(0)==="+"){let s=this._5(e);s?n=e.replace(s,i):n=i,this.a.value=n}}_5(t,e){let i="";if(t.charAt(0)==="+"){let n="";for(let s=0;s<t.length;s++){let o=t.charAt(s);if(!isNaN(parseInt(o,10))){if(n+=o,e)this.q[n]&&(i=t.substr(0,s+1));else if(this.dialCodes[n]){i=t.substr(0,s+1);break}if(n.length===this.dialCodeMaxLen)break}}}return i}_6(t){let e=t||this.a.value.trim(),{dialCode:i}=this.s,n,s=I(e);return this.d.separateDialCode&&e.charAt(0)!=="+"&&i&&s?n=`+${i}`:n="",n+e}_7(t){let e=t;if(this.d.separateDialCode){let i=this._5(e);if(i){i=`+${this.s.dialCode}`;let n=e[i.length]===" "||e[i.length]==="-"?i.length+1:i.length;e=e.substr(n)}}return this._j2(e)}_8(){this._trigger("countrychange")}_9(){let t=this._6(),e=r.utils?r.utils.formatNumberAsYouType(t,this.s.iso2):t,{dialCode:i}=this.s;return this.d.separateDialCode&&this.a.value.charAt(0)!=="+"&&e.includes(`+${i}`)?(e.split(`+${i}`)[1]||"").trim():e}handleAutoCountry(){this.d.initialCountry==="auto"&&r.autoCountry&&(this.j=r.autoCountry,this.s.iso2||this.l.classList.contains("iti__globe")||this.setCountry(this.j),this.h())}handleUtils(){r.utils&&(this.a.value&&this._u(this.a.value),this.s.iso2&&(this._0(),this._updateMaxLength())),this.i0()}destroy(){let{allowDropdown:t,separateDialCode:e}=this.d;if(t){this._2(),this.selectedCountry.removeEventListener("click",this._a10),this.k.removeEventListener("keydown",this._a11);let s=this.a.closest("label");s&&s.removeEventListener("click",this._a9)}let{form:i}=this.a;this._a14&&i&&i.removeEventListener("submit",this._a14),this.a.removeEventListener("input",this._a12),this._handleKeydownEvent&&this.a.removeEventListener("keydown",this._handleKeydownEvent),this.a.removeAttribute("data-intl-tel-input-id"),e&&(this.isRTL?this.a.style.paddingRight=this.originalPaddingRight:this.a.style.paddingLeft=this.originalPaddingLeft);let n=this.a.parentNode;n?.parentNode?.insertBefore(this.a,n),n?.parentNode?.removeChild(n),delete r.instances[this.id]}getExtension(){return r.utils?r.utils.getExtension(this._6(),this.s.iso2):""}getNumber(t){if(r.utils){let{iso2:e}=this.s;return r.utils.formatNumber(this._6(),e,t)}return""}getNumberType(){return r.utils?r.utils.getNumberType(this._6(),this.s.iso2):-99}getSelectedCountryData(){return this.s}getValidationError(){if(r.utils){let{iso2:t}=this.s;return r.utils.getValidationError(this._6(),t)}return-99}isValidNumber(){if(!this.s.iso2)return!1;let t=this._6(),e=t.search(/\p{L}/u);if(e>-1){let i=t.substring(0,e),n=this._utilsIsPossibleNumber(i),s=this._utilsIsPossibleNumber(t);return n&&s}return this._utilsIsPossibleNumber(t)}_utilsIsPossibleNumber(t){return r.utils?r.utils.isPossibleNumber(t,this.s.iso2,this.d.validationNumberTypes):null}isValidNumberPrecise(){if(!this.s.iso2)return!1;let t=this._6(),e=t.search(/\p{L}/u);if(e>-1){let i=t.substring(0,e),n=this._utilsIsValidNumber(i),s=this._utilsIsValidNumber(t);return n&&s}return this._utilsIsValidNumber(t)}_utilsIsValidNumber(t){return r.utils?r.utils.isValidNumber(t,this.s.iso2,this.d.validationNumberTypes):null}setCountry(t){let e=t?.toLowerCase(),i=this.s.iso2;(t&&e!==i||!t&&i)&&(this._z(e),this._4(this.s.dialCode),this._8())}setNumber(t){let e=this._v(t);this._u(t),e&&this._8(),this._trigger("input",{isSetNumber:!0})}setPlaceholderNumberType(t){this.d.placeholderNumberType=t,this._0()}setDisabled(t){this.a.disabled=t,t?this.selectedCountry.setAttribute("disabled","true"):this.selectedCountry.removeAttribute("disabled")}},G=l=>{if(!r.utils&&!r.startedLoadingUtilsScript){let t;if(typeof l=="function")try{t=Promise.resolve(l())}catch(e){return Promise.reject(e)}else return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof l}`));return r.startedLoadingUtilsScript=!0,t.then(e=>{let i=e?.default;if(!i||typeof i!="object")throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");return r.utils=i,b("handleUtils"),!0}).catch(e=>{throw b("rejectUtilsScriptPromise",e),e})}return null},r=Object.assign((l,t)=>{let e=new w(l,t);return e._init(),l.setAttribute("data-intl-tel-input-id",e.id.toString()),r.instances[e.id]=e,e},{defaults:k,documentReady:()=>document.readyState==="complete",getCountryData:()=>f,getInstance:l=>{let t=l.getAttribute("data-intl-tel-input-id");return t?r.instances[t]:null},instances:{},attachUtils:G,startedLoadingUtilsScript:!1,startedLoadingAutoCountry:!1,version:"25.3.1"}),q=r;return j(Y);})();

// UMD
  return factoryOutput.default;
}));

/*!
  Tiny Slider - v2.8.8 (https://github.com/ganlanyuan/tiny-slider)
  Vanilla JavaScript slider for all purposes -- inspired by Owl Carousel
  (c) William Lin - @ganlanyuan - https://github.com/ganlanyuan
*/
var tns = function () { var t = window, e = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || function (t) { return setTimeout(t, 16) }, n = window, i = n.cancelAnimationFrame || n.mozCancelAnimationFrame || function (t) { clearTimeout(t) }; function a() { for (var t, e, n, i = arguments[0] || {}, a = 1, r = arguments.length; a < r; a++) if (null !== (t = arguments[a])) for (e in t) i !== (n = t[e]) && void 0 !== n && (i[e] = n); return i } function r(t) { return ["true", "false"].indexOf(t) >= 0 ? JSON.parse(t) : t } function o(t, e, n, i) { if (i) try { t.setItem(e, n) } catch (t) { } return n } function u() { var t = document, e = t.body; return e || ((e = t.createElement("body")).fake = !0), e } var l = document.documentElement; function s(t) { var e = ""; return t.fake && (e = l.style.overflow, t.style.background = "", t.style.overflow = l.style.overflow = "hidden", l.appendChild(t)), e } function c(t, e) { t.fake && (t.remove(), l.style.overflow = e, l.offsetHeight) } function f(t, e, n, i) { "insertRule" in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i) } function d(t) { return ("insertRule" in t ? t.cssRules : t.rules).length } function v(t, e, n) { for (var i = 0, a = t.length; i < a; i++) e.call(n, t[i], i) } var p = "classList" in document.createElement("_"), h = p ? function (t, e) { return t.classList.contains(e) } : function (t, e) { return t.className.indexOf(e) >= 0 }, m = p ? function (t, e) { h(t, e) || t.classList.add(e) } : function (t, e) { h(t, e) || (t.className += " " + e) }, y = p ? function (t, e) { h(t, e) && t.classList.remove(e) } : function (t, e) { h(t, e) && (t.className = t.className.replace(e, "")) }; function g(t, e) { return t.hasAttribute(e) } function x(t, e) { return t.getAttribute(e) } function b(t) { return void 0 !== t.item } function C(t, e) { if (t = b(t) || t instanceof Array ? t : [t], "[object Object]" === Object.prototype.toString.call(e)) for (var n = t.length; n--;) for (var i in e) t[n].setAttribute(i, e[i]) } function w(t, e) { t = b(t) || t instanceof Array ? t : [t]; for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--;) for (var a = n; a--;) t[i].removeAttribute(e[a]) } function M(t) { for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]); return e } function T(t, e) { "none" !== t.style.display && (t.style.display = "none") } function A(t, e) { "none" === t.style.display && (t.style.display = "") } function E(t) { return "none" !== window.getComputedStyle(t).display } function B(t) { if ("string" == typeof t) { var e = [t], n = t.charAt(0).toUpperCase() + t.substr(1);["Webkit", "Moz", "ms", "O"].forEach(function (i) { "ms" === i && "transform" !== t || e.push(i + n) }), t = e } for (var i = document.createElement("fakeelement"), a = (t.length, 0) ; a < t.length; a++) { var r = t[a]; if (void 0 !== i.style[r]) return r } return !1 } function L(t, e) { var n = !1; return /^Webkit/.test(t) ? n = "webkit" + e + "End" : /^O/.test(t) ? n = "o" + e + "End" : t && (n = e.toLowerCase() + "end"), n } var N = !1; try { var S = Object.defineProperty({}, "passive", { get: function () { N = !0 } }); window.addEventListener("test", null, S) } catch (t) { } var O = !!N && { passive: !0 }; function D(t, e, n) { for (var i in e) { var a = ["touchstart", "touchmove"].indexOf(i) >= 0 && !n && O; t.addEventListener(i, e[i], a) } } function H(t, e) { for (var n in e) { var i = ["touchstart", "touchmove"].indexOf(n) >= 0 && O; t.removeEventListener(n, e[n], i) } } Object.keys || (Object.keys = function (t) { var e = []; for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n); return e }), "remove" in Element.prototype || (Element.prototype.remove = function () { this.parentNode && this.parentNode.removeChild(this) }); var k = function (t) { t = a({ container: ".slider", mode: "carousel", axis: "horizontal", items: 1, gutter: 0, edgePadding: 0, fixedWidth: !1, autoWidth: !1, viewportMax: !1, slideBy: 1, center: !1, controls: !0, controlsPosition: "top", controlsText: ["prev", "next"], controlsContainer: !1, prevButton: !1, nextButton: !1, nav: !0, navPosition: "top", navContainer: !1, navAsThumbnails: !1, arrowKeys: !1, speed: 300, autoplay: !1, autoplayPosition: "top", autoplayTimeout: 5e3, autoplayDirection: "forward", autoplayText: ["start", "stop"], autoplayHoverPause: !1, autoplayButton: !1, autoplayButtonOutput: !0, autoplayResetOnVisibility: !0, animateIn: "tns-fadeIn", animateOut: "tns-fadeOut", animateNormal: "tns-normal", animateDelay: !1, loop: !0, rewind: !1, autoHeight: !1, responsive: !1, lazyload: !1, lazyloadSelector: ".tns-lazy-img", touch: !0, mouseDrag: !1, swipeAngle: 15, nested: !1, preventActionWhenRunning: !1, preventScrollOnTouch: !1, freezable: !0, onInit: !1, useLocalStorage: !0 }, t || {}); var n = document, l = window, p = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 }, b = {}, N = t.useLocalStorage; if (N) { var S = navigator.userAgent, O = new Date; try { (b = l.localStorage) ? (b.setItem(O, O), N = b.getItem(O) == O, b.removeItem(O)) : N = !1, N || (b = {}) } catch (t) { N = !1 } N && (b.tnsApp && b.tnsApp !== S && ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function (t) { b.removeItem(t) }), localStorage.tnsApp = S) } var R, I, P, W, z, F, q, j = b.tC ? r(b.tC) : o(b, "tC", function () { var t = document, e = u(), n = s(e), i = t.createElement("div"), a = !1; e.appendChild(i); try { for (var r, o = "(10px * 10)", l = ["calc" + o, "-moz-calc" + o, "-webkit-calc" + o], f = 0; f < 3; f++) if (r = l[f], i.style.width = r, 100 === i.offsetWidth) { a = r.replace(o, ""); break } } catch (t) { } return e.fake ? c(e, n) : i.remove(), a }(), N), Q = b.tPL ? r(b.tPL) : o(b, "tPL", function () { var t, e = document, n = u(), i = s(n), a = e.createElement("div"), r = e.createElement("div"), o = ""; a.className = "tns-t-subp2", r.className = "tns-t-ct"; for (var l = 0; l < 70; l++) o += "<div></div>"; return r.innerHTML = o, a.appendChild(r), n.appendChild(a), t = Math.abs(a.getBoundingClientRect().left - r.children[67].getBoundingClientRect().left) < 2, n.fake ? c(n, i) : a.remove(), t }(), N), V = b.tMQ ? r(b.tMQ) : o(b, "tMQ", (I = document, P = u(), W = s(P), z = I.createElement("div"), F = I.createElement("style"), q = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}", F.type = "text/css", z.className = "tns-mq-test", P.appendChild(F), P.appendChild(z), F.styleSheet ? F.styleSheet.cssText = q : F.appendChild(I.createTextNode(q)), R = window.getComputedStyle ? window.getComputedStyle(z).position : z.currentStyle.position, P.fake ? c(P, W) : z.remove(), "absolute" === R), N), G = b.tTf ? r(b.tTf) : o(b, "tTf", B("transform"), N), X = b.t3D ? r(b.t3D) : o(b, "t3D", function (t) { if (!t) return !1; if (!window.getComputedStyle) return !1; var e, n = document, i = u(), a = s(i), r = n.createElement("p"), o = t.length > 9 ? "-" + t.slice(0, -9).toLowerCase() + "-" : ""; return o += "transform", i.insertBefore(r, null), r.style[t] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(r).getPropertyValue(o), i.fake ? c(i, a) : r.remove(), void 0 !== e && e.length > 0 && "none" !== e }(G), N), Y = b.tTDu ? r(b.tTDu) : o(b, "tTDu", B("transitionDuration"), N), K = b.tTDe ? r(b.tTDe) : o(b, "tTDe", B("transitionDelay"), N), U = b.tADu ? r(b.tADu) : o(b, "tADu", B("animationDuration"), N), J = b.tADe ? r(b.tADe) : o(b, "tADe", B("animationDelay"), N), _ = b.tTE ? r(b.tTE) : o(b, "tTE", L(Y, "Transition"), N), Z = b.tAE ? r(b.tAE) : o(b, "tAE", L(U, "Animation"), N), $ = l.console && "function" == typeof l.console.warn, tt = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"], et = {}; if (tt.forEach(function (e) { if ("string" == typeof t[e]) { var i = t[e], a = n.querySelector(i); if (et[e] = i, !a || !a.nodeName) return void ($ && console.warn("Can't find", t[e])); t[e] = a } }), !(t.container.children.length < 1)) { var nt = t.responsive, it = t.nested, at = "carousel" === t.mode; if (nt) { 0 in nt && (t = a(t, nt[0]), delete nt[0]); var rt = {}; for (var ot in nt) { var ut = nt[ot]; ut = "number" == typeof ut ? { items: ut } : ut, rt[ot] = ut } nt = rt, rt = null } if (at || function t(e) { for (var n in e) at || ("slideBy" === n && (e[n] = "page"), "edgePadding" === n && (e[n] = !1), "autoHeight" === n && (e[n] = !1)), "responsive" === n && t(e[n]) }(t), !at) { t.axis = "horizontal", t.slideBy = "page", t.edgePadding = !1; var lt = t.animateIn, st = t.animateOut, ct = t.animateDelay, ft = t.animateNormal } var dt, vt, pt = "horizontal" === t.axis, ht = n.createElement("div"), mt = n.createElement("div"), yt = t.container, gt = yt.parentNode, xt = yt.outerHTML, bt = yt.children, Ct = bt.length, wt = In(), Mt = !1; nt && ni(); var Tt, At, Et, Bt, Lt, Nt, St, Ot, Dt = t.autoWidth, Ht = Fn("fixedWidth"), kt = Fn("edgePadding"), Rt = Fn("gutter"), It = Wn(), Pt = Fn("center"), Wt = Dt ? 1 : Math.floor(Fn("items")), zt = Fn("slideBy"), Ft = t.viewportMax || t.fixedWidthViewportWidth, qt = Fn("arrowKeys"), jt = Fn("speed"), Qt = t.rewind, Vt = !Qt && t.loop, Gt = Fn("autoHeight"), Xt = Fn("controls"), Yt = Fn("controlsText"), Kt = Fn("nav"), Ut = Fn("touch"), Jt = Fn("mouseDrag"), _t = Fn("autoplay"), Zt = Fn("autoplayTimeout"), $t = Fn("autoplayText"), te = Fn("autoplayHoverPause"), ee = Fn("autoplayResetOnVisibility"), ne = (Ot = document.createElement("style"), St && Ot.setAttribute("media", St), document.querySelector("head").appendChild(Ot), Ot.sheet ? Ot.sheet : Ot.styleSheet), ie = t.lazyload, ae = (t.lazyloadSelector, []), re = Vt ? (Lt = function () { { if (Dt || Ht && !Ft) return Ct - 1; var e = Ht ? "fixedWidth" : "items", n = []; if ((Ht || t[e] < Ct) && n.push(t[e]), nt) for (var i in nt) { var a = nt[i][e]; a && (Ht || a < Ct) && n.push(a) } return n.length || n.push(0), Math.ceil(Ht ? Ft / Math.min.apply(null, n) : Math.max.apply(null, n)) } }(), Nt = at ? Math.ceil((5 * Lt - Ct) / 2) : 4 * Lt - Ct, Nt = Math.max(Lt, Nt), zn("edgePadding") ? Nt + 1 : Nt) : 0, oe = at ? Ct + 2 * re : Ct + re, ue = !(!Ht && !Dt || Vt), le = Ht ? Si() : null, se = !at || !Vt, ce = pt ? "left" : "top", fe = "", de = "", ve = Ht ? function () { return Pt && !Vt ? Ct - 1 : Math.ceil(-le / (Ht + Rt)) } : Dt ? function () { for (var t = oe; t--;) if (Tt[t] > -le) return t } : function () { return Pt && at && !Vt ? Ct - 1 : Vt || at ? Math.max(0, oe - Math.ceil(Wt)) : oe - 1 }, pe = Hn(Fn("startIndex")), he = pe, me = (Dn(), 0), ye = Dt ? null : ve(), ge = t.preventActionWhenRunning, xe = t.swipeAngle, be = !xe || "?", Ce = !1, we = t.onInit, Me = new function () { return { topics: {}, on: function (t, e) { this.topics[t] = this.topics[t] || [], this.topics[t].push(e) }, off: function (t, e) { if (this.topics[t]) for (var n = 0; n < this.topics[t].length; n++) if (this.topics[t][n] === e) { this.topics[t].splice(n, 1); break } }, emit: function (t, e) { e.type = t, this.topics[t] && this.topics[t].forEach(function (n) { n(e, t) }) } } }, Te = " tns-slider tns-" + t.mode, Ae = yt.id || (Bt = window.tnsId, window.tnsId = Bt ? Bt + 1 : 1, "tns" + window.tnsId), Ee = Fn("disable"), Be = !1, Le = t.freezable, Ne = !(!Le || Dt) && ei(), Se = !1, Oe = { click: zi, keydown: function (t) { t = Yi(t); var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode); e >= 0 && (0 === e ? Ze.disabled || zi(t, -1) : $e.disabled || zi(t, 1)) } }, De = { click: function (t) { if (Ce) { if (ge) return; Pi() } var e = Ki(t = Yi(t)); for (; e !== an && !g(e, "data-nav") ;) e = e.parentNode; if (g(e, "data-nav")) { var n = ln = Number(x(e, "data-nav")), i = Fe ? n : Math.min(Math.ceil(n * Ct / on), Ct - 1); Wi(i, t), sn === n && (hn && Vi(), ln = -1) } }, keydown: function (t) { t = Yi(t); var e = n.activeElement; if (!g(e, "data-nav")) return; var i = [p.LEFT, p.RIGHT, p.ENTER, p.SPACE].indexOf(t.keyCode), a = Number(x(e, "data-nav")); i >= 0 && (0 === i ? a > 0 && Xi(nn[a - 1]) : 1 === i ? a < on - 1 && Xi(nn[a + 1]) : (ln = a, Wi(a, t))) } }, He = { mouseover: function () { hn && (qi(), mn = !0) }, mouseout: function () { mn && (Fi(), mn = !1) } }, ke = { visibilitychange: function () { n.hidden ? hn && (qi(), gn = !0) : gn && (Fi(), gn = !1) } }, Re = { keydown: function (t) { t = Yi(t); var e = [p.LEFT, p.RIGHT].indexOf(t.keyCode); e >= 0 && zi(t, 0 === e ? -1 : 1) } }, Ie = { touchstart: Zi, touchmove: $i, touchend: ta, touchcancel: ta }, Pe = { mousedown: Zi, mousemove: $i, mouseup: ta, mouseleave: ta }, We = zn("controls"), ze = zn("nav"), Fe = !!Dt || t.navAsThumbnails, qe = zn("autoplay"), je = zn("touch"), Qe = zn("mouseDrag"), Ve = "tns-slide-active", Ge = "tns-complete", Xe = { load: function (t) { fi(Ki(t)) }, error: function (t) { di(Ki(t)) } }, Ye = "force" === t.preventScrollOnTouch; if (We) var Ke, Ue, Je = t.controlsContainer, _e = t.controlsContainer ? t.controlsContainer.outerHTML : "", Ze = t.prevButton, $e = t.nextButton, tn = t.prevButton ? t.prevButton.outerHTML : "", en = t.nextButton ? t.nextButton.outerHTML : ""; if (ze) var nn, an = t.navContainer, rn = t.navContainer ? t.navContainer.outerHTML : "", on = Dt ? Ct : na(), un = 0, ln = -1, sn = Rn(), cn = sn, fn = "tns-nav-active", dn = "Carousel Page ", vn = " (Current Slide)"; if (qe) var pn, hn, mn, yn, gn, xn = "forward" === t.autoplayDirection ? 1 : -1, bn = t.autoplayButton, Cn = t.autoplayButton ? t.autoplayButton.outerHTML : "", wn = ["<span class='tns-visually-hidden'>", " animation</span>"]; if (je || Qe) var Mn, Tn, An = {}, En = {}, Bn = !1, Ln = pt ? function (t, e) { return t.x - e.x } : function (t, e) { return t.y - e.y }; Dt || On(Ee || Ne), G && (ce = G, fe = "translate", X ? (fe += pt ? "3d(" : "3d(0px, ", de = pt ? ", 0px, 0px)" : ", 0px)") : (fe += pt ? "X(" : "Y(", de = ")")), function () { nt && ni(); if (function () { if (zn("gutter"), ht.className = "tns-outer", mt.className = "tns-inner", ht.id = Ae + "-ow", mt.id = Ae + "-iw", "" === yt.id && (yt.id = Ae), Te += Q || Dt ? " tns-subpixel" : " tns-no-subpixel", Te += j ? " tns-calc" : " tns-no-calc", Dt && (Te += " tns-autowidth"), Te += " tns-" + t.axis, yt.className += Te, at ? ((dt = n.createElement("div")).id = Ae + "-mw", dt.className = "tns-ovh", ht.appendChild(dt), dt.appendChild(mt)) : ht.appendChild(mt), Gt) { var e = dt || mt; e.className += " tns-ah" } gt.insertBefore(ht, yt), mt.appendChild(yt) }(), v(bt, function (t, e) { m(t, "tns-item"), t.id || (t.id = Ae + "-item" + e), !at && ft && m(t, ft), C(t, { "aria-hidden": "true", tabindex: "-1" }) }), re) { for (var e = n.createDocumentFragment(), i = n.createDocumentFragment(), a = re; a--;) { var r = a % Ct, o = bt[r].cloneNode(!0); if (w(o, "id"), i.insertBefore(o, i.firstChild), at) { var u = bt[Ct - 1 - r].cloneNode(!0); w(u, "id"), e.appendChild(u) } } yt.insertBefore(e, yt.firstChild), yt.appendChild(i), bt = yt.children } (function () { if (!at) for (var e = pe, n = pe + Math.min(Ct, Wt) ; e < n; e++) { var i = bt[e]; i.style.left = 100 * (e - pe) / Wt + "%", m(i, lt), y(i, ft) } pt && (Q || Dt ? (f(ne, "#" + Ae + " > .tns-item", "font-size:" + l.getComputedStyle(bt[0]).fontSize + ";", d(ne)), f(ne, "#" + Ae, "font-size:0;", d(ne))) : at && v(bt, function (t, e) { var n; t.style.marginLeft = (n = e, j ? j + "(" + 100 * n + "% / " + oe + ")" : 100 * n / oe + "%") })); if (V) { var a = dt && t.autoHeight ? Xn(t.speed) : ""; f(ne, "#" + Ae + "-mw", a, d(ne)), a = qn(t.edgePadding, t.gutter, t.fixedWidth, t.speed, t.autoHeight), f(ne, "#" + Ae + "-iw", a, d(ne)), at && (a = pt && !Dt ? "width:" + jn(t.fixedWidth, t.gutter, t.items) + ";" : "", Y && (a += Xn(jt)), f(ne, "#" + Ae, a, d(ne))), a = pt && !Dt ? Qn(t.fixedWidth, t.gutter, t.items) : "", t.gutter && (a += Vn(t.gutter)), at || (Y && (a += Xn(jt)), U && (a += Yn(jt))), a && f(ne, "#" + Ae + " > .tns-item", a, d(ne)) } else { xi(), mt.style.cssText = qn(kt, Rt, Ht, Gt), at && pt && !Dt && (yt.style.width = jn(Ht, Rt, Wt)); var a = pt && !Dt ? Qn(Ht, Rt, Wt) : ""; Rt && (a += Vn(Rt)), a && f(ne, "#" + Ae + " > .tns-item", a, d(ne)) } if (nt && V) for (var r in nt) { r = parseInt(r); var o = nt[r], a = "", u = "", s = "", c = "", p = "", h = Dt ? null : Fn("items", r), g = Fn("fixedWidth", r), x = Fn("speed", r), b = Fn("edgePadding", r), C = Fn("autoHeight", r), w = Fn("gutter", r); dt && Fn("autoHeight", r) && "speed" in o && (u = "#" + Ae + "-mw{" + Xn(x) + "}"), ("edgePadding" in o || "gutter" in o) && (s = "#" + Ae + "-iw{" + qn(b, w, g, x, C) + "}"), at && pt && !Dt && ("fixedWidth" in o || "items" in o || Ht && "gutter" in o) && (c = "width:" + jn(g, w, h) + ";"), Y && "speed" in o && (c += Xn(x)), c && (c = "#" + Ae + "{" + c + "}"), ("fixedWidth" in o || Ht && "gutter" in o || !at && "items" in o) && (p += Qn(g, w, h)), "gutter" in o && (p += Vn(w)), !at && "speed" in o && (Y && (p += Xn(x)), U && (p += Yn(x))), p && (p = "#" + Ae + " > .tns-item{" + p + "}"), (a = u + s + c + p) && ne.insertRule("@media (min-width: " + r / 16 + "em) {" + a + "}", ne.cssRules.length) } })(), Kn() }(); var Nn = Vt ? at ? function () { var t = me, e = ye; t += zt, e -= zt, kt ? (t += 1, e -= 1) : Ht && (It + Rt) % (Ht + Rt) && (e -= 1), re && (pe > e ? pe -= Ct : pe < t && (pe += Ct)) } : function () { if (pe > ye) for (; pe >= me + Ct;) pe -= Ct; else if (pe < me) for (; pe <= ye - Ct;) pe += Ct } : function () { pe = Math.max(me, Math.min(ye, pe)) }, Sn = at ? function () { var t, e, n, i, a, r, o, u, l, s, c; Ni(yt, ""), Y || !jt ? (Hi(), jt && E(yt) || Pi()) : (t = yt, e = ce, n = fe, i = de, a = Oi(), r = jt, o = Pi, u = Math.min(r, 10), l = a.indexOf("%") >= 0 ? "%" : "px", a = a.replace(l, ""), s = Number(t.style[e].replace(n, "").replace(i, "").replace(l, "")), c = (a - s) / r * u, setTimeout(function a() { r -= u, s += c, t.style[e] = n + s + l + i, r > 0 ? setTimeout(a, u) : o() }, u)), pt || ea() } : function () { ae = []; var t = {}; t[_] = t[Z] = Pi, H(bt[he], t), D(bt[pe], t), ki(he, lt, st, !0), ki(pe, ft, lt), _ && Z && jt && E(yt) || Pi() }; return { version: "2.8.8", getInfo: aa, events: Me, goTo: Wi, play: function () { _t && !hn && (Qi(), yn = !1) }, pause: function () { hn && (Vi(), yn = !0) }, isOn: Mt, updateSliderHeight: Ci, refresh: Kn, destroy: function () { if (ne.disabled = !0, ne.ownerNode && ne.ownerNode.remove(), H(l, { resize: $n }), qt && H(n, Re), Je && H(Je, Oe), an && H(an, De), H(yt, He), H(yt, ke), bn && H(bn, { click: Gi }), _t && clearInterval(pn), at && _) { var e = {}; e[_] = Pi, H(yt, e) } Ut && H(yt, Ie), Jt && H(yt, Pe); var i = [xt, _e, tn, en, rn, Cn]; tt.forEach(function (e, n) { var a = "container" === e ? ht : t[e]; if ("object" == typeof a) { var r = !!a.previousElementSibling && a.previousElementSibling, o = a.parentNode; a.outerHTML = i[n], t[e] = r ? r.nextElementSibling : o.firstElementChild } }), tt = lt = st = ct = ft = pt = ht = mt = yt = gt = xt = bt = Ct = vt = wt = Dt = Ht = kt = Rt = It = Wt = zt = Ft = qt = jt = Qt = Vt = Gt = ne = ie = Tt = ae = re = oe = ue = le = se = ce = fe = de = ve = pe = he = me = ye = xe = be = Ce = we = Me = Te = Ae = Ee = Be = Le = Ne = Se = Oe = De = He = ke = Re = Ie = Pe = We = ze = Fe = qe = je = Qe = Ve = Ge = Xe = At = Xt = Yt = Je = _e = Ze = $e = Ke = Ue = Kt = an = rn = nn = on = un = ln = sn = cn = fn = dn = vn = _t = Zt = xn = $t = te = bn = Cn = ee = wn = pn = hn = mn = yn = gn = An = En = Mn = Bn = Tn = Ln = Ut = Jt = null; for (var a in this) "rebuild" !== a && (this[a] = null); Mt = !1 }, rebuild: function () { return k(a(t, et)) } } } function On(t) { t && (Xt = Kt = Ut = Jt = qt = _t = te = ee = !1) } function Dn() { for (var t = at ? pe - re : pe; t < 0;) t += Ct; return t % Ct + 1 } function Hn(t) { return t = t ? Math.max(0, Math.min(Vt ? Ct - 1 : Ct - Wt, t)) : 0, at ? t + re : t } function kn(t) { for (null == t && (t = pe), at && (t -= re) ; t < 0;) t += Ct; return Math.floor(t % Ct) } function Rn() { var t = kn(); return Fe ? t : Math.ceil((t + 1) * on / Ct - 1) } function In() { return l.innerWidth || n.documentElement.clientWidth || n.body.clientWidth } function Pn(t) { return "top" === t ? "afterbegin" : "beforeend" } function Wn() { var t = kt ? 2 * kt - Rt : 0; return function t(e) { var i, a, r = n.createElement("div"); return e.appendChild(r), a = (i = r.getBoundingClientRect()).right - i.left, r.remove(), a || t(e.parentNode) }(gt) - t } function zn(e) { if (t[e]) return !0; if (nt) for (var n in nt) if (nt[n][e]) return !0; return !1 } function Fn(e, n) { if (null == n && (n = wt), "items" === e && Ht) return Math.floor((It + Rt) / (Ht + Rt)) || 1; var i = t[e]; if (nt) for (var a in nt) n >= parseInt(a) && e in nt[a] && (i = nt[a][e]); return "slideBy" === e && "page" === i && (i = Fn("items")), at || "slideBy" !== e && "items" !== e || (i = Math.floor(i)), i } function qn(t, e, n, i, a) { var r = ""; if (void 0 !== t) { var o = t; e && (o -= e), r = pt ? "margin: 0 " + o + "px 0 " + t + "px;" : "margin: " + t + "px 0 " + o + "px 0;" } else if (e && !n) { var u = "-" + e + "px"; r = "margin: 0 " + (pt ? u + " 0 0" : "0 " + u + " 0") + ";" } return !at && a && Y && i && (r += Xn(i)), r } function jn(t, e, n) { return t ? (t + e) * oe + "px" : j ? j + "(" + 100 * oe + "% / " + n + ")" : 100 * oe / n + "%" } function Qn(t, e, n) { var i; if (t) i = t + e + "px"; else { at || (n = Math.floor(n)); var a = at ? oe : n; i = j ? j + "(100% / " + a + ")" : 100 / a + "%" } return i = "width:" + i, "inner" !== it ? i + ";" : i + " !important;" } function Vn(t) { var e = ""; !1 !== t && (e = (pt ? "padding-" : "margin-") + (pt ? "right" : "bottom") + ": " + t + "px;"); return e } function Gn(t, e) { var n = t.substring(0, t.length - e).toLowerCase(); return n && (n = "-" + n + "-"), n } function Xn(t) { return Gn(Y, 18) + "transition-duration:" + t / 1e3 + "s;" } function Yn(t) { return Gn(U, 17) + "animation-duration:" + t / 1e3 + "s;" } function Kn() { if (zn("autoHeight") || Dt || !pt) { var t = yt.querySelectorAll("img"); v(t, function (t) { var e = t.src; e.indexOf("data:image") < 0 ? (D(t, Xe), t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", t.src = e, m(t, "loading"), pi(t)) : ie || fi(t) }), e(function () { yi(M(t), function () { At = !0 }) }), !Dt && pt && (t = hi(pe, Math.min(pe + Wt - 1, oe - 1))), ie ? Un() : e(function () { yi(M(t), Un) }) } else at && Di(), _n(), Zn() } function Un() { if (Dt) { var t = Vt ? pe : Ct - 1; !function e() { bt[t - 1].getBoundingClientRect().right.toFixed(2) === bt[t].getBoundingClientRect().left.toFixed(2) ? Jn() : setTimeout(function () { e() }, 16) }() } else Jn() } function Jn() { pt && !Dt || (wi(), Dt ? (le = Si(), Le && (Ne = ei()), ye = ve(), On(Ee || Ne)) : ea()), at && Di(), _n(), Zn() } function _n() { if (Mi(), ht.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + li() + "</span>  of " + Ct + "</div>"), Et = ht.querySelector(".tns-liveregion .current"), qe) { var e = _t ? "stop" : "start"; bn ? C(bn, { "data-action": e }) : t.autoplayButtonOutput && (ht.insertAdjacentHTML(Pn(t.autoplayPosition), '<button data-action="' + e + '">' + wn[0] + e + wn[1] + $t[0] + "</button>"), bn = ht.querySelector("[data-action]")), bn && D(bn, { click: Gi }), _t && (Qi(), te && D(yt, He), ee && D(yt, ke)) } if (ze) { if (an) C(an, { "aria-label": "Carousel Pagination" }), v(nn = an.children, function (t, e) { C(t, { "data-nav": e, tabindex: "-1", "aria-label": dn + (e + 1), "aria-controls": Ae }) }); else { for (var n = "", i = Fe ? "" : 'style="display:none"', a = 0; a < Ct; a++) n += '<button data-nav="' + a + '" tabindex="-1" aria-controls="' + Ae + '" ' + i + ' aria-label="' + dn + (a + 1) + '"></button>'; n = '<div class="tns-nav" aria-label="Carousel Pagination">' + n + "</div>", ht.insertAdjacentHTML(Pn(t.navPosition), n), an = ht.querySelector(".tns-nav"), nn = an.children } if (ia(), Y) { var r = Y.substring(0, Y.length - 18).toLowerCase(), o = "transition: all " + jt / 1e3 + "s"; r && (o = "-" + r + "-" + o), f(ne, "[aria-controls^=" + Ae + "-item]", o, d(ne)) } C(nn[sn], { "aria-label": dn + (sn + 1) + vn }), w(nn[sn], "tabindex"), m(nn[sn], fn), D(an, De) } We && (Je || Ze && $e || (ht.insertAdjacentHTML(Pn(t.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + Ae + '">' + Yt[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + Ae + '">' + Yt[1] + "</button></div>"), Je = ht.querySelector(".tns-controls")), Ze && $e || (Ze = Je.children[0], $e = Je.children[1]), t.controlsContainer && C(Je, { "aria-label": "Carousel Navigation", tabindex: "0" }), (t.controlsContainer || t.prevButton && t.nextButton) && C([Ze, $e], { "aria-controls": Ae, tabindex: "-1" }), (t.controlsContainer || t.prevButton && t.nextButton) && (C(Ze, { "data-controls": "prev" }), C($e, { "data-controls": "next" })), Ke = Ai(Ze), Ue = Ai($e), Li(), Je ? D(Je, Oe) : (D(Ze, Oe), D($e, Oe))), ii() } function Zn() { if (at && _) { var e = {}; e[_] = Pi, D(yt, e) } Ut && D(yt, Ie, t.preventScrollOnTouch), Jt && D(yt, Pe), qt && D(n, Re), "inner" === it ? Me.on("outerResized", function () { ti(), Me.emit("innerLoaded", aa()) }) : (nt || Ht || Dt || Gt || !pt) && D(l, { resize: $n }), Gt && ("outer" === it ? Me.on("innerLoaded", mi) : Ee || mi()), ci(), Ee ? oi() : Ne && ri(), Me.on("indexChanged", gi), "inner" === it && Me.emit("innerLoaded", aa()), "function" == typeof we && we(aa()), Mt = !0 } function $n(t) { e(function () { ti(Yi(t)) }) } function ti(e) { if (Mt) { "outer" === it && Me.emit("outerResized", aa(e)), wt = In(); var i, a = vt, r = !1; nt && (ni(), (i = a !== vt) && Me.emit("newBreakpointStart", aa(e))); var o, u, l, s, c = Wt, p = Ee, h = Ne, g = qt, x = Xt, b = Kt, C = Ut, w = Jt, M = _t, E = te, B = ee, L = pe; if (i) { var N = Ht, S = Gt, O = Yt, k = Pt, R = $t; if (!V) var I = Rt, P = kt } if (qt = Fn("arrowKeys"), Xt = Fn("controls"), Kt = Fn("nav"), Ut = Fn("touch"), Pt = Fn("center"), Jt = Fn("mouseDrag"), _t = Fn("autoplay"), te = Fn("autoplayHoverPause"), ee = Fn("autoplayResetOnVisibility"), i && (Ee = Fn("disable"), Ht = Fn("fixedWidth"), jt = Fn("speed"), Gt = Fn("autoHeight"), Yt = Fn("controlsText"), $t = Fn("autoplayText"), Zt = Fn("autoplayTimeout"), V || (kt = Fn("edgePadding"), Rt = Fn("gutter"))), On(Ee), It = Wn(), pt && !Dt || Ee || (wi(), pt || (ea(), r = !0)), (Ht || Dt) && (le = Si(), ye = ve()), (i || Ht) && (Wt = Fn("items"), zt = Fn("slideBy"), (u = Wt !== c) && (Ht || Dt || (ye = ve()), Nn())), i && Ee !== p && (Ee ? oi() : function () { if (!Be) return; if (ne.disabled = !1, yt.className += Te, Di(), Vt) for (var t = re; t--;) at && A(bt[t]), A(bt[oe - t - 1]); if (!at) for (var e = pe, n = pe + Ct; e < n; e++) { var i = bt[e], a = e < pe + Wt ? lt : ft; i.style.left = 100 * (e - pe) / Wt + "%", m(i, a) } ai(), Be = !1 }()), Le && (i || Ht || Dt) && (Ne = ei()) !== h && (Ne ? (Hi(Oi(Hn(0))), ri()) : (!function () { if (!Se) return; kt && V && (mt.style.margin = ""); if (re) for (var t = "tns-transparent", e = re; e--;) at && y(bt[e], t), y(bt[oe - e - 1], t); ai(), Se = !1 }(), r = !0)), On(Ee || Ne), _t || (te = ee = !1), qt !== g && (qt ? D(n, Re) : H(n, Re)), Xt !== x && (Xt ? Je ? A(Je) : (Ze && A(Ze), $e && A($e)) : Je ? T(Je) : (Ze && T(Ze), $e && T($e))), Kt !== b && (Kt ? A(an) : T(an)), Ut !== C && (Ut ? D(yt, Ie, t.preventScrollOnTouch) : H(yt, Ie)), Jt !== w && (Jt ? D(yt, Pe) : H(yt, Pe)), _t !== M && (_t ? (bn && A(bn), hn || yn || Qi()) : (bn && T(bn), hn && Vi())), te !== E && (te ? D(yt, He) : H(yt, He)), ee !== B && (ee ? D(n, ke) : H(n, ke)), i) { if (Ht === N && Pt === k || (r = !0), Gt !== S && (Gt || (mt.style.height = "")), Xt && Yt !== O && (Ze.innerHTML = Yt[0], $e.innerHTML = Yt[1]), bn && $t !== R) { var W = _t ? 1 : 0, z = bn.innerHTML, F = z.length - R[W].length; z.substring(F) === R[W] && (bn.innerHTML = z.substring(0, F) + $t[W]) } } else Pt && (Ht || Dt) && (r = !0); if ((u || Ht && !Dt) && (on = na(), ia()), (o = pe !== L) ? (Me.emit("indexChanged", aa()), r = !0) : u ? o || gi() : (Ht || Dt) && (ci(), Mi(), ui()), !u && at || function () { for (var t = pe + Math.min(Ct, Wt), e = oe; e--;) { var n = bt[e]; e >= pe && e < t ? (m(n, "tns-moving"), n.style.left = 100 * (e - pe) / Wt + "%", m(n, lt), y(n, ft)) : n.style.left && (n.style.left = "", m(n, ft), y(n, lt)), y(n, st) } setTimeout(function () { v(bt, function (t) { y(t, "tns-moving") }) }, 300) }(), !Ee && !Ne) { if (i && !V && (Gt === autoheightTem && jt === speedTem || xi(), kt === P && Rt === I || (mt.style.cssText = qn(kt, Rt, Ht, jt, Gt)), pt)) { at && (yt.style.width = jn(Ht, Rt, Wt)); var q = Qn(Ht, Rt, Wt) + Vn(Rt); l = ne, s = d(ne) - 1, "deleteRule" in l ? l.deleteRule(s) : l.removeRule(s), f(ne, "#" + Ae + " > .tns-item", q, d(ne)) } Gt && mi(), r && (Di(), he = pe) } i && Me.emit("newBreakpointEnd", aa(e)) } } function ei() { if (!Ht && !Dt) return Ct <= (Pt ? Wt - (Wt - 1) / 2 : Wt); var t = Ht ? (Ht + Rt) * Ct : Tt[Ct], e = kt ? It + 2 * kt : It + Rt; return Pt && (e -= Ht ? (It - Ht) / 2 : (It - (Tt[pe + 1] - Tt[pe] - Rt)) / 2), t <= e } function ni() { vt = 0; for (var t in nt) t = parseInt(t), wt >= t && (vt = t) } function ii() { !_t && bn && T(bn), !Kt && an && T(an), Xt || (Je ? T(Je) : (Ze && T(Ze), $e && T($e))) } function ai() { _t && bn && A(bn), Kt && an && A(an), Xt && (Je ? A(Je) : (Ze && A(Ze), $e && A($e))) } function ri() { if (!Se) { if (kt && (mt.style.margin = "0px"), re) for (var t = "tns-transparent", e = re; e--;) at && m(bt[e], t), m(bt[oe - e - 1], t); ii(), Se = !0 } } function oi() { if (!Be) { if (ne.disabled = !0, yt.className = yt.className.replace(Te.substring(1), ""), w(yt, ["style"]), Vt) for (var t = re; t--;) at && T(bt[t]), T(bt[oe - t - 1]); if (pt && at || w(mt, ["style"]), !at) for (var e = pe, n = pe + Ct; e < n; e++) { var i = bt[e]; w(i, ["style"]), y(i, lt), y(i, ft) } ii(), Be = !0 } } function ui() { var t = li(); Et.innerHTML !== t && (Et.innerHTML = t) } function li() { var t = si(), e = t[0] + 1, n = t[1] + 1; return e === n ? e + "" : e + " to " + n } function si(t) { null == t && (t = Oi()); var e, n, i, a = pe; if (Pt || kt ? (Dt || Ht) && (n = -(parseFloat(t) + kt), i = n + It + 2 * kt) : Dt && (n = Tt[pe], i = n + It), Dt) Tt.forEach(function (t, r) { r < oe && ((Pt || kt) && t <= n + .5 && (a = r), i - t >= .5 && (e = r)) }); else { if (Ht) { var r = Ht + Rt; Pt || kt ? (a = Math.floor(n / r), e = Math.ceil(i / r - 1)) : e = a + Math.ceil(It / r) - 1 } else if (Pt || kt) { var o = Wt - 1; if (Pt ? (a -= o / 2, e = pe + o / 2) : e = pe + o, kt) { var u = kt * Wt / It; a -= u, e += u } a = Math.floor(a), e = Math.ceil(e) } else e = a + Wt - 1; a = Math.max(a, 0), e = Math.min(e, oe - 1) } return [a, e] } function ci() { ie && !Ee && hi.apply(null, si()).forEach(function (t) { if (!h(t, Ge)) { var e = {}; e[_] = function (t) { t.stopPropagation() }, D(t, e), D(t, Xe); var n = x(t, "data-srcset"); n && (t.srcset = n), t.src = x(t, "data-src"), m(t, "loading"), pi(t) } }) } function fi(t) { m(t, "loaded"), vi(t) } function di(t) { m(t, "failed"), vi(t) } function vi(t) { m(t, "tns-complete"), y(t, "loading"), H(t, Xe) } function pi(t) { t.complete && (0 !== t.naturalWidth ? fi(t) : di(t)) } function hi(t, e) { for (var n = []; t <= e;) v(bt[t].querySelectorAll("img"), function (t) { n.push(t) }), t++; return n } function mi() { var t = hi.apply(null, si()); e(function () { yi(t, Ci) }) } function yi(t, n) { return At ? n() : (t.forEach(function (e, n) { h(e, Ge) && t.splice(n, 1) }), t.length ? void e(function () { yi(t, n) }) : n()) } function gi() { ci(), Mi(), ui(), Li(), function () { if (Kt && (sn = ln >= 0 ? ln : Rn(), ln = -1, sn !== cn)) { var t = nn[cn], e = nn[sn]; C(t, { tabindex: "-1", "aria-label": dn + (cn + 1) }), y(t, fn), C(e, { "aria-label": dn + (sn + 1) + vn }), w(e, "tabindex"), m(e, fn), cn = sn } }() } function xi() { at && Gt && (dt.style[Y] = jt / 1e3 + "s") } function bi(t, e) { for (var n = [], i = t, a = Math.min(t + e, oe) ; i < a; i++) n.push(bt[i].offsetHeight); return Math.max.apply(null, n) } function Ci() { var t = Gt ? bi(pe, Wt) : bi(re, Ct), e = dt || mt; e.style.height !== t && (e.style.height = t + "px") } function wi() { Tt = [0]; var t = pt ? "left" : "top", e = pt ? "right" : "bottom", n = bt[0].getBoundingClientRect()[t]; v(bt, function (i, a) { a && Tt.push(i.getBoundingClientRect()[t] - n), a === oe - 1 && Tt.push(i.getBoundingClientRect()[e] - n) }) } function Mi() { var t = si(), e = t[0], n = t[1]; v(bt, function (t, i) { i >= e && i <= n ? g(t, "aria-hidden") && (w(t, ["aria-hidden", "tabindex"]), m(t, Ve)) : g(t, "aria-hidden") || (C(t, { "aria-hidden": "true", tabindex: "-1" }), y(t, Ve)) }) } function Ti(t) { return t.nodeName.toLowerCase() } function Ai(t) { return "button" === Ti(t) } function Ei(t) { return "true" === t.getAttribute("aria-disabled") } function Bi(t, e, n) { t ? e.disabled = n : e.setAttribute("aria-disabled", n.toString()) } function Li() { if (Xt && !Qt && !Vt) { var t = Ke ? Ze.disabled : Ei(Ze), e = Ue ? $e.disabled : Ei($e), n = pe <= me, i = !Qt && pe >= ye; n && !t && Bi(Ke, Ze, !0), !n && t && Bi(Ke, Ze, !1), i && !e && Bi(Ue, $e, !0), !i && e && Bi(Ue, $e, !1) } } function Ni(t, e) { Y && (t.style[Y] = e) } function Si() { var t = kt ? 0 : Rt, e = It + t - (Ht ? (Ht + Rt) * oe : Tt[oe]); return Pt && !Vt && (e = Ht ? e - (It - Ht) / 2 : e - (It - (Tt[oe] - Tt[oe - 1] - t)) / 2), e > 0 && (e = 0), e } function Oi(t) { var e; if (null == t && (t = pe), pt && !Dt) Ht ? (e = -(Ht + Rt) * t, Pt && (e += (It - Ht) / 2)) : (Pt && (t -= (Wt - 1) / 2), e = 100 * -t / (G ? oe : Wt)); else if (e = -Tt[t], Pt && Dt) { var n = kt ? 0 : Rt; e += (It - (Tt[t + 1] - Tt[t] - n)) / 2 } return ue && (e = Math.max(e, le)), e += !pt || Dt || Ht ? "px" : "%" } function Di(t) { Ni(yt, "0s"), Hi(t) } function Hi(t) { null == t && (t = Oi()), yt.style[ce] = fe + t + de } function ki(t, e, n, i) { var a = t + Wt; Vt || (a = Math.min(a, oe)); for (var r = t; r < a; r++) { var o = bt[r]; i || (o.style.left = 100 * (r - pe) / Wt + "%"), ct && K && (o.style[K] = o.style[J] = ct * (r - t) / 1e3 + "s"), y(o, e), m(o, n), i && ae.push(o) } } function Ri(t, e) { se && Nn(), (pe !== he || e) && (Me.emit("indexChanged", aa()), Me.emit("transitionStart", aa()), Gt && mi(), hn && t && ["click", "keydown"].indexOf(t.type) >= 0 && Vi(), Ce = !0, Sn()) } function Ii(t) { return t.toLowerCase().replace(/-/g, "") } function Pi(t) { if (at || Ce) { if (Me.emit("transitionEnd", aa(t)), !at && ae.length > 0) for (var e = 0; e < ae.length; e++) { var n = ae[e]; n.style.left = "", J && K && (n.style[J] = "", n.style[K] = ""), y(n, st), m(n, ft) } if (!t || !at && t.target.parentNode === yt || t.target === yt && Ii(t.propertyName) === Ii(ce)) { if (!se) { var i = pe; Nn(), pe !== i && (Me.emit("indexChanged", aa()), Di()) } "inner" === it && Me.emit("innerLoaded", aa()), Ce = !1, he = pe } } } function Wi(t, e) { if (!Ne) if ("prev" === t) zi(e, -1); else if ("next" === t) zi(e, 1); else { if (Ce) { if (ge) return; Pi() } var n = kn(), i = 0; if ("first" === t ? i = -n : "last" === t ? i = at ? Ct - Wt - n : Ct - 1 - n : ("number" != typeof t && (t = parseInt(t)), isNaN(t) || (e || (t = Math.max(0, Math.min(Ct - 1, t))), i = t - n)), !at && i && Math.abs(i) < Wt) { var a = i > 0 ? 1 : -1; i += pe + i - Ct >= me ? Ct * a : 2 * Ct * a * -1 } pe += i, at && Vt && (pe < me && (pe += Ct), pe > ye && (pe -= Ct)), kn(pe) !== kn(he) && Ri(e) } } function zi(t, e) { if (Ce) { if (ge) return; Pi() } var n; if (!e) { for (var i = Ki(t = Yi(t)) ; i !== Je && [Ze, $e].indexOf(i) < 0;) i = i.parentNode; var a = [Ze, $e].indexOf(i); a >= 0 && (n = !0, e = 0 === a ? -1 : 1) } if (Qt) { if (pe === me && -1 === e) return void Wi("last", t); if (pe === ye && 1 === e) return void Wi("first", t) } e && (pe += zt * e, Dt && (pe = Math.floor(pe)), Ri(n || t && "keydown" === t.type ? t : null)) } function Fi() { pn = setInterval(function () { zi(null, xn) }, Zt), hn = !0 } function qi() { clearInterval(pn), hn = !1 } function ji(t, e) { C(bn, { "data-action": t }), bn.innerHTML = wn[0] + t + wn[1] + e } function Qi() { Fi(), bn && ji("stop", $t[1]) } function Vi() { qi(), bn && ji("start", $t[0]) } function Gi() { hn ? (Vi(), yn = !0) : (Qi(), yn = !1) } function Xi(t) { t.focus() } function Yi(t) { return Ui(t = t || l.event) ? t.changedTouches[0] : t } function Ki(t) { return t.target || l.event.srcElement } function Ui(t) { return t.type.indexOf("touch") >= 0 } function Ji(t) { t.preventDefault ? t.preventDefault() : t.returnValue = !1 } function _i() { return r = En.y - An.y, o = En.x - An.x, e = Math.atan2(r, o) * (180 / Math.PI), n = xe, i = !1, (a = Math.abs(90 - Math.abs(e))) >= 90 - n ? i = "horizontal" : a <= n && (i = "vertical"), i === t.axis; var e, n, i, a, r, o } function Zi(t) { if (Ce) { if (ge) return; Pi() } _t && hn && qi(), Bn = !0, Tn && (i(Tn), Tn = null); var e = Yi(t); Me.emit(Ui(t) ? "touchStart" : "dragStart", aa(t)), !Ui(t) && ["img", "a"].indexOf(Ti(Ki(t))) >= 0 && Ji(t), En.x = An.x = e.clientX, En.y = An.y = e.clientY, at && (Mn = parseFloat(yt.style[ce].replace(fe, "")), Ni(yt, "0s")) } function $i(t) { if (Bn) { var n = Yi(t); En.x = n.clientX, En.y = n.clientY, at ? Tn || (Tn = e(function () { !function t(n) { if (!be) return void (Bn = !1); i(Tn); Bn && (Tn = e(function () { t(n) })); "?" === be && (be = _i()); if (be) { !Ye && Ui(n) && (Ye = !0); try { n.type && Me.emit(Ui(n) ? "touchMove" : "dragMove", aa(n)) } catch (t) { } var a = Mn, r = Ln(En, An); if (!pt || Ht || Dt) a += r, a += "px"; else { var o = G ? r * Wt * 100 / ((It + Rt) * oe) : 100 * r / (It + Rt); a += o, a += "%" } yt.style[ce] = fe + a + de } }(t) })) : ("?" === be && (be = _i()), be && (Ye = !0)), Ye && t.preventDefault() } } function ta(n) { if (Bn) { Tn && (i(Tn), Tn = null), at && Ni(yt, ""), Bn = !1; var a = Yi(n); En.x = a.clientX, En.y = a.clientY; var r = Ln(En, An); if (Math.abs(r)) { if (!Ui(n)) { var o = Ki(n); D(o, { click: function t(e) { Ji(e), H(o, { click: t }) } }) } at ? Tn = e(function () { if (pt && !Dt) { var t = -r * Wt / (It + Rt); t = r > 0 ? Math.floor(t) : Math.ceil(t), pe += t } else { var e = -(Mn + r); if (e <= 0) pe = me; else if (e >= Tt[oe - 1]) pe = ye; else for (var i = 0; i < oe && e >= Tt[i];) pe = i, e > Tt[i] && r < 0 && (pe += 1), i++ } Ri(n, r), Me.emit(Ui(n) ? "touchEnd" : "dragEnd", aa(n)) }) : be && zi(n, r > 0 ? -1 : 1) } } "auto" === t.preventScrollOnTouch && (Ye = !1), xe && (be = "?"), _t && !hn && Fi() } function ea() { (dt || mt).style.height = Tt[pe + Wt] - Tt[pe] + "px" } function na() { var t = Ht ? (Ht + Rt) * Ct / It : Ct / Wt; return Math.min(Math.ceil(t), Ct) } function ia() { if (Kt && !Fe && on !== un) { var t = un, e = on, n = A; for (un > on && (t = on, e = un, n = T) ; t < e;) n(nn[t]), t++; un = on } } function aa(t) { return { container: yt, slideItems: bt, navContainer: an, navItems: nn, controlsContainer: Je, hasControls: We, prevButton: Ze, nextButton: $e, items: Wt, slideBy: zt, cloneCount: re, slideCount: Ct, slideCountNew: oe, index: pe, indexCached: he, displayIndex: Dn(), navCurrentIndex: sn, navCurrentIndexCached: cn, pages: on, pagesCached: un, sheet: ne, isOn: Mt, event: t || {} } } $ && console.warn("No slides found in", t.container) }; return k }();

/*
  Navigation
*/
var stickyNav = (function () {
    'use strict';

    var body, nav, navContainer, navOffHeight, mainContent,
        raf = window.requestAnimationFrame;

    var toggleStickyNav = function () {
        var pageY = window.scrollY || window.pageYOffset,
            body = document.body;
        if (pageY > navOffHeight + 300) {
            body.classList.add('nav-stuck');
            body.classList.remove('nav-top');
            navContainer.classList.add('slideDown');
            navContainer.parentElement.style.height = navContainer.offsetHeight + 'px';
            return;
        }

        if (pageY == 0) {
            navContainer.classList.remove('slideDown');
            body.classList.remove('nav-stuck');
            body.classList.add('nav-top');
            navContainer.parentElement.style.height = null;
            return;
        }
    },
    enableScrollEvent = function () {
        window.addEventListener('scroll', function (e) {
            raf(toggleStickyNav);
        });
    };

    var enable = function () {
        nav = document.querySelector('#main-header.nav--sticky');
        mainContent = document.querySelector('main');

        if (!nav) return;
        navContainer = nav.querySelector('.nav__container');
        navOffHeight = navContainer.offsetHeight;

        enableScrollEvent();
    };

    return { enable: enable };
})();

var revealBackToTop = (function () {
    'use strict';
    var scroll = window.requestAnimationFrame;

    var toggleBackToTop = function () {
        var pageY = window.scrollY || window.pageYOffset,
            $backTopElem = document.getElementById("back-to-top");

        // Show Back to Top
        if (pageY > 300) {
            $backTopElem.classList.add('is-visible');
            return;
        }
        // Hide Back to Top
        else {
            $backTopElem.classList.remove('is-visible');
            return;
        }
    },
    enableScrollEvent = function () {
        window.addEventListener('scroll', function (e) {
            scroll(toggleBackToTop);
        });
    };

    var enable = function () {
        enableScrollEvent();
    };

    return { enable: enable };
})();


/**
* Accordion - v1.0
* Summary: Vanilla JS extends Boostrap UI Component's HTML/CSS to add functionality
* (c) Infragistics
*
* Public Function: Init
* @param {Object}  el                         Selected Accordion element to initialize Functionality
* @param {Boolean} [allowMultiOpen = false]   Allow multiple panels to be open at same time or only have one at a time.
*
* @return {type} return is not essential to function
*
* @example
*     accordion.init(document.querySelect('#id'), false);
*/
var accordion = (function() {
  'use strict';
  var $accordion, _allowMultiOpen;

  function _enableAccordionEvents() {
    $accordion.addEventListener('click', function (e) {
        _allowMultiOpen = (e.target.closest('.accordion').getAttribute('data-accordion-multiopen')) ? e.target.closest('.accordion').getAttribute('data-accordion-multiopen') === "true" : false;;
        if (!e.target.matches(' .accordion-button')) return;
        else {
            // Get Accordion Panel associated with clicked item
            var $curAccordionPanel = e.target.closest('.accordion-item').querySelector('.accordion-collapse');
            if(!$curAccordionPanel.classList.contains('show')){
                if(_allowMultiOpen==true){
                    var elementList = e.target.closest('.accordion').querySelectorAll(' .accordion-item');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.querySelector('.accordion-collapse').classList.remove('show');
                        e.querySelector('.accordion-button').classList.add('collapsed');
                        e.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
                    });
                }
                e.target.classList.remove('collapsed');
                e.target.setAttribute('aria-expanded', 'true')
                $curAccordionPanel.classList.add('show');
            } else{
                e.target.classList.add('collapsed');
                e.target.setAttribute('aria-expanded', 'false')
                $curAccordionPanel.classList.remove('show');
            }
        }
    });
  }

  function init(el, allowMultiOpen) {
    $accordion = el;
    _allowMultiOpen = allowMultiOpen || false;

    _enableAccordionEvents();
  }

  return {
    init: init
  }
})();

/*!
  Replace Videos - v0.1
  (c) Infragistics
*/
var replaceVideos = (function(){
  'use strict';
  var enableReplaceVideoEvents = function(e) {
    e.preventDefault();

    var videoContainer = this.querySelector('video');
    videoContainer.pause();
    if (videoContainer) {
      var src = {
        mp4: videoContainer.querySelector('source[type*="mp4"]'),
        webm: videoContainer.querySelector('source[type*="webm"]')
      },
      attrs = {
        mp4: this.dataset.videoMp4,
        webm: this.dataset.videoWebm,
        poster: this.dataset.videoPoster,
        attributes: this.dataset.videoAttrs
      }
      // Check and video sources
      if (src.mp4 && attrs.mp4) {
        src.mp4.setAttribute('src', attrs.mp4);
      }
      if (src.webm && attrs.webm) {
        src.webm.setAttribute('src', attrs.webm);
      }
      if (attrs.poster) {
        videoContainer.setAttribute('poster', attrs.poster);
        if(videoContainer.querySelector('.fallback')) {
          videoContainer.querySelector('.fallback').src = attrs.poster;
        }
      }
      if (this.dataset.removeSelector) {
        if(this.querySelector(this.dataset.removeSelector)) { this.querySelector(this.dataset.removeSelector).remove(); }
      }
      // Remove Video Attributes
      videoContainer.removeAttribute('playsinline');
      videoContainer.removeAttribute('muted');
      videoContainer.removeAttribute('autoplay');
      videoContainer.removeAttribute('loop');
      videoContainer.load();
      videoContainer.muted = !videoContainer.muted;
      if (attrs.attributes) {
        var list = attrs.attributes.split(',');
        for (var a = 0; a < list.length; a++) {
          videoContainer.setAttribute(list[a], '');
        }
      }

      this.removeEventListener('click', enableReplaceVideoEvents);
    } else {
      this.removeEventListener('click',enableReplaceVideoEvents);
      console.error('No video element');
    }
  };

  var init = function() {
    var videosToReplace = document.querySelectorAll('.vid-replace');
    for (var i = 0; i < videosToReplace.length; i++) {
      videosToReplace[i].addEventListener('click', enableReplaceVideoEvents);
    }
  }

  return {
    init: init
  };
})();

/*!
  Custom Video Modal - v0.1
  (c) Infragistics
*/
var videoModal = (function () {
    var modalBox = [];

    function _playVid(url) {
        if (url.indexOf('youtube') !== -1) {
            var regExp = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
            parseUrl = url.match(regExp);
            modalBox.popCode = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + parseUrl[2] + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            _createModal(modalBox.popCode);
        } else if (url.indexOf('vimeo') !== -1) {
            var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
            parseUrl = url.match(regExp);
            modalBox.popCode = '<iframe src="https://player.vimeo.com/video/' + parseUrl[5] + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            _createModal(modalBox.popCode);
        }
    }
    function _createModal(code) {
        var elemDivWrap = document.createElement('div'),
            elemDivVid = document.createElement('div'),
            elemDivVidClose = document.createElement('div'),
            elemCover = document.createElement('div'),
            body = document.body;

        elemDivWrap.id = 'modal__pop';
        elemDivVidClose.id = 'modal__pop-close';
        elemDivVid.className = 'modal__content-wrap';
        elemCover.id = 'modal__cover';

        elemDivVid.innerHTML = code;
        elemDivWrap.innerHTML = elemDivVidClose.outerHTML + elemDivVid.outerHTML;
        elemCover.innerHTML = elemDivWrap.outerHTML;

        body.classList.add('overflow-hidden');
        body.classList.add('igModal-enabled');

        document.body.appendChild(elemCover);

        elemCover.onclick = function () {
            this.parentNode.removeChild(this);
            body.classList.remove('overflow-hidden');
            body.classList.remove('igModal-enabled');
        }

        elemDivWrap.style.top = window.scrollY + 35 + 'px';
    }

    var init = function () {
        if (document.querySelector('.modal-video') !== null) {
            var el = document.getElementsByClassName('modal-video');

            for (var i = 0; i < el.length; i++) {
                el[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    _playVid(this.href);
                });
            }
        }
    }

    return {
        init: init
    };
})();

/*!
  AnimateMe - v0.1
  (c) Infragistics
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.AnimateMe = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';

    function AnimateMe() {
        // Global Vars
        this.configIO = {};
        this._observer;

        // Define option defaults
        var defaults = {
            classSelector: 'animate-me',
            rootElemIO: null,
            rootMarginIO: '0px',
            thresholdIO: 0.25
        };

        // Extend Options
        this.options = _extends(defaults, arguments[0], this.configIO);
        this.configIO = {
            root: defaults.rootElemIO,
            rootMargin: defaults.rootMarginIO,
            threshold: defaults.thresholdIO
        }

        // Automatically Fire Init
        this.init();
    }

    // Private Methods
    var _setObserver = function (_this) {
        var items = document.querySelectorAll('.' + _this.options.classSelector + ":not(.animated)");
        for (var i in items) {
            if (!items.hasOwnProperty(i)) {
                continue;
            }
            _this._observer.observe(items[i]);
        }
    }
    var _addAnimationClasses = function (entry) {
        entry.target.classList.add('animated');
        entry.target.classList.add(entry.target.getAttribute('data-animation'));
    }

    // Public Methods
    AnimateMe.prototype.ioCallback = function (entries, observer) {
        var configIO = this.configIO;
        entries.forEach(function (entry) {
            // When Element is in viewport, animate it
            if (entry.isIntersecting || entry.intersectionRatio > configIO.threshold) {
                _addAnimationClasses(entry);

                // Remove Observer after animation
                observer.unobserve(entry.target);
            }
        });
    };

    AnimateMe.prototype.createObserver = function () {
        this._observer = new IntersectionObserver(this.ioCallback.bind(this), this.configIO);
        _setObserver(this);
    };

    AnimateMe.prototype.update = function () {
        _setObserver(this);
    };

    AnimateMe.prototype.init = function () {
        if (document.querySelector('.' + this.options.classSelector)) {
            this.createObserver();
        }
    };

    return AnimateMe;
});

/*!
  FilterDomContent - v0.1
  (c) Infragistics
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.FilterDomContent = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';

    function FilterDomContent() {
        // Options
        this.options = {
          type: 'show',
          tabIndex: '0',
          ariaHidden: 'false',
          hideItemsDelay: 150, // can be modified via data attribute, data-hide-items-delay -- i.e., data-hide-items-delay="150"
          containerDisplayType: 'block', // can be modified via data attribute, data-container-display-type -- i.e., data-container-display-type="block"
          showDisplayType: 'inline-block' // can be modified via data attribute, data-display-type -- i.e., data-display-type="inline-block"
        };
        this.keycode = {left: 37, right: 39};

        // Automatically Fire Init
        this.init();
    }

    var __filterItems = function (items, opts) {
      opts = opts || {};
      var options = {};
      var defaults = {
        type: 'show',
        tabIndex: '0',
        ariaHidden: 'false',
        displayType: 'inline-block'
      };

      _extends(options, defaults, opts);

      for(var item of items) {
        if(opts.type !== 'show') {
          item.style.display = 'none';
          item.style.opacity = 0;
        } else {
          item.style.display = options.displayType;
          item.style.opacity = 1;
        }
  item.setAttribute('tabindex', options.tabIndex);
        item.setAttribute('aria-hidden', options.ariaHidden);
      }
    }

    FilterDomContent.prototype = (function() {
      var _addEventListeners = function (config, _this) {
          _this.addEventListener('click', function (e) {
            e.preventDefault();
            var target = e.target;

            if (target.matches('button')) {
              __selectItem(config, target);
            }
          });
          _this.addEventListener('keydown', function (e) {
            var target = e.target;

            if (target.matches('button')) {
              var key = e.which || e.keyCode,
                  $buttons = target.parents('.filters')[0].querySelectorAll('button'),
                  numFilters = $buttons.length,
                  nextIndex, nextItem;

              if (key == config.keycode.left || key == config.keycode.right) {
                nextIndex = _index.call(this,target);
                nextIndex = key === config.keycode.left ? nextIndex - 1 : nextIndex + 1;
                nextIndex = Math.max(Math.min(nextIndex, numFilters - 1), 0);
                nextItem = _eq.call($buttons, nextIndex);
                __selectItem(config, nextItem);
              }
            }
          });
      },
      __selectItem = function(config, _this) {
          var itemSelected = new Promise(function(resolve, reject){
            resolve('item selected');
          });
          if(_this.classList.contains('btn--filter') && !_this.classList.contains('.btn--active')) {
            __deselectItem(_this);
            _this.classList.add('btn--active');
            _this.setAttribute('tabindex', '0');
            _this.setAttribute('aria-pressed', 'true');
            _this.focus();


            itemSelected.then(function(){
              __filterContent(config, _this);
            });
          }
      },
      __deselectItem = function(_this) {
          var $buttons = _this.parents('.filters')[0].querySelectorAll('.btn--filter');

          for(var button of $buttons) {
            button.classList.remove('btn--active');
            button.setAttribute('tabindex', '-1');
            button.setAttribute('aria-pressed', 'false');
          }
      },
      __filterContent = function (config, _this) {
        var filterValue = _this.dataset.filter,
            $filters = _this.parents('.filters')[0],
            $filterContainer = $filters.dataset.filterContent,
            $filterContainer = document.querySelector('.' + $filterContainer),
            $windowWidth = window.innerWidth,
            delay = $filters.dataset.hideItemsDelay || config.options.hideItemsDelay,
            displayType = $filters.dataset.displayType || config.options.showDisplayType,
            containerDisplayType = $filters.dataset.containerDisplayType || 'block';
        var filterableItems = $filterContainer.querySelectorAll('.filter__item');

        var startFilterItems = new Promise(function(resolve, reject) {
          __filterItems(filterableItems, {type:'hide', tabIndex: '-1', ariaHidden: 'true'});
          $filterContainer.style.opacity = 0;
          if (filterValue === "*") {
            __filterItems(filterableItems, {type:'show', tabIndex: '0', ariaHidden: 'false', displayType: displayType });
          } else {
            filterableItems = $filterContainer.querySelectorAll('.' + filterValue);
            __filterItems(filterableItems, {type:'show', tabIndex: '0', ariaHidden: 'false', displayType: displayType});
          }
          setTimeout(function(){
            resolve();
          }, 0);
        });
        startFilterItems.then(function() {
          _fadeIn($filterContainer, {displayType: containerDisplayType, fadeIncrement: 0.075});
        });

        // use with css style for scroll-margin-top
        if($windowWidth < 768) {
          $filterContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      init = function () {
        if (document.querySelectorAll('.filters').length > 0) {
            var filters = document.querySelectorAll('.filters[role="toolbar"]');
            for(var filter of filters) {
              _addEventListeners(this, filter);
            }
        }
      };
      return { init: init };
    })();

    return FilterDomContent;
});



/*!
  GDPR - v2.1
  (c) Infragistics
*/
(function(){
  'use strict';

  window.dataLayer = window.dataLayer || [];
  var $gdprMsg;
  var IGconsentType = localStorage.getItem('IGconsentType');

  function checkConsentGeo(){
    $gdprMsg = document.querySelector('div.consent-block[data-theme="'+IGconsentType+'"]');
    //show GDPR
    adjustGDPRMsg($gdprMsg);

    if(IGconsentType == 'basic'){
      setConsent({
        necessary: true,
        functional: true,
        analytics: true,
        advertising: true
      });
    }

  }
  
  function adjustGDPRMsg($gdprMsg){

    $gdprMsg.style.display = 'block'; //show consent container

    //Interrupt the script in case GDPR is not displayed or add listeners for position adjustment
    if(window.getComputedStyle($gdprMsg).display !== 'block'){
      return;
    }

  }

  function hideBanner() {
    $gdprMsg.style.display = 'none';
  }

  function show_consent_settings() {
    document.getElementById('consent-summary').style.display = 'none';
    document.getElementById('consent-options').style.display = 'block';
  }

  if (localStorage.getItem('IGconsentMode') === null) {

      //trigger adjustGDPRMsg to show the consent container
      window.addEventListener('load', checkConsentGeo);

      //Hide basic consent container
      document.getElementById('gdpr_accept_basic').addEventListener('click', function(e) {
        e.preventDefault();
          hideBanner();
      });
      
      //"More settings" click
      document.getElementById('gdpr_settings').addEventListener('click', function(e) {
        show_consent_settings();
      });

      document.getElementById('gdpr_accept_all_ok').addEventListener('click', function(e) {
        e.preventDefault();
          setConsent({
              necessary: true,
              functional: true,
              analytics: true,
              advertising: true
          });
          hideBanner();
      });
      document.getElementById('gdpr_accept_all').addEventListener('click', function(e) {
        e.preventDefault();
          setConsent({
              necessary: true,
              functional: true,
              analytics: true,
              advertising: true
          });
          hideBanner();
      });
      document.getElementById('gdpr_accept_selection').addEventListener('click', function(e) {
        e.preventDefault();
          setConsent({
              necessary: true,
              functional: document.getElementById('acceptFunctionalCookies').checked,
              analytics: document.getElementById('acceptAnalyticsCookies').checked,
              advertising: document.getElementById('acceptAdvertisingCookies').checked
          });
          hideBanner();
      });
      document.getElementById('gdpr_reject_all').addEventListener('click', function(e) {
        e.preventDefault();
          setConsent({
              necessary: true,
              functional: false,
              analytics: false,
              advertising: false
          });
          hideBanner();
      });
  } else {
      gtag('consent', 'update', JSON.parse( localStorage.getItem('IGconsentMode') ));

      window.dataLayer.push({
        'event': 'customConsentUpdate'
      });
  }

  function setConsent(consent) {
      const consentMode = {
          'functionality_storage': consent.necessary ? 'granted' : 'denied',
          'security_storage': consent.necessary ? 'granted' : 'denied',
          'ad_storage': consent.advertising ? 'granted' : 'denied',
          'ad_user_data': consent.advertising ? 'granted' : 'denied',
          'ad_personalization': consent.advertising ? 'granted' : 'denied',
          'analytics_storage': consent.analytics ? 'granted' : 'denied',
          'personalization_storage': consent.functional ? 'granted' : 'denied',
      };
      gtag('consent', 'update', consentMode);
      localStorage.setItem('IGconsentMode', JSON.stringify(consentMode));

      window.dataLayer.push({
        'event': 'initialCustomConsentUpdate'
      });
  }


})();

/*!
  Pricing Options - v0.1
  Functionality too apply UI events to pricing options -- see pricing page
  (c) Infragistics
*/
var pricingOptions = (function(){
  function _updateUI(e) {
    var opts = {
      value: e.target.getAttribute("value"),
      price: e.target.getAttribute("data-price"),
      url: e.target.getAttribute("data-price-url")
    },
    $pricingItem = e.target.closest(".pricing__item"), $allPricingOptions, o;

    $pricingItem.querySelector('.pricing__details .pricing__price').innerText = "$" + opts.price;
    $pricingItem.querySelector('.pricing__details .pricing__detail-value').innerText = opts.value;
    //$pricingItem.querySelector('.card .card-footer .btn').setAttribute("href", "https://account.infragistics.com/billing/buy/" + opts.url);
    $allPricingOptions = $pricingItem.querySelectorAll('.pricing__radio');
    for (o = 0; o < $allPricingOptions.length; ++o) {
      $allPricingOptions[o].setAttribute('aria-checked', "false");
    }
    e.target.closest(".pricing__radio-item").querySelector('.pricing__radio').setAttribute("aria-checked", "true");

  }
  function _addEvents(options) {
    var i;
    for (i = 0; i < options.length; ++i) {
      options[i].addEventListener("change", function (e) {
        _updateUI(e) // Pass data from the event `e` here, as needed
      });
      options[i].closest('.pricing__radio-item').querySelector('.pricing__radio').addEventListener('keyup', function(e) {
        var evt, element;
        // 13 = Enter and 32 = Spacebar
        if (e.keyCode == 13 || e.keyCode == 32) {
          e.target.closest('.pricing__radio-item').querySelector('input').checked = true;
          evt = new Event("change");
          element = e.target.closest('.pricing__radio-item').querySelector('input');
          element.dispatchEvent(evt);
        }
      });
    }
  }

  function init() {
    var pricingItems = document.querySelectorAll(".pricing__item"), i;
    if(!pricingItems) return;
    for (i = 0; i < pricingItems.length; ++i) {
      var subscribeOpts = pricingItems[i].querySelectorAll(".pricing__options input[type=radio]");
      if (subscribeOpts.length) {
        _addEvents(subscribeOpts);
      }
    }
  }

  return {
    init: init
  };

})();

/*!
  Mobile Device Display - v0.1
  Conditionally add classes to show/hide contents for specific devices
  (c) Infragistics
*/
var mobileDeviceDisplay = (function () {
    'use strict';
    var init = function () {
        var p = navigator.platform.toLowerCase();
        if (/ipad|ipod|iphone/.test(p)) {
            document.body.classList.add("device-ios");
            return;
        }
        if (/android/.test(p)) {
            document.body.classList.add("device-android");
            return;
        }
        document.body.classList.add("device");
        return;
    }
    return { init: init };
})();


/*!
  Custom Regular Modal - v0.1
  (c) Infragistics
*/
var customModal = (function () {

    function _showIgModal(target) {
      
      //Stop if tehre is no target
      if (!target) {
          console.warn("There is no target ID present, or data-targetID is empty.")
          return;
      }

        var targetElement = document.getElementById(target),
            targetParent = targetElement.parentNode,
            elemCover = document.createElement('div'),
            elemClose,
            body = document.body;
      
        //Manage aria-hidden
        if (targetElement.getAttribute('aria-hidden')) {
          targetElement.setAttribute('aria-hidden', false);
        }

        //Set close button
        if (!targetElement.querySelector("#ig-modal__pop-close")) {
            elemClose = document.createElement('div');
            elemClose.id = 'ig-modal__pop-close';
            elemClose.className = 'ig-modal-close';
            elemClose.innerHTML = '<span class="ig-modal__close">&times;</span>';
            targetElement.appendChild(elemClose);
          
        }

        elemCover.id = 'modal__cover';
        targetElement.classList.add('d-block');
        body.classList.add('overflow-hidden');
        document.body.appendChild(elemCover);
      
      
        //Check if "data-maxwidth" for managing the max-width is provided
        if (targetElement.getAttribute('data-maxwidth')) {
          targetElement.style.maxWidth = targetElement.getAttribute('data-maxwidth').toString();
        }

        elemCover.appendChild(targetElement);
        //targetElement.style.top = window.scrollY + 35 + 'px';
      
        if (elemCover) {
          elemCover.onclick = function(e) {
            //Don't trigger if click on child element
            if (e.target !== this) {return;}
            
            this.parentNode.removeChild(this);
            targetElement.classList.remove('d-block');
            body.classList.remove('overflow-hidden');
            targetParent.appendChild(targetElement);
            
            //Manage aria-hidden
            if (targetElement.getAttribute('aria-hidden')) {
              targetElement.setAttribute('aria-hidden', true);
            }
          }
        }

        if (elemClose) {
          elemClose.onclick = function() {
            document.getElementById('modal__cover').parentNode.removeChild(document.getElementById('modal__cover'));
            targetElement.classList.remove('d-block');
            body.classList.remove('overflow-hidden');
            targetParent.appendChild(targetElement);
            
            //Manage aria-hidden
            if (targetElement.getAttribute('aria-hidden')) {
              targetElement.setAttribute('aria-hidden', true);
            }
          }
        }
    }

    var init = function () {
        if (document.querySelector('.ig-show-modal') !== null) {
            var el = document.getElementsByClassName('ig-show-modal');
          
            for (var i = 0; i < el.length; i++) {
                el[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    _showIgModal(this.getAttribute('data-targetID'));
                });
            }
        }
    }

    return {
        init: init
    };
})();
