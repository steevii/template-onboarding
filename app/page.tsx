"use client";
import { useState } from "react";

const PRODUCT = process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "Notre service";
const STEPS: string[] = JSON.parse(process.env.NEXT_PUBLIC_STEPS ?? '["Bienvenue","Configuration","Formation","Go live"]');
const DOCUMENTS: string[] = JSON.parse(process.env.NEXT_PUBLIC_DOCUMENTS ?? "[]");
const CONTACT_NAME = process.env.NEXT_PUBLIC_CONTACT_NAME ?? "Votre référent";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export default function Onboarding() {
  const storageKey = `onboarding-${PRODUCT}-checked`;
  const [checked, setChecked] = useState<Record<number, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(storageKey) ?? "{}"); } catch { return {}; }
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = STEPS.length > 0 ? Math.round((completedCount / STEPS.length) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Bienvenue — {PRODUCT}
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Voici votre parcours d'onboarding. Complétez chaque étape pour démarrer sereinement.
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: "white",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
            <span style={{ fontWeight: 600 }}>Progression</span>
            <span style={{ color: "#6b7280" }}>{completedCount} / {STEPS.length} étapes</span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "1rem", height: "0.5rem", overflow: "hidden" }}>
            <div
              style={{
                background: "#10b981",
                height: "100%",
                borderRadius: "1rem",
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          {progress === 100 && (
            <div style={{ marginTop: "0.75rem", color: "#10b981", fontWeight: 600, fontSize: "0.875rem" }}>
              🎉 Onboarding terminé ! Vous êtes prêt.
            </div>
          )}
        </div>

        {/* Steps */}
        <div
          style={{
            background: "white",
            borderRadius: "0.75rem",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6", fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>
            Étapes
          </div>
          {STEPS.map((step, i) => (
            <div
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                padding: "1rem 1.25rem",
                borderBottom: i < STEPS.length - 1 ? "1px solid #f3f4f6" : "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
                background: activeStep === i ? "#f0fdf4" : "white",
                transition: "background 0.1s",
              }}
            >
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={(e) => {
                  e.stopPropagation();
                  setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
                }}
                style={{ width: "1.125rem", height: "1.125rem", cursor: "pointer", accentColor: "#10b981" }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: checked[i] ? "#9ca3af" : "#111827",
                    textDecoration: checked[i] ? "line-through" : "none",
                  }}
                >
                  {i + 1}. {step}
                </div>
              </div>
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  background: checked[i] ? "#10b981" : "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {checked[i] && <span style={{ color: "white", fontSize: "0.75rem" }}>✓</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        {DOCUMENTS.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6", fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>
              📎 Documents à fournir
            </div>
            {DOCUMENTS.map((doc, i) => (
              <div
                key={i}
                style={{
                  padding: "0.875rem 1.25rem",
                  borderBottom: i < DOCUMENTS.length - 1 ? "1px solid #f3f4f6" : "none",
                  fontSize: "0.875rem",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#f59e0b" }}>•</span>
                {doc}
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        <div
          style={{
            background: "#eff6ff",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            border: "1px solid #bfdbfe",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.875rem" }}>
            🙋 Votre référent
          </div>
          <div style={{ fontSize: "0.875rem", color: "#374151" }}>{CONTACT_NAME}</div>
          {CONTACT_EMAIL && (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ fontSize: "0.875rem", color: "#3b82f6", textDecoration: "none" }}
            >
              {CONTACT_EMAIL}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
