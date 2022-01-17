import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { NAVS } from './misc/data';
import './index';

function Home() {
  const [boundWidth, setBoundWidth] = useState(0);

  useEffect(() => {
    const elem = document.querySelector('#bound');

    var rect = elem?.getBoundingClientRect();

    setBoundWidth(rect?.width || 0);


  }, [])
  return (
    <div className='container'>
      <div className='row'>

        {NAVS.map((nav, i) => {
          return (
            <div id="bound" className='col-6 col-md-4 col-lg-3 mb-2'>

              <Link
                className='d-block border rounded  text-center bound-inner'
                key={i}
                to={nav.to}
                style={{
                  height: (boundWidth - 24) + 'px',
                  verticalAlign:'bottom',
                  background: `url('${nav.img}')`,
                  backgroundSize:'cover'

                }}
              >
                <div style={{visibility:'hidden'}}>{nav.name}</div>
                <div className='bound-content p-1 bg-primary rounded text-white'>
                  {nav.name}
                </div>


              </Link>


            </div>
          )

        })}


      </div>
    </div>

  );
}

export default Home;
