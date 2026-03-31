class Pricing extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="lean-section" id="pricing">
        <div class="container mb-5">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2 class="title-2">Multiple Pricing Options</h2>
              <p class="service-para text-secondary">
                We've prepared pricing plans for all budgets so you can get
                Started right away. They are great for small companies and large
                organizations
              </p>
            </div>
          </div>
          <div class="row g-4 mb-5">
            <div class="col-lg-4 col-md-12">
              <div style="display: flex; flex-direction: column">
                <div>
                  <div class="card h-100">
                    <div class="text-center mx-auto">
                      <h4 class="pt-3"><b>STARTER</b></h4>
                      <p class="text-secondary list-font">
                        Just to see what can be achieved
                      </p>
                      <hr />
                    </div>

                    <div class="pricing-card-body text-center">
                      <h1
                        class="card-title pricing-card-title text-center h1-custom"
                      >
                        <sup>$</sup><b>199</b>
                      </h1>
                      <p class="text-secondary text-center">monthly</p>
                      <hr />
                      <ul
                        class="list-unstyled text-secondary text-left list-font"
                      >
                        <li class="bi bi-check">Improve Your Email Marketing</li>
                        <li class="bi bi-check">User And Admin Rights Control</li>
                        <li class="bi bi-x">List Building and Cleaning</li>
                        <li class="bi bi-x">Collected Data Management</li>
                        <li class="bi bi-x">More Planning and Evaluation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="btn-set">
                  <button
                    class="btn btn-lg rounded-pill custom-button starter-button btn-2"
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div style="display: flex; flex-direction: column">
                <div>
                  <div class="card h-100">
                    <div class="text-center mx-auto">
                      <h4 class="pt-3"><b>MEDIUM</b></h4>
                      <p class="text-secondary list-font">
                        Very appropriate for the short term
                      </p>
                      <hr />
                    </div>

                    <div class="pricing-card-body text-center">
                      <h1
                        class="card-title pricing-card-title text-center h1-custom"
                      >
                        <sup>$</sup><b>299</b>
                      </h1>
                      <p class="text-secondary text-center">monthly</p>
                      <hr />
                      <ul
                        class="list-unstyled text-secondary text-left list-font"
                      >
                        <li class="bi bi-check">Improve Your Email Marketing</li>
                        <li class="bi bi-check">User And Admin Rights Control</li>
                        <li class="bi bi-check">List Building and Cleaning</li>
                        <li class="bi bi-check">Collected Data Management</li>
                        <li class="bi bi-x">More Planning and Evaluation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="btn-set">
                  <button
                    class="btn btn-lg rounded-pill custom-button starter-button"
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div style="display: flex; flex-direction: column">
                <div>
                  <div class="card h-100">
                    <div class="text-center mx-auto">
                      <h4 class="pt-3"><b>COMPLETE</b></h4>
                      <p class="text-secondary list-font">
                        Must have for large companies
                      </p>
                      <hr />
                    </div>

                    <div class="pricing-card-body text-center">
                      <h1
                        class="card-title pricing-card-title text-center h1-custom"
                      >
                        <sup>$</sup><b>399</b>
                      </h1>
                      <p class="text-secondary text-center">monthly</p>
                      <hr />
                      <ul
                        class="list-unstyled text-secondary text-left list-font"
                      >
                        <li class="bi bi-check">Improve Your Email Marketing</li>
                        <li class="bi bi-check">User And Admin Rights Control</li>
                        <li class="bi bi-check">List Building and Cleaning</li>
                        <li class="bi bi-check">Collected Data Management</li>
                        <li class="bi bi-check">More Planning and Evaluation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="btn-set">
                  <button
                    class="btn btn-lg rounded-pill custom-button starter-button"
                  >
                    Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("pricing-component", Pricing);
