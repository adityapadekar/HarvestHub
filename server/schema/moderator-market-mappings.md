```
        Table "public.moderator_market_mappings"
    Column    |  Type  | Collation | Nullable | Default
--------------+--------+-----------+----------+---------
 moderator_id | bigint |           | not null |
 market_id    | bigint |           | not null |
Check constraints:
    "chk_moderator_role_updated_by" CHECK (validate_moderator_role(moderator_id))
Foreign-key constraints:
    "moderator_market_mappings_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
    "moderator_market_mappings_moderator_id_fkey" FOREIGN KEY (moderator_id) REFERENCES users(id) ON DELETE CASCADE
```

```sql
CREATE TABLE moderator_market_mappings (
    moderator_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    market_id BIGINT REFERENCES markets(id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT chk_moderator_role_updated_by CHECK (validate_moderator_role(moderator_id))
);
```
