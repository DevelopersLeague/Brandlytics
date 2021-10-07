import jwt from "jsonwebtoken";
/**
 * @typedef {Object} User
 * @property {number} sub
 * @property {string} username
 * @property {string} firstname
 * @property {string} lastname
 */

export class APIClient {
  /**
   * @typedef {Object} APIClientOptions
   * @property {string} tokenKey
   * @property {string} serverBaseUrl
   */
  /**
   *
   * @param {APIClientOptions} options - options for initialization
   */
  constructor(options) {
    this._tokenKey = options.tokenKey;
    this._serverBaseUrl = options.serverBaseUrl;
    /**@type {string} */
    this._token = null;

    const presetToken = localStorage.getItem(this._tokenKey);
    if (presetToken) {
      this._token = presetToken;
    }
  }

  /**
   * @typedef {Object} LoginOptions
   * @property {string} username
   * @property {string} password
   */
  /**
   * @param {LoginOptions}
   * @returns {Promise<User>}
   */
  async login({ username, password }) {
    const resp = await fetch(`${this._serverBaseUrl}/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await resp.json();
    if (resp.ok) {
      this._token = body.token;
      localStorage.setItem(this._tokenKey, body.token);
      return jwt.decode(body.token);
    } else {
      throw new Error(body.message);
    }
  }

  /**
   * @typedef {Object} SignupOptions
   * @property {string} username
   * @property {string} password
   * @property {string} firstname
   * @property {string} lastname
   */
  /**
   * @param {SignupOptions} options
   * @returns {Promise<User>} user object
   */
  async signup({ username, password, firstname, lastname }) {
    const resp = await fetch(`${this._serverBaseUrl}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password, firstname, lastname }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await resp.json();
    if (resp.ok) {
      this._token = body.token;
      localStorage.setItem(this._tokenKey, body.token);
      return jwt.decode(body.token);
    } else {
      throw new Error(body.message);
    }
  }

  /**
   * @typedef {Object} Tweet
   * @property {string} id
   * @property {string} text
   * @property {string} createdAt
   * @property {string} username
   * @property {string} sentiment
   */

  /**
   * @typedef {Object} SentimentItem
   * @property {string} date
   * @property {number} positive
   * @property {number} negative
   * @property {number} total
   */
  /**
   * @typedef {Object} SentimentReport
   * @property {Array<SentimentItem>} sentiments
   * @property {Object<string,Tweet[]>} examples
   */
  /**
   * @param {string} term search term
   * @returns {Promise<SentimentReport>}
   */
  async getSentiment(term) {
    // term = encodeURIComponent(term);
    const params = new URLSearchParams([["term", term]]);
    const resp = await fetch(
      `${this._serverBaseUrl}/api/v1/sentiment/week?` + params.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const respJson = await resp.json();
    console.log(respJson)
    return respJson;
  }
}
