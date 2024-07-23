```
                                         Table "public.markets"
     Column      |           Type           | Collation | Nullable |               Default
-----------------+--------------------------+-----------+----------+-------------------------------------
 id              | bigint                   |           | not null | nextval('markets_id_seq'::regclass)
 market_name     | character varying(50)    |           | not null |
 address         | character varying(255)   |           | not null |
 contact_number  | bigint                   |           | not null |
 geo_location    | geography(Point,4326)    |           |          |
 image_url       | character varying(255)   |           | not null |
 image_public_id | character varying(255)   |           | not null |
 created_by      | bigint                   |           | not null |
 updated_by      | bigint                   |           | not null |
 created_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 updated_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "markets_pkey" PRIMARY KEY, btree (id)
    "idx_markets_geo_location" gist (geo_location)
Check constraints:
    "chk_admin_role_created_by" CHECK (validate_admin_role(created_by))
    "chk_admin_role_updated_by" CHECK (validate_admin_role(updated_by))
Foreign-key constraints:
    "markets_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    "markets_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
Referenced by:
    TABLE "favourite_markets" CONSTRAINT "favourite_markets_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
    TABLE "items" CONSTRAINT "items_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
    TABLE "moderator_market_mappings" CONSTRAINT "moderator_market_mappings_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
```

```sql
CREATE TABLE markets (
    id BIGSERIAL PRIMARY KEY,
    market_name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_number BIGINT NOT NULL,
    geo_location GEOGRAPHY(Point,4326),
    image_url VARCHAR(255) NOT NULL,
    image_public_id VARCHAR(255) NOT NULL,
    created_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_admin_role_created_by CHECK (validate_admin_role(created_by)),
    CONSTRAINT chk_admin_role_updated_by CHECK (validate_admin_role(updated_by))
);
```

```sql
CREATE INDEX idx_markets_geo_location ON markets using GIST(geo_location);
```
