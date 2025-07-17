from django.contrib.auth.management.commands.createsuperuser import Command as BaseCommand
from django.core.management import CommandError
from auth_system.models import CustomUser
from getpass import getpass

class Command(BaseCommand):
    help = 'Create a superuser with emoji password support'

    def handle(self, *args, **options):
        username = input('Username: ')
        if not username:
            raise CommandError('Username is required.')

        emoji_password = getpass('Emoji Password: ')  # Get emoji password input directly
        if not emoji_password:
            raise CommandError('Password is required.')

        try:
            user = CustomUser.objects.create_superuser(username=username, emoji_password=emoji_password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully'))
        except Exception as e:
            raise CommandError(f'Error creating superuser: {e}')
