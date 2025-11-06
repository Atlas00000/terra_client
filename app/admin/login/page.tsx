/**
 * Admin Login Page
 * 
 * Authentication page for admin users
 * Redirects to dashboard on successful login
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, Mail, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggingIn, loginError, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Redirect if already authenticated (only once, and only if still on login page)
  useEffect(() => {
    if (isAuthenticated && !hasRedirected && !isLoggingIn && window.location.pathname === '/admin/login') {
      setHasRedirected(true);
      const redirect = searchParams?.get('redirect') || '/admin/dashboard';
      router.replace(redirect); // Use replace instead of push to avoid back button issues
    }
  }, [isAuthenticated, hasRedirected, isLoggingIn, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    try {
      await login({ email, password });
      // useEffect above will handle redirect when isAuthenticated becomes true
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-border/50">
        <CardHeader className="space-y-4 pb-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center border border-primary/30 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
              <Image
                src="/terra-logo.png"
                alt="Terra Industries"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-terra-steel-blue bg-clip-text text-transparent">
              Admin Portal
            </CardTitle>
            <CardDescription>
              Sign in to access the Terra Industries admin dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {(showError || loginError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {loginError?.message || 'Invalid email or password. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@terraindustries.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                  disabled={isLoggingIn}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="current-password"
                  disabled={isLoggingIn}
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoggingIn || !email || !password}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            Protected by JWT authentication
          </p>
        </div>
      </Card>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full opacity-30 animate-pulse delay-75" />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary rounded-full opacity-30 animate-pulse delay-150" />
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-primary rounded-full opacity-30 animate-pulse delay-300" />
    </div>
  );
}

