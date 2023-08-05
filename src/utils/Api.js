class Api {
  constructor(baseUrl, header) {
    this.baseUrl = baseUrl;
    this.header = header;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.header,
    }).then((res) => this._checkResponse(res));
  }

  getCard() {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.header,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  editProfile(userData) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(card) {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      headers: this.header,
      body: JSON.stringify(card),
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.header,
    }).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.header,
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    }
    return this.addLike(cardId);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this.header,
    }).then((res) => this._checkResponse(res));
  }
}
export default new Api("https://nomoreparties.co/v1/cohort-68/", {
  authorization: "6eb5f56d-c7f7-420d-b711-710bf1c16703",
  "Content-Type": "application/json",
});
