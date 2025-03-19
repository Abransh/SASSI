"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function CoreInitiativesSection() {
    var sectionRef = react_1.useRef(null);
    var titleRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var handleScroll = function () {
            if (!sectionRef.current || !titleRef.current)
                return;
            var sectionRect = sectionRef.current.getBoundingClientRect();
            var sectionTop = sectionRect.top;
            var sectionHeight = sectionRect.height;
            // Make the title sticky when the section is in view
            if (sectionTop <= 100 && sectionTop > -sectionHeight + 200) {
                titleRef.current.style.position = "sticky";
                titleRef.current.style.top = "100px";
            }
            else {
                titleRef.current.style.position = "relative";
                titleRef.current.style.top = "0";
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set positions
        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (React.createElement("section", { ref: sectionRef, className: "py-32 min-h-screen bg-[#FDF8F4]", id: "initiatives" },
        React.createElement("div", { className: "container mx-auto px-4" },
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12" },
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { ref: titleRef, className: "transition-all duration-300" },
                        React.createElement("h2", { className: "text-5xl md:text-6xl font-serif text-[#4A332F]" }, "Our Core Initiatives"))),
                React.createElement("div", { className: "space-y-8" },
                    React.createElement("div", { className: "p-12 rounded-[2rem] bg-[#14213D]" },
                        React.createElement("h3", { className: "text-4xl font-serif mb-6 text-[#FFFFFF]" }, "Community Outreach"),
                        React.createElement("p", { className: "text-lg text-[#FFFFFF]leading-relaxed" }, "We strive to build a vibrant and inclusive community that connects Indian students in Milan with local and global networks. Through cultural events, social initiatives, and collaborative projects, we aim to foster a sense of belonging and mutual support while promoting cross-cultural understanding.")),
                    React.createElement("div", { className: "p-12 rounded-[2rem] bg-[#14213D]" },
                        React.createElement("h3", { className: "text-4xl font-serif mb-6 text-[#FFFFFF]" }, "Academic Excellence"),
                        React.createElement("p", { className: "text-lg text-[#FFFFFF] leading-relaxed" }, "We are committed to supporting the academic journey of Indian students in Milan through mentorship programs, study groups, and resource sharing. Our goal is to help students navigate the Italian education system successfully and achieve their full academic potential.")),
                    React.createElement("div", { className: "p-12 rounded-[2rem] bg-[#14213D]" },
                        React.createElement("h3", { className: "text-4xl font-serif mb-6 text-[#FFFFFF]" }, "Cultural Integration"),
                        React.createElement("p", { className: "text-lg text-[#FFFFFF] leading-relaxed" }, "We believe in celebrating our Indian heritage while embracing Italian culture. Through language exchanges, cultural workshops, and collaborative events with local communities, we help students integrate into Italian society while maintaining their cultural identity.")))))));
}
exports["default"] = CoreInitiativesSection;
