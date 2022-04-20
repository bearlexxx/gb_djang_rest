import React from 'react'
import {Navigate} from "react-router-dom";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: props.projects, user: 0, isFinish: false}
    }


    onFinish = (values) => {
        const is_auth = this.props.is_authenticated();
        if (is_auth === false) {
            this.onFinishFailed('Not auth');
            return;
        }
        this.props.createTodoItem(values.text, values.project, values.user);
        this.setState({'isFinish': true});
    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        if (this.state.isFinish === true) return <Navigate to="/todos"/>

        return (
            <div>
                <div>Новая заметка</div>

                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div>
                        <label for="todos">Содержание</label>
                        <input type="text" className="form-control" name="name" value="Введите текст" onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div>
                        <label for="project">Проект</label>
                        <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.projects.map((item)=> <option value={item.id} key={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label for="user">Пользователь</label>
                        <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((item)=> <option value={item.id} key={item.id}>{item.username}</option>)}
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            </div>
        )
    }
}

export default TodoForm;