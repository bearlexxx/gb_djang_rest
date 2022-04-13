from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from .models import User


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        self.client.login(username='admin', password='admin123')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        User.objects.create_superuser('admin', 'admin@project_todo.com', 'admin123')
        self.client.login(username='admin', password='admin123')

        user_item = mixer.blend(User)
        response = self.client.put(f'/api/users/{user_item.id}/', {'username': 'user1', 'password': user_item.password, 'email': 'user1@project_todo.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_item = User.objects.get(id=user_item.id)
        self.assertEqual(user_item.username, 'user1')
