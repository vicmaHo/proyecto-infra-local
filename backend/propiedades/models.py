from django.db import models
from usuarios.models import Arrendador
# from .nube import MediaStorage
# usar arrendador como llave foranea

# Create your models here.
class Propiedad(models.Model):
    arrendador = models.ForeignKey(Arrendador, on_delete=models.CASCADE)  # Relación con Arrendador
    nombre = models.CharField(max_length=50, default='')
    tipo_vivienda = models.CharField(max_length=50)
    descripcion = models.TextField()
    direccion = models.CharField(max_length=50)
    precio = models.FloatField()
    estado = models.CharField(max_length=50)
    reglas = models.TextField()
    cantidad_habitaciones = models.IntegerField(default=0, null=False)
    cantidad_banos = models.IntegerField(default=0, null=False)
    cantidad_huespedes = models.IntegerField(default=0, null=False)
    servicios = models.TextField()
    # uso de almacenamiento dinamico (local o nube dependiendo de si existen las credenciales) storage = MediaStorage(),
    fotos = models.ImageField(upload_to='fotos_propiedades/') 
    videos = models.FileField(upload_to='videos_propiedades/')

    def __str__(self):
        return f"{self.tipo_vivienda} - {self.direccion}"