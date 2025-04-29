import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function UserProfileView() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>User Profile</h1>
      <br />
      <p>Hello, {user.username}!</p>
      <p>your email is {user.email}</p>
      <p>your user id is {user.id} </p>
      <p>your phone number is {user.phone}</p>
      
  
    </div>
  );
}