/**
 * Created by zhaoyu on July 10, 2017.
 * @flow
 */
import moment from "moment";
import "moment/locale/zh-cn.js";

moment.locale("zh-cn");

export default class DateTimeHelper {
  static getDateTimeString(date: string): string {
    return moment(date).format("YYYY-MM-DD hh:mm:ss");
  }

  static getDateString(date) {
    return moment(date).format("YYYY-MM-DD");
  }
  static dateTimeSorter(dateA: string, dateB: string) {
    if (moment(dateA).isBefore(dateB)) {
      return -1;
    } else if (moment(dateA).isAfter(dateB)) {
      return 1;
    }
    return 0;
  }

  static nowIsBetweenDatetimes(dateA: string, dateB: string): boolean {
    return moment(dateA).isBefore(moment()) && moment(dateB).isAfter(moment());
  }

  static getCurrentYear(): number {
    return moment().year();
  }

  static getCurrentMonth(): number {
    return moment().month();
  }

  static getCurrentDay(): number {
    return moment().date();
  }

  static getCurrentDate(): string {
    return moment().format("YYYY年MMMDo");
  }

  static getCurrentWeekday(): string {
    return moment().format("dddd");
  }

  static getCurrentDateAndWeekday(): string {
    return moment().format("YYYY年MMMDo dddd");
  }

  static getCurrentTime(): string {
    console.log(moment().format("A HH:mm:ss"));
    return moment().format("A HH:mm:ss");
  }

  static getCurrentDateTime(): string {
    console.log(moment().format("llll"));
    return moment().format("llll");
  }

  static getDateTime(datetime: string): string {
    if (!datetime) {
      return moment();
    }
    console.log(moment(datetime));
    return moment(datetime);
  }

  static getDaysInMonth(year: number, month: number): number {
    return moment([year, month]).daysInMonth();
  }

  static convertDateTimeToString(
    dateTime: Object,
    zero: boolean = false
  ): string {
    const tempDate = new Date(dateTime);
    const seconds = zero ? "00" : this.doubleDigitize(tempDate.getSeconds());
    return `${tempDate.getFullYear()}-${this.doubleDigitize(
      tempDate.getMonth() + 1
    )}-${this.doubleDigitize(tempDate.getDate())} ${this.doubleDigitize(
      tempDate.getHours()
    )}:${this.doubleDigitize(tempDate.getMinutes())}:${seconds}`;
  }

  static doubleDigitize(number: number): string {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  }

  static isBeforeCurrent(datetime: string): boolean {
    return moment(datetime).isBefore(moment());
  }

  static isAfterCurrent(datetime: string): boolean {
    return moment(datetime).isAfter(moment());
  }

  static isEarlyThan(datetime: string, datetime2: ?string): boolean {
    if (datetime2) {
      return moment(datetime).isBefore(moment(datetime2));
    }
    return moment(datetime).isBefore(moment());
  }

  static isLateThan(datetime: string, datetime2: string): boolean {
    if (datetime2) {
      return moment(datetime).isAfter(moment(datetime2));
    }
    return moment(datetime).isAfter(moment());
  }

  static fromSecondsToMinutesAndSeconds(seconds: ?number): string {
    if (!seconds) {
      return "0分钟0秒";
    }
    return `${parseInt(seconds / 60)}分钟${parseInt(seconds % 60)}秒`;
  }

  static lllFormat(datetime: string = ""): string {
    if (datetime.length === 0) {
      return moment().format("lll");
    }
    return moment(datetime).format("lll");
  }
}
