"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Star, Navigation } from "lucide-react";
import { NearbyAlternative } from "@/lib/types";

export default function NearbyAlternatives() {
  const [alternatives, setAlternatives] = useState<NearbyAlternative[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    // Get user location and fetch alternatives
    if (!navigator.geolocation) {
      fetchWithDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchAlternatives(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        fetchWithDefaultLocation();
      },
      { timeout: 5000 }
    );
  }, []);

  async function fetchWithDefaultLocation() {
    setLocationError(true);
    // Default to a generic location — API will return mock data anyway
    await fetchAlternatives(28.6139, 77.209);
  }

  async function fetchAlternatives(lat: number, lng: number) {
    try {
      const res = await fetch("/api/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng, foodType: "healthy" }),
      });
      const data = await res.json();
      setAlternatives(data.alternatives || []);
    } catch {
      setAlternatives([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="glass-card-static p-6 sm:p-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-xl">📍</span>
          Nearby Healthier Options
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">📍</span>
        Nearby Healthier Options
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-5">
        {locationError ? "Based on estimated location" : "Based on your current location"}
      </p>

      <div className="space-y-3">
        {alternatives.map((alt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[var(--accent-green)]/20 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors">
                  {alt.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">{alt.cuisine}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-[var(--accent-amber)]" fill="var(--accent-amber)" />
                <span className="text-[var(--accent-amber)]">{alt.rating}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-2">{alt.reason}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--accent-green)]">
              <Navigation className="w-3 h-3" />
              <span>{alt.distance}</span>
              <MapPin className="w-3 h-3 ml-2" />
              <span>Google Maps</span>
            </div>
          </motion.div>
        ))}
      </div>

      {alternatives.length === 0 && (
        <p className="text-sm text-[var(--text-muted)] text-center py-8">
          No nearby alternatives found.
        </p>
      )}
    </div>
  );
}
