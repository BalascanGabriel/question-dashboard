
import { useCallback, useState } from 'react';
import { questionsAPI } from '../services/api';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

interface Question {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface PaginatedHistory {
  questions: Question[];
  total: number;
  page: number;
  totalPages: number;
}

export function useQuestions() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [history, setHistory] = useState<PaginatedHistory>({
    questions: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const { user } = useAuth();

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) {
      toast.error('Question cannot be empty');
      return;
    }
    
    if (user?.subscription.questionsRemaining === 0) {
      toast.error('You have reached your question limit. Please upgrade your plan.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await questionsAPI.askQuestion(question);
      setCurrentQuestion(response);
      
      // Update history with the new question
      setHistory(prev => ({
        ...prev,
        questions: [response, ...prev.questions],
        total: prev.total + 1,
      }));

      return response;
    } catch (error) {
      console.error('Error asking question:', error);
      // Error is handled by the API interceptor
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user?.subscription.questionsRemaining]);

  const fetchHistory = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);

    try {
      const response = await questionsAPI.getHistory(page, limit);
      setHistory(response);
      return response;
    } catch (error) {
      console.error('Error fetching question history:', error);
      // Error is handled by the API interceptor
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    currentQuestion,
    history,
    askQuestion,
    fetchHistory,
  };
}
