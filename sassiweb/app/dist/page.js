"use strict";
exports.__esModule = true;
var ContactForm_1 = require("@/components/ContactForm");
var CoreInitiatives_1 = require("@/components/CoreInitiatives");
var Events_1 = require("@/components/Events");
var Footer_1 = require("@/components/Footer");
var GetInvolved_1 = require("@/components/GetInvolved");
var Header_1 = require("@/components/Header");
var HeroSection_1 = require("@/components/HeroSection");
var LifeInMilan_1 = require("@/components/LifeInMilan");
var MobileMenu_1 = require("@/components/MobileMenu");
var PlaneScroll_1 = require("@/components/PlaneScroll");
var vision_1 = require("@/components/vision");
function Home() {
    return (React.createElement("main", { className: "min-h-screen" },
        React.createElement(Header_1["default"], null),
        React.createElement(MobileMenu_1["default"], null),
        React.createElement(HeroSection_1["default"], null),
        React.createElement(vision_1["default"], null),
        React.createElement(LifeInMilan_1["default"], null),
        React.createElement(PlaneScroll_1["default"], null),
        React.createElement(GetInvolved_1["default"], null),
        React.createElement(Events_1["default"], null),
        React.createElement(CoreInitiatives_1["default"], null),
        React.createElement(ContactForm_1["default"], null),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = Home;
