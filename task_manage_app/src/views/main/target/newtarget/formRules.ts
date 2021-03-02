import { validateCompletionValue } from "./validator";

export const completionRules = {
  value: [
    {
      validator: validateCompletionValue,
      trigger: ["blur", "change"],
    },
  ],
  desc: [
    {
      required: true,
      message: "请输入达成情况描述(15字以内)",
      trigger: "blur",
    },
    {
      min: 0,
      max: 15,
      message: "达成情况描述必须在15字以内",
      trigger: "blur",
    },
  ],
  rewardAndPunishDesc: [
    {
      required: true,
      message: "请输入奖惩情况描述(20字以内)",
      trigger: "blur",
    },
    {
      min: 0,
      max: 20,
      message: "奖惩情况必须在20字以内",
      trigger: "blur",
    },
  ],
};
