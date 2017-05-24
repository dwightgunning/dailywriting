import React from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function LoginForm({ onSubmit, onEmailChange, onPasswordChange, email, password }) {
  return (
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <div>
          <TextField
            hintText="john@gmail.com"
            onChange={onEmailChange}
            name="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <TextField
            hintText="Password"
            onChange={onPasswordChange}
            name="password"
            type="password"
            value={password}
          />
        </div>
        <div>
          <RaisedButton
            label="Submit"
            primary
            type="submit"
          />
        </div>
        <CardText>Need an account? <Link to={'/signup'}>Create one</Link>.</CardText>
      </form>
    </Card>
  );
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onEmailChange: React.PropTypes.func.isRequired,
  onPasswordChange: React.PropTypes.func.isRequired,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
};

export default LoginForm;
