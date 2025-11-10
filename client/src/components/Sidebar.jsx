import React, { useState } from 'react';

function Sidebar({ notes, currentNoteId, onNoteSelect }) {
  const groupConfig = {
    prototypes: { label: 'Prototypes', defaultOpen: true },
    tutorials: { label: 'Tutorials', defaultOpen: true },
    howto: { label: 'How-to Guides', defaultOpen: true },
    explanations: { label: 'Explanations', defaultOpen: true },
    reference: { label: 'Reference', defaultOpen: true }
  };

  const initialOpenState = Object.keys(groupConfig).reduce((acc, key) => {
    acc[key] = groupConfig[key].defaultOpen;
    return acc;
  }, {});

  const [openGroups, setOpenGroups] = useState(initialOpenState);

  const toggleGroup = (groupKey) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const groupedNotes = notes.reduce((acc, note) => {
    const group = note.group || 'prototypes';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(note);
    return acc;
  }, {});

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Zettelkasten</h2>
        <p className="sidebar-subtitle">Math Study Notes</p>
      </div>
      
      <div className="notes-list">
        {Object.keys(groupConfig).map(groupKey => {
          const group = groupConfig[groupKey];
          const groupNotes = groupedNotes[groupKey] || [];
          
          return (
            <div key={groupKey} className="note-group">
              <div 
                className="group-header"
                onClick={() => toggleGroup(groupKey)}
              >
                <h3 className="group-title">
                  {group.label} {groupNotes.length > 0 && `(${groupNotes.length})`}
                </h3>
                <span className={`group-toggle ${openGroups[groupKey] ? 'expanded' : ''}`}>
                  ▶
                </span>
              </div>
              
              <div className={`group-notes ${!openGroups[groupKey] ? 'collapsed' : ''}`}>
                {groupNotes.length > 0 ? (
                  groupNotes.map(note => (
                    <div
                      key={note.id}
                      className={`note-item ${currentNoteId === note.id ? 'active' : ''}`}
                      onClick={() => onNoteSelect(note.id)}
                    >
                      <div className="note-id">{note.id}</div>
                      <div className="note-title">{note.title}</div>
                      <div className="note-tags">
                        {note.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-group">
                    <p>No notes yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="sidebar-footer">
        <p className="note-count">{notes.length} notes</p>
      </div>
    </div>
  );
}

export default Sidebar;
