import React, {useState, useEffect} from "react";
import {Link, Routes, Route, useParams} from "react-router-dom";
import ToDos from "./ToDos";

const ProjectToDoList = ({todos, is_authenticated}) => {
    const {id} = useParams();
    let filtered_items = todos.filter((item) => item.project === id)

    if (filtered_items.length > 0) {
        return (
            <div>
                Проект - {filtered_items[0]['project']['name']}
                <ToDos todos={filtered_items} is_authenticated={() => is_authenticated()}/>
            </div>
        )
    }
    return <div>нет записей</div>
};



const ProjectItem = ({project, deleteProjectItem}) => {
    return (
        <tr key={project.id}>
            <td>
                <Link to={project.id}>{project.name}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                <button onClick={()=>deleteProjectItem(project.id)} type='button'>Удалить</button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, todos, deleteProjectItem, is_authenticated}) => {
    const [data, setData] = useState();
    projects.map((project) => project.href = <Link to={project.id}>{project.name}</Link>)
    projects.map((project) => project.key = project.id);

    useEffect(() => {
        if (typeof data !== 'object' && projects.length > 0) {
            setData(projects);
        }
    });

    const onSearch = value => {
        projects = projects.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        setData(projects);
    }

    return (
        <div>
            <table className="App-header">
                <thead>
                    <tr>
                        <td>
                            Project name
                        </td>
                        <th>
                            Users
                        </th>
                        <th>
                            Link
                        </th>
                        <td>
                            Action
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => <ProjectItem project={project} deleteProjectItem={deleteProjectItem}/>)}
                </tbody>
                {is_authenticated() ?
                <a href="/projects/create/">Создать новый проект</a> : ''}
                <div>
                    <label>Поиск: </label>
                    <input type="text" className="form-control" name="name" onSearch={onSearch} />
                </div>
            </table>

            <Routes>
                {/*<Route path=":id" element={<ProjectToDoList/>}/>*/}
                <Route path=":id" element={<ProjectToDoList todos={todos} is_authenticated={() => is_authenticated()}/>}/>
            </Routes>
        </div>
    )
}


export default ProjectList;
