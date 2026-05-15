const PLANNER_CODE = '516100';

export function validatePlannerAccess(request: { headers: { get(name: string): string | null } }): boolean {
  const code = request.headers.get('x-access-code');
  return code === PLANNER_CODE;
}
