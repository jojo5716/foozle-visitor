import { v1, v4 } from 'uuid';

export default class Session {
    constructor(window, sessionName = 'foozleVisitor') {
        this.window = window;
        this.sessionName = sessionName;
        this.defaultDaysToExpired = 9999;
    }

    generateSessionHash() {
        return v4();
    }

    generateSessionHashV1() {
        return v1();
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

    getTempSession(key) {
        if (this.sessionStorageEnabled()) {
            return this.window.sessionStorage.getItem(key);
        }
    }

    setTempSession(key, value) {
        if (this.sessionStorageEnabled()) {
            const hashSession = `${this.generateSessionHashV1()}-${value}`;
            this.window.sessionStorage.setItem(key, hashSession);
            return hashSession;
        }
    }

    removeTempSession(key) {
        if (this.sessionStorageEnabled()) {
            this.window.sessionStorage.removeItem(key);
        }
    }

    get_or_create(value) {
        const typeStorager = this.chooseStorager();

        if (typeStorager === 'localStorage') {
            let valueStorage = this.window.localStorage.getItem(this.sessionName);
            if (!valueStorage) {
                valueStorage = value || this.generateSessionHash();
                this.window.localStorage.setItem(this.sessionName, valueStorage);
            }
            return valueStorage;
        } else if (typeStorager === 'cookie') {
            let cookieValue = this.readCookie();

            if (!cookieValue) {
                cookieValue = value || this.generateSessionHash();
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
