'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Flag, User, MessageSquare } from 'lucide-react';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { mockReports, mockVideos, mockComments, mockUsers } from '@/data/mock-data';
import { Report } from '@/types';

export default function ModerationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'reports' | 'flagged' | 'actions'>('reports');
  const [reports, setReports] = useState(mockReports);

  if (!user || (user.role !== 'moderator' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleReportAction = (reportId: string, action: 'resolve' | 'dismiss') => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: action === 'resolve' ? 'resolved' : 'dismissed' }
        : report
    ));
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  const resolvedReports = reports.filter(r => r.status === 'resolved');

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">Moderation Dashboard</h1>
          <p className="text-muted-foreground">Keep the community safe and maintain content quality</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="video-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{pendingReports.length}</p>
                <p className="text-sm text-muted-foreground">Pending Reports</p>
              </div>
            </div>
          </Card>

          <Card className="video-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{resolvedReports.length}</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </Card>

          <Card className="video-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Flag className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">3</p>
                <p className="text-sm text-muted-foreground">Flagged Content</p>
              </div>
            </div>
          </Card>

          <Card className="video-card p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">98.5%</p>
                <p className="text-sm text-muted-foreground">Safety Score</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-500/20">
          {[
            { id: 'reports', label: 'Reports', count: pendingReports.length },
            { id: 'flagged', label: 'Flagged Content', count: 3 },
            { id: 'actions', label: 'Recent Actions', count: resolvedReports.length },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === id
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'reports' && (
            <div className="space-y-4">
              {pendingReports.length === 0 ? (
                <Card className="video-card p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
                  <p className="text-muted-foreground">No pending reports to review.</p>
                </Card>
              ) : (
                pendingReports.map((report) => {
                  const reporter = mockUsers.find(u => u.id === report.reporterId);
                  let content: any = null;
                  
                  if (report.contentType === 'video') {
                    content = mockVideos.find(v => v.id === report.contentId);
                  } else if (report.contentType === 'comment') {
                    content = mockComments.find(c => c.id === report.contentId);
                  }

                  return (
                    <Card key={report.id} className="video-card p-6">
                      <div className="space-y-4">
                        {/* Report Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                              <Flag className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-red-400">{report.reason}</p>
                              <p className="text-sm text-muted-foreground">
                                Reported by @{reporter?.username} • {report.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.contentType === 'video' 
                                ? 'bg-blue-500/20 text-blue-400'
                                : report.contentType === 'comment'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-purple-500/20 text-purple-400'
                            }`}>
                              {report.contentType}
                            </span>
                          </div>
                        </div>

                        {/* Report Description */}
                        <p className="text-muted-foreground">{report.description}</p>

                        {/* Content Preview */}
                        {content && (
                          <div className="bg-secondary/50 rounded-lg p-4">
                            {report.contentType === 'video' && (
                              <div className="flex items-center gap-3">
                                <img 
                                  src={content.thumbnailUrl} 
                                  alt={content.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{content.title}</p>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {content.description}
                                  </p>
                                </div>
                              </div>
                            )}
                            {report.contentType === 'comment' && (
                              <div className="flex items-start gap-3">
                                <MessageSquare className="w-5 h-5 text-muted-foreground mt-1" />
                                <div>
                                  <p className="font-medium">@{content.username}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {content.content}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4 border-t border-secondary">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500/20 text-green-400 hover:bg-green-500/10"
                            onClick={() => handleReportAction(report.id, 'resolve')}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleReportAction(report.id, 'dismiss')}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Dismiss
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Content
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'flagged' && (
            <Card className="video-card p-8 text-center">
              <Flag className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flagged Content</h3>
              <p className="text-muted-foreground">Content flagged by automated systems will appear here.</p>
            </Card>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-4">
              {resolvedReports.map((report) => {
                const reporter = mockUsers.find(u => u.id === report.reporterId);
                return (
                  <Card key={report.id} className="video-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Report Resolved</p>
                          <p className="text-sm text-muted-foreground">
                            {report.reason} • Reported by @{reporter?.username}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-400 font-medium">Resolved</p>
                        <p className="text-xs text-muted-foreground">
                          {report.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}