# Generated by Django 2.1.7 on 2019-07-21 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('header', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('iconName', models.CharField(max_length=100)),
                ('backgroundImage', models.ImageField(default='default-img.jpg', upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Workers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('imageURL', models.ImageField(upload_to='')),
            ],
        ),
    ]
