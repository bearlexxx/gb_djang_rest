import React from 'react'
import {Link} from "react-router-dom";

const MenuContent = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Главная</Link></li>
                <li><Link to='/projects'>Список проектов</Link></li>
                <li><Link to='/todos'>Список заметок</Link></li>
                <li><Link to='/users'>Пользователи</Link></li>
            </ul>
        </nav>
    )
}

export default MenuContent;
