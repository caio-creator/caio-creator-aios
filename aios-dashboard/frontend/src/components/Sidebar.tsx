import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/clients', label: 'Clientes', icon: '◈' },
  { to: '/stories', label: 'Stories', icon: '◉' },
  { to: '/agents', label: 'Agentes', icon: '◎' },
  { to: '/modules', label: 'Módulos', icon: '⬡' },
];

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoAccent}>AIOS</span>
        <span className={styles.logoSub}> Dashboard</span>
      </div>
      <ul className={styles.nav}>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.icon}>{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span className={styles.version}>v1.0 · local</span>
      </div>
    </nav>
  );
}
