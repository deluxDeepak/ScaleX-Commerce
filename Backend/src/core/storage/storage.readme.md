## Storage (MinIO / S3) — Public vs Private

### Quick rule
- If a file URL opens in the browser, the frontend can render it.
- If the URL is blocked/403, the bucket/object is private.

### When to use what
- **Public read**: product images, thumbnails (safe to be publicly accessible).
- **Private + signed URL**: invoices, documents, payment files, any sensitive user content.

---

## MinIO: make a bucket public (read-only)
MinIO access is policy-based (no simple UI toggle like some S3 consoles).

### Option A: from your host (recommended)
1) Install `mc` (MinIO Client): https://min.io/docs/minio/linux/reference/minio-mc.html
2) Configure alias:

```bash
mc alias set local http://localhost:9000 minioadmin minioadmin
```

3) Make bucket public:

```bash
mc anonymous set public local/devbucket
mc anonymous get local/devbucket
```

Example public object URL:
`http://localhost:9000/devbucket/product/file.png`

### Option B: from inside the MinIO container

```bash
docker ps
docker exec -it <minio-container-name> sh
mc alias set local http://localhost:9000 <MINIO_ROOT_USER> <MINIO_ROOT_PASSWORD>
mc anonymous set public local/devbucket
```

### Common gotcha (Docker)
Ensure ports are published:
- `9000:9000` (S3 API)
- `9001:9001` (Console)

---

## AWS S3: same concept (bucket policy)
S3 buckets are private by default. If you need direct public URLs, allow `s3:GetObject` for `arn:aws:s3:::<bucket>/*` (and disable “Block public access” as needed).