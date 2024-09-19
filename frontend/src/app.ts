import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

interface Player {
  name: string;
  level: number;
}

class PlayerList extends LitElement {
  // Keeping @property for potential future fixes, though we rely on requestUpdate for now
  @property({ type: Array }) players: Player[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.fetchPlayers();
  }

  async fetchPlayers() {
    try {
      const response = await fetch('http://localhost:3001/api/players');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.players = data;
      this.requestUpdate();  // Force re-render
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
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
