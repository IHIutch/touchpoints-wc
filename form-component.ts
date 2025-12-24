export class FormComponent extends HTMLElement {
  private successMessage: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['yes-text', 'no-text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
      this.setupEventListeners();
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const yesText = this.getAttribute('yes-text') || 'Yes';
    const noText = this.getAttribute('no-text') || 'No';

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        
        .question {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }
        
        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
        }
        
        button {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          min-width: 80px;
          transition: background-color 0.2s ease;
        }
        
        .yes-btn {
          background-color: #28a745;
          color: white;
        }
        
        .yes-btn:hover {
          background-color: #218838;
        }
        
        .no-btn {
          background-color: #dc3545;
          color: white;
        }
        
        .no-btn:hover {
          background-color: #c82333;
        }
        
        .success-message {
          margin-top: 15px;
          padding: 10px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 4px;
          display: none;
        }
        
        .loading {
          opacity: 0.7;
          pointer-events: none;
        }
      </style>
      
      <div class="container">
        <div class="question">Was this page helpful?</div>
        
        <div class="button-group">
          <button type="button" class="yes-btn" id="yes-btn">${yesText}</button>
          <button type="button" class="no-btn" id="no-btn">${noText}</button>
        </div>
        
        <div class="success-message" id="success-message">
          Thank you for your feedback!
        </div>
      </div>
    `;
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    this.successMessage = this.shadowRoot.getElementById('success-message') as HTMLDivElement;

    const yesBtn = this.shadowRoot.getElementById('yes-btn');
    const noBtn = this.shadowRoot.getElementById('no-btn');

    yesBtn?.addEventListener('click', () => this.handleSubmit('yes'));
    noBtn?.addEventListener('click', () => this.handleSubmit('no'));
  }

  private async handleSubmit(feedback: 'yes' | 'no') {
    if (!this.shadowRoot) return;

    const container = this.shadowRoot.querySelector('.container');
    container?.classList.add('loading');
    this.successMessage?.style.setProperty('display', 'none');

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
        this.showSuccessMessage();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      container?.classList.remove('loading');
    }
  }

  private showSuccessMessage() {
    if (this.successMessage) {
      this.successMessage.style.display = 'block';
      setTimeout(() => {
        if (this.successMessage) {
          this.successMessage.style.display = 'none';
        }
      }, 3000);
    }
  }
}

customElements.define('form-component', FormComponent);