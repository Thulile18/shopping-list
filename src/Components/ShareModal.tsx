import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
  listName: string;
  sharedWith: string[];
  onShareEmail: (email: string) => void;
}

function ShareModal({ isOpen, onClose, listId, listName, sharedWith, onShareEmail }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const shareLink = window.location.origin + '/shared/' + listId;

  function handleEmailShare(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() === '') {
      return;
    }
    onShareEmail(email.trim());
    setEmail('');
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareLink);
    setCopyMessage('Link copied!');
    
    setTimeout(function () {
      setCopyMessage('');
    }, 2000);
  }

  async function handleNativeShare() {
    
    if (navigator.share !== null && navigator.share !== undefined) {
      await navigator.share({
        title: listName,
        text: 'Check out my shopping list: ' + listName,
        url: shareLink,
      });
    } else {

      handleCopyLink();
    }
  }

  if (isOpen === false) {
    return null;
  }

  let copyButtonText = 'Copy Link';
  if (copyMessage !== '') {
    copyButtonText = copyMessage;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={function (e) { e.stopPropagation(); }}>

        <div className="modal-header">
          <h3> Share "{listName}"</h3>
          <button className="modal-close" type="button" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleEmailShare}>
          <Input
            label="Share with (email)"
            type="email"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
            placeholder="friend@example.com"
          />
          <Button type="submit" variant="primary" block>
            Share with this email
          </Button>
        </form>

        {/* Conditional Rendering: Only show list box if people are already added to it */}
        {sharedWith.length > 0 ? (
          <div style={{ marginTop: '15px' }}>
            <label>Already shared with:</label>
            <ul>
              {sharedWith.map(function (sharedEmail) {
                return <li key={sharedEmail}>{sharedEmail}</li>;
              })}
            </ul>
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="outline" onClick={handleCopyLink}>
            {copyButtonText}
          </Button>
          <Button type="button" variant="outline" onClick={handleNativeShare}>
            Share via...
          </Button>
        </div>

      </div>
    </div>
  );
}

export default ShareModal;
