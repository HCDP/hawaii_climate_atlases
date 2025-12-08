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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Annual'];

const EVAP_TYPES = [
  { value: 'aet', label: 'Actual Evapotranspiration' },
  { value: 'air-density', label: 'Air Density' },
  { value: 'available-energy', label: 'Available Energy' },
  { value: 'canopy-conductance', label: 'Canopy Conductance' },
];

interface EvapGridData {
  values?: Record<string, number | null>;
  [key: string]: unknown;
}

export default function EvapQuickTestPage() {
  const [period, setPeriod] = useState<number>(0);
  const [evapType, setEvapType] = useState<string>('aet');
  const [units, setUnits] = useState<string>('mm');
  const [grid, setGrid] = useState<EvapGridData | null>(null);
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
        const res = await fetch(`/api/evapotranspiration/${evapType}/${period}?units=${units}`, {
          signal: controller.signal,
        });

        const json = await res.json();

        if (!res.ok || json?.error) {
          throw new Error(json?.error ?? "Failed to load evapotranspiration grid");
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
          console.error("Failed to load evapotranspiration grid", e);
          setError("Failed to load evapotranspiration data. Try another month or refresh.");
          setGrid(null);
          setRange(null);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [period, evapType, units]);

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
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontWeight: "bold" }}>Variable:</label>
          <select
            value={evapType}
            onChange={(e) => setEvapType(e.target.value)}
            disabled={loading}
            style={{ padding: "5px 10px", fontSize: 14 }}
          >
            {EVAP_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontWeight: "bold" }}>Period:</label>
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
        </div>

        {evapType === 'aet' && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontWeight: "bold" }}>Units:</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              disabled={loading}
              style={{ padding: "5px 10px", fontSize: 14 }}
            >
              <option value="mm">mm</option>
              <option value="in">inches</option>
            </select>
          </div>
        )}

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
            key={`evap-layer-${evapType}-${period}-${units}`}
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
            background: "#fee",
            padding: "10px 15px",
            borderRadius: 5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            color: "#c00",
          }}
        >
          {error}
        </div>
      )}

      {/* Data Info */}
      {grid && range && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            zIndex: 1000,
            background: "white",
            padding: "10px 15px",
            borderRadius: 5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            fontSize: 12,
          }}
        >
          <div><strong>Range:</strong> {range[0].toFixed(2)} - {range[1].toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
