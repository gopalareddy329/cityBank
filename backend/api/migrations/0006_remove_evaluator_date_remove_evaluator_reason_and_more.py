# Generated by Django 5.0.2 on 2024-10-07 19:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_evaluator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evaluator',
            name='Date',
        ),
        migrations.RemoveField(
            model_name='evaluator',
            name='Reason',
        ),
        migrations.RemoveField(
            model_name='evaluator',
            name='spent',
        ),
        migrations.RemoveField(
            model_name='evaluator',
            name='user',
        ),
        migrations.AddField(
            model_name='evaluator',
            name='transaction',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.transaction'),
        ),
    ]
