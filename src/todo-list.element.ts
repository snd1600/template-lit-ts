import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type TodoItem = { text: string; checked: boolean };

@customElement('todo-list')
export class TodoListElement extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: Array })
  items: TodoItem[] = [];

  protected createRenderRoot(): ShadowRoot | Element {
    return this;
  }

  protected render(): TemplateResult {
    return html`
      <div
        class="
          mx-auto rounded-md overflow-hidden
          w-full min-w-360px max-w-screen-md shadow-lg
        "
      >
        ${this._inputTemplate()}
        <ul>
          ${this.items.map((item) => this._itemTemplate(item))}
        </ul>
        <div class="bg-primary-500 h-12px"></div>
      </div>
    `;
  }
  private _inputTemplate() {
    return html`
      <div
        class="
          bg-primary-500 p-16px
          flex flex-col items-center
        "
      >
        <div class="text-light-500 text-3xl font-semibold">${this.title}</div>
        <div class="h-12px"></div>
        <div
          class="
            mx-12px w-full h-40px overflow-hidden
            flex flex-row justify-center
          "
        >
          <input
            aria-label="Add todo item"
            class="
              flex-grow px-12px rounded-l-md
              focus:(outline-none border-secondary-500 border-2)
            "
            type="text"
            placeholder="Add your new todo"
            @keydown=${(ev: KeyboardEvent) => {
              if (ev.key === 'Enter') {
                this._onItemAdd(ev);
              }
            }}
          />
          <button
            aria-label="Add todo item"
            class="
              bg-dark-500 bg-opacity-40 active:bg-opacity-30
              w-56px text-light-500 text-3xl font-bold
              rounded-r-md focus:(outline-none border-none)
              flex flex-col justify-center items-center
            "
            @click=${this._onItemAdd}
          >
            <div class="icon-math-plus"></div>
          </button>
        </div>
      </div>
    `;
  }

  private _itemTemplate(item: TodoItem) {
    return html`
      <li
        class="
          flex flex-row items-center
          bg-blue-gray-100 even:bg-blue-gray-200 w-full h-40px
        "
        @click=${() => {
          item.checked = !item.checked;
          this.requestUpdate();
        }}
      >
        <div
          class="
            mx-12px icon-check-o
            ${item.checked ? 'text-green-500' : 'text-gray-400'}
          "
        ></div>
        <div
          aria-label="Todo item"
          class="
            flex-grow text-xl hover:cursor-pointer
            ${item.checked ? 'line-through' : 'no-underline'}
            underline-dark-500 underline-opacity-70 underline-2
          "
        >
          ${item.text}
        </div>
        <button
          aria-label="Remove todo item"
          class="
            mx-12px
            flex justify-center items-center
            w-32px h-32px rounded-full
            bg-dark-500 bg-opacity-0 active:bg-opacity-20
            active:outline-none focus:outline-none
          "
          @click=${(ev: Event) => {
            ev.stopPropagation();
            this._onItemRemove(item);
          }}
        >
          <div class="transform rotate-45">
            <div class="icon-math-plus top-1px"></div>
          </div>
        </button>
      </li>
    `;
  }

  private _onItemAdd(_ev: Event) {
    const input = this.renderRoot.querySelector('input');
    const text = input?.value.trim();

    if (input && text) {
      input.value = '';
      this.items.push({ text, checked: false });
      this.requestUpdate();
    }
    input?.focus();
  }

  private _onItemRemove(item: TodoItem) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.requestUpdate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoListElement;
  }
}
