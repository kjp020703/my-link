"use client";

import { useState } from "react";
import {
  Sparkles,
  Zap,
  Atom,
  Cpu,
  Layers,
  Flame,
  Activity,
  Award,
  BookOpen,
  Mail,
  FileText,
  Copy,
  Check,
  Heart,
  ChevronRight,
  ExternalLink,
  Target,
  BarChart3,
  Microscope,
  ShieldCheck,
  TrendingUp,
  Globe,
  Building2,
} from "lucide-react";

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28M5.07 18.5h2.79v-8.37H5.07v8.37Z" />
    </svg>
  );
}

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function NeobrutalismProfilePage() {
  const [activeTab, setActiveTab] = useState<"process" | "projects" | "education" | "trends" | "links">("process");
  const [copied, setCopied] = useState(false);
  const [cheerCount, setCheerCount] = useState(78);
  const [cheered, setCheered] = useState(false);

  const email = "contact@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheer = () => {
    if (!cheered) {
      setCheerCount((prev) => prev + 1);
      setCheered(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] bg-dot-pattern text-black selection:bg-[#FFE600] selection:text-black">
      {/* 🚀 상단 무한 롤링 티커 (Marquee Banner) */}
      <div className="overflow-hidden border-b-4 border-black bg-[#FFE600] py-2.5 font-mono text-xs font-black tracking-widest uppercase">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 fill-black" /> 2026 SEMICONDUCTOR PROCESS ENGINEER CANDIDATE
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Microscope className="h-4 w-4" /> SPECIALIZED IN ETCH & THIN-FILM (CVD/ALD)
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> AI SEMICONDUCTOR & HBM ADVANCED PROCESS INSIGHT
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> DATA-DRIVEN YIELD MAXIMIZATION & DEFECT CONTROL
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 fill-black" /> FAB-READY PROCESS TECH ENGINEER: KIM JAE-PYO
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 fill-black" /> 2026 SEMICONDUCTOR PROCESS ENGINEER CANDIDATE
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Microscope className="h-4 w-4" /> SPECIALIZED IN ETCH & THIN-FILM (CVD/ALD)
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> AI SEMICONDUCTOR & HBM ADVANCED PROCESS INSIGHT
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> DATA-DRIVEN YIELD MAXIMIZATION & DEFECT CONTROL
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 fill-black" /> FAB-READY PROCESS TECH ENGINEER: KIM JAE-PYO
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 🏷️ 탑 네비게이션 / 헤더 바 */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-4 border-black bg-white p-4 shadow-[5px_5px_0px_0px_#000]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#54D7FF] font-black shadow-[2px_2px_0px_0px_#000]">
              JP
            </div>
            <div>
              <div className="font-mono text-xs font-bold tracking-wider text-zinc-600 uppercase">
                PORTFOLIO & PROFILE
              </div>
              <div className="text-lg font-black tracking-tight">KIM JAE-PYO</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-black bg-[#70FFAF] px-3 py-1 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-700" />
              STATUS: OPEN FOR WORK
            </span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 border-2 border-black bg-[#FF729F] px-3 py-1 text-xs font-black text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "이메일 복사완료!" : "이메일 복사"}
            </button>
          </div>
        </header>

        {/* 🟨 메인 히어로 프로필 카드 (Main Hero Profile Card) */}
        <section className="relative mb-10 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] sm:p-8">
          {/* 스티커 데코레이션 */}
          <div className="absolute -top-4 -right-3 rotate-6 border-2 border-black bg-[#FFE600] px-3 py-1 font-mono text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_0px_#000]">
            ⚡ PROCESS ENG
          </div>
          <div className="absolute -bottom-3 -left-3 -rotate-3 border-2 border-black bg-[#54D7FF] px-3 py-1 font-mono text-xs font-black shadow-[3px_3px_0px_0px_#000]">
            🔬 8대 공정 SPEC
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* 좌측: 아바타 & 퀵 스탯 */}
            <div className="flex flex-col items-center text-center md:col-span-4 md:border-r-4 md:border-black md:pr-8">
              <div className="relative mb-5">
                <div className="flex h-32 w-32 items-center justify-center border-4 border-black bg-[#FFE600] text-5xl font-black text-black shadow-[6px_6px_0px_0px_#000]">
                  JP
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center border-2 border-black bg-[#70FFAF] text-black shadow-[2px_2px_0px_0px_#000]">
                  <Atom className="h-6 w-6 animate-spin" style={{ animationDuration: "10s" }} />
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-black sm:text-4xl">
                김재표
              </h1>
              <p className="mt-1 font-mono text-xs font-bold text-zinc-600 uppercase">
                Kim Jae-Pyo / Process Engineer
              </p>

              {/* 직무 뱃지 */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="border-2 border-black bg-[#FFE600] px-2.5 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                  💼 취업준비생
                </span>
                <span className="border-2 border-black bg-[#54D7FF] px-2.5 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                  🔬 반도체 공정기술
                </span>
                <span className="border-2 border-black bg-[#D4B2FF] px-2.5 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                  ⚡ Yield & Defect
                </span>
              </div>

              {/* 응원하기 인터랙션 버튼 */}
              <button
                onClick={handleCheer}
                className="mt-6 flex w-full items-center justify-center gap-2 border-3 border-black bg-[#FFF0F5] px-4 py-2.5 text-sm font-black text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFE4EE] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <Heart className={`h-4 w-4 ${cheered ? "fill-[#FF729F] text-[#FF729F]" : "text-black"}`} />
                <span>합격 응원하기 ({cheerCount})</span>
              </button>
            </div>

            {/* 우측: 핵심 비전 & 포지셔닝 */}
            <div className="flex flex-col justify-between md:col-span-8">
              <div>
                <div className="inline-block border-2 border-black bg-black px-3 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_0px_#FFE600]">
                  CORE STATEMENT
                </div>
                <h2 className="mt-3 text-2xl font-black leading-snug tracking-tight sm:text-3xl">
                  "공정 변수 최적화와 결함 제어로{" "}
                  <span className="bg-[#FFE600] px-1.5 py-0.5 border-b-3 border-black">수율의 한계</span>를 돌파하는
                  엔지니어"
                </h2>

                <p className="mt-4 text-base font-medium leading-relaxed text-zinc-800">
                  반도체 8대 공정과 소자 물성에 대한 탄탄한 이해를 바탕으로, 미세화에 따른 공정 산포와 불량 메커니즘을
                  통계적 데이터로 분석합니다. <strong>식각(Etch)</strong> 및 <strong>박막(Thin-film CVD/ALD)</strong>{" "}
                  공정의 정밀 제어를 통해 Fab 현장에서 최고의 생산성과 양산 수율을 달성하는 공정기술 엔지니어가
                  되겠습니다.
                </p>
              </div>

              {/* 4분할 퀵 팩트 박스 (Mini Bento Grid) */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="border-2 border-black bg-[#F8F9FA] p-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase">희망 직무</div>
                  <div className="mt-1 text-sm font-black text-black">공정기술 (PE)</div>
                </div>
                <div className="border-2 border-black bg-[#54D7FF]/20 p-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase">핵심 공정</div>
                  <div className="mt-1 text-sm font-black text-black">Etch & CVD/ALD</div>
                </div>
                <div className="border-2 border-black bg-[#FFE600]/30 p-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase">분석 역량</div>
                  <div className="mt-1 text-sm font-black text-black">DOE / 통계 분석</div>
                </div>
                <div className="border-2 border-black bg-[#70FFAF]/30 p-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase">목표 가치</div>
                  <div className="mt-1 text-sm font-black text-black">수율(Yield) 극대화</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🗂️ 탭 네비게이션 (Interactive Neo-Brutalist Tabs) */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab("process")}
            className={`flex items-center gap-2 border-3 border-black px-4 py-2.5 text-sm font-black tracking-tight transition-all cursor-pointer ${
              activeTab === "process"
                ? "bg-[#FFE600] shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                : "bg-white hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000]"
            }`}
          >
            <Microscope className="h-4 w-4" />
            <span>8대 공정 & 직무 역량</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 border-3 border-black px-4 py-2.5 text-sm font-black tracking-tight transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#54D7FF] shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                : "bg-white hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000]"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>프로젝트 & 실습 경험</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 border-3 border-black px-4 py-2.5 text-sm font-black tracking-tight transition-all cursor-pointer ${
              activeTab === "education"
                ? "bg-[#70FFAF] shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                : "bg-white hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000]"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>학술 & 교육 이수</span>
          </button>

          <button
            onClick={() => setActiveTab("trends")}
            className={`flex items-center gap-2 border-3 border-black px-4 py-2.5 text-sm font-black tracking-tight transition-all cursor-pointer ${
              activeTab === "trends"
                ? "bg-[#FF9F43] text-black shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                : "bg-white hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000]"
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>산업 동향 & 시장 흐름</span>
          </button>

          <button
            onClick={() => setActiveTab("links")}
            className={`flex items-center gap-2 border-3 border-black px-4 py-2.5 text-sm font-black tracking-tight transition-all cursor-pointer ${
              activeTab === "links"
                ? "bg-[#FF729F] text-white shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                : "bg-white hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000]"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>연락처 & 링크</span>
          </button>
        </div>

        {/* 📦 탭 콘텐츠 영역 (Tab Contents) */}
        <div className="min-h-[420px]">
          {/* 1. 8대 공정 & 직무 역량 탭 */}
          {activeTab === "process" && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* 식각 공정 */}
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-black bg-[#FFE600] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                      <Flame className="h-5 w-5 text-black" />
                    </div>
                    <h3 className="text-lg font-black">식각 공정 (Etching)</h3>
                  </div>
                  <span className="border-2 border-black bg-black px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    PRIMARY
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>Dry Etch 메커니즘:</strong> ICP/CCP 플라즈마 소스 특성 및 이온/라디칼 반응 제어</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>프로파일 최적화:</strong> Anisotropic 비등방 식각, Selectivity 및 마이크로 로딩 효과 완화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>이슈 해결:</strong> ARDE(종횡비 의존 식각) 불량 및 잔여물(Residue) 제어</span>
                  </li>
                </ul>
              </div>

              {/* 박막 증착 공정 */}
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-black bg-[#54D7FF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                      <Layers className="h-5 w-5 text-black" />
                    </div>
                    <h3 className="text-lg font-black">박막 증착 (Thin Film)</h3>
                  </div>
                  <span className="border-2 border-black bg-black px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    PRIMARY
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>ALD 자기제한반응:</strong> 원자층 단위의 두께 제어 및 우수한 Step Coverage 확보</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>CVD & PVD:</strong> 박막 균일도(Uniformity), 부착력(Adhesion) 및 박막 스트레스 저감</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>High-k & Metal Gate:</strong> EOT 감소 및 누설 전류 방지를 위한 박막 물성 이해</span>
                  </li>
                </ul>
              </div>

              {/* 포토 & 산화/확산 */}
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-black bg-[#D4B2FF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                      <Sparkles className="h-5 w-5 text-black" />
                    </div>
                    <h3 className="text-lg font-black">포토 & 산화/확산</h3>
                  </div>
                  <span className="border-2 border-black bg-zinc-200 px-2 py-0.5 font-mono text-[11px] font-bold text-black">
                    CORE
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>Photolithography:</strong> DUV/EUV 노광 원리, Overlay 마진 및 CD Uniformity 관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>열산화 (Thermal Oxidation):</strong> Deal-Grove 모델 기반 게이트/필드 산화막 성장 제어</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>이온 주입 (Ion Implantation):</strong> Channel Doping 프로파일 및 열처리(Annealing) 결함 복구</span>
                  </li>
                </ul>
              </div>

              {/* 수율 분석 & 공정 데이터 */}
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-black bg-[#70FFAF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                      <Activity className="h-5 w-5 text-black" />
                    </div>
                    <h3 className="text-lg font-black">수율 분석 & 통계 (Yield/Data)</h3>
                  </div>
                  <span className="border-2 border-black bg-zinc-200 px-2 py-0.5 font-mono text-[11px] font-bold text-black">
                    DATA
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>DOE 실험계획법:</strong> 반응표면분석 및 다변량 공정 인자 상관관계 규명</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>통계적 공정 관리(SPC):</strong> Cp/Cpk 관리도 분석 및 공정 산포 이상 감지</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black">▪</span>
                    <span><strong>결함 분석 (Defect/FA):</strong> SEM, TEM, EDS 측정 데이터 해석 및 원인 규명</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. 프로젝트 & 실습 경험 탭 */}
          {activeTab === "projects" && (
            <div className="space-y-5">
              {/* 프로젝트 1 */}
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black pb-3">
                  <div className="flex items-center gap-3">
                    <span className="border-2 border-black bg-[#FFE600] px-2 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                      PROJECT 01
                    </span>
                    <h3 className="text-xl font-black">MOSFET 소자 전기적 특성 평가 및 단채널 효과(SCE) 분석</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500">소자 분석 / 측정 실습</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-800">
                  Probe Station 및 Parameter Analyzer를 활용하여 NMOS/PMOS의 I_D-V_G, I_D-V_D 특성을 정밀 측정하고,
                  게이트 길이 스케일링에 따른 문턱전압 강하(Vth roll-off), DIBL, Subthreshold Swing(S.S.) 파라미터를
                  추출 및 정량 분석했습니다.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># 소자 특성 분석</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># Parameter Extraction</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># DIBL / SS 개선</span>
                </div>
              </div>

              {/* 프로젝트 2 */}
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black pb-3">
                  <div className="flex items-center gap-3">
                    <span className="border-2 border-black bg-[#54D7FF] px-2 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                      PROJECT 02
                    </span>
                    <h3 className="text-xl font-black">TCAD 공정 시뮬레이션을 활용한 식각 프로파일 및 산화막 균일도 최적화</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500">공정 시뮬레이션</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-800">
                  가상 Fab 공정 시뮬레이터를 통해 가스 유량(Flow rate), RF Power, 압력 등 공정 변수에 따른 식각 속도 및
                  수직 프로파일의 변화를 모델링했습니다. Micro-trenching 현상을 방지하는 최적의 바이어스 전압 조건을
                  도출했습니다.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># TCAD 시뮬레이션</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># 식각 프로파일 최적화</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># 파라미터 튜닝</span>
                </div>
              </div>

              {/* 프로젝트 3 */}
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black pb-3">
                  <div className="flex items-center gap-3">
                    <span className="border-2 border-black bg-[#70FFAF] px-2 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                      PROJECT 03
                    </span>
                    <h3 className="text-xl font-black">DOE(실험계획법) 기반 웨이퍼 결함 데이터 상관분석 및 수율 예측 모델링</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500">데이터 & 수율 분석</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-800">
                  웨이퍼 맵상의 Defect 패턴 데이터를 파이썬 및 통계 툴로 전처리하고 다중회귀 분석을 수행하여 수율 저하를
                  유발하는 핵심 공정 챔버 인자를 규명했습니다. 공정 산포 15% 개선 시나리오를 수립했습니다.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># DOE 실험계획법</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># Wafer Map 분석</span>
                  <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-xs font-bold"># Python Data Analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. 학술 & 교육 이수 탭 */}
          {activeTab === "education" && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex items-center gap-2 border-b-3 border-black pb-3">
                  <BookOpen className="h-5 w-5 text-black" />
                  <h3 className="text-lg font-black">전공 학술 역량</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="font-black">반도체 공학 & 반도체 소자 물성</div>
                    <div className="mt-1 text-xs text-zinc-600">Bandgap, Carrier Transport, p-n 접합, MOSFET 동작 원리</div>
                  </div>
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="font-black">반도체 공정공학 및 실습</div>
                    <div className="mt-1 text-xs text-zinc-600">8대 단위 공정(Litho, Etch, Depo, CMP, Clean 등) 원리 및 평가</div>
                  </div>
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="font-black">재료공학 및 고체물리학</div>
                    <div className="mt-1 text-xs text-zinc-600">결정 구조, 격자 결함, 박막 계면 물성 및 열역학 기초</div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex items-center gap-2 border-b-3 border-black pb-3">
                  <ShieldCheck className="h-5 w-5 text-black" />
                  <h3 className="text-lg font-black">전문 교육 & 어학</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black">반도체 Fab 공정 실습 수료</span>
                      <span className="font-mono text-xs font-bold text-blue-600">COMPLETED</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">Cleanroom 실습, 단위 공정 진행 및 소자 제작 실습</div>
                  </div>
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black">반도체 8대 공정 기술 전문가 과정</span>
                      <span className="font-mono text-xs font-bold text-blue-600">COMPLETED</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">최신 3D NAND / GAA FET 미세화 기술 및 불량 사례 분석</div>
                  </div>
                  <div className="border-2 border-black bg-[#FFFDF6] p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black">글로벌 커뮤니케이션 역량</span>
                      <span className="font-mono text-xs font-bold text-emerald-600">FLUENT</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">글로벌 반도체 장비사 매뉴얼 해석 및 기술 문서 독해 가능</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. 📈 반도체 산업 동향 & 시장 흐름 탭 (NEW) */}
          {activeTab === "trends" && (
            <div className="space-y-6">
              {/* 상단 인트로 밴토 카드 */}
              <div className="border-4 border-black bg-[#FFE600] p-6 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-black uppercase">
                    <Globe className="h-4 w-4" />
                    <span>GLOBAL SEMICONDUCTOR MARKET DYNAMICS 2026+</span>
                  </div>
                  <span className="border-2 border-black bg-black px-2 py-0.5 font-mono text-xs font-bold text-white">
                    MACRO TRENDS
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-black sm:text-2xl">
                  AI 메가 사이클 & 선단 공정 미세화가 이끄는 차세대 반도체 공정 혁신
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-900">
                  생성형 AI와 고성능 컴퓨팅(HPC)의 폭발적 수요로 인해 메모리와 시스템 반도체의 경계가 허물어지고
                  있습니다. 초미세 게이트 구조(GAA), 고단화 3D NAND, HBM(고대역폭 메모리) 어드밴스드 패키징 도입에 따라
                  <strong> 공정의 난이도가 기하급수적으로 증가하며 수율(Yield) 최적화 공정 엔지니어의 가치가 그 어느 때보다 중요</strong>해졌습니다.
                </p>
              </div>

              {/* 4대 핵심 산업 및 기술 트렌드 그리드 */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* 1. HBM & 어드밴스드 패키징 */}
                <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                  <div className="flex items-center justify-between border-b-3 border-black pb-3">
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black bg-[#54D7FF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                        <Cpu className="h-5 w-5 text-black" />
                      </div>
                      <h4 className="text-lg font-black">AI & HBM (고대역폭 메모리)</h4>
                    </div>
                    <span className="border-2 border-black bg-[#54D7FF]/30 px-2 py-0.5 font-mono text-[11px] font-bold">
                      HBM3E / HBM4
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-blue-600">▶</span>
                      <span><strong>TSV(실리콘 관통 전극) & 박막화:</strong> 웨이퍼 연마(CMP/Backgrinding) 및 초박형 적층 제어</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-blue-600">▶</span>
                      <span><strong>어드밴스드 본딩:</strong> MR-MUF, NCF 및 하이브리드 본딩(Cu-to-Cu Direct)을 통한 열 방출 극대화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-blue-600">▶</span>
                      <span><strong>시장 영향:</strong> AI 서버 GPU(B200/Rubin 등) 수요에 연동된 맞춤형 커스텀 HBM 시장 확대</span>
                    </li>
                  </ul>
                </div>

                {/* 2. 2nm 선단 파운드리 & GAA/BSPDN */}
                <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                  <div className="flex items-center justify-between border-b-3 border-black pb-3">
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black bg-[#FF729F] p-1.5 text-white shadow-[2px_2px_0px_0px_#000]">
                        <Zap className="h-5 w-5 text-black" />
                      </div>
                      <h4 className="text-lg font-black">선단 노드 2nm & GAA/BSPDN</h4>
                    </div>
                    <span className="border-2 border-black bg-[#FF729F]/30 px-2 py-0.5 font-mono text-[11px] font-bold">
                      SUB-2NM
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-pink-600">▶</span>
                      <span><strong>GAA (MBCFET):</strong> 나노시트(Nanosheet) 적층 구조를 통한 채널 전류 제어 및 단채널 효과 억제</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-pink-600">▶</span>
                      <span><strong>BSPDN (후면 전력 공급망):</strong> 전력선과 신호선을 분리하여 전압 강하(IR drop) 해소 및 면적 효율화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-pink-600">▶</span>
                      <span><strong>High-NA EUV 노광:</strong> 0.55 NA 차세대 노광 장비 도입으로 단일 패터닝 한계 극복</span>
                    </li>
                  </ul>
                </div>

                {/* 3. 3D NAND 고단화 & HARC Etch */}
                <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                  <div className="flex items-center justify-between border-b-3 border-black pb-3">
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black bg-[#70FFAF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                        <Layers className="h-5 w-5 text-black" />
                      </div>
                      <h4 className="text-lg font-black">3D NAND 300단+ & HARC 식각</h4>
                    </div>
                    <span className="border-2 border-black bg-[#70FFAF]/30 px-2 py-0.5 font-mono text-[11px] font-bold">
                      HIGH DENSITY
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-emerald-600">▶</span>
                      <span><strong>HARC (극고종횡비) 식각:</strong> 극저온(Cryogenic) 플라즈마 식각 기술을 통한 깊고 균일한 홀 가공</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-emerald-600">▶</span>
                      <span><strong>멀티 스택(Multi-Stack):</strong> 더블/트리플 스택 본딩 기술 고도화로 적층 수직화 한계 극복</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-emerald-600">▶</span>
                      <span><strong>QLC/PLC 고용량화:</strong> eSSD 및 데이터센터 대용량 스토리지 수요 급증 대응</span>
                    </li>
                  </ul>
                </div>

                {/* 4. 지정학적 공급망 & 친환경 ESG Fab */}
                <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                  <div className="flex items-center justify-between border-b-3 border-black pb-3">
                    <div className="flex items-center gap-2">
                      <div className="border-2 border-black bg-[#D4B2FF] p-1.5 shadow-[2px_2px_0px_0px_#000]">
                        <Building2 className="h-5 w-5 text-black" />
                      </div>
                      <h4 className="text-lg font-black">글로벌 Fab 클러스터 & Net-Zero</h4>
                    </div>
                    <span className="border-2 border-black bg-[#D4B2FF]/30 px-2 py-0.5 font-mono text-[11px] font-bold">
                      SUPPLY CHAIN
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm font-medium text-zinc-800">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-purple-600">▶</span>
                      <span><strong>용인 반도체 메가 클러스터:</strong> 세계 최대 반도체 생산 기지 조성 및 소부장 생태계 강화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-purple-600">▶</span>
                      <span><strong>CHIPS Act & 거점 다변화:</strong> 미국, 유럽, 일본 등 권역별 로컬 Fab 신증설 경쟁</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-purple-600">▶</span>
                      <span><strong>친환경 공정 레시피:</strong> PFCs 온실가스 저감형 가스 대체, 초순수/케미컬 재활용 공정</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 💡 공정기술 엔지니어로서의 인사이트 요약 배너 */}
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000]">
                <div className="flex items-center gap-2">
                  <div className="border-2 border-black bg-black px-2 py-0.5 font-mono text-xs font-bold text-[#FFE600]">
                    ENGINEER PERSPECTIVE
                  </div>
                  <span className="font-black text-sm">시장 흐름 속 공정기술 엔지니어의 핵심 역할</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-800">
                  "공정 미세화가 한계에 다다르고 적층 단수가 높아질수록, <strong>미세한 결함 하나가 수율 전체에 미치는 파급력</strong>이
                  압도적으로 커집니다. 최신 산업 동향을 정확히 파악하고, 플라즈마 식각 제어와 ALD 원자층 증착 등 핵심 단위 공정에서의
                  데이터 기반 변수 튜닝 역량을 발휘하여 Fab의 양산 램프업(Ramp-up) 속도를 극대화하겠습니다."
                </p>
              </div>
            </div>
          )}

          {/* 5. 연락처 & 링크 탭 */}
          {activeTab === "links" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-4 border-black bg-[#54D7FF] p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]"
              >
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_#000]">
                    <LinkedInIcon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-black">LinkedIn 프로필</div>
                    <div className="text-xs font-bold text-zinc-800">이력 및 네트워크 연결</div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="group flex items-center justify-between border-4 border-black bg-[#FFE600] p-5 text-left shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_#000]">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-black">이메일 문의 & 연락</div>
                    <div className="font-mono text-xs font-bold text-zinc-800">{email}</div>
                  </div>
                </div>
                <div className="border-2 border-black bg-black px-2.5 py-1 text-xs font-bold text-white">
                  {copied ? "복사됨!" : "복사"}
                </div>
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-4 border-black bg-[#70FFAF] p-5 shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]"
              >
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_#000]">
                    <GithubIcon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-black">기술 블로그 / GitHub</div>
                    <div className="text-xs font-bold text-zinc-800">공정 스터디 & 데이터 분석 코드</div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`mailto:${email}?subject=[채용문의] 반도체 공정기술 엔지니어 김재표 지원자`}
                className="group flex items-center justify-between border-4 border-black bg-[#FF729F] p-5 text-white shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#000]"
              >
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black bg-white p-2.5 text-black shadow-[2px_2px_0px_0px_#000]">
                    <FileText className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-black">이력서 / 포트폴리오 요청</div>
                    <div className="text-xs font-bold text-zinc-100">직접 메일 발송하기</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </div>

        {/* 🏁 하단 푸터 (Footer Stamp) */}
        <footer className="mt-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000]">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <div className="flex items-center justify-center gap-2 font-black sm:justify-start">
                <Target className="h-4 w-4" />
                <span>KIM JAE-PYO | SEMICONDUCTOR PROCESS TECH</span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-600">
                Crafted with Neobrutalism Design System © 2026. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="border-2 border-black bg-[#FFE600] px-2 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                FAB-READY
              </span>
              <span className="border-2 border-black bg-[#54D7FF] px-2 py-0.5 font-mono text-xs font-black shadow-[2px_2px_0px_0px_#000]">
                100% PASSION
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
