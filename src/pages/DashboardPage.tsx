
import React from 'react';
import { QuestionPanel } from '../components/dashboard/QuestionPanel';
import { StatusDisplay } from '../components/dashboard/StatusDisplay';
import { HistoryList } from '../components/dashboard/HistoryList';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-7rem)]">
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          <h1 className="text-2xl font-bold mb-4 animate-fade-in">Ask a Question</h1>
          <div className="flex-1">
            <QuestionPanel />
          </div>
        </div>
        
        <div className="space-y-6 animate-fade-in animation-delay-200">
          <StatusDisplay />
          <HistoryList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
