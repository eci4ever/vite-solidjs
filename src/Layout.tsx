import { Component, JSX, Show } from "solid-js";
import { A } from "@solidjs/router";
import {
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-solid";
import { signOut, useSession } from "./lib/auth-client";
import { useNavigate } from "@solidjs/router";

interface LayoutProps {
  children: JSX.Element;
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const Layout: Component<LayoutProps> = (props) => {
  const navigate = useNavigate();
  const session = useSession();
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Todo", href: "/todo", icon: FileText },
  ];

  return (
    <div class="min-h-screen bg-gray-50">
      {props.showSidebar ? (
        <div class="flex min-h-screen">
          {/* Mobile Sidebar Overlay */}
          {props.sidebarOpen && (
            <div
              class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={props.onToggleSidebar}
            />
          )}

          {/* Sidebar */}
          <div
            class={`
            ${props.sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:flex md:w-64 md:flex-col
            fixed inset-y-0 left-0 z-50 w-64
            md:relative md:sticky md:top-0 md:h-screen
            transition-transform duration-300 ease-in-out
          `}
          >
            <div class="flex flex-col h-full bg-white border-r border-gray-200 shadow-lg">
              {/* Header Logo */}
              <div class="flex items-center flex-shrink-0 px-4 py-5 border-b border-gray-200">
                <A href="/" class="flex items-center">
                  <FileText class="h-8 w-8 text-indigo-600" />
                  <span class="ml-2 text-xl font-bold text-gray-900">
                    InvoiceApp
                  </span>
                </A>
              </div>

              {/* Navigation - flex-1 untuk ambil ruang tengah */}
              <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <A
                      href={item.href}
                      class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      activeClass="bg-indigo-50 text-indigo-600"
                    >
                      <Icon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      {item.name}
                    </A>
                  );
                })}
              </nav>

              {/* User Profile - stick di bawah */}
              <div class="flex-shrink-0 border-t border-gray-200 p-4">
                <Show
                  when={session().data?.user}
                  fallback={
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <User class="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-500">
                          Loading...
                        </p>
                      </div>
                    </div>
                  }
                >
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                        <User class="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-700">
                        {session().data?.user?.name ||
                          session().data?.user?.email ||
                          "User"}
                      </p>
                      <button
                        class="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                        onClick={() =>
                          signOut({
                            fetchOptions: {
                              onSuccess: () => {
                                navigate("/");
                              },
                            },
                          })
                        }
                      >
                        <LogOut class="h-3 w-3 mr-1" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div class="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <header class="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <button
                    onClick={props.onToggleSidebar}
                    class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                  >
                    <Menu class="h-6 w-6" />
                  </button>
                  <h1 class="ml-3 text-lg font-semibold text-gray-900">
                    Dashboard
                  </h1>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="hidden md:flex items-center">
                    <span class="text-sm text-gray-500 mr-2">Sidebar</span>
                    <button
                      onClick={props.onToggleSidebar}
                      class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        props.sidebarOpen ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          props.sidebarOpen ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main class="flex-1 overflow-y-auto">{props.children}</main>
          </div>
        </div>
      ) : (
        // Full page layout without sidebar
        <div class="min-h-screen">{props.children}</div>
      )}
    </div>
  );
};

export default Layout;
