from django.urls import path
from .views import register, login, user_info, logout_view

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('user/', user_info, name='user_info'),
    path('logout/', logout_view, name='logout'),
]
