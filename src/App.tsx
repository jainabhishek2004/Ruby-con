import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { RubyConProvider } from './components/RubyConContext';
import Header from './components/Header';
import Homepage from './components/Homepage';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Support from './components/Support';
import Contact from './components/Contact';

import LoginModal from './components/LoginModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Check if admin credentials
    const isAdminLogin = credentials.email === 'admin@rubyconworld.in' && credentials.password === 'admin123';
    
    setIsLoggedIn(true);
    setIsAdmin(isAdminLogin);
    setShowLoginModal(false);
    
    if (isAdminLogin) {
      setCurrentPage('admin');
      toast.success('Welcome Admin! You have access to the withdrawal receipt management system.', {
        duration: 4000,
      });
    } else {
      setCurrentPage('dashboard');
      toast.success('Welcome back! You have successfully logged into your RubyCon portal.', {
        duration: 4000,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage('home');
    toast.success('You have been safely logged out of your account.', {
      duration: 3000,
    });
  };

  const handlePageChange = (page: string) => {
    // Check admin access for admin panel
    if (page === 'admin' && !isAdmin) {
      toast.error('Admin access required. Please login with admin credentials.');
      return;
    }

    // Redirect to login if trying to access protected pages without being logged in
    if ((page === 'dashboard' || page === 'admin') && !isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setCurrentPage(page);
  };

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onPageChange={handlePageChange} onLogin={handleLoginModalOpen} />;
      case 'about':
        return <About />;
      case 'tokenomics':
        return <Tokenomics />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard /> : <Homepage onPageChange={handlePageChange} onLogin={handleLoginModalOpen} />;
      case 'admin':
        return isLoggedIn && isAdmin ? <AdminPanel /> : <Homepage onPageChange={handlePageChange} onLogin={handleLoginModalOpen} />;
      case 'support':
        return <Support />;
      case 'contact':
        return <Contact />;
      
      default:
        return <Homepage onPageChange={handlePageChange} onLogin={handleLoginModalOpen} />;
    }
  };

  return (
    <RubyConProvider>
      <div className="min-h-screen bg-background">
        <Header
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogin={handleLoginModalOpen}
          onLogout={handleLogout}
        />
        
        <main>
          {renderCurrentPage()}
        </main>

        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />

        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <div>
                  <h3 className="font-bold text-primary">RubyCon</h3>
                  <p className="text-xs text-muted-foreground">RBQ Token</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Shaping the future of decentralized value through transparent, 
                secure, and community-driven financial solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handlePageChange('about')} className="hover:text-primary">About Us</button></li>
                <li><button onClick={() => handlePageChange('tokenomics')} className="hover:text-primary">Tokenomics</button></li>
               
                <li><button onClick={() => handleLoginModalOpen()} className="hover:text-primary">Portal Access</button></li>
                {isAdmin && (
                  <li><button onClick={() => handlePageChange('admin')} className="hover:text-primary text-primary">Admin Panel</button></li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => handlePageChange('support')} className="hover:text-primary">Help Center</button></li>
                <li><button onClick={() => handlePageChange('contact')} className="hover:text-primary">Contact Us</button></li>
                <li><a href="mailto:support@rubyconworld.in" className="hover:text-primary">Email Support</a></li>
                <li><a href="https://telegram.me/RubyConOfficial" className="hover:text-primary">Telegram</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Risk Disclosure</a></li>
                <li><a href="#" className="hover:text-primary">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 RubyCon. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Registered in India</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-ruby"></div>
                <span className="text-xs text-muted-foreground">Secure & Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </RubyConProvider>
  );
}