```
            Table "public.favourite_items"
   Column   |  Type  | Collation | Nullable | Default
------------+--------+-----------+----------+---------
 user_id    | bigint |           | not null |
 product_id | bigint |           | not null |
Foreign-key constraints:
    "favourite_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    "favourite_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

```sql
CREATE TABLE favourite_items (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE NOT NULL
);
```
