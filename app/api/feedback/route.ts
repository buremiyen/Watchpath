type FeedbackEntry = {
  name: string;
  subject: string;
  message: string;
  createdAt: number;
};

const globalFeedback = globalThis as typeof globalThis & {
  __watchpathFeedback?: FeedbackEntry[];
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<FeedbackEntry>;
    const name = payload.name?.trim().slice(0, 80) ?? "";
    const subject = payload.subject?.trim().slice(0, 140) ?? "";
    const message = payload.message?.trim().slice(0, 4_000) ?? "";

    if (!name || !subject || !message) {
      return Response.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
    }

    globalFeedback.__watchpathFeedback ??= [];
    globalFeedback.__watchpathFeedback.push({ name, subject, message, createdAt: Date.now() });
    globalFeedback.__watchpathFeedback = globalFeedback.__watchpathFeedback.slice(-200);

    return Response.json({ accepted: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Geri bildirim alınamadı." }, { status: 503 });
  }
}
