import '../styles/Form.css'

const Form = ({onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.questionImage.value)
        const post = {
            topic: e.target.topic.value,
            content: e.target.question.value,
            image: e.target.questionImage.files[0]
        };
        e.target.reset();
        onSubmit(post);
    }
    return (
        <section className="new__question">
            <h2>Nueva Pregunta</h2>
            <form onSubmit={handleSubmit}>
                <section className="new__question__topic">
                <label htmlFor="topic">Tema</label>
                <input type="text" id="topic" name="topic" required/>
                </section>
                <section className="new__question__question">
                <label htmlFor="question">Pregunta</label>
                <textarea id="question" name="question" required/>
                </section>
                <section className="new__question__image">
                <label htmlFor="questionImage">Imagen (opcional)</label>
                <input type="file" id="questionImage" name="questionImage" />
                </section>
                <button type="submit" className='primary'>
                    <i className="fa fa-check"></i>
                </button>
            </form>

        </section>
    )
}

export default Form;