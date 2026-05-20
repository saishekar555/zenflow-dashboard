import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { aiInsights, revenueSeries } from "@/lib/mock";
import { Sparkles, TrendingUp, Bot, ArrowRight, Wand2, BrainCircuit, Send } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";

const tooltip = { background: "hsl(160 60% 6% / 0.95)", border: "1px solid hsl(160 30% 22%)", borderRadius: 10, fontSize: 12, color: "white" } as const;

const predicted = revenueSeries.map((r, i) => ({
  month: r.month,
  actual: i < 9 ? r.revenue : null,
  forecast: i >= 8 ? Math.round(r.revenue * (1 + (i - 8) * 0.06)) : null,
}));

export default function AIInsights() {
  const [chat, setChat] = useState([
    { who: "ai", text: "Hi Sai 👋 I noticed your SQL Database is averaging only 28% DTU. Want me to draft a downsizing proposal?" },
  ]);
  const [input, setInput] = useState("");

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between">
        <div>
          <Badge tone="accent"><Sparkles className="h-3 w-3" />AI</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold">AI insights</h1>
          <p className="text-sm text-muted-foreground">Recommendations, forecasts and intelligent optimizations.</p>
        </div>
        <Button size="sm" icon={<Wand2 className="h-4 w-4" />}>Run analysis</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((i) => (
          <Card key={i.title} className="relative overflow-hidden group hover:-translate-y-1 transition">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent/40 to-primary/30 blur-2xl" />
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-prestige text-primary-foreground">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <Badge tone="accent">{i.impact}</Badge>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.detail}</p>
            <button className="mt-4 flex items-center gap-1 text-xs font-medium text-accent transition group-hover:gap-2">
              Apply recommendation <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Predicted growth"
            description="Trained on 18 months of revenue · MAE 3.4%"
            action={<Badge tone="success"><TrendingUp className="h-3 w-3" />+34% Q4</Badge>}
          />
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={predicted}>
                <defs>
                  <linearGradient id="act" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(158 75% 50%)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="hsl(158 75% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fc" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(44 70% 55%)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="hsl(44 70% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltip} />
                <Area type="monotone" dataKey="actual" stroke="hsl(158 75% 50%)" strokeWidth={2} fill="url(#act)" />
                <Area type="monotone" dataKey="forecast" stroke="hsl(44 70% 55%)" strokeWidth={2} strokeDasharray="5 4" fill="url(#fc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <SectionTitle title="ZenFlow AI" description="Cloud assistant" action={<Bot className="h-4 w-4 text-accent" />} />
          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-muted/30 p-3">
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.who === "ai" ? "" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.who === "ai" ? "bg-card border border-border" : "gradient-emerald text-primary-foreground"
                }`}>{m.text}</div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              setChat([...chat, { who: "me", text: input }, { who: "ai", text: "Working on it… (demo placeholder)" }]);
              setInput("");
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your cloud…"
              className="flex-1 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button size="sm" type="submit" icon={<Send className="h-4 w-4" />} />
          </form>
        </Card>
      </div>
    </div>
  );
}
