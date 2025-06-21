import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LogOut, Play, ChevronRight, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { routeMapping, iconMapping } from "../utils/constants";
import { logout } from "../utils/auth";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [navigation, setNavigation] = useState<string[]>([]);
  const [panelTitle, setPanelTitle] = useState("Admin Panel");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = jwtDecode<AuthTokenPayload>(token);
      const allowedRoutesForRole = decoded.allowedRoutes || [];
      const role = decoded.role;

      setUserRole(role);

      // Filter routes that exist in our routeMapping
      const allowedNavigation = allowedRoutesForRole.filter((item) =>
        Object.keys(routeMapping).includes(item)
      );

      setNavigation(allowedNavigation);

      // Set panel title based on role
      switch (role) {
        case "admin":
          setPanelTitle("Admin Panel");
          break;
        case "seller":
          setPanelTitle("Seller Panel");
          break;
        case "user":
          setPanelTitle("User Panel");
          break;
        default:
          setPanelTitle("Dashboard");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Get the base path based on user role
  const getBasePath = () => {
    switch (userRole) {
      case "admin":
        return "/admin";
      case "seller":
        return "/seller";
      case "user":
        return "/user";
      default:
        return "/admin";
    }
  };

  // Get the route path for a navigation item
  const getRoutePath = (item: string) => {
    const basePath = getBasePath();

    // Dashboard is the index route, so use the base path
    if (item === "dashboard" || item === "home") {
      return basePath;
    }

    // For other routes, append to base path
    return `${basePath}/${item}`;
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } h-screen fixed left-0 top-0 bg-gray-900 border-r border-gray-800 transition-all duration-300 z-30`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-1.5 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">{panelTitle}</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 space-y-1 mt-6 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = iconMapping(item);
            const routePath = getRoutePath(item);

            return (
              <NavLink
                key={item}
                to={routePath}
                end={item === "dashboard" || item === "home"}
                className={({ isActive }) => {
                  const baseClasses =
                    "group flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300";
                  const activeClass =
                    "bg-gradient-to-r from-cyan-500/20 to-blue-700/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20";
                  const inactiveClass =
                    "text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20";

                  return `${baseClasses} ${
                    isActive ? activeClass : inactiveClass
                  }`;
                }}
              >
                <div className="flex items-center">
                  <div className="relative w-5 mr-3">
                    {Icon && (
                      <Icon className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" />
                    )}
                  </div>
                  {!collapsed && <span>{routeMapping[item]}</span>}
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button and Footer - Fixed at bottom */}
        <div className="mt-auto border-t border-gray-800">
          <button
            onClick={handleLogOut}
            className="group flex items-center px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg w-full transition-colors hover:cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400" />
            {!collapsed && "Logout"}
          </button>
          {!collapsed && (
            <div className="p-4">
              <p className="text-xs text-gray-500">© 2025 GameStore.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main
        className={`flex-1 h-screen overflow-hidden ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="h-full overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
