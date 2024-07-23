```
                                       Table "public.verification_tokens"
   Column   |           Type           | Collation | Nullable |                     Default
------------+--------------------------+-----------+----------+-------------------------------------------------
 id         | bigint                   |           | not null | nextval('verification_tokens_id_seq'::regclass)
 user_id    | bigint                   |           | not null |
 hash       | character varying(128)   |           | not null |
 created_at | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "verification_tokens_pkey" PRIMARY KEY, btree (id)
    "verification_tokens_user_id_key" UNIQUE CONSTRAINT, btree (user_id)
Foreign-key constraints:
    "verification_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Triggers:
    trigger_cleanup_expired_verification_tokens BEFORE INSERT ON verification_tokens FOR EACH STATEMENT EXECUTE FUNCTION cleanup_expired_verification_tokens()
```

```sql
CREATE TABLE verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    hash VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```
