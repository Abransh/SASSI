"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var google_1 = require("next/font/google");
var providers_1 = require("./providers");
//import { Analytics } from "@vercel/analytics/react"
var inter = google_1.Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});
exports.metadata = {
    title: "Students' Association of Indians in Milan",
    description: "A community by the students, for the students in Milan, Italy"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: "scroll-smooth" },
        React.createElement("body", { className: inter.variable + " font-sans antialiased" },
            React.createElement(providers_1["default"], null, children))));
}
exports["default"] = RootLayout;
