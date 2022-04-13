from rest_framework import mixins, permissions
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from users.models import User
from users.serializers import UserModelSerializer, UserModelSerializerExtented


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    # queryset = User.objects.all()
    queryset = User.objects.get_queryset().order_by('-id')
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerExtented
        return UserModelSerializer
