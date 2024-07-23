```
                                         Table "public.items"
     Column      |           Type           | Collation | Nullable |              Default
-----------------+--------------------------+-----------+----------+-----------------------------------
 id              | bigint                   |           | not null | nextval('items_id_seq'::regclass)
 product_size    | character varying(10)    |           |          | 'regular'::character varying
 market_id       | bigint                   |           | not null |
 image_url       | character varying(255)   |           | not null |
 image_public_id | character varying(255)   |           | not null |
 min_price       | integer                  |           | not null |
 max_price       | integer                  |           | not null |
 created_by      | bigint                   |           | not null |
 updated_by      | bigint                   |           | not null |
 created_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 updated_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 product_id      | bigint                   |           | not null |
Indexes:
    "items_pkey" PRIMARY KEY, btree (id)
Check constraints:
    "check_min_max_price" CHECK (min_price <= max_price)
    "chk_moderator_role_created_by" CHECK (validate_moderator_role(created_by))
    "chk_moderator_role_updated_by" CHECK (validate_moderator_role(updated_by))
    "items_product_size_check" CHECK (product_size::text = ANY (ARRAY['small'::character varying, 'regular'::character varying, 'large'::character varying]::text[]))
Foreign-key constraints:
    "items_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    "items_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
    "items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    "items_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
```

```sql
CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    product_size VARCHAR(10) DEFAULT 'regular' CHECK (product_size IN ('small', 'regular', 'large')),
    market_id BIGINT REFERENCES markets(id) ON DELETE CASCADE NOT NULL ,
    image_url VARCHAR(255) NOT NULL,
    image_public_id VARCHAR(255) NOT NULL,
    min_price INTEGER NOT NULL,
    max_price INTEGER NOT NULL,
    created_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_min_max_price CHECK (min_price <= max_price),
    CONSTRAINT chk_moderator_role_created_by CHECK (validate_moderator_role(created_by)),
    CONSTRAINT chk_moderator_role_updated_by CHECK (validate_moderator_role(updated_by))
);
```
