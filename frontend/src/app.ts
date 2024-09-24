import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// TODO: I don't like this
const apiUrl = (import.meta as unknown as ImportMeta).env.VITE_API_URL || '/api';

interface Player {
  name: string;
  level: number;
}

class PlayerList extends LitElement {
  // Keeping @property for potential future fixes, though we rely on requestUpdate for now
  // @ts-ignore -- TODO: Let's fix this later - some kind of overload issue
  @property({ type: Array }) players: Player[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.fetchPlayers();
  }

  async fetchPlayers() {
    try {
      const response = await fetch(`${apiUrl}/players`);
      console.log(apiUrl);
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
