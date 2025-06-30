"use client";
import { useCallback } from "react";

const LOCAL_STORAGE_KEY = "formVariables";

export function getStoredFormVariables() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

export default function useGetLocalVariables() {
  const setFormVariables = useCallback((newVars: Record<string, unknown>) => {
    const currentVars = getStoredFormVariables();

    const updatedVars = {
      ...currentVars,
      ...Object.fromEntries(
        Object.entries(newVars).filter(([_, value]) => value !== undefined && value !== null)
      ),
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedVars));
  }, []);

  const getFormVariables = useCallback(() => {
    return getStoredFormVariables();
  }, []);

  return { setFormVariables, getFormVariables };
}