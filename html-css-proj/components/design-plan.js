class DesignPlan extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="lean-section">
        <div class="container mb-5">
          <div class="row">
            <div class="col-lg-5 col-md-12">
          <h2 class="title-2">Design And Plan Your Business Growth Setup</h2>
              <p class="text-secondary custom-p">
                Use our staff and our expertise to design and plan your business
                growth strategy. Evolo team is eager to advise you on the best
                opportunity that you should look into
              </p>
              <div class="col-lg-12 col-md-12 ps-0">
                <button
                  type="button"
                  class="btn btn-lg rounded-pill custom-button btn-1"
                >
                  LIGHTBOX
                </button>
              </div>
            </div>
            <div class="col-lg-7 col-md-12 text-center">
              <img src="./assets/details-1-office-worker.svg" width="80%" />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row mb-5">
            <div class="col-lg-7 col-md-12 margin-bottom-custm text-center">
              <img src="./assets/details-2-office-team-work.svg" width="80%" />
            </div>
            <div class="col-lg-5 col-md-12 text-block-padding2 design-p">
              <h2 class="title-2 ms-2">
                Search For Optimization Wherever Is Possible
              </h2>
              <div class="col-lg-12 col-md-12">
                <ul
                  class="list-unstyled text-secondary list-font pt-2 check-list"
                >
                  <li class="bi bi-check">
                    Basically we'll teach, step by step what you need to do
                  </li>
                  <li class="bi bi-check">
                    In order to develop company and reach new heights
                  </li>
                  <li class="bi bi-check">
                    Everyone will pleased from stakeholders to employees
                  </li>
                </ul>
                <div class="col-lg-12 col-md-12 ps-0">
                  <button
                    type="button"
                    class="btn btn-lg rounded-pill custom-button btn-1"
                  >
                    LIGHTBOX
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

customElements.define("design-plan-component", DesignPlan);
