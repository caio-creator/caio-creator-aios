import { useEffect, useState } from 'react';
import { api, Story } from '../lib/api';
import styles from './StoriesPage.module.css';

const STATUSES = ['Draft', 'Ready', 'InProgress', 'InReview', 'Done'];

export function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stories().then(setStories).finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(story: Story, newStatus: string) {
    await api.updateStoryStatus(story.id, story.file, newStatus);
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: newStatus } : s));
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Stories</h1>
      {stories.length === 0 ? (
        <p className={styles.empty}>Nenhuma story encontrada em <code>docs/stories/</code>.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(story => (
              <tr key={story.id} className={styles.row}>
                <td className={styles.id}>{story.id}</td>
                <td className={styles.titleCell}>{story.title}</td>
                <td>
                  <select
                    className={styles.select}
                    value={story.status}
                    onChange={e => handleStatusChange(story, e.target.value)}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
