import { Component, createSignal } from 'solid-js';
import { 
  ArrowUpRight, 
  Calendar, 
  DollarSign, 
  FileText, 
  Plus, 
  TrendingUp, 
  Users 
} from 'lucide-solid';
import Layout from './Layout';

const DashboardPage: Component = () => {
  const [stats] = createSignal([
    {
      name: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      name: 'Total Invoices',
      value: '2,350',
      change: '+15.3%',
      changeType: 'positive',
      icon: FileText
    },
    {
      name: 'Active Customers',
      value: '1,234',
      change: '+5.4%',
      changeType: 'positive',
      icon: Users
    },
    {
      name: 'Pending Payments',
      value: '$12,345',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp
    }
  ]);

  const [recentInvoices] = createSignal([
    {
      id: 'INV-001',
      customer: 'Acme Corp',
      amount: '$2,500',
      status: 'paid',
      date: '2024-01-15'
    },
    {
      id: 'INV-002',
      customer: 'Tech Solutions',
      amount: '$1,800',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: 'INV-003',
      customer: 'Design Studio',
      amount: '$3,200',
      status: 'paid',
      date: '2024-01-13'
    },
    {
      id: 'INV-004',
      customer: 'Marketing Agency',
      amount: '$950',
      status: 'overdue',
      date: '2024-01-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout showSidebar={true}>
      <div class="p-6">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-600 mt-2">Welcome back! Here's what's happening with your invoices.</p>
        </div>

        {/* Stats Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats().map((stat) => {
            const Icon = stat.icon;
            return (
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div class="bg-indigo-100 p-3 rounded-lg">
                    <Icon class="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div class="mt-4 flex items-center">
                  <span class={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span class="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Invoices */}
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-900">Recent Invoices</h2>
                  <button class="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
                    View all
                    <ArrowUpRight class="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  {recentInvoices().map((invoice) => (
                    <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div class="flex items-center space-x-4">
                        <div class="bg-gray-100 p-2 rounded-lg">
                          <FileText class="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{invoice.id}</p>
                          <p class="text-sm text-gray-500">{invoice.customer}</p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-4">
                        <span class="font-semibold text-gray-900">{invoice.amount}</span>
                        <span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                        <span class="text-sm text-gray-500">{invoice.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div class="space-y-6">
            {/* Quick Actions */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div class="p-6 space-y-4">
                <button class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  <Plus class="h-5 w-5 mr-2" />
                  Create Invoice
                </button>
                <button class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Users class="h-5 w-5 mr-2" />
                  Add Customer
                </button>
                <button class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <FileText class="h-5 w-5 mr-2" />
                  View Reports
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="bg-green-100 p-2 rounded-lg">
                      <DollarSign class="h-4 w-4 text-green-600" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">Payment received</p>
                      <p class="text-sm text-gray-500">$2,500 from Acme Corp</p>
                      <p class="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="bg-blue-100 p-2 rounded-lg">
                      <FileText class="h-4 w-4 text-blue-600" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">Invoice sent</p>
                      <p class="text-sm text-gray-500">INV-002 to Tech Solutions</p>
                      <p class="text-xs text-gray-400">4 hours ago</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="bg-purple-100 p-2 rounded-lg">
                      <Users class="h-4 w-4 text-purple-600" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">New customer added</p>
                      <p class="text-sm text-gray-500">Design Studio</p>
                      <p class="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div class="mt-8">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <div class="flex items-center space-x-2">
                <Calendar class="h-5 w-5 text-gray-400" />
                <span class="text-sm text-gray-500">Last 6 months</span>
              </div>
            </div>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <TrendingUp class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p class="text-gray-500">Chart visualization would go here</p>
                <p class="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
