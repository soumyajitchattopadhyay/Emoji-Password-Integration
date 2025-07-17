from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import bcrypt

class CustomUserManager(BaseUserManager):
    def create_user(self, username, emoji_password, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        hashed_password = bcrypt.hashpw(emoji_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user = self.model(username=username, emoji_password=hashed_password, **extra_fields)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, emoji_password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, emoji_password, **extra_fields)

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    emoji_password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def check_emoji_password(self, raw_password):
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.emoji_password.encode('utf-8'))

    def __str__(self):
        return self.username
