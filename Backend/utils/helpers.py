import datetime
import time
import os

from jinja2 import Environment, FileSystemLoader
import pdfkit



def getHora():
    return time.strftime('%H')


def getDate():
    fecha_actual = datetime.date.today()
    fecha_formateada = fecha_actual.strftime("%Y-%m-%d")
    return fecha_formateada

def crearPdf(fecha,var):
    registro = []
    # Cargar el template
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("index.html")

    options = {
        # 'page-size': 'A5',
        # 'margin-top': '0.1in',
        # 'margin-right': '0.1in',
        # 'margin-bottom': '0.1in',
        # 'margin-left': '0.1in'
    }

    for obj in var:

      disAire = 3
      disPh = 3
      disHumedad = 3
      disCalidad = 3  
      new_registro = obj.copy()

      for clave, valor in new_registro['senHumedadAgua'].items():
        new_registro['senHumedadAgua'][clave] = [valor , disHumedad]
        disHumedad +=4

      for clave, valor in new_registro['senHumedadAire'].items():
        new_registro['senHumedadAire'][clave] = [valor , disAire]
        disAire +=4

      for clave, valor in new_registro['senPh'].items():
        new_registro['senPh'][clave] = [valor , disPh]
        disPh +=4

      for clave, valor in new_registro['senCalidadAire'].items():
        new_registro['senCalidadAire'][clave] = [valor , disCalidad]
        disCalidad +=4

      registro.append(new_registro)
      print(new_registro)

    for registro in var:
        if registro.get("fecha") == fecha:
            html = template.render(registro)
            pdfkit.from_string(html,f'consulta_{fecha}.pdf',options=options)
    # ,configuration=pdfkit.configuration(wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')


