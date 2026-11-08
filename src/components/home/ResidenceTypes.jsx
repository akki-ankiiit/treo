import { leadership, studio } from "../../data/studio";

/** Leadership & project management team — https://www.treoconstruction.com/our-team/ */
const people = [
  {
    name: leadership[0].name,
    stats: [
      ["Role", leadership[0].role],
      ["Education", "MBA, Columbia · MS, Stanford"],
    ],
    desc: "For more than 10 years Ricardo led one of Venezuela’s most important development and construction firms — from land acquisition to construction and sales — before relocating to Miami in 2009.",
    cta: "Meet the team",
    image: leadership[0].image,
    width: 900,
    height: 765,
    alt: "Ricardo Halfen, Founder & CEO of TREO Construction",
  },
  {
    name: leadership[1].name,
    stats: [
      ["Role", leadership[1].role],
      ["Education", "Civil Engineering, University of Toronto"],
    ],
    desc: "Eli oversees the scheduling, budgeting and quality assurance of TREO’s multi-million dollar residential projects, and all communication with project stakeholders.",
    cta: "Meet the team",
    image: leadership[1].image,
    width: 900,
    height: 765,
    alt: "Eli Abadi, Partner & Operations Manager of TREO Construction",
  },
  {
    name: "Project managers",
    stats: [
      ["Your main contact", "A dedicated Project Manager"],
      ["Background", "Former architects & engineers"],
    ],
    desc: "Every project is led by an experienced Project Manager responsible for planning, executing, monitoring, controlling and closing it — supervised by Ricardo and Eli, who have more than 30 years of combined experience.",
    cta: "Meet the full team",
    image: "/assets/treo/team/treo-team-treo-construction-team-2026.webp",
    width: 2560,
    height: 800,
    alt: "The TREO Construction team, 2026",
  },
];
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function ResidenceTypes() {
  return (
    <section
      id="team"
      aria-label="Experience behind every build — TREO leadership"
      data-bg="light"
      data-snap=""
      className="section theme_on-brand"
    >
      <div className="container">
        <div className="apart-type-w">
          <div className="apart-type-s">
            <div className="u-48 b-desk" />
            <div className="u-96 b-mob" />
            <div className="grid fill">
              <div data-slider="" className="apart-type-s_cms">
                <div className="apart-type-cms w-dyn-list">
                  <div role="list" className="apart-type-cms_list w-dyn-items">
                    {people.map((person) => (
                      <div
                        key={person.name}
                        data-reveal-first=""
                        data-slider="slide"
                        role="listitem"
                        className="apart-type-cms_list_item w-dyn-item"
                      >
                        <div className="apart-type-slide">
                          <div className="apart-type-slide_t b-desk" />
                          <div className="apart-type-slide_c">
                            <div className="grid _8-columns">
                              <div className="apart-type-slide_data">
                                <div className="data-list">
                                  <div className="data-item">
                                    <h4
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                      className="l1 reg"
                                    >
                                      {person.stats[0][0]}
                                    </h4>
                                    <div className="u-8" />
                                    <h5
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                      className="h5"
                                    >
                                      {person.stats[0][1]}
                                    </h5>
                                  </div>
                                  <div className="data-item">
                                    <h4
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                      className="l1 reg"
                                    >
                                      {person.stats[1][0]}
                                    </h4>
                                    <div className="u-8" />
                                    <h5
                                      data-scroll-reveal="p"
                                      data-slider="p"
                                      className="h5"
                                    >
                                      {person.stats[1][1]}
                                    </h5>
                                  </div>
                                </div>
                                <div className="u-48 b-mob" />
                              </div>
                              <div className="apart-type-slide_desc">
                                <p
                                  data-scroll-reveal="p"
                                  data-slider="p"
                                  className="p1 mob_a-center"
                                >
                                  {person.desc}
                                </p>
                                <div className="u-24" />
                                <div
                                  data-scroll-reveal="ctn"
                                  data-slider="ctn"
                                  className="apart-type-slide_btn"
                                >
                                  <a
                                    aria-label={`${person.cta} — TREO Construction team`}
                                    hover-btn=""
                                    hover-nav-item=""
                                    href={studio.teamUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn w-inline-block"
                                  >
                                    <div className="btn_label">
                                      <div className="btn_label_text">
                                        <div hover="text" className="l1">
                                          {person.cta}
                                        </div>
                                      </div>
                                      <div className="btn_label_text is-2">
                                        <div hover="text" className="l1">
                                          {person.cta}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="btn_bg">
                                      <div hover="bg" className="btn_bg_fill" />
                                    </div>
                                  </a>
                                </div>
                                <div className="u-16 b-mob" />
                              </div>
                            </div>
                          </div>
                          <div className="apart-type-slide_b">
                            <div className="u-48 b-desk" />
                            <h3
                              data-scroll-reveal="h"
                              data-slider="h"
                              className="h2 a-center"
                            >
                              {person.name}
                            </h3>
                            <div className="u-32 b-mob" />
                          </div>
                          <div className="apart-type-slide_img-w">
                            <div className="apart-type-slide_img">
                              <div
                                data-scroll-reveal="slide"
                                data-slider="img"
                                className="img-w"
                              >
                                <img
                                  src={person.image}
                                  width={person.width}
                                  height={person.height}
                                  loading="lazy"
                                  alt={person.alt}
                                  className="img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="u-16" />
                <div data-scroll-reveal="ctn" data-slider="pag" className="pag">
                  <div data-slider="prev" className="pag_prev">
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4717 12.4717C10.2113 12.7321 9.78866 12.7321 9.52831 12.4717L5.52831 8.47173C5.26796 8.21138 5.26796 7.78872 5.52831 7.52837L9.52831 3.52837C9.78866 3.26802 10.2113 3.26802 10.4717 3.52837C10.732 3.78872 10.732 4.21138 10.4717 4.47173L6.94335 8.00005L10.4717 11.5284C10.732 11.7887 10.732 12.2114 10.4717 12.4717Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="pag_prev_label">
                      <div data-slider="current" className="l1">
                        00
                      </div>
                    </div>
                  </div>
                  <div className="pag_progress">
                    <div data-slider="progress" className="pag_progress_fill" />
                  </div>
                  <div data-slider="next" className="pag_next">
                    <div className="pag_prev_label">
                      <div data-slider="next-num" className="l1">
                        00
                      </div>
                    </div>
                    <div className="ico-16">
                      <div className="ico w-embed">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.52833 3.52827C5.78868 3.26792 6.21134 3.26792 6.47169 3.52827L10.4717 7.52827C10.732 7.78862 10.732 8.21128 10.4717 8.47163L6.47169 12.4716C6.21134 12.732 5.78868 12.732 5.52833 12.4716C5.26798 12.2113 5.26798 11.7886 5.52833 11.5283L9.05665 7.99995L5.52833 4.47163C5.26798 4.21128 5.26798 3.78862 5.52833 3.52827Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="u-48" />
          </div>
        </div>
      </div>
    </section>
  );
}
