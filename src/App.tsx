import React, { useState } from 'react';
import { useLocalStorage } from './components/hooks/LocalStorage';
import type { LinkItem } from './components/types/types';
import InputForm from './components/input-form/input-form';
import SavedItemsForm from './components/save-items-form/saved-items-form';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<LinkItem[]>('links', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);

  const handleSave = (newLinkData: { title: string, url: string, description: string, tags: string[] }) => {
    if (editingLink) {
      const updatedLinks = links.map((existingLink) => {
        if (existingLink.id === editingLink.id) {
          return {
            ...existingLink,
            ...newLinkData
          };
        }
        return existingLink;
      });
      setLinks(updatedLinks);
      setEditingLink(null);
    } else {
      const newLink = {
        ...newLinkData,
        id: Date.now().toString(),
        createdAt: Date.now()
      };
      setLinks([...links, newLink]);
    }
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <span className="logo-icon">+_+</span>
            React Links Vault
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </header>

      <main className="app-main">
        <div className="form-section">
          <InputForm
            onSubmit={handleSave}
            initialData={editingLink}
            onCancel={() => setEditingLink(null)}
          />
        </div>

        <div className="saved-items-section">
          <SavedItemsForm
            links={filteredLinks}
            onEdit={setEditingLink}
            onDelete={handleDelete}
          />
        </div>
      </main>


    </div>
  );
};

export default App;