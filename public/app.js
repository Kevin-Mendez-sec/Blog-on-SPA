(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":4,"hyperx":7,"on-load":10}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],4:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],5:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],7:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else if (xstate === COMMENT && opts.comments) {
          reg += String(arg)
        } else if (xstate !== COMMENT) {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      if (opts.createFragment) return opts.createFragment(tree[2])
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else if (x === null || x === undefined) return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":6}],8:[function(require,module,exports){
'use strict';

var DOCUMENT_FRAGMENT_NODE = 11;

function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    // document-fragments dont have attributes so lets not do anything
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }

    // update attributes on original DOM element
    for (var i = 0; i < toNodeAttrs.length; i++) {
        attr = toNodeAttrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                if (attr.prefix === 'xmlns'){
                    attrName = attr.name; // It's not allowed to set an attribute with the XMLNS namespace without specifying the `xmlns` prefix
                }
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    var fromNodeAttrs = fromNode.attributes;

    for (var d = 0; d < fromNodeAttrs.length; d++) {
        attr = fromNodeAttrs[d];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;

            if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
                fromNode.removeAttributeNS(attrNamespaceURI, attrName);
            }
        } else {
            if (!toNode.hasAttribute(attrName)) {
                fromNode.removeAttribute(attrName);
            }
        }
    }
}

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;
var HAS_TEMPLATE_SUPPORT = !!doc && 'content' in doc.createElement('template');
var HAS_RANGE_SUPPORT = !!doc && doc.createRange && 'createContextualFragment' in doc.createRange();

function createFragmentFromTemplate(str) {
    var template = doc.createElement('template');
    template.innerHTML = str;
    return template.content.childNodes[0];
}

function createFragmentFromRange(str) {
    if (!range) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
}

function createFragmentFromWrap(str) {
    var fragment = doc.createElement('body');
    fragment.innerHTML = str;
    return fragment.childNodes[0];
}

/**
 * This is about the same
 * var html = new DOMParser().parseFromString(str, 'text/html');
 * return html.body.firstChild;
 *
 * @method toElement
 * @param {String} str
 */
function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      // avoid restrictions on content for things like `<tr><th>Hi</th></tr>` which
      // createContextualFragment doesn't support
      // <template> support not available in IE
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }

    return createFragmentFromWrap(str);
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name);
        }
    }
}

var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
        var parentNode = fromEl.parentNode;
        if (parentNode) {
            var parentName = parentNode.nodeName.toUpperCase();
            if (parentName === 'OPTGROUP') {
                parentNode = parentNode.parentNode;
                parentName = parentNode && parentNode.nodeName.toUpperCase();
            }
            if (parentName === 'SELECT' && !parentNode.hasAttribute('multiple')) {
                if (fromEl.hasAttribute('selected') && !toEl.selected) {
                    // Workaround for MS Edge bug where the 'selected' attribute can only be
                    // removed if set to a non-empty value:
                    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12087679/
                    fromEl.setAttribute('selected', 'selected');
                    fromEl.removeAttribute('selected');
                }
                // We have to reset select element's selectedIndex to -1, otherwise setting
                // fromEl.selected using the syncBooleanAttrProp below has no effect.
                // The correct selectedIndex will be set in the SELECT special handler below.
                parentNode.selectedIndex = -1;
            }
        }
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!toEl.hasAttribute('value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!toEl.hasAttribute('multiple')) {
            var selectedIndex = -1;
            var i = 0;
            // We have to loop through children of fromEl, not toEl since nodes can be moved
            // from toEl to fromEl directly when morphing.
            // At the time this special handler is invoked, all children have already been morphed
            // and appended to / removed from fromEl, so using fromEl here is safe and correct.
            var curChild = fromEl.firstChild;
            var optgroup;
            var nodeName;
            while(curChild) {
                nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
                if (nodeName === 'OPTGROUP') {
                    optgroup = curChild;
                    curChild = optgroup.firstChild;
                } else {
                    if (nodeName === 'OPTION') {
                        if (curChild.hasAttribute('selected')) {
                            selectedIndex = i;
                            break;
                        }
                        i++;
                    }
                    curChild = curChild.nextSibling;
                    if (!curChild && optgroup) {
                        curChild = optgroup.nextSibling;
                        optgroup = null;
                    }
                }
            }

            fromEl.selectedIndex = selectedIndex;
        }
    }
};

var ELEMENT_NODE = 1;
var DOCUMENT_FRAGMENT_NODE$1 = 11;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = Object.create(null);
        var keyedRemovalList = [];

        function addKeyedRemoval(key) {
            keyedRemovalList.push(key);
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                var fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);

            if (toElKey) {
                // If an element with an ID is being morphed then it will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (!childrenOnly) {
                // optional
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                // update attributes on original DOM element first
                morphAttrs(fromEl, toEl);
                // optional
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
              morphChildren(fromEl, toEl);
            } else {
              specialElHandlers.TEXTAREA(fromEl, toEl);
            }
        }

        function morphChildren(fromEl, toEl) {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;
            var curFromNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            // walk the children
            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                // walk the fromNode children all the way through
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    // this means if the curFromNodeChild doesnt have a match with the curToNodeChild
                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (fromNextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's move the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            // fromNextSibling = curFromNodeChild.nextSibling;

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                // MORPH
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }

                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        // Nothing else to do as we already recursively called morphChildren above
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                } // END: while(curFromNodeChild) {}

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    // MORPH
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphChildren(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
                return;
            }

            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],9:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],10:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":9,"global/document":4,"global/window":5}],11:[function(require,module,exports){
(function (process){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.page = factory());
}(this, (function () { 'use strict';

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var suffix = res[6];
    var asterisk = res[7];

    var repeat = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';
    var delimiter = prefix || '/';
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$');
    }
  }

  return function (obj) {
    var path = '';
    var data = obj || {};

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = encodeURIComponent(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path);
  var re = tokensToRegExp(tokens, options);

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i]);
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';
  var lastToken = tokens[tokens.length - 1];
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.pattern;

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || [];

  if (!isarray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/**
   * Module dependencies.
   */



  /**
   * Short-cuts for global-object checks
   */

  var hasDocument = ('undefined' !== typeof document);
  var hasWindow = ('undefined' !== typeof window);
  var hasHistory = ('undefined' !== typeof history);
  var hasProcess = typeof process !== 'undefined';

  /**
   * Detect click event
   */
  var clickEvent = hasDocument && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var isLocation = hasWindow && !!(window.history.location || window.location);

  /**
   * The page instance
   * @api private
   */
  function Page() {
    // public things
    this.callbacks = [];
    this.exits = [];
    this.current = '';
    this.len = 0;

    // private things
    this._decodeURLComponents = true;
    this._base = '';
    this._strict = false;
    this._running = false;
    this._hashbang = false;

    // bound functions
    this.clickHandler = this.clickHandler.bind(this);
    this._onpopstate = this._onpopstate.bind(this);
  }

  /**
   * Configure the instance of page. This can be called multiple times.
   *
   * @param {Object} options
   * @api public
   */

  Page.prototype.configure = function(options) {
    var opts = options || {};

    this._window = opts.window || (hasWindow && window);
    this._decodeURLComponents = opts.decodeURLComponents !== false;
    this._popstate = opts.popstate !== false && hasWindow;
    this._click = opts.click !== false && hasDocument;
    this._hashbang = !!opts.hashbang;

    var _window = this._window;
    if(this._popstate) {
      _window.addEventListener('popstate', this._onpopstate, false);
    } else if(hasWindow) {
      _window.removeEventListener('popstate', this._onpopstate, false);
    }

    if (this._click) {
      _window.document.addEventListener(clickEvent, this.clickHandler, false);
    } else if(hasDocument) {
      _window.document.removeEventListener(clickEvent, this.clickHandler, false);
    }

    if(this._hashbang && hasWindow && !hasHistory) {
      _window.addEventListener('hashchange', this._onpopstate, false);
    } else if(hasWindow) {
      _window.removeEventListener('hashchange', this._onpopstate, false);
    }
  };

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  Page.prototype.base = function(path) {
    if (0 === arguments.length) return this._base;
    this._base = path;
  };

  /**
   * Gets the `base`, which depends on whether we are using History or
   * hashbang routing.

   * @api private
   */
  Page.prototype._getBase = function() {
    var base = this._base;
    if(!!base) return base;
    var loc = hasWindow && this._window && this._window.location;

    if(hasWindow && this._hashbang && loc && loc.protocol === 'file:') {
      base = loc.pathname;
    }

    return base;
  };

  /**
   * Get or set strict path matching to `enable`
   *
   * @param {boolean} enable
   * @api public
   */

  Page.prototype.strict = function(enable) {
    if (0 === arguments.length) return this._strict;
    this._strict = enable;
  };


  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  Page.prototype.start = function(options) {
    var opts = options || {};
    this.configure(opts);

    if (false === opts.dispatch) return;
    this._running = true;

    var url;
    if(isLocation) {
      var window = this._window;
      var loc = window.location;

      if(this._hashbang && ~loc.hash.indexOf('#!')) {
        url = loc.hash.substr(2) + loc.search;
      } else if (this._hashbang) {
        url = loc.search + loc.hash;
      } else {
        url = loc.pathname + loc.search + loc.hash;
      }
    }

    this.replace(url, null, true, opts.dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  Page.prototype.stop = function() {
    if (!this._running) return;
    this.current = '';
    this.len = 0;
    this._running = false;

    var window = this._window;
    this._click && window.document.removeEventListener(clickEvent, this.clickHandler, false);
    hasWindow && window.removeEventListener('popstate', this._onpopstate, false);
    hasWindow && window.removeEventListener('hashchange', this._onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  Page.prototype.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state, this),
      prev = this.prevContext;
    this.prevContext = ctx;
    this.current = ctx.path;
    if (false !== dispatch) this.dispatch(ctx, prev);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  Page.prototype.back = function(path, state) {
    var page = this;
    if (this.len > 0) {
      var window = this._window;
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      hasHistory && window.history.back();
      this.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    } else {
      setTimeout(function() {
        page.show(page._getBase(), state);
      });
    }
  };

  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  Page.prototype.redirect = function(from, to) {
    var inst = this;

    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page.call(this, from, function(e) {
        setTimeout(function() {
          inst.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        inst.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  Page.prototype.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state, this),
      prev = this.prevContext;
    this.prevContext = ctx;
    this.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) this.dispatch(ctx, prev);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */

  Page.prototype.dispatch = function(ctx, prev) {
    var i = 0, j = 0, page = this;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled.call(page, ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  Page.prototype.exit = function(path, fn) {
    if (typeof path === 'function') {
      return this.exit('*', path);
    }

    var route = new Route(path, null, this);
    for (var i = 1; i < arguments.length; ++i) {
      this.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Handle "click" events.
   */

  /* jshint +W054 */
  Page.prototype.clickHandler = function(e) {
    if (1 !== this._which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;

    // ensure link
    // use shadow dom when available if not, fall back to composedPath()
    // for browsers that only have shady
    var el = e.target;
    var eventPath = e.path || (e.composedPath ? e.composedPath() : null);

    if(eventPath) {
      for (var i = 0; i < eventPath.length; i++) {
        if (!eventPath[i].nodeName) continue;
        if (eventPath[i].nodeName.toUpperCase() !== 'A') continue;
        if (!eventPath[i].href) continue;

        el = eventPath[i];
        break;
      }
    }

    // continue ensure link
    // el.nodeName for svg links are 'a' instead of 'A'
    while (el && 'A' !== el.nodeName.toUpperCase()) el = el.parentNode;
    if (!el || 'A' !== el.nodeName.toUpperCase()) return;

    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    var svg = (typeof el.href === 'object') && el.href.constructor.name === 'SVGAnimatedString';

    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if(!this._hashbang && this._samePath(el) && (el.hash || '#' === link)) return;

    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    // svg target is an object and its desired value is in .baseVal property
    if (svg ? el.target.baseVal : el.target) return;

    // x-origin
    // note: svg links that are not relative don't call click events (and skip page.js)
    // consequently, all svg links tested inside page.js are relative and in the same origin
    if (!svg && !this.sameOrigin(el.href)) return;

    // rebuild path
    // There aren't .pathname and .search properties in svg links, so we use href
    // Also, svg href is an object and its desired value is in .baseVal property
    var path = svg ? el.href.baseVal : (el.pathname + el.search + (el.hash || ''));

    path = path[0] !== '/' ? '/' + path : path;

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (hasProcess && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;
    var pageBase = this._getBase();

    if (path.indexOf(pageBase) === 0) {
      path = path.substr(pageBase.length);
    }

    if (this._hashbang) path = path.replace('#!', '');

    if (pageBase && orig === path && (!isLocation || this._window.location.protocol !== 'file:')) {
      return;
    }

    e.preventDefault();
    this.show(orig);
  };

  /**
   * Handle "populate" events.
   * @api private
   */

  Page.prototype._onpopstate = (function () {
    var loaded = false;
    if ( ! hasWindow ) {
      return function () {};
    }
    if (hasDocument && document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      var page = this;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else if (isLocation) {
        var loc = page._window.location;
        page.show(loc.pathname + loc.search + loc.hash, undefined, undefined, false);
      }
    };
  })();

  /**
   * Event button.
   */
  Page.prototype._which = function(e) {
    e = e || (hasWindow && this._window.event);
    return null == e.which ? e.button : e.which;
  };

  /**
   * Convert to a URL object
   * @api private
   */
  Page.prototype._toURL = function(href) {
    var window = this._window;
    if(typeof URL === 'function' && isLocation) {
      return new URL(href, window.location.toString());
    } else if (hasDocument) {
      var anc = window.document.createElement('a');
      anc.href = href;
      return anc;
    }
  };

  /**
   * Check if `href` is the same origin.
   * @param {string} href
   * @api public
   */

  Page.prototype.sameOrigin = function(href) {
    if(!href || !isLocation) return false;

    var url = this._toURL(href);
    var window = this._window;

    var loc = window.location;

    /*
       when the port is the default http port 80, internet explorer 11
       returns an empty string for loc.port, so we need to compare loc.port
       with an empty string if url.port is the default port 80.
    */
    return loc.protocol === url.protocol &&
      loc.hostname === url.hostname &&
      (loc.port === url.port || loc.port === '' && url.port === 80);
  };

  /**
   * @api private
   */
  Page.prototype._samePath = function(url) {
    if(!isLocation) return false;
    var window = this._window;
    var loc = window.location;
    return url.pathname === loc.pathname &&
      url.search === loc.search;
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   * @api private
   */
  Page.prototype._decodeURLEncodedURIComponent = function(val) {
    if (typeof val !== 'string') { return val; }
    return this._decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  };

  /**
   * Create a new `page` instance and function
   */
  function createPage() {
    var pageInstance = new Page();

    function pageFn(/* args */) {
      return page.apply(pageInstance, arguments);
    }

    // Copy all of the things over. In 2.0 maybe we use setPrototypeOf
    pageFn.callbacks = pageInstance.callbacks;
    pageFn.exits = pageInstance.exits;
    pageFn.base = pageInstance.base.bind(pageInstance);
    pageFn.strict = pageInstance.strict.bind(pageInstance);
    pageFn.start = pageInstance.start.bind(pageInstance);
    pageFn.stop = pageInstance.stop.bind(pageInstance);
    pageFn.show = pageInstance.show.bind(pageInstance);
    pageFn.back = pageInstance.back.bind(pageInstance);
    pageFn.redirect = pageInstance.redirect.bind(pageInstance);
    pageFn.replace = pageInstance.replace.bind(pageInstance);
    pageFn.dispatch = pageInstance.dispatch.bind(pageInstance);
    pageFn.exit = pageInstance.exit.bind(pageInstance);
    pageFn.configure = pageInstance.configure.bind(pageInstance);
    pageFn.sameOrigin = pageInstance.sameOrigin.bind(pageInstance);
    pageFn.clickHandler = pageInstance.clickHandler.bind(pageInstance);

    pageFn.create = createPage;

    Object.defineProperty(pageFn, 'len', {
      get: function(){
        return pageInstance.len;
      },
      set: function(val) {
        pageInstance.len = val;
      }
    });

    Object.defineProperty(pageFn, 'current', {
      get: function(){
        return pageInstance.current;
      },
      set: function(val) {
        pageInstance.current = val;
      }
    });

    // In 2.0 these can be named exports
    pageFn.Context = Context;
    pageFn.Route = Route;

    return pageFn;
  }

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page.call(this, '*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path), null, this);
      for (var i = 1; i < arguments.length; ++i) {
        this.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      this['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      this.start(path);
    }
  }

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;
    var page = this;
    var window = page._window;

    if (page._hashbang) {
      current = isLocation && this._getBase() + window.location.hash.replace('#!', '');
    } else {
      current = isLocation && window.location.pathname + window.location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    isLocation && (window.location.href = ctx.canonicalPath);
  }

  /**
   * Escapes RegExp characters in the given string.
   *
   * @param {string} s
   * @api private
   */
  function escapeRegExp(s) {
    return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state, pageInstance) {
    var _page = this.page = pageInstance || page;
    var window = _page._window;
    var hashbang = _page._hashbang;

    var pageBase = _page._getBase();
    if ('/' === path[0] && 0 !== path.indexOf(pageBase)) path = pageBase + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    var re = new RegExp('^' + escapeRegExp(pageBase));
    this.path = path.replace(re, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = (hasDocument && window.document.title);
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? _page._decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = _page._decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = this.pathname = parts[0];
      this.hash = _page._decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    var page = this.page;
    var window = page._window;
    var hashbang = page._hashbang;

    page.len++;
    if (hasHistory) {
        window.history.pushState(this.state, this.title,
          hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
    }
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    var page = this.page;
    if (hasHistory) {
        page._window.history.replaceState(this.state, this.title,
          page._hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
    }
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options, page) {
    var _page = this.page = page || globalPage;
    var opts = options || {};
    opts.strict = opts.strict || page._strict;
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathToRegexp_1(this.path, this.keys = [], opts);
  }

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;
	  
    delete params[0]

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = this.page._decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Module exports.
   */

  var globalPage = createPage();
  var page_js = globalPage;
  var default_1 = globalPage;

page_js.default = default_1;

return page_js;

})));

}).call(this,require('_process'))
},{"_process":12}],12:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],13:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":14,"bel":1,"morphdom":8}],14:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],15:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

page('/calculo', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template2);
});

},{"./template":16,"./template2":17,"empty-element":3,"page":11}],16:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<h1> aqui va lo de calculo</h2>
`;

},{"yo-yo":13}],17:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`

<div>
    <h1>about calculo</h1>
 <!--<img src="planeta.gif" width="260px" height="200px" alt="">-->
</div>

`;

},{"yo-yo":13}],18:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

var template3 = require('./template3');

var template4 = require('./template4');

var template5 = require('./template5');

page('/Cultura', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template3);
  empty(plantas).appendChild(template4);
});
page('/Cultura2', function (ctx, next) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  var plantas = document.getElementById('plantas');
  empty(arriba);
  empty(main).appendChild(template2);
  empty(about).appendChild(template3);
  empty(plantas).appendChild(template5);
});

},{"./template":19,"./template2":20,"./template3":21,"./template4":22,"./template5":23,"empty-element":3,"page":11}],19:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`

<div>
    <h1 class="p-3 text-center titulo"> Cultura ambiental y Desarrollo sustentable</h1>
    <div class="text-justify">
        <!--INTRODUCCION-->
        <div>
            <div class="rounded-pill" style="background-color:#FA8072">
                <h5 class="p-4 text-center  subtitulo">CÓMO EL TRÁFICO EN LAS CALLES DE HERIBERTO HENRÍQUEZ Y CEBORUCO
                    AFECTA DE MANERA VISUAL Y AUDITIVA A LOS ALUMNOS DEL PLANTEL "DR. ANGEL MA. GARIBAY KINTANA" Y A LA
                    BIODIVERSIDAD.</h5>
            </div>
            <p class="p-2">
                En los últimos años el aumento de la demanda de transporte y del tránsito vial han traído como
                consecuencia, particularmente en las ciudades grandes, incrementos en la congestión, demoras, accidentes
                y problemas ambientales, bastante mayores que los considerados aceptables por los ciudadanos.
            </p>
            <p class="p-2">
                En la ciudad de Toluca, en las calles de Heriberto Enríquez y Ceboruco se presenta la problemática de un
                tráfico excesivo por las mañanas de 6:50 a 9:00 am y por las tardes de las 19:00 a las 21:00 horas, lo
                que provoca contaminación auditiva ya que los automovilistas tienden a pitar el claxon muchas veces sin
                parar hasta que avanzan, así como contaminación visual ya que nos llega exceso de información en colores
                y luces de los vehículos, lo que provoca que nuestro cerebro no pueda procesarla debidamente y, al
                final, todo ello nos perjudica. Este fenómeno afecta no sólo a los automovilistas, sino que también a
                los alumnos del plantel “Dr. Angel Ma. Garibay Kintana” ya que propicia estrés y a su vez quizá una
                disminución en su rendimiento académico.
            </p>
            <div class="row pb-1">
                <div class="col-5">
                    <img class="wow slideInLeft" src="trafico-introduccion.png" width="300px" height="400">
                </div>
                <div class="col-xl-7 pt-2">
                    <p>
                        Una las principales causas de este problema además del exceso de vehículos, es que los semáforos
                        que se ubican en las esquinas de estas calles están totalmente desincronizados y duran muy poco
                        para que los automóviles puedan pasar. Otro factor muy importante es la hora de entrada y de
                        salida de los alumnos de la escuela preparatoria ya que los padres estacionan sus autos por
                        ambos lados de las calles entorpeciendo el tránsito
                    </p>
                </div>
            </div>
            <p class="p-2">
                Sin entrar a plantear soluciones específicas, este documento pretende analizar cuáles son los
                factores y las
                consecuencias del tráfico, verdadera desgracia moderna de las zonas urbanas y amenaza para la
                calidad de vida de sus
                habitantes.
            </p>
        </div>
        <!--PLANTEAMINETO DEL PROBLEMA-->
        <div class="text-justify">
            <h5 class="p-2 text-center rounded-pill subtitulo" style="background-color: #FFA500;">PLANTEAMINETO DEL
                PROBLEMA</h5>
            <p class="p-2 text-center">
                Cómo el tráfico en las calles de Heriberto Henríquez y Ceboruco afecta de manera visual y auditiva a los
                alumnos del plantel “Dr. Ángel Ma. Garibay Kintana” y a la biodiversidad ambiental.
            </p>
            <p class="pb-2">En los últimos años el aumento de la demanda de transporte y del tránsito vial han traído
                como consecuencia la congestión en términos de pérdida de eficiencia económica sumándole sus
                consecuencias negativas para la sociedad, ya que el tráfico en las calles de Heriberto Henríquez y
                Ceboruco afecta de manera visual y auditiva a los alumnos del plantel “Dr. Ángel Ma. Garibay Kintana” y
                a su entorno ambiental, abarcando aspectos económicos, psicológicos, ecológicos y de salud. De tal forma
                que es necesario que se reduzca el tráfico y a su vez la contaminación del medio ambiente. </p>
        </div>
        <!--justificacion-->
        <div>
            <h5 class="p-2 text-center rounded-pill subtitulo" style="background-color: #9370DB;">JUSTIFICACIÓN</h5>
            <p class="p-2">
                El tema de investigación fue elegido por ser un problema social de actualidad. El presente trabajo tiene
                como finalidad el análisis de las afecciones por el tráfico a los alumnos del Plantel 5 “Dr. Ángel Ma.
                Garibay Kintana” y la repercusión al medio ambiente y a la biodiversidad.
            </p>
            <p class="pb-2">
                Es necesario hacer mención que el uso de transportes a gasolina de manera irresponsable es un problema
                del que no muchos son conscientes. Si nos percatáramos de cuanto tiempo invertimos en el traslado a
                nuestros destinos y la producción de CO2 que esto ocasiona por cada alumno, nos daríamos cuenta del
                impacto que tiene en la naturaleza y en nuestra salud, que a largo plazo va en aumento.
            </p>
        </div>
        <!--objetivos-->
        <div>
            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #008080">OBJETIVOS</h5>
            <h6 class="pb-1 text-center objetivos">Generales</h6>
            <div class="rounded" style="background-color: #1ba3a3;">
                <p class="p-1">
                    1.- Lograr que se disminuya el trafico en las calles de Heriberto Henríquez y Ceboruco.
                </p>
                <p class="pb-1">2. Reducir la contaminación afecta de manera visual y auditiva a los alumnos del Plantel
                    5
                    “Dr. Ángel Ma. Garibay Kintana” y a su entorno ambiental. </p>
                <p class="pb-1">3. Mejorar el desempeño académico de los alumnos del plantel. </p>
            </div>

            <h6 class="pb-1 text-center objetivos">Especificos</h6>
            <div class="rounded" style="background: aquamarine;">
                <p class="pb-1">1. Colocar semáforos inteligentes. </p>
                <p class="pb-1">2. Disminuir la congestión automovilística</p>
                <p class="pb-1">3. Reducir el efecto que el trafico vehicular tiene sobre los alumnos.</p>
                <p class="pb-1">4. Recuperar la biodiversidad cercana al Plantel 5 “Dr. Ángel Ma. Garibay Kintana”</p>
            </div>


        </div>
        <!--hipotesis-->
        <div>
            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #DAA520;">HIPÓTESIS</h5>
            <p class="pb-2">
                Los alumnos del Plantel 5 “Dr. Ángel Ma. Garibay Kintana” aumentarían su aprovechamiento académico si
                los efectos del trafico en las calles de Heriberto Enríquez y Ceboruco disminuyen.
            </p>
            <p class="pb-2">
                Con la disminución de los niveles de trafico en las calles de Heriberto Enríquez y Ceboruco se podría
                recuperar la biodiversidad en el Plantel 5 “Dr. Ángel Ma. Garibay Kintana”.
            </p>
        </div>
        <!--ARGUMENTACIÓN TEÓRICO – METODOLÓGICA-->
        <div>
            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #778899;">ARGUMENTACIÓN TEÓRICO
                –
                METODOLÓGICA</h5><br>
            <h6 class="pb-2 objetivos text-center">¿Cuáles son las afectaciones de esta problemática?</h6>
            <p class="pb-2">En los últimos años, especialmente desde principios de los años noventa, el aumento de la
                demanda de transporte y del tránsito vial han causado, particularmente en las ciudades grandes, más
                congestión, demoras, accidentes y problemas ambientales. Ese aumento explosivo surge de un mayor acceso
                al automóvil, al elevarse el poder adquisitivo, más acceso al crédito, reducción de los precios de
                venta, más oferta de autos usados, crecimiento de la población, menos habitantes por hogar y escasa
                aplicación de políticas estructuradas en el transporte urbano.</p>
            <p class="pb-2">La contaminación urbana de los países en vía de desarrollo podría parecer a simple vista un
                tema trivial e intrascendente, si no fuese porque la población que albergan muestra un crecimiento
                exponencial superior al nacional y al mundial (Naciones Unidas, 2004)</p>

            <h6 class="pb-2 objetivos text-center"> Contaminación auditiva</h6>
            <p class="pb-2">A la contaminación por ruido, de manera particular, se le ha prestado muy poca atención por
                cuanto la condición emerge lentamente, rara vez requiere de atención médica inmediata y no es fatal. Sin
                embargo y, a manera de ejemplo, entre 1980 y 1990 por lo menos 4 millones de trabajadores en Estados
                Unidos fueron expuestos a niveles de ruido conducentes a la pérdida auditiva (Committee to Review the
                NIOSH Hearing Loss Research Program, 2006).</p>
            <div class="row pb-1">
                <div class="col-5">
                    <img class="wow rotateInUpLeft" src="trafico-teorico.png" width="300" height="400" alt="">
                </div>
                <div class="col-xl-7">
                    <p>El ruido proveniente del trasporte vehicular constituye la principal fuente emisora de este
                        contaminante en las ciudades, producto de la necesidad de movilización diaria de millones de
                        personas a la escuela o al trabajo, además de los requerimientos de transporte para soporte del
                        sistema industrial, comercial, de servicios y administrativo. Mientras una conversación normal
                        transcurre aproximadamente a 55 decibeles (dBA) (Gandía, 2003), el ruido vehicular de muchas
                        ciudades del mundo alcanza entre 80 y 90 dBA, equiparándose incluso en algunos casos, con el de
                        un taladro neumático.</p>
                </div>
            </div>
            <p class="pb-2">Genera discapacidades y cambios en el comportamiento. Incluye problemas de concentración,
                fatiga, pérdida de confianza, irritación, malentendidos, pérdida de capacidad de trabajo, problemas de
                relaciones humanas y estrés. </p>
            <p class="pb-2">Una conversación normal ocurre de 50 a 55 dBA y para que la inteligibilidad de una
                conversación sea adecuada, la relación entre habla y ruido debe ser menor a 15 – 18 dBA. Los ruidos
                superiores a 35 o 40 dBA, provocan dificultades en la comunicación oral y, a partir de 65 dBA, las
                conversaciones se tornan extremadamente difíciles (OMS, 1999).</p>
            <p class="pb-2">Ha sido ampliamente documentado que la exposición al ruido afecta las capacidades de
                atención, motivación, memoria, lectura y desempeño en tareas cognitivas complejas, hecho que induce a un
                mayor número de accidentes. </p>
            <p class="pb-2">En México, por ejemplo, millones de personas pierden más de dos años de su vida atascados en
                el tráfico. En el portal Comunidad Vial México se asegura que hay ciudadanos que pasan hasta cuatro o
                más horas diarias en medio de largas filas de autos en avenidas y calles en la metrópoli. Las personas
                jóvenes son más propensas a sufrir estrés por el tráfico vehicular, debido al manejo inadecuado de
                cuadros de irritabilidad, ansiedad y angustia.</p>

            <h6 class="pb-2 objetivos text-center"> La contaminación visual </h6>
            <p class="pb-2">Estamos tan acostumbrados a ella que no nos damos cuenta de que nos enferma y nos afecta
                anímicamente. Especialmente en las ciudades, la contaminación visual está en todas partes, en todos los
                entornos, hacia cualquier lado que volteemos.</p>
            <p class="pb-2">Este tipo de contaminación afecta o perturba la vista de algún sitio o paisaje, destruye su
                estética y su esencia original; ocurre porque existe un abuso de elementos no arquitectónicos que
                alteran la imagen rural, urbana, y de cualquier entorno.</p>
            <p class="pb-2">Datos de la Organización Mundial de la Salud (OMS) indican que 40% de quienes habitan un
                departamento u oficina con paisajes desagradables, tiende a deprimirse, lo que significa que la
                contaminación visual puede afectar nuestra salud de manera considerable.</p>
            <p class="pb-2">“Los humanos necesitamos a la vista cosas naturalmente hermosas, como las aves, los árboles
                o el cielo para sentirnos bien anímicamente, con tranquilidad y sin estrés, pero la mayoría de las veces
                los grandes edificios nos impiden llenarnos la pupila con un entorno bello” (Jorge Márquez,2019) </p>
            <p class="pb-2">Un estudio publicado en la revista Epidemiology muestra que los niveles diarios de dióxido
                de nitrógeno (NO2) y carbono elemental (o carbono negro), dos de los contaminantes asociados al tráfico,
                producen fluctuaciones en la función de la atención en alumnos.</p>
            <p class="pb-2">El punto de partida de este estudio era un trabajo anterior que establecía una relación
                entre la exposición de alumnos a la contaminación atmosférica procedente del tráfico y el desarrollo de
                la función de la atención y la memoria de trabajo a largo plazo.</p>
            <p class="pb-2">El análisis de los resultados muestra que los incrementos en los niveles ambientales de los
                contaminantes procedentes del tráfico están asociados con una disminución en todos los procesos de
                atención dentro de las aulas.</p>
            <p class="pb-2">La contaminación acústica en los centros educativos es la suma de tres problemas que se
                agravan entre sí. El primer factor es el ruido procedente de fuentes externas (calles, obras, tráfico,
                etc.) Eso hace que el volumen de voz de alumnos y profesores se eleve e incluso se deba de detener la
                clase creando el segundo problema, y por último, el tercer factor que incide en las aulas es la
                reverberación: el efecto producido por los rebotes de la onda sonora en paredes, piso, techo y todos los
                objetos del aula, que hace que el alumno no sólo reciba el mensaje hablado en forma directa, sino
                innumerables copias de ese mensaje, fruto de la reflexión sobre paredes y objetos del recinto.</p>

            <h6 class="pb-6 objetivos text-center">Biodiversidad</h6>
            <p class="pb-2">La elección de un hábitat por parte de los animales depende, y mucho, de los ruidos que se
                producen en él. Si un animal no puede tolerar el ruido del entorno, no tolerará ninguna de sus
                condiciones. Eso hace que la contaminación acústica de vehículos, fábricas, talado de árboles o turismo
                altere el delicado equilibrio de los ecosistemas salvajes.</p>
            <p class="pb-2">Si los animales en los escalones más bajos de la pirámide alimentaria huyen, tras ellos se
                marchan sus depredadores. Si son los depredadores los que se ven afectados por la contaminación
                acústica, sus presas empiezan a crecer fuera de control. Eso empieza a afectar también a la flora,
                cambiando por completo paisajes y zonas.</p>
            <p class="pb-2">Los pájaros en una ciudad necesitan cantar y llamar de manera más prolongada (y a mayor
                volumen), que su misma especie cuando vive en el campo. De hecho, debido a la contaminación acústica,
                algunas especies como el petirrojo europeo que vive en ciudades ha comenzado a cantar de noche, para que
                se le oiga y pueda sobrevivir reproduciéndose. </p>
            <p class="pb-2">No son las únicas especies que se ven afectadas. Se ha estudiado cómo el ruido del tráfico
                afecta también al proceso reproductivo de las ranas en zonas metropolitanas. Ese ruido ahoga las
                llamadas de apareamiento de los machos, de manera que no pueden perpetuarse.</p>
            <p class="pb-2">Una gran parte de nuestra vida es desperdiciar horas y horas a la semana metido en el coche
                para llegar al trabajo, a la escuela y al hogar. En las calles de Heriberto Henríquez y Ceboruco se
                desperdician aproximadamente 15 minutos extras en trayectos por culpa del tráfico, lo que es demasiado
                tiempo, que se suma a los niveles de contaminación atmosférica, efecto invernadero y lluvia ácida que
                provocan las grandes concentraciones de gases que emiten los coches. </p>


            <h6 class="pb-2 objetivos text-center">A la salud</h6>
            <p class="pb-2">Cuando se habla de riesgos para la salud asociados al tráfico siempre nos centramos en las
                muertes y discapacidades asociadas a los accidentes de circulación. </p>
            <div class="row pb-1">
                <div class="col-5">
                    <img class="wow fadeInLeft" src="trafico-salud.png" width="300" height="400">
                </div>
                <div class="col-xl-7">
                    <p class="pb-2">Sin embargo, estudios realizados en varios países de la Comunidad Europea demuestran
                        que la contaminación producida por el tráfico es responsable de más muertes que las producidas
                        por los accidentes. (Madrid Salud. (11/09/2018) comunidad Europea.)</p>
                    <p class="pb-2">Muchas son las causas que asocian el tráfico de vehículos a motor con aumento de la
                        mortalidad y de los ingresos hospitalarios de entre ellas, las más significativas y estudiadas,
                        son las producidas por los gases emitidos por los motores (estrés cardiaco, arterioesclerosis,
                        aumento de crisis asmáticas, alergias respiratorias etc.), el ruido o las consecuencias
                        derivadas del sedentarismo.</p>
                </div>
            </div>
            <p class="pb-2">La exposición constante al ruido del tráfico produce elevaciones de la tensión arterial y de
                niveles en sangre de hormonas ligados al estrés, produciendo aumento de ingresos hospitalarios y muertes
                por enfermedades cardiovasculares. También es responsable de otras alteraciones respiratorias,
                neurológicas, dermatológicas y digestivas. También, se ve afectada la salud de los ojos hasta la del
                cerebro por la gran cantidad de luces de los faros de los autos.</p>

            <h6 class="pb-2 objetivos text-center">Economia</h6>
            <p class="pb-2">Este fenómeno afecta no sólo a los automovilistas ya que entre más tiempo se tarden en el
                tráfico, más gasolina consumirán sus autos y por ende gastaran más, también afecta a los usuarios del
                transporte colectivo, que son personas de ingresos menores, pues aumenta sus tiempos de viaje y, quizás
                de mayor consideración, hace subir el valor de los pasajes.</p>
            <div class="row pb-1">
                <div class="col-5">
                    <img class="wow zoomInLeft" src="gasolineria.jpg" width="300" height="150" alt="">
                </div>
                <div class="col-xl-7">
                    <p class="pb-2">Con estos datos, es fácil entender por qué la movilidad urbana y la gestión de la
                        circulación de vehículos se ha convertido en uno de los grandes retos que deben afrontar las
                        urbes.</p>
                </div>
            </div>

            <h5 class="pb-2 text-center rounded-pill subtitulo" style="background-color: #FFC0CB;">SOLUCIONES</h6>
                <p class="pb-2">Las soluciones tradicionales -construir más calles - no bastarán para superar el
                    crecimiento del tránsito en Toluca, de modo que es necesario implementar múltiples soluciones
                    simultáneamente para evitar el colapso de las redes de transporte. Se necesitan nuevas técnicas que
                    permitan a los funcionarios de la red vial entender mejor y manejar proactivamente el flujo del
                    tránsito.</p>
                <p class="pb-2">Las nuevas tecnologías se presentan como la única opción viable para racionalizar los
                    traslados y el movimiento de los coches en las ciudades. Carolina Osorio, profesora e investigadora
                    del MIT, lleva tiempo trabajando en buscar soluciones a este problema. Para ello ha ideado un
                    algoritmo que recoge la información proporcionada por las cámaras y sensores instalados en distintas
                    ciudades, y propone mejoras en la gestión del tráfico.</p>
                <div class="row">
                    <div class="col-5">
                        <img class="wow rotateInUpLeft" src="trafico-soluciones.jpg" width="300" height="400" alt="">
                    </div>
                    <div class="col-xl-7">
                        <p class="pb-2">Una alternativa que es factible es mejorar el sistema de tránsito por medio de
                            semáforos inteligentes que den prioridad a las calles con más tráfico para así evitarlo;
                            además estos semáforos inteligentes pueden alimentarse de energía solar lo cual beneficia al
                            medio ambiente y a su vez se disminuirían los niveles de contaminación atmosférica por gases
                            de 〖CO〗^2.</p>
                        <p class="pb-2">Ver cómo podemos programar la red de estos semáforos que conectan a las calles
                            de forma que no se genere una congestión vehicular, pero también que el flujo dentro de la
                            colonia y calles aledañas no se vea afectado. </p>
                    </div>
                </div>
        </div>
        <!--cronograma-->
        <div>
            <h5 class="p-2 text-center rounded-pill subtitulo" style="background-color: #BC8F8F;">CRONOGRAMA</h5>
            <img class="img-fluid wow rollIn" src="cronograma.png" width="800" height="500">
            <p class="pb-1"></p>
        </div>
    </div>
    <nav class="blog-pagination">
        <a href="/Cultura2#cult2" class="btn btn-outline-primary">Segunda parte</a>
    </nav>
</div>

`;

},{"yo-yo":13}],20:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h2 class="blog-post-title"> Gráficas de los resultados de encuesta</h2>
    <div id="cult2" class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-1.png">
        <p class="p-2 text-justify">
            Del total de las encuestas aplicadas más de la mitad de los encuestados dice presentar desconcentración a
            causa del ruido, al 29% le es más complicado comunicarse debido a esto, el 12.9% restante no lo considera
            molesto. Ninguno de los encuestados siente que su rendimiento académico se vea directamente afectado debido
            al ruido.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-2.png" alt="">
        <p class="p-2 text-justify">
            En los resultados obtenidos podemos afirmar que la mayor parte de los alumnos encuestados se encuentra poco
            informado con respecto a la contaminación sobre la contaminación por trafico vehicular ,12.9% se encuentra
            muy informado al respecto ,por el contrario el otro 12.9% restante está nada informado.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-3.png">
        <p class="p-2 text-justify">
            Dados los resultados de la encuesta más de la mitad de los encuestados dice ver trafico intenso cerca del
            plantel siempre , un 35.5% dice que casi siempre se crea tráfico , un 3.2% dice que casi nunca y el 3.2%
            restante dice que nunca.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-4.png">
        <p class="p-2 text-justify">
            Alrededor de la mitad de alumnos llega antes de que se genere el trafico, el 12.9% no le es posible evitarlo
            y el 32.2% prefiere ir caminado
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-5.png" alt="" srcset="">
        <p class="p-2 text-justify">
            De los 3 tipos de contaminación dados en cada opción la mayoría de los alumnos dice que los 3 tipos aplican,
            El 19.4% considera que el problema que genera es contaminación del aire, otro 19.4% cree que causa
            contaminación auditiva. Y únicamente 3.2% dice que solo genera disminución de la biodiversidad.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-6.png" alt="">
        <p class="p-2 text-justify">
            El 54% de los encuestado dice que la producción del trafico es a causa del uso innecesario de automóviles ,
            el 32.3% dice que el mal manejo de los automovilistas es lo que lo causa y solo el 12.9% dice que es a causa
            de la mala programación de los semáforos.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-7.png">
        <p class="p-2 text-justify">
            La mitad de la población estudiantil encuestada piensa que el trafico vehicular tiene poca importancia en la
            disminución de la biodiversidad , el 32.3% cree que tiene mucha importancia y para el 16.1% no tiene ninguna
            importancia.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-8.png">
        <p class="p-2 text-justify">
            El 25.8% de los encuestados piensa que la perdida de la biodiversidad es un problema derivado de la
            contaminación auditiva, el 38.7% dice que los problemas de comunicación es un derivado de esta
            contaminación, el 32.3% cree que los conflictos interpersonales se derivan de esta.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-9.png">
        <p class="p-2 text-justify">
            Más la mitad de los encuestado pierde entre 10 y 20 minutos en el trafico , el 38.7% pierde de 30 a 40
            minutos solo el 3.2% de los alumnos pierde 1 hora o más.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-10.png" alt="">
        <p class="p-2 text-justify">
            La mayor parte de los encuestados solo utiliza de manera innecesaria algún medio de transporte 1 vez por
            semana, otra gran parte 2 veces por semana, una menor parte 5 veces por semana y un 22.6% más de 7 veces por
            semana.
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-11.png" alt="">
        <p class="p-2 text-justify">
            Poco más de la mitad de los encuestado piensa que es importante disminuir el tráfico para reducir la
            contaminación , una cuarta parte dice que para mejorar la calidad de vida y el resto dice que para cuidar al
            medio ambiente
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-12.png" alt="">
        <p class="p-2 text-justify">
            Prácticamente todos los alumnos encuestados dicen que en el ultimo semestre sus profesores de tuvieron 5
            veces la clase y solo una persona dice que más de 15 veces sucedió esto
        </p>
    </div>
    <div class="text-center">
        <img class="img-fluid" style="border:black;border-width:2px;border-style: solid;border-radius: 20px;"
            width="600" height="300" src="Grafica-13.png" alt="">
        <p class="p-2 text-justify">
            La mitad de los alumnos se preocupa frecuentemente por la biodiversidad dentro del plantel , otra gran parte
            dice que siempre lo hace y una pequeña parte dice que nunca lo hace.
        </p>
    </div>
    <div class="text-center">
        <h3> 14.- ¿Tienes alguna propuesta para reducir el tráfico vehicular? </h3>
        <p class="p-2 text-justify">
            Para esta pregunta la mayoría de los alumnos propone, entre otras,
            cosas el incrementar el uso de la bicicleta , así como implementar el
            uso de ciclo vías , mientras que otra parte de la población estudiantil
            encuestada tiene propuestas relacionadas con disminuir el uso de
            automóviles tales como limitar los autos a 1 por familia o por cuenta
            propia utilizar el auto solo cuando sea necesario , la parte restante de
            los encuestados tiene propuestas mayormente dirigidas hacia la
            sociedad , con cosas como hacer conciencia sobre los problemas que
            el trafico genera,etc.
        </p>
    </div>
</div>

`;

},{"yo-yo":13}],21:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
  <div>
      <img class="shadow-lg" src="planeta.gif" width="260px" height="200px" alt="">
  </div>
 `;

},{"yo-yo":13}],22:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = yo`
<div>
    <div class="d-none d-xl-block">
        <br><br><br><br>
        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
            
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        
        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">

            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
            
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        
        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

        <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    </div>
</div>

`;

},{"yo-yo":13}],23:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = yo`
<div class="d-none d-xl-block">
    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
        
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    
    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
    
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <img class="plantas" planta src="https://especiales.semana.com/especiales/inventario-biblioteca-nacional/images/enredadera.png">
</div>
`;

},{"yo-yo":13}],24:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

page('/derecho', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  var plantas = document.getElementById('plantas');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template2);
  empty(plantas);
});

},{"./template":25,"./template2":26,"empty-element":3,"page":11}],25:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1 class="blog-post-title text-center">
        <img  class="bd-placeholder-img" width="40" height="40" src="https://4.bp.blogspot.com/-qQ4Slr-kFwM/Vt7inkcNylI/AAAAAAAAB3M/WKKQeO2yGic/s1600-r/DerechoAmbiental.png">            
        NOCIONES DE DERECHO
        <img class="bd-placeholder-img" width="40" height="40" src="https://4.bp.blogspot.com/-qQ4Slr-kFwM/Vt7inkcNylI/AAAAAAAAB3M/WKKQeO2yGic/s1600-r/DerechoAmbiental.png">
    </h1>    
        <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
        </div>
</div>
    
`;

},{"yo-yo":13}],26:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1>about derecho</h1>
</div>
`;

},{"yo-yo":13}],27:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

page('/fisica', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template2);
});

},{"./template":28,"./template2":29,"empty-element":3,"page":11}],28:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<h1> aqui va lo de fisica</h2>
`;

},{"yo-yo":13}],29:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1>about fisica</h1>
</div>
`;

},{"yo-yo":13}],30:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

var template3 = require('./template3');

page('/', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  var plantas = document.getElementById('plantas');
  empty(arriba).appendChild(template);
  empty(main).appendChild(template2);
  empty(about).appendChild(template3);
  empty(plantas);
});

},{"./template":31,"./template2":32,"./template3":33,"empty-element":3,"page":11}],31:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = yo`
<div>
  <div id="carouselExampleIndicators" class="carousel slide pt-2" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="semaforos.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h1 style="color: black;">!Los semaforos inteligentes son la solución¡</h5>
        </div>
      </div>
      <div class="carousel-item ">
        <img src="semaforosinteligentes.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="https://www.itc.com.ar/wp-content/uploads/2019/05/semaforo-inteligente.jpg" class="d-block w-100 "
          alt="...">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <div class="p-2"></div>

  <div class="row mb-2">
    <div class="col-md-6 ">
      <div
        class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary"> ¿ Sabias que ? </strong>
          <h3 class="mb-0">Semáforos inteligentes en la capital</h3>
          <div class="card-text mb-auto">En la capital del pais ya se incorpora un sistema de semaforos inteligentes
            para mejorar el transito vehicular</div>
          <a href="https://www.elsoldemexico.com.mx/metropoli/cdmx/asi-operan-los-semaforos-inteligentes-en-la-capital-3287849.html"
            class="stretched-link">Saber más!</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img
            src="https://www.elsoldemexico.com.mx/metropoli/dcovee-070419-semaforos-inteligentes-metropoli-web.png/ALTERNATES/FREE_160/070419%20Sema%CC%81foros%20Inteligentes%20Metro%CC%81poli%20WEB.png"
            alt="" srcset="">
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div
        class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-success">Te podría interesar!</strong>
          <h3 class="mb-0">Semaforos Inteligentes ITESM</h3>
          <div class="mb-auto text-justify"> Semáforos inteligentes es un proyecto que esta siendo desarrollado por
            Estudiantes del ITESM Campus Toluca.</div>
          <a href="https://www.facebook.com/pg/SemaforointeligenteITESM/about/?ref=page_internal"
            class="stretched-link">Continua Leyendo</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img width="160px" height="240px"
            src="https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/1796482_1447965538770205_1630895418_n.jpg?_nc_cat=102&_nc_oc=AQm3JXr0mTFhBtLA6u-o38z2pmtVe4YhxZgOTDShBwKnDjC1cn-wpiz62hGyoKnRAgw&_nc_ht=scontent.fmex6-1.fna&oh=ee447ed076e865eb203957d4a0380337&oe=5E4271C8"
            alt="" srcset="">
        </div>
      </div>
    </div>
  </div>
</div>
`;

},{"yo-yo":13}],32:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = yo`
<div>
  <h3 class="pb-4 mb-4 font-italic border-bottom">
    From the Firehose
  </h3>

  <div class="blog-post">
    <h2 class="blog-post-title">Sample blog post</h2>
    <div class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></div>

    <div>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
      typography, images, and code are all supported.</div>
    <hr>
    <div>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu
      leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras
      mattis consectetur purus sit amet fermentum.</div>
    <blockquote>
      <div>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
    </blockquote>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <h2>Heading</h2>
    <div>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus,
      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum
      at eros.</div>
    <h3>Sub-heading</h3>
    <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</div>
    <divre><code>Example code block</code></pre>
      <div>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus,
        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</div>
      <h3>Sub-heading</h3>
      <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum
        nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</div>
      <ul>
        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
        <li>Donec id elit non mi porta gravida at eget metus.</li>
        <li>Nulla vitae elit libero, a pharetra augue.</li>
      </ul>
      <div>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</div>
      <ol>
        <li>Vestibulum id ligula porta felis euismod semper.</li>
        <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
        <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
      </ol>
      <div>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</div>
  </div><!-- /.blog-post -->

  <div class="blog-post">
    <h2 class="blog-post-title">Another blog post</h2>
    <div class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></div>

    <div>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu
      leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras
      mattis consectetur purus sit amet fermentum.</div>
    <blockquote>
      <div>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
    </blockquote>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <div>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus,
      nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum
      at eros.</div>
  </div><!-- /.blog-post -->

  <div class="blog-post">
    <h2 class="blog-post-title">New feature</h2>
    <div class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></div>

    <div>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum
      nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo,
      tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</div>
    <ul>
      <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
      <li>Donec id elit non mi porta gravida at eget metus.</li>
      <li>Nulla vitae elit libero, a pharetra augue.</li>
    </ul>
    <div>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.</div>
    <div>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</div>
  </div><!-- /.blog-post -->

  <nav class="blog-pagination">
    <a class="btn btn-outline-primary" href="#">Older</a>
    <a class="btn btn-outline-secondary disabled" href="#" tabindex="-1" aria-disabled="true">Newer</a>
  </nav>

</div>`;

},{"yo-yo":13}],33:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1>about homepage</h1>
</div>
`;

},{"yo-yo":13}],34:[function(require,module,exports){
const page = require('page');

require('./homepage');

require('./cultura');

require('./calculo');

require('./derecho');

require('./fisica');

require('./optativas');

require('./optativas/estrategias');

page();

},{"./calculo":15,"./cultura":18,"./derecho":24,"./fisica":27,"./homepage":30,"./optativas":38,"./optativas/estrategias":35,"page":11}],35:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

page('/optativas/estrategias', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template2);
});

},{"./template":36,"./template2":37,"empty-element":3,"page":11}],36:[function(require,module,exports){
var yo = require('yo-yo');

module.exports = yo`
<div>
  <h1 class="blog-post-title text-center">ESTRATEGIAS</h1>
  <h2 class="blog-post-title text-center"> <img class="bd-placeholder-img" width="40" height="40"
      src="data:image/png;base64,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">
    Semáforos Inteligentes
    <img class="bd-placeholder-img" width="40" height="40"
      src="data:image/png;base64,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">
  </h2>
  <h3>Visión</h3>
  <div class="text-justify">Nuestro prototipo consiste en un semáforo inteligente, el cual será alimentado con una celda
    solar y con él se busca mejorar los intervalos de tiempo de espera: siga, precaución y pare, esto se quiere lograr
    automatizando y programando las decisiones que tomaría un policía de tránsito cuando un semáforo no funciona. </div>
  <h3>Misión</h3>
  <div class="text-justify">Queremos desarrollar este prototipo ya que es una forma sustentable para resolver el
    contratiempo que causa el tráfico, es un proyecto verde o ecológico porque como lo dice su definición un proyecto
    ecológico es aquel que está orientado al desarrollo de prácticas responsables con su entorno y con el diseño de
    soluciones. En este proyecto se busca disminuir la cantidad de contaminación producida por los automóviles y esto se
    logrará de una forma amigable con el ambiente.</div>
  <h3>Metas</h3>
  <div class="text-justify">Se lograría la reducción de tiempos que se emplean en los recorridos en vehículo, la
    contaminación ambiental, auditiva y visual, lo cual se pretende lograr a finales de este semestre.</div>
</div>`;

},{"yo-yo":13}],37:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1>about estrategias</h1>
</div>
`;

},{"yo-yo":13}],38:[function(require,module,exports){
var page = require('page');

var empty = require('empty-element');

var template = require('./template');

var template2 = require('./template2');

page('/optativas', function (ctx, netx) {
  var main = document.getElementById('main-container');
  var arriba = document.getElementById('arriba');
  var about = document.getElementById('about');
  empty(arriba);
  empty(main).appendChild(template);
  empty(about).appendChild(template2);
});

},{"./template":39,"./template2":40,"empty-element":3,"page":11}],39:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div class="container">
  <div class="card mb-3 shadow-lg bg-white rounded">
    <img class="card-img-top" width="200" height="250"
      src="http://observatorio.edomex.gob.mx/sites/observatorio.edomex.gob.mx/files/images/banners_mision%2C-vis-y-obj.jpg"
      alt="...">
    <div class="card-body">
      <h5 class="card-title text-primary">Estragias para la resolucion de conflictos </h5>
      <h3 class="mb-0">Misión,Visión,Metas</h3>
      <div class="card-text mb-auto">Dentro de este apartado se habla acerca de la misión que se tiene con el proyecto ,
        asi como la vision y las metas sobre el mismo</div>
      <a href="/optativas/estrategias" class="stretched-link">Conocer más...</a>
    </div>
  </div>
  <div
    class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg bg-white rounded">
    <div class="col p-4 d-flex flex-column position-static">
      <h5 class="d-inline-block mb-2 text-success">Etimologías</h5>
      <h3 class="mb-0">Glosario de 50 palabras </h3>
      <div class="mb-1 text-muted">Nov 11</div>
      <div class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.
      </div>
      <a href="/optativas/etimologias" class="stretched-link">Ver Glosario</a>
    </div>
    <div class="col-auto d-none d-lg-block">
      <img class="bd-placeholder-img" width="200" height="250"
        src="data:image/png;base64,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">
    </div>
  </div>
</div>

`;

},{"yo-yo":13}],40:[function(require,module,exports){
yo = require('yo-yo');
module.exports = yo`
<div>
    <h1>about optativas</h1>
</div>
`;

},{"yo-yo":13}]},{},[34]);
