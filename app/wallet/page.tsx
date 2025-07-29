'use client';

import { useState } from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink } from 'lucide-react';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockTransactions } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

export default function WalletPage() {
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  if (!user) {
    return <div>Please log in to view your wallet.</div>;
  }

  const userTransactions = mockTransactions.filter(tx => tx.userId === user.id);
  const pendingRewards = 45.75; // Mock pending rewards

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    // Mock withdrawal process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Withdrawing:', withdrawAmount);
    setIsWithdrawing(false);
    setWithdrawAmount('');
  };

  const copyAddress = () => {
    if (user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Wallet Dashboard</h1>
          <p className="text-muted-foreground">Manage your crypto earnings and withdrawals</p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="video-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-green-400">
                  {user.walletBalance.toLocaleString()} VIBRA
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(user.walletBalance * 0.85).toLocaleString()} USD
            </p>
          </Card>

          <Card className="video-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Rewards</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {pendingRewards.toLocaleString()} VIBRA
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Processing • Available in 24h
            </p>
          </Card>

          <Card className="video-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-purple-400">
                  {user.totalEarned.toLocaleString()} VIBRA
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              All-time earnings
            </p>
          </Card>
        </div>

        {/* Wallet Address */}
        {user.walletAddress && (
          <Card className="video-card p-6">
            <h3 className="text-lg font-semibold mb-4">Connected Wallet</h3>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <code className="flex-1 text-sm font-mono">
                {user.walletAddress}
              </code>
              <Button
                onClick={copyAddress}
                size="sm"
                variant="ghost"
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Withdrawal Section */}
        <Card className="video-card p-6">
          <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (VIBRA)</label>
              <Input
                type="number"
                placeholder="Enter amount to withdraw"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum: 10 VIBRA • Fee: 2 VIBRA
              </p>
            </div>
            
            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) < 10 || isWithdrawing}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            >
              {isWithdrawing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <ArrowUpRight className="w-4 h-4 mr-2" />
              )}
              {isWithdrawing ? 'Processing...' : 'Withdraw to Wallet'}
            </Button>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="video-card p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          <div className="space-y-4">
            {userTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No transactions yet. Start creating content to earn rewards!
              </p>
            ) : (
              userTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'reward' 
                        ? 'bg-green-500/20 text-green-400'
                        : transaction.type === 'withdrawal'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {transaction.type === 'reward' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : transaction.type === 'withdrawal' ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} VIBRA
                    </p>
                    <p className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}