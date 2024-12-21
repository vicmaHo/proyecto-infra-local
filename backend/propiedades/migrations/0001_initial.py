# Generated by Django 5.1.1 on 2024-12-20 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Propiedad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(default='', max_length=50)),
                ('tipo_vivienda', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('direccion', models.CharField(max_length=50)),
                ('precio', models.FloatField()),
                ('estado', models.CharField(max_length=50)),
                ('reglas', models.TextField()),
                ('cantidad_habitaciones', models.IntegerField(default=0)),
                ('cantidad_banos', models.IntegerField(default=0)),
                ('cantidad_huespedes', models.IntegerField(default=0)),
                ('servicios', models.TextField()),
                ('fotos', models.ImageField(upload_to='fotos_propiedades/')),
                ('videos', models.FileField(upload_to='videos_propiedades/')),
            ],
        ),
    ]
