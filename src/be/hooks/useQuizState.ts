// KHONG SUA KHI DOI GAME
import { useState, useCallback, useMemo, useEffect } from "react";
import { useQuizAPI } from "./useQuizAPI";
import { sampleQuestions } from "@/fe/theme/mockQuestions";
import { FIXED_TOTAL_QUESTIONS } from "@/fe/theme";
import { QuizAnswer } from "@/be/types";

interface UseQuizStateOptions {
  onAnswerCorrect?: (data: { currentQuestionIndex: number }) => void;
  onAnswerIncorrect?: () => void;
  customQuestions?: any[] | null;
}

export function useQuizState(options: UseQuizStateOptions = {}) {
  const { onAnswerCorrect, onAnswerIncorrect, customQuestions } = options;

  const isSampleMode = useMemo(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('sample') === 'true';
    }
    return false;
  }, []);

  const apiGame = useQuizAPI({
    onAnswerCorrect: (data) => {
      onAnswerCorrect?.(data);
    },
    onAnswerIncorrect: () => {
      onAnswerIncorrect?.();
    }
  });

  const [sampleIndex, setSampleIndex] = useState(0);
  const [sampleSelectedAnswer, setSampleSelectedAnswer] = useState<QuizAnswer | null>(null);
  const [sampleAnswers, setSampleAnswers] = useState<(boolean | null)[]>([]);
  const [sampleHasSubmitted, setSampleHasSubmitted] = useState(false);
  const [sampleIsCompleted, setSampleIsCompleted] = useState(false);
  const [sampleCurrentResult, setSampleCurrentResult] = useState<{ isCorrect: boolean; correctAnswerId?: number } | null>(null);
  const [sampleCorrectCount, setSampleCorrectCount] = useState(0);
  const [iframeUsername, setIframeUsername] = useState<string | null>(null);
  const [hasApiInit, setHasApiInit] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event?.data;
      if (!data || data.type !== 'INIT') return;
      setHasApiInit(true);
      const rawUsername = data?.payload?.username;
      if (typeof rawUsername === 'string' && rawUsername.trim()) {
        setIframeUsername(rawUsername.trim());
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const hasCustomQuestions = !!(customQuestions && customQuestions.length > 0);
  const shouldUseCustomQuestions = !isSampleMode && !hasApiInit && hasCustomQuestions && !apiGame.quiz;
  const isLocalMode = isSampleMode || shouldUseCustomQuestions;

  const effectiveQuestionsRaw = useMemo(() => {
    if (isSampleMode) {
      return sampleQuestions.map((q, idx) => ({
        id: idx + 1,
        text: q.question,
        answers: q.answers.map((ans, aIdx) => ({ id: aIdx + 1, content: ans })),
        correctIndex: q.correctIndex ?? 0,
        audioUrl: (q as any).audioUrl
      }));
    }
    if (shouldUseCustomQuestions) return customQuestions ?? [];
    return apiGame.quiz ? [apiGame.quiz] : [];
  }, [isSampleMode, shouldUseCustomQuestions, customQuestions, apiGame.quiz]);

  const rawCurrentQuestion = useMemo(() => {
    if (isLocalMode) {
      return effectiveQuestionsRaw[sampleIndex];
    }
    return apiGame.quiz;
  }, [isLocalMode, effectiveQuestionsRaw, sampleIndex, apiGame.quiz]);

  const currentQuestion = useMemo(() => {
    if (!rawCurrentQuestion) return null;

    const quizText = rawCurrentQuestion.text || rawCurrentQuestion.content || rawCurrentQuestion.question || '';
    const quizAudioUrl = rawCurrentQuestion.audioUrl || rawCurrentQuestion.audio_url || rawCurrentQuestion.imageUrl;

    const rawAnswers = rawCurrentQuestion.answers || rawCurrentQuestion.quiz_possible_options || [];
    const normalizedAnswers = rawAnswers.map((a: any, idx: number) => {
      if (typeof a === 'string') return { id: idx + 1, content: a };
      return {
        id: a.id || idx + 1,
        content: a.content || a.text || a.option_value || ''
      };
    });

    let correctIdx = -1;

    const relevantResult = isLocalMode ? sampleCurrentResult : apiGame.currentResult;
    const selectedObj = isLocalMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

    if (relevantResult?.isCorrect && selectedObj) {
      correctIdx = normalizedAnswers.findIndex((a: any) =>
        String(a.id) === String(selectedObj.id) ||
        a.content === selectedObj.content
      );
    }

    if (correctIdx === -1) {
      const rawCorrectIndex = rawCurrentQuestion.correctIndex;
      if (typeof rawCorrectIndex === 'number' && rawCorrectIndex >= 0 && rawCorrectIndex < normalizedAnswers.length) {
        correctIdx = rawCorrectIndex;
      }
    }

    if (correctIdx === -1) {
      let targetCorrectId: any = undefined;

      if (relevantResult?.correctAnswerId !== undefined) {
        targetCorrectId = relevantResult.correctAnswerId;
      } else if (rawCurrentQuestion.correctAnswerId !== undefined) {
        targetCorrectId = rawCurrentQuestion.correctAnswerId;
      }

      if (targetCorrectId !== undefined) {
        correctIdx = normalizedAnswers.findIndex((a: any) =>
          String(a.id) === String(targetCorrectId) ||
          a.content === targetCorrectId
        );
      }
    }

    return {
      text: quizText,
      audioUrl: quizAudioUrl,
      answers: normalizedAnswers,
      correctIndex: correctIdx,
      _raw: rawCurrentQuestion
    };
  }, [rawCurrentQuestion, isLocalMode, sampleCurrentResult, apiGame.currentResult, sampleSelectedAnswer, apiGame.selectedAnswer]);

  const isLoading = isLocalMode ? !rawCurrentQuestion : (!apiGame.quiz && !apiGame.isCompleted);
  const isAnswered = isLocalMode ? sampleHasSubmitted : apiGame.hasSubmitted;
  const isCompleted = isLocalMode ? sampleIsCompleted : apiGame.isCompleted;

  const selectedAnswerObj = isLocalMode ? sampleSelectedAnswer : apiGame.selectedAnswer;

  const history = isLocalMode ? sampleAnswers : (apiGame.answers ?? []);

  const correctCount = isLocalMode ? sampleCorrectCount : (apiGame.correctCount ?? 0);

  const handleAnswerSelect = useCallback((answer: QuizAnswer) => {
    if (isAnswered) return;

    if (isLocalMode) {
      setSampleSelectedAnswer(answer);
    } else {
      apiGame.handleAnswerSelect(answer);
    }
  }, [isAnswered, isLocalMode, apiGame]);

  const updateAnswer = useCallback(() => {
    if (isLocalMode) {
      if (!sampleSelectedAnswer || !currentQuestion) return;

      const rawCorrectIndex = currentQuestion._raw.correctIndex;
      const rawCorrectAnswerId = currentQuestion._raw.correctAnswerId;
      let isCorrect = false;

      if (typeof rawCorrectIndex === 'number') {
        const selectedIdx = currentQuestion.answers.findIndex((a: any) => a.id === sampleSelectedAnswer.id);
        isCorrect = selectedIdx === rawCorrectIndex;
      } else if (rawCorrectAnswerId !== undefined) {
        isCorrect = String(sampleSelectedAnswer.id) === String(rawCorrectAnswerId);
      }

      const nextAnswers = [...sampleAnswers];
      nextAnswers[sampleIndex] = isCorrect;
      setSampleAnswers(nextAnswers);

      setSampleCurrentResult({
        isCorrect,
        correctAnswerId: rawCorrectAnswerId !== undefined ? rawCorrectAnswerId : undefined
      });
      setSampleHasSubmitted(true);

      if (isCorrect) {
        setSampleCorrectCount(prev => prev + 1);
        options.onAnswerCorrect?.({ currentQuestionIndex: sampleIndex });
      } else {
        options.onAnswerIncorrect?.();
      }

    } else {
      apiGame.updateAnswer();
    }
  }, [isLocalMode, sampleSelectedAnswer, currentQuestion, sampleIndex, sampleAnswers, apiGame, options]);

  const handleContinue = useCallback(() => {
    if (isLocalMode) {
      const nextIdx = sampleIndex + 1;
      if (nextIdx >= FIXED_TOTAL_QUESTIONS) {
        setSampleIsCompleted(true);
      } else {
        setSampleIndex(nextIdx);
        setSampleSelectedAnswer(null);
        setSampleHasSubmitted(false);
        setSampleCurrentResult(null);
      }
    } else {
      apiGame.handleContinue();
    }
  }, [isLocalMode, sampleIndex, apiGame]);

  const finish = useCallback(() => {
    apiGame.finish();
  }, [apiGame]);

  const restart = useCallback(() => {
    setSampleIndex(0);
    setSampleSelectedAnswer(null);
    setSampleAnswers([]);
    setSampleHasSubmitted(false);
    setSampleIsCompleted(false);
    setSampleCurrentResult(null);
    setSampleCorrectCount(0);
  }, []);

  return {
    quiz: currentQuestion,
    selectedAnswer: selectedAnswerObj,
    currentResult: isLocalMode ? sampleCurrentResult : apiGame.currentResult,
    answers: history,
    correctCount,
    currentQuestionIndex: isLocalMode ? sampleIndex : (apiGame.currentQuestionIndex || 0),
    isSubmitting: isLoading,
    hasSubmitted: isAnswered,
    isCompleted,
    totalQuestions: FIXED_TOTAL_QUESTIONS,
    username: (apiGame as { username?: string | null }).username ?? iframeUsername,

    handleAnswerSelect,
    updateAnswer,
    handleContinue,
    finish,
    restart,

    isSampleMode
  };
}
