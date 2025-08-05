'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, Bell, Shield, Palette, Wallet, Key, Smartphone, Mail } from 'lucide-react';
import { useAuth } from '@/components/providers';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    rewards: true,
    marketing: false,
  });

  if (!user) {
    return <div>Please log in to access settings.</div>;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === id
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-6">Profile Settings</h3>
                
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <Image src={user.avatar} alt={user.username} width={80} height={80} />
                    </Avatar>
                    <div>
                      <Button variant="outline" className="mb-2">
                        Change Avatar
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Username</label>
                      <Input 
                        defaultValue={user.username}
                        className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        defaultValue={user.email}
                        className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea 
                      defaultValue={user.bio}
                      className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none min-h-[100px]"
                      placeholder="Tell people about yourself..."
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Likes and Reactions</p>
                      <p className="text-sm text-muted-foreground">When someone likes your content</p>
                    </div>
                    <Switch 
                      checked={notifications.likes}
                      onCheckedChange={(checked) => setNotifications({...notifications, likes: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Comments</p>
                      <p className="text-sm text-muted-foreground">When someone comments on your videos</p>
                    </div>
                    <Switch 
                      checked={notifications.comments}
                      onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Followers</p>
                      <p className="text-sm text-muted-foreground">When someone follows you</p>
                    </div>
                    <Switch 
                      checked={notifications.follows}
                      onCheckedChange={(checked) => setNotifications({...notifications, follows: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reward Notifications</p>
                      <p className="text-sm text-muted-foreground">Daily reward summaries and payouts</p>
                    </div>
                    <Switch 
                      checked={notifications.rewards}
                      onCheckedChange={(checked) => setNotifications({...notifications, rewards: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing & Updates</p>
                      <p className="text-sm text-muted-foreground">Platform updates and promotional content</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium text-green-400">Account Secured</p>
                        <p className="text-sm text-muted-foreground">
                          Your account has strong security settings enabled
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <Input 
                          type="password"
                          className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input 
                          type="password"
                          className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <Input 
                          type="password"
                          className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                        />
                      </div>
                      <Button variant="outline">Update Password</Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-muted-foreground">Not enabled</p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'wallet' && (
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-6">Wallet Settings</h3>
                
                <div className="space-y-6">
                  {user.walletAddress ? (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Wallet className="w-5 h-5 text-green-400" />
                        <p className="font-medium text-green-400">Wallet Connected</p>
                      </div>
                      <code className="text-sm bg-secondary px-3 py-2 rounded block">
                        {user.walletAddress}
                      </code>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Key className="w-5 h-5 text-yellow-400" />
                        <p className="font-medium text-yellow-400">No Wallet Connected</p>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-700">
                        Connect Wallet
                      </Button>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-4">Withdrawal Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Minimum Withdrawal Amount</label>
                        <Input 
                          type="number"
                          defaultValue="10"
                          className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum 10 VIBRA required for withdrawal
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Auto-Withdrawal Threshold</label>
                        <Input 
                          type="number"
                          defaultValue="100"
                          className="bg-secondary border-secondary-foreground/20 focus:border-purple-400"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Automatically withdraw when balance reaches this amount
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card className="video-card p-6">
                <h3 className="text-lg font-semibold mb-6">Appearance Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Theme</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Currently active</p>
                        </div>
                        <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-secondary-foreground/20 rounded-lg opacity-50">
                        <div>
                          <p className="font-medium">Light Mode</p>
                          <p className="text-sm text-muted-foreground">Coming soon</p>
                        </div>
                        <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Language</h4>
                    <select className="w-full px-3 py-2 bg-secondary border border-secondary-foreground/20 rounded-lg focus:border-purple-400 focus:outline-none">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Display Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show Reward Amounts</p>
                          <p className="text-sm text-muted-foreground">Display earnings on videos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Animated Avatars</p>
                          <p className="text-sm text-muted-foreground">Enable avatar animations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}