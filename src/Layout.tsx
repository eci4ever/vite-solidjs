import { Component, JSX } from 'solid-js';
import { A } from '@solidjs/router';
import { FileText, Home, LogOut, Settings, User, Users } from 'lucide-solid';

interface LayoutProps {
  children: JSX.Element;
  showSidebar?: boolean;
}

const Layout: Component<LayoutProps> = (props) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div class="min-h-screen bg-gray-50">
      {props.showSidebar ? (
        <div class="flex">
          {/* Sidebar */}
          <div class="hidden md:flex md:w-64 md:flex-col">
            <div class="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
              <div class="flex items-center flex-shrink-0 px-4">
                <A href="/" class="flex items-center">
                  <FileText class="h-8 w-8 text-indigo-600" />
                  <span class="ml-2 text-xl font-bold text-gray-900">InvoiceApp</span>
                </A>
              </div>
              <div class="mt-5 flex-grow flex flex-col">
                <nav class="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <A
                        href={item.href}
                        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <Icon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        {item.name}
                      </A>
                    );
                  })}
                </nav>
              </div>
              <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <User class="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-700">John Doe</p>
                    <button class="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                      <LogOut class="h-3 w-3 mr-1" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div class="flex-1 flex flex-col">
            <main class="flex-1">
              {props.children}
            </main>
          </div>
        </div>
      ) : (
        // Full page layout without sidebar
        <div class="min-h-screen">
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Layout;
