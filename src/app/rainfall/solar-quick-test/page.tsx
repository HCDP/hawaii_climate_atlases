"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer),{ssr: false, loading: () => <div style={{ padding: 20 }}>Loading map…</div>,});

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer),{ ssr: false });

// temporary workaround to load RainfallColorLayer without SSR
const RainfallColorLayer = dynamic(() =>
    import("@/components/maps/RainfallMap/RainfallColorLayer").then(
    (mod) => mod.RainfallColorLayer
    ),
  { ssr: false }
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SolarGridData {
  values?: Record<string, number | null>;
  // Keep it flexible since you don’t fully control this shape
  [key: string]: unknown;
}

export default function SolarQuickTestPage() {
  const [period, setPeriod] = useState<number>(0);
  const [grid, setGrid] = useState<SolarGridData | null>(null);
  const [range, setRange] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const center: [number, number] = [20.7, -156.0];

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/solar/radiation/${period}`, {
          signal: controller.signal,
        });

        const json = await res.json();

        if (!res.ok || json?.error) {
          throw new Error(json?.error ?? "Failed to load solar grid");
        }

        setGrid(json);

        const values = Object.values(json.values ?? {}) as number[];
        const finiteValues = values.filter((v) => Number.isFinite(v));

        if (finiteValues.length > 0) {
          const min = Math.min(...finiteValues);
          const max = Math.max(...finiteValues);
          setRange([min, max]);
        } else {
          setRange(null);
        }
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error("Failed to load solar grid", e);
          setError("Failed to load solar data. Try another month or refresh.");
          setGrid(null);
          setRange(null);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    // If user switches month quickly or navigates away, cancel the old request
    return () => controller.abort();
  }, [period]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Controls */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: "white",
          padding: "10px 15px",
          borderRadius: 5,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <label style={{ fontWeight: "bold" }}>Month:</label>
        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          disabled={loading}
          style={{ padding: "5px 10px", fontSize: 14 }}
        >
          {MONTHS.map((month, i) => (
            <option key={i} value={i}>
              {month}
            </option>
          ))}
        </select>
        {loading && <span>Loading…</span>}
      </div>

      {/* Map */}
      <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {grid && range && (
          <RainfallColorLayer
            key={`solar-layer-${period}`}
            options={{
              asciiGrid: grid,
              colorScale: { range },
              colorScheme: [
                "#9400D3",
                "#4B0082",
                "#0000FF",
                "#00FF00",
                "#FFFF00",
                "#FF7F00",
                "#FF0000",
              ],
            }}
          />
        )}
      </MapContainer>

      {/* Error message */}
      {error && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            zIndex: 1000,
            background: "rgba(255,255,255,0.9)",
            padding: "8px 12px",
            borderRadius: 4,
            boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
