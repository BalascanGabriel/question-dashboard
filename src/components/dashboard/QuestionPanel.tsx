
import React, { useState, useRef, useEffect } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { GlassMorphicCard } from '../common/GlassMorphicCard';

export const QuestionPanel: React.FC = () => {
  const { askQuestion, isLoading, currentQuestion } = useQuestions();
  const [question, setQuestion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom of response when content changes
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [currentQuestion?.answer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsSending(true);
    await askQuestion(question);
    setQuestion('');
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  return (
    <GlassMorphicCard 
      className="h-full flex flex-col"
      contentClassName="flex-1 flex flex-col p-0"
    >
      <div className="flex-1 overflow-auto p-6" ref={responseRef}>
        {currentQuestion ? (
          <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-xl">
              <p className="text-sm font-medium text-primary mb-2">Your question:</p>
              <p className="text-foreground">{currentQuestion.question}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Response:</p>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {currentQuestion.answer}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-6">
            <div className="max-w-md space-y-4 animate-float">
              <h3 className="text-xl font-medium">Ask your first question</h3>
              <p className="text-muted-foreground">
                Type your question below and hit send to get an instant answer from our AI.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/40 p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[50px] max-h-[200px] resize-none pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-1 right-1 h-8 w-8"
              disabled={isLoading || !question.trim()}
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </GlassMorphicCard>
  );
};
