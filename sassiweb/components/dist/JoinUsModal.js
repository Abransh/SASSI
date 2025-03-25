"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
function JoinUsModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var router = navigation_1.useRouter();
    var _b = react_1.useState(null), hoveredOption = _b[0], setHoveredOption = _b[1];
    var handleMemberClick = function () {
        router.push("/join/member");
        onClose();
    };
    var handleTeamClick = function () {
        router.push("/join/team");
        onClose();
    };
    if (!isOpen)
        return null;
    return (React.createElement(framer_motion_1.AnimatePresence, null, isOpen && (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center" },
        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/60", onClick: onClose }),
        React.createElement(framer_motion_1.motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, transition: { type: "spring", bounce: 0.3 }, className: "relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden", onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10", "aria-label": "Close" },
                React.createElement(lucide_react_1.X, { size: 24 })),
            React.createElement("div", { className: "p-8 text-center" },
                React.createElement("h2", { className: "text-3xl font-bold mb-2" }, "Join SASSI"),
                React.createElement("p", { className: "text-gray-600 max-w-xl mx-auto mb-8" }, "Choose how you'd like to be part of our community. Join as a member to access resources and events, or apply to join our team to help make a difference."),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto" },
                    React.createElement(framer_motion_1.motion.div, { className: "relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer " + (hoveredOption === "member" ? "border-orange-500 shadow-lg" : "border-gray-200"), onMouseEnter: function () { return setHoveredOption("member"); }, onMouseLeave: function () { return setHoveredOption(null); }, onClick: handleMemberClick, whileHover: { y: -5 } },
                        React.createElement("div", { className: "p-6 flex flex-col items-center" },
                            React.createElement("div", { className: "w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4" },
                                React.createElement(lucide_react_1.UserPlus, { size: 32, className: "text-orange-600" })),
                            React.createElement("h3", { className: "text-xl font-bold mb-2" }, "Join as Member"),
                            React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Register as an official member to access exclusive resources, receive support, and participate in all our events."),
                            React.createElement("div", { className: "mt-4 py-2 px-4 rounded-md text-white transition-colors " + (hoveredOption === "member" ? "bg-orange-600" : "bg-gray-500") }, "Become a Member"))),
                    React.createElement(framer_motion_1.motion.div, { className: "relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer " + (hoveredOption === "team" ? "border-blue-500 shadow-lg" : "border-gray-200"), onMouseEnter: function () { return setHoveredOption("team"); }, onMouseLeave: function () { return setHoveredOption(null); }, onClick: handleTeamClick, whileHover: { y: -5 } },
                        React.createElement("div", { className: "p-6 flex flex-col items-center" },
                            React.createElement("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4" },
                                React.createElement(lucide_react_1.Users, { size: 32, className: "text-blue-600" })),
                            React.createElement("h3", { className: "text-xl font-bold mb-2" }, "Join the Team"),
                            React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Become an active part of our organizing team, help shape our initiatives, and make a difference in the community."),
                            React.createElement("div", { className: "mt-4 py-2 px-4 rounded-md text-white transition-colors " + (hoveredOption === "team" ? "bg-blue-600" : "bg-gray-500") }, "Apply to Join Team"))))))))));
}
exports["default"] = JoinUsModal;
