import { Outlet, useLoaderData } from 'react-router-dom';
import wave from '../assets/wave.svg';
import Nav from '../components/Nav';
import { fetchUserName } from '../helpers'; // Import the specific fetch function

// loader
export async function mainLoader() {
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const userName = await fetchUserName(userId); // Pass userId to fetchUserName
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
