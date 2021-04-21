function isPointsEq(a1: any, a2: any, isAlignPoint: boolean) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}

export function getAlignFromPlacement(builtinPlacements: any, placementStr: string, align: any) {
  const baseAlign = builtinPlacements[placementStr] || {};
  return {
    ...baseAlign,
    ...align,
  };
}

export function getAlignPopupClassName(builtinPlacements: any, prefixCls: string, align: any, isAlignPoint: boolean) {
  const { points } = align;
  for (const placement in builtinPlacements) {
    if (builtinPlacements.hasOwnProperty(placement)) {
      if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
        return `${prefixCls}-placement-${placement}`;
      }
    }
  }
  return '';
}
// eslint-disable-next-line no-empty-function
export function noop() {}
