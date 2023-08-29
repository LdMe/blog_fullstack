import { useState,useEffect } from 'react'
import Post from './components/Post';
import Form from './components/Form';
import './App.css'

function App() {
  const [posts,setPosts] = useState([]);
  const [route,setRoute] = useState('home');

  const getPosts = async () => {
    const response = await fetch('http://localhost:3333/api/posts');
    const data = await response.json();
    console.log(data);
    setPosts(data);
  }

  const createPost = async (post) => {
    try{
      const response = await fetch('http://localhost:3333/api/posts',{
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
      setPosts([...posts,data]);
    }
    catch(error){
      console.log(error);
    }
  }
  const answerPost = async (answer) => {
    const response = await fetch(`http://localhost:3333/api/posts/${answer.id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answer)
    });
    if(!response.ok){
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
    if(confirm('¿Estás seguro de borrar esta pregunta?') === false){
      return;
    }
    const response = await fetch(`http://localhost:3333/api/posts/${id}`,{
      method: 'DELETE'
    });
    if(!response.ok){
      const message = `An error has occured: ${response.status}`;
      console.log(message);
      return;
    }
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  }
  useEffect(() => {
    getPosts();
  },[]);

  return (
    <>
    <nav>
      <a  onClick={()=>setRoute("home")}>Inicio</a>
      <a  onClick={()=>setRoute("about")}>Acerca de</a>
    </nav>
    {route === "home" ? (
      <>
      <h1>Blog</h1>
      <Form onSubmit={createPost}/>
      {posts.map((post) => (
        <Post 
          key={post._id} 
          post={post} 
          onAnswer={answerPost} 
          onDelete={deletePost}
        />
      ))}
      </>
    ) : (
      <h1>Acerca de</h1>
    )}
    </>
  )
}

export default App
