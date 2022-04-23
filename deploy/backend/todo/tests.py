from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import ProjectModelViewSet
from .models import Project, Todo
from users.models import User


class TestMainappSmoke(TestCase):

    def test_admin_urls(self):
        response = self.client.get('/admin/login/')
        self.assertEqual(response.status_code, 200)

    def test_api_urls(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)


class TestProjectViewSetFactory(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_and_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'name': 'lorem', 'users': [2], 'link': 'project_todo.com'},
                               format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        admin = User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        force_authenticate(request, admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestProjectViewSetAPIClient(TestCase):
    def test_get_detail(self):
        project = Project.objects.create(name='lorem', link='project_todo.com')
        # print('Create project.id = ', project.id)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='lorem', link='project_todo.com')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'lorem', 'users': [2], 'link': 'project_todo.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='lorem', link='project_todo.com')
        client = APIClient()
        User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        client.login(username='admin', password='admin123')
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'lorem', 'users': [2], 'link': 'project_todo.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'lorem')
        self.assertEqual(project.link, 'project_todo.com')
        client.logout()


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/project_todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(name='lorem', link='project_todo.com')
        User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        todo_item = Todo.objects.create(text='lorem', project=project, user=user)
        # print('ID: ', todo_item.id)
        self.client.login(username='admin', password='admin123')
        response = self.client.put(f'/api/project_todos/{todo_item.id}/',
                                   {'text': 'lorem', 'project': todo_item.project.id, 'user': user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_item = Todo.objects.get(id=todo_item.id)
        self.assertEqual(todo_item.text, 'lorem')
        self.assertEqual(todo_item.project.id, project.id)


    def test_edit_mixer(self):
        todo_item = mixer.blend(Todo)
        # print(todo_item.user)
        User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.put(f'/api/project_todos/{todo_item.id}/',
                                   {'text': 'lorem', 'project': todo_item.project.id, 'user': todo_item.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_item = Todo.objects.get(id=todo_item.id)
        self.assertEqual(todo_item.text, 'lorem')

    def test_get_detail(self):
        todo_item = mixer.blend(Todo, text='lorem')
        response = self.client.get(f'/api/project_todos/{todo_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], 'lorem')
