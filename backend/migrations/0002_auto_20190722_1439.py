# Generated by Django 2.1.7 on 2019-07-22 13:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BitcoinAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Deposits',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Plans',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.IntegerField()),
                ('interest_rate', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('balance', models.FloatField(default=0)),
                ('trader_id', models.IntegerField(default=6206857584)),
            ],
        ),
        migrations.CreateModel(
            name='Withdrawals',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='plans',
            name='deposit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='depositset', to='backend.Withdrawals'),
        ),
        migrations.AddField(
            model_name='plans',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Users'),
        ),
        migrations.AddField(
            model_name='plans',
            name='withdrawal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='withdrawalset', to='backend.Withdrawals'),
        ),
    ]
