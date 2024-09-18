import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class PlayerList extends LitElement {
  static properties = {
    players: { type: Array }
  };

  constructor() {
    super();
    this.players = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPlayers();
  }

  async fetchPlayers() {
    const response = await fetch('http://localhost:3001/api/players');
    this.players = await response.json();
  }

  render() {
    return html`
      <h2>Players Online:</h2>
      <ul>
        ${this.players.map(player => html`
          <li>${player.name} (Level: ${player.level})</li>
        `)}
      </ul>
    `;
  }
}

customElements.define('player-list', PlayerList);
