class TrustedCustomers extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="Trusted-customer lean-section">
        <h4 class="text-center title-2 mb-4">Trusted By</h4>
        <div class="container mb-5">
          <div class="flexitems">
            <div class="flexitem">
              <img src="./assets/customer-logo-1.png" />
            </div>
            <div class="flexitem">
              <img src="./assets/customer-logo-2.png" />
            </div>
            <div class="flexitem">
              <img src="./assets/customer-logo-3.png" />
            </div>
            <div class="flexitem">
              <img src="./assets/customer-logo-4.png" />
            </div>
            <div class="flexitem">
              <img src="./assets/customer-logo-5.png" />
            </div>
            <div class="flexitem">
              <img src="./assets/customer-logo-6.png" />
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("trusted-customers-component", TrustedCustomers);
