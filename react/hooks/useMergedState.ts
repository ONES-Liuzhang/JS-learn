import React from "react";

interface StateOptions<T> {
  value: T;
  defaultValue?: T;
}

enum VALUE_TYPE {
  INNER = "INNER",
  PROP = "PROP",
}

/**
 * 受控参数状态合并的简单实现（未测试）
 * @param value
 * @param options
 * @returns
 */
export function useMergedState<T>(value: T, options: StateOptions<T>) {
  const { value: propValue, defaultValue } = options;
  const [mergedValue, setMergedValue] = React.useState(() => {
    const propValue = value ?? defaultValue;
    if (propValue) {
      return [propValue, VALUE_TYPE.PROP];
    }

    return [value, VALUE_TYPE.INNER];
  });

  React.useEffect(() => {
    if (propValue !== undefined) {
      setMergedValue([mergedValue, VALUE_TYPE.PROP]);
    }
  }, [propValue]);

  const updateMergedValue = React.useCallback((curr) => {
    // setValue 当返回值没变时是否会触发 rerender？
    // pre: inner  curr: inner => curr inner
    // pre: inner  curr: prop => curr prop
    // pre: prop   curr: inner => pre prop 👈
    // pre: prop   curr: prop => curr prop
    setMergedValue((pre) => {
      const [preValue, preValueType] = pre;
      const [_, currValueType] = curr;

      if (preValueType === VALUE_TYPE.PROP && currValueType === VALUE_TYPE.INNER) {
        return [preValue, VALUE_TYPE.PROP];
      }

      return curr;
    });
  }, []);

  return [mergedValue, updateMergedValue];
}
