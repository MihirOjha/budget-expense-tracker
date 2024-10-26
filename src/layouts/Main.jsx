// rrd imports
import { Outlet, useLoaderData } from 'react-router-dom';

// assets
import wave from '../assets/wave.svg';

// components
import Nav from '../components/Nav';

//  helper functions
import { fetchUserName } from '../helpers'; // Import the specific fetch function

// loader
export async function mainLoader() {
  const userName = await fetchUserName(); // Await the asynchronous function
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
