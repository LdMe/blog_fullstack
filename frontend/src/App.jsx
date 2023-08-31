import { useState,useEffect } from 'react'
import Post from './components/Post';
import Form from './components/Form';
import Login from './components/Login';
import { backend_url } from './config';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [posts,setPosts] = useState([]);
  const [route,setRoute] = useState('home');
  const [query,setQuery] = useState('');
  const [answeredSelector,setAnsweredSelector] = useState('all');
  const [temporalAnswer,setTemporalAnswer] = useState({});

  const getPosts = async () => {
    const url  = new URL(`${backend_url}/api/posts`);
    if(answeredSelector !== 'all'){
      url.searchParams.append('answered',answeredSelector === 'answered');
    }
    if(query.length > 0){
      url.searchParams.append('query',query);
    }
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    setPosts(data);
  }

  const createPost = async (post) => {
    try{
      const response = await fetch(`${backend_url}/api/posts`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });
      if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        console.log(message);
        return;
      }
      const data = await response.json();
      console.log(data);
      setPosts([data,...posts]);
      setRoute('home');
    }
    catch(error){
      console.log(error);
    }
  }
  const answerPost = async (answer) => {
    const token = localStorage.getItem('token');
    if(!token){
      alert('Tienes que iniciar sesión para responder');
      return;
    }
    const response = await fetch(`${backend_url}/api/posts/${answer.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(answer)
    });
    if(!response.ok){
      if(response.status === 401){
        localStorage.removeItem('token');
        setTemporalAnswer(answer);
        setRoute('login');
        return;
      }
      const message = `An error has occured: ${response.status}`;
      console.log(message);
      return;
    }
    const data = await response.json();
    console.log(data);
    const newPosts = posts.map((post) => {
      if(post._id === answer.id){
        return data;
      }
      return post;
    }
    );
    setPosts(newPosts);

  }
  const deletePost = async (id) => {
    const token = localStorage.getItem('token');
    if(!token){
      alert('Tienes que iniciar sesión para borrar preguntas');
      return;
    }
    if(confirm('¿Estás seguro de borrar esta pregunta?') === false){
      return;
    }

    const response = await fetch(`${backend_url}/api/posts/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(!response.ok){
      if(response.status === 401){
        localStorage.removeItem('token');
        setRoute('login');
        return;
      }
      const message = `An error has occured: ${response.status}`;
      console.log(message);
      return;
    }
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  }
  const handleRoute = (event,route) => {
    event.preventDefault();
    setRoute(route);
  }
  const search = (q,s)=>{
    setQuery(q);
    setAnsweredSelector(s);
  }
  useEffect(() => {
    getPosts();
  },[answeredSelector,query]);

  const isLoggedIn = localStorage.getItem('token');
  let section = null;
  if(route === 'home'){
    section = (
      <>
      {posts.length === 0 && <p>No hay preguntas</p>}
      {posts.map((post) => (
        <Post 
          key={post._id} 
          post={post} 
          onAnswer={answerPost} 
          onDelete={deletePost}
          temporalAnswer={temporalAnswer.id === post._id ? temporalAnswer : {}}
          isLoggedIn={isLoggedIn}
        />
      ))}
      </>
    );
  }
  else if(route === 'login'){
    section = (
      <Login
      redirect={()=>setRoute("home")}
      />
    );
  }
  else if(route === 'new'){
    section = (
      <Form onSubmit={createPost}/>
    );
  }
  return (
    <>
    <Navbar
      onRouteChange={setRoute}
      isLoggedIn={isLoggedIn}
      search={search}
      route={route}
    />
    <main>
      {section}
    </main>
    </>
  )
}

export default App
