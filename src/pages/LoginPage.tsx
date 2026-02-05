// src/pages/LoginPage.tsx
import * as React from "react";
import { Heart, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import "./LoginPage.css";

const slides = [
  { title: "Personalized Journeys", text: "Receive tailored wellness plans and resources designed just for you." },
  { title: "Confidential Support", text: "Book private sessions, access resources, and connect with peers." },
  { title: "Mindful Practices", text: "Explore guided meditations, breathing exercises, and mindfulness techniques." },
];

interface Props { onAuth?: () => void }

export default function LoginPage({ onAuth }: Props) {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    onAuth && onAuth();
    navigate("/"); // redirect to home/dashboard
  };

  const handleOAuth = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + "/login" },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white font-sans">
      <div className="flex h-full w-full max-w-7xl">
        {/* Left Side */}
        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3">
              <Heart className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">AuroraMinds</h1>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Log in</h2>
            <p className="mb-8 text-gray-500">Welcome back! Please enter your details.</p>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 py-6 text-sm font-semibold text-white hover:opacity-90"
                onClick={() => handleOAuth("google")}
              >
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full justify-center gap-2 rounded-lg border-none bg-[#24292F] py-6 text-sm font-semibold text-white hover:bg-[#24292F]/90"
                onClick={() => handleOAuth("github")}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-xs font-medium text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg py-5" />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg py-5" />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full rounded-lg bg-purple-600 py-6 text-white" disabled={loading}>
                {loading ? "Logging in..." : "Continue"}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-purple-600 hover:underline">Create your account</Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="aurora-background relative hidden items-center justify-center rounded-l-3xl md:flex md:w-1/2">
          <Carousel plugins={[plugin.current]} className="w-full max-w-md" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="rounded-2xl bg-white/70 shadow-xl backdrop-blur-md p-8 flex flex-col items-center justify-center min-h-[280px]">
                      <h3 className="mb-4 text-xl font-bold text-gray-800">{slide.title}</h3>
                      <p className="text-center text-sm text-gray-600">{slide.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white/50 text-gray-600 hover:bg-white/80" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white/50 text-gray-600 hover:bg-white/80" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
