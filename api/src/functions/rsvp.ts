import { app, type HttpRequest, type HttpResponseInit } from '@azure/functions';
import { appendToCollection, getCollection, type CollectionDoc } from '../cosmos';

interface GuestItem {
  id: string;
  name: string;
  email: string;
  status: 'invited' | 'confirmed' | 'declined';
  side: 'bride' | 'groom' | 'both';
  dietary: string;
  notes: string;
}

app.http('rsvpSubmit', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'rsvp',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    const entry = (await request.json()) as Record<string, unknown>;

    // Basic validation
    if (!entry.name || typeof entry.name !== 'string') {
      return { status: 400, jsonBody: { error: 'Name is required' } };
    }
    if (typeof entry.attending !== 'boolean') {
      return { status: 400, jsonBody: { error: 'Attending field is required' } };
    }

    // Add server-side metadata
    const rsvpEntry = {
      ...entry,
      id: entry.id || `rsvp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: new Date().toISOString(),
    };

    const doc = await appendToCollection('rsvp', rsvpEntry);

    // Sync to guests collection: create or update guest entry
    try {
      const guestsDoc = await getCollection('guests') as CollectionDoc & { items: GuestItem[] };
      const guestName = (entry.name as string).trim().toLowerCase();
      const existingIdx = guestsDoc.items.findIndex(
        (g: GuestItem) => g.name.trim().toLowerCase() === guestName
      );

      const guestEntry: GuestItem = {
        id: existingIdx >= 0 ? guestsDoc.items[existingIdx].id : `g-${Date.now()}`,
        name: (entry.name as string).trim(),
        email: ((entry.email as string) || '').trim(),
        status: entry.attending ? 'confirmed' : 'declined',
        side: existingIdx >= 0 ? guestsDoc.items[existingIdx].side : 'both',
        dietary: ((entry.dietary as string) || ''),
        notes: existingIdx >= 0 ? guestsDoc.items[existingIdx].notes : '',
      };

      const updatedItems = [...guestsDoc.items];
      if (existingIdx >= 0) {
        updatedItems[existingIdx] = guestEntry;
      } else {
        updatedItems.push(guestEntry);
      }

      const { putCollection } = await import('../cosmos');
      await putCollection('guests', updatedItems, guestsDoc.version);
    } catch {
      // Guest sync is best-effort; don't fail the RSVP
    }

    return {
      status: 201,
      jsonBody: { success: true, version: doc.version },
    };
  },
});
