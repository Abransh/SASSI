"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
function HeroSection() {
    var sectionRef = react_1.useRef(null);
    var backgroundRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var section = sectionRef.current;
        if (section) {
            section.style.opacity = "0";
            section.style.transform = "translateY(-50px)";
            setTimeout(function () {
                section.style.transition = "opacity 1s ease, transform 1s ease";
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, 100);
        }
        var handleScroll = function () {
            if (backgroundRef.current) {
                var scrollPosition = window.scrollY;
                backgroundRef.current.style.transform = "translateY(" + scrollPosition * 0.4 + "px)";
            }
        };
        window.addEventListener("scroll", handleScroll);
        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (React.createElement("section", { id: "home", className: "relative min-h-screen flex items-center justify-center py-20 px-4", ref: sectionRef },
        React.createElement("div", { className: "absolute inset-0 bg-gray-900/50 z-0" },
            React.createElement("div", { className: "absolute inset-0 bg-white " }),
            React.createElement(image_1["default"], { src: "/assests/banner.png", alt: "Group Diwali Image", layout: "fill", objectFit: "cover", className: "rounded-lg" })),
        React.createElement("div", { className: "container mx-auto text-center relative z-10" },
            React.createElement("h1", { className: "text-4xl md:text-6xl font-bold text-black mb-4" }, "Students' Association of Indians"),
            React.createElement("p", { className: "text-xl md:text-2xl text-black/90 mb-6" }, "A community by the students, for the students."),
            React.createElement("p", { className: "max-w-3xl mx-auto text-lg text-black/80" }, "Bringing Indian students in Italy together, celebrating our culture, supporting each other, and making every step of this journey feel like home"),
            React.createElement("div", { className: "flex flex-wrap justify-center gap-4 mt-6" },
                React.createElement(link_1["default"], { href: "https://instagram.com", target: "_blank", className: "px-6 py-3 bg-white text-black border-2 border-black rounded-md font-medium transition-all hover:text-yellow-400 hover:border-yellow-400" }, "Our Instagram"),
                React.createElement(link_1["default"], { href: "#join-us", className: "px-6 py-3 bg-yellow-400 text-black border-2 border-black rounded-md font-medium transition-all hover:bg-black hover:text-yellow-400 hover:border-yellow-400" }, "Join Us")))));
}
exports["default"] = HeroSection;
