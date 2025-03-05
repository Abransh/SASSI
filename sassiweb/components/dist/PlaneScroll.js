"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
function PlaneAnimation() {
    var planeRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var updatePlanePosition = function () {
            if (!planeRef.current)
                return;
            var scrollPercent = (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) * 250; //change this value to adjust the speed of the plane
            var translateX = (scrollPercent * window.innerWidth) / 100;
            planeRef.current.style.transform = "translateX(" + translateX + "px)";
        };
        window.addEventListener("scroll", updatePlanePosition);
        return function () {
            return window.removeEventListener("scroll", updatePlanePosition);
        };
    }, []);
    return (React.createElement("div", { className: "relative h-[42px] w-full overflow-hidden" },
        React.createElement("div", { className: "absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2" //height of dashed line
            , style: {
                background: "repeating-linear-gradient(to right, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.3) 5px, transparent 5px, transparent 10px)"
            } }),
        React.createElement("div", { ref: planeRef, className: "absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-75" // Adjust duration to fine-tune animation speed
         },
            React.createElement(image_1["default"], { src: "/assests/image.png", alt: "Plane", width: 38, height: 38, className: "-translate-y-[17px]" // Adjust this value to fine-tune vertical position
             }))));
}
exports["default"] = PlaneAnimation;
