class Services extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="lean-section">
        <div class="container mb-5">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2 class="title-2">Bussiness Growth Services</h2>
              <p class="service-para text-secondary custom-p">
                We serve small and medium sized companies in all tech related
                industries with high quality growth services which are presented
                below
              </p>
            </div>
          </div>
          <div class="row g-4">
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="card">
                <div class="card-setting mx-auto">
                  <img
                    src="./assets/services-icon-1.svg"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title"><b>Market Analysis</b></h5>
                  <p class="card-text text-secondary">
                    Our team of enthusiastic marketers will analyse how your
                    company stacks against the closest competitors
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="card">
                <div class="card-setting mx-auto">
                  <img
                    src="./assets/services-icon-2.svg"
                    class="card-img-top"
                    alt="..."
                  />
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title"><b>Oppotunity Scan</b></h5>
                  <p class="card-text text-secondary">
                    Once the market analysis process is completed our staff will
                    search for opportunities that are in reach
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="card">
                <div class="card-setting mx-auto">
                  <img
                    src="./assets/services-icon-3.svg"
                    class="card-img-top card-img-size"
                    alt="..."
                  />
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title"><b>Action Plan</b></h5>
                  <p class="card-text text-secondary">
                    With all the information in place you will be presented with
                    an action plan that your company needs to follow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("services-component", Services);
