## General PLPGSQL functions (Not specific to any particular schema)

#### FUNCTION : Validate role - check if the user is admin or not

```sql
CREATE OR REPLACE FUNCTION validate_admin_role(user_id BIGINT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM users WHERE id = user_id AND role = 'admin');
END;
$$ LANGUAGE plpgsql;
```

#### FUNCTION : Validate role - check if the user is moderator or not

```sql
CREATE OR REPLACE FUNCTION validate_moderator_role(user_id BIGINT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM users WHERE id = user_id AND role = 'moderator');
END;
$$ LANGUAGE plpgsql;
```

---

## Table specific functions

**1] Verification tokens table**

#### FUNCTION: Clean the verification tokens which are expired but are not deleted

```sql
CREATE OR REPLACE FUNCTION cleanup_expired_verification_tokens()
    RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM verification_tokens WHERE created_at < NOW() - INTERVAL '900 seconds';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

#### TRIGGER: Triggers the token clean up function

```sql
CREATE TRIGGER trigger_cleanup_expired_verification_tokens
BEFORE INSERT ON verification_tokens
EXECUTE FUNCTION cleanup_expired_verification_tokens();
```
