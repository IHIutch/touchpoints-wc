import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import resetStyle from './reset.style';

@customElement('touchpoints-yesno')
export class TouchpointsYesNo extends LitElement {
  static css = [
    resetStyle,
    css`@unocss-placeholder`
  ]

  /* 
   ID of the form to submit feedback for
  */
  @property({ attribute: 'form-id' }) formId = '';

  /* 
   Label for the "Yes" button
  */
  @property({ attribute: 'yes-label' }) yesLabel = 'Yes';

  /* 
   Label for the "No" button
  */
  @property({ attribute: 'no-label' }) noLabel = 'No';

  /*
    Current state of the form submission
  */
  @state() private formState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  /*
    Error message to display on submission failure
  */
  @state() private errorMessage: string | null = 'Failed to submit feedback. Please try again later.';


  override render() {
    if (!this.formId) {
      console.warn('form-id attribute is required');
    }

    return html`
      <div class="text-base">
        
          <div ?hidden=${this.formState !== 'success'}>
            <div role="status" class="bg-green-cool-5 border-l-8 border-l-green-cool-40v">
              <div class="py-2 pl-10 pr-4 relative">
                <div class="absolute left-2">
                  <div class="i-material-symbols:check-circle size-6"></div>
                </div>
                <p class="leading-normal">Thank you for your feedback!</p>
              </div>
            </div>
          </div>
          
          <fieldset ?hidden=${this.formState === 'success'}>
            <label class="mb-2 block">Is this page helpful?</label>
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded flex gap-2 items-center cursor-pointer font-bold leading-none px-4 h-10 bg-transparent ring-inset ring-2 focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v ${this.formState === 'submitting' ? 'ring-gray-400 text-gray-400 cursor-not-allowed hover:ring-gray-400 hover:text-gray-400 active:ring-gray-400 active:text-gray-400' : 'text-blue-60v ring-blue-60v hover:ring-blue-warm-70v hover:text-blue-warm-70v active:ring-blue-warm-80v active:text-blue-warm-80v focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v'}"
                @click=${() => this.handleSubmit('1')}
              >
                <slot name="yes-icon">
                  <div class="i-material-symbols:thumb-up-rounded size-5"></div>
                </slot>
                <span>${this.yesLabel}</span>
              </button>
              <button
                type="button"
                class="rounded flex gap-2 items-center cursor-pointer font-bold leading-none px-4 h-10 bg-transparent ring-inset ring-2 focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v ${this.formState === 'submitting' ? 'ring-gray-400 text-gray-400 cursor-not-allowed hover:ring-gray-400 hover:text-gray-400 active:ring-gray-400 active:text-gray-400' : 'text-blue-60v ring-blue-60v hover:ring-blue-warm-70v hover:text-blue-warm-70v active:ring-blue-warm-80v active:text-blue-warm-80v focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v'}"
                @click=${() => this.handleSubmit('0')}
              >
                <slot name="no-icon">
                  <div class="i-material-symbols:thumb-down-rounded size-5"></div>
                </slot>
                <span>${this.noLabel}</span>
              </button>
            </div>
            ${this.formState === 'error'
        ? html`<div>
              <p class="mt-2 text-sm font-bold text-red-60v">${this.errorMessage}</p>
          </div>`
        : ''}
          </fieldset>
      </div>
    `;
  }

  private async handleSubmit(value: '1' | '0') {
    if (this.formState === 'submitting') return;

    this.formState = 'submitting';

    try {
      const response = await fetch(`https://touchpoints.app.cloud.gov/touchpoints/${this.formId}/submissions.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submission: {
            answer_01: value,
            answer_02: location.pathname,
            // 
            referer: location.origin,
            hostname: location.hostname,
            page: location.pathname,
            query_string: location.search,
            location_code: "",
            fba_directive: "",
            language: "en"
          }
        })
      });

      if (response.ok) {
        this.formState = 'success';
      } else {
        this.formState = 'error';
        console.error('Network response was not ok');
      }
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : String(error);
      this.formState = 'error';
      console.error('Error submitting feedback:', error);
    }
  }
}