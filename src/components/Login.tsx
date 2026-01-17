"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {toast} from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
   const location = useLocation();
    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="page-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="gap-4">
          <CardTitle>
            {isSignUp ? "Create an account" : "Login to your account"}
          </CardTitle>

          <CardDescription>
            {isSignUp
              ? "Enter your email and password to sign up"
              : "Enter your email below to login"}
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Login" : "Sign Up"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading
                ? isSignUp
                  ? "Signing up..."
                  : "Logging in..."
                : isSignUp
                ? "Sign Up"
                : "Login"}
            </Button>
          </form>
        </CardContent>

        {!isSignUp && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
