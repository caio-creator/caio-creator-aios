import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ClientsPage } from './pages/ClientsPage';
import { StoriesPage } from './pages/StoriesPage';
import { AgentsPage } from './pages/AgentsPage';
import { ModulesPage } from './pages/ModulesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/modules" element={<ModulesPage />} />
      </Routes>
    </Layout>
  );
}
