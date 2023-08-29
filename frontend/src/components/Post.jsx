import { useState } from "react";

const Post = ({ post,onAnswer,onDelete }) => {
    const [answering, setAnswering] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const answer = {
            id: post._id,
            answer: e.target.answer.value,
            answerImage: e.target.answerImage.value
        };
        setAnswering(false);
        onAnswer(answer);
    }
    return (
        <article className="post">
            <h2>{post.topic}</h2>
            {post.questionImage && (
                <img src={post.questionImage} alt="Imagen de la respuesta" />
                )}
            <p>{post.question}</p>

            {post.answerImage && (
                <img src={post.answerImage} alt="Imagen de la respuesta" />
                )}
            {post.answer && (
                <p>{post.answer}</p>
            )}
            
            <p>{new Date(post.date).toLocaleString()}</p>
            {answering ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="answer">Respuesta</label>
                    <textarea id="answer" name="answer" defaultValue={post.answer ? post.answer : ""}/>
                    <label htmlFor="answerImage" >Link de la imagen (opcional)</label>
                    <input type="text" id="answerImage" name="answerImage" defaultValue={post.answerImage ? post.answerImage : ""}/>
                    <button type="submit">Enviar</button>
                    <button onClick={()=> setAnswering(false)}>Cancelar</button>
                </form>
            ):
            (<button onClick={()=> setAnswering(true)}>Responder</button>)}
            <button onClick={()=>onDelete(post._id)}>Borrar</button>
        </article>
    );
};

export default Post;

