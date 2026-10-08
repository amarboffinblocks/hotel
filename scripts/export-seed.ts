import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { services } from "../src/data/content";
import { offers } from "../src/data/offers";
import { reviews } from "../src/data/reviews";
import { rooms } from "../src/data/rooms";

const strip = <T extends { id: string }>(rows: T[]) =>
  rows.map(({ id: _id, ...rest }) => rest);

const data = {
  rooms: strip(rooms),
  offers: strip(offers),
  services: strip(services),
  reviews: strip(reviews),
};

const out = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../server/src/seed/data.json"
);

fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log("Wrote", out, {
  rooms: data.rooms.length,
  offers: data.offers.length,
  services: data.services.length,
  reviews: data.reviews.length,
});
