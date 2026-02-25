import { useState, useEffect } from 'react';
import { X, Shield, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import AdminRatings from './AdminRatings';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { login, clear, loginStatus, identity, isLoginSuccess } = useInternetIdentity();
  const { actor } = useActor();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  // Check if user is admin when logged in
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (actor && isLoginSuccess) {
        setIsCheckingAdmin(true);
        try {
          const adminStatus = await actor.isCallerAdmin();
          setIsAdmin(adminStatus);
          if (!adminStatus) {
            toast.error('You do not have admin access');
          }
        } catch (error) {
          console.error('Failed to check admin status:', error);
          setIsAdmin(false);
        } finally {
          setIsCheckingAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    if (isOpen) {
      checkAdminStatus();
    }
  }, [actor, isLoginSuccess, isOpen]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      toast.error('Failed to login');
      console.error(error);
    }
  };

  const handleLogout = () => {
    clear();
    setIsAdmin(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="min-h-screen w-full max-w-7xl bg-background relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed top-4 right-4 p-2 rounded-full bg-card hover:bg-accent/10 text-foreground transition-colors z-10"
          aria-label="Close admin panel"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="pt-16 pb-8">
          {!isLoginSuccess ? (
            // Login view
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
              <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-3">
                  Admin Panel
                </h1>
                <p className="font-body text-muted-foreground mb-8">
                  Login with your Internet Identity to access the admin dashboard
                </p>
                <Button
                  onClick={handleLogin}
                  disabled={loginStatus === 'logging-in'}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {loginStatus === 'logging-in' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login with Internet Identity'
                  )}
                </Button>
              </div>
            </div>
          ) : isCheckingAdmin ? (
            // Checking admin status
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : isAdmin ? (
            // Admin dashboard
            <div>
              {/* Header with logout */}
              <div className="bg-card border-b border-border px-6 py-4 mb-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-accent" />
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Admin Dashboard
                      </h2>
                      <p className="font-body text-sm text-muted-foreground">
                        Melt & Glow Management
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                  >
                    Logout
                  </Button>
                </div>
              </div>

              {/* Admin content */}
              <AdminRatings />
            </div>
          ) : (
            // Not admin
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
              <div className="text-center max-w-md">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-destructive" />
                  </div>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-3">
                  Access Denied
                </h1>
                <p className="font-body text-muted-foreground mb-8">
                  You do not have admin privileges. Please contact the site owner.
                </p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
