export async function fetchProductRanking(targetType: string = 'ALL', rankType: string = 'MANY_WISH') {
  const params = new URLSearchParams({ targetType, rankType });
  const res = await fetch(`/api/products/ranking?${params.toString()}`);
  const json = await res.json();

  if (!res.ok || !Array.isArray(json.data)) {
    throw new Error('Invalid response from /api/products/ranking');
  }
  return json.data as import('../type').Product[];
}