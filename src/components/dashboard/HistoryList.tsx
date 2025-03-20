
import React, { useEffect } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { GlassMorphicCard } from '../common/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Loader2, MessageCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

export const HistoryList: React.FC = () => {
  const { history, fetchHistory, isLoading } = useQuestions();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleRefresh = () => {
    fetchHistory();
  };

  return (
    <GlassMorphicCard 
      title={
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Question History</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={isLoading}
            className="h-8 w-8"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      }
      className="h-full"
      contentClassName="p-0"
    >
      {isLoading && history.questions.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : history.questions.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center p-6 text-center">
          <MessageCircle className="h-10 w-10 text-muted-foreground/60 mb-4" />
          <h4 className="text-lg font-medium mb-2">No questions yet</h4>
          <p className="text-sm text-muted-foreground">
            Your question history will appear here once you start asking questions.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border/40">
          {history.questions.map((item) => (
            <li key={item.id} className="hover:bg-accent/30 transition-colors">
              <button
                className="w-full text-left p-4 block"
                // You can add functionality to show the full question and answer
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm font-medium line-clamp-1">{item.question}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(item.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {item.answer.substring(0, 100)}...
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {history.totalPages > 1 && (
        <div className="p-4 border-t border-border/40 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Page {history.page} of {history.totalPages}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={history.page === 1 || isLoading}
              onClick={() => fetchHistory(history.page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={history.page === history.totalPages || isLoading}
              onClick={() => fetchHistory(history.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </GlassMorphicCard>
  );
};
