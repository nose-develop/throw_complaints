"use client";

import { useMemo, useState } from "react";
import {
  type Destination,
  getDestinationByLength,
  getThrowDuration,
  MAX_COMPLAINT_LENGTH,
} from "../_lib/destinations";
import { PolygonThrowScene } from "./PolygonThrowScene";

type Phase = "input" | "throwing" | "result";

type ThrowResult = {
  destination: Destination;
  count: number;
};

const themeClassNames: Record<Destination["theme"], string> = {
  park: "theme-park",
  town: "theme-town",
  japan: "theme-japan",
  island: "theme-island",
  overseas: "theme-overseas",
  space: "theme-space",
  mars: "theme-mars",
  jupiter: "theme-jupiter",
  neptune: "theme-neptune",
};

function getHelperMessage(count: number) {
  if (count === 0) {
    return "少しだけでも吐き出してみましょう";
  }

  if (count <= 100) {
    return "もっと吐き出すと遠くまで飛びます";
  }

  if (count <= 250) {
    return "いい勢いです。だいぶ遠くへ行きそうです";
  }

  return "これは地球を出るかもしれません";
}

export function ComplaintThrowApp() {
  const [complaint, setComplaint] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<ThrowResult | null>(null);
  const [shareMessage, setShareMessage] = useState("");

  const trimmedCount = complaint.trim().length;
  const visibleCount = complaint.length;
  const helperMessage = useMemo(
    () => getHelperMessage(trimmedCount),
    [trimmedCount],
  );
  const currentDestination =
    result?.destination ??
    (trimmedCount > 0 ? getDestinationByLength(trimmedCount) : null);
  const shellTheme = currentDestination
    ? themeClassNames[currentDestination.theme]
    : "theme-input";

  function handleThrow() {
    const count = complaint.trim().length;

    if (count === 0) {
      setErrorMessage("グチを入力してから投げてください");
      return;
    }

    const destination = getDestinationByLength(count);
    const duration = getThrowDuration(destination.level);

    setErrorMessage("");
    setShareMessage("");
    setResult({ destination, count });
    setPhase("throwing");

    window.setTimeout(() => {
      setPhase("result");
    }, duration);
  }

  function handleReset() {
    setComplaint("");
    setErrorMessage("");
    setResult(null);
    setShareMessage("");
    setPhase("input");
  }

  async function handleShare() {
    if (!result) {
      return;
    }

    const text = `私のグチは${result.destination.place}まで飛びました。${result.count}文字のグチを投げたよ #グチ投げ`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "グチ投げ",
          text,
        });
        setShareMessage("シェア画面を開きました");
        return;
      }

      await navigator.clipboard.writeText(text);
      setShareMessage("シェア文をコピーしました");
    } catch {
      setShareMessage("シェアをキャンセルしました");
    }
  }

  return (
    <main
      className={`app-shell ${shellTheme} flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 text-slate-950 sm:px-6`}
    >
      <div className="stars" aria-hidden="true" />
      <section className="relative z-10 w-full max-w-3xl">
        {phase === "input" && (
          <div className="mx-auto flex w-full flex-col gap-6 rounded-[32px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur sm:p-8">
            <div className="space-y-3 text-center">
              <p className="text-sm font-bold text-rose-600">
                今日のモヤモヤ、発射準備
              </p>
              <h1 className="text-5xl font-black tracking-normal text-slate-950 sm:text-7xl">
                グチ投げ
              </h1>
              <p className="text-base font-semibold text-slate-600 sm:text-lg">
                グチが多いほど、遠くまで飛ぶ
              </p>
            </div>

            <div className="space-y-3">
              <label
                className="text-sm font-bold text-slate-700"
                htmlFor="complaint"
              >
                グチ本文
              </label>
              <textarea
                id="complaint"
                className="min-h-44 w-full resize-none rounded-3xl border-2 border-slate-200 bg-white px-5 py-4 text-base leading-7 text-slate-900 shadow-inner outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                maxLength={MAX_COMPLAINT_LENGTH}
                placeholder="ここに今日のグチを投げ込んでください"
                value={complaint}
                onChange={(event) => {
                  setComplaint(event.target.value);
                  if (errorMessage) {
                    setErrorMessage("");
                  }
                }}
              />
              <div className="flex flex-col gap-2 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                <p>{helperMessage}</p>
                <p aria-live="polite">
                  現在の文字数 {visibleCount} / {MAX_COMPLAINT_LENGTH}
                </p>
              </div>
              {errorMessage && (
                <p
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              className="min-h-14 rounded-2xl bg-slate-950 px-6 py-4 text-lg font-black text-white shadow-[0_16px_30px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200"
              type="button"
              onClick={handleThrow}
            >
              グチを投げる
            </button>
          </div>
        )}

        {phase === "throwing" && result && (
          <div className="throw-stage mx-auto flex min-h-[560px] w-full flex-col items-center justify-center gap-7 rounded-[32px] border border-white/50 bg-white/24 p-4 text-center shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur sm:p-6">
            <PolygonThrowScene destination={result.destination} />
            <div className="space-y-3">
              <p className="text-3xl font-black text-white drop-shadow-lg">
                グチを投げています...
              </p>
              <p className="text-base font-bold text-white/90">
                {result.destination.place}方面へ飛行中
              </p>
            </div>
          </div>
        )}

        {phase === "result" && result && (
          <div className="mx-auto flex w-full flex-col items-center gap-7 rounded-[32px] border border-white/60 bg-white/86 p-6 text-center shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur sm:p-9">
            <div
              className="text-7xl leading-none sm:text-8xl"
              aria-hidden="true"
            >
              {result.destination.icon}
            </div>
            <div className="space-y-3">
              <p className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">
                Lv.{result.destination.level}
              </p>
              <h2 className="text-5xl font-black tracking-normal text-slate-950 sm:text-7xl">
                {result.destination.place}
              </h2>
              <p className="text-lg font-bold text-slate-700 sm:text-xl">
                {result.destination.message}
              </p>
              <p className="text-sm font-bold text-slate-500">
                文字数: {result.count}文字
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="min-h-13 rounded-2xl bg-rose-600 px-6 py-3 font-black text-white shadow-[0_14px_26px_rgba(225,29,72,0.24)] transition hover:-translate-y-0.5 hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
                type="button"
                onClick={handleReset}
              >
                もう一度投げる
              </button>
              <button
                className="min-h-13 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 font-black text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                type="button"
                onClick={handleShare}
              >
                SNSシェア
              </button>
            </div>
            {shareMessage && (
              <p className="text-sm font-bold text-slate-600" aria-live="polite">
                {shareMessage}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
