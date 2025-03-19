"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("next-auth/react");
var sonner_1 = require("sonner");
function Providers(_a) {
    var children = _a.children;
    return (React.createElement(react_1.SessionProvider, null,
        React.createElement(sonner_1.Toaster, { position: "top-right" }),
        children));
}
exports["default"] = Providers;
