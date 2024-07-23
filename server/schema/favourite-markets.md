```
          Table "public.favourite_markets"
  Column   |  Type  | Collation | Nullable | Default
-----------+--------+-----------+----------+---------
 user_id   | bigint |           | not null |
 market_id | bigint |           | not null |
Foreign-key constraints:
    "favourite_markets_market_id_fkey" FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
    "favourite_markets_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

```sql
CREATE TABLE favourite_markets (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    market_id BIGINT REFERENCES markets(id) ON DELETE CASCADE NOT NULL
);
```
