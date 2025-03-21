
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GlassMorphicCard } from '../common/GlassMorphicCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CrownIcon, Sparkles, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StatusDisplay: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const { subscription } = user;
  const questionsRemaining = subscription.questionsRemaining;
  const isPremium = subscription.plan === 'premium';
  const isGuest = user.role === 'guest';
  
  // Calculate progress percentage based on plan
  const maxQuestions = isPremium ? 1000 : isGuest ? 3 : 10; // Example limits
  const usedPercentage = ((maxQuestions - questionsRemaining) / maxQuestions) * 100;

  return (
    <GlassMorphicCard 
      className="h-full flex flex-col"
      contentClassName="flex-1 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-lg">Subscription Status</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isPremium 
            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
            : isGuest
              ? 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
        }`}>
          {isPremium ? 'Premium' : isGuest ? 'Guest' : 'Free'}
        </div>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Questions remaining</span>
            <span className="font-medium">{questionsRemaining} / {maxQuestions}</span>
          </div>
          <Progress value={usedPercentage} className="h-2" />
        </div>

        {subscription.expiresAt && (
          <div className="text-sm">
            <span className="text-muted-foreground">Subscription expires:</span>
            <span className="ml-2 font-medium">
              {new Date(subscription.expiresAt).toLocaleDateString()}
            </span>
          </div>
        )}

        {isGuest && (
          <div className="bg-accent/50 rounded-xl p-4 space-y-3 mt-auto">
            <div className="flex items-center space-x-2 font-medium">
              <UserIcon className="h-4 w-4 text-primary" />
              <span>Create an Account</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sign up for a free account to save your questions and get more features.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        )}

        {!isPremium && !isGuest && (
          <div className="bg-accent/50 rounded-xl p-4 space-y-3 mt-auto">
            <div className="flex items-center space-x-2 font-medium">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>Upgrade to Premium</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Get unlimited questions, priority support, and advanced features.
            </p>
            <Button asChild size="sm" className="w-full">
              <Link to="/pricing">
                <CrownIcon className="mr-2 h-4 w-4" /> Upgrade Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </GlassMorphicCard>
  );
};
