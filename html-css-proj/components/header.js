class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="title" id="header">
        <div class="container-fluid mb-5">
          <div class="m-5 mt-0">
            <nav class="navbar navbar-expand-md navbar-light">
              <a class="navbar-brand" href="#">
                <img src="assets/logo.svg" alt="logo-img" class="nav-logo" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponse">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#header">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#services">Service</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#pricing">Pricing</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#request">Request</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link nav-text"
                      href="#about"
                      >About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#contact">Contact</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-item nav-link"
                      ><svg
                        class="svg-inline--fa fa-facebook small-icons"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                        ></path></svg
                    ></a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-item nav-link"
                      ><svg
                        class="svg-inline--fa fa-google-plus small-icons"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google-plus"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M256,8C119.1,8,8,119.1,8,256S119.1,504,256,504,504,392.9,504,256,392.9,8,256,8ZM185.3,380a124,124,0,0,1,0-248c31.3,0,60.1,11,83,32.3l-33.6,32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9,0-77.2,35.5-77.2,78.1S142.3,334,185.3,334c32.6,0,64.9-19.1,70.1-53.3H185.3V238.1H302.2a109.2,109.2,0,0,1,1.9,20.7c0,70.8-47.5,121.2-118.8,121.2ZM415.5,273.8v35.5H380V273.8H344.5V238.3H380V202.8h35.5v35.5h35.2v35.5Z"
                        ></path></svg
                    ></a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div class="Title-container mb-5">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12 text-left">
              <h1 class="title-2 h1-custom title-padding title-heading">
                StartUp Landing
                <span class="text-dark">Page Template Free</span>
              </h1>
              <p class="text-secondary title-padding custom-p">
                Use Evolo free landing page template to promote your business
                startup and generate leads for the offered services
              </p>
              <div class="col-lg-12 head-btn-div ps-0">
                <button
                  type="button"
                  class="btn btn-lg rounded-pill custom-button btn-1"
                >
                  DISCOVER
                </button>
              </div>
            </div>
            <div class="col-lg-6 text-center">
              <img src="./assets/header-teamwork.svg" width="80%" />
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("header-component", Header);
