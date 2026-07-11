/**
 * Normalize broken / legacy Vercel Blob URLs to the public CDN form.
 *
 * Correct:
 *   https://{storeId}.public.blob.vercel-storage.com/{filename}
 *
 * where `storeId` is the id embedded in BLOB_READ_WRITE_TOKEN
 * (e.g. vercel_blob_rw_<storeId>_<secret>), lowercased, without a `store_` prefix.
 *
 * Legacy / incorrect shapes we rewrite:
 *   https://store_{id}/{filename}
 *   https://store_{id}.public.blob.vercel-storage.com/{filename}
 */
export function normalizeMediaUrl(url?: null | string): string {
  if (!url) {
    return ''
  }

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()

    // https://store_xxx/file  OR  https://store_xxx.public.blob.vercel-storage.com/file
    const bareStoreMatch = host.match(/^store_([a-z0-9]+)$/i)
    if (bareStoreMatch) {
      parsed.hostname = `${bareStoreMatch[1].toLowerCase()}.public.blob.vercel-storage.com`
      return parsed.toString()
    }

    const prefixedBlobMatch = host.match(/^store_([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i)
    if (prefixedBlobMatch) {
      parsed.hostname = `${prefixedBlobMatch[1].toLowerCase()}.public.blob.vercel-storage.com`
      return parsed.toString()
    }

    // Also fix mixed-case store hosts if present.
    const blobMatch = host.match(/^([a-z0-9]+)\.public\.blob\.vercel-storage\.com$/i)
    if (blobMatch && host !== `${blobMatch[1].toLowerCase()}.public.blob.vercel-storage.com`) {
      parsed.hostname = `${blobMatch[1].toLowerCase()}.public.blob.vercel-storage.com`
      return parsed.toString()
    }
  } catch {
    return url
  }

  return url
}
