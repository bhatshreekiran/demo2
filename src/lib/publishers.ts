/**
 * Data-access helpers for publisher records used by Astro pages and tests.
 * These helpers read from the local SQLite database via Drizzle and return
 * app-facing publisher objects without exposing raw database row shapes.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { PublisherRow } from '../../db/schema';
import type { Publisher } from '../types/game';

type PublisherSelection = Pick<PublisherRow, 'id' | 'name'>;

function mapPublisher(row: PublisherSelection): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/** All publishers ordered by name. */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}
