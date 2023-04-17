import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { UserContext } from "../userContext";
import { useSelector } from 'react-redux';
import { setFilter } from '../slices/posts/postSlice';
import { useForm } from '../hooks/useForm';

export default function PostMenu(){
  const { filter } = useSelector((state) => state.posts);

  const dispatch= useDispatch();
  let { usuariId} = useContext(UserContext);
   const { formState, onInputChange } = useForm({

    filtrar: "",

   });
   const { filtrar } = formState
   console.log(usuariId)

  return (
    <div className='menu'>
    <Link className='click' to="/posts/add">Afegir + </Link>
    <Link className='click orange' to="/posts/grid">Grid </Link>
    <Link className='click blue' to="/posts/list">Llista </Link>
    <Link className='click blue' to="/posts/marks">Marks </Link>

    <input type="text" name="filtrar" postholder='filtrar por body' onChange={onInputChange}></input>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({...filtrar,body:formState.filtrar}))}}>Find</button>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({...filtrar,body:"",author:usuariId}))}}>Mis sitios</button>
       <button className="btn btn-primary" onClick={(e) => {dispatch(setFilter({...filtrar,body:"",author:""}))}}>Limpiar filtros</button>
       
</div>
  )
}
