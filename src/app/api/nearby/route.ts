import { NextRequest, NextResponse } from "next/server";
import { NearbyAlternative } from "@/lib/types";

/**
 * Nearby healthier alternatives endpoint.
 * Uses Google Maps Places API to find healthy restaurants nearby.
 */
export async function POST(request: NextRequest) {
  try {
    const { lat, lng, foodType } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json({ error: "Location required" }, { status: 400 });
    }

    // If no Maps API key, return mock nearby alternatives
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      const mockAlternatives: NearbyAlternative[] = [
        {
          name: "Green Bowl Kitchen",
          distance: "300m away",
          rating: 4.6,
          cuisine: "Healthy Bowls",
          reason: "Fresh grain bowls with lean protein — great energy without the crash",
        },
        {
          name: "FreshPress Café",
          distance: "500m away",
          rating: 4.4,
          cuisine: "Salads & Smoothies",
          reason: "High-fiber salads and cold-pressed juices for sustained energy",
        },
        {
          name: "Protein Bar & Kitchen",
          distance: "800m away",
          rating: 4.5,
          cuisine: "High-Protein",
          reason: "Balanced macro meals designed for focus and recovery",
        },
      ];
      return NextResponse.json({ alternatives: mockAlternatives });
    }

    // Google Maps Places API (Nearby Search)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const radius = 1500; // 1.5km
    const keyword = "healthy food salad bowl";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ alternatives: [] });
    }

    const alternatives: NearbyAlternative[] = data.results.slice(0, 3).map(
      (place: {
        name: string;
        geometry: { location: { lat: number; lng: number } };
        rating: number;
        types: string[];
      }) => {
        const distMeters = haversineDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng);
        return {
          name: place.name,
          distance: distMeters < 1000 ? `${Math.round(distMeters)}m away` : `${(distMeters / 1000).toFixed(1)}km away`,
          rating: place.rating || 4.0,
          cuisine: "Healthy Options",
          reason: `A healthier alternative nearby with a ${place.rating || 4.0}★ rating`,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        };
      }
    );

    return NextResponse.json({ alternatives });
  } catch (error) {
    console.error("Nearby search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

/** Haversine formula to calculate distance between two points in meters */
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
