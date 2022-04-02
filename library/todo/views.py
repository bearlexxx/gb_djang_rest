from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter, TodoFilter
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectPageNumberPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 10000


class TodoPageNumberPagination(PageNumberPagination):
    page_size = 20
    max_page_size = 10000

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoPageNumberPagination
    filterset_class = TodoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

