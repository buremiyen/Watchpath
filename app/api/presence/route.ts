const ACTIVE_WINDOW_MS = 35_000;

type PresenceStore = Map<string, number>;

const globalPresence = globalThis as typeof globalThis & {
  __watchpathPresence?: PresenceStore;
};

function getPresenceStore() {
  globalPresence.__watchpathPresence ??= new Map<string, number>();
  return globalPresence.__watchpathPresence;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      presenceId?: string;
      action?: "heartbeat" | "leave";
    };
    const presenceId = payload.presenceId?.trim() ?? "";

    if (!/^[a-zA-Z0-9-]{20,80}$/.test(presenceId)) {
      return Response.json({ error: "Invalid presence id" }, { status: 400 });
    }

    const now = Date.now();
    const cutoff = now - ACTIVE_WINDOW_MS;
    const store = getPresenceStore();

    for (const [id, lastSeen] of store) {
      if (lastSeen < cutoff) store.delete(id);
    }

    if (payload.action === "leave") {
      store.delete(presenceId);
      return Response.json(
        { online: store.size },
        { headers: { "cache-control": "no-store" } },
      );
    }

    store.set(presenceId, now);

    return Response.json(
      { online: Math.max(1, store.size) },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Presence unavailable" }, { status: 503 });
  }
}
