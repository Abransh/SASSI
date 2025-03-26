"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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

var TeamApplicationStatusActions_1 = require("@/components/admin/TeamApplicationStatusActions"); // Department icons and names for display


var DEPARTMENTS = {
  "student-support": {
    name: "Student Support",
    icon: "👋"
  },
  "events": {
    name: "Event Organizers",
    icon: "🎉"
  },
  "consulate": {
    name: "Consulate Liaison",
    icon: "🏛️"
  },
  "sponsorship": {
    name: "Sponsorship & External Liaison",
    icon: "🤝"
  },
  "social-media": {
    name: "Social Media & Content",
    icon: "🎨"
  },
  "tech": {
    name: "Tech Team",
    icon: "💻"
  }
};

function TeamApplicationsPage(_a) {
  var _b;

  var searchParams = _a.searchParams;
  return __awaiter(this, void 0, void 0, function () {
    var session, status, department, searchQuery, teamApplications, statusCounts, departmentCounts, departmentCountMap;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          return [4
          /*yield*/
          , next_1.getServerSession(route_1.authOptions)];

        case 1:
          session = _c.sent();

          if (!session || session.user.role !== "ADMIN") {
            navigation_1.redirect("/auth/signin?callbackUrl=/admin/team-applications");
          }

          status = searchParams.status || "PENDING";
          department = searchParams.department;
          searchQuery = searchParams.search || "";
          return [4
          /*yield*/
          , prisma_1["default"].teamApplication.findMany({
            where: __assign(__assign({
              status: status
            }, department ? {
              department: department
            } : {}), {
              user: searchQuery ? {
                OR: [{
                  name: {
                    contains: searchQuery,
                    mode: "insensitive"
                  }
                }, {
                  email: {
                    contains: searchQuery,
                    mode: "insensitive"
                  }
                }]
              } : undefined
            }),
            orderBy: {
              createdAt: "desc"
            },
            include: {
              user: true
            }
          })];

        case 2:
          teamApplications = _c.sent();
          return [4
          /*yield*/
          , prisma_1["default"].$transaction([prisma_1["default"].teamApplication.count({
            where: {
              status: "PENDING"
            }
          }), prisma_1["default"].teamApplication.count({
            where: {
              status: "APPROVED"
            }
          }), prisma_1["default"].teamApplication.count({
            where: {
              status: "REJECTED"
            }
          })])];

        case 3:
          statusCounts = _c.sent();
          return [4
          /*yield*/
          , prisma_1["default"].teamApplication.groupBy({
            by: ["department"],
            _count: {
              department: true
            },
            where: {
              status: status
            }
          })];

        case 4:
          departmentCounts = _c.sent();
          departmentCountMap = departmentCounts.reduce(function (acc, _a) {
            var department = _a.department,
                _count = _a._count;
            acc[department] = _count.department;
            return acc;
          }, {});
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
          }, "Team Applications"), React.createElement("p", {
            className: "text-gray-600"
          }, "Review and manage team applications by department")), React.createElement("div", {
            className: "bg-white rounded-lg shadow-md p-6 mb-8"
          }, React.createElement("div", {
            className: "flex flex-col space-y-4"
          }, React.createElement("div", {
            className: "flex flex-wrap gap-2 md:gap-4"
          }, React.createElement(link_1["default"], {
            href: "/admin/team-applications?status=PENDING",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "PENDING" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.AlertCircle, {
            size: 16,
            className: "mr-2"
          }), "Pending (", statusCounts[0], ")"), React.createElement(link_1["default"], {
            href: "/admin/team-applications?status=APPROVED",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "APPROVED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.CheckCircle, {
            size: 16,
            className: "mr-2"
          }), "Approved (", statusCounts[1], ")"), React.createElement(link_1["default"], {
            href: "/admin/team-applications?status=REJECTED",
            className: "px-4 py-2 rounded-md flex items-center " + (status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.XCircle, {
            size: 16,
            className: "mr-2"
          }), "Rejected (", statusCounts[2], ")")), React.createElement("div", {
            className: "flex flex-col md:flex-row gap-4 items-center"
          }, React.createElement("div", {
            className: "relative flex-1"
          }, React.createElement(lucide_react_1.Search, {
            className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            size: 18
          }), React.createElement("form", {
            action: "/admin/team-applications",
            method: "get",
            className: "w-full"
          }, status !== "PENDING" && React.createElement("input", {
            type: "hidden",
            name: "status",
            value: status
          }), department && React.createElement("input", {
            type: "hidden",
            name: "department",
            value: department
          }), React.createElement(input_1.Input, {
            type: "text",
            name: "search",
            placeholder: "Search by name or email...",
            defaultValue: searchQuery,
            className: "pl-10 w-full"
          })))), React.createElement("div", {
            className: "flex flex-wrap gap-2"
          }, React.createElement(link_1["default"], {
            href: "/admin/team-applications?status=" + status,
            className: "px-3 py-1.5 rounded-full text-sm flex items-center " + (!department ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
          }, React.createElement(lucide_react_1.Users, {
            size: 14,
            className: "mr-1.5"
          }), "All Departments"), Object.entries(DEPARTMENTS).map(function (_a) {
            var deptId = _a[0],
                _b = _a[1],
                name = _b.name,
                icon = _b.icon;
            return React.createElement(link_1["default"], {
              key: deptId,
              href: "/admin/team-applications?status=" + status + "&department=" + deptId,
              className: "px-3 py-1.5 rounded-full text-sm flex items-center " + (department === deptId ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
            }, React.createElement("span", {
              className: "mr-1.5"
            }, icon), name, " (", departmentCountMap[deptId] || 0, ")");
          })))), React.createElement("div", {
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
          }, React.createElement("span", null, "Applicant"), React.createElement(lucide_react_1.ArrowUpDown, {
            size: 14
          }))), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Department"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Motivation"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Date"), React.createElement("th", {
            className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
          }, "Action"))), React.createElement("tbody", {
            className: "bg-white divide-y divide-gray-200"
          }, teamApplications.length > 0 ? teamApplications.map(function (application) {
            var _a, _b;

            var deptInfo = DEPARTMENTS[application.department] || {
              name: application.department,
              icon: "📁"
            };
            return React.createElement("tr", {
              key: application.id,
              className: "hover:bg-gray-50"
            }, React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap"
            }, React.createElement("div", {
              className: "font-medium text-gray-900"
            }, ((_a = application.user) === null || _a === void 0 ? void 0 : _a.name) || "Unknown User"), React.createElement("div", {
              className: "text-sm text-gray-500"
            }, ((_b = application.user) === null || _b === void 0 ? void 0 : _b.email) || "No email")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap"
            }, React.createElement("div", {
              className: "flex items-center"
            }, React.createElement("span", {
              className: "text-xl mr-2"
            }, deptInfo.icon), React.createElement("span", {
              className: "text-sm text-gray-700"
            }, deptInfo.name))), React.createElement("td", {
              className: "px-6 py-4"
            }, React.createElement("div", {
              className: "text-sm text-gray-500 max-w-xs truncate"
            }, application.motivation || "No motivation provided")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, date_fns_1.format(new Date(application.createdAt), "MMM d, yyyy")), React.createElement("td", {
              className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            }, React.createElement(TeamApplicationStatusActions_1["default"], {
              applicationId: application.id,
              currentStatus: application.status
            })));
          }) : React.createElement("tr", null, React.createElement("td", {
            colSpan: 5,
            className: "px-6 py-12 text-center text-gray-500"
          }, "No ", status.toLowerCase(), " team applications found", department && " for " + (((_b = DEPARTMENTS[department]) === null || _b === void 0 ? void 0 : _b.name) || department), searchQuery && " matching \"" + searchQuery + "\"")))))))), React.createElement(Footer_1["default"], null))];
      }
    });
  });
}

exports["default"] = TeamApplicationsPage;