import { TargetForm } from "./interface";

/**
 * 校验表单中的目标时限的值
 * @param formRef 表单的ref
 */
export const validateTimingValue = (formRef: any) => {
  return (
    _rule: any,
    value: any,
    callback: (error: string | string[] | void | Error) => void
  ) => {
    const formModel: TargetForm = formRef.value.model;
    if (value === "") {
      callback(new Error("请输入目标时限"));
    } else {
      if (formModel.timingUnit === "day") {
        if (value > 90) {
          callback(new Error("设定目标时限的天数不得超过90"));
        } else if (value <= 0) {
          callback(new Error("设定目标时限的天数不得小于1"));
        } else {
          callback();
        }
      } else if (formModel.timingUnit === "month") {
        if (value > 3) {
          callback(new Error("设定目标时限的月数不得超过6"));
        } else if (value <= 0) {
          callback(new Error("设定目标时限的月数不得小于1"));
        } else {
          callback();
        }
      } else if (formModel.timingUnit === "year") {
        if (value > 3) {
          callback(new Error("设定目标时限的年数不得超过3"));
        } else if (value <= 0) {
          callback(new Error("设定目标时限的年数不得小于1"));
        } else {
          callback();
        }
      }
    }
  };
};

/**
 * 校验表单中的目标时限的显示文本
 * @param formRef 表单的ref
 */
export const validateTimingUnit = (formRef: any) => {
  return (
    _rule: any,
    value: any,
    callback: (error: string | string[] | void | Error) => void
  ) => {
    formRef.value?.validateField("timingValue");
    callback();
  };
};

/**
 * 达成情况百分比数字的校验
 * @param _rule
 * @param value 校验字段的当前值
 * @param callback
 */
export const validateCompletionValue = (
  _rule: any,
  value: any,
  callback: (error: string | string[] | void | Error) => void
) => {
  if (!value) {
    callback(new Error("请输入达成情况百分比数字"));
  } else if (value > 100 || value < 0) {
    callback(new Error("达成情况百分比必须在在0-100"));
  } else {
    callback();
  }
};

/**
 * 可修改次数的校验
 * @param _rule
 * @param value 校验字段的当前值
 * @param callback
 */
export const validateModifyTime = (
  _rule: any,
  value: any,
  callback: (error: string | string[] | void | Error) => void
) => {
  if (!value) {
    callback(new Error("请输入可修改次数"));
  } else if (value > 10) {
    callback(new Error("可修改次数不得超过10次"));
  } else if (value < 0) {
    callback(new Error("可修改次数不得小于0"));
  } else {
    callback();
  }
};
