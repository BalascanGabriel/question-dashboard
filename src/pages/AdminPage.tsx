
import React from 'react';
import { GlassMorphicCard } from '../components/common/GlassMorphicCard';

// This is a placeholder for the admin page.
// In a full implementation, you would create detailed admin components
// such as UserList, LogsViewer, ChartDisplay, etc.

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 animate-fade-in">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 animate-fade-in animation-delay-200">
        <GlassMorphicCard title="Total Users" className="h-32">
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl font-bold">256</span>
          </div>
        </GlassMorphicCard>
        
        <GlassMorphicCard title="Questions Today" className="h-32">
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl font-bold">128</span>
          </div>
        </GlassMorphicCard>
        
        <GlassMorphicCard title="Active Subscriptions" className="h-32">
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl font-bold">64</span>
          </div>
        </GlassMorphicCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-300">
        <GlassMorphicCard title="Users" className="lg:col-span-2 h-96">
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">User management table will be displayed here</p>
          </div>
        </GlassMorphicCard>
        
        <GlassMorphicCard title="Security Logs" className="h-96">
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Security logs will be displayed here</p>
          </div>
        </GlassMorphicCard>
      </div>
    </div>
  );
};

export default AdminPage;
