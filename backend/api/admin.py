from django.contrib import admin
from .models import User,Transaction,AdvisorReport

# Register your models here.fr
admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(AdvisorReport)