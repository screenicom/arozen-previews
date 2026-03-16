/**
 * Arozen Diffuser App (v1) — Prototype navigation & helpers
 * Minimal JS for in-prototype interactivity. Real app logic lives in Flutter.
 */

(function() {
  'use strict';

  // Optional: persist which device was selected for device-control.html
  function getDeviceIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || null;
  }

  function getDeviceNameFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('name') ? decodeURIComponent(params.get('name')) : null;
  }

  // Expose for any inline scripts that need them
  window.ArozenProto = {
    getDeviceId: getDeviceIdFromUrl,
    getDeviceName: getDeviceNameFromUrl
  };
})();
