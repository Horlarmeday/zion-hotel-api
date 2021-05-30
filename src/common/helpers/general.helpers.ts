import { uuid } from 'uuidv4';

export class GeneralHelpers {
  generateRandomNumbers(length: number) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  }

  addHours(hour: number) {
    const now = new Date();
    return now.setHours(hour);
  }

  generateRandomCharacters(length: number) {
    const uniq = uuid();
    return uniq.substr(uniq.length - length).toUpperCase();
  }
}
