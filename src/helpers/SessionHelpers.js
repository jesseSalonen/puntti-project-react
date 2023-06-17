import { SESSION } from "./constants";

class SessionHelpers {
  static saveTheme(selectedTheme) {
    localStorage.setItem(SESSION.theme, selectedTheme);
  }

  static getTheme() {
    return localStorage.getItem(SESSION.theme) ?? "";
  }
}

export default SessionHelpers;
