import React from 'react';
import {Link} from "react-router-dom";

const MenuContent = (props) => {
    const is_authenticated = props.is_authenticated();
    return (
        <nav>
            <ul>
                <li><Link to='/'>Главная</Link></li>
                <li><Link to='/projects'>Список проектов</Link></li>
                <li><Link to='/todos'>Список заметок</Link></li>
                <li><Link to='/users'>Пользователи</Link></li>
                <li>{is_authenticated ? <button onClick={() => props.logout()}>Выйти из </button> : <Link to='/login'>Войти</Link>}</li>
            </ul>
        </nav>
    )
}

export default MenuContent;
