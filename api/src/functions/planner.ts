import { app, type HttpRequest, type HttpResponseInit } from '@azure/functions';
import { getCollection, putCollection, isValidCollection } from '../cosmos.js';
import { validatePlannerAccess } from '../auth.js';

app.http('plannerGet', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'planner/{collection}',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    if (!validatePlannerAccess(request)) {
      return { status: 403, jsonBody: { error: 'Invalid access code' } };
    }

    const collection = request.params.collection ?? '';
    if (!isValidCollection(collection)) {
      return { status: 400, jsonBody: { error: 'Invalid collection' } };
    }

    const doc = await getCollection(collection);
    return {
      status: 200,
      jsonBody: { items: doc.items, version: doc.version, updatedAt: doc.updatedAt },
    };
  },
});

app.http('plannerPut', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'planner/{collection}',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    if (!validatePlannerAccess(request)) {
      return { status: 403, jsonBody: { error: 'Invalid access code' } };
    }

    const collection = request.params.collection ?? '';
    if (!isValidCollection(collection)) {
      return { status: 400, jsonBody: { error: 'Invalid collection' } };
    }

    const body = (await request.json()) as { items: unknown[]; version: number };
    if (!Array.isArray(body.items) || typeof body.version !== 'number') {
      return { status: 400, jsonBody: { error: 'Body must have items (array) and version (number)' } };
    }

    const { doc, conflict } = await putCollection(collection, body.items, body.version);
    if (conflict) {
      return {
        status: 409,
        jsonBody: { error: 'Version conflict', items: doc.items, version: doc.version, updatedAt: doc.updatedAt },
      };
    }

    return {
      status: 200,
      jsonBody: { items: doc.items, version: doc.version, updatedAt: doc.updatedAt },
    };
  },
});
