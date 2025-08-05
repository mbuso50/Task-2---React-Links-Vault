// src/components/CardItem/CardItem.tsx
import React from 'react';
import type { LinkItem } from '../types/types';
import Button from '../Button/Button';
import './CardItem.css';

interface CardItemProps {
    link: LinkItem;
    onEdit: () => void;
    onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ link, onEdit, onDelete }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{link.title}</h3>
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-url"
                >
                    {new URL(link.url).hostname}
                </a>
            </div>

            <p className="card-description">{link.description}</p>

            {link.tags.length > 0 && (
                <div className="card-tags">
                    {link.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            )}

            <div className="card-actions">
                <Button
                    onClick={onEdit}
                    text="Edit"
                    className="edit-button"
                />
                <Button
                    onClick={onDelete}
                    color="#ff4444"
                    text="Delete"
                    className="delete-button"
                />
            </div>
        </div>
    );
};

export default CardItem;