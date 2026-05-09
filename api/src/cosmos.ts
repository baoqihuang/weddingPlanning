import { CosmosClient, type Container } from '@azure/cosmos';

const connectionString = process.env.COSMOS_CONNECTION_STRING || '';
const databaseId = 'wedding-db';
const containerId = 'data';

let _container: Container | null = null;

function getContainer(): Container {
  if (!_container) {
    const client = new CosmosClient(connectionString);
    _container = client.database(databaseId).container(containerId);
  }
  return _container;
}

const VALID_COLLECTIONS = ['budget', 'checklist', 'rsvp', 'guests'] as const;
type CollectionName = (typeof VALID_COLLECTIONS)[number];

function isValidCollection(name: string): name is CollectionName {
  return VALID_COLLECTIONS.includes(name as CollectionName);
}

export interface CollectionDoc {
  id: string;
  type: string;
  items: unknown[];
  version: number;
  updatedAt: string;
}

export async function getCollection(name: CollectionName): Promise<CollectionDoc> {
  const container = getContainer();
  try {
    const { resource } = await container.item(name, name).read<CollectionDoc>();
    if (resource) return resource;
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'code' in e && (e as { code: number }).code === 404) {
      // Not found — return default
    } else {
      throw e;
    }
  }
  return { id: name, type: name, items: [], version: 0, updatedAt: new Date().toISOString() };
}

export async function putCollection(
  name: CollectionName,
  items: unknown[],
  expectedVersion: number
): Promise<{ doc: CollectionDoc; conflict: boolean }> {
  const container = getContainer();
  const current = await getCollection(name);

  if (current.version !== expectedVersion) {
    return { doc: current, conflict: true };
  }

  const newDoc: CollectionDoc = {
    id: name,
    type: name,
    items,
    version: current.version + 1,
    updatedAt: new Date().toISOString(),
  };

  await container.items.upsert(newDoc);
  return { doc: newDoc, conflict: false };
}

export async function appendToCollection(
  name: CollectionName,
  item: unknown
): Promise<CollectionDoc> {
  const container = getContainer();
  const current = await getCollection(name);

  const newDoc: CollectionDoc = {
    id: name,
    type: name,
    items: [...current.items, item],
    version: current.version + 1,
    updatedAt: new Date().toISOString(),
  };

  await container.items.upsert(newDoc);
  return newDoc;
}

export { isValidCollection, type CollectionName };
