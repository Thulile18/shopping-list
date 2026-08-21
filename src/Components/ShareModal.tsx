import { useState } from 'react';
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

  // Build the shareable link using the list's own id
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
    // Not every browser supports the native share sheet, so we check first
    if (navigator.share) {
      await navigator.share({
        title: listName,
        text: 'Check out my shopping list: ' + listName,
        url: shareLink,
      });
    } else {
      // Fall back to copying the link if native share isn't available
      handleCopyLink();
    }
  }

  if (isOpen === false) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={function (e) { e.stopPropagation(); }}>

        <div className="modal-header">
          <h3>Share "{listName}"</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            ✕
          </button>
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
            {copyMessage || 'Copy Link'}
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
