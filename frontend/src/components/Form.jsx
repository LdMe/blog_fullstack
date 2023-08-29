

const Form = ({onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            topic: e.target.topic.value,
            question: e.target.question.value,
            questionImage: e.target.questionImage.value
        };
        onSubmit(post);
    }
    return (
        <div>
            <h1>Nueva Pregunta</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="topic">Tema</label>
                <input type="text" id="topic" name="topic" />
                <label htmlFor="question">Pregunta</label>
                <textarea id="question" name="question" />
                <label htmlFor="questionImage">Link de la imagen (opcional)</label>
                <input type="text" id="questionImage" name="questionImage" />
                <button type="submit">Enviar</button>
            </form>

        </div>
    )
}

export default Form;