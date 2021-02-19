"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeImageLinkDomain = exports.checkLiveDomain = exports.returnDefaultImage = exports.addDefaultSrc = void 0;

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