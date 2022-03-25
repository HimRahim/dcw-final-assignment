import React from 'react'
import { useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Detail() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('header'))
  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default Detail