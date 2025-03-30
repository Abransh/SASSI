"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
//import Image from "next/image"
function UniNetworks() {
    return (React.createElement("section", { id: "uni-networks", className: "py-20 relative" },
        React.createElement("div", { className: "absolute inset-0 opacity-10 pointer-events-none" }),
        React.createElement("div", { className: "container mx-auto px-4 relative z-10" },
            React.createElement("div", { className: "text-center mb-16" },
                React.createElement("h2", { className: "text-4xl font-bold mb-4" }, "OUR UNIVERSITY NETWORKS"),
                React.createElement("h3", { className: "text-2xl mb-6" }, "Find Tailored Support"),
                React.createElement("p", { className: "max-w-4xl mx-auto text-lg text-gray-700" }, "We collaborate with student networks at top universities to connect you with the right guidance and support for your journey.")),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2  gap-6" },
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement(link_1["default"], { href: " https://www.instagram.com/isa.polimi/" //add insta here
                        , className: "mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors" }, "ISA POLIMI"),
                    React.createElement("p", { className: "text-center text-gray-700" }, "Indian Students Association"),
                    React.createElement("p", { className: "text-center text-gray-700" }, "Politecnico di Milano")),
                React.createElement("div", { className: "flex flex-col items-center" },
                    React.createElement(link_1["default"], { href: "https://www.instagram.com/isa.dna.milan/" //add insta here
                        , className: "mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors" }, "ISA DNA"),
                    React.createElement("p", { className: "text-center text-gray-700" }, "Indian Students Association."),
                    React.createElement("p", { className: "text-center text-gray-700" }, "Domus Academy & NABA"))))));
}
exports["default"] = UniNetworks;
