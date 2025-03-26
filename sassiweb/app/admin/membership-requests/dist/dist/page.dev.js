"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var navigation_1 = require("next/navigation");

var next_1 = require("next-auth/next");

var route_1 = require("@/app/api/auth/[...nextauth]/route");

var prisma_1 = require("@/lib/prisma");

var date_fns_1 = require("date-fns");

var Header_1 = require("@/components/Header");

var MobileMenu_1 = require("@/components/MobileMenu");

var Footer_1 = require("@/components/Footer");

var link_1 = require("next/link");

var lucide_react_1 = require("lucide-react");

var input_1 = require("@/components/ui/input");

var MembershipStatusActions_1 = require("@/components/admin/MembershipStatusActions");

function MembershipRequestsPage(_a) {
  var searchParams = _a.searchParams;
  return __awaiter(this, void 0, void 0, function () {
    var session, status, searchQuery, membershipRequests, statusCounts;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4
          /*yield*/
          , next_1.getServerSession(route_1.authOptions)];

        case 1:
          session = _b.sent();

          if (!session || session.user.role !== "ADMIN") {
            navigation_1.redirect("/auth/signin?callbackUrl=/admin/membership-requests");
          }

          status = searchParams.status || "PENDING";
          searchQuery = searchParams.search || "";
          return [4
          /*yield*/
          , prisma_1["default"].membershipRequest.findMany({
            where: {
              status: status,
              OR: searchQuery ? [{
                firstName: {
                  contains: searchQuery,
                  mode: "insensitive"
                }
              }, {
                lastName: {
                  contains: searchQuery,
                  mode: "insensitive"
                }
              }, {
                email: {
                  contains: searchQuery,
                  mode: "insensitive"
                }
              }, {
                university: {
                  contains: searchQuery,
                  mode: "insensitive"
                }
              }] : undefined
            },
            orderBy: {
              createdAt: "desc"
            },
            include: {
              user: true
            }
          })];

        case 2:
          membershipRequests = _b.sent();
          return [4
          /*yield*/
          , prisma_1["default"].$transaction([prisma_1["default"].membershipRequest.count({
            where: {
              status: "PENDING"
            }
          }), prisma_1["default"].membershipRequest.count({
            where: {
              status: "APPROVED"
            }
          }), prisma_1["default"].membershipRequest.count({
            where: {
              status: "REJECTED"
            }
          })])];

        case 3:
          statusCounts = _b.sent();
          return [2
          /*return*/
          , React.createElement("main", {
            className: "min-h-screen bg-gray-50"
          }, React.createElement(Header_1["default"], null), React.createElement(MobileMenu_1["default"], null), React.createElement("section", {
            className: "pt-32 pb-20"
          }, React.createElement("div", {
            className: "container mx-auto px-4"
          }, React.createElement("div", {
            className: "mb-8"
          }, React.createElement("h1", {
            className: "text-3xl font-bold mb-2"
          }, "Membership Requests"), React.createElement("p", {
            className: "text-gray-600"
          }, "Review and manage membership applications")), React.createElement("div", {
            className: "bg-white rounded-lg shadow-md p-6 mb-8"
          }, React.createElement("div", {
            className: "flex flex-col md:flex-row gap-4 items-center"
          }, React.createElement("div", {
            className: "relative flex-1"
          }, React.createElement(lucide_react_1.Search, {
            className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            size: 18
          }), React.createElement("form", {
            action: "/admin/membership-requests",
            method: "get",
            className: "w-full"
          }, status !== "PENDING" && React.createElement("input", {
            type: "hidden",
            name: "status",
            value: status
          }), React.createElement(input_1.Input, {
            type: "text",
            name: "search",
            placeholder: "Search by name, email, or university...",
            defaultValue: searchQuery,
            className: "pl-10 w-full"
          }))), React.createElement("div", {
            className: "flex gap-2 md:gap-4"
          }, React.createElement(link_1["default"], {
            href: "/admin/membership-requests?status=PENDING",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "PENDING" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.AlertCircle, {
            size: 16,
            className: "mr-2"
          }), "Pending (", statusCounts[0], ")"), React.createElement(link_1["default"], {
            href: "/admin/membership-requests?status=APPROVED",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "APPROVED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.CheckCircle, {
            size: 16,
            className: "mr-2"
          }), "Approved (", statusCounts[1], ")"), React.createElement(link_1["default"], {
            href: "/admin/membership-requests?status=REJECTED",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.XCircle, {
            size: 16,
            className: "mr-2"
          }), "Rejected (", statusCounts[2], ")")))), React.createElement("div", {
            className: "bg-white rounded-lg shadow-md overflow-hidden"
          }, React.createElement("div", {
            className: "overflow-x-auto"
          }, React.createElement("table", {
            className: "w-full"
          }, React.createElement("thead", {
            className: "bg-gray-50 text-left"
          }, React.createElement("tr", null, React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, React.createElement("div", {
            className: "flex items-center space-x-1"
          }, React.createElement("span", null, "Name"), React.createElement(lucide_react_1.ArrowUpDown, {
            size: 14
          }))), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Email"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "University"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Date"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Payment"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Action"))), React.createElement("tbody", {
            className: "bg-white divide-y divide-gray-200"
          }, membershipRequests.length > 0 ? membershipRequests.map(function (request) {
            var _a, _b;

            return React.createElement("tr", {
              key: request.id,
              className: "hover:bg-gray-50"
            }, React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap"
            }, React.createElement("div", {
              className: "font-medium text-gray-900"
            }, request.firstName, " ", request.lastName), React.createElement("div", {
              className: "text-sm text-gray-500"
            }, request.isStudent ? "Student" : "Non-Student")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, request.email), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, request.university), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, date_fns_1.format(new Date(request.createdAt), "MMM d, yyyy")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap"
            }, ((_a = request.user) === null || _a === void 0 ? void 0 : _a.paymentVerified) ? React.createElement("span", {
              className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            }, "Verified") : React.createElement("span", {
              className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
            }, "Pending")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, React.createElement(MembershipStatusActions_1["default"], {
              requestId: request.id,
              userId: request.userId || "",
              currentStatus: request.status,
              paymentVerified: ((_b = request.user) === null || _b === void 0 ? void 0 : _b.paymentVerified) || false
            })));
          }) : React.createElement("tr", null, React.createElement("td", {
            colSpan: 6,
            className: "px-6 py-12 text-center text-gray-500"
          }, "No ", status.toLowerCase(), " membership requests found", searchQuery && " matching \"" + searchQuery + "\"")))))))), React.createElement(Footer_1["default"], null))];
      }
    });
  });
}

exports["default"] = MembershipRequestsPage;