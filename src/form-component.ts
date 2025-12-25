import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// @ts-expect-error
import reset from '@unocss/reset/tailwind-v4.css?raw'

@customElement('form-component')
export class FormComponent extends LitElement {
  @property({ attribute: 'form-id' }) formId = '';
  @property({ attribute: 'yes-label' }) yesLabel = 'Yes';
  @property({ attribute: 'no-label' }) noLabel = 'No';
  @state() private formState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';


  static styles = css`
    ${unsafeCSS(reset)}
    @unocss-placeholder
  `

  render() {
    if (!this.formId) {
      console.warn('form-id attribute is required');
    }

    return html`
      <div>
        
          <div class=${this.formState !== 'success' ? 'hidden' : ""}>
            <div role="status" class="@container bg-green-cool-5 border-l-8 border-l-green-cool-40v">
              <div class="py-2 pl-10 pr-4 relative">
                <div class="absolute left-2">
                  <div class="i-material-symbols:check-circle size-6"></div>
                </div>
                <p class="leading-normal">Thank you for your feedback!</p>
              </div>
            </div>
          </div>
          
          <div class=${(this.formState === 'success' || this.formState === 'error') ? 'hidden' : ""}>
            <div class="text-lg font-bold mb-2">Is this page helpful?</div>
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded cursor-pointer font-bold leading-none text-blue-60v px-5 py-3 bg-transparent ring-inset ring-2 ring-blue-60v hover:ring-blue-warm-70v hover:text-blue-warm-70v active:ring-blue-warm-80v active:text-blue-warm-80v focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v"
                @click=${() => this.handleSubmit('yes')}
              >
                ${this.yesLabel}
              </button>
              <button
                type="button"
                class="rounded cursor-pointer font-bold leading-none text-blue-60v px-5 py-3 bg-transparent ring-inset ring-2 ring-blue-60v hover:ring-blue-warm-70v hover:text-blue-warm-70v active:ring-blue-warm-80v active:text-blue-warm-80v focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v"
                @click=${() => this.handleSubmit('no')}
              >
                ${this.noLabel}
              </button>
            </div>
          </div>
      </div>
    `;
  }

  private async handleSubmit(feedback: 'yes' | 'no') {
    if (this.formState === 'submitting') return;

    this.formState = 'submitting';

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback
        })
      });

      if (response.ok) {
        this.formState = 'success';
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  }
}