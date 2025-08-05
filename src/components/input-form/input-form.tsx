// src/components/input-form/input-form.tsx
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import type { LinkItem } from '../types/types';
import './input-form.css';

interface InputFormProps {
    onSubmit: (link: Omit<LinkItem, 'id' | 'createdAt'>) => void;
    initialData?: LinkItem | null;
    onCancel: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setUrl(initialData.url);
            setDescription(initialData.description);
            setTags(initialData.tags);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, url, description, tags });
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setUrl('');
        setDescription('');
        setTags([]);
    };

    return (
        <div className="form-container">
            <form className="input-form" onSubmit={handleSubmit}>
                <h2 className="form-title">{initialData ? 'Edit Link' : 'Add New Link'}</h2>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>URL</label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <input
                        type="text"
                        value={tags.join(', ')}
                        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                        placeholder="Enter tags separated by commas"
                    />
                </div>

                <div className="form-actions">
                    <Button
                        onClick={() => handleSubmit({ preventDefault: () => { } } as React.FormEvent)}
                        color="#471396"
                        text={initialData ? 'Update' : 'Save'}
                    />
                    {initialData && (
                        <Button
                            onClick={onCancel}
                            color="#666"
                            text="Cancel"
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default InputForm;