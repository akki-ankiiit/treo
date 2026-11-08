import { lazy } from 'react';
import { projects } from './treo-projects';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ProjectPage = lazy(() => import('../pages/ProjectPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const LegalPage = lazy(() => import('../pages/LegalPage'));

export const routes = [
  { path: '/', title: 'TREO Construction | Miami Luxury Custom Home Builders', Component: HomePage },
  { path: '/projects', title: 'Portfolio — Luxury Homes in South Florida | TREO Construction', Component: ProjectsPage },
  { path: '/contact', title: 'Contact — Start Your Project | TREO Construction', Component: ContactPage },
  ...projects.map(project => ({ path: `/projects/${project.slug}`, title: `${project.name}, ${project.location} | TREO Construction`, Component: () => <ProjectPage project={project} /> })),
  { path: '/privacy', title: 'Privacy | TREO Construction', Component: () => <LegalPage type="privacy" /> },
  { path: '/terms', title: 'Terms of Use | TREO Construction', Component: () => <LegalPage type="terms" /> },
];
