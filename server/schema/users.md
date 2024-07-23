```
                                        Table "public.users"
     Column     |          Type          | Collation | Nullable |              Default
----------------+------------------------+-----------+----------+-----------------------------------
 id             | bigint                 |           | not null | nextval('users_id_seq'::regclass)
 name           | character varying(60)  |           | not null |
 username       | character varying(30)  |           | not null |
 email          | character varying(255) |           | not null |
 password       | character varying(255) |           | not null |
 contact_number | bigint                 |           |          |
 address        | character varying(255) |           |          |
 role           | character varying(20)  |           |          | 'user'::character varying
 is_verified    | boolean                |           |          | false
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
Check constraints:
    "users_role_check" CHECK (role::text = ANY (ARRAY['user'::character varying, 'admin'::character varying, 'moderator'::character varying]::text[]))
Referenced by:
    TABLE "favourite_items" CONSTRAINT "favourite_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    TABLE "favourite_markets" CONSTRAINT "favourite_markets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    TABLE "items" CONSTRAINT "items_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "items" CONSTRAINT "items_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "markets" CONSTRAINT "markets_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "markets" CONSTRAINT "markets_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "moderator_market_mappings" CONSTRAINT "moderator_market_mappings_moderator_id_fkey" FOREIGN KEY (moderator_id) REFERENCES users(id) ON DELETE CASCADE
    TABLE "products" CONSTRAINT "products_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "products" CONSTRAINT "products_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
    TABLE "verification_tokens" CONSTRAINT "verification_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_number BIGINT,
    address VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    is_verified BOOLEAN DEFAULT false
);
```
