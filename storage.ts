import { useEffect, useState } from "react";
import type { Profile } from "../types";

const STORAGE_KEY = "shikhon-sathi-profiles-v1";

export function loadProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>(() => loadProfiles());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch {
      // ignore quota errors
    }
  }, [profiles]);

  return [profiles, setProfiles] as const;
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
