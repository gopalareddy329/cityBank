# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .views import register,get_user_details,advisor,test,evalutor,graphs
from .token import MyTokenObtainPairView


from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('get_user_data/', get_user_details, name='get_user_details'),
    path('advisor/',advisor,name='advisor'),
    path('evalutor/',evalutor,name='evalutor'),
    path('graphs/',graphs,name='graphs'),
    path('test/',test),
]
