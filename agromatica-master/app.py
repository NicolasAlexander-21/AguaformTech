from fastapi import FastAPI
from fastapi.responses import FileResponse
import time
#para visualizar los datos del cursor que devuelve el method find oeoeoeoeoeoeoeooeoeoe
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse,RedirectResponse,Response
#para visualizar los datos del cursor que devuelve el method find
from bson import ObjectId
#db
from config.db import client

from models.data import Data,DataRealTime, EstadoAereador, InfoAlimentador
from typing import Dict

from schemas.dataSchemas import datosEntity
import random
from utils.helpers import crearPdf

from utils.helpers import *


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "*"
    # Agrega aquí los dominios permitidos para acceder a tu API
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DbRegistros=client.DbAgromatica.Registros

#datos para mostrar en tiempo real
senMedicion = {
        "senHumedadAgua": '0',
        "senHumedadAire": '0',
        "senPh":          '0',
        "senCalidadAire": '0'
}

#datos almacenados para promedio de hora

senHumedadAgua = 0
senHumedadAire = 0
senPh = 0
senCalidadAire = 0

senMedicionPromedio = {
        "senHumedadAgua": '0',
        "senHumedadAire": '0',
        "senPh":          '0',
        "senCalidadAire": '0'
}

info_alimentador = {"nivel_alimentador": '0', 'estado_alimentador': False}
estado_aereador = {"estado_aereador": False}

#en la base de datos se guardara el promedio de la medicion de los sensores por horas

#entregar datos al frontend en tiempo real
@app.get("/")
def getRealTime():
    # for i in senMedicion:
    #     senMedicion[i] = random.randint(0,101)
    return senMedicion

#para ver los registros de la db
@app.get("/verDatos")
def getAllData():
    cursor = DbRegistros.find()
    data = [doc for doc in cursor]

    for doc in data:
        doc['_id'] = str(doc['_id'])
    return  data

#guardar datos para tiempo real

@app.post("/saveData")
async def saveData(datos: dict):

    hora = str(getHora())
    # el tipo de diccionario que me envia
    registro = {
        "fecha":    getHora(),
        "senHumedadAgua": {},
        "senHumedadAire": {},
        "senPh":          {},
        "senCalidadAire": {}
    }

    query = {'fecha':datos.get('fecha')}
    consultaRegistro = DbRegistros.find_one(query)

    if consultaRegistro:
        consultaRegistro['senHumedadAgua'][hora] = datos.get('senHumedadAgua')
        consultaRegistro['senHumedadAire'][hora] = datos.get('senHumedadAire')
        consultaRegistro['senPh'][hora] = datos.get('senPh')
        consultaRegistro['senCalidadAire'][hora] = datos.get('senCalidadAire')

        #actualizar dato
        consultaRegistro.update_one({'_id': consultaRegistro['_id']}, {'$set': consultaRegistro})
        return 'ok'
    else :
        registro['senHumedadAgua'][hora] = datos.get('senHumedadAgua')
        registro['senHumedadAire'][hora] = datos.get('senHumedadAire')
        registro['senPh'][hora] = datos.get('senPh')
        registro['senCalidadAire'][hora] = datos.get('senCalidadAire')
        newRegistro  = dict(registro) 
        DbRegistros.insert_one(newRegistro) 
        return 'error'



    # newData= dict(datos)
    # id = DbRegistros.insert_one(newData).inserted_id   
    # print(newData)
    # return str(id)
@app.post("/prueba")
def prueba():
    print('ingreso')
    return 'dato'


#obtener los datos en tiempo real
@app.post("/realTimeData")
def getRealTimeData(data: DataRealTime):
    try:
        senMedicion['senHumedadAgua']=data.senHumedadAgua
        senMedicion['senHumedadAire']=data.senHumedadAire  
        senMedicion['senPh']=data.senPh
        senMedicion['senCalidadAire']= data.senPh
        print('datos', data)
    except NameError as error:
        print(error)
    #  newData= dict(data)
    # id = DbRegistros.insert_one(newData).inserted_id   
    # print(newData)
    # return str(id)

@app.get("/consultas/{fecha}")
async def generar_pdf(fecha:str):
    if fecha:
        var = [
        {
            "_id": "648e5b3d46448fa5c63d3828",
            "fecha": "2023-10-10",
            "senHumedadAire": {"1": 40,"2":50,"3": 70,"4":60,"5": 40,"6":50,"7": 70,"8":60,"9": 40,"10":50,"11": 70,"12":60,"13": 40,"14":50,"15": 70,"16":60,"17": 40,"18":50,"19": 70,"20":60,"21": 40,"22":50,"23": 70,"24":60 },
            "senHumedadAgua": {"1": 40,"2":50 },
            "senPh": {"1": 40,"2":50 },
            "senCalidadAire": {"1": 40,"2":50 }
        },
         {
            "_id": "648e5b3d46448fa5c63d3828",
            "fecha": "2023-10-12",
            "senHumedadAire": {"1": 40,"2":50 },
            "senHumedadAgua": {"1": 40,"2":50 },
            "senPh": {"1": 40,"2":50 },
            "senCalidadAire": {"1": 40,"2":50 }
        },
         {
            "_id": "648e5b3d46448fa5c63d3828",
            "fecha": "2023-10-11",
            "senHumedadAire": {"1": 40,"2":50 },
            "senHumedadAgua": {"1": 40,"2":50 },
            "senPh": {"1": 40,"2":50 },
            "senCalidadAire": {"1": 40,"2":50 }
        }
    ]

        nombreArchivo = f'consulta_{fecha}.pdf'
        crearPdf(fecha,var)
        time.sleep(1)
        return FileResponse(path=nombreArchivo,media_type="application/pdf",filename= nombreArchivo)
        #RedirectResponse('https://www.youtube.com/results?search_query=yield+python')
        # return RedirectResponse(url_destino)
 
# @app.post("/addData")
# def addData(dato:Data):
#     newData= dict(dato)
#     id = DbRegistros.insert_one(newData).inserted_id   
#     print(newData)
#     return str(id)

# @app.get("/consultas/{fecha}")
# async def generar_pdf(fecha:str):
#     if fecha:
#         var = {
#         "data": [
#              {
#             "_id": "648e5b3d46448fa5c63d3828",
#             "fecha": "2023-10-10",
#             "senHumedadAire":  [80],
#             "senHumedadAgua": [50],
#             "senPh": [40],
#             "senCalidadAire":[40]
#             }
#           ]
#         }
#         nombreArchivo = f'consulta_{fecha}.pdf'
#         crearPdf(fecha,var)
#         time.sleep(2)
#         return FileResponse(path=nombreArchivo,filename= nombreArchivo)

@app.post("/alimentador")
def alimentador(data: InfoAlimentador):
    for key in data:
        info_alimentador[key] = data[key]
    
@app.get("/alimentador")
def alimentador():
    return info_alimentador

@app.post("/aereador")
def alimentador(data: EstadoAereador):
    estado_aereador['estado_aereador'] = data['estado_aereador']
    
@app.get("/aereador")
def aereador():
    return estado_aereador
