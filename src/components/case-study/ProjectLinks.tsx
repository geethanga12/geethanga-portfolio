import { FiExternalLink, FiGithub } from 'react-icons/fi';
import type { ProjectLink } from '../../types/project';
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from './styles';

function isLiveLink(link: ProjectLink) {
  const name = link.name.toLowerCase();
  return name.includes('live') || name.includes('site') || name.includes('demo');
}

export default function ProjectLinks({ links, stacked = false }: { links: ProjectLink[]; stacked?: boolean }) {
  return (
    <div className={stacked ? 'flex flex-col gap-2' : 'flex flex-wrap gap-3'}>
      {links.map((link) => {
        const live = isLiveLink(link);
        const Icon = live ? FiExternalLink : FiGithub;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={live ? PRIMARY_BUTTON : SECONDARY_BUTTON}
          >
            <Icon size={15} aria-hidden />
            {link.name}
          </a>
        );
      })}
    </div>
  );
}
