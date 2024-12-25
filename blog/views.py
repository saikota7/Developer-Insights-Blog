from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # Custom delete action with @action decorator
    @action(detail=True, methods=['delete'])
    def delete_post(self, request, post_id=None):
        # Get post by ID
        post = get_object_or_404(Post, id=post_id)
        post.delete()

        # Reorder IDs after deletion
        remaining_posts = Post.objects.all().order_by('id')
        for index, post in enumerate(remaining_posts, 1):  # Re-assign sequential IDs starting from 1
            post.id = index
            post.save()

        return Response({"message": "Post deleted and IDs reordered successfully!"}, status=status.HTTP_204_NO_CONTENT)
