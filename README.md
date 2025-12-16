# 💳 WiseCard

> 본 리포지토리는 본 프로젝트의 구성 요소 중 Kakao Map 기반 웹 앱에 해당하는 전체 소스 코드 및 실행 환경을 포함합니다.
> 해당 웹 앱은 WiseCard 모바일 앱 내 WebView 화면에서 사용하기 위한 목적으로 개발되었습니다.

---

## 1. 프로젝트 개요

- **프로젝트 목적**

  - LLM을 활용해 카드별 할인 및 혜택을 분석하고, 사용자 위치 기반 최적의 혜택 매장 및 사용 카드 추천 기능 제공

- **플랫폼**

  - Android

- **개발 기간**

  - 2025.08 ~ 2025.12

- **팀 구성**
  - FE: 1명 / BE: 2명

---

## 2. 기술 스택

### Web App

- Framework: **React (Create React App 기반)**
- Language: **JavaScript (ES6+)**
- Build Tool: **react-scripts**
- Routing: **React Router DOM**
- State Management: **React Hooks (useState, useEffect)**
- Testing: **React Testing Library + Jest**
- Performance Metrics: **web-vitals**

### UI / UX

- UI Components: **React 기본 컴포넌트**
- Styling: **CSS**
- DOM Rendering: **react-dom**

---

## 3. Open Source / External Service 사용 내역

| Name                  | Usage                         | License                 |
| --------------------- | ----------------------------- | ----------------------- |
| React                 | UI framework                  | MIT                     |
| React DOM             | DOM rendering                 | MIT                     |
| React Router DOM      | Client-side routing           | MIT                     |
| Create React App      | Project setup & build tooling | MIT                     |
| react-scripts         | Development / build scripts   | MIT                     |
| React Testing Library | Component testing             | MIT                     |
| Jest DOM              | Custom Jest matchers          | MIT                     |
| User Event            | User interaction testing      | MIT                     |
| web-vitals            | Web performance metrics       | Apache-2.0              |
| Kakao Map API         | Map rendering                 | Kakao Developers Policy |

---

## 4. 실행 및 사용 방법

> 본 문서의 모든 명령어는 **Windows 환경**을 기준으로 작성되었으며, **CMD 또는 PowerShell**에서 실행하는 것을 기준으로 합니다.

### 1. Node.js 설치 확인 (2025-06-24 기준)

최신 버전의 Node.js를 설치합니다.
아래 명령어로 설치된 버전을 확인할 수 있습니다.

```bash
 node -v
  # v22.16.0
 npm -v
  # 10.2.4
```

### 2. 프로젝트 의존성 설치

git clone한 프로젝트 파일의 루트로 이동한 뒤, 아래 명령어를 입력하여 프로젝트 의존성을 설치합니다.

```bash
npm install
```

### 3. 환경 변수 설정

본 프로젝트는 실행을 위해 환경 변수 설정이 필요합니다.

루트 디렉토리에 제공된 `.env.example` 파일을 복사하여 `.env` 파일을 생성한 뒤, 각 항목에 본인의 환경에 맞는 값을 입력합니다.

```bash
copy .env.example .env
```

### 5. 프로젝트 실행하기

```bash
 npm start
```

[http://localhost:3000](http://localhost:3000)에서 실행중인 프로그램을 확인할 수 있습니다.
