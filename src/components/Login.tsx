// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import {toast} from "sonner";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// export function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//    const location = useLocation();
//     const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (isSignUp) {
//       // SIGN UP
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: window.location.origin,
//         },
//       });

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success(" Signed up successfully!!");
//         setIsSignUp(false);
//       }
//     } else {
//       // LOGIN
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success("Logged in successfully!");
//        navigate("/");

//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="page-center">
//       <Card className="w-full max-w-sm "> 
//         <CardHeader className="gap-4">  
//           <CardTitle>
//             {isSignUp ? "Create an account" : "Login to your account"}
//           </CardTitle>

//           <CardDescription>
//             {isSignUp
//               ? "Enter your email and password to sign up"
//               : "Enter your email below to login"}
//           </CardDescription>

//           <CardAction>
//             <Button
//               variant="link"
//               type="button"
//               onClick={() => setIsSignUp(!isSignUp)}
//             >
//               {isSignUp ? "Already have an account? Login" : "Sign Up"}
//             </Button>
//           </CardAction>
//         </CardHeader>

//         <CardContent >
//           <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <Button type="submit" disabled={loading}>
//               {loading
//                 ? isSignUp
//                   ? "Signing up..."
//                   : "Logging in..."
//                 : isSignUp
//                 ? "Sign Up"
//                 : "Login"}
//             </Button>
//           </form>
//         </CardContent>

//         {!isSignUp && (
//           <CardFooter>
//             <Button variant="outline" className="w-full">
//               Login with Google
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, TrendingUp, Check, Lock, FileCheck, Layers } from 'lucide-react';

const CryptoSymbol = ({ symbol, delay, duration }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  });

  return (
    <div
      className="absolute text-4xl opacity-10 dark:opacity-5 pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
      }}
    >
      {symbol}
    </div>
  );
};

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const cryptoSymbols = ['₿', 'Ξ', '◊', '₮', '₳', 'Ð', 'Ł', 'Ӿ'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // SIGN UP
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(" Signed up successfully!!");
        setIsSignUp(false);
      }
    } else {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      

     
         
         <div className="min-h-screen flex flex-row lg:flex-col">
        {/* Left Side - Marketing Content (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 relative overflow-hidden">
          {/* Floating Crypto Symbols on Red Background */}
          

          <div className="relative z-10 flex flex-col justify-between h-full w-full">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">₿</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">RubyCon</h1>
                  <p className="text-sm opacity-90">RBQ Token Ecosystem</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-bold leading-tight">
                  The Future of<br />Decentralized Finance
                </h2>
                <p className="text-lg opacity-90 max-w-md">
                  Join thousands of users who trust RubyCon for secure, transparent, and profitable crypto token management.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 my-12">
              <div className="stat-card rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-sm opacity-90">Active Users</div>
              </div>
              <div className="stat-card rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">₹100Cr+</div>
                <div className="text-sm opacity-90">Total Volume</div>
              </div>
              <div className="stat-card rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
            </div>

            {/* Security Features */}
            <div>
              <h3 className="text-xl font-bold mb-4">Bank-Grade Security</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="feature-card rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">256-bit SSL Encryption</div>
                </div>
                <div className="feature-card rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">Two-Factor Authentication</div>
                </div>
                <div className="feature-card rounded-lg p-4 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">Regular Security Audits</div>
                </div>
                <div className="feature-card rounded-lg p-4 flex items-start gap-3">
                  <Layers className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">Multi-Signature Protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 w-full  gradient-bg relative overflow-hidden flex items-center justify-center p-4 lg:p-12">
          {/* Crypto Grid Background */}
          <div className="crypto-grid" />

          {/* Floating Crypto Symbols on Right Side */}
         

          {/* Auth Card */}
          <Card className="w-full max-w-md glass-effect shadow-2xl relative z-10">
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg logo-pulse">
                  <span className="text-3xl">₿</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {isSignUp ? "Create an account" : "Login to your account"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isSignUp
                  ? "Enter your email and password to sign up"
                  : "Enter your email below to login"}
              </CardDescription>
              <div className="pt-2">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary font-semibold"
                >
                  {isSignUp ? "Already have an account? Login" : "Sign Up"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="premium-input bg-input-background dark:bg-input h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="premium-input bg-input-background dark:bg-input h-12"
                    required
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full premium-button h-12 text-base font-semibold"
                >
                  {loading
                    ? isSignUp
                      ? "Signing up..."
                      : "Logging in..."
                    : isSignUp
                    ? "Sign Up"
                    : "Login"}
                </Button>
              </div>

              {!isSignUp && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 premium-button"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
        </div>
      </div>
    </>
  );
}
