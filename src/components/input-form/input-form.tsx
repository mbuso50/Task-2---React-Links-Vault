import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './input-form.css';

type LinkData = {
    title: string;
    url: string;
    description: string;
    tags: string[];
};

type InputFormProps = {
    onSubmit: (link: LinkData) => void;
    initialData?: LinkData & { id?: string; createdAt?: number } | null;
    onCancel: () => void;
};

const InputForm = ({ onSubmit, initialData, onCancel }: InputFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: '',
        tags: [] as string[],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                url: initialData.url,
                description: initialData.description,
                tags: initialData.tags,
            });
        }
    }, [initialData]);

    const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: field === 'tags'
                ? e.target.value.split(',').map(tag => tag.trim())
                : e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            url: '',
            description: '',
            tags: [],
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="input-form">
                <h2>{initialData ? 'Edit Link' : 'Add New Link'}</h2>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleChange('title')}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>URL</label>
                    <input
                        type="url"
                        value={formData.url}
                        onChange={handleChange('url')}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={handleChange('description')}
                    />
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <input
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={handleChange('tags')}
                        placeholder="tag1, tag2, tag3"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="button"
                        style={{ backgroundColor: '#471396' }}
                    >
                        {initialData ? 'Update' : 'Save'}
                    </button>
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