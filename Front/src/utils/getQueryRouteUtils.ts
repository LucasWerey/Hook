import { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * Retrieves a query parameter from the route.
 *
 * @param route - The route object.
 * @param parameterName - The name of the query parameter.
 * @returns The value of the query parameter.
 */
export function getQueryParameter(
  route: RouteLocationNormalizedLoaded,
  parameterName: string
): string | string[] {
  const queryParam = route.query[parameterName]
  return queryParam !== null ? (Array.isArray(queryParam) ? queryParam.toString() : queryParam) : ''
}
