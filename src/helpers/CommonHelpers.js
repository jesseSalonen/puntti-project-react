import i18n from "../translations/i18n";
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';
import { sortingFns } from '@tanstack/react-table';

class CommonHelpers {
  static getTimeText(timeObject) {
    // options for datetime formatting
    const options = { hour: "numeric", minute: "numeric" };

    return i18n.t("intlDateTime", {
      val: timeObject,
      formatParams: {
        val: options,
      },
      ns: "common",
    });
  }

  static getDateTimeText(dateTimeObject) {
    // options for datetime formatting
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return i18n.t("intlDateTime", {
      val: dateTimeObject,
      formatParams: {
        val: options,
      },
      ns: "common",
    });
  }

  static getAuthHeader(token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static fuzzySort(rowA, rowB, columnId) {
    let dir = 0;
    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]?.itemRank,
        rowB.columnFiltersMeta[columnId]?.itemRank,
      );
    }
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
  }
}

export default CommonHelpers;
