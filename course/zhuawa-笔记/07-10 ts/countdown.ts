import { EventEmitter } from "eventemitter3";

/** 倒计时状态 */
enum CountdownStatus {
  running,
  paused,
  stoped,
}

/** 倒计时事件名称 */
export enum CountdownEventName {
  RUNNING = "running",
  START = "start",
  STOP = "stop",
}

export interface RemainTimeData {
  days: number;
  hours: number;
  minutes: number;
  second: number;
  count: number;
}

interface CountdownEventMap {
  [CountdownEventName.START]: [];
  [CountdownEventName.STOP]: [];
  [CountdownEventName.RUNNING]: [RemainTimeData, number];
}

export class Countdown extends EventEmitter<CountdownEventMap> {
  private static COUNT_IN_MILLSECOND: number = 1 * 100;
  private static SECOND_IN_MILLSECOND: number =
    10 * Countdown.COUNT_IN_MILLSECOND;
  private static MINUTES_IN_MILLSECOND: number =
    60 * Countdown.SECOND_IN_MILLSECOND;
  private static HOUR_IN_MILLSECOND: number =
    60 * Countdown.MINUTES_IN_MILLSECOND;
  private static DAY_IN_MILLSECOND: number = 24 * Countdown.HOUR_IN_MILLSECOND;

  private endTime: number;
  private step: number;
  private status: CountdownStatus = CountdownStatus.stoped;
  private remainTime = 0; // 剩余时间

  constructor(endTime, step) {
    super();

    this.endTime = endTime;
    this.step = step;
    this.start();
  }

  start() {
    this.emit(CountdownEventName.START);
    this.status = CountdownStatus.running;
    this.countdown();
  }

  stop() {
    this.emit(CountdownEventName.STOP);
    this.status = CountdownStatus.paused;
  }

  /** 倒计时逻辑 */
  countdown() {
    if (this.status !== CountdownStatus.running) return;

    this.remainTime = Math.max(this.endTime - Date.now(), 0);
    if (this.remainTime > 0) {
      setTimeout(() => {
        this.emit(
          CountdownEventName.RUNNING,
          this.formatRemainData(this.remainTime),
          this.remainTime
        );
        this.countdown();
      }, this.step);
    } else {
      this.emit(CountdownEventName.STOP);
      this.status = CountdownStatus.stoped;
    }
  }

  formatRemainData(remainTime: number): RemainTimeData {
    let time = remainTime;

    const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND);
    time = time % Countdown.DAY_IN_MILLSECOND;

    const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND);
    time = time % Countdown.HOUR_IN_MILLSECOND;

    const minutes = Math.floor(time / Countdown.MINUTES_IN_MILLSECOND);
    time = time % Countdown.MINUTES_IN_MILLSECOND;

    const second = Math.floor(time / Countdown.SECOND_IN_MILLSECOND);
    time = time % Countdown.SECOND_IN_MILLSECOND;

    const count = Math.floor(time / Countdown.COUNT_IN_MILLSECOND);
    time = time % Countdown.COUNT_IN_MILLSECOND;

    return {
      days,
      hours,
      minutes,
      second,
      count,
    };
  }
}
