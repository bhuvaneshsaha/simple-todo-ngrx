import moment from 'moment';

export class DateUtil {
  static formatDate(date: Date): string {
    return date.toISOString();
  }

  static currentDate(): Date {
    return moment().toDate();
  }

  static addSeconds(date: Date, seconds: number): Date {
    return moment(date).add(seconds, 'seconds').toDate();
  }

  static addSecondsToCurrentDate(seconds: number): Date {
    return moment().add(seconds, 'seconds').toDate();
  }
}
