"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function PhotoGallery(_a) {
    var images = _a.images, className = _a.className;
    var _b = react_1.useState(null), selectedImage = _b[0], setSelectedImage = _b[1];
    if (!images || images.length === 0) {
        return (react_1["default"].createElement("div", { className: "text-center py-10" },
            react_1["default"].createElement("p", { className: "text-gray-500" }, "No photos available for this event.")));
    }
    return (react_1["default"].createElement("div", { className: utils_1.cn("", className) },
        react_1["default"].createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }, images.map(function (image, index) { return (react_1["default"].createElement("div", { key: image.id || index, className: "aspect-square relative overflow-hidden rounded-lg cursor-pointer group", onClick: function () { return setSelectedImage(image); } },
            react_1["default"].createElement(image_1["default"], { src: image.imageUrl, alt: image.caption || "Event photo " + (index + 1), layout: "fill", objectFit: "cover", className: "transition-transform group-hover:scale-110 duration-300" }),
            image.caption && (react_1["default"].createElement("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-end transition-all duration-300" },
                react_1["default"].createElement("div", { className: "text-white p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
                    react_1["default"].createElement("p", { className: "text-sm font-medium truncate" }, image.caption)))))); })),
        selectedImage && (react_1["default"].createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90", onClick: function () { return setSelectedImage(null); } },
            react_1["default"].createElement("button", { className: "absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70", onClick: function (e) {
                    e.stopPropagation();
                    setSelectedImage(null);
                } },
                react_1["default"].createElement(lucide_react_1.X, { size: 24 })),
            react_1["default"].createElement("div", { className: "relative max-w-4xl max-h-[90vh] w-full mx-4", onClick: function (e) { return e.stopPropagation(); } },
                react_1["default"].createElement("div", { className: "relative w-full h-full flex items-center justify-center" },
                    react_1["default"].createElement(image_1["default"], { src: selectedImage.imageUrl, alt: selectedImage.caption || 'Event photo', width: 1200, height: 800, objectFit: "contain", className: "max-h-[80vh] rounded" })),
                selectedImage.caption && (react_1["default"].createElement("div", { className: "text-white text-center mt-4 p-2 bg-black bg-opacity-50 rounded" },
                    react_1["default"].createElement("p", null, selectedImage.caption))))))));
}
exports["default"] = PhotoGallery;
