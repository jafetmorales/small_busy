import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";

// =========================== Utilities ===========================
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randVec(d: number, vmin = -3, vmax = 3): number[] {
  return Array.from({ length: d }, () => randInt(vmin, vmax));
}

function dot(a: number[], b: number[]): number {
  return a.reduce((s, x, i) => s + x * b[i], 0);
}

function softmax(scores: number[]): number[] {
  const m = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - m));
  const sum = exps.reduce((s, x) => s + x, 0);
  return exps.map((x) => x / sum);
}

function roundVec(v: number[], p = 2): number[] {
  return v.map((x) => Math.round(x * 10 ** p) / 10 ** p);
}

function L2(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s);
}

function colorForWeight(w: number): string {
  const alpha = Math.min(1, Math.max(0.12, w));
  return `rgba(59,130,246,${alpha})`; // blue-500 RGBA
}

// =========================== Core Generator ===========================
interface Puzzle {
  Q: number[];
  Ks: number[][];
  Vs: number[][];
  scores: number[];
  probs: number[];
  out: number[];
  choices: { v: number[] }[];
  correctIdx: number;
}

function makePuzzle(dimQK = 3, dimV = 3, nKeys = 4): Puzzle {
  const Q = randVec(dimQK);
  const Ks = Array.from({ length: nKeys }, () => randVec(dimQK));
  const Vs = Array.from({ length: nKeys }, () => randVec(dimV));
  const scores = Ks.map((k) => dot(Q, k));
  const probs = softmax(scores);

  // Weighted sum output
  const out = Array.from({ length: dimV }, (_, j) => {
    let s = 0;
    for (let i = 0; i < nKeys; i++) s += probs[i] * Vs[i][j];
    return s;
  });

  // Create distractors near y to make it non-trivial
  const distractor1 = out.map((x, i) => x + (i % 2 === 0 ? 0.4 : -0.35));
  const distractor2 = out.map((x, i) => x + (i % 2 === 1 ? 0.6 : -0.25));
  const choices = [out, distractor1, distractor2]
    .map((v) => ({ v: roundVec(v, 2) }))
    .sort(() => Math.random() - 0.5);

  const correctIdx = choices.findIndex((c) => L2(c.v, out) < 1e-3);

  return {
    Q,
    Ks,
    Vs,
    scores,
    probs,
    out: roundVec(out, 3),
    choices,
    correctIdx,
  };
}

// =========================== Small UI atoms ===========================
interface BadgeProps {
  children: React.ReactNode;
  tone?: "slate" | "blue" | "green" | "amber" | "violet" | "rose";
}

function Badge({ children, tone = "slate" }: BadgeProps) {
  const map = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-800",
    violet: "bg-violet-100 text-violet-800",
    rose: "bg-rose-100 text-rose-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-100 text-xs font-mono">
      {children}
    </span>
  );
}

interface PrettyVecProps {
  label: string;
  v: number[];
  highlight?: boolean;
}

function PrettyVec({ label, v, highlight = false }: PrettyVecProps) {
  return (
    <div className={`flex items-center gap-2 ${highlight ? "bg-yellow-50" : ""} p-2 rounded-xl`}>
      <Badge tone={highlight ? "amber" : "slate"}>{label}</Badge>
      <code className="font-mono text-sm">
        [
        {v.map((x, i) => (
          <span key={i} className="mr-1">
            {x}
            {i < v.length - 1 ? "," : ""}{" "}
          </span>
        ))}
        ]
      </code>
    </div>
  );
}

interface KCardsProps {
  Ks: number[][];
  scores: number[];
  probs: number[];
  reveal: boolean;
}

function KCards({ Ks, scores, probs, reveal }: KCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {Ks.map((k, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 p-3 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <Badge tone="blue">Key {i + 1}</Badge>
            {reveal && (
              <div className="flex gap-2 items-center">
                <Pill>score={scores[i]}</Pill>
                <Pill>p={Math.round(probs[i] * 100) / 100}</Pill>
              </div>
            )}
          </div>
          <div className="mt-2">
            <PrettyVec label="k" v={k} />
          </div>
          {reveal && (
            <div className="h-2 w-full bg-slate-100 rounded mt-3 overflow-hidden">
              <div
                className="h-2"
                style={{
                  width: `${Math.max(5, probs[i] * 100)}%`,
                  backgroundColor: colorForWeight(Math.max(0.15, probs[i])),
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function PrimaryButton({ children, onClick, disabled = false }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-2xl shadow-md font-medium transition active:scale-[0.98] ${
        disabled
          ? "bg-slate-200 text-slate-500"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {children}
    </button>
  );
}

interface GhostButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function GhostButton({ children, onClick }: GhostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

// =========================== Visuals ===========================
interface AttentionChordProps {
  probs: number[];
  labels?: string[];
}

function AttentionChord({ probs, labels }: AttentionChordProps) {
  const W = 420,
    H = 180;
  const qx = 60,
    qy = H / 2;
  const kx = W - 80;
  const n = probs.length;
  const ys = Array.from({ length: n }, (_, i) => 30 + (i * (H - 60)) / (n - 1 || 1));

  return (
    <svg width={W} height={H} className="w-full">
      <defs>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 z" />
        </marker>
      </defs>
      <circle cx={qx} cy={qy} r={12} className="fill-blue-600" />
      <text x={qx} y={qy - 16} className="text-[10px] fill-slate-700">
        Q
      </text>
      {ys.map((y, i) => (
        <g key={i}>
          <circle cx={kx} cy={y} r={10} className="fill-amber-500" />
          <text
            x={kx}
            y={y - 14}
            textAnchor="middle"
            className="text-[10px] fill-slate-700"
          >
            {labels?.[i] || `K${i + 1}`}
          </text>
          <line
            x1={qx + 12}
            y1={qy}
            x2={kx - 10}
            y2={y}
            strokeWidth={Math.max(1.5, probs[i] * 12)}
            className="stroke-blue-500"
            markerEnd="url(#arrow)"
          />
        </g>
      ))}
    </svg>
  );
}

// =========================== Level chrome ===========================
interface LevelHeaderProps {
  title: string;
  subtitle: string;
  level: number;
}

function LevelHeader({ title, subtitle, level }: LevelHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <Badge tone="violet">Level {level}</Badge>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-slate-600 text-sm">{subtitle}</p>
    </div>
  );
}

function Explainer() {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 bg-white">
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge>Cheat Sheet</Badge>
        <Badge tone="green">Q·Kᵀ + softmax → weights</Badge>
        <Badge tone="amber">weights × V → output</Badge>
      </div>
      <ul className="text-sm leading-6 text-slate-700 list-disc pl-5">
        <li>
          <b>Query (Q):</b> what the token is looking for.
        </li>
        <li>
          <b>Key (K):</b> what each other token offers to be matched on.
        </li>
        <li>
          <b>Value (V):</b> info provided if selected.
        </li>
      </ul>
      <pre className="mt-3 bg-slate-50 p-3 rounded-xl text-xs overflow-auto">
        {`QK-scores: sᵢ = Q · Kᵢ
softmax:   pᵢ = exp(sᵢ)/Σⱼ exp(sⱼ)
output:    y  = Σᵢ pᵢ Vᵢ`}
      </pre>
    </div>
  );
}

// =========================== Levels ===========================
interface LevelProps {
  puzzle: Puzzle;
  onPass: () => void;
  addScore: (score: number) => void;
}

function Level1_FindTheKey({ puzzle, onPass, addScore }: LevelProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);

  const bestIdx = useMemo(
    () => puzzle.scores.indexOf(Math.max(...puzzle.scores)),
    [puzzle]
  );

  const tryPick = (i: number) => {
    setPicked(i);
    setReveal(true);
    const ok = i === bestIdx;
    addScore(ok ? 120 : 0);
    if (ok) setTimeout(onPass, 600);
  };

  return (
    <div className="space-y-4">
      <LevelHeader
        level={1}
        title="Find the best-matching Key"
        subtitle="Pick the Key with the largest dot-product to Q."
      />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 rounded-2xl border border-slate-200 p-3 bg-white">
          <PrettyVec label="Query Q" v={puzzle.Q} highlight />
          <div className="mt-3 flex gap-2">
            <GhostButton onClick={() => setReveal(true)}>Reveal scores</GhostButton>
          </div>
        </div>
        <div className="md:col-span-2">
          <KCards
            Ks={puzzle.Ks}
            scores={puzzle.scores}
            probs={puzzle.probs}
            reveal={reveal}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {puzzle.Ks.map((_, i) => (
              <PrimaryButton key={i} onClick={() => tryPick(i)}>
                Choose Key {i + 1}
              </PrimaryButton>
            ))}
          </div>
          {reveal && (
            <div className="mt-3 text-sm">
              {picked === bestIdx ? (
                <span className="text-green-700 font-medium">
                  Nice! Highest score → highest attention weight.
                </span>
              ) : (
                <span className="text-rose-700 font-medium">
                  Not quite. Check the scores and try again.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Level2_SoftmaxTuner({ puzzle, onPass, addScore }: LevelProps) {
  const [user, setUser] = useState(() => {
    const n = puzzle.probs.length;
    return Array.from({ length: n }, () => 1 / n);
  });
  const [won, setWon] = useState(false);
  const [autoUsed, setAutoUsed] = useState(false);

  function setUserProb(i: number, value: number) {
    const copy = [...user];
    copy[i] = Math.max(0, Math.min(1, value));
    const sum = copy.reduce((s, x) => s + x, 0) || 1;
    setUser(copy.map((x) => x / sum));
  }

  const dist = L2(user, puzzle.probs);

  useEffect(() => {
    // Loosened threshold so players don't get stuck
    if (!won && dist < 0.15) {
      setWon(true);
      addScore(140);
      const t = setTimeout(onPass, 600);
      return () => clearTimeout(t);
    }
  }, [dist, won, onPass, addScore]);

  const autoMatch = () => {
    setUser(puzzle.probs);
    setAutoUsed(true);
    if (!won) {
      setWon(true);
      addScore(100); // smaller reward for auto
      setTimeout(onPass, 400);
    }
  };

  const canContinue = won || dist < 0.15 || autoUsed;

  return (
    <div className="space-y-4">
      <LevelHeader
        level={2}
        title="Tune the softmax distribution"
        subtitle="Match the probabilities to the true softmax; thicker arrows = higher attention."
      />

      <div className="rounded-2xl border border-slate-200 p-3 bg-white">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            {puzzle.scores.map((s, i) => (
              <div key={i} className="mb-3 p-2 rounded-xl bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <Badge tone="blue">Key {i + 1}</Badge>
                  <Pill>score={s}</Pill>
                  <Pill>target≈{Math.round(puzzle.probs[i] * 100) / 100}</Pill>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(user[i] * 100)}
                  onChange={(e) => setUserProb(i, Number(e.target.value) / 100)}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-600">your pₐ</span>
                  <Pill>{Math.round(user[i] * 100) / 100}</Pill>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded mt-2 overflow-hidden">
                  <div
                    className="h-2 bg-blue-500"
                    style={{ width: `${Math.max(5, user[i] * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3 border border-slate-200">
            <div className="text-sm mb-2">
              Distance to target (L2): <b>{Math.round(dist * 100) / 100}</b>
              {canContinue && (
                <span className="text-green-700 font-medium"> ✔ ready</span>
              )}
            </div>
            <AttentionChord
              probs={user}
              labels={puzzle.Ks.map((_, i) => `K${i + 1}`)}
            />
            <pre className="mt-3 bg-slate-50 p-3 rounded-xl text-xs overflow-auto">
              {`softmax(s) = exp(sᵢ)/Σⱼ exp(sⱼ)
• Higher score → higher probability.
• Arrows thicken as your pᵢ grows.`}
            </pre>
            <div className="mt-3 flex gap-2">
              <PrimaryButton onClick={autoMatch}>Auto‑match</PrimaryButton>
              <PrimaryButton onClick={onPass} disabled={!canContinue}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Level3Props extends LevelProps {
  nextPuzzle: () => void;
}

function Level3_ValueMixer({ puzzle, onPass, addScore, nextPuzzle }: Level3Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);

  const tryPick = (i: number) => {
    setPicked(i);
    setReveal(true);
    const ok = i === puzzle.correctIdx;
    addScore(ok ? 160 : 0);
    if (ok) setTimeout(onPass, 700);
  };

  return (
    <div className="space-y-4">
      <LevelHeader
        level={3}
        title="Mix the Values"
        subtitle="Compute y = Σᵢ pᵢ Vᵢ and pick the correct vector."
      />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 rounded-2xl border border-slate-200 p-3 bg-white">
          <div className="mb-2">
            <Badge tone="amber">Values</Badge>
          </div>
          {puzzle.Vs.map((v, i) => (
            <PrettyVec key={i} label={`V${i + 1}`} v={v} />
          ))}
          <div className="mt-3">
            <Badge tone="green">Weights pᵢ</Badge>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {puzzle.probs.map((p, i) => (
                <Pill key={i}>
                  p{i + 1}={Math.round(p * 100) / 100}
                </Pill>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-slate-200 p-3 bg-white">
          <div className="mb-2">
            <Badge tone="violet">Which output y?</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            {puzzle.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => tryPick(i)}
                className={`text-left rounded-2xl border p-3 hover:shadow transition ${
                  reveal && i === puzzle.correctIdx
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <PrettyVec label={`Choice ${i + 1}`} v={c.v} />
              </button>
            ))}
          </div>
          {reveal && (
            <div className="mt-3 text-sm">
              {picked === puzzle.correctIdx ? (
                <span className="text-green-700 font-medium">
                  Correct! That's Σ pᵢ Vᵢ.
                </span>
              ) : (
                <span className="text-rose-700 font-medium">
                  Close. The true y is the probability‑weighted sum.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <GhostButton onClick={nextPuzzle}>New random puzzle</GhostButton>
      </div>
    </div>
  );
}

// =========================== Tiny Test Runner ===========================
function DevTestsPanel() {
  const results = useMemo(() => {
    const out: Array<{ name: string; pass: boolean; info: string }> = [];

    // 1) softmax sums to ~1
    const probs = softmax([1, 2, 3]);
    out.push({
      name: "softmax sums to 1",
      pass: Math.abs(probs.reduce((s, x) => s + x, 0) - 1) < 1e-9,
      info: `sum=${probs.reduce((s, x) => s + x, 0).toFixed(9)}`,
    });

    // 2) dot product basic sanity
    const a = [1, 2, 3];
    out.push({
      name: "dot(a,a) >= 0",
      pass: dot(a, a) >= 0,
      info: `dot=${dot(a, a)}`,
    });

    // 3) makePuzzle shapes and correctness
    const P = makePuzzle(3, 3, 4);
    const okShapes =
      P.Ks.length === 4 &&
      P.Vs.length === 4 &&
      P.probs.length === 4 &&
      P.out.length === 3;
    out.push({
      name: "makePuzzle shapes",
      pass: okShapes,
      info: `Ks=${P.Ks.length}, Vs=${P.Vs.length}`,
    });

    // 4) Weighted sum correct vs recompute
    const recompute = Array.from({ length: 3 }, (_, j) =>
      P.Vs.reduce((s, v, i) => s + P.probs[i] * v[j], 0)
    );
    out.push({
      name: "weighted sum consistent",
      pass: L2(recompute, P.out) < 1e-2,
      info: `L2=${L2(recompute, P.out)}`,
    });

    // 5) Correct index points to true choice
    const idx = P.correctIdx;
    const passIdx =
      idx >= 0 && idx < P.choices.length && L2(P.choices[idx].v, P.out) < 1e-2;
    out.push({
      name: "correctIdx is valid",
      pass: passIdx,
      info: `idx=${idx}`,
    });

    return out;
  }, []);

  const passCount = results.filter((r) => r.pass).length;
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-3 text-xs text-slate-600">
      <div className="font-semibold mb-2">Dev tests</div>
      <div className="mb-2">
        {passCount}/{results.length} tests passing
      </div>
      <ul className="list-disc pl-4 space-y-1">
        {results.map((r, i) => (
          <li key={i} className={r.pass ? "text-green-700" : "text-rose-700"}>
            {r.pass ? "✔" : "✘"} {r.name} — {r.info}
          </li>
        ))}
      </ul>
    </div>
  );
}

// =========================== Main Game ===========================
export default function AttentionHeadLab() {
  const [puzzle, setPuzzle] = useState(() => makePuzzle());
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHow, setShowHow] = useState(false);

  function nextPuzzle() {
    setPuzzle(makePuzzle());
    setLevel(1);
  }

  function addScore(delta: number) {
    if (delta > 0) setStreak((s) => s + 1);
    else setStreak(0);
    setScore((x) => x + delta);
  }

  function onPassLevel() {
    setLevel((L) => Math.min(3, L + 1));
  }

  const chartData = useMemo(
    () =>
      puzzle.probs.map((p, i) => ({
        name: `K${i + 1}`,
        probability: Math.round(p * 100) / 100,
      })),
    [puzzle]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back to Portfolio Button */}
      <div className="absolute top-4 right-4 z-50">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>

      <div className="min-h-[60vh] w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white grid place-items-center font-bold">
              A
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">Attention Head Lab</h1>
              <p className="text-slate-600 text-sm">
                Learn Q, K, V by playing. 3 quick levels.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Pill>score: {score}</Pill>
            <Pill>streak: {streak}</Pill>
            <GhostButton onClick={() => setShowHow((v) => !v)}>
              {showHow ? "Hide" : "How it works"}
            </GhostButton>
            <GhostButton onClick={nextPuzzle}>Reset</GhostButton>
          </div>
        </div>

        <AnimatePresence>
          {showHow && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4"
            >
              <Explainer />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1 rounded-2xl border border-slate-200 p-3 bg-white">
            <div className="mb-2 flex items-center justify-between">
              <Badge tone="blue">Given</Badge>
              <span className="text-xs text-slate-500">randomized per puzzle</span>
            </div>
            <PrettyVec label="Q" v={puzzle.Q} />
            <div className="mt-2">
              <Badge tone="blue">Keys</Badge>
              <div className="mt-2 space-y-1">
                {puzzle.Ks.map((k, i) => (
                  <PrettyVec key={i} label={`K${i + 1}`} v={k} />
                ))}
              </div>
            </div>
            <div className="mt-2">
              <Badge tone="amber">Values</Badge>
              <div className="mt-2 space-y-1">
                {puzzle.Vs.map((v, i) => (
                  <PrettyVec key={i} label={`V${i + 1}`} v={v} />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <Badge tone="green">Softmax Probabilities</Badge>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <Badge tone="violet">Attention diagram</Badge>
              <AttentionChord
                probs={puzzle.probs}
                labels={puzzle.Ks.map((_, i) => `K${i + 1}`)}
              />
            </div>
            <div className="mt-4">
              <DevTestsPanel />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {level === 1 && (
              <Level1_FindTheKey
                puzzle={puzzle}
                onPass={onPassLevel}
                addScore={addScore}
              />
            )}
            {level === 2 && (
              <Level2_SoftmaxTuner
                puzzle={puzzle}
                onPass={onPassLevel}
                addScore={addScore}
              />
            )}
            {level === 3 && (
              <Level3_ValueMixer
                puzzle={puzzle}
                onPass={onPassLevel}
                addScore={addScore}
                nextPuzzle={nextPuzzle}
              />
            )}

            <div className="rounded-2xl border border-slate-200 p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge tone="violet">What this simulates</Badge>
              </div>
              <p className="text-sm text-slate-700 leading-6">
                In each level, you're doing exactly what an attention head does: (1)
                compute similarity between Q and each K (dot product), (2) turn those scores
                into a probability distribution with softmax, and (3) mix Values using those
                probabilities. Multi‑head attention runs several heads like this in parallel
                and projects/combines outputs via a learned Wₒ.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Visual tip: Watch the bar chart and arrow thickness to see how weights shift.
        </div>
      </div>
    </div>
  );
}