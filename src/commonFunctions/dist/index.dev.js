"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForceUpdate = useForceUpdate;
exports.changeGiftLinkDomain = exports.changeImageLinkDomain = exports.checkLiveDomain = exports.returnDefaultImage = exports.addDefaultSrc = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var addDefaultSrc = function addDefaultSrc(ev) {
  ev.target.src = '/assets/images/image-placeholder.jpg';
};

exports.addDefaultSrc = addDefaultSrc;

var returnDefaultImage = function returnDefaultImage(ev) {
  return '/assets/images/image-placeholder.jpg';
};

exports.returnDefaultImage = returnDefaultImage;

var checkLiveDomain = function checkLiveDomain() {
  if (window.location.hostname === "rrmr.co.in") {
    return true;
  }

  return false;
};

exports.checkLiveDomain = checkLiveDomain;

var changeImageLinkDomain = function changeImageLinkDomain() {
  if (window.location.hostname === "rrmr.co.in") {
    return "https://rrmr.co.in/glitter-101/public/profile_images/";
  }

  return "http://167.172.209.57/glitter-101/public/profile_images/";
};

exports.changeImageLinkDomain = changeImageLinkDomain;

var changeGiftLinkDomain = function changeGiftLinkDomain() {
  if (window.location.hostname === "rrmr.co.in") {
    return "https://rrmr.co.in/glitter-101/public/gifts_icons/";
  }

  return "http://167.172.209.57/glitter-101/public/gifts_icons/";
};

exports.changeGiftLinkDomain = changeGiftLinkDomain;

function useForceUpdate() {
  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      setTick = _useState2[1];

  var update = (0, _react.useCallback)(function () {
    setTick(function (tick) {
      return tick + 1;
    });
  }, []);
  return update;
}