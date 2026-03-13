import projects from '@/data/projects';
import ProjectPage from './ProjectPage';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function Page() {
  return <ProjectPage />;
}
