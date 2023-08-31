import '../styles/Form.css'

const Form = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            topic: e.target.topic.value,
            question: e.target.question.value,
            questionImage: e.target.questionImage.value
        };
        e.target.reset();
        onSubmit(post);
    }
    return (
        <section id="new__question__container">
            <div id="new__question">
                <h2>Hazme tu pregunta</h2>
                <form onSubmit={handleSubmit}>
                    <section className="new__question__topic">
                        <label htmlFor="topic">Tema</label>
                        <input type="text" id="topic" name="topic" />
                    </section>
                    <section className="new__question__question">
                        <label htmlFor="question">Pregunta</label>
                        <textarea id="question" name="question" />
                    </section>
                    <section className="new__question__image">
                        <label htmlFor="questionImage">Link de la imagen (opcional)</label>
                        <input type="text" id="questionImage" name="questionImage" />
                    </section>
                    <button type="submit">Enviar</button>
                </form>
            </div>

        </section>
    )
}

export default Form;