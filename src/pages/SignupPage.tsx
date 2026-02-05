// src/pages/SignupPage.tsx

import * as React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // ✅ import Supabase client

import "./LoginPage.css"; // reuse aurora background + input styles

interface Props {
  onAuth?: () => void;
}

export default function SignupPage({ onAuth }: Props) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !dob || !email || !password) {
      setError("All fields are required");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // ✅ Supabase signup
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            dob,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Optionally auto-login after signup
/*const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { first_name: firstName, last_name: lastName, phone, dob },
    emailRedirectTo: window.location.origin + "/login",
  },
});

if (signUpError) {
  setError(signUpError.message);
  setLoading(false);
  return;
}*/

      // Call parent App to set auth state
      onAuth && onAuth();

      navigate("/"); // redirect to home/dashboard
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white font-sans">
      <div className="flex h-full w-full max-w-5xl">
        {/* Left Side: Signup Form */}
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3">
              <Heart className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">AuroraMinds</h1>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mb-8 text-gray-500">Fill in your details to get started ✨</p>

            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-lg border-gray-300 py-5"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-lg border-gray-300 py-5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border-gray-300 py-5"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="rounded-lg border-gray-300 py-5"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-gray-300 py-5"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border-gray-300 py-5"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <Button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-6 text-sm font-semibold text-white hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="font-semibold text-purple-600 hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>

        {/* Right Side Aurora Background */}
        <div className="aurora-background hidden md:flex w-1/2 items-center justify-center rounded-l-3xl">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            Welcome to AuroraMinds 🌸
          </h3>
        </div>
      </div>
    </div>
  );
}
