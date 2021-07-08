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

  paginate(data: any, page: number, limit: number) {
    const { count: total, rows: docs } = data;
    const currentPage = page || 1;
    const pages = Math.ceil(total / limit);
    const perPage = limit;

    return { total, docs, pages, perPage, currentPage };
  }

  getPagination(page: number, size: number) {
    const limit = size || 10;
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
  }

  sumAddonsPrice(arr) {
    return arr.map((addon) => +addon.price).reduce((a, b) => a + b, 0);
  }
}
