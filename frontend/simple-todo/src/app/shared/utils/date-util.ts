export class DateUtil {
  static formatDate(date: Date): string {
    return date.toISOString();
  }

  static calculateExpirationTime(expiresIn: number): number {
    const currentDateTime = new Date();
    const expirationTime = new Date(
      currentDateTime.getTime() + expiresIn * 1000
    ); // Convert expiresIn from seconds to milliseconds
    return expirationTime.getTime();
  }

  static isExpired(expirationTime: number): boolean {
    const currentDateTime = new Date();
    return currentDateTime.getTime() > expirationTime;
  }
}
