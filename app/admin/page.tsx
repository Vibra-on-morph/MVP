'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BarChart3, Users, DollarSign, Shield, TrendingUp, AlertTriangle, Settings, Database } from 'lucide-react';
import { useAuth } from '@/components/providers';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers, mockVideos, mockTransactions } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'rewards' | 'settings'>('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Admin access required.</p>
        </div>
      </div>
    );
  }

  const totalUsers = mockUsers.length;
  const totalVideos = mockVideos.length;
  const totalRewards = mockTransactions
    .filter(tx => tx.type === 'reward')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawals = Math.abs(mockTransactions
    .filter(tx => tx.type === 'withdrawal')
    .reduce((sum, tx) => sum + tx.amount, 0));

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform management and analytics</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-500/20">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'rewards', label: 'Rewards', icon: DollarSign },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === id
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="video-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{formatNumber(totalUsers)}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </Card>

              <Card className="video-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{formatNumber(totalVideos)}</p>
                    <p className="text-sm text-muted-foreground">Total Videos</p>
                  </div>
                </div>
              </Card>

              <Card className="video-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{formatNumber(totalRewards)}</p>
                    <p className="text-sm text-muted-foreground">Rewards Paid</p>
                  </div>
                </div>
              </Card>

              <Card className="video-card p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-400">
                      {formatNumber(mockVideos.reduce((sum, v) => sum + v.views, 0))}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="video-card p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {mockTransactions.slice(0, 5).map((transaction) => {
                  const user = mockUsers.find(u => u.id === transaction.userId);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'reward' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">@{user?.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} VIBRA
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-700">
                Export Users
              </Button>
            </div>

            <Card className="video-card p-6">
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.avatar} 
                        alt={user.username}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{user.username}</p>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="capitalize">{user.role}</span>
                          <span>{formatNumber(user.followers)} followers</span>
                          <span>{user.totalEarned.toLocaleString()} VIBRA earned</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline" className="text-red-400 border-red-500/20 hover:bg-red-500/10">
                        Suspend
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Rewards System</h2>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-700">
                Process Rewards
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="video-card p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {formatNumber(totalRewards)}
                  </div>
                  <p className="text-muted-foreground">Total Rewards Distributed</p>
                </div>
              </Card>

              <Card className="video-card p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {formatNumber(totalWithdrawals)}
                  </div>
                  <p className="text-muted-foreground">Total Withdrawals</p>
                </div>
              </Card>

              <Card className="video-card p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {formatNumber(totalRewards - totalWithdrawals)}
                  </div>
                  <p className="text-muted-foreground">Platform Balance</p>
                </div>
              </Card>
            </div>

            <Card className="video-card p-6">
              <h3 className="text-lg font-semibold mb-4">Reward Configuration</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Like Reward (VIBRA)</label>
                    <input 
                      type="number" 
                      defaultValue="0.1" 
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment Reward (VIBRA)</label>
                    <input 
                      type="number" 
                      defaultValue="0.2" 
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Share Reward (VIBRA)</label>
                    <input 
                      type="number" 
                      defaultValue="0.5" 
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Upload Reward (VIBRA)</label>
                    <input 
                      type="number" 
                      defaultValue="1.0" 
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-purple-500 to-purple-700">
                Update Reward Rates
              </Button>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Settings</h2>

            <div className="grid gap-6">
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">Allow new users to register</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Content Moderation</p>
                      <p className="text-sm text-muted-foreground">Enable automatic content scanning</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reward Distribution</p>
                      <p className="text-sm text-muted-foreground">Automatic daily reward processing</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </Card>

              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-4">Blockchain Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Network</label>
                    <select className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none">
                      <option>Solana Mainnet</option>
                      <option>Ethereum Mainnet</option>
                      <option>Polygon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contract Address</label>
                    <input 
                      type="text" 
                      defaultValue="0x1234567890abcdef1234567890abcdef12345678"
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none font-mono text-sm"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}