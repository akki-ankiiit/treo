import TreoLogo from "../brand/TreoLogo";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function MenuModal() {
  return (
    <div data-modal-menu="mob" className="modal menu theme_on-dark">
      <div className="modal_c">
        <div data-modal-container="" className="modal_menu">
          <div className="modal_menu_t">
            <div className="u-48 b-desk" />
            <div className="u-272 b-mob" />
            <div className="grid">
              <div className="modal_menu_title">
                <div className="modal_menu_a">
                  <div data-part="a" className="a1 a-center">
                    The
                  </div>
                </div>
                <div data-part="h" className="h1 a-center">
                  Menu
                </div>
              </div>
            </div>
          </div>
          <div className="modal_menu_c">
            <div className="grid">
              <div className="modal_menu_list">
                <a
                  data-part="ctn"
                  aria-label="Home"
                  hover-link=""
                  data-modal-close="mob"
                  href="/"
                  aria-current="page"
                  className="link w-inline-block w--current"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Home
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Home
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="About"
                  hover-link=""
                  data-modal-close="mob"
                  href="#about"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        About
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        About
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Our process"
                  hover-link=""
                  data-modal-close="mob"
                  href="#process"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Our process
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Our process
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Services"
                  hover-link=""
                  data-modal-close="mob"
                  href="#services"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Services
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Services
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Portfolio"
                  hover-link=""
                  data-modal-close="mob"
                  href="/projects"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Portfolio
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Portfolio
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Team"
                  hover-link=""
                  data-modal-close="mob"
                  href="#team"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Team
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Team
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Contact"
                  hover-link=""
                  data-modal-close="mob"
                  href="/contact"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Contact
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Contact
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-part="ctn"
                  aria-label="Start your project"
                  hover-link=""
                  data-modal-cta-btn="book-a-call"
                  data-modal-close="mob"
                  href="#"
                  className="link w-inline-block"
                >
                  <div className="link_label">
                    <div className="link_label_text">
                      <div hover="text" className="h6">
                        Start your project
                      </div>
                    </div>
                    <div className="link_label_text is-2">
                      <div hover="text" className="h6">
                        Start your project
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="modal_menu_b">
            <div className="s_logo">
              <div data-part="ctn" className="logo_symbol ico-48">
                <div className="logo w-embed">
                  <TreoLogo />
                </div>
              </div>
            </div>
            <div className="u-48" />
          </div>
        </div>
      </div>
      <div data-modal-close="" data-modal-over="" className="modal_bg" />
    </div>
  );
}
