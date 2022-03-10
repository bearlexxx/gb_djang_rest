from rest_framework import mixins
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from users.models import User
from users.serializers import UserModelSerializer


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
