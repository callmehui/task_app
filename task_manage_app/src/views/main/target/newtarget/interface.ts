export type TimingUnitText = '天' | '月' | '年';
export type TimingUnitValue = 'day' |'month' | 'year';

export interface TargetTimingUnit {
  text: TimingUnitText; /** 目标时限的单位，配置目标时限的值使用 */
  value: TimingUnitValue;
}

interface TargetFormCompletionItem {
  id?: string; /** 达成情况记录id，创建时候为空 */
  value: string; /** 达成情况显示值，如：60%、100% */
  desc: string; /** 达成情况显示值的描述，如：合格、大奖 */
  type?: 'reached' | 'overReached' | 'unreached'; /** 达成情况类型：'达成目标'、'超出目标'、'不达标' */
  rewardAndPunishDesc: string; /** 达成情况的奖励或者惩罚的描述 */
}

interface TargetFormCompletionWrapItem {
  type: 'reached' | 'overReached' | 'unreached'; /** 达成情况类型：'达成目标'、'超出目标'、'不达标' */
  value: TargetFormCompletionItem[];
}

export interface TargetForm { 
  id?: string; /** 目标id，创建的时候为空 */
  name: string; /** 目标名称，简单描述目标，15字以内 */
  desc: string; /** 目标描述，目标的具体描述，需要详细且具体 */
  timingValue: number; /** 目标时限的值，配合目标时限的单位使用 */
  timingUnit: TimingUnitValue; /** 目标时限的单位，配置目标时限的值使用 */
  completions: TargetFormCompletionItem[]; /** 任务达成情况设定 */
  modifyTime: number; /** 目标的可修改次数 */
  isShelve: boolean; /** 是否搁置当前目标 */
}