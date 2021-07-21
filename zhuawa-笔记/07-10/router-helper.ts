import router, { RoutePath } from "./route";

type BaseRouteType = Record<string, string | number>;

interface IndexParam extends BaseRouteType {
  title: string;
}

interface HomeParam extends BaseRouteType {
  width: number;
}

interface AboutParam extends BaseRouteType {}

interface QueryMap {
  [RoutePath.Index]: IndexParam;
  [RoutePath.Home]: HomeParam;
  [RoutePath.About]: AboutParam;
}

export class RouterHelper {
  public static push<T extends RoutePath>(routePath: T, params: QueryMap[T]) {
    router.push({ path: routePath, query: params });
  }

  public static replace<T extends RoutePath>(
    routePath: T,
    params: QueryMap[T]
  ) {
    router.replace({ path: routePath, query: params });
  }
}
