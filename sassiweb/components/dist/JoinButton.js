"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var JoinUsModal_1 = require("./JoinUsModal");
function JoinButton(_a) {
    var className = _a.className;
    var _b = react_1.useState(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var openModal = function () {
        setIsModalOpen(true);
    };
    var closeModal = function () {
        setIsModalOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: openModal, className: "px-6 py-3 bg-yellow-400 text-black border-2 border-black rounded-md font-medium transition-all hover:bg-black hover:text-yellow-400 hover:border-yellow-400 " + className }, "Join Us"),
        React.createElement(JoinUsModal_1["default"], { isOpen: isModalOpen, onClose: closeModal })));
}
exports["default"] = JoinButton;
