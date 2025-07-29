'use client';

import { useState } from 'react';
import { Play, Zap, Shield, TrendingUp, Users, Wallet } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { Button } from '@/components/ui/button';

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold font-orbitron mb-6">
              <span className="gradient-text">VIBRA</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Create. Engage. Earn. The first crypto-native short-form video platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-4 text-lg neon-glow"
              onClick={() => setShowAuth(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Earning
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore Videos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Rewards Paid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">500K+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">10M+</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">50M+</div>
              <div className="text-sm text-muted-foreground">Views Daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Why Choose Vibra?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="video-card p-8 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Earn While You Create</h3>
              <p className="text-muted-foreground">
                Get crypto rewards for every like, comment, and share. Your engagement directly translates to earnings.
              </p>
            </div>
            
            <div className="video-card p-8 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Decentralized & Safe</h3>
              <p className="text-muted-foreground">
                Built on blockchain technology with community moderation and transparent reward distribution.
              </p>
            </div>
            
            <div className="video-card p-8 text-center">
              <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Creator-First Platform</h3>
              <p className="text-muted-foreground">
                Fair monetization, instant payouts, and tools designed to help creators succeed and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 gradient-text">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Create & Upload</h3>
              <p className="text-muted-foreground">
                Share your short-form videos and connect with your audience
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Engage & Grow</h3>
              <p className="text-muted-foreground">
                Get likes, comments, and shares from the community
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Receive crypto rewards and withdraw to your wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 bg-gradient-to-r from-purple-900/20 to-purple-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators already earning crypto on Vibra
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-12 py-4 text-xl neon-glow"
            onClick={() => setShowAuth(true)}
          >
            <Wallet className="w-6 h-6 mr-2" />
            Join Vibra Now
          </Button>
        </div>
      </section>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}