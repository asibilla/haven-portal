import { isEmpty } from 'lodash';
import { func, string } from 'prop-types';
import React, { Fragment, useContext, useState, useEffect } from 'react';

import { styles } from '../../constants';
import { addNew, addNewWrapper } from '../../constants/styles/manageUsers';

import { createUser, getGroups } from '../../helpers/cognito';
import AppContext from '../../helpers/context';
import { ValidationItem, validateItems } from '../../helpers/formValidation';

import { Button, RadioGroup, RadioInput, Spinner, TextInput } from '.';

const AddUserForm = ({ onCancel, refresh, url }) => {
  const { authData } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [email, setEmail] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const userGroups = await getGroups({ authData });
        setGroups(userGroups);
        if (userGroups.length) {
          setGroupName(userGroups[0]);
        }
        setLoading(false);
      } catch (err) {
        setFormError(`Something went wrong: ${err.message}`);
        setLoading(false);
      }
    })();
  }, [url]);

  const setValue = (setState) => {
    return (e) => {
      setState(e.target.value);
    };
  };

  const clearState = () => {
    setUsername('');
    setTempPassword('');
    setEmail('');
    if (groups.length) {
      setGroupName(groups[0]);
    }
  };

  const handleSubmit = async (e) => {
    setButtonIsDisabled(true);
    setValidationErrors({});
    e.preventDefault();

    const validationObj = [
      new ValidationItem({
        displayName: 'Username',
        fieldName: 'username',
        isRequiredString: true,
        value: username,
      }),
      new ValidationItem({
        displayName: 'Temporary Password',
        fieldName: 'tempPassword',
        isRequiredString: true,
        value: tempPassword,
      }),
      new ValidationItem({
        displayName: 'Email',
        fieldName: 'email',
        isRequiredString: true,
        value: email,
      }),
    ];

    const errors = validateItems({ items: validationObj });

    if (!isEmpty(errors)) {
      setValidationErrors(errors);
      setButtonIsDisabled(false);
      return;
    }

    try {
      const data = { email, groupName, tempPassword, username };
      await createUser({ authData, data });
      refresh();
      setButtonIsDisabled(false);
      setSuccessMsg('User successfully created!');
      clearState();
    } catch (err) {
      setFormError(`Something went wrong: ${err}`);
      setButtonIsDisabled(false);
    }
  };

  return (
    <div>
      <h3>Add New User</h3>
      <div className={styles.messageContainer}>
        {formError && <p className={styles.errorText}>{formError}</p>}
        {successMsg && <p className={styles.successText}>{successMsg}</p>}
      </div>
      <div className={addNew}>
        <a href="#manage-users" onClick={onCancel}>
          {'<< Back'}
        </a>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={addNewWrapper}>
          <form onSubmit={handleSubmit}>
            <TextInput
              error={validationErrors.username}
              labelText="Username"
              onChange={setValue(setUsername)}
              value={username}
            />
            <TextInput
              error={validationErrors.tempPassword}
              labelText="Temporary Password"
              onChange={setValue(setTempPassword)}
              value={tempPassword}
            />
            <TextInput
              error={validationErrors.email}
              labelText="Email"
              onChange={setValue(setEmail)}
              value={email}
            />
            {groups.length && (
              <RadioGroup label="User Group" value={groupName}>
                {groups.map((group) => (
                  <Fragment key={group}>
                    <RadioInput
                      checked={groupName === group}
                      label={group}
                      name="user-group"
                      onChange={setValue(setGroupName)}
                      value={group}
                    />
                  </Fragment>
                ))}
              </RadioGroup>
            )}

            <Button className={styles.buttonSecondary} onClick={onCancel} text="Cancel" />
            <Button disabled={buttonIsDisabled} text="Submit" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

AddUserForm.defaultProps = {
  url: '',
};

AddUserForm.propTypes = {
  onCancel: func.isRequired,
  refresh: func.isRequired,
  url: string,
};

export default AddUserForm;
