import { useState } from "react";

import "../styles/Post.css";

const Post = ({ post, onAnswer, onDelete, temporalAnswer, isLoggedIn }) => {
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
    let answerText = post.answer ? post.answer : temporalAnswer.answer ? temporalAnswer.answer : "";
    let answerImage = post.answerImage ? post.answerImage : temporalAnswer.answerImage ? temporalAnswer.answerImage : "";
    return (
        <article className="post">
            <section className="post__question">
                <h2>{post.topic}</h2>
                {post.questionImage && (
                    <img src={post.questionImage} alt="Imagen de la respuesta" />
                )}
                <p>{post.question}</p>
            </section>
            {post.answer &&
                <section className="post__answer">
                    {post.answerImage && (
                        <img src={post.answerImage} alt="Imagen de la respuesta" />
                    )}
                    <p>{post.answer}</p>
                </section>
            }

            <p>{new Date(post.date).toLocaleString()}</p>
            {answering && (
                <form onSubmit={handleSubmit} className="answer">
                    <section className="new__question__answer">
                        <label htmlFor="answer">Respuesta</label>
                        <textarea id="answer" name="answer" defaultValue={answerText} required />
                    </section>
                    <section className="new__question__image">
                        <label htmlFor="answerImage" >Link de la imagen (opcional)</label>
                        <input type="text" id="answerImage" name="answerImage" defaultValue={answerImage} />
                    </section>
                    <section className="post__buttons">
                        <button type="submit" className="success">
                            <i className="fa fa-check"></i>
                        </button>
                        <button onClick={() => setAnswering(false)} className="warning">
                            <i className="fa fa-times"></i>
                        </button>
                    </section>
                </form>
            )
            }
            {isLoggedIn &&
                <section className="post__buttons">
                    {!answering &&
                        <button onClick={() => setAnswering(true)} className="primary">
                            <i className="fa fa-reply"></i>

                        </button>
                    }
                    {<button onClick={() => onDelete(post._id)} className="danger"><i className="fa fa-trash"></i>
                    </button>}
                </section>
            }
        </article>
    );
};

export default Post;

