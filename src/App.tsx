



import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

import Header from './components/Header';
import Homepage from './components/Homepage';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Support from './components/Support';
import Contact from './components/Contact';
import { LoginPage } from './components/Login';
import { supabase } from "@/lib/supabase";

import { useRubyCon } from './components/RubyConContext';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);

  const { theme, users } = useRubyCon();

  // ✅ derived variable (NOT state)
  const isLoggedIn = !!users;

  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const location = useLocation();
  const navigate = useNavigate();

  const isLoginRoute = location.pathname === '/login';

  // ✅ ONLY NEW FUNCTION (navigation)
  const handleLoginNavigate = () => {
    navigate('/login');
  };
  const handleLogout = async () => {
  await supabase.auth.signOut();
  toast.success("Logged out");
  navigate("/"); // or "/login"
};


  const handlePageChange = (page: string) => {
    // Admin access check
    if (page === 'admin' && !isAdmin) {
      toast.error('Admin access required.');
      return;
    }

    // Protected routes check
    if ((page === 'dashboard' || page === 'admin') && !isLoggedIn) {
      toast.error('Please login to access this page.');
      return;
    }

    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onPageChange={handlePageChange} onLogin={handleLoginNavigate} />;

      case 'about':
        return <About />;

      case 'tokenomics':
        return <Tokenomics />;

      case 'dashboard':
        return isLoggedIn ? (
          <Dashboard />
        ) : (
          <Homepage onPageChange={handlePageChange} onLogin={handleLoginNavigate} />
        );

      case 'admin':
        return isLoggedIn && isAdmin ? (
          <AdminPanel />
        ) : (
          <Homepage onPageChange={handlePageChange} onLogin={handleLoginNavigate} />
        );

      case 'support':
        return <Support />;

      case 'contact':
        return <Contact />;

      default:
        return <Homepage onPageChange={handlePageChange} onLogin={handleLoginNavigate} />;
    }
  };

  return (
    <>
      <div>
        {!isLoginRoute && (
          <Header
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            onLogin={handleLoginNavigate}
            onLogout={handleLogout}
          />
        )}

        {isLoginRoute ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        ) : (
          <main>{renderCurrentPage()}</main>
        )}

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
        {!isLoginRoute && (
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
        )}
      </div>
    </>
  );
}
