"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var image_1 = require("next/image");
function MemberCard(_a) {
    var _b, _c, _d, _e, _f, _g;
    var user = _a.user;
    // Format the arrival year if it exists
    var arrivalYear = ((_b = user.profile) === null || _b === void 0 ? void 0 : _b.yearOfArrival) ? "Since " + user.profile.yearOfArrival
        : "";
    // Calculate graduation string
    var graduationString = user.graduationYear
        ? "Class of " + user.graduationYear
        : "";
    return (React.createElement("div", { className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" },
        React.createElement("div", { className: "p-6" },
            React.createElement("div", { className: "flex items-start gap-4" },
                React.createElement("div", { className: "rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center flex-shrink-0" }, user.image ? (React.createElement(image_1["default"], { src: user.image, alt: user.name, width: 64, height: 64, className: "rounded-full" })) : (React.createElement(lucide_react_1.User, { size: 32, className: "text-gray-400" }))),
                React.createElement("div", { className: "flex-1" },
                    React.createElement("h3", { className: "text-lg font-bold mb-1" }, user.name),
                    user.university && (React.createElement("div", { className: "flex items-center text-sm text-gray-600 mb-1" },
                        React.createElement(lucide_react_1.GraduationCap, { size: 16, className: "mr-2 flex-shrink-0" }),
                        React.createElement("span", null, user.university))),
                    user.course && (React.createElement("div", { className: "flex items-start text-sm text-gray-600 mb-1" },
                        React.createElement("span", { className: "inline-block w-5 mr-2 flex-shrink-0" }),
                        React.createElement("span", null, user.course))),
                    (user.city || ((_c = user.profile) === null || _c === void 0 ? void 0 : _c.residenceArea)) && (React.createElement("div", { className: "flex items-center text-sm text-gray-600 mb-1" },
                        React.createElement(lucide_react_1.MapPin, { size: 16, className: "mr-2 flex-shrink-0" }),
                        React.createElement("span", null,
                            ((_d = user.profile) === null || _d === void 0 ? void 0 : _d.residenceArea) && user.profile.residenceArea + ", Milan",
                            ((_e = user.profile) === null || _e === void 0 ? void 0 : _e.residenceArea) && user.city && " • ",
                            user.city && "From " + user.city + ", India"))),
                    React.createElement("div", { className: "flex flex-wrap gap-2 mt-3" },
                        arrivalYear && (React.createElement("span", { className: "px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs" }, arrivalYear)),
                        graduationString && (React.createElement("span", { className: "px-2 py-1 bg-green-50 text-green-700 rounded text-xs" }, graduationString))))),
            user.bio && (React.createElement("div", { className: "mt-4" },
                React.createElement("p", { className: "text-sm text-gray-700 line-clamp-3" }, user.bio))),
            React.createElement("div", { className: "mt-4 pt-4 border-t flex flex-wrap gap-2" },
                React.createElement(link_1["default"], { href: "/members/" + user.id, className: "px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm flex-1 text-center" }, "View Profile"),
                ((_f = user.profile) === null || _f === void 0 ? void 0 : _f.showEmail) && (React.createElement("a", { href: "mailto:" + user.email, className: "p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md", title: "Send Email" },
                    React.createElement(lucide_react_1.Mail, { size: 18 }))),
                ((_g = user.profile) === null || _g === void 0 ? void 0 : _g.showPhone) && user.phoneNumber && (React.createElement("a", { href: "tel:" + user.phoneNumber, className: "p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md", title: "Call" },
                    React.createElement(lucide_react_1.Phone, { size: 18 }))),
                user.linkedinUrl && (React.createElement("a", { href: user.linkedinUrl, target: "_blank", rel: "noopener noreferrer", className: "p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md", title: "LinkedIn Profile" },
                    React.createElement(lucide_react_1.Linkedin, { size: 18 })))))));
}
exports["default"] = MemberCard;
