import { useState, useEffect, useCallback, useRef } from 'react';

interface CloudData<T> {
  items: T;
  version: number;
  updatedAt: string;
}

const ACCESS_CODE = '516100';

async function fetchCloud<T>(collection: string): Promise<CloudData<T> | null> {
  try {
    const res = await fetch(`/api/planner/${collection}`, {
      headers: { 'x-access-code': ACCESS_CODE },
    });
    if (!res.ok) return null;
    return (await res.json()) as CloudData<T>;
  } catch {
    return null;
  }
}

async function saveCloud<T>(
  collection: string,
  items: T,
  version: number
): Promise<{ success: boolean; data?: CloudData<T>; conflict?: boolean }> {
  try {
    const res = await fetch(`/api/planner/${collection}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-code': ACCESS_CODE,
      },
      body: JSON.stringify({ items, version }),
    });
    const data = (await res.json()) as CloudData<T>;
    if (res.status === 409) {
      return { success: false, data, conflict: true };
    }
    if (!res.ok) return { success: false };
    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export function useCloudStorage<T>(
  collection: string,
  localStorageKey: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, { loading: boolean; syncing: boolean; error: string | null }] {
  // Read from localStorage for fast initial render
  const [data, setData] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(localStorageKey);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const [, setVersion] = useState(0);
  const versionRef = useRef(0);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hydrated = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Fetch from cloud on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cloud = await fetchCloud<T>(collection);
      if (cancelled) return;

      if (cloud) {
        const cloudItems = cloud.items;
        const hasCloudData = Array.isArray(cloudItems) ? cloudItems.length > 0 : !!cloudItems;
        const localData = data;
        const hasLocalData = Array.isArray(localData) ? localData.length > 0 : !!localData;

        if (hasCloudData) {
          // Cloud has data — use it as source of truth
          setData(cloudItems);
          setVersion(cloud.version);
          versionRef.current = cloud.version;
          try {
            window.localStorage.setItem(localStorageKey, JSON.stringify(cloudItems));
          } catch { /* ignore */ }
        } else if (hasLocalData) {
          // Cloud empty, local has data — seed cloud from local
          const result = await saveCloud<T>(collection, localData, 0);
          if (result.success && result.data) {
            setVersion(result.data.version);
            versionRef.current = result.data.version;
          }
        }
        hydrated.current = true;
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  // Debounced save to cloud
  const saveToCloud = useCallback(
    (newData: T, currentVersion: number) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        setSyncing(true);
        setError(null);
        const result = await saveCloud<T>(collection, newData, currentVersion);
        if (result.success && result.data) {
          setVersion(result.data.version);
          versionRef.current = result.data.version;
        } else if (result.conflict && result.data) {
          // Conflict: reload cloud data
          setData(result.data.items);
          setVersion(result.data.version);
          versionRef.current = result.data.version;
          try {
            window.localStorage.setItem(localStorageKey, JSON.stringify(result.data.items));
          } catch { /* ignore */ }
          setError('Data was updated by someone else. Reloaded latest version.');
        }
        setSyncing(false);
      }, 500);
    },
    [collection, localStorageKey]
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setData((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        // Save to localStorage immediately
        try {
          window.localStorage.setItem(localStorageKey, JSON.stringify(newValue));
        } catch { /* ignore */ }
        // Save to cloud (debounced) only if hydrated — use ref to avoid stale version
        if (hydrated.current) {
          saveToCloud(newValue, versionRef.current);
        }
        return newValue;
      });
    },
    [localStorageKey, saveToCloud]
  );

  return [data, setValue, { loading, syncing, error }];
}
