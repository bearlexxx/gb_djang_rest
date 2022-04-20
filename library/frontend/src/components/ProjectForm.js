import React from 'react'
import {Navigate} from "react-router-dom";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isFinish: false}
    }


    onFinish = (values) => {
        const is_auth = this.props.is_authenticated();
        if (is_auth === false) {
            this.onFinishFailed('Not auth');
            return;
        }
        this.props.createProjectItem(values.name, values.link, values.user);
        this.setState({'isFinish': true});
    };


    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onSearch = value => {
        console.log(value);
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        if (this.state.isFinish === true) return <Navigate to="/projects"/>

        return (
            <div>
                <div>Новый проект</div>

                <form onSubmit={(event)=> this.handleSubmit(event)}>
                    <div>
                        <label for="name">Название</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <div>
                        <label for="user">Пользователь</label>
                        <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((item)=> <option value={item.id} key={item.id}>{item.username}</option>)}
                        </select>
                    </div>
                    <div>
                        <label for="link">Ссылка</label>
                        <input type="text" className="form-control" name="link" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            </div>
        )


    }
}

export default ProjectForm;