import { Form } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import illustration from '../assets/illustration.jpg';

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Let's try to be organised with{' '}
          <span className="accent">Our Money</span>
        </h1>

        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro; // Ensure this line is present
