import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { ArrowRight, CheckCircle, FileText, Shield, Zap } from 'lucide-solid';
import Layout from './Layout';

const LandingPage: Component = () => {
  const features = [
    {
      icon: FileText,
      title: 'Easy Invoice Creation',
      description: 'Create professional invoices in minutes with our intuitive interface.'
    },
    {
      icon: Zap,
      title: 'Quick Payments',
      description: 'Get paid faster with integrated payment processing and automated reminders.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security and 99.9% uptime.'
    }
  ];

  const stats = [
    { label: 'Invoices Created', value: '10,000+' },
    { label: 'Happy Customers', value: '2,500+' },
    { label: 'Countries Served', value: '50+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  return (
    <Layout showSidebar={false}>
      {/* Header */}
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <FileText class="h-8 w-8 text-indigo-600" />
              <span class="ml-2 text-2xl font-bold text-gray-900">InvoiceApp</span>
            </div>
            <div class="flex items-center space-x-4">
              <A href="/signin" class="text-gray-500 hover:text-gray-900 transition-colors">
                Sign In
              </A>
              <A 
                href="/signup" 
                class="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </A>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Invoice Management
              <span class="block text-indigo-200">Made Simple</span>
            </h1>
            <p class="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Create, send, and track invoices effortlessly. Get paid faster with our all-in-one invoice management platform.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <A 
                href="/signup" 
                class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight class="ml-2 h-5 w-5" />
              </A>
              <a 
                href="#features" 
                class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div class="text-center">
                <div class="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div class="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" class="bg-gray-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage invoices
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to streamline your invoicing process and get paid faster.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div class="bg-white p-8 rounded-lg shadow-sm">
                  <div class="flex items-center mb-4">
                    <div class="bg-indigo-100 p-3 rounded-lg">
                      <Icon class="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p class="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="bg-indigo-600 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p class="text-xl text-indigo-100 mb-8">
            Join thousands of businesses already using InvoiceApp to manage their invoices.
          </p>
          <A 
            href="/signup" 
            class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Create Your Account
            <ArrowRight class="ml-2 h-5 w-5" />
          </A>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <FileText class="h-6 w-6 text-indigo-400" />
              <span class="ml-2 text-lg font-semibold">InvoiceApp</span>
            </div>
            <div class="text-gray-400">
              © 2024 InvoiceApp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;
