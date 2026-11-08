import TreoLogo from "../brand/TreoLogo";
import BrandSeal from "../layout/BrandSeal";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function HomeHeader() {
  return (
    <div className="theme_on-color">
      <a
        aria-label="Back to top"
        data-theme=""
        href="#hero"
        className="header-logo w-inline-block"
      >
        <div
          data-modal-close="menu"
          aria-label="TREO Construction"
          className="logo_symbol header"
        >
          <div className="logo w-embed">
            <TreoLogo />
          </div>
        </div>
        <div className="header-logo_bg b-desk w-embed">
          <BrandSeal />
        </div>
        <div className="header-logo_bg b-mob w-embed">
          <BrandSeal />
        </div>
      </a>
      <div data-theme="" className="header-nav">
        <div className="header-nav_list f-mob">
          <div
            hover-nav-item-l2-trigger=""
            data-modal-menu-btn="mob"
            className="btn-menu"
          >
            <div className="btn-menu_label is-active">
              <a
                hover-nav-item-l2=""
                aria-label="Menu"
                href="#"
                className="nav-item w-inline-block"
              >
                <div className="nav-item_label">
                  <div hover="text" className="nav-item_label_text">
                    <div className="l2">Menu</div>
                  </div>
                  <div hover="text" className="nav-item_label_text is-2">
                    <div className="l2">Menu</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="btn-menu_label">
              <a
                hover-nav-item-l2=""
                aria-label="Close"
                href="#"
                className="nav-item w-inline-block"
              >
                <div className="nav-item_label">
                  <div hover="text" className="nav-item_label_text">
                    <div className="l2">Close</div>
                  </div>
                  <div hover="text" className="nav-item_label_text is-2">
                    <div className="l2">Close</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="ico-24">
              <div className="ico">
                <div data-ico-menu="is-1" className="ico w-embed">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 19C13.5 19.8284 12.8284 20.5 12 20.5C11.1716 20.5 10.5 19.8284 10.5 19C10.5 18.1716 11.1716 17.5 12 17.5C12.8284 17.5 13.5 18.1716 13.5 19Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.5 5C13.5 5.82843 12.8284 6.5 12 6.5C11.1716 6.5 10.5 5.82843 10.5 5C10.5 4.17157 11.1716 3.5 12 3.5C12.8284 3.5 13.5 4.17157 13.5 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div data-ico-menu="is-2" className="ico ia-2 w-embed">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 19C13.5 19.8284 12.8284 20.5 12 20.5C11.1716 20.5 10.5 19.8284 10.5 19C10.5 18.1716 11.1716 17.5 12 17.5C12.8284 17.5 13.5 18.1716 13.5 19Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.5 5C13.5 5.82843 12.8284 6.5 12 6.5C11.1716 6.5 10.5 5.82843 10.5 5C10.5 4.17157 11.1716 3.5 12 3.5C12.8284 3.5 13.5 4.17157 13.5 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-nav_list f-desk">
          <a
            hover-link=""
            aria-label="Our portfolio"
            href="/projects"
            className="link w-inline-block"
          >
            <div className="link_label">
              <div className="link_label_text">
                <div hover="text" className="h6">
                  Our{" "}
                  <br />
                  Portfolio
                </div>
              </div>
              <div className="link_label_text is-2">
                <div hover="text" className="h6">
                  Our{" "}
                  <br />
                  Portfolio
                </div>
              </div>
            </div>
          </a>
          <div className="u-24" />
          <a
            data-modal-cta-btn="book-a-call"
            aria-label="Start your project"
            hover-nav-item-l2=""
            href="#"
            className="nav-item w-inline-block"
          >
            <div className="nav-item_label">
              <div hover="text" className="nav-item_label_text">
                <div className="l2">Start your project</div>
              </div>
              <div hover="text" className="nav-item_label_text is-2">
                <div className="l2">Start your project</div>
              </div>
            </div>
          </a>
          <div className="u-4" />
          <a
            hover-nav-item-l2=""
            aria-label="Contact"
            href="/contact"
            className="nav-item w-inline-block"
          >
            <div className="nav-item_label">
              <div hover="text" className="nav-item_label_text">
                <div className="l2">Contact</div>
              </div>
              <div hover="text" className="nav-item_label_text is-2">
                <div className="l2">Contact</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div data-theme="" className="s-bar-w">
        <div data-s-bar="" className="s-bar">
          <div data-s-bar-thumb="" className="s-bar_thumb">
            <div data-s-bar-label="" className="l1 a-center">
              00
            </div>
          </div>
          <div data-s-bar-fill="" className="s-bar_fill" />
          <div data-s-bar-track="" className="s-bar_track" />
        </div>
      </div>
      <div data-theme="" className="s-down">
        <div className="s-down_arrow w-embed">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 48 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.36533 3C7.10389 3.54701 6.85117 4.02564 6.60716 4.4359C6.34572 4.84615 6.09299 5.18804 5.84899 5.46154L45 5.46154L45 6.53846L5.84899 6.53846C6.09299 6.82906 6.34572 7.17949 6.60716 7.58974C6.85117 8 7.10389 8.47009 7.36533 9L6.45029 9C5.35226 7.75214 4.20193 6.82906 2.99932 6.23077L2.99932 5.76923C4.20193 5.18804 5.35226 4.26496 6.45029 3L7.36533 3Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="l2">Scroll</div>
      </div>
    </div>
  );
}
