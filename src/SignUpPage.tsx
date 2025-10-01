import { Component, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { ArrowLeft, Eye, EyeOff, FileText, Lock, Mail, User } from 'lucide-solid';
import Layout from './Layout';

const SignUpPage: Component = () => {
  const [formData, setFormData] = createSignal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (formData().password !== formData().confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData().agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sign up attempt:', formData());
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <Layout showSidebar={false}>
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="flex justify-center">
            <div class="flex items-center">
              <FileText class="h-10 w-10 text-indigo-600" />
              <span class="ml-2 text-2xl font-bold text-gray-900">InvoiceApp</span>
            </div>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <A href="/signin" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              sign in to your existing account
            </A>
          </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" onSubmit={handleSubmit}>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="John"
                      value={formData().firstName}
                      onInput={(e) => updateFormData('firstName', e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User class="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Doe"
                      value={formData().lastName}
                      onInput={(e) => updateFormData('lastName', e.currentTarget.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div class="mt-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="john@example.com"
                    value={formData().email}
                    onInput={(e) => updateFormData('email', e.currentTarget.value)}
                  />
                </div>
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-gray-700">
                  Company name (optional)
                </label>
                <div class="mt-1">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Acme Inc."
                    value={formData().company}
                    onInput={(e) => updateFormData('company', e.currentTarget.value)}
                  />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword() ? 'text' : 'password'}
                    autocomplete="new-password"
                    required
                    class="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Create a password"
                    value={formData().password}
                    onInput={(e) => updateFormData('password', e.currentTarget.value)}
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      class="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword())}
                    >
                      {showPassword() ? (
                        <EyeOff class="h-5 w-5" />
                      ) : (
                        <Eye class="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div class="mt-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword() ? 'text' : 'password'}
                    autocomplete="new-password"
                    required
                    class="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Confirm your password"
                    value={formData().confirmPassword}
                    onInput={(e) => updateFormData('confirmPassword', e.currentTarget.value)}
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      class="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword())}
                    >
                      {showConfirmPassword() ? (
                        <EyeOff class="h-5 w-5" />
                      ) : (
                        <Eye class="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData().agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.currentTarget.checked)}
                />
                <label for="agreeToTerms" class="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading()}
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading() ? (
                    <div class="flex items-center">
                      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300" />
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  <span class="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span class="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <A 
            href="/" 
            class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft class="h-4 w-4 mr-1" />
            Back to home
          </A>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
