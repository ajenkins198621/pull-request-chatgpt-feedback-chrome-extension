/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (() => {

eval("chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    if (request.action === \"fetchDataFromNewTab\") {\n        const url = request.url;\n        chrome.tabs.create({ url }, (tab) => {\n            const dataListener = (request, sender) => {\n                if (request.action === \"fetchedData\") {\n                    sendResponse({ success: true, data: request.data });\n                    chrome.tabs.remove(tab.id); // Close the tab after fetching the data\n                    chrome.runtime.onMessage.removeListener(dataListener); // Remove the listener after the data is fetched\n                }\n            };\n            // Add a listener to wait for the data to be sent back from the content script\n            chrome.runtime.onMessage.addListener(dataListener);\n        });\n        // Indicate that the response will be sent asynchronously\n        return true;\n    }\n});\n\n\n//# sourceURL=webpack://pull-request-chatgpt-feedback-chrome-extension/./src/background.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background.ts"]();
/******/ 	
/******/ })()
;