type QueryParameters = Record<string, unknown>;

/**
 * Serialize provider wire parameters onto an already constructed endpoint.
 * Only undefined is omitted; every other value is represented as a string.
 */
export const makeUrlWithQuery = (
  endpoint: string,
  parameters: QueryParameters,
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(parameters)) {
    if (value !== undefined) searchParams.set(key, String(value));
  }

  return `${endpoint}?${searchParams.toString()}`;
};
