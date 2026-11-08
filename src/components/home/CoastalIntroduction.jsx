import TreoLogo from "../brand/TreoLogo";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function CoastalIntroduction() {
  return (
    <section className="section arch clip theme_on-brand">
      <div className="container">
        <div className="benefits-intro-w">
          <div className="benefits-intro-s">
            <div className="u-48 b-mob" />
            <div className="u-272 b-mob" />
            <div className="s_logo">
              <div className="info-s_logo_l">
                <div data-scroll-reveal="p" className="l1 a-center">
                  South
                </div>
              </div>
              <div data-scroll-reveal="ctn" className="logo_symbol ico-48">
                <div className="logo w-embed">
                  <TreoLogo />
                </div>
              </div>
              <div className="info-s_logo_r">
                <div data-scroll-reveal="p" className="l1 a-center">
                  Florida
                </div>
              </div>
            </div>
            <div className="u-48" />
            <div className="divider">
              <div data-scroll-reveal="line" className="line-v" />
            </div>
            <div className="u-48" />
            <div className="grid">
              <div className="s_title">
                <p data-scroll-reveal="p" className="l1 a-center">
                  Luxury residential construction — custom home building — development
                </p>
              </div>
            </div>
            <div className="u-96" />
            <div className="benefits-intro-s_title">
              <div className="benefits-intro-s_title_svg b-desk w-embed">
                <svg viewBox="0 0 1600 1600" width="100%" height="100%">
                  <defs>
                    <path
                      id="circle-desk"
                      d="M 800,800 m -676,0 a 676,676 0 1,1 1352,0 a 676,676 0 1,1 -1352,0"
                    />
                  </defs>
                  <text
                    data-circle-text=""
                    className="h4"
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    <textPath href="#circle-desk" startOffset="25%">
                      Dream it. Build it. Live it.
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="benefits-intro-s_title_svg b-mob w-embed">
                <svg viewBox="0 0 416 416" width="100%" height="100%">
                  <defs>
                    <path
                      id="circle-mob"
                      d="M 208,208 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                    />
                  </defs>
                  <text
                    data-circle-text=""
                    className="h4"
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    <textPath href="#circle-mob" startOffset="25%">
                      Dream it. Build it. Live it.
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
