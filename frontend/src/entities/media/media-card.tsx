import { Link, useLocation } from 'react-router-dom';
import { toMediaCardModel } from './model';
import type { MediaListItemDto } from '../../shared/api/types';

interface MediaCardProps {
  item: MediaListItemDto;
  onDelete?: () => void;
  deleting?: boolean;
}

export function MediaCard({ item, onDelete, deleting = false }: MediaCardProps) {
  const model = toMediaCardModel(item);
  const location = useLocation();

  return (
    <article className="media-card media-card-compact">
      <Link
        className="poster-link"
        to={`/media/${item.id}`}
        state={{ from: `${location.pathname}${location.search}` }}
      >
        <div className="poster" style={model.posterUrl ? { backgroundImage: `url(${model.posterUrl})` } : undefined}>
          {model.posterUrl ? null : 'NO POSTER'}
          {onDelete ? (
            <button
              type="button"
              className="poster-delete-button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDelete();
              }}
              disabled={deleting}
              aria-label={`删除 ${model.title} 的最近播放记录`}
              title="删除最近播放记录"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M9.75 4.75a2.25 2.25 0 0 1 4.5 0h3.5a.75.75 0 0 1 0 1.5H6.25a.75.75 0 0 1 0-1.5h3.5Zm1.5 0h1.5a.75.75 0 0 0-1.5 0Zm-3.8 3.02a.75.75 0 0 1 .8.7l.63 9.5a1.25 1.25 0 0 0 1.25 1.17h3.74a1.25 1.25 0 0 0 1.25-1.17l.63-9.5a.75.75 0 0 1 1.5.1l-.64 9.5a2.75 2.75 0 0 1-2.74 2.57h-3.74a2.75 2.75 0 0 1-2.74-2.57l-.64-9.5a.75.75 0 0 1 .7-.8Zm3.3 2.23a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm2.5 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </Link>
      <div className="chip-row media-card-tags">
        {model.metaTags.map((tag) => (
          <span className="chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <h3 className="media-card-title" title={model.title}>{model.title}</h3>
    </article>
  );
}
