import React from 'react';
import type { LinkItem } from '../types/types';
import './saved-items-form.css';

interface SavedItemsFormProps {
    links: LinkItem[];
    onEdit: (link: LinkItem) => void;
    onDelete: (id: string) => void;
}

const SavedItemsForm: React.FC<SavedItemsFormProps> = ({ links, onEdit, onDelete }) => {
    if (links.length === 0) {
        return (
            <div className="saved-items-empty-state">
                <div className="saved-items-empty-icon">📭</div>
                <h3>No links saved yet</h3>
                <p>Add your first link using the form</p>
            </div>
        );
    }

    return (
        <div className="saved-items-container">
            <div className="saved-items-grid">
                {links.map((link) => (
                    <div key={link.id} className="saved-item-card">
                        <div className="saved-item-content">
                            <div className="saved-item-header">
                                <div className="saved-item-icon" style={{ border: `2px solid var(--yellow)` }}>
                                    <img src={link.favicon || 'my-logo'} alt={link.title} />
                                </div>
                                <div className="saved-item-title">{link.title}</div>
                            </div>
                            <div className="saved-item-description">{link.description}</div>
                            <div className="saved-item-footer">
                                <span className="saved-item-date">
                                    {new Date(link.createdAt).toLocaleDateString()}
                                </span>
                                <div className="saved-item-actions">
                                    <button
                                        className="view-btn"
                                        onClick={() => window.open(link.url, '_blank')}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(link)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(link.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedItemsForm;