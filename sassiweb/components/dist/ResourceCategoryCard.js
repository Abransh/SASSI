"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
function ResourceCategoryCard(_a) {
    var category = _a.category;
    return (React.createElement(link_1["default"], { href: "/resources/" + category.slug, className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all" },
        React.createElement("div", { className: "h-40 relative bg-gray-100" }, category.imageUrl ? (React.createElement(image_1["default"], { src: category.imageUrl, alt: category.name, layout: "fill", objectFit: "cover" })) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center" },
            React.createElement(lucide_react_1.FileText, { size: 48, className: "text-gray-400" })))),
        React.createElement("div", { className: "p-6" },
            React.createElement("div", { className: "flex items-center justify-between mb-2" },
                React.createElement("h3", { className: "text-xl font-bold" }, category.name),
                React.createElement("span", { className: "text-sm text-gray-500" },
                    category._count.resources,
                    " ",
                    category._count.resources === 1 ? "resource" : "resources")),
            category.description && (React.createElement("p", { className: "text-gray-600 line-clamp-2" }, category.description)))));
}
exports["default"] = ResourceCategoryCard;
