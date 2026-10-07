export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex flex-col items-center text-center">
          {/* 프로필 아바타 */}
          <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 text-3xl font-bold text-white shadow-md ring-4 ring-white dark:ring-zinc-900">
            <span>JP</span>
          </div>

          {/* 이름 */}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            김재표
          </h1>

          {/* 뱃지 */}
          <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-800">
              💼 취업준비생
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              🔬 반도체 공정기술
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              ⚡ Process Engineer
            </span>
          </div>

          {/* 소개글 */}
          <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            반도체 8대 공정과 소자 특성에 대한 이해를 바탕으로, 공정 최적화와 수율 개선을 이끌어갈 반도체 공정기술 엔지니어 취업준비생 김재표입니다.
          </p>

          {/* 구분선 */}
          <hr className="my-6 w-full border-zinc-100 dark:border-zinc-800" />

          {/* 링크 / 소셜 버튼 영역 (확장 가능) */}
          <div className="flex w-full flex-col gap-2.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              LinkedIn 프로필 방문하기
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex w-full items-center justify-center rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              이메일 보내기
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
