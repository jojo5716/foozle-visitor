import { v4 } from 'uuid';

export default class Session {
    constructor(window) {
        this.window = window;
        this.sessionName = 'foozleVisitor';
        this.defaultDaysToExpired = 9999;
    }

    generateSessionHash() {
        return v4();
    }

    chooseStorager() {
        let typeStorager;

        if (this.localStorageEnabled()) {
            typeStorager = 'localStorage';
        } else if (this.cookiesIsEnabled()) {
            typeStorager = 'cookie';
        } else if (this.sessionStorageEnabled()) {
            typeStorager = 'session';
        }

        return typeStorager;
    }

    get_or_create() {
        const typeStorager = this.chooseStorager();
        if (typeStorager === 'localStorage') {
            let valueStorage = this.window.localStorage.getItem(this.sessionName);
            if (!valueStorage) {
                valueStorage = this.generateSessionHash();
                this.window.localStorage.setItem(this.sessionName, valueStorage);
            }
            return valueStorage;
        } else if (typeStorager === 'cookie') {
            let cookieValue = this.readCookie();

            if (!cookieValue) {
                cookieValue = this.generateSessionHash();
                this.setCookie(cookieValue);
            }
            return cookieValue;
        }
    }

    setCookie(value) {
        const date = new Date();
        date.setTime(date.getTime() + (this.defaultDaysToExpired * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;

        this.window.document.cookie = `${this.sessionName}=${value};${expires};path=/`;
    }

    readCookie() {
        const cookie = this.window.document.cookie.match(new RegExp(this.sessionName + '=([^;]+)'));
        let cookieValue;
        if (cookie) {
            cookieValue = cookie[1];
        }
        return cookieValue;
    }

    localStorageEnabled() {
        let isEnabled = false;

        if (this.window && this.window.localStorage) {
            isEnabled = true;
        }
        return isEnabled;
    }

    sessionStorageEnabled() {
        let isEnabled = false;

        if (this.window && this.window.sessionStorage) {
            isEnabled = true;
        }
        return isEnabled;
    }

    cookiesIsEnabled() {
        let cookiesEnabled = false;

        if (window.navigator) {
            cookiesEnabled = window.navigator.cookieEnabled;
        } else if (document.cookie) {
            if (document.cookie.length > 0) {
                cookiesEnabled = true;
            } else {
                document.cookie = 'test';
                cookiesEnabled = document.cookie.indexOf.call(document.cookie, 'test') > -1;
            }
        }
        return cookiesEnabled;
    }
}
