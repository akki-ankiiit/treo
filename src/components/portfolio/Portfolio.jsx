import {
  projects,
  statusOptions,
  locationOptions,
} from "../../data/treo-projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import FlowerVideo from "../media/FlowerVideo";
export default function Portfolio() {
  return (
    <section data-bg="light" className="section clip">
      <div className="container">
        <div className="apart-w">
          <div className="apart-s">
            <div className="u-48" />
            <div className="u-272" />
            <div className="grid">
              <div data-sort="" data-filter="" className="apart-s_cms">
                <div className="apart-s_title">
                  <h1 data-scroll-reveal="h" className="h1">
                    Our portfolio
                  </h1>
                  <div data-filter-count="" className="h1 b-desk">
                    {projects.length}
                  </div>
                </div>
                <div className="u-24" />
                <p className="p1 portfolio-intro">
                  Cutting edge design and construction methods. Luxury residences
                  built by TREO across South Florida, in collaboration with
                  leading architects and interior designers.
                </p>
                <div className="u-32" />
                <div className="apart-s_cms_filter">
                  <div className="apart-s_cms_filter_c">
                    <div className="grid _9-columns">
                      <ProjectFilter
                        label="Status"
                        group="status"
                        options={statusOptions}
                      />
                      <ProjectFilter
                        label="Location"
                        group="location"
                        options={locationOptions}
                      />
                      <ProjectFilter
                        label="Sort"
                        sorting
                        options={[
                          {
                            value: "relevant",
                            label: "Selected",
                          },
                          {
                            value: "name",
                            label: "Address",
                          },
                          {
                            value: "location",
                            label: "Location A–Z",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    data-reset=""
                    className="studio-reset l2"
                  >
                    Reset
                  </button>
                </div>
                <div className="u-16" />
                <div data-scroll-reveal="ctn" className="apart-cms">
                  <div
                    data-sort-list=""
                    data-filter-list=""
                    role="list"
                    className="apart-cms_list"
                  >
                    {projects.map((project) => (
                      <ProjectCard key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
                <div data-filter-empty="" className="portfolio-empty">
                  <h2 className="h4">No projects match these filters.</h2>
                  <p className="p1">
                    Reset the filters to explore the full TREO Construction
                    portfolio.
                  </p>
                </div>
                <div className="u-160" />
              </div>
            </div>
          </div>
          <div className="flower apart">
            <FlowerVideo variant="05" />
          </div>
        </div>
      </div>
    </section>
  );
}
