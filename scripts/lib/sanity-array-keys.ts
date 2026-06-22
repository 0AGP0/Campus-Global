type WithKey = Record<string, unknown> & { _key?: string };

export function withArrayKeys<T extends WithKey>(
  items: unknown,
  keyFor: (item: T, index: number) => string,
): (T & { _key: string })[] | undefined {
  if (!Array.isArray(items)) return undefined;
  return items.map((raw, index) => {
    const item = raw as T;
    const existing = item._key;
    return {
      ...item,
      _key: typeof existing === "string" && existing.length > 0 ? existing : keyFor(item, index),
    };
  });
}

export function tocWithKeys(items: unknown) {
  return withArrayKeys<{ id?: string; label?: string }>(items, (item, index) => {
    const id = typeof item.id === "string" ? item.id : `item-${index}`;
    return `toc-${index}-${id}`.slice(0, 128);
  });
}

export function faqWithKeys(items: unknown) {
  return withArrayKeys<{ question?: string }>(items, (item, index) => {
    const q = typeof item.question === "string" ? item.question : `q-${index}`;
    const slug = q
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    return `faq-${index}-${slug || "item"}`.slice(0, 128);
  });
}
