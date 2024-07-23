```
                                         Table "public.products"
     Column      |           Type           | Collation | Nullable |               Default
-----------------+--------------------------+-----------+----------+--------------------------------------
 id              | integer                  |           | not null | nextval('products_id_seq'::regclass)
 product_name    | character varying(50)    |           | not null |
 product_type    | character varying(10)    |           | not null |
 unit            | character varying(10)    |           | not null |
 image_url       | character varying(255)   |           | not null |
 image_public_id | character varying(255)   |           | not null |
 created_by      | bigint                   |           | not null |
 updated_by      | bigint                   |           | not null |
 created_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 updated_at      | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
    "products_product_name_key" UNIQUE CONSTRAINT, btree (product_name)
Check constraints:
    "chk_admin_role_created_by" CHECK (validate_admin_role(created_by))
    "chk_admin_role_updated_by" CHECK (validate_admin_role(updated_by))
    "products_product_type_check" CHECK (product_type::text = ANY (ARRAY['vegetable'::character varying, 'fruit'::character varying]::text[]))
    "products_unit_check" CHECK (unit::text = ANY (ARRAY['Rs/Gram'::character varying, 'Rs/Kg'::character varying, 'Rs/Quintal'::character varying, 'Rs/Tonne'::character varying]::text[]))
Foreign-key constraints:
    "products_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
    "products_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT
Referenced by:
    TABLE "favourite_items" CONSTRAINT "favourite_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    TABLE "items" CONSTRAINT "items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) UNIQUE NOT NULL,
    product_type VARCHAR(10) NOT NULL CHECK (product_type IN ('vegetable', 'fruit')),
    unit VARCHAR(10) NOT NULL CHECK (unit IN ('Rs/Gram','Rs/Kg','Rs/Quintal','Rs/Tonne')),
    image_url VARCHAR(255) NOT NULL,
    image_public_id VARCHAR(255) NOT NULL,
    created_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_admin_role_created_by CHECK (validate_admin_role(created_by)),
    CONSTRAINT chk_admin_role_updated_by CHECK (validate_admin_role(updated_by))
);
```
