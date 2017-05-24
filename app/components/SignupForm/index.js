import React from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function SignupForm({ onSubmit, onEmailChange, onPasswordChange, errors, email, password }) {
  return (
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <div>
          <TextField
            hintText="john@gmail.com"
            id="email"
            name="email"
            onChange={onEmailChange}
            type="email"
            value={email}
          />
        </div>
        <div>
          <TextField
            errorText={errors.password}
            hintText="Password"
            id="password"
            name="password"
            onChange={onPasswordChange}
            type="password"
            value={password}
          />
        </div>
        {errors.summary && <p>{errors.summary}</p>}
        <div>
          <RaisedButton
            label="Submit"
            primary
            type="submit"
          />
        </div>
        <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
      </form>
    </Card>
  );
}

SignupForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onEmailChange: React.PropTypes.func.isRequired,
  onPasswordChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
};

export default SignupForm;
