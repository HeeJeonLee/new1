# PetCare+ 프로젝트 분석 및 숙지 (2026-02-28)

## 📦 받은 파일 10개 완전 분석

### 1. index.html - 진입점 및 SEO
```
핵심 요소:
- PWA 지원 (manifest, icons)
- SEO 최적화 (메타태그 완벽)
- Google Maps 사전 연결
- Supabase 사전 연결
- Schema.org 마크업
- Open Graph 메타태그

중요 포인트:
→ 모든 외부 API 사전 연결됨
→ 검색엔진 최적화 완료
→ 소셜 미디어 공유 최적화
```

### 2. package.json - 의존성 및 스크립트
```
React 생태계:
- react: 18.2.0
- react-dom: 18.2.0

빌드 도구:
- vite: 5.0.8 (빠른 개발 서버)
- @vitejs/plugin-react: 4.2.1

스타일링:
- tailwindcss: 3.4.0
- postcss: 8.4.32
- autoprefixer: 10.4.16

PWA:
- vite-plugin-pwa: 0.17.4

기타:
- dotenv: 17.3.1

스크립트:
- dev: Vite 개발 서버
- build: 프로덕션 빌드
- api-server: 로컬 API 서버
- dev:full: 프론트+백엔드 동시 실행

주의사항:
→ concurrently 패키지 누락 (dev:full 작동 안 됨)
→ 추가 필요: npm install concurrently
```

### 3. vite.config.js - 빌드 설정
```
플러그인:
1. React 플러그인
2. PWA 플러그인 (자동 업데이트)

프록시 설정:
- /api → http://localhost:3001
- 로컬 개발 시 CORS 문제 해결

PWA 설정:
- 자동 업데이트
- 오프라인 지원
- 테마 컬러: #2563eb (파란색)

중요:
→ 프로덕션에서는 Vercel 서버리스 함수 사용
→ 로컬에서만 api-server.js 사용
```

### 4-5. tailwind.config.js & postcss.config.js
```
TailwindCSS 표준 설정
- 모든 .jsx, .tsx 파일 스캔
- 기본 플러그인
- PostCSS + Autoprefixer

→ 커스터마이징 없음, 순정 설정
```

### 6. vercel.json - 배포 설정
```
빌드:
- buildCommand: npm run build
- installCommand: npm install

환경변수 (Vercel Secrets):
- @resend_api_key
- @petcare_admin_email  
- @petcare_from_email
- @google_maps_api_key

서버리스 함수 설정:
- 메모리: 1024MB
- 최대 실행 시간: 10초

중요:
→ Vercel에서 이 4개 환경변수 필수 설정
→ Functions 폴더: api/**/*.js
```

### 7. .env.example - 환경변수 템플릿
```
필수 API 키:
1. VITE_ANTHROPIC_API_KEY - Claude AI
2. VITE_SUPABASE_URL - 데이터베이스
3. VITE_SUPABASE_ANON_KEY - DB 접근
4. RESEND_API_KEY - 이메일 발송
5. VITE_GOOGLE_MAPS_API_KEY - 지도

상담사 정보:
- 이희천 (251220019)
- 010-5650-0670
- hejunl@hanmail.net

회사 정보:
- 수인AI브릿지
- 사업자: 151-09-03201
- 수원시 팔달구

기능 토글:
- Analytics: 활성화
- Content Generation: 비활성화 (기본)
- Auto Insurance Update: 활성화

중요:
→ VITE_ 접두사: 클라이언트에서 접근 가능
→ 접두사 없음: 서버에서만 접근 (보안)
```

### 8. src/index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;

→ TailwindCSS 기본 설정만
→ 커스텀 CSS 없음
```

### 9. src/main.jsx - React 진입점
```
핵심 기능:
1. Google Maps API 동적 로드
   - API 키 확인
   - 이미 로드되었는지 확인
   - async + defer 로딩
   - 한글(ko), 한국(KR) 설정
   - places 라이브러리 포함

2. React 앱 마운트
   - StrictMode 사용
   - #root에 마운트

중요 포인트:
→ Google Maps는 필요할 때만 로드
→ API 키 없으면 로드 안 함
→ 중복 로드 방지
```

### 10. src/utils/analytics.js - 사용자 추적
```
클래스: AnalyticsManager

추적 항목:
1. pageView - 페이지 뷰
2. click - 클릭 (버튼, 링크)
3. conversion - 전환 (상담 신청 등)
4. scrollDepth - 스크롤 깊이

세션 데이터:
- 시작 시간
- 페이지 뷰 수
- 클릭 수
- 스크롤 깊이
- 체류 시간
- 디바이스 정보
- 전환 수

배치 처리:
- 이벤트 10개 쌓이면 전송
- 또는 30초마다 전송
- /api/analytics 엔드포인트

자동 이벤트 리스너:
- 클릭 자동 감지
- 스크롤 자동 감지
- 시간 자동 측정

활성화 조건:
→ VITE_ANALYTICS_ENABLED=true

중요:
→ 백엔드에 /api/analytics 엔드포인트 필요
→ Supabase에 analytics 테이블 필요
→ 개인정보 최소 수집 (GDPR 고려)
```

## 🎯 프로젝트 구조 파악

```
PetCare+ 아키텍처:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend (React + Vite):
→ TailwindCSS 스타일링
→ PWA 지원
→ Google Maps 통합
→ Analytics 자동 수집

Backend (Vercel Serverless):
→ Resend API (이메일)
→ Claude API (AI 상담)
→ Supabase (데이터베이스)

배포:
→ Vercel (자동 배포)
→ GitHub (소스 관리)
```

## ⚠️ 잠재적 문제점

### 1. 누락된 의존성
```
package.json에 없음:
- concurrently (dev:full 스크립트용)

해결:
npm install concurrently --save-dev
```

### 2. 환경변수 의존성
```
필수 API 키 5개 없으면:
- 앱이 작동 안 할 수 있음
- 각 기능별로 에러 처리 필요

확인 필요:
→ API 키 없을 때 graceful degradation
```

### 3. Analytics 백엔드
```
analytics.js는 /api/analytics 호출
→ 이 엔드포인트 구현 필요
→ Supabase 테이블 필요

확인 필요:
→ api-server.js에 구현되어 있는지
```

## 📚 학습 완료 체크리스트

✅ 프로젝트 구조 이해
✅ 빌드 프로세스 이해  
✅ 환경변수 요구사항 파악
✅ API 의존성 파악
✅ 배포 설정 이해
✅ PWA 설정 이해
✅ Analytics 작동 방식 이해
✅ 잠재적 문제점 파악

## 🔜 다음 단계 (나머지 10개 파일 받으면)

1. App.jsx 분석 → 라우팅, 레이아웃 파악
2. 컴포넌트들 분석 → 기능, 의존성 파악
3. API 파일 분석 → 서버리스 함수 구현 확인
4. contentGenerator 분석 → 자동화 로직 파악
5. insuranceDataManager 분석 → 데이터 구조 파악

6. 모든 파일 통합 검증:
   - import/export 체크
   - 타입 체크
   - 환경변수 체크
   - API 엔드포인트 체크

7. ZIP 파일 생성
8. 업로드 가이드 작성
9. 배포 체크리스트 작성

## 💪 준비 완료!

10개 파일 완전히 숙지했습니다!
나머지 10개 파일 받는 즉시 통합 분석하고
완벽한 ZIP 파일 제공하겠습니다!
