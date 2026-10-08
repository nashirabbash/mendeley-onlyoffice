/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
function c(e, t, i) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : i;
  throw new TypeError("Private element is not present on this object");
}
function et(e, t, i, n, s, r, o) {
  try {
    var l = e[r](o), h = l.value;
  } catch (f) {
    return void i(f);
  }
  l.done ? t(h) : Promise.resolve(h).then(n, s);
}
function S(e) {
  return function() {
    var t = this, i = arguments;
    return new Promise(function(n, s) {
      var r = e.apply(t, i);
      function o(h) {
        et(r, n, s, o, l, "next", h);
      }
      function l(h) {
        et(r, n, s, o, l, "throw", h);
      }
      o(void 0);
    });
  };
}
function _t(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(e, t) {
  return e.get(c(e, t));
}
function T(e, t, i) {
  _t(e, t), t.set(e, i);
}
function E(e, t, i) {
  return e.set(c(e, t), i), i;
}
function re(e, t) {
  _t(e, t), t.add(e);
}
function mt(e, t, i) {
  return (t = bt(t)) in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
function tt(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tt(Object(i), !0).forEach(function(n) {
      mt(e, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : tt(Object(i)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return e;
}
function yt(e, t) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function bt(e) {
  var t = yt(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
class ce {
  /**
   * @param {*} item 
   * @returns {SearchResultItem}
   */
  static transform(t) {
    return t.citation_key && (t.id = t.citation_key, delete t.citation_key), t.type = this._convertMendeleyTypeToCSLType(t.type), this._convertMendeleyWriter(t, "author", "authors"), this._convertMendeleyWriter(t, "editor", "editors"), this._convertMendeleyWriter(t, "collection-editor", "editors"), this._convertMendeleyWriter(t, "container-author", "editors"), this._convertMendeleyWriter(t, "collection-editor", "series_editor"), this._convertMendeleyWriter(t, "container-author", "series_editor"), this._convertMendeleyWriter(t, "translators", "translators"), this._convertMendeleyDate(t, "issued"), this._convertMendeleyDate(t, "event-date"), (t.revision || t.series_number) && (t.number = t.revision || t.series_number, delete t.revision, delete t.series_number), (t.series || t.source) && (t["container-title"] = t.series || t.source, t["collection-title"] = t.series || t.source, delete t.series), t.type == "patent" && t.source && (t.publisher = t.source), delete t.source, t.identifiers && (t.identifiers.doi && (t.DOI = t.identifiers.doi), t.identifiers.isbn && (t.ISBN = t.identifiers.isbn), t.identifiers.issn && (t.ISSN = t.identifiers.issn), t.identifiers.pmid && (t.PMID = t.identifiers.pmid), delete t.identifiers), t.keywords && (t.keyword = t.keywords.toString(), delete t.keywords), t.websites && t.websites.length > 0 && (t.URL = t.websites[0], delete t.websites), t.chapter && (t["chapter-number"] = t.chapter, delete t.chapter), t.city && (t["event-place"] = t.city, t["publisher-place"] = t.city, delete t.city), t.short_title && (t["short-title"] = t.short_title, delete t.short_title), t;
  }
  /** @param {string} str */
  static _convertMendeleyTypeToCSLType(t) {
    switch (t = t.toLowerCase(), t) {
      case "bill":
      case "book":
      case "patent":
      case "report":
      case "statute":
      case "thesis":
        return t;
      case "book_section":
        return "chapter";
      case "conference_proceedings":
        return "paper-conference";
      case "encyclopedia_article":
        return "entry-encyclopedia";
      case "film":
        return "motion_picture";
      case "hearing":
        return "speech";
      case "journal":
        return "article-journal";
      case "magazine_article":
        return "article-magazine";
      case "newspaper_article":
        return "article-newspaper";
      case "television_broadcast":
        return "broadcast";
      case "web_page":
        return "webpage";
      case "case":
      case "computer_program":
      case "generic":
      case "working_paper":
      default:
        return "article";
    }
  }
  /**
   * @param {*} item 
   * @param {string} fieldTo 
   * @param {string} fieldFrom 
   * @returns 
   */
  static _convertMendeleyWriter(t, i, n) {
    if (!(!t[n] || t[n].length <= 0)) {
      t[i] || (t[i] = []);
      for (var s = 0; s < t[n].length; s++)
        t[i].push({
          given: t[n][s].first_name,
          family: t[n][s].last_name
        });
      delete t[n];
    }
  }
  /**
   * @param {*} item 
   * @param {string} field 
   * @returns 
   */
  static _convertMendeleyDate(t, i) {
    if (t.year) {
      var n = [t.year];
      delete t.year, t.month && (n.push(t.month), delete t.month, t.day && (n.push(t.day), delete t.day)), t[i] = {
        "date-parts": [n]
      };
    }
  }
}
var Ie = [{
  id: "demo-doc-1",
  title: "Clean Code: A Handbook of Agile Software Craftsmanship",
  type: "book",
  authors: [{
    first_name: "Robert C.",
    last_name: "Martin"
  }],
  year: 2008,
  source: "Prentice Hall",
  publisher: "Prentice Hall",
  identifiers: {
    isbn: "978-0132350884"
  },
  abstract: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
  tags: ["Software Engineering", "Clean Code", "Design Patterns"],
  created: "2026-01-15T10:00:00.000Z",
  last_modified: "2026-10-01T12:00:00.000Z"
}, {
  id: "demo-doc-2",
  title: "Design Patterns: Elements of Reusable Object-Oriented Software",
  type: "book",
  authors: [{
    first_name: "Erich",
    last_name: "Gamma"
  }, {
    first_name: "Richard",
    last_name: "Helm"
  }, {
    first_name: "Ralph",
    last_name: "Johnson"
  }, {
    first_name: "John",
    last_name: "Vlissides"
  }],
  year: 1994,
  source: "Addison-Wesley Professional",
  publisher: "Addison-Wesley",
  identifiers: {
    isbn: "978-0201633610"
  },
  abstract: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
  tags: ["Architecture", "Design Patterns", "OOP"],
  created: "2026-02-10T14:30:00.000Z",
  last_modified: "2026-09-20T08:15:00.000Z"
}, {
  id: "demo-doc-3",
  title: "Deep Learning: Foundations and Concepts",
  type: "journal",
  authors: [{
    first_name: "Ian",
    last_name: "Goodfellow"
  }, {
    first_name: "Yoshua",
    last_name: "Bengio"
  }, {
    first_name: "Aaron",
    last_name: "Courville"
  }],
  year: 2016,
  source: "MIT Press",
  publisher: "MIT Press",
  identifiers: {
    doi: "10.1038/nature14539"
  },
  abstract: "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques used in industry, and research perspectives.",
  tags: ["Machine Learning", "Deep Learning", "AI"],
  created: "2026-03-05T09:12:00.000Z",
  last_modified: "2026-08-11T16:40:00.000Z"
}, {
  id: "demo-doc-4",
  title: "Attention Is All You Need",
  type: "conference_proceedings",
  authors: [{
    first_name: "Ashish",
    last_name: "Vaswani"
  }, {
    first_name: "Noam",
    last_name: "Shazeer"
  }, {
    first_name: "Niki",
    last_name: "Parmar"
  }, {
    first_name: "Jakob",
    last_name: "Uszkoreit"
  }, {
    first_name: "Llion",
    last_name: "Jones"
  }, {
    first_name: "Aidan N.",
    last_name: "Gomez"
  }, {
    first_name: "Lukasz",
    last_name: "Kaiser"
  }, {
    first_name: "Illia",
    last_name: "Polosukhin"
  }],
  year: 2017,
  source: "Advances in Neural Information Processing Systems (NeurIPS)",
  publisher: "Curran Associates, Inc.",
  identifiers: {
    doi: "10.48550/arXiv.1706.03762"
  },
  abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.",
  tags: ["Transformers", "NLP", "Neural Networks"],
  created: "2026-04-12T11:00:00.000Z",
  last_modified: "2026-07-29T10:20:00.000Z"
}], wt = [{
  id: "demo-group-1",
  name: "Computer Science Research"
}, {
  id: "demo-group-2",
  name: "Software Architecture"
}], j = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS"
};
class St {
  constructor() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "MendeleyPlugin";
    this.context = t;
  }
  _log(t, i) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      context: this.context,
      level: t,
      event: i,
      details: n
    }, r = JSON.stringify(s);
    switch (t) {
      case j.ERROR:
        console.error(r);
        break;
      case j.WARN:
        console.warn(r);
        break;
      case j.DEBUG:
        console.debug(r);
        break;
      default:
        console.log(r);
        break;
    }
    return s;
  }
  debug(t, i) {
    return this._log(j.DEBUG, t, i);
  }
  info(t, i) {
    return this._log(j.INFO, t, i);
  }
  warn(t, i) {
    return this._log(j.WARN, t, i);
  }
  error(t, i) {
    return this._log(j.ERROR, t, i);
  }
  success(t, i) {
    return this._log(j.SUCCESS, t, i);
  }
}
var G = new St(), Ct = "https://api.mendeley.com";
class It {
  /** @param {{authFlow: any}} authFlow */
  constructor(t) {
    this._authFlow = t;
    try {
      typeof MendeleySDK == "function" && (this._mendeleySdk = MendeleySDK(t));
    } catch (i) {
      G.warn("SDK_INIT_FALLBACK", {
        message: i.message
      });
    }
    this._userId = 0, this._userGroups = [];
  }
  _getToken() {
    return localStorage.getItem("mendToken");
  }
  _isDemoMode() {
    return this._getToken() === "DEMO_MODE_TOKEN";
  }
  _fetch(t) {
    var i = arguments, n = this;
    return S(function* () {
      var s = i.length > 1 && i[1] !== void 0 ? i[1] : {}, r = n._getToken();
      if (!r)
        throw new Error("No Mendeley access token available");
      var o = pe({
        Authorization: "Bearer ".concat(r),
        Accept: "application/vnd.mendeley-document.1+json"
      }, s.headers || {}), l = t.startsWith("http") ? t : "".concat(Ct).concat(t);
      G.info("FETCH_API_REQUEST", {
        url: l
      });
      var h = new AbortController(), f = setTimeout(() => h.abort(), 1e4);
      try {
        var _ = yield fetch(l, pe(pe({}, s), {}, {
          headers: o,
          signal: h.signal
        }));
        if (clearTimeout(f), !_.ok) {
          var d = yield _.text().catch(() => "");
          throw G.error("FETCH_API_ERROR", {
            status: _.status,
            statusText: _.statusText,
            text: d
          }), new Error("Mendeley API error (".concat(_.status, "): ").concat(_.statusText));
        }
        return yield _.json();
      } catch (p) {
        throw clearTimeout(f), G.error("FETCH_API_EXCEPTION", {
          message: p.message
        }), p;
      }
    })();
  }
  /**
   * Get items from user library
   * @param {string|null} search
   * @param {string[]} [itemsID]
   * @param {string} [format]
   * @returns {Promise<SearchResult>}
   */
  getItems(t, i, n) {
    var s = this;
    return S(function* () {
      if (s._isDemoMode()) {
        G.info("FETCHING_DEMO_ITEMS", {
          search: t,
          count: Ie.length
        });
        var r = Ie;
        if (t) {
          var o = t.toLowerCase();
          r = Ie.filter((d) => d.title.toLowerCase().includes(o) || d.authors && d.authors.some((p) => p.last_name && p.last_name.toLowerCase().includes(o) || p.first_name && p.first_name.toLowerCase().includes(o)) || d.year && String(d.year).includes(o));
        }
        i && i.length && (r = Ie.filter((d) => i.includes(d.id)));
        var l = JSON.parse(JSON.stringify(r));
        return l.forEach(ce.transform.bind(ce)), {
          items: l
        };
      }
      try {
        var h = [];
        if (t) {
          var f = encodeURIComponent(t);
          h = yield s._fetch("/search/documents?query=".concat(f, "&limit=20&view=bib"));
        } else i && i.length ? (h = yield Promise.all(i.map((d) => s._fetch("/documents/".concat(d, "?view=bib")).catch(() => null))), h = h.filter(Boolean)) : h = yield s._fetch("/documents?limit=25&view=bib&sort=last_modified&order=desc");
        var _ = Array.isArray(h) ? h : h.items || [];
        return _.forEach(ce.transform.bind(ce)), G.success("FETCHED_DOCUMENTS_SUCCESS", {
          count: _.length
        }), {
          items: _
        };
      } catch (d) {
        return G.error("GET_ITEMS_FAILED", {
          message: d.message
        }), {
          items: []
        };
      }
    })();
  }
  /**
   * Get items from group library
   * @param {string | null} search
   * @param {number|string} groupId
   * @param {string[]} [itemsID]
   * @returns {Promise<SearchResult>}
   */
  getGroupItems(t, i, n) {
    var s = this;
    return S(function* () {
      if (s._isDemoMode())
        return s.getItems(t, n);
      try {
        var r = yield s._fetch("/documents?group_id=".concat(i, "&limit=25&view=bib")), o = Array.isArray(r) ? r : r.items || [];
        return o.forEach(ce.transform.bind(ce)), {
          items: o
        };
      } catch (l) {
        return G.error("GET_GROUP_ITEMS_FAILED", {
          message: l.message
        }), {
          items: []
        };
      }
    })();
  }
  /**
   * Get user groups
   * @returns {Promise<Array<UserGroupInfo>>}
   */
  getUserGroups() {
    var t = this;
    return S(function* () {
      if (t._isDemoMode())
        return wt;
      try {
        var i = yield t._fetch("/groups?limit=20", {
          headers: {
            Accept: "application/vnd.mendeley-group.1+json"
          }
        });
        return Array.isArray(i) ? i.map((n) => ({
          id: n.id,
          name: n.name
        })) : [];
      } catch (n) {
        return G.warn("GET_USER_GROUPS_FAILED", {
          message: n.message
        }), [];
      }
    })();
  }
}
function ge() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
    var t = document.getElementById(e);
    if (!t) throw new Error("container ".concat(e, " not found"));
    return t;
  });
}
ge.prototype.getRoute = function() {
  return this._currentRoute;
};
ge.prototype._setCurrentRoute = function(e) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
ge.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
ge.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
ge.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
function it(e, t) {
  var i = this;
  if (t = t || {}, typeof e == "string") {
    var n = document.getElementById(e);
    n instanceof HTMLInputElement && (e = n);
  }
  if (e instanceof HTMLInputElement)
    this.input = e;
  else
    throw new Error("Invalid input element");
  this._container = document.createElement("div"), this._options = {
    type: t.type || e.type || "text",
    placeholder: t.placeholder || e.placeholder || "",
    value: t.value || e.value || "",
    autofocus: t.autofocus || !1,
    disabled: t.disabled || !1,
    readonly: t.readonly || !1,
    required: t.required || !1,
    showCounter: t.showCounter || !1,
    showClear: t.showClear !== void 0 ? t.showClear : !0,
    autocomplete: t.autocomplete || "off"
  };
  for (var s in t)
    this._options.hasOwnProperty(s) || (this._options[s] = t[s]);
  this._id = e.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = !1, this.isValid = !0, this._validationMessage = "", this._subscribers = [], this._boundHandles = {
    focus: function(o) {
      i._handleFocus(o);
    },
    blur: function(o) {
      i._handleBlur(o);
    },
    input: function(o) {
      i._handleInput(o);
    },
    keydown: function(o) {
      i._handleKeydown(o);
    },
    clear: function() {
      i.clear();
    },
    validate: function() {
      i.validate();
    }
  }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), this._options.type === "search" && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(r) {
    return function() {
      r.focus();
    };
  })(this), 100);
}
it.prototype = {
  constructor: it,
  /** @type {HTMLInputElement} */
  // @ts-ignore
  input: null,
  /** @type {HTMLElement} */
  // @ts-ignore
  _container: null,
  /** @type {InputOptionsType} */
  _options: {},
  _id: "",
  isFocused: !1,
  isValid: !0,
  _validationMessage: "",
  /** @type {Function[]} */
  _subscribers: [],
  /** @type {InputBoundHandlesType} */
  // @ts-ignore
  _boundHandles: null,
  /** @type {HTMLButtonElement | null} */
  _clearButton: null,
  /** @type {HTMLDivElement | null} */
  _counter: null,
  /** @type {HTMLSpanElement | null} */
  _counterCurrent: null,
  /** @type {HTMLSpanElement | null} */
  _counterMax: null,
  /** @type {HTMLDivElement} */
  // @ts-ignore
  _validationElement: null,
  /**
   * @private
   */
  _createDOM: function() {
    var t = this.input.parentNode, i = document.createDocumentFragment();
    i.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
    var n = document.createElement("div");
    this._container.appendChild(n), n.className += " input-field", this._options.disabled && (n.className += " input-field-disabled");
    var s = document.createElement("div");
    if (n.appendChild(s), s.className += " input-field-main", this.input.className += " input-field-element i18n", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = !0), this._options.readonly && (this.input.readOnly = !0), this._options.required && (this.input.required = !0), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
      this._counter = document.createElement("div"), n.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
      var r = document.createElement("span");
      r.textContent = "/", this._counter.appendChild(r), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
    }
    n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', s.appendChild(this._searchIcon)), t && t.insertBefore(i, this.input), s.appendChild(this.input);
  },
  /**
   * @private
   */
  _bindEvents: function() {
    this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleFocus: function(t) {
    this.isFocused = !0, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(t);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleBlur: function(t) {
    this.isFocused = !1;
    for (var i = this._container.className.split(" "), n = [], s = 0; s < i.length; s++)
      i[s] !== "input-field-focused" && n.push(i[s]);
    this._container.className = n.join(" "), this.validate(), this._triggerBlurEvent(t);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleInput: function(t) {
    this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(t);
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(t) {
    var i = t.key || t.keyCode;
    (i === "Escape" || i === 27) && this._options.showClear && (this.clear(), t.preventDefault()), (i === "Enter" || i === 13) && this._triggerSubmit();
  },
  /**
   * @private
   */
  _updateClearButton: function() {
    if (this._clearButton) {
      var t = this.input.value.length > 0;
      this._clearButton.style.display = t ? "block" : "none";
    }
  },
  /**
   * @private
   */
  _updateCounter: function() {
    if (this._counter && this._options.maxLength) {
      var t = this.input.value.length, i = this._options.maxLength;
      if (this._counterCurrent && (this._counterCurrent.textContent = String(t)), this._counterMax && (this._counterMax.textContent = String(i)), t > i * 0.9) {
        var n = this._counter.className.split(" ");
        n.indexOf("input-field-counter-warning") === -1 && (this._counter.className += " input-field-counter-warning");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(s) {
          return s !== "input-field-counter-warning";
        }).join(" ");
      if (t > i) {
        var n = this._counter.className.split(" ");
        n.indexOf("input-field-counter-error") === -1 && (this._counter.className += " input-field-counter-error");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(s) {
          return s !== "input-field-counter-error";
        }).join(" ");
    }
  },
  validate: function() {
    if (!this._options.validation)
      return this.isValid = !0, !0;
    var t = this.input.value, i = !0, n = "";
    if (this._options.required && !t.trim() ? (i = !1, n = "This field is required") : this._options.minLength && t.length < this._options.minLength ? (i = !1, n = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t.length > this._options.maxLength ? (i = !1, n = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t) && (i = !1, n = "Invalid format"), i && typeof this._options.validation == "function") {
      var s = this._options.validation(t);
      s && !s.isValid && (i = !1, n = s.message || "Invalid value");
    }
    return this.isValid = i, this._validationMessage = n, this.updateValidationState(), i;
  },
  updateValidationState: function() {
    if (this.isValid)
      if (this.input.value.length > 0) {
        this._validationElement.style.display = "none";
        var t = this._container.className.split(" ");
        t.indexOf("input-field-valid") === -1 && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(n) {
          return n !== "input-field-invalid";
        }).join(" ");
      } else
        this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(i) {
          return i !== "input-field-valid" && i !== "input-field-invalid";
        }).join(" ");
    else {
      this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block";
      var t = this._container.className.split(" ");
      t.indexOf("input-field-invalid") === -1 && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(i) {
        return i !== "input-field-valid";
      }).join(" ");
    }
  },
  /**
   * @private
   */
  _updateState: function() {
    this._updateClearButton(), this._updateCounter(), this.validate();
  },
  // Public API
  getValue: function() {
    return this.input.value.trim();
  },
  /**
   * @param {string} value
   */
  setValue: function(t) {
    this.input.value = t, this._updateState(), this._triggerChange();
  },
  /**
   * @param {string} value
   */
  setPlaceholder: function(t) {
    this.input.placeholder = t, this._options.placeholder = t;
  },
  /**
   * @param {boolean} [bFocus]
   */
  clear: function(t) {
    t = t !== void 0 ? t : !0, this.setValue(""), t && this.input.focus();
  },
  focus: function() {
    this.input.focus();
  },
  blur: function() {
    this.input.blur();
  },
  enable: function() {
    this.input.disabled = !1, this._options.disabled = !1, this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "input-field-disabled";
    }).join(" ");
  },
  disable: function() {
    this.input.disabled = !0, this._options.disabled = !0;
    var t = this._container.className.split(" ");
    t.indexOf("input-field-disabled") === -1 && (this._container.className += " input-field-disabled");
  },
  /**
   * @param {function(InputEventType): void} callback
   * @returns {Object}
   */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerInputEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:input",
        detail: i
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerFocusEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:focus",
        detail: i
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerBlurEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:blur",
        detail: i
      });
    });
  },
  /**
   * @private
   */
  _triggerChange: function() {
    var t = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:change",
        detail: t
      });
    });
  },
  /**
   * @private
   */
  _triggerSubmit: function() {
    var t = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:submit",
        detail: t
      });
    });
  },
  destroy: function() {
    if (this._subscribers = [], this._boundHandles)
      try {
        this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
      } catch (t) {
        console.error(t);
      }
    this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "input-field-container";
    }).join(" ");
  }
};
function Ne(e, t) {
  if (typeof e == "string") {
    var i = document.getElementById(e);
    i instanceof HTMLElement && (e = i);
  }
  if (e instanceof HTMLElement)
    this.container = e;
  else
    throw new Error("Invalid container element");
  this._options = Object.assign(this._options, t), this._isShow = !1;
}
Ne.prototype = {
  constructor: Ne,
  _options: {
    type: "info",
    text: "",
    title: "",
    duration: 0,
    closeButton: !0,
    autoClose: !1,
    closeOnClickOutside: !0
  },
  /**
   * @type {null | function(MouseEvent): void}
   * @private
   */
  _outsideClickListener: null,
  /**
   * @type {null | HTMLElement}
   * @private
   */
  _element: null,
  /**
   * @type {null | number}
   * @private
   */
  _timeoutId: null,
  /**
   * @returns {HTMLElement}
   * @private
   */
  _create: function() {
    var t = document.createElement("div");
    t.className = "message message-" + this._options.type, t.setAttribute("role", "alert");
    var i = this._options.title;
    if (!i)
      switch (i = "Error", this._options.type) {
        case "success":
          i = "Success";
          break;
        case "warning":
          i = "Warning";
          break;
        case "info":
          i = "Information";
          break;
      }
    var n = this._options.text;
    if (!n)
      switch (n = "", this._options.type) {
        case "success":
          n = "Operation completed successfully.";
          break;
        case "warning":
          n = "Please be cautious.";
          break;
        case "error":
          n = "Something went wrong.";
          break;
      }
    if (t.innerHTML = '<div class="message-content"><span class="message-title">' + i + '</span><span class="message-text">' + n + "</span></div>", this._options.closeButton) {
      var s = document.createElement("button");
      s.className = "message-close", s.textContent = "×", s.setAttribute("aria-label", "Close"), s.onclick = this.close.bind(this), t.appendChild(s);
    }
    return t;
  },
  addOutsideClickListener: function() {
    this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
    var t = this;
    this._outsideClickListener = function(i) {
      i.target instanceof HTMLElement && t._element && !t._element.contains(i.target) && t.close();
    }, setTimeout(function() {
      t._outsideClickListener && document.addEventListener("click", t._outsideClickListener);
    }, 10);
  },
  removeOutsideClickListener: function() {
    this._outsideClickListener && (document.removeEventListener("click", this._outsideClickListener), this._outsideClickListener = null);
  },
  /**
   * @param {string} [text]
   * @param {string} [title]
   * @returns
   */
  show: function(t, i) {
    if (this._isShow)
      return this;
    this._isShow = !0, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), i && (this._options.title = i), t && (this._options.text = t);
    var n = this._create();
    return this._element = n, this.container.appendChild(n), setTimeout(function() {
      n.style.opacity = "1", n.style.transform = "translateY(0)";
    }, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
  },
  close: function() {
    if (this._isShow = !1, !(!this._element || !this._element.parentNode)) {
      this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), this.removeOutsideClickListener();
      var t = this._element;
      t.style.opacity = "0", t.style.transform = "translateY(-20px)", setTimeout(function() {
        t.parentNode && t.parentNode.removeChild(t);
      }, 300);
    }
  }
};
function Oe(e, t) {
  var i = this;
  if (typeof e == "string") {
    var n = document.getElementById(e);
    n instanceof HTMLButtonElement && (e = n);
  }
  if (e instanceof HTMLButtonElement)
    this._button = e;
  else
    throw new Error("Invalid button");
  this._container = document.createElement("div"), this._options = t || {}, this._options.text = this._options.text || e.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = !1, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = {
    click: function(r) {
      i._handleClick(r);
    },
    mouseenter: function() {
      i._handleMouseEnter();
    },
    mouseleave: function() {
      i._handleMouseLeave();
    },
    focus: function() {
      i._handleFocus();
    },
    blur: function() {
      i._handleBlur();
    },
    keydown: function(r) {
      i._handleKeydown(r);
    }
  }, this._createDOM(), this._bindEvents(), this.updateState();
}
Oe.prototype = /** @lends Button.prototype */
{
  constructor: Oe,
  /**
   * @type {HTMLButtonElement}
   */
  // @ts-ignore
  _button: null,
  /**
   * @type {HTMLSpanElement | null}
   * @private
   */
  _buttonText: null,
  /**
   * @type {HTMLSpanElement | null}
   * @private
   */
  _spinner: null,
  /**
   * @private
   * @type {HTMLSpanElement | null}
   */
  _badgeElement: null,
  /**
   * @private
   */
  _createDOM: function() {
    var t = this._button.parentNode, i = document.createDocumentFragment();
    if (i.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text)
      if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
        var n = document.createElement("span");
        n.className = "custom-button-icon", this._options.iconPosition === "left" ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
      } else
        this._button.appendChild(this._buttonText);
    this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), t && t.insertBefore(i, this._button), this._container.appendChild(this._button);
  },
  /** @private */
  _bindEvents: function() {
    this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleClick: function(t) {
    if (this._options.disabled || this.isLoading) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.triggerClickEvent(t);
  },
  /** @private */
  _handleMouseEnter: function() {
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-hover") === -1 && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
  },
  /** @private */
  _handleMouseLeave: function() {
    this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-hover";
    }).join(" "), this.triggerEvent("mouseleave");
  },
  /** @private */
  _handleFocus: function() {
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-focused") === -1 && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
  },
  /** @private */
  _handleBlur: function() {
    this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-focused";
    }).join(" "), this.triggerEvent("blur");
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(t) {
    var i = t.key || t.keyCode;
    i === " " || i === "Enter" || i === 32 || i === 13 ? this._button.tagName === "BUTTON" || (t.preventDefault(), this._button.click()) : (i === "Escape" || i === 27) && this._button.blur(), this.triggerEvent("keydown", {
      key: i
    });
  },
  /** @param {function(InputEventType): void} callback */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /** @param {ButtonOptionsType['text']} text */
  setText: function(t) {
    typeof t > "u" || (this._options.text = t, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = t);
  },
  /**
   * @param {string} icon
   * @param {ButtonOptionsType['iconPosition']} position
   */
  setIcon: function(t, i) {
    this._options.icon = t, this._options.iconPosition = i || "left";
  },
  /** @param {ButtonOptionsType['badge']} badge */
  setBadge: function(t) {
    typeof t > "u" || (this._options.badge = t, this._badgeElement && (this._badgeElement.textContent = t, this._badgeElement.style.display = t ? "flex" : "none"));
  },
  /** @param {ButtonOptionsType['variant']} variant */
  setVariant: function(t) {
    if (!(typeof t > "u")) {
      var i = "custom-button-" + this._options.variant, n = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.variant = t;
    }
  },
  /** @param {ButtonOptionsType['size']} size */
  setSize: function(t) {
    if (!(typeof t > "u")) {
      var i = "custom-button-" + this._options.size, n = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.size = t;
    }
  },
  enable: function() {
    this._options.disabled = !1, this._button.disabled = !1, this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-disabled";
    }).join(" ");
  },
  disable: function() {
    this._options.disabled = !0, this._button.disabled = !0;
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-disabled") === -1 && (this._button.className += " custom-button-disabled");
  },
  startLoading: function() {
    this.isLoading = !0, typeof this._options.text < "u" && (this._originalText = this._options.text);
    var t = this._container.className.split(" ");
    t.indexOf("custom-button-loading") === -1 && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = !0;
  },
  stopLoading: function() {
    this.isLoading = !1, this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "custom-button-loading";
    }).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
  },
  /** @param {ButtonOptionsType['tooltip']} tooltip */
  setTooltip: function(t) {
    typeof t > "u" || (this._options.tooltip = t, this._button.title = t || "");
  },
  /** @param {Event} e */
  triggerClickEvent: function(t) {
    var i = {
      originalEvent: t,
      button: this
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "button:click",
        detail: i
      });
    });
  },
  /**
   * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
   * @param {any} [detail]
   */
  triggerEvent: function(t, i) {
    i = i || {}, i.button = this, this._subscribers.forEach(function(n) {
      n({
        type: "button:" + t,
        detail: i
      });
    });
  },
  updateState: function() {
    this._options.disabled ? this.disable() : this.enable(), this._options.loading && this.startLoading();
  },
  destroy: function() {
    if (this._subscribers = [], this._boundHandles)
      try {
        this._button.removeEventListener("click", this._boundHandles.click), this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter), this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave), this._button.removeEventListener("focus", this._boundHandles.focus), this._button.removeEventListener("blur", this._boundHandles.blur), this._button.removeEventListener("keydown", this._boundHandles.keydown);
      } catch (i) {
        console.error(i);
      }
    this._container.innerHTML = "";
    var t = this._container.className.split(" ").filter(function(i) {
      return i !== "custom-button-container";
    }).join(" ");
    this._container.className = t;
  }
};
var w = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakSet();
class nt {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(t, i) {
    if (re(this, W), T(this, w, void 0), T(this, k, void 0), T(this, be, void 0), T(this, V, null), T(this, v, void 0), T(this, ae, /* @__PURE__ */ new Map()), T(this, ue, []), typeof t == "string") {
      var n = document.getElementById(t);
      n instanceof HTMLInputElement && (t = n);
    }
    if (!(t instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (E(k, this, t), E(v, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(W, this, At).call(this), E(w, this, document.createElement("div")), E(be, this, document.createElement("span")), c(W, this, Et).call(this), c(W, this, Lt).call(this), c(W, this, Re).call(this), !a(v, this).name)
      throw new Error("Name attribute is required");
    var s = fe._.get(a(v, this).name);
    s || (s = new Array(), fe._.set(a(v, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return a(ue, this).push(t), {
      unsubscribe: function() {
        E(ue, i, a(ue, i).filter(function(s) {
          return s !== t;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return a(w, this);
  }
  /** @param {boolean} [bSilent] */
  check(t) {
    if (!(a(v, this).disabled || a(v, this).checked)) {
      if (a(v, this).name) {
        var i = fe._.get(a(v, this).name);
        i && i.forEach((n) => {
          n !== this && a(v, n).checked && n.uncheck();
        });
      }
      a(v, this).checked = !0, c(W, this, Re).call(this), !t && c(W, this, st).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(t) {
    a(v, this).disabled || !a(v, this).checked || (a(v, this).checked = !1, c(W, this, Re).call(this), !t && c(W, this, st).call(this));
  }
  enable() {
    a(v, this).disabled && (a(v, this).disabled = !1, a(k, this).disabled = !1, a(w, this).setAttribute("aria-disabled", "false"), a(v, this).checked ? a(w, this).tabIndex = 0 : c(W, this, Ze).call(this), a(w, this).classList.remove("radio--disabled"));
  }
  disable() {
    a(v, this).disabled || (a(v, this).disabled = !0, a(k, this).disabled = !0, a(w, this).setAttribute("aria-disabled", "true"), a(w, this).tabIndex = -1, a(w, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(t) {
    a(v, this).label = t, a(V, this) ? a(V, this).textContent = t : t && (E(V, this, document.createElement("label")), a(V, this).className = "radio-label", a(V, this).htmlFor = String(a(v, this).id), a(V, this).textContent = t, a(w, this).appendChild(a(V, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!a(v, this).checked,
      disabled: !!a(v, this).disabled,
      value: a(v, this).value || "",
      name: a(v, this).name || ""
    };
  }
  destroy() {
    if (E(ue, this, []), !!a(v, this).name) {
      var t = fe._.get(a(v, this).name);
      if (t) {
        var i = t.indexOf(this);
        i >= 0 && t.splice(i, 1);
      }
      a(ae, this).forEach((n, s) => {
        a(w, this).removeEventListener(s, n);
      }), a(ae, this).clear(), a(w, this) && a(w, this).parentNode && a(w, this).parentNode.removeChild(a(w, this)), E(V, this, null);
    }
  }
}
function At() {
  a(k, this).type = "radio";
  var e = a(k, this).getAttribute("id"), t = a(k, this).getAttribute("name"), i = a(k, this).getAttribute("value"), n = a(k, this).getAttribute("checked"), s = a(k, this).getAttribute("disabled");
  e !== null ? a(v, this).id = e : a(v, this).id && a(k, this).setAttribute("id", a(v, this).id), t !== null ? a(v, this).name = t : a(v, this).name && a(k, this).setAttribute("name", a(v, this).name), i !== null ? a(v, this).value = i : a(v, this).value && a(k, this).setAttribute("value", a(v, this).value), n !== null ? a(v, this).checked = n === "true" : a(v, this).checked && a(k, this).setAttribute("checked", "true"), s !== null ? a(v, this).disabled = s === "true" : a(v, this).disabled && a(k, this).setAttribute("disabled", "true");
}
function Et() {
  var e = a(k, this).parentNode, t = document.createDocumentFragment();
  t.appendChild(a(w, this)), a(w, this).classList.add("radio-button-container"), a(w, this).setAttribute("role", "radio"), a(w, this).setAttribute("aria-checked", String(!!a(v, this).checked)), a(w, this).setAttribute("aria-disabled", String(!!a(v, this).disabled)), a(w, this).tabIndex = a(v, this).disabled ? -1 : 0, a(be, this).className = "radio-visual", a(be, this).setAttribute("aria-hidden", "true"), a(v, this).label && (E(V, this, document.createElement("label")), a(V, this).className = "i18n radio-label", a(V, this).htmlFor = String(a(v, this).id), a(V, this).textContent = a(v, this).label), a(v, this).disabled && a(w, this).classList.add("radio--disabled"), e && e.insertBefore(t, a(k, this)), a(w, this).appendChild(a(k, this)), a(w, this).appendChild(a(be, this)), a(V, this) && a(w, this).appendChild(a(V, this)), c(W, this, Ze).call(this);
}
function Ze() {
  if (a(v, this).checked)
    a(w, this).tabIndex = a(v, this).disabled ? -1 : 0;
  else if (a(v, this).name && fe._.has(a(v, this).name)) {
    var e = fe._.get(a(v, this).name), t = !1;
    e && e.forEach((i) => {
      a(v, i).checked && i !== this && (t = !0);
    }), !t && !a(v, this).checked && !a(v, this).disabled ? a(w, this).tabIndex = 0 : a(w, this).tabIndex = -1;
  }
}
function Lt() {
  var e = (s) => {
    s.preventDefault(), !a(v, this).disabled && !a(v, this).checked && (this.check(), a(w, this).focus());
  }, t = (s) => {
    if (!a(v, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), a(v, this).checked || this.check();
          break;
      }
  }, i = () => {
    a(w, this).classList.add("radio--focused");
  }, n = () => {
    a(w, this).classList.remove("radio--focused");
  };
  a(ae, this).set("click", e), a(ae, this).set("keydown", t), a(ae, this).set("focus", i), a(ae, this).set("blur", n), a(w, this).addEventListener("click", e), a(w, this).addEventListener("keydown", t), a(w, this).addEventListener("focus", i), a(w, this).addEventListener("blur", n);
}
function Re() {
  a(w, this).setAttribute("aria-checked", String(!!a(v, this).checked)), a(w, this).classList.toggle("radio--checked", a(v, this).checked), a(k, this).checked = !!a(v, this).checked, c(W, this, Ze).call(this);
}
function st(e) {
  var t = this.getState(), i = {
    type: "radio:change",
    detail: t
  };
  e && (i.originalEvent = e), a(ue, this).forEach(function(n) {
    n(i);
  });
}
var fe = {
  _: /* @__PURE__ */ new Map()
};
function rt(e, t) {
  if (typeof e == "string") {
    var i = document.getElementById(e);
    i instanceof HTMLInputElement && (e = i);
  }
  if (!(e instanceof HTMLInputElement))
    throw new Error("Invalid input element");
  this._options = Object.assign({
    id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
    checked: !1,
    disabled: !1,
    indeterminate: !1,
    label: "",
    name: "",
    value: "on"
  }, t), this._options.disabled = t.disabled || !1, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(e), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
rt.prototype = {
  constructor: rt,
  /**
   * @type {HTMLDivElement | null}
   * @private
   */
  // @ts-ignore
  _container: null,
  /**
   * @type {HTMLInputElement | null}
   */
  _input: null,
  /**
   * @type {null | HTMLSpanElement}
   * @private
   */
  _visualCheckbox: null,
  /**
   * @type {null | HTMLLabelElement}
   * @private
   */
  _labelElement: null,
  /**
   * @param {HTMLInputElement} checkbox
   * @private
   */
  _createDOM: function(t) {
    var i = t.parentNode, n = document.createDocumentFragment();
    this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t;
    var s = this._input.getAttribute("id");
    s !== null ? this._options.id = s : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
    var r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg");
    o.setAttribute("viewBox", "0 0 10 8"), o.setAttribute("class", "checkbox-checkmark");
    var l = document.createElementNS(r, "path");
    l.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), l.setAttribute("fill", "none"), l.setAttribute("stroke", "currentColor"), l.setAttribute("stroke-width", "2"), o.appendChild(l), this._visualCheckbox.appendChild(o);
    var h = document.createElement("span");
    if (h.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(h), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var f = document.querySelector("label[for='" + this._options.id + "']");
      f instanceof HTMLLabelElement && (this._labelElement = f);
    }
    this._options.disabled && this._container.classList.add("checkbox--disabled"), i && i.insertBefore(n, t), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
  },
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners: function() {
    var t = this;
    if (this._container) {
      var i = function(l) {
        l.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
      }, n = function(l) {
        if (!t._options.disabled)
          switch (l.key) {
            case " ":
            case "Spacebar":
            case "Enter":
              l.preventDefault(), t.toggle();
              break;
            case "ArrowRight":
            case "ArrowDown":
              l.preventDefault(), !t._options.checked && !t._options.indeterminate && (t._options.checked ? t.setIndeterminate() : t.check());
              break;
            case "ArrowLeft":
            case "ArrowUp":
              l.preventDefault(), (t._options.checked || t._options.indeterminate) && (t._options.indeterminate ? t.uncheck() : t.setIndeterminate());
              break;
          }
      }, s = function() {
        t._container && t._container.classList.add("checkbox--focused");
      }, r = function() {
        t._container && t._container.classList.remove("checkbox--focused");
      };
      this._handlers.set("click", i), this._handlers.set("keydown", n), this._handlers.set("focus", s), this._handlers.set("blur", r), this._container.addEventListener("click", i), this._container.addEventListener("keydown", n), this._container.addEventListener("focus", s), this._container.addEventListener("blur", r);
    }
  },
  /**
   * Update visual state based on current properties
   * @private
   */
  _updateVisualState: function() {
    !this._container || !this._input || (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
  },
  /**
   * Toggle checkbox state
   * @returns {boolean} - New checked state
   */
  toggle: function() {
    return this._options.disabled ? !!this._options.checked : (this._options.indeterminate ? (this._options.indeterminate = !1, this._options.checked = !0) : this._options.checked = !this._options.checked, this._updateVisualState(), this._triggerChange(), this._options.checked);
  },
  /**
   * Set checkbox to checked state
   * @param {boolean} [bSilent]
   */
  check: function(t) {
    this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = !0, this._options.indeterminate = !1, this._updateVisualState(), t || this._triggerChange());
  },
  /**
   * Set checkbox to unchecked state
   * @param {boolean} [bSilent]
   */
  uncheck: function(t) {
    this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = !1, this._options.indeterminate = !1, this._updateVisualState(), t || this._triggerChange());
  },
  /**
   * Set checkbox to indeterminate state
   */
  setIndeterminate: function() {
    this._options.disabled || this._options.indeterminate || (this._options.indeterminate = !0, this._updateVisualState(), this._triggerChange());
  },
  /**
   * Enable the checkbox
   */
  enable: function() {
    !this._options.disabled || !this._container || !this._input || (this._options.disabled = !1, this._input.disabled = !1, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
  },
  /**
   * Disable the checkbox
   */
  disable: function() {
    this._options.disabled || !this._container || !this._input || (this._options.disabled = !0, this._input.disabled = !0, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
  },
  /**
   * Update checkbox label
   * @param {string} label - New label text
   */
  setLabel: function(t) {
    this._options.label = t, this._labelElement ? this._labelElement.textContent = t : t && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = t, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", t);
  },
  /**
   * Get current checkbox state
   * @returns {{value: string, disabled: boolean, checked: boolean}} - State object
   */
  getState: function() {
    return this._input ? {
      checked: this._input.checked,
      disabled: this._input.disabled,
      value: this._input.value
    } : {
      checked: !1,
      disabled: !1,
      value: ""
    };
  },
  /**
   * @param {function(CheckboxEventType): void} callback
   * @returns {Object}
   */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /**
   * @param {Event} [e]
   * @private
   */
  _triggerChange: function(t) {
    var i = this.getState(), n = {
      type: "checkbox:change",
      detail: i
    };
    t && (n.originalEvent = t), this._subscribers.forEach(function(s) {
      s(n);
    });
  },
  /**
   * Clean up event listeners and references
   */
  destroy: function() {
    this._subscribers = [], this._handlers.forEach((t, i) => {
      this._container && this._container.removeEventListener(i, t);
    }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
  }
};
var y = /* @__PURE__ */ new WeakSet();
class Ve {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, i) {
    if (re(this, y), typeof t == "string") {
      var n = document.getElementById(t);
      if (n instanceof HTMLSelectElement)
        t = n;
      else if (n instanceof HTMLElement)
        this._container = n;
      else
        throw new Error("Invalid selectbox");
    } else t instanceof HTMLElement && (this._container = t);
    if (t instanceof HTMLSelectElement)
      this._selectbox = t, this._container = document.createElement("div");
    else if (!(this._container instanceof HTMLElement))
      throw new Error("Invalid container");
    this._options = Object.assign(i, {
      placeholder: i.placeholder || "Select...",
      searchable: i.searchable || !1,
      sortable: i.sortable || !1,
      translate: i.translate,
      multiple: i.multiple || !1,
      usePortal: i.usePortal || !1,
      description: i.description || ""
    }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = !1, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = {
      toggle: (s) => {
        c(y, this, pt).call(this, s);
      },
      search: (s) => {
        c(y, this, kt).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(y, this, J).call(this);
      },
      keydown: (s) => {
        c(y, this, Nt).call(this, s);
      },
      dropdownClick: (s) => {
        c(y, this, Ot).call(this, s);
      },
      scrollCheck: () => {
        if (this._headerRectOnOpen) {
          var s = this._header.getBoundingClientRect();
          Math.abs(s.top - this._headerRectOnOpen.top) > 1 && c(y, this, J).call(this);
        }
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(y, this, xt).call(this), c(y, this, Pt).call(this), c(y, this, _e).call(this), Ke._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), c(y, this, _e).call(this), c(y, this, Tt).call(this);
  }
  /**
   * @param {function(SelectboxEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe() {
        i._subscribers = i._subscribers.filter(function(n) {
          return n !== t;
        });
      }
    };
  }
  /**
   * @param {string} value
   * @param {string} text
   * @param {boolean} selected
   */
  addItem(t, i, n) {
    n = n || !1;
    var s = this._items.some((o) => o && o.value === t);
    if (s) {
      var r = this._items.find((o) => o && o.value === t);
      r && (r.selected = n);
    } else
      this._items.push({
        value: t,
        text: i,
        selected: n
      }), this._options.sortable && this._items.sort((o, l) => o && l ? o.text.localeCompare(l.text) : o ? -1 : l ? 1 : 0);
    n && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), c(y, this, ne).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(t, i) {
    var n = this;
    t.forEach(function(s, r) {
      var o = n._items.some((h) => h && h.value === s[0]);
      if (!o) {
        var l = i ? s[0] === i : r === 0;
        l && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: l
        });
      }
    }, this), this.isOpen && c(y, this, _e).call(this), c(y, this, ne).call(this);
  }
  /**
   * @param {string} value
   * @param {string} text
   */
  addCustomItem(t, i) {
    this._customItems.push({
      value: t,
      text: i,
      selected: !1
    });
  }
  addSeparator() {
    this._items.push(null);
  }
  /**
   * @param {string} value
   */
  removeItem(t) {
    this._items = this._items.filter(function(i) {
      return i === null || i.value !== t;
    }), this._customItems = this._customItems.filter(function(i) {
      return i === null || i.value !== t;
    }), this._selectedValues.delete(t), c(y, this, ne).call(this);
  }
  /**
   * @return {null | string}
   */
  getSelectedValue() {
    if (this._options.multiple)
      return console.error("Method getSelectedValue is only available for single-select boxes."), null;
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  /**
   * @return {null | string | Array<string>}
   */
  getSelectedValues() {
    if (this._options.multiple)
      return Array.from(this._selectedValues);
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  selectItems(t, i) {
    var n = this;
    if (!this._options.multiple && Array.isArray(t)) {
      console.error("Method selectItem is only available for multi-select boxes.");
      return;
    }
    var s = "";
    if (this._options.multiple) {
      var r = function(_) {
        if (n._optionsContainer) {
          var d = n._optionsContainer.querySelector('[data-value="' + _ + '"]');
          if (d) {
            var p = d.querySelector('input[type="checkbox"]');
            p && p instanceof HTMLInputElement && (p.checked = !0), d.classList.add("selectbox-option-selected"), d.classList.add("checkbox--checked");
          }
        }
      };
      if (Array.isArray(t))
        for (var o = 0; o < t.length; o++)
          s = t[o], this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
      else
        s = t, this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
    } else if (!Array.isArray(t)) {
      if (s = t, this._selectedValues.clear(), this._selectedValues.add(s), this._optionsContainer) {
        var l = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + s + '"]');
        l.forEach(function(f) {
          f.classList.remove("selectbox-option-selected"), f.classList.remove("checkbox--checked");
        });
        var h = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        h && (h.classList.add("selectbox-option-selected"), h.classList.add("checkbox--checked"));
      }
      c(y, this, J).call(this);
    }
    c(y, this, ne).call(this), !i && c(y, this, Te).call(this, s, !0);
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  unselectItems(t, i) {
    var n = this;
    if (!this._options.multiple) {
      console.error("Method unselectItem is only available for multi-select boxes.");
      return;
    }
    var s = "", r = function(h) {
      if (n._optionsContainer) {
        var f = n._optionsContainer.querySelector('[data-value="' + h + '"]');
        if (f) {
          var _ = f.querySelector('input[type="checkbox"]');
          _ && _ instanceof HTMLInputElement && (_.checked = !1), f.classList.remove("selectbox-option-selected"), f.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        s = t[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(y, this, ne).call(this), !i && c(y, this, Te).call(this, s, !0);
  }
  disable() {
    this._select.classList.add("selectbox-disabled");
  }
  enable() {
    this._select.classList.remove("selectbox-disabled");
  }
  /**
   * @param {boolean} bSelectFirst
   */
  clear(t) {
    if (t = t || !1, this._selectedValues.clear(), t && this._items.length > 0) {
      var i = this._items[0];
      i && this._selectedValues.add(i.value);
    }
    c(y, this, ne).call(this), c(y, this, _e).call(this);
  }
  destroy() {
    this._subscribers = [], Ke._.delete(this);
    try {
      this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (s) {
      console.error(s);
    }
    this._container.innerHTML = "";
    for (var t = this._container.className.split(" "), i = [], n = 0; n < t.length; n++)
      t[n] !== "selectbox-container" && i.push(t[n]);
    this._container.className = i.join(" ");
  }
}
function xt() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var e = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), e.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._options.usePortal && (this._dropdown.className += " selectbox-fixed"), this._select.appendChild(this._dropdown), this._options.description) {
    var t = document.createElement("div");
    t.className += " i18n selectbox-description", t.textContent = this._options.description, this._dropdown.appendChild(t);
  }
  if (this._options.searchable) {
    var i = document.createElement("div");
    i.className += " selectbox-search", this._dropdown.appendChild(i), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", i.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(e), this._selectbox) {
    var n = this._selectbox.parentNode;
    if (n) {
      n.insertBefore(this._container, this._selectbox);
      var s = c(y, this, Mt).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function Pt() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
    e.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function pt(e) {
  if (e && e.stopPropagation(), this.isOpen ? c(y, this, J).call(this) : this.openDropdown(), e && e.type === "click")
    for (var t of Ke._)
      t.isOpen && t !== this && c(y, t, J).call(t);
}
function J() {
  this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
  for (var e = this._arrow.className.split(" "), t = [], i = 0; i < e.length; i++)
    e[i] !== "selectbox-arrow-open" && t.push(e[i]);
  this._arrow.className = t.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function kt(e) {
  var t = e.target;
  if (t instanceof HTMLInputElement) {
    var i = t.value.toLowerCase();
    c(y, this, _e).call(this, i);
  }
}
function ot(e) {
  var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", i, n = this._items.filter(function(f) {
    return f !== null;
  });
  if (t && (n = n.filter(function(f) {
    return f.text.toLowerCase().indexOf(t) !== -1;
  })), n.length !== 0) {
    if (e === "up")
      if (this._selectedValues.size === 0 && n.length > 0)
        i = n[n.length - 1], this._selectedValues.add(i.value);
      else {
        for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
          if (n[o].value === s[0]) {
            r = o;
            break;
          }
        var l = (r - 1 + n.length) % n.length;
        this._selectedValues.clear(), i = n[l], this._selectedValues.add(i.value);
      }
    else if (this._selectedValues.size === 0 && n.length > 0)
      i = n[0], this._selectedValues.add(i.value);
    else {
      for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
        if (n[o].value === s[0]) {
          r = o;
          break;
        }
      var h = (r + 1) % n.length;
      h === n.length && (h = 0), this._selectedValues.clear(), i = n[h], this._selectedValues.add(i.value);
    }
    c(y, this, ne).call(this), c(y, this, _e).call(this, t, !0), c(y, this, Te).call(this, i.value, !0);
  }
}
function Nt(e) {
  var t = e.key || e.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      e.preventDefault(), c(y, this, pt).call(this, e);
      break;
    case "Escape":
    case 27:
      c(y, this, J).call(this);
      break;
    case "ArrowDown":
    case 40:
      e.preventDefault(), c(y, this, ot).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      e.preventDefault(), c(y, this, ot).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(y, this, J).call(this);
      break;
  }
}
function _e(e, t) {
  if (e = e || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    e && (n = n.filter(function(O) {
      return O !== null && O.text.toLowerCase().indexOf(e) !== -1;
    }));
    for (var s = document.createDocumentFragment(), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!o) {
        var l = document.createElement("hr");
        l.className += " selectbox-option-divider", s.appendChild(l);
        continue;
      }
      var h = document.createElement("div");
      h.className += " selectbox-option", this._selectedValues.has(o.value) && (h.className += " selectbox-option-selected checkbox--checked", i = h), h.setAttribute("data-value", o.value);
      var f = document.createElement("label");
      if (f.className += " selectbox-option-text i18n", this._options.translate && (o.text = this._options.translate(o.text)), f.textContent = o.text, this._options.multiple) {
        h.className += " selectbox-option-checkbox";
        var _ = document.createElement("input");
        _.type = "checkbox", _.id = "checkbox-" + o.value, _.className += " selectbox-checkbox", _.checked = this._selectedValues.has(o.value), h.appendChild(_);
        var d = document.createElement("span");
        d.className = "checkbox-visual", d.setAttribute("aria-hidden", "true");
        var p = "http://www.w3.org/2000/svg", m = document.createElementNS(p, "svg");
        m.setAttribute("viewBox", "0 0 10 8"), m.setAttribute("class", "checkbox-checkmark");
        var I = document.createElementNS(p, "path");
        I.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), I.setAttribute("fill", "none"), I.setAttribute("stroke", "currentColor"), I.setAttribute("stroke-width", "2"), m.appendChild(I), d.appendChild(m), h.appendChild(d);
      }
      h.appendChild(f), s.appendChild(h);
    }
    if (this._customItems.length) {
      var A = document.createElement("hr");
      A.className += " selectbox-option-divider", s.appendChild(A);
    }
    for (var r = 0; r < this._customItems.length; r++) {
      var C = this._customItems[r], b = document.createElement("label");
      b.className += " selectbox-custom-option", b.setAttribute("data-value", C.value), b.setAttribute("for", C.value);
      var B = document.createElement("span");
      B.className += " selectbox-option-text i18n", this._options.translate && (C.text = this._options.translate(C.text)), B.textContent = C.text, b.appendChild(B), s.appendChild(b);
    }
    if (this._optionsContainer.appendChild(s), t && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (O) {
        console.error(O);
      }
  }
}
function Ot(e) {
  var t = e.target || e.srcElement, i = null;
  if (t && t instanceof HTMLElement) {
    for (var n = null, s = t.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var l = t.getAttribute("data-value");
        if (l) {
          e.stopPropagation(), c(y, this, at).call(this, l), c(y, this, J).call(this);
          return;
        }
        break;
      }
    if (r)
      n = t;
    else if (t.parentNode && t.parentNode instanceof HTMLElement) {
      for (var h = t.parentNode.className.split(" "), f = !1, o = 0; o < h.length; o++)
        if (h[o] === "selectbox-option") {
          f = !0;
          break;
        } else if (h[o] === "selectbox-custom-option") {
          var _ = t.parentNode.getAttribute("data-value");
          if (_) {
            e.stopPropagation(), c(y, this, at).call(this, _), c(y, this, J).call(this);
            return;
          }
          break;
        }
      f && (n = t.parentNode);
    }
    if (n instanceof HTMLDivElement)
      i = n;
    else
      return;
  } else
    return;
  var d = i.getAttribute("data-value");
  if (d !== null) {
    var p = !0;
    this._options.multiple ? this._selectedValues.has(d) ? (this.unselectItems(d, !0), p = !1) : this.selectItems(d, !0) : (this.selectItems(d, !0), c(y, this, J).call(this)), c(y, this, ne).call(this), c(y, this, Te).call(this, d, p);
  }
}
function ne() {
  if (this._selectedValues.size === 0) {
    this._selectedText.textContent = this._options.placeholder;
    return;
  }
  if (this._options.multiple) {
    for (var e = [], t = 0; t < this._items.length; t++) {
      var i = this._items[t];
      i && this._selectedValues.has(i.value) && e.push(i);
    }
    e.length === 0 ? this._selectedText.textContent = this._options.placeholder : e.length === 1 ? this._selectedText.textContent = e[0].text : this._selectedText.textContent = e.length + " items selected";
  } else {
    for (var n = null, t = 0; t < this._items.length; t++) {
      var i = this._items[t];
      if (i && this._selectedValues.has(i.value)) {
        n = i;
        break;
      }
    }
    this._selectedText.textContent = n ? n.text : this._options.placeholder;
  }
}
function Tt() {
  var e = window.innerHeight;
  if (this._options.usePortal) {
    var t = this._header.getBoundingClientRect(), i = this._dropdown.offsetHeight;
    this._dropdown.style.left = t.left + "px", this._dropdown.style.width = t.width - 2 + "px";
    var n = e - t.bottom;
    n < i && t.top > n ? this._dropdown.style.top = t.top - i - 2 + "px" : this._dropdown.style.top = t.bottom + 2 + "px";
  } else {
    var s = this._dropdown.getBoundingClientRect();
    s.bottom > e && this._dropdown.classList.add("selectbox-dropdown-top");
  }
}
function Te(e, t) {
  for (var i = Array.from(this._selectedValues), n = [], s = 0; s < this._items.length; s++) {
    var r = this._items[s];
    r && this._selectedValues.has(r.value) && n.push(r);
  }
  var o = {
    values: i,
    items: n,
    current: e,
    enabled: t
  };
  this._subscribers.forEach(function(l) {
    l({
      type: "selectbox:change",
      detail: o
    });
  });
}
function at(e) {
  var t = {
    values: [],
    current: e,
    enabled: !1
  };
  this._subscribers.forEach(function(i) {
    i({
      type: "selectbox:custom",
      detail: t
    });
  });
}
function Mt(e) {
  var t = Array.from(e.options).map((s) => [s.value, s.text]), i = {
    values: t
  }, n = e.value;
  return n && (i.selectedValue = n), i;
}
var Ke = {
  _: /* @__PURE__ */ new Set()
}, $ = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakSet();
class we {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(t, i) {
    re(this, lt), T(this, $, void 0);
    var n = document.getElementById(t);
    E($, this, n), a($, this) && c(lt, this, Bt).call(this, i);
  }
  show() {
    var t;
    (t = a($, this)) === null || t === void 0 || t.classList.remove("hidden");
  }
  hide() {
    var t;
    (t = a($, this)) === null || t === void 0 || t.classList.add("hidden");
  }
  static show() {
    var t = document.getElementById("loader");
    t == null || t.classList.remove("hidden");
  }
  static hide() {
    var t = document.getElementById("loader");
    t == null || t.classList.add("hidden");
  }
}
function Bt(e) {
  if (a($, this)) {
    a($, this).classList.add("loader-container");
    var t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
    i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
    var n = document.createElementNS(t, "circle");
    n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), a($, this).appendChild(i);
    var s = document.createElement("div");
    s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = e, a($, this).appendChild(s);
  }
}
var Ht = "26014", Ft = "https://onlyoffice.github.io/sdkjs-plugins/content/mendeley/oauth.html";
class Rt {
  static openModalAuth(t, i) {
    var n = Date.now().toString(), s = "https://api.mendeley.com/oauth/authorize?client_id=".concat(Ht, "&redirect_uri=").concat(encodeURIComponent(Ft), "&response_type=token&scope=all&state=").concat(n);
    window.OAuthCallback = function(l, h) {
      l && (localStorage.setItem("mendToken", l), localStorage.setItem("mendTokenExpiresAt", String(Date.now() + 720 * 60 * 60 * 1e3)), typeof t == "function" && t(l));
    };
    try {
      window.open(s, "_blank");
    } catch (l) {
      console.error("Window open error:", l);
    }
    var r = 0, o = setInterval(() => {
      r++;
      var l = localStorage.getItem("mendToken");
      if (l && l !== "DEMO_MODE_TOKEN") {
        clearInterval(o), typeof t == "function" && t(l);
        return;
      }
      r > 180 && clearInterval(o);
    }, 1e3);
  }
}
class Vt {
  /**
   * @param {any} router
   */
  constructor(t) {
    this._router = t, this._onAuthorized = function() {
    }, this._onOpen = function() {
    };
  }
  init() {
    var t = this;
    G.info("LOGIN_PAGE_INIT", {}), window.onSignInClick = function() {
      G.info("CLICK_SIGN_IN", {}), t._openInAppModalAuth();
    }, window.onDemoModeClick = function() {
      G.info("CLICK_DEMO_MODE", {}), t._startDemoMode();
    }, window.onConnectTokenClick = function() {
      var s = (
        /** @type {HTMLInputElement} */
        document.getElementById("tokenField")
      );
      s && s.value && t._applyManualToken(s.value);
    };
    var i = {
      onOpen: function(r) {
        return t._onOpen = r, i;
      },
      onAuthorized: function(r) {
        return t._onAuthorized = r, i;
      }
    }, n = this._getToken();
    return n ? (G.info("CACHED_TOKEN_FOUND", {}), t._hide(), setTimeout(() => t._onAuthorized(), 0), i) : (t._show(), setTimeout(() => {
      we.hide(), t._onOpen();
    }, 0), i);
  }
  _startDemoMode() {
    this._saveToken("DEMO_MODE_TOKEN"), this._hide(), this._onAuthorized();
  }
  _openInAppModalAuth() {
    var t = this;
    Rt.openModalAuth((i) => {
      t._saveToken(i), t._hide(), t._onAuthorized();
    }, (i) => {
      console.error("Auth error:", i);
    });
  }
  _applyManualToken(t) {
    if (!(!t || !t.trim())) {
      var i = t.trim();
      if (i.startsWith("Bearer ") && (i = i.slice(7).trim()), i.includes("access_token=")) {
        var n = i.match(/access_token=([^&]+)/);
        n && n[1] && (i = n[1]);
      }
      this._saveToken(i), this._hide(), this._onAuthorized();
    }
  }
  _hide() {
    we.hide(), this._router.openMain();
  }
  _show() {
    we.hide(), this._router.openLogin();
  }
  _getToken() {
    var t = localStorage.getItem("mendToken"), i = localStorage.getItem("mendTokenExpiresAt");
    return !t || !i || Date.now() > Number(i) ? null : t;
  }
  _saveToken(t) {
    localStorage.setItem("mendToken", t), localStorage.setItem("mendTokenExpiresAt", String(Date.now() + 720 * 60 * 60 * 1e3));
  }
  getAuthFlow() {
    var t = this;
    return {
      authenticate: () => this._show(),
      getToken: () => t._getToken(),
      refreshToken: () => !1
    };
  }
}
function U(e) {
  try {
    return window.Asc.plugin.tr(e);
  } catch (t) {
    return console.error(t), e;
  }
}
var Ae = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakSet();
class Ut {
  /**
   * @param {string} citPrefix
   * @param {string} bibPrefix
   */
  constructor(t, i) {
    re(this, L), T(this, Ae, void 0), T(this, Q, void 0), E(Ae, this, t), E(Q, this, i);
  }
  /**
   * @param {string} text
   * @returns {Promise<string>}
   */
  addBibliography(t) {
    var i = this;
    return S(function* () {
      var n = {
        Tag: a(Q, i),
        Lock: 3,
        // can edit
        PlaceHolderText: ""
      };
      return yield c(L, i, Ee).call(i, n, 1), c(L, i, ut).call(i, t);
    })();
  }
  /**
   * @param {string} text
   * @param {string} tag
   * @param {NoteStyle | null} notesStyle
   * @returns {Promise<string>}
   */
  addCitation(t, i, n) {
    var s = this;
    return S(function* () {
      var r = {
        Tag: i,
        Lock: 3,
        // can edit
        PlaceHolderText: ""
      };
      yield c(L, s, Ee).call(s, r);
      var o = n && ["footnotes", "endnotes"].indexOf(n) !== -1, l = yield new Promise((h) => {
        Asc.scope.bAddNote = o, Asc.plugin.callCommand(() => {
          var f = Api.GetDocument(), _ = f.GetCurrentContentControl();
          return Asc.scope.bAddNote && (_.AddText(""), _.Select()), _.GetInternalId();
        }, !1, !1, h);
      });
      return o && (yield c(L, s, Ue).call(s, n)), yield c(L, s, de).call(s, t), l;
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<Array<ContentControlProperties>>}
   */
  getAddinMendeleyControls(t) {
    var i = this;
    return S(function* () {
      try {
        for (var n = yield c(L, i, Wt).call(i), s = [], r = [], o = 0; o < n.length; o++) {
          var l = n[o], h = l.Tag.indexOf(a(Ae, i)) !== -1, f = l.Tag.indexOf(a(Q, i)) !== -1;
          (h || f) && (s.push(l), r.push(l.InternalId));
        }
        Asc.scope.internalIds = r, Asc.scope.useParagraph = !!t;
        var _ = yield new Promise((d) => Asc.plugin.callCommand(() => {
          var p = [], m = Api.GetDocument(), I = m.GetAllContentControls();
          return I.forEach((A) => {
            var C = A.GetInternalId(), b = Asc.scope.internalIds.indexOf(C);
            if (b !== -1) {
              var B;
              Asc.scope.useParagraph ? B = A.GetParentParagraph() : B = A.GetRange(0, Number.MAX_SAFE_INTEGER);
              var O = B.GetText();
              O = O.trim(), p[b] = O;
            }
          }), p;
        }, !1, !1, d));
        return s.forEach((d, p) => {
          _[p] && (d.PlaceHolderText = _[p]);
        }), s;
      } catch (d) {
        return console.error(d), [];
      }
    })();
  }
  /**
   * For old version of Mendeley
   * @returns {Promise<Array<AddinFieldData>>}
   */
  getAddinMendeleyFields() {
    var t = this;
    return S(function* () {
      try {
        var i = yield c(L, t, Gt).call(t);
        return i.length && (i = i.filter((n) => n.Value.indexOf("CSL_CITATION") === 0 || n.Value.indexOf("Mendeley Bibliography") === 0)), i;
      } catch (n) {
        return console.error(n), [];
      }
    })();
  }
  /**
   * @returns {Promise<ContentControlProperties | null>}
   */
  getCurrentContentControlPr() {
    return S(function* () {
      return new Promise(function(t, i) {
        window.Asc.plugin.executeMethod("GetCurrentContentControlPr", void 0, t);
      });
    })();
  }
  /**
   * @param {Array<string>} controlInternalIds
   * @param {string} notesStyle
   * @returns {Promise<Array<any>>}
   */
  getFootnotesControls(t, i) {
    return S(function* () {
      return new Promise((n) => {
        Asc.scope.notesStyle = i, Asc.scope.controlInternalIds = t, window.Asc.plugin.callCommand(function() {
          var s = new Array(Asc.scope.controlInternalIds.length), r = Api.GetDocument(), o = [];
          Asc.scope.notesStyle === "footnotes" ? o = r.GetFootnotesFirstParagraphs() : o = r.GetEndNotesFirstParagraphs();
          for (var l = 0; l < o.length; l++) {
            var h = o[l];
            h.Select();
            var f = r.GetCurrentFootEndnote();
            if (f) {
              var _ = f.SelectNoteReference();
              if (_) {
                var d = r.GetCurrentContentControl();
                if (d) {
                  var p = d.GetInternalId(), m = Asc.scope.controlInternalIds.indexOf(p);
                  m !== -1 && (s[m] = f.GetText().trim());
                }
              }
            }
          }
          return s;
        }, !1, !1, n);
      });
    })();
  }
  /** @returns {Promise<boolean>} */
  saveAsText() {
    return new Promise((t) => {
      Asc.scope.citPrefix = a(Ae, this), Asc.scope.bibPrefix = a(Q, this), window.Asc.plugin.callCommand(function() {
        var i = Api.GetDocument(), n = i.GetAllContentControls();
        !n || n.length === 0 || n.forEach((s) => {
          var r = s.GetTag();
          (r.indexOf(Asc.scope.citPrefix) === 0 || r.indexOf(Asc.scope.bibPrefix) === 0) && s.Delete(!0);
        });
      }, !1, !1, t);
    });
  }
  /**
   * @param {Array<ContentControlProperties>} controls
   * @returns {Promise<Array<string>>}
   */
  updateContentControls(t) {
    var i = this;
    return S(function* () {
      var n = t.map((d) => d.InternalId || ""), s = t.filter((d) => d.Tag && d.Tag.indexOf(a(Q, i)) === 0);
      if (s.length) {
        t = t.filter((d) => d.Tag && d.Tag.indexOf(a(Q, i)) !== 0);
        var r = s[0], o = r.InternalId;
        o && (yield new Promise(function(d) {
          window.Asc.plugin.executeMethod("SelectContentControl", [o], d);
        }));
        var l = r.PlaceHolderText || "";
        yield c(L, i, ut).call(i, l);
      }
      for (var h = function* (p) {
        var m = t[p].InternalId;
        if (!m)
          return console.error("Content control without ID found"), 0;
        yield new Promise(function(A) {
          window.Asc.plugin.executeMethod("SelectContentControl", [m], A);
        });
        var I = t[p].Tag;
        if (yield new Promise((A) => {
          Asc.scope.tag = I, Asc.scope.id = t[p].InternalId, Asc.scope.placeholderText = t[p].PlaceHolderText, Asc.plugin.callCommand(() => {
            var C = Api.GetDocument(), b = C.GetCurrentContentControl();
            b ? (b.SetTag(Asc.scope.tag), Asc.scope.placeholderText && b.SetPlaceholderText("")) : console.error("Content control not found for ID:", Asc.scope.id);
          }, !1, !1, A);
        }), !t[p].PlaceHolderText)
          return 0;
        yield c(L, i, de).call(i, t[p].PlaceHolderText);
      }, f, _ = 0; _ < t.length; _++)
        f = yield* h(_);
      return n;
    })();
  }
  /**
   * When the user upgrades the plugin version, the citations are converted to the new format.
   * @param {{field: AddinFieldData, newValue: string}[]} fieldsWithCitations
   * @param {AddinFieldData} [bibField]
   * @returns {Promise<void>}
   */
  upgradeCslItems(t, i) {
    var n = this;
    return S(function* () {
      for (var s = 0; s < t.length; s++) {
        var r = t[s].field, o = t[s].newValue;
        yield c(L, n, ht).call(n, r.FieldId);
        var l = {
          Tag: o,
          Lock: 3,
          // can edit
          PlaceHolderText: ""
        };
        yield c(L, n, Ee).call(n, l), yield c(L, n, ct).call(n, r.FieldId);
      }
      if (i) {
        yield c(L, n, ht).call(n, i.FieldId);
        var h = {
          Tag: a(Q, n),
          Lock: 3,
          // can edit
          PlaceHolderText: ""
        };
        yield c(L, n, Ee).call(n, h, 1), yield c(L, n, ct).call(n, i.FieldId);
      }
    })();
  }
  /**
   * @param {Array<ContentControlProperties>} controls
   * @returns {Promise<void>}
   */
  convertNotesToText(t) {
    var i = this;
    return S(function* () {
      for (var n = function* () {
        var l = t[r];
        if (!l.InternalId)
          return console.error("Control id is not defined"), 0;
        var h = yield c(L, i, We).call(i, l.InternalId);
        if (!h)
          return console.error("Can not select content control with id: " + l.InternalId), 0;
        yield c(L, i, Dt).call(i), yield new Promise((_) => {
          Asc.scope.tag = l.Tag, Asc.plugin.callCommand(() => {
            var d = Api.GetDocument(), p = d.GetCurrentContentControl();
            p ? p.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, _);
        }), yield c(L, i, Ge).call(i);
        var f = l.PlaceHolderText;
        yield c(L, i, de).call(i, f);
      }, s, r = 0; r < t.length; r++)
        s = yield* n();
    })();
  }
  /**
   * @param {Array<ContentControlProperties>} controls
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertTextToNotes(t, i) {
    var n = this;
    return S(function* () {
      for (var s = function* () {
        var h = t[o];
        if (!h.InternalId) return 0;
        var f = yield c(L, n, We).call(n, h.InternalId);
        if (!f) return 0;
        yield new Promise((d) => {
          Asc.scope.tag = h.Tag, Asc.plugin.callCommand(() => {
            var p = Api.GetDocument(), m = p.GetCurrentContentControl();
            m ? m.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, d);
        }), yield c(L, n, Ge).call(n), yield c(L, n, Ue).call(n, i);
        var _ = h.PlaceHolderText;
        yield c(L, n, de).call(n, _);
      }, r, o = 0; o < t.length; o++)
        r = yield* s();
    })();
  }
  /**
   * @param {Array<ContentControlProperties>} controls
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertNotesStyle(t, i) {
    var n = this;
    return S(function* () {
      for (var s = function* () {
        var h = t[o];
        if (!h.InternalId)
          return console.error("Control id is not defined"), 0;
        var f = yield c(L, n, We).call(n, h.InternalId);
        if (!f)
          return console.error("Can not select content control with id: " + h.InternalId), 0;
        yield new Promise((_) => {
          Asc.scope.tag = h.Tag, Asc.plugin.callCommand(() => {
            var d = Api.GetDocument(), p = d.GetCurrentContentControl();
            p ? p.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, _);
        }), h.PlaceHolderText && (yield c(L, n, Ge).call(n), yield c(L, n, Ue).call(n, i), yield c(L, n, de).call(n, h.PlaceHolderText));
      }, r, o = 0; o < t.length; o++)
        r = yield* s();
    })();
  }
  /**
   * @param {string} internalId
   * @returns {Promise<void>}
  */
  moveCursorOutsideControl(t) {
    return S(function* () {
      yield new Promise((i) => {
        Asc.scope.internalId = t, Asc.plugin.callCommand(() => {
          var n = !0, s = Api.GetDocument(), r = s.GetAllContentControls().find((o) => o.GetInternalId() === Asc.scope.internalId);
          r && r.MoveCursorOutside(n);
        }, !1, !1, i);
      });
    })();
  }
}
function Ee(e, t) {
  return new Promise(function(i) {
    typeof t != "number" && (t = 2), window.Asc.plugin.executeMethod("AddContentControl", [t, e], i);
  });
}
function Ue(e) {
  return Asc.scope.notesStyle = e, new Promise((t) => {
    Asc.plugin.callCommand(() => {
      var i = Api.GetDocument();
      Asc.scope.notesStyle === "footnotes" ? i.AddFootnote() : Asc.scope.notesStyle === "endnotes" && i.AddEndnote();
    }, !1, !1, t);
  });
}
function Gt() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
  });
}
function Wt() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllContentControls", void 0, e);
  });
}
function de(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("PasteHtml", [e], t);
  });
}
function ct(e) {
  return new Promise((t) => {
    window.Asc.plugin.executeMethod("RemoveFieldWrapper", [e], t);
  });
}
function Ge() {
  return new Promise((e) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
  });
}
function ht(e) {
  return new Promise(function(t) {
    var i = window.Asc.scope.editorVersion;
    i && i < 9003e3 && (console.error("Cannot select addin field."), console.error("Editor version is less than 9.3.0"), t(!1)), window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
  });
}
function We(e) {
  return new Promise((t) => {
    Asc.scope.id = e, Asc.plugin.callCommand(() => {
      var i = Api.GetDocument(), n = i.GetAllContentControls(), s = n.find((r) => r.GetInternalId() === Asc.scope.id);
      return s ? s.Select() : !1;
    }, !1, !1, t);
  });
}
function Dt() {
  return new Promise(function(e) {
    var t = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, t, e);
  });
}
function ut(e) {
  return qe.apply(this, arguments);
}
function qe() {
  return qe = S(function* (e) {
    var t = new DOMParser(), i = t.parseFromString(e, "text/html"), n = i.querySelectorAll(".csl-entry"), s = new Array(n.length);
    return n.forEach((r, o) => {
      var l = r.querySelector(".csl-left-margin"), h = r.querySelector(".csl-right-inline");
      if (h == null || h.replaceWith(...h.childNodes), l && (s[o] = l.textContent.trim(), l.remove()), r.parentNode) {
        var f = document.createElement("p");
        f.innerHTML = r.innerHTML, r.parentNode.replaceChild(f, r);
      }
    }), e = i.body.innerHTML, yield c(L, this, de).call(this, e), new Promise((r) => {
      var o = !0, l = !1;
      Asc.scope.numbers = s, Asc.plugin.callCommand(() => {
        var h = Api.GetDocument(), f = h.GetCurrentContentControl(), _ = f.GetRange(0, Number.MAX_SAFE_INTEGER);
        if (_) {
          var d = Asc.scope.bibStyle;
          if (d) {
            var p = _.GetAllParagraphs();
            return p.forEach((m, I) => {
              var A = m.GetText().trim();
              if (A !== "")
                if (typeof d.linespacing == "number" && m.SetSpacingLine(240 * d.linespacing, "exact"), typeof d.entryspacing == "number" && m.SetSpacingAfter(240 * d.entryspacing), d["second-field-align"]) {
                  var C = Api.CreateRun();
                  C.AddText(Asc.scope.numbers[I]), C.AddTabStop();
                  var b = 0;
                  m.AddElement(C, b), m.SetIndLeft(d.maxoffset * 120), m.SetIndFirstLine(-(d.maxoffset * 120));
                } else d.hangingindent && (m.SetIndLeft(720), m.SetIndFirstLine(-720));
            }), f.GetInternalId();
          }
        }
      }, l, o, r);
    }).then((r) => (Asc.scope.bibStyle = null, r));
  }), qe.apply(this, arguments);
}
var se = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakSet();
class zt {
  constructor() {
    re(this, dt), T(this, se, void 0), T(this, z, void 0), T(this, D, void 0), E(se, this, []), E(z, this, []), E(D, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(t) {
    t = t.toString();
    var i = a(z, this).indexOf(t);
    return i >= 0 ? a(se, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(t) {
    return t = t.toString(), a(z, this).indexOf(t);
  }
  clear() {
    return E(se, this, []), E(D, this, []), E(z, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(t) {
    t = t.toString();
    var i = a(z, this).indexOf(t);
    return i >= 0 && (a(se, this).splice(i, 1), a(z, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(t) {
    for (var i = 0; i < this.size; i++)
      t(a(se, this)[i], a(z, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(t) {
    return t = t.toString(), a(z, this).indexOf(t) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(t) {
    return a(D, this).push(t), t.setNoteIndex(a(D, this).length), t.getCitationItems().forEach((i) => {
      c(dt, this, Kt).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return a(D, this).map((t) => t.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(t) {
    return a(D, this).find((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(t) {
    return a(D, this).findIndex((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(t) {
    var i = [];
    return a(D, this).find((n, s) => n.citationID === t ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(t) {
    for (var i = [], n = this.getCitationIndex(t), s = n + 1; s < a(D, this).length; s++) {
      var r = a(D, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function Kt(e, t) {
  e = e.toString();
  var i = a(z, this).indexOf(e);
  return i >= 0 ? (a(se, this)[i] = t, this) : (a(se, this).push(t), a(z, this).push(e), this.size++, this);
}
function u(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItemData: id is required");
  this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
u.prototype._addCustomProperty = function(e, t) {
  return this._custom[e] = t, this;
};
u.prototype.getCustomProperty = function(e) {
  return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
};
u.prototype.fillFromObject = function(e) {
  if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "version") && (this._version = e.version), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
    var t = this;
    e.creators.forEach(function(i) {
      var n = {};
      i.firstName && (n.given = i.firstName), i.lastName && (n.family = i.lastName);
      var s = t._author.some(function(r) {
        return !(r.family !== n.family && (r.family || n.family) || r.given !== n.given && (r.given || n.given));
      });
      s || t._author.push(n);
    }, this);
  }
  Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
};
u.prototype.getTitle = function() {
  return this._title;
};
u.prototype.getType = function() {
  return this._type;
};
u.prototype.setType = function(e) {
  return this._type = e, this;
};
u.prototype.setCitationKey = function(e) {
  return this._citationKey = e, this;
};
u.prototype.setCategories = function(e) {
  return this._categories = e, this;
};
u.prototype.setLanguage = function(e) {
  return this._language = e, this;
};
u.prototype.setJournalAbbreviation = function(e) {
  return this._journalAbbreviation = e, this;
};
u.prototype.setShortTitle = function(e) {
  return this._shortTitle = e, this;
};
u.prototype.setAuthor = function(e) {
  return this._author = Array.isArray(e) ? e : [e], this;
};
u.prototype.setChair = function(e) {
  return this._chair = Array.isArray(e) ? e : [e], this;
};
u.prototype.setCollectionEditor = function(e) {
  return this._collectionEditor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setCompiler = function(e) {
  return this._compiler = Array.isArray(e) ? e : [e], this;
};
u.prototype.setComposer = function(e) {
  return this._composer = Array.isArray(e) ? e : [e], this;
};
u.prototype.setContainerAuthor = function(e) {
  return this._containerAuthor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setContributor = function(e) {
  return this._contributor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setCurator = function(e) {
  return this._curator = Array.isArray(e) ? e : [e], this;
};
u.prototype.setDirector = function(e) {
  return this._director = Array.isArray(e) ? e : [e], this;
};
u.prototype.setEditor = function(e) {
  return this._editor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setEditorialDirector = function(e) {
  return this._editorialDirector = Array.isArray(e) ? e : [e], this;
};
u.prototype.setExecutiveProducer = function(e) {
  return this._executiveProducer = Array.isArray(e) ? e : [e], this;
};
u.prototype.setGuest = function(e) {
  return this._guest = Array.isArray(e) ? e : [e], this;
};
u.prototype.setHost = function(e) {
  return this._host = Array.isArray(e) ? e : [e], this;
};
u.prototype.setIllustrator = function(e) {
  return this._illustrator = Array.isArray(e) ? e : [e], this;
};
u.prototype.setNarrator = function(e) {
  return this._narrator = Array.isArray(e) ? e : [e], this;
};
u.prototype.setOrganizer = function(e) {
  return this._organizer = Array.isArray(e) ? e : [e], this;
};
u.prototype.setOriginalAuthor = function(e) {
  return this._originalAuthor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setPerformer = function(e) {
  return this._performer = Array.isArray(e) ? e : [e], this;
};
u.prototype.setProducer = function(e) {
  return this._producer = Array.isArray(e) ? e : [e], this;
};
u.prototype.setRecipient = function(e) {
  return this._recipient = Array.isArray(e) ? e : [e], this;
};
u.prototype.setReviewedAuthor = function(e) {
  return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
};
u.prototype.setScriptwriter = function(e) {
  return this._scriptwriter = Array.isArray(e) ? e : [e], this;
};
u.prototype.setSeriesCreator = function(e) {
  return this._seriesCreator = Array.isArray(e) ? e : [e], this;
};
u.prototype.setTranslator = function(e) {
  return this._translator = Array.isArray(e) ? e : [e], this;
};
u.prototype.setAccessed = function(e) {
  return this._accessed = e || {}, this;
};
u.prototype.setContainer = function(e) {
  return this._container = e || {}, this;
};
u.prototype.setEventDate = function(e) {
  return this._eventDate = e || {}, this;
};
u.prototype.setIssued = function(e) {
  return this._issued = e || {}, this;
};
u.prototype.setOriginalDate = function(e) {
  return this._originalDate = e || {}, this;
};
u.prototype.setSubmitted = function(e) {
  return this._submitted = e || {}, this;
};
u.prototype.setAbstract = function(e) {
  return this._abstract = e, this;
};
u.prototype.setAnnote = function(e) {
  return this._annote = e, this;
};
u.prototype.setArchive = function(e) {
  return this._archive = e, this;
};
u.prototype.setArchiveCollection = function(e) {
  return this._archiveCollection = e, this;
};
u.prototype.setArchiveLocation = function(e) {
  return this._archiveLocation = e, this;
};
u.prototype.setArchivePlace = function(e) {
  return this._archivePlace = e, this;
};
u.prototype.setAuthority = function(e) {
  return this._authority = e, this;
};
u.prototype.setCallNumber = function(e) {
  return this._callNumber = e, this;
};
u.prototype.setChapterNumber = function(e) {
  return this._chapterNumber = e, this;
};
u.prototype.setCitationNumber = function(e) {
  return this._citationNumber = e, this;
};
u.prototype.setCitationLabel = function(e) {
  return this._citationLabel = e, this;
};
u.prototype.setCollectionNumber = function(e) {
  return this._collectionNumber = e, this;
};
u.prototype.setCollectionTitle = function(e) {
  return this._collectionTitle = e, this;
};
u.prototype.setContainerTitle = function(e) {
  return this._containerTitle = e, this;
};
u.prototype.setContainerTitleShort = function(e) {
  return this._containerTitleShort = e, this;
};
u.prototype.setDimensions = function(e) {
  return this._dimensions = e, this;
};
u.prototype.setDOI = function(e) {
  return this._DOI = e, this;
};
u.prototype.setEdition = function(e) {
  return this._edition = e, this;
};
u.prototype.setEvent = function(e) {
  return this._event = e, this;
};
u.prototype.setEventTitle = function(e) {
  return this._eventTitle = e, this;
};
u.prototype.setEventPlace = function(e) {
  return this._eventPlace = e, this;
};
u.prototype.setFirstReferenceNoteNumber = function(e) {
  return this._firstReferenceNoteNumber = e, this;
};
u.prototype.setGenre = function(e) {
  return this._genre = e, this;
};
u.prototype.setISBN = function(e) {
  return this._ISBN = e, this;
};
u.prototype.setISSN = function(e) {
  return this._ISSN = e, this;
};
u.prototype.setIssue = function(e) {
  return this._issue = e, this;
};
u.prototype.setJurisdiction = function(e) {
  return this._jurisdiction = e, this;
};
u.prototype.setKeyword = function(e) {
  return this._keyword = e, this;
};
u.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
u.prototype.setMedium = function(e) {
  return this._medium = e, this;
};
u.prototype.setNote = function(e) {
  return this._note = e, this;
};
u.prototype.setNumber = function(e) {
  return this._number = e, this;
};
u.prototype.setNumberOfPages = function(e) {
  return this._numberOfPages = e, this;
};
u.prototype.setNumberOfVolumes = function(e) {
  return this._numberOfVolumes = e, this;
};
u.prototype.setOriginalPublisher = function(e) {
  return this._originalPublisher = e, this;
};
u.prototype.setOriginalPublisherPlace = function(e) {
  return this._originalPublisherPlace = e, this;
};
u.prototype.setOriginalTitle = function(e) {
  return this._originalTitle = e, this;
};
u.prototype.setPage = function(e) {
  return this._page = e, this;
};
u.prototype.setPageFirst = function(e) {
  return this._pageFirst = e, this;
};
u.prototype.setPart = function(e) {
  return this._part = e, this;
};
u.prototype.setPartTitle = function(e) {
  return this._partTitle = e, this;
};
u.prototype.setPMCID = function(e) {
  return this._PMCID = e, this;
};
u.prototype.setPMID = function(e) {
  return this._PMID = e, this;
};
u.prototype.setPrinting = function(e) {
  return this._printing = e, this;
};
u.prototype.setPublisher = function(e) {
  return this._publisher = e, this;
};
u.prototype.setPublisherPlace = function(e) {
  return this._publisherPlace = e, this;
};
u.prototype.setReferences = function(e) {
  return this._references = e, this;
};
u.prototype.setReviewedGenre = function(e) {
  return this._reviewedGenre = e, this;
};
u.prototype.setReviewedTitle = function(e) {
  return this._reviewedTitle = e, this;
};
u.prototype.setScale = function(e) {
  return this._scale = e, this;
};
u.prototype.setSection = function(e) {
  return this._section = e, this;
};
u.prototype.setSource = function(e) {
  return this._source = e, this;
};
u.prototype.setStatus = function(e) {
  return this._status = e, this;
};
u.prototype.setTitle = function(e) {
  return this._title = e, this;
};
u.prototype.setTitleShort = function(e) {
  return this._titleShort = e, this;
};
u.prototype.setURL = function(e) {
  return this._URL = e, this;
};
u.prototype.setVersion = function(e) {
  return this._version = e, this;
};
u.prototype.setVolume = function(e) {
  return this._volume = e, this;
};
u.prototype.setVolumeTitle = function(e) {
  return this._volumeTitle = e, this;
};
u.prototype.setVolumeTitleShort = function(e) {
  return this._volumeTitleShort = e, this;
};
u.prototype.setYearSuffix = function(e) {
  return this._yearSuffix = e, this;
};
u.prototype.setCustom = function(e) {
  return this._custom = Object.assign(this._custom, e), this;
};
u.prototype.toJSON = function() {
  var e = {};
  return e.id = this._id, this._type !== void 0 && this._type !== "" && (e.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (e["citation-key"] = this._citationKey), this._categories.length > 0 && (e.categories = this._categories), this._language !== void 0 && this._language !== "" && (e.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (e.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (e.shortTitle = this._shortTitle, this._titleShort === void 0 && (e["title-short"] = this._shortTitle)), this._author.length > 0 && (e.author = this._author), this._chair.length > 0 && (e.chair = this._chair), this._collectionEditor.length > 0 && (e["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (e.compiler = this._compiler), this._composer.length > 0 && (e.composer = this._composer), this._containerAuthor.length > 0 && (e["container-author"] = this._containerAuthor), this._contributor.length > 0 && (e.contributor = this._contributor), this._curator.length > 0 && (e.curator = this._curator), this._director.length > 0 && (e.director = this._director), this._editor.length > 0 && (e.editor = this._editor), this._editorialDirector.length > 0 && (e["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (e["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (e.guest = this._guest), this._host.length > 0 && (e.host = this._host), this._illustrator.length > 0 && (e.illustrator = this._illustrator), this._narrator.length > 0 && (e.narrator = this._narrator), this._organizer.length > 0 && (e.organizer = this._organizer), this._originalAuthor.length > 0 && (e["original-author"] = this._originalAuthor), this._performer.length > 0 && (e.performer = this._performer), this._producer.length > 0 && (e.producer = this._producer), this._recipient.length > 0 && (e.recipient = this._recipient), this._reviewedAuthor.length > 0 && (e["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (e["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (e["series-creator"] = this._seriesCreator), this._translator.length > 0 && (e.translator = this._translator), Object.keys(this._accessed).length > 0 && (e.accessed = this._accessed), Object.keys(this._container).length > 0 && (e.container = this._container), Object.keys(this._eventDate).length > 0 && (e["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (e.issued = this._issued), Object.keys(this._originalDate).length > 0 && (e["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (e.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (e.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (e.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (e.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (e.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (e.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (e["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (e.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (e["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (e["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (e["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (e["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (e["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (e["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (e["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (e["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (e.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (e.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (e.edition = this._edition), this._event !== void 0 && this._event !== "" && (e.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (e["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (e["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (e["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (e.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (e.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (e.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (e.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (e.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (e.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (e.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (e.medium = this._medium), this._note !== void 0 && this._note !== "" && (e.note = this._note), this._number !== void 0 && this._number !== "" && (e.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (e["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (e["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (e["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (e["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (e["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (e.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (e["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (e.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (e["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (e.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (e.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (e.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (e.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (e["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (e.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (e["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (e["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (e.scale = this._scale), this._section !== void 0 && this._section !== "" && (e.section = this._section), this._source !== void 0 && this._source !== "" && (e.source = this._source), this._status !== void 0 && this._status !== "" && (e.status = this._status), this._title !== void 0 && this._title !== "" && (e.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (e["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (e.URL = this._URL), this._version !== void 0 && this._version !== "" && (e.version = this._version), this._volume !== void 0 && this._volume !== "" && (e.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (e["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (e["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (e["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0 && (e.custom = this._custom), this._license !== void 0 && this._license !== "" && (e.license = this._license), e;
};
function F(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItem: id is required");
  this.id = e, this._itemData = new u(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
F.prototype.fillFromObject = function(e) {
  var t = this;
  Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(i) {
    t.addUri(i);
  }, this);
};
F.prototype.getInfoForCitationCluster = function() {
  var e = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
};
F.prototype.getItemData = function() {
  return this._itemData;
};
F.prototype.getProperty = function(e) {
  return this._itemData.getCustomProperty(e) !== null ? this._itemData.getCustomProperty(e) : null;
};
F.prototype.setPrefix = function(e) {
  return this._prefix = e, this;
};
F.prototype.setSuffix = function(e) {
  return this._suffix = e, this;
};
F.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
F.prototype.setLabel = function(e) {
  if (e) {
    var t = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (t.indexOf(e) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + e + '"');
    this._label = e;
  }
  return this;
};
F.prototype.setSuppressAuthor = function(e) {
  return this._suppressAuthor = e, this;
};
F.prototype.setAuthorOnly = function(e) {
  return this._authorOnly = e, this;
};
F.prototype.addUri = function(e) {
  return this._uris.indexOf(e) !== -1 ? this : (this._uris.push(e), this);
};
F.prototype.toJSON = function() {
  var e = {};
  return e.id = this.id, this._itemData && (e.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData), this._prefix !== void 0 && (e.prefix = this._prefix), this._suffix !== void 0 && (e.suffix = this._suffix), this._locator !== void 0 && (e.locator = this._locator), this._label !== void 0 && (e.label = this._label), this._suppressAuthor !== void 0 && (e["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (e["author-only"] = this._authorOnly), this._uris.length && (e.uris = this._uris), e;
};
F.prototype.toFlatJSON = function(e) {
  var t = {
    id: this.id,
    index: e
  };
  this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(t, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
var H = /* @__PURE__ */ new WeakSet();
class ve {
  /** @param {string} [citationID] */
  constructor(t) {
    re(this, H), t || (t = c(H, this, ft).call(this)), De._.has(t) && (console.warn("Citation ID must be unique"), t = c(H, this, ft).call(this)), De._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
  }
  static resetUsedIDs() {
    De._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? c(H, this, qt).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? c(H, this, Jt).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? c(H, this, Yt).call(this, t) : c(H, this, vt).call(this, t);
  }
  getCitationItems() {
    return this._citationItems;
  }
  /**
   * @returns {boolean}
   */
  getDoNotUpdate() {
    return Object.hasOwnProperty.call(this._properties, "dontUpdate") ? !!this._properties.dontUpdate : Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden") ? !!this._manualOverride.isManuallyOverridden : !1;
  }
  /**
   *
   * @returns {Array<InfoForCitationCluster>}
   */
  getInfoForCitationCluster() {
    return this._citationItems.map(function(t) {
      return t.getInfoForCitationCluster();
    }, this);
  }
  /** @returns {string} */
  getPlainCitation() {
    return Object.hasOwnProperty.call(this._properties, "plainCitation") ? String(this._properties.plainCitation) : this._manualOverride && Object.keys(this._manualOverride).length > 0 ? String(this._manualOverride.citeprocText) : "";
  }
  /**
   * @param {CitationItem} item
   * @returns
   */
  /**
   * @returns {CSLCitation}
   */
  setDoNotUpdate() {
    return c(H, this, Pe).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(t) {
    return c(H, this, Pe).call(this, {
      noteIndex: t
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(t) {
    return c(H, this, Pe).call(this, {
      plainCitation: t
    }), this;
  }
  /**
   * @param {string} citeprocText
   * @param {string} [manualOverrideText]
   * @returns
   */
  setManualOverride(t, i) {
    var n = {
      citeprocText: t,
      isManuallyOverridden: !!i,
      manualOverrideText: i || ""
    };
    return this._manualOverride = n, this;
  }
  /**
   * @param {Object<string, string | number | boolean>} properties
   * @returns
   */
  validate() {
    var t = [];
    if (this._schema || t.push("Schema is required"), this.citationID || t.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems))
      for (var i = 0; i < this._citationItems.length; i++)
        this._citationItems[i].id || t.push("Citation item at index " + i + " must have an id");
    return t.length === 0 ? !0 : t;
  }
  toJSON() {
    var t = (
      /** @type {any} */
      {
        citationID: this.citationID,
        schema: this._schema
      }
    );
    return this._properties && Object.keys(this._properties).length > 0 && (t.properties = this._properties), this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t.citationItems = this._citationItems.map(function(i) {
      return i.toJSON();
    })), t;
  }
}
function qt(e) {
  var t = this;
  if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && c(H, this, Pe).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return e.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = t._citationItems[i.indexOf(s)] : (r = new F(s), i.push(s)), typeof s == "number" && (s = c(H, t, $t).call(t, n)), r.fillFromObject(n), c(H, t, Xe).call(t, r);
  }, this), i.length;
}
function Jt(e) {
  var t = this;
  return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(i) {
    c(H, t, vt).call(t, i);
  }, this), 1);
}
function vt(e) {
  var t = e.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(t) >= 0 ? i = this._citationItems[n.indexOf(t)] : i = new F(t), i.fillFromObject(e), c(H, this, Xe).call(this, i), 1;
}
function Yt(e) {
  if (!Object.hasOwnProperty.call(e, "data"))
    return console.error("Invalid citation object"), 0;
  var t = this._citationItems.map(function(s) {
    return s.id;
  }), i = e.data.key, n;
  return t.indexOf(i) >= 0 ? n = this._citationItems[t.indexOf(i)] : n = new F(i), n.fillFromObject(e), c(H, this, Xe).call(this, n), 1;
}
function Xe(e) {
  var t = this._citationItems.map(function(i) {
    return i.id;
  });
  return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function Pe(e) {
  var t = this;
  return Object.keys(e).forEach(function(i) {
    Object.hasOwnProperty.call(e, i) && (t._properties[i] = e[i]);
  }, this), this;
}
function $t(e) {
  if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
    var t = e.uris[0].lastIndexOf("/");
    return e.uris[0].slice(t + 1);
  }
  return e.id;
}
function ft() {
  return Math.random().toString(36).substring(2, 15);
}
var De = {
  _: /* @__PURE__ */ new Set()
}, P = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakSet();
class Zt {
  constructor() {
    re(this, q), T(this, P, void 0), T(this, Me, void 0), T(this, Se, void 0), T(this, Be, void 0), E(P, this, null), E(Me, this, window.Asc.plugin.button), E(Se, this, Asc.plugin.onThemeChanged), E(Be, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(t, i) {
    a(P, this) && c(q, this, he).call(this), E(P, this, new window.Asc.PluginWindow());
    var n = {
      name: "Mendeley",
      url: "info-window.html",
      description: window.Asc.plugin.tr(t),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("Yes"),
        primary: !0,
        isViewer: !1
      }, {
        text: window.Asc.plugin.tr("No"),
        primary: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [380, 240],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(q, this, ze).call(this, n, i, "default"), a(P, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, l) => {
        s(o === 0), c(q, this, he).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(t) {
    var i = this;
    a(P, this) && c(q, this, he).call(this), E(P, this, new window.Asc.PluginWindow());
    var n = {
      name: "Mendeley",
      url: "edit-window.html",
      description: window.Asc.plugin.tr("Edit citation"),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("Save"),
        primary: !0,
        isViewer: !1
      }, {
        text: window.Asc.plugin.tr("Cancel"),
        primary: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [380, 150],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(q, this, ze).call(this, n, t, "default"), a(P, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = S(function* (l, h) {
          var f = yield new Promise((_) => {
            if (!a(P, i)) {
              _(null);
              return;
            }
            a(P, i).attachEvent("onSaveFields", _), a(P, i).command("onClickSave");
          });
          s(l === 0 ? f : null), c(q, i, he).call(i);
        });
        return function(l, h) {
          return o.apply(this, arguments);
        };
      })();
    });
  }
  /**
   * @param {string} description
   * @param {string} text
   * @param {"default" | "warning" | "success"} [type]
   */
  showInfoWindow(t, i, n) {
    a(P, this) && c(q, this, he).call(this), typeof n != "string" && (n = "warning"), E(P, this, new window.Asc.PluginWindow());
    var s = {
      name: "Mendeley",
      url: "info-window.html",
      description: window.Asc.plugin.tr(t),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("OK"),
        primary: !0,
        isViewer: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [350, 76],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(q, this, ze).call(this, s, window.Asc.plugin.tr(i), n), a(P, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (l, h) => {
        r(l === 0), c(q, this, he).call(this);
      };
    });
  }
}
function ze(e, t, i) {
  a(P, this) && (E(Me, this, window.Asc.plugin.button), E(Se, this, Asc.plugin.onThemeChanged), E(Be, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = a(P, this)) === null || s === void 0 || s.command("onThemeChanged", n), a(Se, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = a(P, this)) === null || n === void 0 || n.command("onTranslate"), a(Be, this).call(this);
  }, a(P, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = a(P, this)) === null || n === void 0 || n.command("onWarning", t);
    } else if (i === "success") {
      var s;
      (s = a(P, this)) === null || s === void 0 || s.command("onSuccess", t);
    } else {
      var r;
      (r = a(P, this)) === null || r === void 0 || r.command("onAttachedContent", t);
    }
  }), a(P, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = a(P, this)) === null || s === void 0 ? void 0 : s.id, [e.size[0] - 2, n]], () => {
    });
  }));
}
function he() {
  a(P, this) && (a(P, this).close(), E(P, this, null)), window.Asc.plugin.button = a(Me, this), window.Asc.plugin.onThemeChanged = a(Se, this);
}
var ie = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakSet();
class Xt {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   */
  constructor(t, i) {
    re(this, g), T(this, ie, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "MENDELEY_CITATION", this._bibPrefixNew = "MENDELEY_BIBLIOGRAPHY", this._localesManager = t, this._cslStylesManager = i, this._storage = new zt(), this._formatter, this.citationDocService = new Ut(this._citPrefixNew, this._bibPrefixNew), E(ie, this, new Zt());
  }
  /** @returns {Promise<string | "INCORRECT_CONTROL" | null>} */
  getCurrentContentControlTag() {
    var t = this;
    return S(function* () {
      var i = yield t.citationDocService.getCurrentContentControlPr();
      if (typeof i != "object" || i === null)
        return null;
      if (!Object.hasOwn(i, "Tag"))
        return "INCORRECT_CONTROL";
      var n = c(g, t, ke).call(t, i.Tag);
      return typeof n != "object" || !Object.hasOwn(n, "citationID") ? "INCORRECT_CONTROL" : i.Tag;
    })();
  }
  /**
   * @returns {Promise<boolean>}
   */
  saveAsText() {
    var t = this;
    return S(function* () {
      var i = yield t.citationDocService.saveAsText();
      return i ? yield t.showWarningMessage("Replace all active Mendeley citations and Bibliography failed") : yield t.showSuccessMessage("All active Mendeley citations and Bibliography have been replaced."), i;
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @returns {Promise<{internalId: string, notesStyle?: "footnotes" | "endnotes"}>}
   */
  insertSelectedCitations(t) {
    var i = this;
    return S(function* () {
      try {
        yield c(g, i, ee).call(i), c(g, i, te).call(i);
      } catch (o) {
        throw o;
      }
      var n = new ve("");
      for (var s in t) {
        var r = t[s];
        n.fillFromObject(r);
      }
      return i._storage.addCslCitation(n), c(g, i, jt).call(i, n);
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @param {string} currentControlTag
   * @returns {Promise<string>}
   */
  insertSelectedCitationsToCurrentControl(t, i) {
    var n = this;
    return S(function* () {
      var s, r = c(g, n, ke).call(n, i);
      if (typeof r != "object" || !Object.hasOwn(r, "citationID"))
        throw new Error("Invalid control tag");
      var o = r.citationID, l = new ve("");
      l.fillFromObject(r);
      for (var h in t) {
        var f = t[h];
        l.fillFromObject(f);
      }
      var {
        controlsWithCitations: _
      } = yield c(g, n, ee).call(n, l.toJSON(), o);
      c(g, n, te).call(n);
      var d = (s = _.find((m) => m.cslCitation.citationID === o)) === null || s === void 0 ? void 0 : s.cslCitation;
      if (!d)
        throw new Error("Citation not found");
      var p = JSON.stringify(d.toJSON());
      return p = c(g, n, He).call(n, p), p;
    })();
  }
  /** @returns {Promise<string>} */
  insertBibliography() {
    var t = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: i,
          bibControl: n
        } = yield c(g, t, ee).call(t), s = i.length === 0;
        if (c(g, t, te).call(t), n) {
          var r, o = [yield c(g, t, Le).call(t, s, n)], l = yield t.citationDocService.updateContentControls(o);
          return (r = l[0]) !== null && r !== void 0 ? r : "";
        } else
          return c(g, t, ti).call(t, s);
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {string} internalId
   * @returns {Promise<void>}
   */
  moveCursorOutsideControl(t) {
    var i = this;
    return S(function* () {
      return i.citationDocService.moveCursorOutsideControl(t);
    })();
  }
  /**
   * @param {boolean} [bHardRefresh]
   * @returns {Promise<void>}
   */
  updateCslItems(t) {
    var i = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: n,
          bibControl: s
        } = yield c(g, i, ee).call(i), r = n.length === 0;
        c(g, i, te).call(i);
        var o = [];
        if (typeof t > "u") {
          var l = i._cslStylesManager.getLastUsedFormat();
          l === "numeric" && (t = !0);
        }
        if (typeof t == "boolean" && (o = yield c(g, i, ye).call(i, n, t)), s && o.push(yield c(g, i, Le).call(i, r, s)), o && o.length)
          return i.citationDocService.updateContentControls(o);
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  updateCslItemsInNotes(t) {
    var i = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: n,
          bibControl: s
        } = yield c(g, i, ee).call(i), r = n.length === 0;
        c(g, i, te).call(i), yield c(g, i, xe).call(i, n, t);
        var o = yield c(g, i, ye).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, t)), s) {
          var l = [yield c(g, i, Le).call(i, r, s)];
          yield i.citationDocService.updateContentControls(l);
        }
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * Context menu "Edit citation"
   * @param {Object & {citationID: string}} updatedControl
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  updateItem(t, i) {
    var n = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: s,
          bibControl: r
        } = yield c(g, n, ee).call(n, t, t.citationID), o = s.length === 0;
        c(g, n, te).call(n), t && (s = s.filter(function(h) {
          return h.cslCitation.citationID === t.citationID;
        })), i && (yield c(g, n, xe).call(n, s, i));
        var l = yield c(g, n, ye).call(n, s, !0);
        if (i && l && l.length && (yield n.citationDocService.convertNotesStyle(l, i), l = []), l && l.length)
          return n.citationDocService.updateContentControls(l);
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes" | null} [newNotesStyle]
   * @param {"footnotes" | "endnotes" | null} [oldNotesStyle]
   * @returns {Promise<void>}
   */
  switchingBetweenNotesAndText(t, i) {
    var n = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: s,
          bibControl: r
        } = yield c(g, n, ee).call(n), o = s.length === 0;
        c(g, n, te).call(n), i && (yield c(g, n, xe).call(n, s, i));
        var l = yield c(g, n, ye).call(n, s, !0);
        if (l && l.length && (t ? yield n.citationDocService.convertTextToNotes(l, t) : i && (yield n.citationDocService.convertNotesToText(l))), r) {
          var h = [yield c(g, n, Le).call(n, o, r)];
          yield n.citationDocService.updateContentControls(h);
        }
      } catch (f) {
        throw f;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} newNotesStyle
   * @param {"footnotes" | "endnotes"} oldNotesStyle
   * @returns {Promise<void>}
   */
  convertNotesStyle(t, i) {
    var n = this;
    return S(function* () {
      try {
        var {
          controlsWithCitations: s
        } = yield c(g, n, ee).call(n, void 0, void 0, t);
        c(g, n, te).call(n), yield c(g, n, xe).call(n, s, i);
        var r = yield c(g, n, ye).call(n, s, !1, !0);
        if (!r || !r.length) return;
        yield n.citationDocService.convertNotesStyle(r, t);
      } catch (o) {
        throw o;
      }
    })();
  }
  /**
   * @param {AddinFieldData[]} arrFields
   * @returns {Promise<{fieldsWithCitations: {field: AddinFieldData, cslCitation: CSLCitation}[], bibField: AddinFieldData | undefined}>}
   */
  /**
   * @returns {Promise<boolean>}
   */
  checkOldVersion() {
    var t = this;
    return S(function* () {
      var i = !0, n = yield t.citationDocService.getAddinMendeleyFields();
      if (n.length && (i = !1), i)
        return !1;
      var s = yield a(ie, t).show("Update this document", "<p class='i18n'>" + U("Existing citations created with the Mendeley Desktop plugin are built using an old technology that is not compatible with Mendeley Cite. These citations have to be updated to start working with Mendeley Cite.") + "</p><p class='i18n'>" + U("Rest assured nothing has happened to your document or your citations.") + "</p><p class='i18n'>" + U("Press continue to be guided through the update process.") + "</p>");
      if (s) {
        var {
          fieldsWithCitations: r,
          bibField: o
        } = yield c(g, t, ii).call(t, n), l = r.map((h) => ({
          field: h.field,
          newValue: c(g, t, He).call(t, JSON.stringify(h.cslCitation.toJSON()))
        }));
        yield t.citationDocService.upgradeCslItems(l, o), a(ie, t).showInfoWindow("Update complete", U("Your document has been updated to use Mendeley Cite.") + " " + U("Please select the citation style and language for future citation formatting."), "success");
      } else
        Asc.plugin.executeCommand("close", "");
      return s;
    })();
  }
  /**
   * @param {string} controlTag
   * @returns {Promise<Object & {citationID: string} | null>}
   */
  showEditCitationWindow(t) {
    var i = this;
    return S(function* () {
      if (!t) return null;
      var n = c(g, i, ke).call(i, t), s = yield a(ie, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(t) {
    var i = this;
    return S(function* () {
      a(ie, i).showInfoWindow("Warning!", t);
    })();
  }
  /** @param {string} message */
  showSuccessMessage(t) {
    var i = this;
    return S(function* () {
      a(ie, i).showInfoWindow("Success!", t, "success");
    })();
  }
}
function jt(e) {
  var t = this, i = !1, n = t._cslStylesManager.getLastUsedFormat() === "note", s = null;
  return Promise.resolve().then(function() {
    if (e.getCitationItems().forEach(function(o) {
      t._storage.hasItem(o.id) || (i = !0);
    }), i) {
      var r = [];
      t._storage.forEachItem(function(o, l) {
        r.push(l);
      }), t._formatter.updateItems(r);
    }
  }).then(() => c(g, this, Qt).call(this, e)).then(function(r) {
    n && (s = t._cslStylesManager.getLastUsedNotesStyle());
    var o = JSON.stringify(e.toJSON());
    return o = c(g, t, He).call(t, o), t.citationDocService.addCitation(r, o, s);
  }).then(function(r) {
    var o = {
      internalId: r
    };
    return s && (o.notesStyle = s), o;
  });
}
function gt() {
  try {
    for (var e = new Array(this._storage.size), t = this._formatter.makeBibliography(), i = 0; i < t[1].length; i++) {
      var n = c(g, this, je).call(this, t[1][i]);
      n = n.replaceAll(`
`, "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
      var s = '<div class="csl-entry">', r = "</div>";
      t[0]["second-field-align"] ? n.indexOf(s) === 0 && n.endsWith(r) && (n = s + n.substring(s.length, n.length - r.length).trim() + r) : (n = n.replace(/<\/?div[^>]*>/g, ""), n = "<p>" + n + "</p>"), e.push(n);
    }
    var o = e.join("").trim();
    return Asc.scope.bibStyle = t[0], o;
  } catch (l) {
    if (this._cslStylesManager.isLastUsedStyleContainBibliography() === !1)
      this.showWarningMessage("Style does not describe the bibliography");
    else
      throw console.error(l), "Failed to apply this style.";
    return "";
  }
}
function Qt(e) {
  var t = document.createDocumentFragment(), i = document.createElement("div"), n = this._storage.getCitationsPre(e.citationID), s = this._storage.getCitationsPost(e.citationID), r = this._storage.getAllCitationsInJson();
  this._formatter.rebuildProcessorState(r);
  var o = this._formatter.processCitationCluster(e.toJSON(), n, s), l = c(g, this, je).call(this, o[1][0][1]);
  return t.appendChild(i), i.innerHTML = l, e.setPlainCitation(i.innerText), l;
}
function ke(e) {
  var t;
  if (e.indexOf(this._bibPrefixNew) !== -1)
    return {};
  var i = e.indexOf("_", this._citPrefixNew.length + 1) + 1;
  if (i > 0) {
    var n = e.slice(i);
    try {
      var s = atob(n), r;
      if (typeof TextDecoder < "u") {
        var o = Uint8Array.from(s, function(f) {
          return f.charCodeAt(0);
        });
        r = new TextDecoder("utf-8").decode(o);
      } else {
        for (var l = "", h = 0; h < s.length; h++)
          l += "%" + ("00" + s.charCodeAt(h).toString(16)).slice(-2);
        r = decodeURIComponent(l);
      }
      t = JSON.parse(r);
    } catch (f) {
      return console.error("Failed to extract citation", e), console.error(f), this.showWarningMessage("A citation in this document is corrupted and cannot be processed. Please remove or replace it."), {};
    }
  }
  return t;
}
function ei(e) {
  var t, i = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = e.Value.slice(i, n + 1);
    t = JSON.parse(s);
  }
  return t;
}
function ee(e, t, i) {
  var n = this;
  return this._storage.clear(), ve.resetUsedIDs(), this.citationDocService.getAddinMendeleyControls(i).then(function(s) {
    var r = s.find(function(h) {
      return h.Tag.indexOf(n._bibPrefixNew) !== -1;
    }), o = s.filter(function(h) {
      return h.Tag.indexOf(n._citPrefixNew) !== -1;
    }), l = o.map(function(h) {
      var f = c(g, n, ke).call(n, h.Tag), _ = f.citationID || "", d = new ve(_);
      return e && t === _ ? d.fillFromObject(e) : d.fillFromObject(f), n._storage.addCslCitation(d), {
        control: pe({}, h),
        cslCitation: d
      };
    });
    return {
      bibControl: r,
      controlsWithCitations: l
    };
  });
}
function ti(e) {
  var t = c(g, this, gt).call(this);
  if (e && (t = U(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(t);
  throw "The current bibliographic style does not describe the bibliography";
}
function He(e) {
  var t = "";
  if (typeof TextEncoder < "u") {
    for (var i = new TextEncoder().encode(e), n = "", s = 0; s < i.length; s++)
      n += String.fromCharCode(i[s]);
    t = btoa(n);
  } else
    t = btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(r, o) {
      return String.fromCharCode(parseInt(o, 16));
    }));
  return this._citPrefixNew + "_v3_" + t;
}
function Le(e, t) {
  if (e)
    t.PlaceHolderText = U(this._bibPlaceholderIfEmpty);
  else {
    var i = c(g, this, gt).call(this);
    t.PlaceHolderText = i;
  }
  return t;
}
function ye(e, t, i) {
  return Je.apply(this, arguments);
}
function Je() {
  return Je = S(function* (e, t, i) {
    var n = document.createDocumentFragment(), s = document.createElement("div");
    n.appendChild(s);
    for (var r = [], o = e.length - 1; o >= 0; o--) {
      var l = !!i, {
        control: h,
        cslCitation: f
      } = e[o], _ = this._storage.getCitationsPre(f.citationID), d = this._storage.getCitationsPost(f.citationID), p = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(p);
      var m = this._formatter.processCitationCluster(f.toJSON(), _, d), I = c(g, this, je).call(this, m[1][0][1]);
      s.innerHTML = I;
      var A = f.getPlainCitation(), C = h.PlaceHolderText;
      A === "" && (A = C);
      var b = s.innerText;
      if (!f.getDoNotUpdate()) {
        if (A !== C && !t) {
          var B = "<p>" + U("You have modified this citation since Mendeley generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + U("Clicking „Yes“ will prevent Mendeley from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + U("Original:") + " " + b + "</p><p>" + U("Modified:") + " " + C + "</p>", O = yield a(ie, this).show("Saving custom edits", B);
          O ? (f.setManualOverride(b, C), h.PlaceHolderText = "") : (h.PlaceHolderText = I, f.setManualOverride(b)), l = !0;
        } else
          (b !== C || A !== C || A !== b) && (l = !0), h.PlaceHolderText = I, f.setManualOverride(b);
        if (f) {
          var Z = JSON.stringify(f.toJSON());
          Z = c(g, this, He).call(this, Z), h.Tag !== Z && (l = !0), h.Tag = Z;
        }
        l && r.push(h);
      }
    }
    return r;
  }), Je.apply(this, arguments);
}
function te() {
  var e = this, t = [];
  this._storage.forEachItem(function(i, n) {
    t.push(n);
  }), this._formatter = new CSL.Engine({
    /** @param {string} id */
    retrieveLocale: function(n) {
      return e._localesManager.getLocale(n) ? e._localesManager.getLocale(n) : e._localesManager.getLocale();
    },
    /** @param {string} id */
    retrieveItem: function(n) {
      var s = e._storage.getItem(n), r = e._storage.getItemIndex(n);
      return s ? s.toFlatJSON(r) : null;
    }
  }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), !0), t.length && this._formatter.updateItems(t);
}
function je(e) {
  return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
function xe(e, t) {
  return Ye.apply(this, arguments);
}
function Ye() {
  return Ye = S(function* (e, t) {
    var i = e.map((s) => s.control.InternalId).filter((s) => typeof s == "string"), n = yield this.citationDocService.getFootnotesControls(i, t);
    return n.forEach((s, r) => {
      s && (e[r].control.PlaceHolderText = s);
    }), e;
  }), Ye.apply(this, arguments);
}
function ii(e) {
  return $e.apply(this, arguments);
}
function $e() {
  return $e = S(function* (e) {
    var t = this;
    this._storage.clear(), ve.resetUsedIDs();
    var i = e.find((s) => s.Value.indexOf("Mendeley Bibliography") === 0), n = e.filter((s) => !i || i.FieldId !== s.FieldId).map((s) => {
      var r = c(g, this, ei).call(this, s);
      r && r.citationItems && r.citationItems.forEach(function(l) {
        if (l.uris && l.uris.length) {
          var h = l.id;
          l.uris.some(
            /** @param {string} uri */
            (f) => {
              var _ = "?uuid=", d = f.indexOf(_);
              if (d === -1)
                return !1;
              var p = f.indexOf("&", d + _.length);
              return p === -1 ? (h = f.slice(d + _.length), !0) : (h = f.slice(d + _.length, p), !0);
            }
          ), l.id = h, l.itemData.id = h;
        }
      });
      var o = new ve();
      return o.fillFromObject(r), o.setManualOverride(s.Content), t._storage.addCslCitation(o), {
        field: pe({}, s),
        cslCitation: o
      };
    });
    return {
      bibField: i,
      fieldsWithCitations: n
    };
  }), $e.apply(this, arguments);
}
var Ce = {
  /**
   * Parse a style object to extract relevant information.
   * @param {string} name
   * @param {string} style - A style string
   * @returns {StyleInfo} An object containing the parsed style information.
   */
  getStyleInfo: function(t, i) {
    var n = new DOMParser(), s = n.parseFromString(i, "text/xml"), r = {
      categories: {
        fields: [],
        format: ""
      },
      dependent: 0,
      href: "",
      name: t,
      title: "",
      updated: ""
    }, o = s.querySelector("info title");
    o && (r.title = o.textContent);
    var l = s.querySelector('info link[rel="self"]');
    if (l) {
      var h = l.getAttribute("href");
      h && (r.href = h);
    }
    var f = s.querySelector('info link[rel="independent-parent"]');
    if (f) {
      var _ = f.getAttribute("href");
      _ && (r.parent = _), r.dependent = 1;
    }
    var d = s.querySelector("info updated");
    d && (r.updated = d.textContent);
    var p = s.querySelector("info category[citation-format]");
    if (p) {
      var m = p.getAttribute("citation-format");
      m && (r.categories.format = m);
    }
    var I = s.querySelectorAll("info category[field]");
    return I && I.forEach(function(A) {
      var C = A.getAttribute("field");
      C && r.categories.fields.push(C);
    }), r;
  },
  /**
   * @param {string} styleContent
   * @returns {StyleFormat}
   */
  getCitationFormat: function(t) {
    var i = new DOMParser(), n = i.parseFromString(t, "text/xml"), s = n.querySelector("info category[citation-format]");
    if (!s) throw new Error("Citation format not found");
    var r = s.getAttribute("citation-format");
    if (!r) throw new Error("Citation format not found");
    switch (r) {
      case "note":
      case "numeric":
      case "author":
      case "author-date":
      case "label":
        return r;
    }
    throw new Error("Invalid citation format");
  },
  /**
   * @param {string} styleContent
   * @returns {boolean}
   */
  isStyleContainBibliography: function(t) {
    return t.indexOf("<bibliography") > -1;
  }
};
function le() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
le.prototype.getStyleNames = function() {
  var e = localStorage.getItem(this._customStyleNamesKey);
  return e ? JSON.parse(e) : [];
};
le.prototype._getStyles = function() {
  var e = localStorage.getItem(this._customStylesKey);
  return e ? JSON.parse(e) : [];
};
le.prototype.getStyle = function(e) {
  var t = this.getStyleNames(), i = t.indexOf(e);
  return i === -1 ? null : this._getStyles()[i];
};
le.prototype.getStylesInfo = function() {
  for (var e = this.getStyleNames(), t = this._getStyles(), i = [], n = 0; n < e.length; n++) {
    var s = Ce.getStyleInfo(e[n], t[n]);
    i.push(s);
  }
  return i;
};
le.prototype.setStyle = function(e, t) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(e);
  return s === -1 && (s = i.length), i[s] = e, n[s] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), Ce.getStyleInfo(e, t);
};
le.prototype.deleteStyle = function(e) {
  var t = this.getStyleNames(), i = this._getStyles(), n = t.indexOf(e);
  return n === -1 || (t.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), e;
};
function M(e) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new le(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
M.prototype.addCustomStyle = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    var s = e.name.toLowerCase();
    s.slice(-4) === ".csl" || s.slice(-4) === ".xml" ? s = s.substring(0, s.length - 4).trim() : n("Please select a .csl or .xml file."), e.size > 1024 * 1024 && n("Maximum file size is 1 MB."), i(s);
  }).then(function(i) {
    return t._readCSLFile(e).then(function(n) {
      return t._defaultStyles.indexOf(i) === -1 && t._defaultStyles.push(i), t._customStylesStorage.setStyle(i, n);
    });
  });
};
M.prototype.getLastUsedFormat = function() {
  var e = localStorage.getItem(this._lastFormatKey);
  switch (e) {
    case "note":
    case "numeric":
    case "author":
    case "author-date":
    case "label":
      return e;
  }
  return "numeric";
};
M.prototype.getLastUsedNotesStyle = function() {
  var e = localStorage.getItem(this._lastNotesStyleKey);
  return e === "footnotes" || e === "endnotes" ? e : "footnotes";
};
M.prototype.getLastUsedStyleId = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || null;
};
M.prototype.getLastUsedStyleIdOrDefault = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || "ieee";
};
M.prototype.getStyle = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = this;
  return Promise.resolve(e).then(function(n) {
    if (i._cache[n])
      return i._cache[n];
    var s = i._customStylesStorage.getStyleNames();
    if (s.indexOf(n) !== -1)
      return i._customStylesStorage.getStyle(n);
    var r = i._STYLES_LOCAL + n + ".csl";
    if (i._isOnlineAvailable)
      r = i._STYLES_URL + n;
    else if (i._defaultStyles.indexOf(n) === -1)
      throw "The style is not available in the local version of the plugin.";
    return fetch(r).then(function(o) {
      return o.text();
    });
  }).then(function(n) {
    if (n && !i._isValidCSL(n) && i._isOnlineAvailable) {
      var s = Ce.getStyleInfo(e, n);
      if (s && s.dependent > 0 && s.parent)
        return fetch(s.parent).then(function(r) {
          return r.text();
        });
    }
    return n;
  }).then(function(n) {
    var s = n && Ce.getCitationFormat(n) || "numeric", r = {
      content: n,
      styleFormat: s
    };
    return n && t && i._saveLastUsedStyle(e, n, s), r;
  });
};
M.prototype.getStylesInfo = function() {
  var e = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
    var i = e.getLastUsedStyleId() || "ieee", n = [], s = e._customStylesStorage.getStyleNames(), r = t[0], o = t[1];
    return e._isDesktopAvailable && !e._isOnlineAvailable && (r = r.filter(function(l) {
      return e._defaultStyles.indexOf(l.name) >= 0 || l.name == i;
    })), o.forEach(function(l) {
      n.push(l), e._defaultStyles.indexOf(l.name) === -1 && e._defaultStyles.push(l.name);
    }), r.forEach(function(l) {
      s.indexOf(l.name) === -1 && n.push(l);
    }), n.sort((l, h) => l.name.localeCompare(h.name)), n;
  });
};
M.prototype._getStylesJson = function() {
  var e = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(t) {
    return t.json();
  });
};
M.prototype.cached = function(e) {
  return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
};
M.prototype.isLastUsedStyleContainBibliography = function() {
  var e = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return e !== "false";
};
M.prototype.isStyleDefault = function(e) {
  return this._defaultStyles.indexOf(e) >= 0;
};
M.prototype._isValidCSL = function(e) {
  return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
};
M.prototype._readCSLFile = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    var s = new FileReader();
    s.onload = function(r) {
      var o = r.target ? String(r.target.result) : "";
      if (!t._isValidCSL(o)) {
        n("The file is not a valid CSL file");
        return;
      }
      i(o);
    }, s.onerror = function() {
      n("Failed to read file");
    }, s.readAsText(e);
  });
};
M.prototype._saveLastUsedStyle = function(e, t, i) {
  this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, i);
  var n = Ce.isStyleContainBibliography(t);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
M.prototype.saveLastUsedNotesStyle = function(e) {
  localStorage.setItem(this._lastNotesStyleKey, e);
};
M.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
M.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function oe() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
oe.prototype.loadLocale = function(e) {
  var t = this;
  if (this._selectedLanguage = e, this._cache[e])
    return Promise.resolve(this._cache[e]);
  var i = this._getLocalesUrl() + "locales-" + e + ".xml";
  return fetch(i).catch(function(n) {
    return console.error("Failed to load locale:", n), fetch(t._LOCALES_PATH + "locales-" + e + ".xml");
  }).then(function(n) {
    return n.text();
  }).then(function(n) {
    return t._cache[e] = n, n;
  });
};
oe.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
oe.prototype.getLocale = function(e) {
  return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
oe.prototype.saveLastUsedLanguage = function(e) {
  this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
};
oe.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
oe.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
oe.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function N(e, t) {
  if (this._router = e, this._displayNoneClass = t, this._saveBtn = new Oe("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new Oe("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new Ve("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new Ve("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new nt("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new nt("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new Ve("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new M("mendStyleId"), this._localesManager = new oe(), this._selectLists = [], this._onChangeState = function(i, n) {
  }, this._styleMessage = new Ne("styleMessage", {
    type: "error"
  }), this._langMessage = new Ne("langMessage", {
    type: "error"
  }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = !1, this._stateSettings = {
    style: "",
    notesStyle: "footnotes",
    styleFormat: "numeric"
  };
}
N.prototype.getLocalesManager = function() {
  return this._localesManager;
};
N.prototype.getStyleManager = function() {
  return this._cslStylesManager;
};
N.prototype.getLocale = function() {
  return this._localesManager.getLocale();
};
N.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
};
N.prototype.init = function() {
  this._cslStylesManager.setRestApiAvailable(!0), this._localesManager.setRestApiAvailable(!0);
  var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
  var i = [this._onStyleChange(e), this._localesManager.loadLocale(t), this._loadStyles()];
  return Promise.all(i);
};
N.prototype.onChangeState = function(e) {
  this._onChangeState = e;
};
N.prototype.setDesktopApiAvailable = function(e) {
  this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
};
N.prototype.setRestApiAvailable = function(e) {
  this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
};
N.prototype._addEventListeners = function() {
  var e = this;
  this._saveBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = pe({}, e._stateSettings), s = [];
      e._stateSettings.language !== i && (e._localesManager.saveLastUsedLanguage(i), s.push(e._localesManager.loadLocale(i).catch(function(l) {
        throw console.error(l), e._langMessage.show(U("Failed to load language")), l;
      })));
      var r = "footnotes";
      e._endNotes.getState().checked && (r = "endnotes"), e._stateSettings.notesStyle !== r && (e._cslStylesManager.saveLastUsedNotesStyle(r), e._cslStylesManager.getLastUsedFormat() === "note" && s.push(Promise.resolve()));
      var o = e._styleSelect.getSelectedValue();
      e._stateSettings.style !== o && o !== null && s.push(e._onStyleChange(o)), s.length ? (e._showLoader(), Promise.all(s).then(function() {
        e._hide(), e._hideLoader();
        var l = {
          language: i,
          style: o || "ieee",
          notesStyle: r,
          styleFormat: e._cslStylesManager.getLastUsedFormat()
        };
        e._onChangeState(l, n);
      }).catch(function(l) {
        e._hideLoader();
      })) : e._hide();
    }
  }), this._cancelBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue(), n = e._styleSelect.getSelectedValue();
      i !== null && e._localesManager.getLastUsedLanguage() !== i && e._languageSelect.selectItems(e._localesManager.getLastUsedLanguage(), !0), e._stateSettings.style !== n && n !== null ? (e._styleSelect.selectItems(e._stateSettings.style, !0), e._styleSelectListOther.selectItems(e._stateSettings.style, !0), e._onStyleChange(e._stateSettings.style, !0).then(function() {
        e._hide();
      })) : e._hide();
    }
  }), this._cslFileInput.onchange = function(t) {
    if (t.target instanceof HTMLInputElement) {
      var i = t.target;
      if (i.files) {
        var n = i.files[0];
        if (!n) {
          console.error("No file selected");
          return;
        }
        e._cslStylesManager.addCustomStyle(n).then(function(s) {
          e._addStylesToList([s]);
        }).catch(function(s) {
          console.error(s), e._styleMessage.show(U("Invalid CSL style file"));
        }).finally(function() {
          e._hideLoader();
        });
      }
    }
  }, this._styleSelect.subscribe(function(t) {
    if (t.type === "selectbox:change") {
      e._styleSelectListOther.selectItems(t.detail.current.toString(), !0), e._somethingWasChanged(), e._onStyleChange(t.detail.current.toString(), !0);
      return;
    } else if (t.type !== "selectbox:custom")
      return;
    var i = t.detail.current;
    i === "more_styles" && e._styleSelectListOther.openDropdown();
  }), e._styleSelectListOther.subscribe(function(t) {
    if (t.type === "selectbox:change" && t.detail.items) {
      var i = t.detail.items[0];
      e._styleSelect.addItem(i.value, i.text, !0), e._somethingWasChanged(), e._onStyleChange(i.value, !0);
    }
  }), this._languageSelect.subscribe(function(t) {
    t.type === "selectbox:change" && e._somethingWasChanged();
  }), this._footNotes.subscribe(function(t) {
    e._somethingWasChanged();
  }), this._endNotes.subscribe(function(t) {
    e._somethingWasChanged();
  });
};
N.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
};
N.prototype._hide = function() {
  this._router.openMain();
};
N.prototype.show = function() {
  this._stateSettings = {
    language: this._localesManager.getLastUsedLanguage(),
    style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
    notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
    styleFormat: this._cslStylesManager.getLastUsedFormat()
  }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
};
N.prototype._loadStyles = function() {
  var e = this;
  return this._cslStylesManager.getStylesInfo().then(
    /** @param {Array<StyleInfo>} stylesInfo*/
    function(t) {
      e._addStylesToList(t), e._styleSelect.addCustomItem("more_styles", "More Styles..."), e._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
    }
  ).catch(function(t) {
    console.error(t);
  });
};
N.prototype._addStylesToList = function(e) {
  var t = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = e.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || t._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
N.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
N.prototype._onStyleChange = function(e, t) {
  var i = this;
  return t && i._showLoader(), i._cslStylesManager.getStyle(e, !t).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), t && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(U(n)), t && i._hideLoader(), n;
  });
};
N.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
N.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
class ni {
  /**
   * @param {string} displayNoneClass
   * @param {Function} [onLoadMore]
   * @param {Function} [shouldLoadMore]
   */
  constructor(t, i, n) {
    this.displayNoneClass = t, this.onLoadMore = i, this.shouldLoadMore = n, this.docsHolder = document.getElementById("docsHolder"), this.selectedHolder = document.getElementById("selectedHolder"), this.selectedWrapper = document.getElementById("selectedWrapper"), this.selectedInfo = document.getElementById("selectedInfo"), this.selectedCount = document.getElementById("selectedCount"), this.cancelSelectBtn = document.getElementById("cancelSelectBtn"), this.items = {}, this.selected = {}, this.subscribers = [], this._initEvents();
  }
  _initEvents() {
    var t = this;
    this.cancelSelectBtn && (this.cancelSelectBtn.onclick = () => {
      t.clearSelection();
    });
  }
  subscribe(t) {
    this.subscribers.push(t);
  }
  _notify() {
    var t = Object.keys(this.selected).length;
    this._updateSelectedTray(), this.subscribers.forEach((i) => i(t, this.getSelectedItems()));
  }
  count() {
    return Object.keys(this.selected).length;
  }
  getSelectedItems() {
    var t = {};
    for (var i of Object.keys(this.selected))
      this.items[i] && (t[i] = this.items[i]);
    return t;
  }
  clearSelection() {
    if (this.selected = {}, this.docsHolder) {
      var t = this.docsHolder.querySelectorAll("input[type='checkbox']");
      t.forEach((i) => i.checked = !1);
    }
    this._notify();
  }
  clearLibrary() {
    this.items = {}, this.docsHolder && (this.docsHolder.innerHTML = "");
  }
  _updateSelectedTray() {
    if (!(!this.selectedHolder || !this.selectedWrapper)) {
      var t = Object.keys(this.selected);
      if (this.selectedHolder.innerHTML = "", t.length === 0) {
        this.selectedWrapper.classList.add("hidden"), this.selectedInfo && this.selectedInfo.classList.add("hidden");
        return;
      }
      this.selectedWrapper.classList.remove("hidden"), this.selectedInfo && this.selectedInfo.classList.remove("hidden"), this.selectedCount && (this.selectedCount.innerText = "".concat(t.length, " selected")), t.forEach((i) => {
        var n, s = this.items[i];
        if (s) {
          var r = document.createElement("div");
          r.className = "citation-chip";
          var o = s.authors && s.authors[0] && (s.authors[0].last_name || s.authors[0].first_name) || "Author", l = s.year ? String(s.year) : "n.d.";
          r.innerHTML = `
                <span class="chip-text">`.concat(o, ", ").concat(l, `</span>
                <span class="chip-remove" title="Remove">×</span>
            `), (n = r.querySelector(".chip-remove")) === null || n === void 0 || n.addEventListener("click", () => {
            delete this.selected[i];
            var h = document.getElementById("cb-".concat(i));
            h && h instanceof HTMLInputElement && (h.checked = !1), this._notify();
          }), this.selectedHolder.appendChild(r);
        }
      });
    }
  }
  displaySearchItems(t, i, n) {
    if (!this.docsHolder) return 0;
    var s = document.getElementById("nothingFound");
    return i || !t || !t.items || t.items.length === 0 ? (s && s.classList.remove("hidden"), 0) : (s && s.classList.add("hidden"), t.items.forEach((r) => {
      this.items[r.id] = r;
      var o = document.createElement("div");
      o.className = "ref-item-card";
      var l = r.authors && r.authors.length ? r.authors.map((I) => "".concat(I.last_name || "", " ").concat(I.first_name ? I.first_name.charAt(0) + "." : "")).join(", ") : "Unknown Author", h = r.year || "", f = r.title || "Untitled Document", _ = r.source || r.publisher || "";
      o.innerHTML = `
                <div class="ref-item-header">
                    <input type="checkbox" id="cb-`.concat(r.id, '" class="ref-checkbox" ').concat(this.selected[r.id] ? "checked" : "", ` />
                    <div class="ref-meta">
                        <div class="ref-title">`).concat(f, `</div>
                        <div class="ref-authors">`).concat(l, " ").concat(h ? "(".concat(h, ")") : "", `</div>
                        `).concat(_ ? '<div class="ref-source">'.concat(_, "</div>") : "", `
                    </div>
                </div>
                <div class="ref-quick-insert">
                    <button class="quick-insert-btn" id="btn-quick-`).concat(r.id, `">
                        <span>insert citation</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0L5 6L10 0H0Z"/></svg>
                    </button>
                    <div class="quick-insert-menu hidden" id="menu-quick-`).concat(r.id, `">
                        <div class="menu-option" data-format="narrative">author (year)</div>
                        <div class="menu-option" data-format="naked">author year</div>
                        <div class="menu-option" data-format="parenthetical">(author year)</div>
                    </div>
                </div>
            `);
      var d = o.querySelector("#cb-".concat(r.id));
      d == null || d.addEventListener("change", (I) => {
        var A;
        (A = I.target) !== null && A !== void 0 && A.checked ? this.selected[r.id] = !0 : delete this.selected[r.id], this._notify();
      });
      var p = o.querySelector("#btn-quick-".concat(r.id)), m = o.querySelector("#menu-quick-".concat(r.id));
      p == null || p.addEventListener("click", (I) => {
        I.stopPropagation(), document.querySelectorAll(".quick-insert-menu").forEach((A) => {
          A !== m && A.classList.add("hidden");
        }), m == null || m.classList.toggle("hidden");
      }), m == null || m.querySelectorAll(".menu-option").forEach((I) => {
        I.addEventListener("click", (A) => {
          A.stopPropagation(), m.classList.add("hidden");
          var C = I.getAttribute("data-format") || "parenthetical";
          window.dispatchEvent(new CustomEvent("mendeley:quickInsert", {
            detail: {
              item: r,
              format: C
            }
          }));
        });
      }), this.docsHolder.appendChild(o);
    }), t.items.length);
  }
  removeItems(t) {
    t.forEach((i) => {
      delete this.selected[i];
    }), this._notify();
  }
}
(function() {
  var e = "hidden", t, i, n, s, r, o, l, h, f, _, d, p;
  function m() {
    l = document.getElementById("searchField"), h = document.getElementById("insertLinkBtn"), f = document.getElementById("cancelSelectBtn"), _ = document.getElementById("moreMenuBtn"), d = document.getElementById("moreDropdown"), p = document.getElementById("libraryGroupSelect"), o = new ni(e);
  }
  window.Asc.plugin.init = function() {
    m(), t = new ge(), r = new Vt(t), i = new It({
      authFlow: r.getAuthFlow()
    }), n = new N(t, e), s = new Xt(n.getLocalesManager(), n.getStyleManager()), A(), r.init().onOpen(function() {
      we.hide();
    }).onAuthorized(function() {
      we.hide(), t.openMain(), I();
    });
  };
  function I() {
    var C = document.getElementById("libLoader");
    C && C.classList.remove("hidden"), i.getUserGroups().then((b) => {
      p && b && b.length && (p.innerHTML = '<option value="all">All References</option>', b.forEach((B) => {
        var O = document.createElement("option");
        O.value = B.id, O.innerText = B.name, p.appendChild(O);
      }));
    }).catch((b) => console.warn(b)), n.init().catch((b) => console.warn(b)), i.getItems(null).then((b) => {
      o.clearLibrary(), o.displaySearchItems(b, null, null);
    }).catch((b) => {
      console.error("Load library error:", b);
    }).finally(() => {
      C && C.classList.add("hidden");
    });
  }
  function A() {
    var C, b, B, O, Z;
    if (o.subscribe((x, R) => {
      h && (h.disabled = x === 0);
    }), l) {
      var Qe;
      l.addEventListener("input", (x) => {
        var R;
        clearTimeout(Qe);
        var X = ((R = x.target) === null || R === void 0 ? void 0 : R.value) || "";
        Qe = setTimeout(() => {
          var Y = document.getElementById("libLoader");
          Y && Y.classList.remove("hidden");
          var K = p ? p.value : "all", Fe = K && K !== "all" ? i.getGroupItems(X, K) : i.getItems(X);
          Fe.then((me) => {
            o.clearLibrary(), o.displaySearchItems(me, null, null);
          }).catch((me) => {
            console.error("Search error:", me);
          }).finally(() => {
            Y && Y.classList.add("hidden");
          });
        }, 300);
      });
    }
    p && p.addEventListener("change", (x) => {
      var R, X = (R = x.target) === null || R === void 0 ? void 0 : R.value, Y = l ? l.value : "", K = document.getElementById("libLoader");
      K && K.classList.remove("hidden");
      var Fe = X && X !== "all" ? i.getGroupItems(Y, X) : i.getItems(Y);
      Fe.then((me) => {
        o.clearLibrary(), o.displaySearchItems(me, null, null);
      }).finally(() => {
        K && K.classList.add("hidden");
      });
    }), _ && d && (_.addEventListener("click", (x) => {
      x.stopPropagation(), d.classList.toggle("hidden");
    }), document.addEventListener("click", () => {
      d.classList.add("hidden");
    })), (C = document.getElementById("menuInsertBib")) === null || C === void 0 || C.addEventListener("click", () => {
      var x;
      (x = d) === null || x === void 0 || x.classList.add("hidden"), s.insertBibliography();
    }), (b = document.getElementById("menuRefresh")) === null || b === void 0 || b.addEventListener("click", () => {
      var x;
      (x = d) === null || x === void 0 || x.classList.add("hidden"), s.updateCslItems(!0), I();
    }), (B = document.getElementById("menuSettings")) === null || B === void 0 || B.addEventListener("click", () => {
      var x;
      (x = d) === null || x === void 0 || x.classList.add("hidden"), n.show();
    }), (O = document.getElementById("settingsBackBtn")) === null || O === void 0 || O.addEventListener("click", () => {
      t.openMain();
    }), (Z = document.getElementById("menuUnlink")) === null || Z === void 0 || Z.addEventListener("click", () => {
      var x;
      (x = d) === null || x === void 0 || x.classList.add("hidden"), s.saveAsText();
    }), h && h.addEventListener("click", () => {
      var x = o.getSelectedItems();
      Object.keys(x).length !== 0 && s.insertSelectedCitations(x).then(() => {
        o.clearSelection();
      }).catch((R) => {
        console.error("Insert citation error:", R);
      });
    }), f && f.addEventListener("click", () => {
      o.clearSelection();
    }), window.addEventListener("mendeley:quickInsert", (x) => {
      var {
        item: R,
        format: X
      } = x.detail || {};
      if (R) {
        var Y = {
          [R.id]: R
        };
        X === "narrative" && (R["suppress-author"] = !1), s.insertSelectedCitations(Y).catch((K) => {
          console.error("Quick insert citation error:", K);
        });
      }
    });
  }
  window.Asc.plugin.button = function(C) {
    this.executeCommand("close", "");
  };
})();
//# sourceMappingURL=bundle.modern.js.map
