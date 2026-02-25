import { useEffect, useState } from 'react';
import { api, Module } from '../lib/api';
import styles from './ModulesPage.module.css';

const MODULE_ICONS: Record<string, string> = {
  '01-branding': '◈',
  '02-second-brain': '◉',
  '03-agenting': '◎',
  '04-content-production': '⬡',
  '05-gpt-builder': '◆',
};

export function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.modules().then(setModules).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Módulos</h1>
      <p className={styles.subtitle}>Creative Hub · {modules.length} módulos disponíveis</p>
      <div className={styles.grid}>
        {modules.map(mod => (
          <div key={mod.id} className={styles.card}>
            <span className={styles.icon}>{MODULE_ICONS[mod.id] ?? '◇'}</span>
            <div>
              <p className={styles.name}>{mod.name}</p>
              <p className={styles.path}>{mod.path}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
