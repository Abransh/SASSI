"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var resource_utils_1 = require("@/lib/resource-utils");
var lucide_react_1 = require("lucide-react");
function ResourceCard(_a) {
    var resource = _a.resource;
    var ResourceIcon = resource_utils_1.getResourceTypeIcon(resource.resourceType);
    var typeColor = resource_utils_1.getResourceTypeColor(resource.resourceType);
    // Get color classes based on resource type
    var getColorClasses = function () {
        switch (typeColor) {
            case "blue":
                return "bg-blue-50 text-blue-700";
            case "purple":
                return "bg-purple-50 text-purple-700";
            case "orange":
                return "bg-orange-50 text-orange-700";
            case "red":
                return "bg-red-50 text-red-700";
            case "green":
                return "bg-green-50 text-green-700";
            default:
                return "bg-gray-50 text-gray-700";
        }
    };
    return (React.createElement(link_1["default"], { href: "/resources/view/" + resource.id, className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full" },
        React.createElement("div", { className: "p-4 flex items-center gap-3 border-b" },
            React.createElement("div", { className: "p-2 rounded-lg " + getColorClasses() },
                React.createElement(ResourceIcon, { size: 20 })),
            React.createElement("span", { className: "text-sm font-medium uppercase" }, resource.resourceType.toLowerCase())),
        React.createElement("div", { className: "h-32 relative bg-gray-50" }, resource.thumbnailUrl ? (React.createElement(image_1["default"], { src: resource.thumbnailUrl, alt: resource.title, layout: "fill", objectFit: "cover" })) : (React.createElement("div", { className: "w-full h-full flex items-center justify-center" },
            React.createElement(ResourceIcon, { size: 32, className: "text-gray-300" })))),
        React.createElement("div", { className: "p-4 flex-1 flex flex-col" },
            React.createElement("h3", { className: "text-lg font-bold mb-2" }, resource.title),
            React.createElement("p", { className: "text-gray-600 text-sm mb-4 line-clamp-3 flex-1" }, resource.description),
            React.createElement("div", { className: "flex justify-between items-center mt-auto text-xs text-gray-500" },
                React.createElement("div", { className: "flex gap-4" },
                    React.createElement("span", { className: "flex items-center" },
                        React.createElement(lucide_react_1.Eye, { size: 14, className: "mr-1" }),
                        resource.viewCount),
                    React.createElement("span", { className: "flex items-center" },
                        React.createElement(lucide_react_1.Download, { size: 14, className: "mr-1" }),
                        resource.downloadCount)),
                React.createElement("span", { className: "text-orange-600 font-medium" }, "View Resource \u2192")))));
}
exports["default"] = ResourceCard;
