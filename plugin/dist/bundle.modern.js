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
function mt(e, t, i, n, s, r, o) {
  try {
    var l = e[r](o), u = l.value;
  } catch (h) {
    return void i(h);
  }
  l.done ? t(u) : Promise.resolve(u).then(n, s);
}
function S(e) {
  return function() {
    var t = this, i = arguments;
    return new Promise(function(n, s) {
      var r = e.apply(t, i);
      function o(u) {
        mt(r, n, s, o, l, "next", u);
      }
      function l(u) {
        mt(r, n, s, o, l, "throw", u);
      }
      o(void 0);
    });
  };
}
function Ot(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(e, t) {
  return e.get(c(e, t));
}
function U(e, t, i) {
  Ot(e, t), t.set(e, i);
}
function O(e, t, i) {
  return e.set(c(e, t), i), i;
}
function he(e, t) {
  Ot(e, t), t.add(e);
}
function Dt(e, t, i) {
  return (t = Jt(t)) in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
function bt(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function Ae(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bt(Object(i), !0).forEach(function(n) {
      Dt(e, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : bt(Object(i)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return e;
}
function Kt(e, t) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Jt(e) {
  var t = Kt(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
var wt = {
  /**
   * @param {AscTheme} theme
   */
  addStylesForComponents: function(t) {
    var i = "";
    t["background-toolbar"] && (i += `.loader-body,
.loader-bg { background-color: ` + t["background-toolbar"] + `; }
`, i += ".loader-body {     box-shadow: 0 0 99px 99px " + t["background-toolbar"] + `; }
`), t["background-loader"] && (i += ".loader-image { color: " + t["background-loader"] + `; }
`), t["background-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.input-field-element,
.selectbox-search-input,
.selectbox-header,
.selectbox-dropdown,
.radio-visual, 
.checkbox-visual, 
.message { background-color: ` + t["background-normal"] + `; }
`), t["text-inverse"] && (i += ".custom-button-primary { color: " + t["text-inverse"] + `; }
`), t["border-regular-control"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.custom-button-secondary,
.custom-button-secondary-icon,
.input-field-element,
.checkbox-visual,
.radio-visual,
.selectbox-header,
.selectbox-dropdown,
.selectbox-search-input:focus,
.message { border-color: ` + t["border-regular-control"] + `; }
`, i += `.selectbox-search,
.selectbox-option-divider { border-color: ` + t["border-regular-control"] + ` !important; }
`), t["border-error"] && (i += ".input-field-invalid .input-field-element { border-color: " + t["border-error"] + `; }
`), t["border-control-focus"] && (i += `.custom-button-icon-only:focus:not(:active):not(:hover),
.custom-button-secondary-icon:focus:not(:active):not(:hover),
.custom-button-secondary:focus:not(:active):not(:hover),
.input-field-element:focus,
.input-field-focused .input-field-element,
.selectbox-header:active,
.selectbox-header:focus,
.selectbox-header-open { border-color: ` + t["border-control-focus"] + `; }
`), t["highlight-button-hover"] && (i += `.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.selectbox-custom-option:hover,
.selectbox-option:hover { background-color: ` + t["highlight-button-hover"] + `; }
`), t["highlight-button-pressed"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.selectbox-option-selected:hover,
.selectbox-option-selected { background-color: ` + t["highlight-button-pressed"] + `; }
`, i += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t["highlight-button-pressed"] + `; }
`), t["highlight-primary-dialog-button-hover"] && (i += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t["highlight-primary-dialog-button-hover"] + "; border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`), t["background-primary-dialog-button"] && (i += `.checkbox-indeterminate,
.custom-button-primary { background-color: ` + t["background-primary-dialog-button"] + "; border-color: " + t["background-primary-dialog-button"] + `; }
`), t["background-toolbar-additional"] && (i += `.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled { background-color: ` + t["background-toolbar-additional"] + "; border-color: " + t["background-toolbar-additional"] + `; }
`), t["text-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.custom-button-secondary-icon,
.custom-button-icon-only,
.selectbox-search-input,
.loader-image,
.input-field-element { color: ` + t["text-normal"] + `; }
`, i += ".input-field-search-icon svg { fill: " + t["text-normal"] + `; }
`, i += ".selectbox-arrow b { border-color: " + t["text-normal"] + `; }
`), t["text-secondary"] && (i += `.message-close:hover,
.input-field-clear:hover { color: ` + t["text-secondary"] + `; }
`), t["text-tertiary"] && (i += `.input-field-clear,
.message-container:hover .message-close,
.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled,
.input-field-element::placeholder,
.selectbox-search-input::placeholder { color: ` + t["text-tertiary"] + `; }
`);
    var n = "11px";
    ["theme-white", "theme-night"].indexOf(t.name) !== -1 || ["theme-white", "theme-night"].indexOf(t.Name) !== -1 ? (n = "12px", i += `.message,
.custom-button,
.selectbox-header,
.input-field-element { border-radius: 4px; }
`, i += `.radio--checked .radio-visual { border-width: 4px; }
`, i += ".checkbox-checkmark { color: " + t["text-inverse"] + `; }
`, i += ".checkbox--checked .checkbox-visual { background-color: " + t["background-primary-dialog-button"] + `; }
`, i += `.radio--checked .radio-visual,
.checkbox--checked .checkbox-visual { border-color: ` + t["background-primary-dialog-button"] + `; }
`, i += `.radio-button-container:hover:not(.radio--checked) .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: ` + t["highlight-button-hover"] + `; }
`, i += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; background-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, i += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, i += `body { font-size: 12px; }
`) : (i += ".checkbox-checkmark { color: " + t["text-normal"] + `; }
`, i += ".radio--checked .radio-visual { background-color: " + t["text-normal"] + `;
 box-shadow: 0 0 0 2px` + t["background-normal"] + ` inset; }
`, i += `.radio-button-container:hover .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: ` + t["border-control-focus"] + `; }
`), i += "body, input, textarea, select, button { font-size: " + n + `; }
`;
    var s = document.getElementById("componentsStyles");
    return s ? (s.innerHTML = i, i) : (s = document.createElement("style"), s.id = "componentsStyles", s.innerHTML = i, document.getElementsByTagName("head")[0].appendChild(s), i);
  },
  /**
   * @param {AscTheme} theme
   */
  fixThemeForIE: function(t) {
    return t["background-toolbar"] || (t["background-toolbar"] = "#f7f7f7"), t["text-normal"] || (t["text-normal"] = "rgb(51, 51, 51)"), t["text-secondary"] || (t["text-secondary"] = "#848484"), t["highlight-button-hover"] || (t["highlight-button-hover"] = "#e0e0e0"), t["background-normal"] || (t["background-normal"] = "white"), t["background-loader"] || (t["background-loader"] = "rgba(24, 24, 24, 0.9)"), t["highlight-button-pressed"] || (t["highlight-button-pressed"] = "#cbcbcb"), t["text-inverse"] || (t["text-inverse"] = "white"), t["border-regular-control"] || (t["border-regular-control"] = "#c0c0c0"), t["border-error"] || (t["border-error"] = "#f62211"), t["border-control-focus"] || (t["border-control-focus"] = "#848484"), t["highlight-primary-dialog-button-hover"] || (t["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t["background-primary-dialog-button"] || (t["background-primary-dialog-button"] = "#444444"), t["background-toolbar-additional"] || (t["background-toolbar-additional"] = "#efefef"), t["text-tertiary"] || (t["text-tertiary"] = "#bdbdbd"), t;
  }
};
function Ee() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
    var t = document.getElementById(e);
    if (!t) throw new Error("container ".concat(e, " not found"));
    return t;
  });
}
Ee.prototype.getRoute = function() {
  return this._currentRoute;
};
Ee.prototype._setCurrentRoute = function(e) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
Ee.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
Ee.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
Ee.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
class we {
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
var Re = [{
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
}], qt = [{
  id: "demo-group-1",
  name: "Computer Science Research"
}, {
  id: "demo-group-2",
  name: "Software Architecture"
}], ne = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS"
};
class Yt {
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
      case ne.ERROR:
        console.error(r);
        break;
      case ne.WARN:
        console.warn(r);
        break;
      case ne.DEBUG:
        console.debug(r);
        break;
      default:
        console.log(r);
        break;
    }
    return s;
  }
  debug(t, i) {
    return this._log(ne.DEBUG, t, i);
  }
  info(t, i) {
    return this._log(ne.INFO, t, i);
  }
  warn(t, i) {
    return this._log(ne.WARN, t, i);
  }
  error(t, i) {
    return this._log(ne.ERROR, t, i);
  }
  success(t, i) {
    return this._log(ne.SUCCESS, t, i);
  }
}
var K = new Yt(), jt = "https://api.mendeley.com";
class Zt {
  /** @param {{authFlow: any}} authFlow */
  constructor(t) {
    this._authFlow = t;
    try {
      typeof MendeleySDK == "function" && (this._mendeleySdk = MendeleySDK(t));
    } catch (i) {
      K.warn("SDK_INIT_FALLBACK", {
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
      var o = Ae({
        Authorization: "Bearer ".concat(r),
        Accept: "application/vnd.mendeley-document.1+json"
      }, s.headers || {}), l = t.startsWith("http") ? t : "".concat(jt).concat(t);
      K.info("FETCH_API_REQUEST", {
        url: l
      });
      var u = new AbortController(), h = setTimeout(() => u.abort(), 1e4);
      try {
        var _ = yield fetch(l, Ae(Ae({}, s), {}, {
          headers: o,
          signal: u.signal
        }));
        if (clearTimeout(h), !_.ok) {
          var d = yield _.text().catch(() => "");
          throw K.error("FETCH_API_ERROR", {
            status: _.status,
            statusText: _.statusText,
            text: d
          }), new Error("Mendeley API error (".concat(_.status, "): ").concat(_.statusText));
        }
        return yield _.json();
      } catch (v) {
        throw clearTimeout(h), K.error("FETCH_API_EXCEPTION", {
          message: v.message
        }), v;
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
        K.info("FETCHING_DEMO_ITEMS", {
          search: t,
          count: Re.length
        });
        var r = Re;
        if (t) {
          var o = t.toLowerCase();
          r = Re.filter((d) => d.title.toLowerCase().includes(o) || d.authors && d.authors.some((v) => v.last_name && v.last_name.toLowerCase().includes(o) || v.first_name && v.first_name.toLowerCase().includes(o)) || d.year && String(d.year).includes(o));
        }
        i && i.length && (r = Re.filter((d) => i.includes(d.id)));
        var l = JSON.parse(JSON.stringify(r));
        return l.forEach(we.transform.bind(we)), {
          items: l
        };
      }
      try {
        var u = [];
        if (t) {
          var h = encodeURIComponent(t);
          u = yield s._fetch("/search/documents?query=".concat(h, "&limit=20&view=bib"));
        } else i && i.length ? (u = yield Promise.all(i.map((d) => s._fetch("/documents/".concat(d, "?view=bib")).catch(() => null))), u = u.filter(Boolean)) : u = yield s._fetch("/documents?limit=25&view=bib&sort=last_modified&order=desc");
        var _ = Array.isArray(u) ? u : u.items || [];
        return _.forEach(we.transform.bind(we)), K.success("FETCHED_DOCUMENTS_SUCCESS", {
          count: _.length
        }), {
          items: _
        };
      } catch (d) {
        return K.error("GET_ITEMS_FAILED", {
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
        return o.forEach(we.transform.bind(we)), {
          items: o
        };
      } catch (l) {
        return K.error("GET_GROUP_ITEMS_FAILED", {
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
        return qt;
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
        return K.warn("GET_USER_GROUPS_FAILED", {
          message: n.message
        }), [];
      }
    })();
  }
}
function ge(e, t) {
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
ge.prototype = {
  constructor: ge,
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
function Oe(e, t) {
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
Oe.prototype = {
  constructor: Oe,
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
function Y(e, t) {
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
Y.prototype = /** @lends Button.prototype */
{
  constructor: Y,
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
var k = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet();
class St {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(t, i) {
    if (he(this, X), U(this, k, void 0), U(this, H, void 0), U(this, Ne, void 0), U(this, J, null), U(this, m, void 0), U(this, _e, /* @__PURE__ */ new Map()), U(this, Ce, []), typeof t == "string") {
      var n = document.getElementById(t);
      n instanceof HTMLInputElement && (t = n);
    }
    if (!(t instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (O(H, this, t), O(m, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(X, this, Xt).call(this), O(k, this, document.createElement("div")), O(Ne, this, document.createElement("span")), c(X, this, $t).call(this), c(X, this, Qt).call(this), c(X, this, tt).call(this), !a(m, this).name)
      throw new Error("Name attribute is required");
    var s = Ie._.get(a(m, this).name);
    s || (s = new Array(), Ie._.set(a(m, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return a(Ce, this).push(t), {
      unsubscribe: function() {
        O(Ce, i, a(Ce, i).filter(function(s) {
          return s !== t;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return a(k, this);
  }
  /** @param {boolean} [bSilent] */
  check(t) {
    if (!(a(m, this).disabled || a(m, this).checked)) {
      if (a(m, this).name) {
        var i = Ie._.get(a(m, this).name);
        i && i.forEach((n) => {
          n !== this && a(m, n).checked && n.uncheck();
        });
      }
      a(m, this).checked = !0, c(X, this, tt).call(this), !t && c(X, this, Ct).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(t) {
    a(m, this).disabled || !a(m, this).checked || (a(m, this).checked = !1, c(X, this, tt).call(this), !t && c(X, this, Ct).call(this));
  }
  enable() {
    a(m, this).disabled && (a(m, this).disabled = !1, a(H, this).disabled = !1, a(k, this).setAttribute("aria-disabled", "false"), a(m, this).checked ? a(k, this).tabIndex = 0 : c(X, this, dt).call(this), a(k, this).classList.remove("radio--disabled"));
  }
  disable() {
    a(m, this).disabled || (a(m, this).disabled = !0, a(H, this).disabled = !0, a(k, this).setAttribute("aria-disabled", "true"), a(k, this).tabIndex = -1, a(k, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(t) {
    a(m, this).label = t, a(J, this) ? a(J, this).textContent = t : t && (O(J, this, document.createElement("label")), a(J, this).className = "radio-label", a(J, this).htmlFor = String(a(m, this).id), a(J, this).textContent = t, a(k, this).appendChild(a(J, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!a(m, this).checked,
      disabled: !!a(m, this).disabled,
      value: a(m, this).value || "",
      name: a(m, this).name || ""
    };
  }
  destroy() {
    if (O(Ce, this, []), !!a(m, this).name) {
      var t = Ie._.get(a(m, this).name);
      if (t) {
        var i = t.indexOf(this);
        i >= 0 && t.splice(i, 1);
      }
      a(_e, this).forEach((n, s) => {
        a(k, this).removeEventListener(s, n);
      }), a(_e, this).clear(), a(k, this) && a(k, this).parentNode && a(k, this).parentNode.removeChild(a(k, this)), O(J, this, null);
    }
  }
}
function Xt() {
  a(H, this).type = "radio";
  var e = a(H, this).getAttribute("id"), t = a(H, this).getAttribute("name"), i = a(H, this).getAttribute("value"), n = a(H, this).getAttribute("checked"), s = a(H, this).getAttribute("disabled");
  e !== null ? a(m, this).id = e : a(m, this).id && a(H, this).setAttribute("id", a(m, this).id), t !== null ? a(m, this).name = t : a(m, this).name && a(H, this).setAttribute("name", a(m, this).name), i !== null ? a(m, this).value = i : a(m, this).value && a(H, this).setAttribute("value", a(m, this).value), n !== null ? a(m, this).checked = n === "true" : a(m, this).checked && a(H, this).setAttribute("checked", "true"), s !== null ? a(m, this).disabled = s === "true" : a(m, this).disabled && a(H, this).setAttribute("disabled", "true");
}
function $t() {
  var e = a(H, this).parentNode, t = document.createDocumentFragment();
  t.appendChild(a(k, this)), a(k, this).classList.add("radio-button-container"), a(k, this).setAttribute("role", "radio"), a(k, this).setAttribute("aria-checked", String(!!a(m, this).checked)), a(k, this).setAttribute("aria-disabled", String(!!a(m, this).disabled)), a(k, this).tabIndex = a(m, this).disabled ? -1 : 0, a(Ne, this).className = "radio-visual", a(Ne, this).setAttribute("aria-hidden", "true"), a(m, this).label && (O(J, this, document.createElement("label")), a(J, this).className = "i18n radio-label", a(J, this).htmlFor = String(a(m, this).id), a(J, this).textContent = a(m, this).label), a(m, this).disabled && a(k, this).classList.add("radio--disabled"), e && e.insertBefore(t, a(H, this)), a(k, this).appendChild(a(H, this)), a(k, this).appendChild(a(Ne, this)), a(J, this) && a(k, this).appendChild(a(J, this)), c(X, this, dt).call(this);
}
function dt() {
  if (a(m, this).checked)
    a(k, this).tabIndex = a(m, this).disabled ? -1 : 0;
  else if (a(m, this).name && Ie._.has(a(m, this).name)) {
    var e = Ie._.get(a(m, this).name), t = !1;
    e && e.forEach((i) => {
      a(m, i).checked && i !== this && (t = !0);
    }), !t && !a(m, this).checked && !a(m, this).disabled ? a(k, this).tabIndex = 0 : a(k, this).tabIndex = -1;
  }
}
function Qt() {
  var e = (s) => {
    s.preventDefault(), !a(m, this).disabled && !a(m, this).checked && (this.check(), a(k, this).focus());
  }, t = (s) => {
    if (!a(m, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), a(m, this).checked || this.check();
          break;
      }
  }, i = () => {
    a(k, this).classList.add("radio--focused");
  }, n = () => {
    a(k, this).classList.remove("radio--focused");
  };
  a(_e, this).set("click", e), a(_e, this).set("keydown", t), a(_e, this).set("focus", i), a(_e, this).set("blur", n), a(k, this).addEventListener("click", e), a(k, this).addEventListener("keydown", t), a(k, this).addEventListener("focus", i), a(k, this).addEventListener("blur", n);
}
function tt() {
  a(k, this).setAttribute("aria-checked", String(!!a(m, this).checked)), a(k, this).classList.toggle("radio--checked", a(m, this).checked), a(H, this).checked = !!a(m, this).checked, c(X, this, dt).call(this);
}
function Ct(e) {
  var t = this.getState(), i = {
    type: "radio:change",
    detail: t
  };
  e && (i.originalEvent = e), a(Ce, this).forEach(function(n) {
    n(i);
  });
}
var Ie = {
  _: /* @__PURE__ */ new Map()
};
function Ke(e, t) {
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
Ke.prototype = {
  constructor: Ke,
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
    var u = document.createElement("span");
    if (u.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(u), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var h = document.querySelector("label[for='" + this._options.id + "']");
      h instanceof HTMLLabelElement && (this._labelElement = h);
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
var A = /* @__PURE__ */ new WeakSet();
class ve {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, i) {
    if (he(this, A), typeof t == "string") {
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
        c(A, this, Mt).call(this, s);
      },
      search: (s) => {
        c(A, this, ii).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(A, this, te).call(this);
      },
      keydown: (s) => {
        c(A, this, ni).call(this, s);
      },
      dropdownClick: (s) => {
        c(A, this, si).call(this, s);
      },
      scrollCheck: () => {
        if (this._headerRectOnOpen) {
          var s = this._header.getBoundingClientRect();
          Math.abs(s.top - this._headerRectOnOpen.top) > 1 && c(A, this, te).call(this);
        }
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(A, this, ei).call(this), c(A, this, ti).call(this), c(A, this, Le).call(this), at._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), c(A, this, Le).call(this), c(A, this, ri).call(this);
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
    n && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), c(A, this, le).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(t, i) {
    var n = this;
    t.forEach(function(s, r) {
      var o = n._items.some((u) => u && u.value === s[0]);
      if (!o) {
        var l = i ? s[0] === i : r === 0;
        l && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: l
        });
      }
    }, this), this.isOpen && c(A, this, Le).call(this), c(A, this, le).call(this);
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
    }), this._selectedValues.delete(t), c(A, this, le).call(this);
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
            var v = d.querySelector('input[type="checkbox"]');
            v && v instanceof HTMLInputElement && (v.checked = !0), d.classList.add("selectbox-option-selected"), d.classList.add("checkbox--checked");
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
        l.forEach(function(h) {
          h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        });
        var u = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        u && (u.classList.add("selectbox-option-selected"), u.classList.add("checkbox--checked"));
      }
      c(A, this, te).call(this);
    }
    c(A, this, le).call(this), !i && c(A, this, Je).call(this, s, !0);
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
    var s = "", r = function(u) {
      if (n._optionsContainer) {
        var h = n._optionsContainer.querySelector('[data-value="' + u + '"]');
        if (h) {
          var _ = h.querySelector('input[type="checkbox"]');
          _ && _ instanceof HTMLInputElement && (_.checked = !1), h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        s = t[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(A, this, le).call(this), !i && c(A, this, Je).call(this, s, !0);
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
    c(A, this, le).call(this), c(A, this, Le).call(this);
  }
  destroy() {
    this._subscribers = [], at._.delete(this);
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
function ei() {
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
      var s = c(A, this, oi).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function ti() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
    e.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function Mt(e) {
  if (e && e.stopPropagation(), this.isOpen ? c(A, this, te).call(this) : this.openDropdown(), e && e.type === "click")
    for (var t of at._)
      t.isOpen && t !== this && c(A, t, te).call(t);
}
function te() {
  this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
  for (var e = this._arrow.className.split(" "), t = [], i = 0; i < e.length; i++)
    e[i] !== "selectbox-arrow-open" && t.push(e[i]);
  this._arrow.className = t.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function ii(e) {
  var t = e.target;
  if (t instanceof HTMLInputElement) {
    var i = t.value.toLowerCase();
    c(A, this, Le).call(this, i);
  }
}
function xt(e) {
  var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", i, n = this._items.filter(function(h) {
    return h !== null;
  });
  if (t && (n = n.filter(function(h) {
    return h.text.toLowerCase().indexOf(t) !== -1;
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
      var u = (r + 1) % n.length;
      u === n.length && (u = 0), this._selectedValues.clear(), i = n[u], this._selectedValues.add(i.value);
    }
    c(A, this, le).call(this), c(A, this, Le).call(this, t, !0), c(A, this, Je).call(this, i.value, !0);
  }
}
function ni(e) {
  var t = e.key || e.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      e.preventDefault(), c(A, this, Mt).call(this, e);
      break;
    case "Escape":
    case 27:
      c(A, this, te).call(this);
      break;
    case "ArrowDown":
    case 40:
      e.preventDefault(), c(A, this, xt).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      e.preventDefault(), c(A, this, xt).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(A, this, te).call(this);
      break;
  }
}
function Le(e, t) {
  if (e = e || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    e && (n = n.filter(function(j) {
      return j !== null && j.text.toLowerCase().indexOf(e) !== -1;
    }));
    for (var s = document.createDocumentFragment(), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!o) {
        var l = document.createElement("hr");
        l.className += " selectbox-option-divider", s.appendChild(l);
        continue;
      }
      var u = document.createElement("div");
      u.className += " selectbox-option", this._selectedValues.has(o.value) && (u.className += " selectbox-option-selected checkbox--checked", i = u), u.setAttribute("data-value", o.value);
      var h = document.createElement("label");
      if (h.className += " selectbox-option-text i18n", this._options.translate && (o.text = this._options.translate(o.text)), h.textContent = o.text, this._options.multiple) {
        u.className += " selectbox-option-checkbox";
        var _ = document.createElement("input");
        _.type = "checkbox", _.id = "checkbox-" + o.value, _.className += " selectbox-checkbox", _.checked = this._selectedValues.has(o.value), u.appendChild(_);
        var d = document.createElement("span");
        d.className = "checkbox-visual", d.setAttribute("aria-hidden", "true");
        var v = "http://www.w3.org/2000/svg", b = document.createElementNS(v, "svg");
        b.setAttribute("viewBox", "0 0 10 8"), b.setAttribute("class", "checkbox-checkmark");
        var N = document.createElementNS(v, "path");
        N.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), N.setAttribute("fill", "none"), N.setAttribute("stroke", "currentColor"), N.setAttribute("stroke-width", "2"), b.appendChild(N), d.appendChild(b), u.appendChild(d);
      }
      u.appendChild(h), s.appendChild(u);
    }
    if (this._customItems.length) {
      var T = document.createElement("hr");
      T.className += " selectbox-option-divider", s.appendChild(T);
    }
    for (var r = 0; r < this._customItems.length; r++) {
      var E = this._customItems[r], x = document.createElement("label");
      x.className += " selectbox-custom-option", x.setAttribute("data-value", E.value), x.setAttribute("for", E.value);
      var W = document.createElement("span");
      W.className += " selectbox-option-text i18n", this._options.translate && (E.text = this._options.translate(E.text)), W.textContent = E.text, x.appendChild(W), s.appendChild(x);
    }
    if (this._optionsContainer.appendChild(s), t && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (j) {
        console.error(j);
      }
  }
}
function si(e) {
  var t = e.target || e.srcElement, i = null;
  if (t && t instanceof HTMLElement) {
    for (var n = null, s = t.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var l = t.getAttribute("data-value");
        if (l) {
          e.stopPropagation(), c(A, this, It).call(this, l), c(A, this, te).call(this);
          return;
        }
        break;
      }
    if (r)
      n = t;
    else if (t.parentNode && t.parentNode instanceof HTMLElement) {
      for (var u = t.parentNode.className.split(" "), h = !1, o = 0; o < u.length; o++)
        if (u[o] === "selectbox-option") {
          h = !0;
          break;
        } else if (u[o] === "selectbox-custom-option") {
          var _ = t.parentNode.getAttribute("data-value");
          if (_) {
            e.stopPropagation(), c(A, this, It).call(this, _), c(A, this, te).call(this);
            return;
          }
          break;
        }
      h && (n = t.parentNode);
    }
    if (n instanceof HTMLDivElement)
      i = n;
    else
      return;
  } else
    return;
  var d = i.getAttribute("data-value");
  if (d !== null) {
    var v = !0;
    this._options.multiple ? this._selectedValues.has(d) ? (this.unselectItems(d, !0), v = !1) : this.selectItems(d, !0) : (this.selectItems(d, !0), c(A, this, te).call(this)), c(A, this, le).call(this), c(A, this, Je).call(this, d, v);
  }
}
function le() {
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
function ri() {
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
function Je(e, t) {
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
function It(e) {
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
function oi(e) {
  var t = Array.from(e.options).map((s) => [s.value, s.text]), i = {
    values: t
  }, n = e.value;
  return n && (i.selectedValue = n), i;
}
var at = {
  _: /* @__PURE__ */ new Set()
}, ie = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakSet();
class ue {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(t, i) {
    he(this, Lt), U(this, ie, void 0);
    var n = document.getElementById(t);
    O(ie, this, n), a(ie, this) && c(Lt, this, ai).call(this, i);
  }
  show() {
    var t;
    (t = a(ie, this)) === null || t === void 0 || t.classList.remove("hidden");
  }
  hide() {
    var t;
    (t = a(ie, this)) === null || t === void 0 || t.classList.add("hidden");
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
function ai(e) {
  if (a(ie, this)) {
    a(ie, this).classList.add("loader-container");
    var t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
    i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
    var n = document.createElementNS(t, "circle");
    n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), a(ie, this).appendChild(i);
    var s = document.createElement("div");
    s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = e, a(ie, this).appendChild(s);
  }
}
function w(e) {
  try {
    return window.Asc.plugin.tr(e);
  } catch (t) {
    return console.error(t), e;
  }
}
var Ue = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet();
class li {
  /**
   * @param {string} citPrefix
   * @param {string} bibPrefix
   */
  constructor(t, i) {
    he(this, M), U(this, Ue, void 0), U(this, se, void 0), O(Ue, this, t), O(se, this, i);
  }
  /**
   * @param {string} text
   * @returns {Promise<string>}
   */
  addBibliography(t) {
    var i = this;
    return S(function* () {
      var n = {
        Tag: a(se, i),
        Lock: 3,
        // can edit
        PlaceHolderText: ""
      };
      return yield c(M, i, Ve).call(i, n, 1), c(M, i, Et).call(i, t);
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
      yield c(M, s, Ve).call(s, r);
      var o = n && ["footnotes", "endnotes"].indexOf(n) !== -1, l = yield new Promise((u) => {
        Asc.scope.bAddNote = o, Asc.plugin.callCommand(() => {
          var h = Api.GetDocument(), _ = h.GetCurrentContentControl();
          return Asc.scope.bAddNote && (_.AddText(""), _.Select()), _.GetInternalId();
        }, !1, !1, u);
      });
      return o && (yield c(M, s, it).call(s, n)), yield c(M, s, xe).call(s, t), l;
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
        for (var n = yield c(M, i, ui).call(i), s = [], r = [], o = 0; o < n.length; o++) {
          var l = n[o], u = l.Tag.indexOf(a(Ue, i)) !== -1, h = l.Tag.indexOf(a(se, i)) !== -1;
          (u || h) && (s.push(l), r.push(l.InternalId));
        }
        Asc.scope.internalIds = r, Asc.scope.useParagraph = !!t;
        var _ = yield new Promise((d) => Asc.plugin.callCommand(() => {
          var v = [], b = Api.GetDocument(), N = b.GetAllContentControls();
          return N.forEach((T) => {
            var E = T.GetInternalId(), x = Asc.scope.internalIds.indexOf(E);
            if (x !== -1) {
              var W;
              Asc.scope.useParagraph ? W = T.GetParentParagraph() : W = T.GetRange(0, Number.MAX_SAFE_INTEGER);
              var j = W.GetText();
              j = j.trim(), v[x] = j;
            }
          }), v;
        }, !1, !1, d));
        return s.forEach((d, v) => {
          _[v] && (d.PlaceHolderText = _[v]);
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
        var i = yield c(M, t, ci).call(t);
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
            var u = o[l];
            u.Select();
            var h = r.GetCurrentFootEndnote();
            if (h) {
              var _ = h.SelectNoteReference();
              if (_) {
                var d = r.GetCurrentContentControl();
                if (d) {
                  var v = d.GetInternalId(), b = Asc.scope.controlInternalIds.indexOf(v);
                  b !== -1 && (s[b] = h.GetText().trim());
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
      Asc.scope.citPrefix = a(Ue, this), Asc.scope.bibPrefix = a(se, this), window.Asc.plugin.callCommand(function() {
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
      var n = t.map((d) => d.InternalId || ""), s = t.filter((d) => d.Tag && d.Tag.indexOf(a(se, i)) === 0);
      if (s.length) {
        t = t.filter((d) => d.Tag && d.Tag.indexOf(a(se, i)) !== 0);
        var r = s[0], o = r.InternalId;
        o && (yield new Promise(function(d) {
          window.Asc.plugin.executeMethod("SelectContentControl", [o], d);
        }));
        var l = r.PlaceHolderText || "";
        yield c(M, i, Et).call(i, l);
      }
      for (var u = function* (v) {
        var b = t[v].InternalId;
        if (!b)
          return console.error("Content control without ID found"), 0;
        yield new Promise(function(T) {
          window.Asc.plugin.executeMethod("SelectContentControl", [b], T);
        });
        var N = t[v].Tag;
        if (yield new Promise((T) => {
          Asc.scope.tag = N, Asc.scope.id = t[v].InternalId, Asc.scope.placeholderText = t[v].PlaceHolderText, Asc.plugin.callCommand(() => {
            var E = Api.GetDocument(), x = E.GetCurrentContentControl();
            x ? (x.SetTag(Asc.scope.tag), Asc.scope.placeholderText && x.SetPlaceholderText("")) : console.error("Content control not found for ID:", Asc.scope.id);
          }, !1, !1, T);
        }), !t[v].PlaceHolderText)
          return 0;
        yield c(M, i, xe).call(i, t[v].PlaceHolderText);
      }, h, _ = 0; _ < t.length; _++)
        h = yield* u(_);
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
        yield c(M, n, kt).call(n, r.FieldId);
        var l = {
          Tag: o,
          Lock: 3,
          // can edit
          PlaceHolderText: ""
        };
        yield c(M, n, Ve).call(n, l), yield c(M, n, At).call(n, r.FieldId);
      }
      if (i) {
        yield c(M, n, kt).call(n, i.FieldId);
        var u = {
          Tag: a(se, n),
          Lock: 3,
          // can edit
          PlaceHolderText: ""
        };
        yield c(M, n, Ve).call(n, u, 1), yield c(M, n, At).call(n, i.FieldId);
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
        var u = yield c(M, i, st).call(i, l.InternalId);
        if (!u)
          return console.error("Can not select content control with id: " + l.InternalId), 0;
        yield c(M, i, hi).call(i), yield new Promise((_) => {
          Asc.scope.tag = l.Tag, Asc.plugin.callCommand(() => {
            var d = Api.GetDocument(), v = d.GetCurrentContentControl();
            v ? v.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, _);
        }), yield c(M, i, nt).call(i);
        var h = l.PlaceHolderText;
        yield c(M, i, xe).call(i, h);
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
        var u = t[o];
        if (!u.InternalId) return 0;
        var h = yield c(M, n, st).call(n, u.InternalId);
        if (!h) return 0;
        yield new Promise((d) => {
          Asc.scope.tag = u.Tag, Asc.plugin.callCommand(() => {
            var v = Api.GetDocument(), b = v.GetCurrentContentControl();
            b ? b.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, d);
        }), yield c(M, n, nt).call(n), yield c(M, n, it).call(n, i);
        var _ = u.PlaceHolderText;
        yield c(M, n, xe).call(n, _);
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
        var u = t[o];
        if (!u.InternalId)
          return console.error("Control id is not defined"), 0;
        var h = yield c(M, n, st).call(n, u.InternalId);
        if (!h)
          return console.error("Can not select content control with id: " + u.InternalId), 0;
        yield new Promise((_) => {
          Asc.scope.tag = u.Tag, Asc.plugin.callCommand(() => {
            var d = Api.GetDocument(), v = d.GetCurrentContentControl();
            v ? v.SetTag(Asc.scope.tag) : console.error("Can not find content control");
          }, !1, !1, _);
        }), u.PlaceHolderText && (yield c(M, n, nt).call(n), yield c(M, n, it).call(n, i), yield c(M, n, xe).call(n, u.PlaceHolderText));
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
function Ve(e, t) {
  return new Promise(function(i) {
    typeof t != "number" && (t = 2), window.Asc.plugin.executeMethod("AddContentControl", [t, e], i);
  });
}
function it(e) {
  return Asc.scope.notesStyle = e, new Promise((t) => {
    Asc.plugin.callCommand(() => {
      var i = Api.GetDocument();
      Asc.scope.notesStyle === "footnotes" ? i.AddFootnote() : Asc.scope.notesStyle === "endnotes" && i.AddEndnote();
    }, !1, !1, t);
  });
}
function ci() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
  });
}
function ui() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllContentControls", void 0, e);
  });
}
function xe(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("PasteHtml", [e], t);
  });
}
function At(e) {
  return new Promise((t) => {
    window.Asc.plugin.executeMethod("RemoveFieldWrapper", [e], t);
  });
}
function nt() {
  return new Promise((e) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
  });
}
function kt(e) {
  return new Promise(function(t) {
    var i = window.Asc.scope.editorVersion;
    i && i < 9003e3 && (console.error("Cannot select addin field."), console.error("Editor version is less than 9.3.0"), t(!1)), window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
  });
}
function st(e) {
  return new Promise((t) => {
    Asc.scope.id = e, Asc.plugin.callCommand(() => {
      var i = Api.GetDocument(), n = i.GetAllContentControls(), s = n.find((r) => r.GetInternalId() === Asc.scope.id);
      return s ? s.Select() : !1;
    }, !1, !1, t);
  });
}
function hi() {
  return new Promise(function(e) {
    var t = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, t, e);
  });
}
function Et(e) {
  return lt.apply(this, arguments);
}
function lt() {
  return lt = S(function* (e) {
    var t = new DOMParser(), i = t.parseFromString(e, "text/html"), n = i.querySelectorAll(".csl-entry"), s = new Array(n.length);
    return n.forEach((r, o) => {
      var l = r.querySelector(".csl-left-margin"), u = r.querySelector(".csl-right-inline");
      if (u == null || u.replaceWith(...u.childNodes), l && (s[o] = l.textContent.trim(), l.remove()), r.parentNode) {
        var h = document.createElement("p");
        h.innerHTML = r.innerHTML, r.parentNode.replaceChild(h, r);
      }
    }), e = i.body.innerHTML, yield c(M, this, xe).call(this, e), new Promise((r) => {
      var o = !0, l = !1;
      Asc.scope.numbers = s, Asc.plugin.callCommand(() => {
        var u = Api.GetDocument(), h = u.GetCurrentContentControl(), _ = h.GetRange(0, Number.MAX_SAFE_INTEGER);
        if (_) {
          var d = Asc.scope.bibStyle;
          if (d) {
            var v = _.GetAllParagraphs();
            return v.forEach((b, N) => {
              var T = b.GetText().trim();
              if (T !== "")
                if (typeof d.linespacing == "number" && b.SetSpacingLine(240 * d.linespacing, "exact"), typeof d.entryspacing == "number" && b.SetSpacingAfter(240 * d.entryspacing), d["second-field-align"]) {
                  var E = Api.CreateRun();
                  E.AddText(Asc.scope.numbers[N]), E.AddTabStop();
                  var x = 0;
                  b.AddElement(E, x), b.SetIndLeft(d.maxoffset * 120), b.SetIndFirstLine(-(d.maxoffset * 120));
                } else d.hangingindent && (b.SetIndLeft(720), b.SetIndFirstLine(-720));
            }), h.GetInternalId();
          }
        }
      }, l, o, r);
    }).then((r) => (Asc.scope.bibStyle = null, r));
  }), lt.apply(this, arguments);
}
var ce = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakSet();
class di {
  constructor() {
    he(this, Pt), U(this, ce, void 0), U(this, Q, void 0), U(this, $, void 0), O(ce, this, []), O(Q, this, []), O($, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(t) {
    t = t.toString();
    var i = a(Q, this).indexOf(t);
    return i >= 0 ? a(ce, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(t) {
    return t = t.toString(), a(Q, this).indexOf(t);
  }
  clear() {
    return O(ce, this, []), O($, this, []), O(Q, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(t) {
    t = t.toString();
    var i = a(Q, this).indexOf(t);
    return i >= 0 && (a(ce, this).splice(i, 1), a(Q, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(t) {
    for (var i = 0; i < this.size; i++)
      t(a(ce, this)[i], a(Q, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(t) {
    return t = t.toString(), a(Q, this).indexOf(t) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(t) {
    return a($, this).push(t), t.setNoteIndex(a($, this).length), t.getCitationItems().forEach((i) => {
      c(Pt, this, fi).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return a($, this).map((t) => t.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(t) {
    return a($, this).find((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(t) {
    return a($, this).findIndex((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(t) {
    var i = [];
    return a($, this).find((n, s) => n.citationID === t ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(t) {
    for (var i = [], n = this.getCitationIndex(t), s = n + 1; s < a($, this).length; s++) {
      var r = a($, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function fi(e, t) {
  e = e.toString();
  var i = a(Q, this).indexOf(e);
  return i >= 0 ? (a(ce, this)[i] = t, this) : (a(ce, this).push(t), a(Q, this).push(e), this.size++, this);
}
function f(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItemData: id is required");
  this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
f.prototype._addCustomProperty = function(e, t) {
  return this._custom[e] = t, this;
};
f.prototype.getCustomProperty = function(e) {
  return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
};
f.prototype.fillFromObject = function(e) {
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
f.prototype.getTitle = function() {
  return this._title;
};
f.prototype.getType = function() {
  return this._type;
};
f.prototype.setType = function(e) {
  return this._type = e, this;
};
f.prototype.setCitationKey = function(e) {
  return this._citationKey = e, this;
};
f.prototype.setCategories = function(e) {
  return this._categories = e, this;
};
f.prototype.setLanguage = function(e) {
  return this._language = e, this;
};
f.prototype.setJournalAbbreviation = function(e) {
  return this._journalAbbreviation = e, this;
};
f.prototype.setShortTitle = function(e) {
  return this._shortTitle = e, this;
};
f.prototype.setAuthor = function(e) {
  return this._author = Array.isArray(e) ? e : [e], this;
};
f.prototype.setChair = function(e) {
  return this._chair = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCollectionEditor = function(e) {
  return this._collectionEditor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCompiler = function(e) {
  return this._compiler = Array.isArray(e) ? e : [e], this;
};
f.prototype.setComposer = function(e) {
  return this._composer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setContainerAuthor = function(e) {
  return this._containerAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setContributor = function(e) {
  return this._contributor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCurator = function(e) {
  return this._curator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setDirector = function(e) {
  return this._director = Array.isArray(e) ? e : [e], this;
};
f.prototype.setEditor = function(e) {
  return this._editor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setEditorialDirector = function(e) {
  return this._editorialDirector = Array.isArray(e) ? e : [e], this;
};
f.prototype.setExecutiveProducer = function(e) {
  return this._executiveProducer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setGuest = function(e) {
  return this._guest = Array.isArray(e) ? e : [e], this;
};
f.prototype.setHost = function(e) {
  return this._host = Array.isArray(e) ? e : [e], this;
};
f.prototype.setIllustrator = function(e) {
  return this._illustrator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setNarrator = function(e) {
  return this._narrator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setOrganizer = function(e) {
  return this._organizer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setOriginalAuthor = function(e) {
  return this._originalAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setPerformer = function(e) {
  return this._performer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setProducer = function(e) {
  return this._producer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setRecipient = function(e) {
  return this._recipient = Array.isArray(e) ? e : [e], this;
};
f.prototype.setReviewedAuthor = function(e) {
  return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setScriptwriter = function(e) {
  return this._scriptwriter = Array.isArray(e) ? e : [e], this;
};
f.prototype.setSeriesCreator = function(e) {
  return this._seriesCreator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setTranslator = function(e) {
  return this._translator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setAccessed = function(e) {
  return this._accessed = e || {}, this;
};
f.prototype.setContainer = function(e) {
  return this._container = e || {}, this;
};
f.prototype.setEventDate = function(e) {
  return this._eventDate = e || {}, this;
};
f.prototype.setIssued = function(e) {
  return this._issued = e || {}, this;
};
f.prototype.setOriginalDate = function(e) {
  return this._originalDate = e || {}, this;
};
f.prototype.setSubmitted = function(e) {
  return this._submitted = e || {}, this;
};
f.prototype.setAbstract = function(e) {
  return this._abstract = e, this;
};
f.prototype.setAnnote = function(e) {
  return this._annote = e, this;
};
f.prototype.setArchive = function(e) {
  return this._archive = e, this;
};
f.prototype.setArchiveCollection = function(e) {
  return this._archiveCollection = e, this;
};
f.prototype.setArchiveLocation = function(e) {
  return this._archiveLocation = e, this;
};
f.prototype.setArchivePlace = function(e) {
  return this._archivePlace = e, this;
};
f.prototype.setAuthority = function(e) {
  return this._authority = e, this;
};
f.prototype.setCallNumber = function(e) {
  return this._callNumber = e, this;
};
f.prototype.setChapterNumber = function(e) {
  return this._chapterNumber = e, this;
};
f.prototype.setCitationNumber = function(e) {
  return this._citationNumber = e, this;
};
f.prototype.setCitationLabel = function(e) {
  return this._citationLabel = e, this;
};
f.prototype.setCollectionNumber = function(e) {
  return this._collectionNumber = e, this;
};
f.prototype.setCollectionTitle = function(e) {
  return this._collectionTitle = e, this;
};
f.prototype.setContainerTitle = function(e) {
  return this._containerTitle = e, this;
};
f.prototype.setContainerTitleShort = function(e) {
  return this._containerTitleShort = e, this;
};
f.prototype.setDimensions = function(e) {
  return this._dimensions = e, this;
};
f.prototype.setDOI = function(e) {
  return this._DOI = e, this;
};
f.prototype.setEdition = function(e) {
  return this._edition = e, this;
};
f.prototype.setEvent = function(e) {
  return this._event = e, this;
};
f.prototype.setEventTitle = function(e) {
  return this._eventTitle = e, this;
};
f.prototype.setEventPlace = function(e) {
  return this._eventPlace = e, this;
};
f.prototype.setFirstReferenceNoteNumber = function(e) {
  return this._firstReferenceNoteNumber = e, this;
};
f.prototype.setGenre = function(e) {
  return this._genre = e, this;
};
f.prototype.setISBN = function(e) {
  return this._ISBN = e, this;
};
f.prototype.setISSN = function(e) {
  return this._ISSN = e, this;
};
f.prototype.setIssue = function(e) {
  return this._issue = e, this;
};
f.prototype.setJurisdiction = function(e) {
  return this._jurisdiction = e, this;
};
f.prototype.setKeyword = function(e) {
  return this._keyword = e, this;
};
f.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
f.prototype.setMedium = function(e) {
  return this._medium = e, this;
};
f.prototype.setNote = function(e) {
  return this._note = e, this;
};
f.prototype.setNumber = function(e) {
  return this._number = e, this;
};
f.prototype.setNumberOfPages = function(e) {
  return this._numberOfPages = e, this;
};
f.prototype.setNumberOfVolumes = function(e) {
  return this._numberOfVolumes = e, this;
};
f.prototype.setOriginalPublisher = function(e) {
  return this._originalPublisher = e, this;
};
f.prototype.setOriginalPublisherPlace = function(e) {
  return this._originalPublisherPlace = e, this;
};
f.prototype.setOriginalTitle = function(e) {
  return this._originalTitle = e, this;
};
f.prototype.setPage = function(e) {
  return this._page = e, this;
};
f.prototype.setPageFirst = function(e) {
  return this._pageFirst = e, this;
};
f.prototype.setPart = function(e) {
  return this._part = e, this;
};
f.prototype.setPartTitle = function(e) {
  return this._partTitle = e, this;
};
f.prototype.setPMCID = function(e) {
  return this._PMCID = e, this;
};
f.prototype.setPMID = function(e) {
  return this._PMID = e, this;
};
f.prototype.setPrinting = function(e) {
  return this._printing = e, this;
};
f.prototype.setPublisher = function(e) {
  return this._publisher = e, this;
};
f.prototype.setPublisherPlace = function(e) {
  return this._publisherPlace = e, this;
};
f.prototype.setReferences = function(e) {
  return this._references = e, this;
};
f.prototype.setReviewedGenre = function(e) {
  return this._reviewedGenre = e, this;
};
f.prototype.setReviewedTitle = function(e) {
  return this._reviewedTitle = e, this;
};
f.prototype.setScale = function(e) {
  return this._scale = e, this;
};
f.prototype.setSection = function(e) {
  return this._section = e, this;
};
f.prototype.setSource = function(e) {
  return this._source = e, this;
};
f.prototype.setStatus = function(e) {
  return this._status = e, this;
};
f.prototype.setTitle = function(e) {
  return this._title = e, this;
};
f.prototype.setTitleShort = function(e) {
  return this._titleShort = e, this;
};
f.prototype.setURL = function(e) {
  return this._URL = e, this;
};
f.prototype.setVersion = function(e) {
  return this._version = e, this;
};
f.prototype.setVolume = function(e) {
  return this._volume = e, this;
};
f.prototype.setVolumeTitle = function(e) {
  return this._volumeTitle = e, this;
};
f.prototype.setVolumeTitleShort = function(e) {
  return this._volumeTitleShort = e, this;
};
f.prototype.setYearSuffix = function(e) {
  return this._yearSuffix = e, this;
};
f.prototype.setCustom = function(e) {
  return this._custom = Object.assign(this._custom, e), this;
};
f.prototype.toJSON = function() {
  var e = {};
  return e.id = this._id, this._type !== void 0 && this._type !== "" && (e.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (e["citation-key"] = this._citationKey), this._categories.length > 0 && (e.categories = this._categories), this._language !== void 0 && this._language !== "" && (e.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (e.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (e.shortTitle = this._shortTitle, this._titleShort === void 0 && (e["title-short"] = this._shortTitle)), this._author.length > 0 && (e.author = this._author), this._chair.length > 0 && (e.chair = this._chair), this._collectionEditor.length > 0 && (e["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (e.compiler = this._compiler), this._composer.length > 0 && (e.composer = this._composer), this._containerAuthor.length > 0 && (e["container-author"] = this._containerAuthor), this._contributor.length > 0 && (e.contributor = this._contributor), this._curator.length > 0 && (e.curator = this._curator), this._director.length > 0 && (e.director = this._director), this._editor.length > 0 && (e.editor = this._editor), this._editorialDirector.length > 0 && (e["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (e["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (e.guest = this._guest), this._host.length > 0 && (e.host = this._host), this._illustrator.length > 0 && (e.illustrator = this._illustrator), this._narrator.length > 0 && (e.narrator = this._narrator), this._organizer.length > 0 && (e.organizer = this._organizer), this._originalAuthor.length > 0 && (e["original-author"] = this._originalAuthor), this._performer.length > 0 && (e.performer = this._performer), this._producer.length > 0 && (e.producer = this._producer), this._recipient.length > 0 && (e.recipient = this._recipient), this._reviewedAuthor.length > 0 && (e["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (e["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (e["series-creator"] = this._seriesCreator), this._translator.length > 0 && (e.translator = this._translator), Object.keys(this._accessed).length > 0 && (e.accessed = this._accessed), Object.keys(this._container).length > 0 && (e.container = this._container), Object.keys(this._eventDate).length > 0 && (e["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (e.issued = this._issued), Object.keys(this._originalDate).length > 0 && (e["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (e.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (e.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (e.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (e.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (e.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (e.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (e["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (e.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (e["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (e["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (e["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (e["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (e["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (e["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (e["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (e["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (e.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (e.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (e.edition = this._edition), this._event !== void 0 && this._event !== "" && (e.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (e["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (e["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (e["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (e.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (e.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (e.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (e.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (e.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (e.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (e.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (e.medium = this._medium), this._note !== void 0 && this._note !== "" && (e.note = this._note), this._number !== void 0 && this._number !== "" && (e.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (e["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (e["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (e["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (e["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (e["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (e.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (e["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (e.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (e["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (e.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (e.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (e.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (e.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (e["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (e.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (e["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (e["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (e.scale = this._scale), this._section !== void 0 && this._section !== "" && (e.section = this._section), this._source !== void 0 && this._source !== "" && (e.source = this._source), this._status !== void 0 && this._status !== "" && (e.status = this._status), this._title !== void 0 && this._title !== "" && (e.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (e["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (e.URL = this._URL), this._version !== void 0 && this._version !== "" && (e.version = this._version), this._volume !== void 0 && this._volume !== "" && (e.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (e["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (e["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (e["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0 && (e.custom = this._custom), this._license !== void 0 && this._license !== "" && (e.license = this._license), e;
};
function D(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItem: id is required");
  this.id = e, this._itemData = new f(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
D.prototype.fillFromObject = function(e) {
  var t = this;
  Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(i) {
    t.addUri(i);
  }, this);
};
D.prototype.getInfoForCitationCluster = function() {
  var e = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
};
D.prototype.getItemData = function() {
  return this._itemData;
};
D.prototype.getProperty = function(e) {
  return this._itemData.getCustomProperty(e) !== null ? this._itemData.getCustomProperty(e) : null;
};
D.prototype.setPrefix = function(e) {
  return this._prefix = e, this;
};
D.prototype.setSuffix = function(e) {
  return this._suffix = e, this;
};
D.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
D.prototype.setLabel = function(e) {
  if (e) {
    var t = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (t.indexOf(e) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + e + '"');
    this._label = e;
  }
  return this;
};
D.prototype.setSuppressAuthor = function(e) {
  return this._suppressAuthor = e, this;
};
D.prototype.setAuthorOnly = function(e) {
  return this._authorOnly = e, this;
};
D.prototype.addUri = function(e) {
  return this._uris.indexOf(e) !== -1 ? this : (this._uris.push(e), this);
};
D.prototype.toJSON = function() {
  var e = {};
  return e.id = this.id, this._itemData && (e.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData), this._prefix !== void 0 && (e.prefix = this._prefix), this._suffix !== void 0 && (e.suffix = this._suffix), this._locator !== void 0 && (e.locator = this._locator), this._label !== void 0 && (e.label = this._label), this._suppressAuthor !== void 0 && (e["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (e["author-only"] = this._authorOnly), this._uris.length && (e.uris = this._uris), e;
};
D.prototype.toFlatJSON = function(e) {
  var t = {
    id: this.id,
    index: e
  };
  this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(t, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
var z = /* @__PURE__ */ new WeakSet();
class ke {
  /** @param {string} [citationID] */
  constructor(t) {
    he(this, z), t || (t = c(z, this, Tt).call(this)), rt._.has(t) && (console.warn("Citation ID must be unique"), t = c(z, this, Tt).call(this)), rt._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
  }
  static resetUsedIDs() {
    rt._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? c(z, this, pi).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? c(z, this, _i).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? c(z, this, gi).call(this, t) : c(z, this, Ft).call(this, t);
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
    return c(z, this, ze).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(t) {
    return c(z, this, ze).call(this, {
      noteIndex: t
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(t) {
    return c(z, this, ze).call(this, {
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
function pi(e) {
  var t = this;
  if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && c(z, this, ze).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return e.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = t._citationItems[i.indexOf(s)] : (r = new D(s), i.push(s)), typeof s == "number" && (s = c(z, t, vi).call(t, n)), r.fillFromObject(n), c(z, t, ft).call(t, r);
  }, this), i.length;
}
function _i(e) {
  var t = this;
  return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(i) {
    c(z, t, Ft).call(t, i);
  }, this), 1);
}
function Ft(e) {
  var t = e.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(t) >= 0 ? i = this._citationItems[n.indexOf(t)] : i = new D(t), i.fillFromObject(e), c(z, this, ft).call(this, i), 1;
}
function gi(e) {
  if (!Object.hasOwnProperty.call(e, "data"))
    return console.error("Invalid citation object"), 0;
  var t = this._citationItems.map(function(s) {
    return s.id;
  }), i = e.data.key, n;
  return t.indexOf(i) >= 0 ? n = this._citationItems[t.indexOf(i)] : n = new D(i), n.fillFromObject(e), c(z, this, ft).call(this, n), 1;
}
function ft(e) {
  var t = this._citationItems.map(function(i) {
    return i.id;
  });
  return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function ze(e) {
  var t = this;
  return Object.keys(e).forEach(function(i) {
    Object.hasOwnProperty.call(e, i) && (t._properties[i] = e[i]);
  }, this), this;
}
function vi(e) {
  if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
    var t = e.uris[0].lastIndexOf("/");
    return e.uris[0].slice(t + 1);
  }
  return e.id;
}
function Tt() {
  return Math.random().toString(36).substring(2, 15);
}
var rt = {
  _: /* @__PURE__ */ new Set()
}, B = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakSet();
class yi {
  constructor() {
    he(this, ee), U(this, B, void 0), U(this, qe, void 0), U(this, Me, void 0), U(this, Ye, void 0), O(B, this, null), O(qe, this, window.Asc.plugin.button), O(Me, this, Asc.plugin.onThemeChanged), O(Ye, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(t, i) {
    a(B, this) && c(ee, this, Se).call(this), O(B, this, new window.Asc.PluginWindow());
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
    return c(ee, this, ot).call(this, n, i, "default"), a(B, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, l) => {
        s(o === 0), c(ee, this, Se).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(t) {
    var i = this;
    a(B, this) && c(ee, this, Se).call(this), O(B, this, new window.Asc.PluginWindow());
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
    return c(ee, this, ot).call(this, n, t, "default"), a(B, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = S(function* (l, u) {
          var h = yield new Promise((_) => {
            if (!a(B, i)) {
              _(null);
              return;
            }
            a(B, i).attachEvent("onSaveFields", _), a(B, i).command("onClickSave");
          });
          s(l === 0 ? h : null), c(ee, i, Se).call(i);
        });
        return function(l, u) {
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
    a(B, this) && c(ee, this, Se).call(this), typeof n != "string" && (n = "warning"), O(B, this, new window.Asc.PluginWindow());
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
    return c(ee, this, ot).call(this, s, window.Asc.plugin.tr(i), n), a(B, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (l, u) => {
        r(l === 0), c(ee, this, Se).call(this);
      };
    });
  }
}
function ot(e, t, i) {
  a(B, this) && (O(qe, this, window.Asc.plugin.button), O(Me, this, Asc.plugin.onThemeChanged), O(Ye, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = a(B, this)) === null || s === void 0 || s.command("onThemeChanged", n), a(Me, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = a(B, this)) === null || n === void 0 || n.command("onTranslate"), a(Ye, this).call(this);
  }, a(B, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = a(B, this)) === null || n === void 0 || n.command("onWarning", t);
    } else if (i === "success") {
      var s;
      (s = a(B, this)) === null || s === void 0 || s.command("onSuccess", t);
    } else {
      var r;
      (r = a(B, this)) === null || r === void 0 || r.command("onAttachedContent", t);
    }
  }), a(B, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = a(B, this)) === null || s === void 0 ? void 0 : s.id, [e.size[0] - 2, n]], () => {
    });
  }));
}
function Se() {
  a(B, this) && (a(B, this).close(), O(B, this, null)), window.Asc.plugin.button = a(qe, this), window.Asc.plugin.onThemeChanged = a(Me, this);
}
var ae = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakSet();
class mi {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   */
  constructor(t, i) {
    he(this, C), U(this, ae, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "MENDELEY_CITATION", this._bibPrefixNew = "MENDELEY_BIBLIOGRAPHY", this._localesManager = t, this._cslStylesManager = i, this._storage = new di(), this._formatter, this.citationDocService = new li(this._citPrefixNew, this._bibPrefixNew), O(ae, this, new yi());
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
      var n = c(C, t, De).call(t, i.Tag);
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
        yield c(C, i, re).call(i), c(C, i, oe).call(i);
      } catch (o) {
        throw o;
      }
      var n = new ke("");
      for (var s in t) {
        var r = t[s];
        n.fillFromObject(r);
      }
      return i._storage.addCslCitation(n), c(C, i, bi).call(i, n);
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
      var s, r = c(C, n, De).call(n, i);
      if (typeof r != "object" || !Object.hasOwn(r, "citationID"))
        throw new Error("Invalid control tag");
      var o = r.citationID, l = new ke("");
      l.fillFromObject(r);
      for (var u in t) {
        var h = t[u];
        l.fillFromObject(h);
      }
      var {
        controlsWithCitations: _
      } = yield c(C, n, re).call(n, l.toJSON(), o);
      c(C, n, oe).call(n);
      var d = (s = _.find((b) => b.cslCitation.citationID === o)) === null || s === void 0 ? void 0 : s.cslCitation;
      if (!d)
        throw new Error("Citation not found");
      var v = JSON.stringify(d.toJSON());
      return v = c(C, n, je).call(n, v), v;
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
        } = yield c(C, t, re).call(t), s = i.length === 0;
        if (c(C, t, oe).call(t), n) {
          var r, o = [yield c(C, t, Ge).call(t, s, n)], l = yield t.citationDocService.updateContentControls(o);
          return (r = l[0]) !== null && r !== void 0 ? r : "";
        } else
          return c(C, t, Ci).call(t, s);
      } catch (u) {
        throw u;
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
        } = yield c(C, i, re).call(i), r = n.length === 0;
        c(C, i, oe).call(i);
        var o = [];
        if (typeof t > "u") {
          var l = i._cslStylesManager.getLastUsedFormat();
          l === "numeric" && (t = !0);
        }
        if (typeof t == "boolean" && (o = yield c(C, i, Te).call(i, n, t)), s && o.push(yield c(C, i, Ge).call(i, r, s)), o && o.length)
          return i.citationDocService.updateContentControls(o);
      } catch (u) {
        throw u;
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
        } = yield c(C, i, re).call(i), r = n.length === 0;
        c(C, i, oe).call(i), yield c(C, i, We).call(i, n, t);
        var o = yield c(C, i, Te).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, t)), s) {
          var l = [yield c(C, i, Ge).call(i, r, s)];
          yield i.citationDocService.updateContentControls(l);
        }
      } catch (u) {
        throw u;
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
        } = yield c(C, n, re).call(n, t, t.citationID), o = s.length === 0;
        c(C, n, oe).call(n), t && (s = s.filter(function(u) {
          return u.cslCitation.citationID === t.citationID;
        })), i && (yield c(C, n, We).call(n, s, i));
        var l = yield c(C, n, Te).call(n, s, !0);
        if (i && l && l.length && (yield n.citationDocService.convertNotesStyle(l, i), l = []), l && l.length)
          return n.citationDocService.updateContentControls(l);
      } catch (u) {
        throw u;
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
        } = yield c(C, n, re).call(n), o = s.length === 0;
        c(C, n, oe).call(n), i && (yield c(C, n, We).call(n, s, i));
        var l = yield c(C, n, Te).call(n, s, !0);
        if (l && l.length && (t ? yield n.citationDocService.convertTextToNotes(l, t) : i && (yield n.citationDocService.convertNotesToText(l))), r) {
          var u = [yield c(C, n, Ge).call(n, o, r)];
          yield n.citationDocService.updateContentControls(u);
        }
      } catch (h) {
        throw h;
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
        } = yield c(C, n, re).call(n, void 0, void 0, t);
        c(C, n, oe).call(n), yield c(C, n, We).call(n, s, i);
        var r = yield c(C, n, Te).call(n, s, !1, !0);
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
      var s = yield a(ae, t).show("Update this document", "<p class='i18n'>" + w("Existing citations created with the Mendeley Desktop plugin are built using an old technology that is not compatible with Mendeley Cite. These citations have to be updated to start working with Mendeley Cite.") + "</p><p class='i18n'>" + w("Rest assured nothing has happened to your document or your citations.") + "</p><p class='i18n'>" + w("Press continue to be guided through the update process.") + "</p>");
      if (s) {
        var {
          fieldsWithCitations: r,
          bibField: o
        } = yield c(C, t, xi).call(t, n), l = r.map((u) => ({
          field: u.field,
          newValue: c(C, t, je).call(t, JSON.stringify(u.cslCitation.toJSON()))
        }));
        yield t.citationDocService.upgradeCslItems(l, o), a(ae, t).showInfoWindow("Update complete", w("Your document has been updated to use Mendeley Cite.") + " " + w("Please select the citation style and language for future citation formatting."), "success");
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
      var n = c(C, i, De).call(i, t), s = yield a(ae, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(t) {
    var i = this;
    return S(function* () {
      a(ae, i).showInfoWindow("Warning!", t);
    })();
  }
  /** @param {string} message */
  showSuccessMessage(t) {
    var i = this;
    return S(function* () {
      a(ae, i).showInfoWindow("Success!", t, "success");
    })();
  }
}
function bi(e) {
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
  }).then(() => c(C, this, wi).call(this, e)).then(function(r) {
    n && (s = t._cslStylesManager.getLastUsedNotesStyle());
    var o = JSON.stringify(e.toJSON());
    return o = c(C, t, je).call(t, o), t.citationDocService.addCitation(r, o, s);
  }).then(function(r) {
    var o = {
      internalId: r
    };
    return s && (o.notesStyle = s), o;
  });
}
function Bt() {
  try {
    for (var e = new Array(this._storage.size), t = this._formatter.makeBibliography(), i = 0; i < t[1].length; i++) {
      var n = c(C, this, pt).call(this, t[1][i]);
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
function wi(e) {
  var t = document.createDocumentFragment(), i = document.createElement("div"), n = this._storage.getCitationsPre(e.citationID), s = this._storage.getCitationsPost(e.citationID), r = this._storage.getAllCitationsInJson();
  this._formatter.rebuildProcessorState(r);
  var o = this._formatter.processCitationCluster(e.toJSON(), n, s), l = c(C, this, pt).call(this, o[1][0][1]);
  return t.appendChild(i), i.innerHTML = l, e.setPlainCitation(i.innerText), l;
}
function De(e) {
  var t;
  if (e.indexOf(this._bibPrefixNew) !== -1)
    return {};
  var i = e.indexOf("_", this._citPrefixNew.length + 1) + 1;
  if (i > 0) {
    var n = e.slice(i);
    try {
      var s = atob(n), r;
      if (typeof TextDecoder < "u") {
        var o = Uint8Array.from(s, function(h) {
          return h.charCodeAt(0);
        });
        r = new TextDecoder("utf-8").decode(o);
      } else {
        for (var l = "", u = 0; u < s.length; u++)
          l += "%" + ("00" + s.charCodeAt(u).toString(16)).slice(-2);
        r = decodeURIComponent(l);
      }
      t = JSON.parse(r);
    } catch (h) {
      return console.error("Failed to extract citation", e), console.error(h), this.showWarningMessage("A citation in this document is corrupted and cannot be processed. Please remove or replace it."), {};
    }
  }
  return t;
}
function Si(e) {
  var t, i = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = e.Value.slice(i, n + 1);
    t = JSON.parse(s);
  }
  return t;
}
function re(e, t, i) {
  var n = this;
  return this._storage.clear(), ke.resetUsedIDs(), this.citationDocService.getAddinMendeleyControls(i).then(function(s) {
    var r = s.find(function(u) {
      return u.Tag.indexOf(n._bibPrefixNew) !== -1;
    }), o = s.filter(function(u) {
      return u.Tag.indexOf(n._citPrefixNew) !== -1;
    }), l = o.map(function(u) {
      var h = c(C, n, De).call(n, u.Tag), _ = h.citationID || "", d = new ke(_);
      return e && t === _ ? d.fillFromObject(e) : d.fillFromObject(h), n._storage.addCslCitation(d), {
        control: Ae({}, u),
        cslCitation: d
      };
    });
    return {
      bibControl: r,
      controlsWithCitations: l
    };
  });
}
function Ci(e) {
  var t = c(C, this, Bt).call(this);
  if (e && (t = w(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(t);
  throw "The current bibliographic style does not describe the bibliography";
}
function je(e) {
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
function Ge(e, t) {
  if (e)
    t.PlaceHolderText = w(this._bibPlaceholderIfEmpty);
  else {
    var i = c(C, this, Bt).call(this);
    t.PlaceHolderText = i;
  }
  return t;
}
function Te(e, t, i) {
  return ct.apply(this, arguments);
}
function ct() {
  return ct = S(function* (e, t, i) {
    var n = document.createDocumentFragment(), s = document.createElement("div");
    n.appendChild(s);
    for (var r = [], o = e.length - 1; o >= 0; o--) {
      var l = !!i, {
        control: u,
        cslCitation: h
      } = e[o], _ = this._storage.getCitationsPre(h.citationID), d = this._storage.getCitationsPost(h.citationID), v = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(v);
      var b = this._formatter.processCitationCluster(h.toJSON(), _, d), N = c(C, this, pt).call(this, b[1][0][1]);
      s.innerHTML = N;
      var T = h.getPlainCitation(), E = u.PlaceHolderText;
      T === "" && (T = E);
      var x = s.innerText;
      if (!h.getDoNotUpdate()) {
        if (T !== E && !t) {
          var W = "<p>" + w("You have modified this citation since Mendeley generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + w("Clicking „Yes“ will prevent Mendeley from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + w("Original:") + " " + x + "</p><p>" + w("Modified:") + " " + E + "</p>", j = yield a(ae, this).show("Saving custom edits", W);
          j ? (h.setManualOverride(x, E), u.PlaceHolderText = "") : (u.PlaceHolderText = N, h.setManualOverride(x)), l = !0;
        } else
          (x !== E || T !== E || T !== x) && (l = !0), u.PlaceHolderText = N, h.setManualOverride(x);
        if (h) {
          var me = JSON.stringify(h.toJSON());
          me = c(C, this, je).call(this, me), u.Tag !== me && (l = !0), u.Tag = me;
        }
        l && r.push(u);
      }
    }
    return r;
  }), ct.apply(this, arguments);
}
function oe() {
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
function pt(e) {
  return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
function We(e, t) {
  return ut.apply(this, arguments);
}
function ut() {
  return ut = S(function* (e, t) {
    var i = e.map((s) => s.control.InternalId).filter((s) => typeof s == "string"), n = yield this.citationDocService.getFootnotesControls(i, t);
    return n.forEach((s, r) => {
      s && (e[r].control.PlaceHolderText = s);
    }), e;
  }), ut.apply(this, arguments);
}
function xi(e) {
  return ht.apply(this, arguments);
}
function ht() {
  return ht = S(function* (e) {
    var t = this;
    this._storage.clear(), ke.resetUsedIDs();
    var i = e.find((s) => s.Value.indexOf("Mendeley Bibliography") === 0), n = e.filter((s) => !i || i.FieldId !== s.FieldId).map((s) => {
      var r = c(C, this, Si).call(this, s);
      r && r.citationItems && r.citationItems.forEach(function(l) {
        if (l.uris && l.uris.length) {
          var u = l.id;
          l.uris.some(
            /** @param {string} uri */
            (h) => {
              var _ = "?uuid=", d = h.indexOf(_);
              if (d === -1)
                return !1;
              var v = h.indexOf("&", d + _.length);
              return v === -1 ? (u = h.slice(d + _.length), !0) : (u = h.slice(d + _.length, v), !0);
            }
          ), l.id = u, l.itemData.id = u;
        }
      });
      var o = new ke();
      return o.fillFromObject(r), o.setManualOverride(s.Content), t._storage.addCslCitation(o), {
        field: Ae({}, s),
        cslCitation: o
      };
    });
    return {
      bibField: i,
      fieldsWithCitations: n
    };
  }), ht.apply(this, arguments);
}
class Nt {
  /** @returns {Promise<number>} */
  static getCursorPosition() {
    return new Promise(function(t) {
      var i = !1, n = !1;
      Asc.plugin.callCommand(() => {
        var s = Api.GetDocument(), r = 0;
        if (!s)
          return r;
        var o = s.GetCurrentRun();
        if (!o)
          return r;
        var l = o.GetRange(0, 0);
        return l ? l.GetEndPos() : r;
      }, n, i, t);
    });
  }
  /**
   * @param {number} pos 
   * @returns {Promise<void>}
   */
  static setCursorPosition(t) {
    return new Promise(function(i) {
      var n = !1, s = !1;
      Asc.scope.pos = t, Asc.plugin.callCommand(function() {
        var r = Api.GetDocument();
        r.MoveCursorToPos(Asc.scope.pos);
      }, s, n, i);
    });
  }
}
var Fe = {
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
      var u = l.getAttribute("href");
      u && (r.href = u);
    }
    var h = s.querySelector('info link[rel="independent-parent"]');
    if (h) {
      var _ = h.getAttribute("href");
      _ && (r.parent = _), r.dependent = 1;
    }
    var d = s.querySelector("info updated");
    d && (r.updated = d.textContent);
    var v = s.querySelector("info category[citation-format]");
    if (v) {
      var b = v.getAttribute("citation-format");
      b && (r.categories.format = b);
    }
    var N = s.querySelectorAll("info category[field]");
    return N && N.forEach(function(T) {
      var E = T.getAttribute("field");
      E && r.categories.fields.push(E);
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
function ye() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
ye.prototype.getStyleNames = function() {
  var e = localStorage.getItem(this._customStyleNamesKey);
  return e ? JSON.parse(e) : [];
};
ye.prototype._getStyles = function() {
  var e = localStorage.getItem(this._customStylesKey);
  return e ? JSON.parse(e) : [];
};
ye.prototype.getStyle = function(e) {
  var t = this.getStyleNames(), i = t.indexOf(e);
  return i === -1 ? null : this._getStyles()[i];
};
ye.prototype.getStylesInfo = function() {
  for (var e = this.getStyleNames(), t = this._getStyles(), i = [], n = 0; n < e.length; n++) {
    var s = Fe.getStyleInfo(e[n], t[n]);
    i.push(s);
  }
  return i;
};
ye.prototype.setStyle = function(e, t) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(e);
  return s === -1 && (s = i.length), i[s] = e, n[s] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), Fe.getStyleInfo(e, t);
};
ye.prototype.deleteStyle = function(e) {
  var t = this.getStyleNames(), i = this._getStyles(), n = t.indexOf(e);
  return n === -1 || (t.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), e;
};
function V(e) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new ye(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
V.prototype.addCustomStyle = function(e) {
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
V.prototype.getLastUsedFormat = function() {
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
V.prototype.getLastUsedNotesStyle = function() {
  var e = localStorage.getItem(this._lastNotesStyleKey);
  return e === "footnotes" || e === "endnotes" ? e : "footnotes";
};
V.prototype.getLastUsedStyleId = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || null;
};
V.prototype.getLastUsedStyleIdOrDefault = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || "ieee";
};
V.prototype.getStyle = function(e) {
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
      var s = Fe.getStyleInfo(e, n);
      if (s && s.dependent > 0 && s.parent)
        return fetch(s.parent).then(function(r) {
          return r.text();
        });
    }
    return n;
  }).then(function(n) {
    var s = n && Fe.getCitationFormat(n) || "numeric", r = {
      content: n,
      styleFormat: s
    };
    return n && t && i._saveLastUsedStyle(e, n, s), r;
  });
};
V.prototype.getStylesInfo = function() {
  var e = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
    var i = e.getLastUsedStyleId() || "ieee", n = [], s = e._customStylesStorage.getStyleNames(), r = t[0], o = t[1];
    return e._isDesktopAvailable && !e._isOnlineAvailable && (r = r.filter(function(l) {
      return e._defaultStyles.indexOf(l.name) >= 0 || l.name == i;
    })), o.forEach(function(l) {
      n.push(l), e._defaultStyles.indexOf(l.name) === -1 && e._defaultStyles.push(l.name);
    }), r.forEach(function(l) {
      s.indexOf(l.name) === -1 && n.push(l);
    }), n.sort((l, u) => l.name.localeCompare(u.name)), n;
  });
};
V.prototype._getStylesJson = function() {
  var e = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(t) {
    return t.json();
  });
};
V.prototype.cached = function(e) {
  return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
};
V.prototype.isLastUsedStyleContainBibliography = function() {
  var e = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return e !== "false";
};
V.prototype.isStyleDefault = function(e) {
  return this._defaultStyles.indexOf(e) >= 0;
};
V.prototype._isValidCSL = function(e) {
  return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
};
V.prototype._readCSLFile = function(e) {
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
V.prototype._saveLastUsedStyle = function(e, t, i) {
  this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, i);
  var n = Fe.isStyleContainBibliography(t);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
V.prototype.saveLastUsedNotesStyle = function(e) {
  localStorage.setItem(this._lastNotesStyleKey, e);
};
V.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
V.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function de() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
de.prototype.loadLocale = function(e) {
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
de.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
de.prototype.getLocale = function(e) {
  return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
de.prototype.saveLastUsedLanguage = function(e) {
  this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
};
de.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
de.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
de.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function R(e, t) {
  if (this._router = e, this._displayNoneClass = t, this._saveBtn = new Y("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new Y("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new ve("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new ve("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new St("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new St("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new ve("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new V("mendStyleId"), this._localesManager = new de(), this._selectLists = [], this._onChangeState = function(i, n) {
  }, this._styleMessage = new Oe("styleMessage", {
    type: "error"
  }), this._langMessage = new Oe("langMessage", {
    type: "error"
  }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = !1, this._stateSettings = {
    style: "",
    notesStyle: "footnotes",
    styleFormat: "numeric"
  };
}
R.prototype.getLocalesManager = function() {
  return this._localesManager;
};
R.prototype.getStyleManager = function() {
  return this._cslStylesManager;
};
R.prototype.getLocale = function() {
  return this._localesManager.getLocale();
};
R.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
};
R.prototype.init = function() {
  this._cslStylesManager.setRestApiAvailable(!0), this._localesManager.setRestApiAvailable(!0);
  var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
  var i = [this._onStyleChange(e), this._localesManager.loadLocale(t), this._loadStyles()];
  return Promise.all(i);
};
R.prototype.onChangeState = function(e) {
  this._onChangeState = e;
};
R.prototype.setDesktopApiAvailable = function(e) {
  this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
};
R.prototype.setRestApiAvailable = function(e) {
  this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
};
R.prototype._addEventListeners = function() {
  var e = this;
  this._saveBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = Ae({}, e._stateSettings), s = [];
      e._stateSettings.language !== i && (e._localesManager.saveLastUsedLanguage(i), s.push(e._localesManager.loadLocale(i).catch(function(l) {
        throw console.error(l), e._langMessage.show(w("Failed to load language")), l;
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
          console.error(s), e._styleMessage.show(w("Invalid CSL style file"));
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
R.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
};
R.prototype._hide = function() {
  this._router.openMain();
};
R.prototype.show = function() {
  this._stateSettings = {
    language: this._localesManager.getLastUsedLanguage(),
    style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
    notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
    styleFormat: this._cslStylesManager.getLastUsedFormat()
  }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
};
R.prototype._loadStyles = function() {
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
R.prototype._addStylesToList = function(e) {
  var t = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = e.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || t._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
R.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
R.prototype._onStyleChange = function(e, t) {
  var i = this;
  return t && i._showLoader(), i._cslStylesManager.getStyle(e, !t).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), t && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(w(n)), t && i._hideLoader(), n;
  });
};
R.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
R.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
var Ii = "26014", Li = "https://onlyoffice.github.io/sdkjs-plugins/content/mendeley/oauth.html";
class Ai {
  /**
   * @param {Router} router
   */
  constructor(t) {
    this._router = t, this._tokenField = new ge("tokenField", {
      autofocus: !0,
      autocomplete: "off"
    }), this._connectTokenBtn = new Y("connectTokenBtn", {
      variant: "primary"
    }), this._getBrowserTokenBtn = new Y("getBrowserTokenBtn", {
      variant: "primary"
    }), this._demoModeBtn = new Y("demoModeBtn", {
      variant: "secondary"
    }), this._loginMessage = new Oe("loginMessage", {
      type: "error"
    }), this._logoutLink = document.getElementById("logoutLink"), this._loginStateHash = "", this._onAuthorized = function() {
    }, this._onOpen = function() {
    };
  }
  init() {
    var t = this;
    K.info("LOGIN_INIT", {
      message: "Initializing Mendeley Login Page"
    }), this._addEventListeners();
    var i = {
      /** @param {function(): void} callbackFn */
      onOpen: function(r) {
        return t._onOpen = r, i;
      },
      /** @param {function(): void} callbackFn */
      onAuthorized: function(r) {
        return t._onAuthorized = r, i;
      }
    }, n = this._getToken();
    return n ? (K.info("LOGIN_CACHED_TOKEN_FOUND", {
      hasToken: !0
    }), t._hide(), setTimeout(() => t._onAuthorized(), 0), i) : (t._show(), setTimeout(() => {
      ue.hide(), t._onOpen();
    }, 0), i);
  }
  onAuthCallback(t, i) {
    return !i || i !== this._loginStateHash ? (this._loginMessage.show(w(t || "Invalid callback state")), !1) : (this._saveToken(t), this._onAuthorized(), this._hide(), !0);
  }
  getAuthFlow() {
    var t = this;
    return {
      authenticate: () => {
        this._show();
      },
      getToken: function() {
        return t._getToken();
      },
      refreshToken: function() {
        return !1;
      }
    };
  }
  _addEventListeners() {
    var t = this;
    this._tokenField.subscribe(function(i) {
      i.type === "inputfield:submit" && t._applyManualToken();
    }), this._connectTokenBtn.subscribe(function(i) {
      i.type === "button:click" && t._applyManualToken();
    }), this._getBrowserTokenBtn.subscribe(function(i) {
      i.type === "button:click" && t._openBrowserAuth();
    }), this._demoModeBtn.subscribe(function(i) {
      i.type === "button:click" && t._startDemoMode();
    }), this._logoutLink && (this._logoutLink.onclick = function() {
      return K.info("USER_LOGOUT", {}), localStorage.removeItem("mendToken"), localStorage.removeItem("mendTokenExpiresAt"), ue.hide(), t._show(), !0;
    });
  }
  _startDemoMode() {
    K.info("START_DEMO_MODE", {}), this._saveToken("DEMO_MODE_TOKEN"), this._hide(), this._onAuthorized();
  }
  _applyManualToken() {
    var t = this._tokenField.getValue().trim();
    if (!t) {
      this._loginMessage.show(w("Please paste an Access Token"));
      return;
    }
    var i = t;
    if (i.startsWith("Bearer ") && (i = i.slice(7).trim()), i.includes("access_token=")) {
      var n = i.match(/access_token=([^&]+)/);
      n && n[1] && (i = n[1]);
    }
    K.info("MANUAL_TOKEN_SUBMITTED", {
      tokenLength: i.length
    }), this._saveToken(i), this._hide(), this._onAuthorized();
  }
  _openBrowserAuth() {
    this._loginStateHash = (/* @__PURE__ */ new Date()).getTime().toString();
    var t = "https://api.mendeley.com/oauth/authorize?client_id=" + Ii + "&redirect_uri=" + encodeURIComponent(Li) + "&response_type=token&scope=all&state=" + this._loginStateHash;
    K.info("OPENING_BROWSER_AUTH", {
      link: t
    }), window.open(t, "_blank", "width=600,height=750");
    var i = document.getElementById("tokenField");
    i && i.focus();
  }
  _hide() {
    ue.hide(), this._router.openMain(), this._logoutLink && this._logoutLink.classList.remove("hidden");
  }
  _show() {
    ue.hide(), this._router.openLogin(), this._logoutLink && this._logoutLink.classList.add("hidden");
  }
  _getToken() {
    var t = localStorage.getItem("mendToken"), i = localStorage.getItem("mendTokenExpiresAt");
    return !t || !i || Date.now() > Number(i) ? null : t;
  }
  _saveToken(t) {
    localStorage.setItem("mendToken", t), localStorage.setItem("mendTokenExpiresAt", String(Date.now() + 720 * 60 * 60 * 1e3));
  }
}
function Pe() {
  this._searchField = new ge("searchField", {
    type: "text",
    autofocus: !0,
    showClear: !1
  }), this._filterButton = new Y("filterButton", {
    variant: "secondary-icon",
    size: "small",
    disabled: !0
  }), this._librarySelectList = new ve("librarySelectList", {
    // TODO: add translation
    placeholder: w("No items selected"),
    multiple: !0,
    description: w("Search in:")
  }), this._subscribers = [], this._addEventListeners();
}
Pe.prototype._addEventListeners = function() {
  var e = this;
  this._searchField.subscribe(function(t) {
    if (t.type === "inputfield:blur" || t.type === "inputfield:submit") {
      var i = e._getSelectedGroups();
      e._subscribers.forEach(function(n) {
        n(t.detail.value, i);
      });
    }
  }), this._filterButton.subscribe(function(t) {
    t.type === "button:click" && (e._librarySelectList.isOpen || t.detail.originalEvent && t.detail.originalEvent.stopPropagation());
  });
};
Pe.prototype.addGroups = function(e) {
  var t = this, i = localStorage.getItem("selectedGroups"), n = i ? JSON.parse(i).map(function(b) {
    return b.toString();
  }) : ["all_collections"], s = !1;
  e.forEach(function(b) {
    b.id = String(b.id);
  });
  var r = [{
    id: "all_collections",
    name: w("All collections")
  }];
  !s && r.forEach(function(b) {
    n.indexOf(b.id) !== -1 && (s = !0);
  }), !s && e.forEach(function(b) {
    n.indexOf(b.id.toString()) !== -1 && (s = !0);
  }), s || (n = ["all_collections"]);
  for (var o = function(N, T, E) {
    typeof N == "number" && (N = N.toString()), t._librarySelectList instanceof ve && t._librarySelectList.addItem(N, T, E);
  }, l = 0; l < r.length; l++) {
    var u = r[l].id, h = r[l].name;
    o(u, h, n.indexOf(u) !== -1);
  }
  if (e.length !== 0) {
    this._librarySelectList.addSeparator();
    for (var _ = n.indexOf("all_collections") !== -1, l = 0; l < e.length; l++) {
      var d = e[l].id, v = e[l].name;
      o(d, v, _ || n.indexOf(d.toString()) !== -1);
    }
    this._selectedGroupsWatcher(r, e);
  }
};
Pe.prototype._getSelectedGroups = function() {
  var e = this._librarySelectList.getSelectedValues();
  return (Array.isArray(e) === !1 || e.length === 0) && setTimeout(function() {
  }, 500), e === null || typeof e == "string" ? [] : e;
};
Pe.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
Pe.prototype._selectedGroupsWatcher = function(e, t) {
  var i = this;
  this._librarySelectList instanceof ve && this._librarySelectList.subscribe(function(n) {
    if (n.type === "selectbox:change") {
      var s = [], r = n.detail.values, o = n.detail.current, l = n.detail.enabled, u = e.map(function(v) {
        return v.id;
      }), h = t.map(function(v) {
        return v.id.toString();
      }), _ = u.indexOf(String(o)) !== -1;
      if (_)
        o === "all_collections" ? l ? (s.push("all_collections"), i._librarySelectList.selectItems(h, !0)) : i._librarySelectList.unselectItems(h, !0) : r.indexOf("all_collections") !== -1 ? (s.push("all_collections"), l && s.push(o)) : s = r.slice();
      else if (!_) {
        var d = h.every(function(v) {
          return r.indexOf(v) !== -1;
        });
        d ? (i._librarySelectList.selectItems("all_collections", !0), s.push("all_collections")) : (i._librarySelectList.unselectItems("all_collections", !0), s = r.filter(function(v) {
          return v !== "all_collections";
        }));
      }
      s.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(s));
    }
  });
};
var ki = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function G(e, t, i) {
  this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = t, this._loadTimeout, this._init();
}
G.prototype._init = function() {
  var e = this;
  this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(t) {
    var i = [];
    for (var n in e._items)
      i.push(n);
    for (var s = 0; s < i.length; s++)
      e._removeSelected(i[s]);
  }), this._docsHolder && this._docsHolder.addEventListener("keydown", function(t) {
    if ((t.ctrlKey || t.metaKey) && t.key === "a") {
      var i;
      t.preventDefault();
      var n = (i = e._docsHolder) === null || i === void 0 ? void 0 : i.querySelectorAll(".checkbox-container:not(.checkbox--checked)");
      n == null || n.forEach(function(s) {
        s.click();
      });
    }
  });
};
G.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var e = this._docsHolder; e && e.lastChild; )
    e.removeChild(e.lastChild);
  e && (e.scrollTop = 0), this._docsScroller.onscroll();
};
G.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};
G.prototype.displaySearchItems = function(e, t, i) {
  var n = this, s = this._docsHolder;
  this._lastSearch = i;
  var r = 0;
  return new Promise((o, l) => {
    if (e && e.items && e.items.length > 0) {
      var u = document.createElement("div");
      s && u.classList.add("page" + s.children.length);
      for (var h = 0; h < e.items.length; h++) {
        var _ = e.items[h];
        _.title && (u.appendChild(n._buildDocElement(_)), r++);
      }
      s && s.appendChild(u);
    } else t && l(t);
    this._docsScroller.onscroll(), o(r);
  });
};
G.prototype.getSelectedItems = function() {
  var e = Object.assign({}, this._items || {});
  return e;
};
G.prototype.removeItems = function(e) {
  var t = this;
  e.forEach(function(i) {
    t._removeSelected(i);
  });
};
G.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
G.prototype._buildDocElement = function(e) {
  var t = this, i = document.createElement("div");
  i.classList.add("doc");
  var n = document.createElement("div");
  n.classList.add("docInfo");
  var s = document.createElement("div"), r = "";
  e.author && e.author.length > 0 && (r = e.author.map(function(b) {
    return b.family && b.given ? b.family.trim() + ", " + b.given.trim() : b.family ? b.family.trim() : b.given ? b.given.trim() : "";
  }).join("; "));
  var o = document.createElement("div");
  o.classList.add("selectbox-arrow"), o.innerHTML = "<b></b>";
  var l = document.createElement("div");
  if (l.textContent = e.title.trim(), l.classList.add("truncate-text"), l.classList.add("secondary-text"), (e.publisher || e["publisher-place"]) && (l.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
    var u = e.issued["date-parts"][0];
    r.length > 20 ? l.textContent += " (" + u.join("-") + ")" : (r.length > 0 && r.slice(-1) !== "." && r.slice(-1) !== "," && (r += "."), r += " " + u.join("-"));
  }
  r.length === 0 && (r = l.textContent), l.setAttribute("title", l.textContent), n.appendChild(l);
  var h = document.createElement("input");
  s.appendChild(h);
  var _ = new Ke(h, {
    checked: !!this._items[e.id],
    label: r,
    title: !0,
    id: e.id
  });
  this._items[e.id] && (this._checks[e.id] = _), s.appendChild(o), i.appendChild(s), i.appendChild(n);
  var d;
  function v() {
    i.classList.toggle("doc-open"), d || (d = t._buildCitationParams(e), i.appendChild(d));
  }
  return o.onclick = v, _.subscribe(function(b) {
    b.type === "checkbox:change" && (b.detail.checked ? t._addSelected(e, _) : t._removeSelected(e.id));
  }), i;
};
G.prototype._buildCitationParams = function(e) {
  var t = localStorage.getItem("selectedLocator") || "page";
  e.label = t;
  var i = document.createDocumentFragment(), n = document.createElement("div"), s = document.createElement("input"), r = document.createElement("input"), o = document.createElement("div"), l = document.createElement("div"), u = document.createElement("input"), h = document.createElement("div"), _ = document.createElement("input");
  i.appendChild(n), n.appendChild(s), n.appendChild(r), i.appendChild(o), o.appendChild(l), o.appendChild(u);
  var d = "";
  i.appendChild(h), h.appendChild(_);
  var v = new ge(s, {
    type: "text",
    placeholder: "Prefix"
  }), b = new ge(r, {
    type: "text",
    placeholder: "Suffix"
  }), N = new ve(l, {
    placeholder: "Locator",
    usePortal: !0
  });
  ki.forEach(function(x) {
    var W = x[0] === t;
    N.addItem(x[0], x[1], W), W && (d = x[1]);
  });
  var T = new ge(u, {
    type: "text",
    placeholder: d
  }), E = new Ke(_, {
    label: w("Omit author")
  });
  return v.subscribe(function(x) {
    x.type === "inputfield:input" && (e.prefix = x.detail.value);
  }), b.subscribe(function(x) {
    x.type === "inputfield:input" && (e.suffix = x.detail.value);
  }), T.subscribe(function(x) {
    x.type === "inputfield:input" && (e.locator = x.detail.value);
  }), N.subscribe(function(x) {
    if (x.type === "selectbox:change" && x.detail.items) {
      var W = x.detail.items[0];
      T.setPlaceholder(W.text), e.label = x.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
    }
  }), E.subscribe(function(x) {
    x.type === "checkbox:change" && (e["suppress-author"] = x.detail.checked);
  }), i;
};
G.prototype._buildSelectedElement = function(e) {
  var t = this, i = document.createElement("div");
  i.classList.add("selDoc");
  var n = document.createElement("span");
  e.author && e.author.length > 0 ? n.textContent = e.author.map(function(r) {
    return r.family + ", " + r.given;
  }).join("; ") : n.textContent = e.title, e.issued && e.issued["date-parts"] && (n.textContent += " " + e.issued["date-parts"][0].join("-")), n.setAttribute("title", n.textContent), i.appendChild(n);
  var s = document.createElement("span");
  return s.onclick = function() {
    t._removeSelected(e.id);
  }, s.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(s), i;
};
G.prototype._addSelected = function(e, t) {
  var i = this._buildSelectedElement(e);
  this._items[e.id] = e, this._html[e.id] = i, this._checks[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
G.prototype._checkDocsScroll = function(e, t) {
  var i = this;
  if (this._fShouldLoadMore(e)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(e) && i._fLoadMore();
    }, 500);
  }
};
G.prototype._initScrollBox = function(e, t, i, n) {
  var s = {};
  return s.onscroll = this._checkScroll(e, t, i, n), e.onwheel = function(r) {
    e.scrollTop += r.deltaY > 10 || r.deltaY < -10 ? r.deltaY : r.deltaY * 20, s.onscroll();
  }, t.onmousedown = function(r) {
    t.classList.add("scrolling");
    var o = r.clientY, l = e.scrollTop;
    window.onmouseup = function(u) {
      t.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(u) {
      var h = u.clientY - o, _ = h / e.clientHeight, d = e.scrollHeight * _;
      e.scrollTop = l + d, s.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    s.onscroll();
  }), s;
};
G.prototype._checkScroll = function(e, t, i, n) {
  var s = this._displayNoneClass;
  return function() {
    if (e.scrollHeight <= e.clientHeight)
      t.classList.add(s);
    else {
      t.classList.remove(s);
      var r = e.clientHeight / e.scrollHeight * e.clientHeight;
      r = r < i ? i : r, t.style.height = r + "px";
      var o = e.scrollHeight - e.clientHeight, l = e.scrollTop / o, u = l * (e.clientHeight - r);
      t.style.marginTop = u + "px";
    }
    n && n(e, t);
  };
};
G.prototype._removeSelected = function(e) {
  var t = this._html[e];
  this._selectedHolder && this._selectedHolder.removeChild(t), delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
G.prototype._checkSelected = function() {
  var e = this.count();
  !this._selectedInfo || !this._selectedCount || !this._selectedWrapper || (e <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = e + " " + w("selected")), this._subscribers.forEach(function(t) {
    t(e);
  }));
};
G.prototype.count = function() {
  var e = 0;
  for (var t in this._items) e++;
  return e;
};
(function() {
  var e = "hidden", t, i, n, s, r, o = {
    text: "",
    obj: null,
    groups: [],
    groupsHash: ""
  }, l = !1, u, h, _, d, v, b, N, T = new ue("libLoader", w("Loading...")), E = {};
  function x() {
    var p = document.getElementById("errorWrapper");
    if (!p)
      throw new Error("errorWrapper not found");
    var g = document.getElementById("mainState");
    if (!g)
      throw new Error("mainState not found");
    u = new Pe(), h = new G(e, Rt, Ut), _ = new Y("saveAsTextBtn", {
      variant: "secondary"
    }), d = new Y("insertLinkBtn", {
      disabled: !0
    }), v = new Y("settingsBtn", {
      variant: "icon-only",
      size: "small"
    }), b = new Y("insertBibBtn", {
      variant: "secondary"
    }), N = new Y("refreshBtn", {
      variant: "secondary"
    }), E = {
      error: p,
      mainState: g
    };
  }
  window.Asc.plugin.init = function() {
    x(), t = new Ee(), s = new Ai(t), i = new Zt({
      authFlow: s.getAuthFlow()
    }), n = new R(t, e), r = new mi(n.getLocalesManager(), n.getStyleManager());
    var p = !1;
    me(), s.init().onOpen(function() {
      ue.hide();
    }).onAuthorized(function() {
      if (!p) {
        p = !0, ue.hide(), t.openMain();
        var g = j().catch(() => []), y = n.init().catch(() => {
        });
        Promise.all([g, y, r.checkOldVersion().catch(() => !1), W().catch(() => 0)]).then(function(I) {
          var [L, F, P, pe] = I;
          P ? n.show() : Gt();
        }).catch(function(I) {
          console.error("Initialization error:", I);
        }).finally(function() {
          ue.hide(), T.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = Ht, Vt().then((g) => {
      window.Asc.scope.editorVersion = g;
    });
  }, window.OAuthError = function(p) {
    s.onAuthCallback(p);
  }, window.OAuthCallback = function(p, g) {
    s.onAuthCallback(p, g);
  };
  function W() {
    T.show();
    var p = i.getItems(null).then((g) => (delete g.next, g));
    return He(p, !1).then((g) => {
      g > 0 ? Be("started") : Be("empty");
    }).catch((g) => {
      console.error(g);
    }).finally(() => {
      T.hide();
    });
  }
  function j() {
    return i.getUserGroups().then(function(p) {
      return u.addGroups(p), p;
    });
  }
  function me() {
    h.subscribe(vt);
    function p(g, y, I) {
      h.clearLibrary();
      var L = [];
      return new Promise((F) => {
        L.push(He(i.getItems(g), !1)), o.text = g, o.obj = null, o.groups = [], o.groupsHash = I, F(L);
      });
    }
    u.subscribe(function(g, y) {
      g = g.trim();
      var I = y.join(",");
      E.mainState.classList.contains(e) || !g || g == o.text && I === o.groupsHash || p(g, y, I).catch(() => []).then(function(L) {
        return L.length && (T.show(), Promise.any(L).then(function() {
          T.hide();
        }).finally(function() {
          T.hide();
        })), Promise.allSettled(L);
      }).then(function(L) {
        var F = 0;
        L.forEach(function(P) {
          P.status === "fulfilled" && (F += P.value);
        }), F === 0 ? (Be("empty"), h.displayNothingFound()) : Be("not-empty");
      });
    }), N.subscribe(/* @__PURE__ */ (function() {
      var g = S(function* (y) {
        if (y.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            q(w("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            q(w("Language is not selected"));
            return;
          }
          yield be(!0, "Mendeley (" + w("Updating citations") + ")");
          var I = r.updateCslItems.bind(r, !1), L = n.getStyleManager();
          L.getLastUsedFormat() === "note" && (I = r.updateCslItemsInNotes.bind(r, L.getLastUsedNotesStyle())), I().catch(function(F) {
            console.error(F);
            var P = w("Failed to refresh");
            typeof F == "string" && (P += ". " + w(F)), q(P);
          }).finally(function() {
            fe(!1, "Mendeley (" + w("Updating citations") + ")");
          });
        }
      });
      return function(y) {
        return g.apply(this, arguments);
      };
    })()), b.subscribe(/* @__PURE__ */ (function() {
      var g = S(function* (y) {
        if (y.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            q(w("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            q(w("Language is not selected"));
            return;
          }
          yield be(!0, "Mendeley (" + w("Inserting bibliography") + ")"), r.insertBibliography().catch(function(I) {
            if (console.error(I), r.showWarningMessage("Failed to insert bibliography"), typeof I == "string") {
              var L = w(I);
              q(L);
            }
          }).finally(function() {
            fe(!1, "Mendeley (" + w("Inserting bibliography") + ")");
          });
        }
      });
      return function(y) {
        return g.apply(this, arguments);
      };
    })()), d.subscribe(/* @__PURE__ */ (function() {
      var g = S(function* (y) {
        if (y.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            q(w("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            q(w("Language is not selected"));
            return;
          }
          yield be(!0, "Mendeley (" + w("Inserting citation") + ")");
          var I = h.getSelectedItems(), L = "", F = yield r.getCurrentContentControlTag();
          return F ? r.insertSelectedCitationsToCurrentControl(I, F).then((P) => (h.removeItems(Object.keys(I)), yt(P))).then((P) => {
            P && F && r.showSuccessMessage("Citation has been updated successfully");
          }).catch(function(P) {
            console.error(P), r.showWarningMessage("Failed to edit citation");
            var pe = w("Failed to edit citation");
            typeof P == "string" && (pe += ". " + w(P)), q(pe);
          }).finally(/* @__PURE__ */ S(function* () {
            fe(!1, "Mendeley (" + w("Inserting citation") + ")");
          })) : r.insertSelectedCitations(I).then(function(P) {
            return L = P.internalId, h.removeItems(Object.keys(I)), P.notesStyle ? r.updateCslItemsInNotes(P.notesStyle) : r.updateCslItems();
          }).then(/* @__PURE__ */ S(function* () {
            L && (yield r.moveCursorOutsideControl(L));
          })).catch(function(P) {
            console.error(P);
            var pe = w("Failed to insert citation");
            typeof P == "string" && (pe += ". " + w(P)), q(pe);
          }).finally(/* @__PURE__ */ S(function* () {
            yield fe(!0, "Mendeley (" + w("Inserting citation") + ")");
          }));
        }
      });
      return function(y) {
        return g.apply(this, arguments);
      };
    })()), v.subscribe(function(g) {
      g.type === "button:click" && n.show();
    }), _.subscribe(/* @__PURE__ */ (function() {
      var g = S(function* (y) {
        y.type === "button:click" && (yield be(!1, "Mendeley (" + w("Saving as text") + ")"), r.saveAsText().then(function() {
          fe(!1, "Mendeley (" + w("Saving as text") + ")");
        }));
      });
      return function(y) {
        return g.apply(this, arguments);
      };
    })()), n.onChangeState(/* @__PURE__ */ (function() {
      var g = S(function* (y, I) {
        yield be(!0, "Mendeley (" + w("Updating citations") + ")");
        var L = r.updateCslItems.bind(r, !0);
        [y.styleFormat, I.styleFormat].includes("note") && (y.styleFormat !== I.styleFormat ? y.styleFormat === "note" ? L = r.switchingBetweenNotesAndText.bind(r, y.notesStyle, null) : L = r.switchingBetweenNotesAndText.bind(r, null, I.notesStyle) : y.notesStyle !== I.notesStyle ? L = r.convertNotesStyle.bind(r, y.notesStyle, I.notesStyle) : L = r.updateCslItemsInNotes.bind(r, y.notesStyle)), L().catch(function(F) {
          console.error(F);
          var P = w("Failed to refresh");
          typeof F == "string" && (P += ". " + w(F)), q(P);
        }).finally(function() {
          fe(!1, "Mendeley (" + w("Updating citations") + ")");
        });
      });
      return function(y, I) {
        return g.apply(this, arguments);
      };
    })());
  }
  Asc.plugin.onThemeChanged = function(p) {
    window.Asc.plugin.onThemeChangedBase(p), wt.fixThemeForIE(p), wt.addStylesForComponents(p);
    var g = "";
    g += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + ` !important;}
`, g += ".doc { border-color: " + p["border-regular-control"] + "; background-color: " + p["background-normal"] + `; }
`, g += ".scrollThumb { box-shadow: 0 0 8px 8px " + p["highlight-button-hover"] + ` inset; }
`, g += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + p["canvas-scroll-thumb-pressed"] + ` inset; }
`, g += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + p["canvas-scroll-thumb-hover"] + ` inset; }
`, (["theme-white", "theme-night"].indexOf(p.name) !== -1 || ["theme-white", "theme-night"].indexOf(p.Name) !== -1) && (g += `.doc { border-radius: 4px; }
`);
    var y = document.getElementById("pluginStyles");
    y ? y.innerHTML = g : (y = document.createElement("style"), y.id = "pluginStyles", y.innerHTML = g, document.getElementsByTagName("head")[0].appendChild(y));
    var I = p.type || "light", L = document.body;
    L.classList.remove("theme-dark"), L.classList.remove("theme-light"), L.classList.add("theme-" + I);
  };
  function Ht() {
    for (var p = document.getElementsByClassName("i18n"), g = function() {
      var L = p[y];
      if (!(L instanceof HTMLElement)) return 1;
      ["placeholder", "title"].forEach((P) => {
        L.hasAttribute(P) && L.setAttribute(P, w(L.getAttribute(P) || ""));
      });
      var F = w(L.innerText.trim().replace(/\s+/g, " "));
      F && (L.innerText = F);
    }, y = 0; y < p.length; y++)
      g();
  }
  function q(p) {
    p && typeof p == "string" ? (w(""), _t(E.error, e, !1), E.error.textContent = p, setTimeout(function() {
      window.onclick = function() {
        q(!1);
      };
    }, 100)) : (_t(E.error, e, !0), E.error.textContent = "", window.onclick = null);
  }
  function be(p, g) {
    return Ze.apply(this, arguments);
  }
  function Ze() {
    return Ze = S(function* (p, g) {
      l = !0, b.disable(), N.disable(), d.disable();
      var y = window.Asc.scope.editorVersion;
      y && y < 9004e3 ? window._cursorPosition = yield Nt.getCursorPosition() : yield new Promise((I) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", {
          lockScroll: !0,
          keepSelection: p
        }], I);
      });
    }), Ze.apply(this, arguments);
  }
  function fe(p, g) {
    return Xe.apply(this, arguments);
  }
  function Xe() {
    return Xe = S(function* (p, g) {
      l = !1, b.enable(), N.enable(), vt();
      var y = window.Asc.scope.editorVersion;
      y && y < 9004e3 ? Nt.setCursorPosition(window._cursorPosition || 0) : yield new Promise((I) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", {
          scrollToTarget: p
        }], I);
      });
    }), Xe.apply(this, arguments);
  }
  function _t(p, g, y) {
    y ? p.classList.add(g) : p.classList.remove(g);
  }
  function Be(p) {
    var g = document.getElementById("searchLabel");
    if (!g) {
      console.error("Search label not found");
      return;
    }
    var y = g.querySelector(".when-empty"), I = g.querySelector(".when-not-empty"), L = g.querySelector(".when-started");
    if (!y || !I || !L) {
      console.error("Search label elements not found");
      return;
    }
    switch (y.classList.add("hidden"), I.classList.add("hidden"), L.classList.add("hidden"), p) {
      case "empty":
        y.classList.remove("hidden");
        break;
      case "not-empty":
        I.classList.remove("hidden");
        break;
      case "started":
        I.classList.remove("hidden"), L.classList.remove("hidden");
        break;
    }
  }
  function Rt() {
    console.warn("Loading more..."), o.obj && o.obj.next && He(o.obj.next(), !1);
    for (var p = 0; p < o.groups.length && o.groups[p].next; p++)
      He(i.getGroupItems(o.groups[p].next(), o.groups[p].id), !0);
  }
  function Ut(p) {
    if (t.getRoute() != "main" || p.scrollTop + p.clientHeight < p.scrollHeight)
      return !1;
    var g = !0;
    return o.groups.forEach(function(y) {
      y.next && (g = !1);
    }), !(!o.obj || !o.obj.next || !g || !o.obj && !o.text.trim() && !o.groups.length);
  }
  function He(p, g) {
    return p.then(function(y) {
      return gt(y, null, g);
    }).catch(function(y) {
      return console.error(y), y.message && q(w(y.message)), gt(null, y, g);
    }).then(function(y) {
      return y;
    });
  }
  function gt(p, g, y) {
    var I = !1;
    !o.obj && p && p.items && !p.items.length && (I = !0), g ? (I && (o.obj = null, o.groups = []), o && o.obj && delete o.obj.next) : y && p && p.next ? o.groups.push(p) : o.obj = p && p.items.length ? p : null;
    var L = function(Z) {
      if (!Z.id) return Z;
      var Wt = Z.id.indexOf("/") + 1, et = Z.id.lastIndexOf("/") + 1, zt = Z.id.indexOf("http");
      return Wt !== et && zt === 0 && (Z.uris || (Z.uris = []), Z.uris.push(Z.id)), et && (Z.id = Z.id.substring(et)), Z;
    };
    if (p && p.items && p.items.length > 0)
      for (var F = 0; F < p.items.length; F++) {
        var P = p.items[F];
        P[y ? "groupID" : "userID"] = p.id, L(P);
      }
    return h.displaySearchItems(p, g, o);
  }
  function vt(p) {
    typeof p > "u" && (p = h.count()), p <= 0 ? (d.disable(), d.setText(w("Insert/Edit Citation"))) : (!l && d.enable(), p > 1 ? d.setText(w("Insert " + p + " Citations")) : d.setText(w("Insert/Edit Citation")));
  }
  function Vt() {
    return $e.apply(this, arguments);
  }
  function $e() {
    return $e = S(function* () {
      try {
        var p = yield new Promise((y) => {
          Asc.plugin.executeMethod("GetVersion", [], y);
        });
        p == "develop" && (p = "99.99.99");
        for (var g = p.split("."); 3 > g.length; ) g.push("0");
        return 1e6 * parseInt(g[0]) + 1e3 * parseInt(g[1]) + parseInt(g[2]);
      } catch (y) {
        return console.error(y), 99999999;
      }
    }), $e.apply(this, arguments);
  }
  function Gt() {
    var p = new Asc.ButtonContextMenu();
    p.text = "Edit citation", p.addCheckers("Target", "Selection"), p.attachOnClick(/* @__PURE__ */ S(function* () {
      var g = yield r.getCurrentContentControlTag();
      yield be(!0, "Mendeley (" + w("Updating citations") + ")"), yield yt(g), fe(!1, "Mendeley (" + w("Updating citations") + ")");
    })), Asc.Buttons.registerContextMenu();
  }
  function yt(p) {
    return Qe.apply(this, arguments);
  }
  function Qe() {
    return Qe = S(function* (p) {
      if (!p || p.indexOf("MENDELEY_CITATION") === -1)
        return r.showWarningMessage("No Mendeley citation found at the cursor. Please click directly on a citation to edit it."), !1;
      var g = yield r.showEditCitationWindow(p);
      if (!g)
        return !1;
      var y = r.updateItem.bind(r, g), I = n.getStyleManager();
      return I.getLastUsedFormat() === "note" && (y = r.updateItem.bind(r, g, I.getLastUsedNotesStyle())), y().catch(function(L) {
        console.error(L);
        var F = w("Failed to insert citation");
        return typeof L == "string" && (F += ". " + w(L)), q(F), !1;
      });
    }), Qe.apply(this, arguments);
  }
})();
//# sourceMappingURL=bundle.modern.js.map
