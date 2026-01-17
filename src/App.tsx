

// import React, { useState, useEffect } from 'react';
// import { Toaster } from './components/ui/sonner';
// import { toast } from 'sonner@2.0.3';

// import Header from './components/Header';
// import Homepage from './components/Homepage';
// import About from './components/About';
// import Tokenomics from './components/Tokenomics';
// import Dashboard from './components/Dashboard';
// import AdminPanel from './components/AdminPanel';
// import Support from './components/Support';
// import Contact from './components/Contact';
// import { LoginPage } from './components/Login';

// import { useRubyCon } from './components/RubyConContext';
// import { Routes, Route, useLocation } from 'react-router-dom';

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { theme, users } = useRubyCon();

//   // ✅ derived variable (NOT state)
//   const isLoggedIn = !!users;

//   useEffect(() => {
//     if (theme.mode === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);

//   const location = useLocation();
//   const isLoginRoute = location.pathname === '/Login';

//   const handlePageChange = (page: string) => {
//     // Admin access check
//     if (page === 'admin' && !isAdmin) {
//       toast.error('Admin access required.');
//       return;
//     }

//     // Protected routes check
//     if ((page === 'dashboard' || page === 'admin') && !isLoggedIn) {
//       toast.error('Please login to access this page.');
//       return;
//     }

//     setCurrentPage(page);
//   };

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <Homepage onPageChange={handlePageChange} onLogin={() => {}} />;

//       case 'about':
//         return <About />;

//       case 'tokenomics':
//         return <Tokenomics />;

//       case 'dashboard':
//         return isLoggedIn ? <Dashboard /> : <Homepage onPageChange={handlePageChange} onLogin={() => {}} />;

//       case 'admin':
//         return isLoggedIn && isAdmin ? <AdminPanel /> : <Homepage onPageChange={handlePageChange} onLogin={() => {}} />;

//       case 'support':
//         return <Support />;

//       case 'contact':
//         return <Contact />;

//       default:
//         return <Homepage onPageChange={handlePageChange} onLogin={() => {}} />;
//     }
//   };

//   return (
//     <>
//       <div>
//         {!isLoginRoute && (
//           <Header
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//             isLoggedIn={isLoggedIn}
//             isAdmin={isAdmin}
//             onLogin={() => {}}
//             onLogout={() => {}}
//           />
//         )}

//         {isLoginRoute ? (
//           <Routes>
//             <Route path="/Login" element={<LoginPage />} />
//           </Routes>
//         ) : (
//           <main>{renderCurrentPage()}</main>
//         )}

//         <Toaster
//           position="top-right"
//           toastOptions={{
//             style: {
//               background: 'hsl(var(--card))',
//               color: 'hsl(var(--card-foreground))',
//               border: '1px solid hsl(var(--border))',
//             },
//           }}
//         />

//         {/* Footer */}
//         {!isLoginRoute && (
//           <footer className="bg-card border-t border-border py-8 px-4">
//             <div className="max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                 <div>
//                   <h3 className="font-bold text-primary">RubyCon</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Shaping the future of decentralized value through transparent,
//                     secure, and community-driven financial solutions.
//                   </p>
//                 </div>
//               </div>

//               <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
//                 © 2024 RubyCon. All rights reserved.
//               </div>
//             </div>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }

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

  const isLoginRoute = location.pathname === '/Login';

  // ✅ ONLY NEW FUNCTION (navigation)
  const handleLoginNavigate = () => {
    navigate('/Login');
  };
  const handleLogout = async () => {
  await supabase.auth.signOut();
  toast.success("Logged out");
  navigate("/"); // or "/Login"
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
            <Route path="/Login" element={<LoginPage />} />
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
                  <h3 className="font-bold text-primary">RubyCon</h3>
                  <p className="text-sm text-muted-foreground">
                    Shaping the future of decentralized value through transparent,
                    secure, and community-driven financial solutions.
                  </p>
                </div>
              </div>

              <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
                © 2024 RubyCon. All rights reserved.
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
