import { useState } from 'react';

export default function AIRecommendation() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  
  // 질문 응답 상태
  const [answers, setAnswers] = useState({
    // 1단계: 반려동물 정보
    petType: '',
    breed: '',
    age: '',
    gender: '',
    neutered: '',
    
    // 2단계: 건강 상태
    hasDisease: '',
    existingConditions: [],
    geneticRisk: '',
    recentSurgery: '',
    
    // 3단계: 보험 니즈
    concerns: [],
    expectedCost: '',
    monthlyBudget: '',
    
    // 4단계: 라이프스타일
    activityLevel: '',
    indoorOutdoor: '',
    walkFrequency: ''
  });
