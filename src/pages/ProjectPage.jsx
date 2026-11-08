import StudioLayout from '../components/layout/StudioLayout';
import ProjectCard from '../components/portfolio/ProjectCard';
import ImageLightbox from '../components/apartments/details/ImageLightbox';
import { projects } from '../data/treo-projects';

function EnquireButton() {
  return <a data-modal-cta-btn="book-a-call" hover-btn="" href="#" className="btn"><div className="btn_label"><div className="btn_label_text"><span hover="text" className="l1">Start your project</span></div></div><div className="btn_bg"><div hover="bg" className="btn_bg_fill" /></div></a>;
}

function Gallery({ project }) {
  return <div className="project-gallery">{project.gallery.map((image, index) => <figure key={image.src} className="project-gallery-item" data-parallax="w"><div className="img-w"><img data-lightbox="" src={image.src} width={image.width} height={image.height} alt={image.alt} className="img" loading={index ? 'lazy' : 'eager'} decoding="async" /></div><figcaption className="l2 reg">{String(index + 1).padStart(2, '0')} / {project.name}<span>View detail ↗</span></figcaption></figure>)}</div>;
}

/** Factual summary composed only from the verified fields on the official project page. */
function summary(project) {
  const state = project.status === 'Completed'
    ? `completed in ${project.statusLabel.replace(/^Completed\s*/i, '')}`
    : /permit/i.test(project.statusLabel) ? 'currently in permitting' : 'currently under construction';
  const team = [project.architect && `architecture by ${project.architect}`, project.interiors && `interiors by ${project.interiors}`].filter(Boolean).join(' and ');
  return `${project.name} is a luxury single-family residence in ${project.locationFull}, ${state}. Built by TREO Construction${team ? ` with ${team}` : ''}.`;
}

function related(project) {
  const others = projects.filter(item => item.slug !== project.slug);
  return [...others.filter(item => item.location === project.location), ...others.filter(item => item.location !== project.location)].slice(0, 3);
}

export default function ProjectPage({ project }) {
  const facts = [['Location', project.locationFull], ['Status', project.statusLabel], ['Architect', project.architect], ['Interiors', project.interiors]].filter(([, value]) => value);
  return <StudioLayout breadcrumb="Portfolio">
    <section data-bg="light" className="section clip project-detail"><div className="container"><div className="lot-w"><div className="lot-s">
      <div className="lot-s_info"><div className="grid h-100"><div className="lot-s_info_c">
        <div className="lot-s_info_header is-top"><div className="u-48" /><div className="u-272 b-mob" /><p className="l2 reg">Project {project.number} · {project.location}</p><div className="u-24" /><h1 className="h3 project-title">{project.name}</h1><div className="u-24" /><h2 className="l2">{project.status === 'Active' ? 'Active project' : 'Completed home'}</h2><div className="u-16" /></div>
        <div className="b-mob"><Gallery project={project} /></div>
        <div data-lenis-scroll="" className="lot-s_info_t scrollbar-none"><div className="u-32" />
          <div className="lot-s_info_data">{facts.map(([label, value]) => <div className="data-item" key={label}><h3 className="l1 reg">{label}</h3><div className="u-8" /><p className="h5">{value}</p></div>)}</div>
          <div className="u-48" />
          <div data-tabs="" className="lot-s_info_more"><div data-tabs-hilight="hor" className="tabs"><button data-tab="" data-tab-trigger="story" hover-tab="" className="tab studio-tab"><span className="l1">The project</span></button><button data-tab="" data-tab-trigger="palette" hover-tab="" className="tab studio-tab"><span className="l1">The team</span></button><div className="tabs_line"><div className="line-h" /></div><div data-tab-hilight="" className="tabs_hilight" /></div>
            <div className="lot-s_info_more_contents"><div data-tab-content="story" className="lot-s_info_more_content is-1"><div className="u-24" /><p data-tab="p" className="p1">{summary(project)} Our role is to bring the architect’s intent and the homeowner’s aspirations to life — faithfully, and without compromise.</p><div className="u-48" /></div><div data-tab-content="palette" className="lot-s_info_more_content"><div className="u-24" /><p data-tab="p" className="p1">{project.architect && <>Architect: {project.architect}. </>}{project.interiors && <>Interior design: {project.interiors}. </>}General contractor and construction management: TREO Construction. <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">View on treoconstruction.com ↗</a></p><div className="u-48" /></div></div>
          </div>
        </div>
        <div className="lot-s_info_b"><div className="u-24" /><EnquireButton /><div className="u-48" /></div><div className="lot-s_info_line is-top"><div className="line-v" /></div>
      </div></div></div>
      <div className="lot-s_media b-desk"><div className="grid"><div className="lot-s_media_c"><Gallery project={project} /></div></div></div>
    </div></div></div></section>
    <section data-bg="light" className="section project-related"><div className="container"><p className="l2 a-center">Continue exploring</p><div className="u-32" /><h2 data-scroll-reveal="h" className="h2 a-center">Related projects</h2><div className="u-64" /><div className="apart-cms_list" role="list">{related(project).map(item => <ProjectCard project={item} key={item.slug} />)}</div><div className="u-96" /></div></section>
    <ImageLightbox />
  </StudioLayout>;
}
