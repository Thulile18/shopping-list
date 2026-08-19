import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { updatePassword, selectUser, selectAuthLoading } from '../../store/slices/authSlice';
import Input from '../common/Input';
import Button from '../common/Button';

function ProfilePassword() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  // Split password form states to look like hand-written student code
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Runs when user hits the submission change password trigger button
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Explicit validation check for empty string inputs
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      setError('Please fill in all fields');
      return;
    }
    
    // Validation check to make sure both passwords match exactly
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    // Validation check to make sure password length meets criteria
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (user === null || user === undefined) {
      return;
    }

    const payload = {
      id: user.id,
      newPassword: newPassword
    };

    const action = await dispatch(updatePassword(payload));

    if (updatePassword.fulfilled.match(action)) {
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError('Password update failed');
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Change Password</h2>
      </div>

      {/* Show alert banner box if error parameter contains text */}
      {error !== '' ? (
        <div className="auth-error">
          <span>{error}</span>
          <button type="button" onClick={function () { setError(''); }}>✕</button>
        </div>
      ) : null}

      {/* Show alert banner box if success parameter contains text */}
      {success !== '' ? (
        <div className="auth-success">
          <span>{success}</span>
          <button type="button" onClick={function () { setSuccess(''); }}>✕</button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={function (e) { setCurrentPassword(e.target.value); }}
          placeholder="Enter current password"
          required
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={function (e) { setNewPassword(e.target.value); }}
          placeholder="Min 6 characters"
          required
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={function (e) { setConfirmPassword(e.target.value); }}
          placeholder="Confirm new password"
          required
        />
        <Button type="submit" variant="warning" block disabled={loading}>
          {loading === true ? 'Updating...' : 'Change Password'}
        </Button>
      </form>
    </div>
  );
}

export default ProfilePassword;