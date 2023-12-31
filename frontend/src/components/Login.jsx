import { backend_url } from '../config';

const Login = ({redirect}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const user = {username,password};
        const response = await fetch(`${backend_url}/api/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if(!response.ok){
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return;
        }
        const data = await response.json();
        console.log(data);
        const token  = data.token;
        localStorage.setItem('token',token);
        redirect();


    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__form__label" htmlFor="username">Nombre</label>
                <input className="login__form__input" type="text" name="username" id="username" />
                <label className="login__form__label" htmlFor="password">Contraseña</label>
                <input className="login__form__input" type="password" name="password" id="password" />
                <button className="login__form__button" type="submit">Iniciar sesión</button>
                </form>
        </section>
    )
}

export default Login