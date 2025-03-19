"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
function UniversityFilter(_a) {
    var universities = _a.universities, currentValue = _a.currentValue, searchQuery = _a.searchQuery;
    var router = navigation_1.useRouter();
    var handleChange = function (e) {
        var value = e.target.value;
        var url = "/members?university=" + value;
        if (searchQuery) {
            url += "&query=" + searchQuery;
        }
        router.push(url);
    };
    return (React.createElement("select", { name: "university", className: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500", value: currentValue, onChange: handleChange },
        React.createElement("option", { value: "" }, "All Universities"),
        universities.map(function (uni, index) { return (React.createElement("option", { key: index, value: uni.university }, uni.university)); })));
}
exports["default"] = UniversityFilter;
