from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import CustomUser
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            emoji_password = data.get('emoji_password')

            if CustomUser.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = CustomUser.objects.create_user(username=username, emoji_password=emoji_password)
            return JsonResponse({'success': f'User {user.username} registered successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            emoji_password = data.get('emoji_password')

            try:
                user = CustomUser.objects.get(username=username)
                if user.check_emoji_password(emoji_password):
                    return JsonResponse({'success': 'Login successful'})
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'User does not exist'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@login_required
def user_info(request):
    if request.method == 'GET':
        user = request.user
        return JsonResponse({
            'username': user.username,
            'emoji_password': user.emoji_password
        })

@csrf_exempt
def logout_view(request):  
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': 'Logged out'})



User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        emoji_password = data.get('emoji_password')

        if not username or not emoji_password:
            return JsonResponse({'error': 'Username and emoji password are required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, emoji_password=emoji_password)
        return JsonResponse({'success': 'User registered successfully'})