/* global manifest */

(function (global) {
  'use strict'
  var totalScripts
  var merge
  var loadScript
  var manifestScript

  merge = function (arrays) {
    var resultingArray = []
    var workingArray
    var a, b, x, y

    for (a = 0, b = arrays.length; a < b; a++) {
      workingArray = arrays[a]
      for (x = 0, y = workingArray.length; x < y; x++) {
        resultingArray.push(workingArray[x])
      }
    }
    return resultingArray
  }
  loadScript = function (src, nextIdx) {
    var script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = src

    document.getElementsByTagName('head')[0].appendChild(script)
    if (nextIdx === undefined) { return script }
    script.onload = function () {
      if (nextIdx < totalScripts.length) {
        loadScript(totalScripts[nextIdx], nextIdx + 1)
      }
    }
    return script
  }
  manifestScript = loadScript('../manifest.js')

  manifestScript.onload = function () {
    var idx = 0

    totalScripts = merge([manifest.support, manifest.test])
    loadScript(totalScripts[idx], idx + 1)
  }
})(window)
