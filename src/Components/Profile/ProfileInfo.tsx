import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Store';
import { updateProfile, selectUser, selectAuthLoading } from '../Store/authSlice';
import Input from '../Input';
import Button from '../Button';

function ProfileInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const [name, setName] = useState(user?.name || '');
  const [surname, setSurname] = useState(user?.surname || '');
  const [cellNumber, setCellNumber] = useState(user?.cellNumber || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (user === null || user === undefined) {
      return;
    }

    const payload = {
      id: user.id,
      data: {
        name: name,
        surname: surname,
        cellNumber: cellNumber
      }
    };

    const action = await dispatch(updateProfile(payload));

    if (updateProfile.fulfilled.match(action)) {
      setSuccess('Profile updated successfully!');
    } else {
      setError('Update failed. Please try again.');
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Personal Information</h2>
      </div>

      {error !== '' ? (
        <div className="auth-error">
          <span>{error}</span>
          <button type="button" onClick={function () { setError(''); }}>✕</button>
        </div>
      ) : null}

      {success !== '' ? (
        <div className="auth-success">
          <span>{success}</span>
          <button type="button" onClick={function () { setSuccess(''); }}>✕</button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          value={name}
          onChange={function (e) { setName(e.target.value); }}
          required
        />
        <Input
          label="Surname"
          value={surname}
          onChange={function (e) { setSurname(e.target.value); }}
          required
        />
        <Input
          label="Cell Number"
          value={cellNumber}
          onChange={function (e) { setCellNumber(e.target.value); }}
          required
        />
        <Input
          label="Email Address"
          value={user?.email || ''}
          disabled
        />
        <Button type="submit" variant="primary" block disabled={loading}>
          {loading === true ? 'Saving...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
}

export default ProfileInfo;
