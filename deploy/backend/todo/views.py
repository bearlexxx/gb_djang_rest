from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter, TodoFilter
from todo.models import Project, Todo
from todo.serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase


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
    queryset = Todo.objects.filter(is_active=True)
    # queryset = Todo_.objects.get_queryset().order_by('-id')
    # serializer_class = TodoModelSerializer
    pagination_class = TodoPageNumberPagination
    filterset_class = TodoFilter


    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase


    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

