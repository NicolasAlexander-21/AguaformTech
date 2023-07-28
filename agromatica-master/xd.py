

# # registro =  {
# #             "_id": "648e5b3d46448fa5c63d3828",
# #             "fecha": "2023-10-10",
# #             "senHumedadAire": {"1": 40,"2":50 },
# #             "senHumedadAgua": {"1": 40,"2":50 },
# #             "senPh": {"1": 40,"2":50 },
# #             "senCalidadAire": {"1": 40,"2":50 }
# #         }

# registro = {
#         "data": [
#              {
#             "_id": "648e5b3d46448fa5c63d3828",
#             "fecha": "2023-10-10",
#             "senHumedadAire": {"1": 40,"2":50 },
#             "senHumedadAgua": {"1": 40,"2":50 },
#             "senPh": {"1": 40,"2":50 },
#             "senCalidadAire": {"1": 40,"2":50 }
#             }
#           ]
#         }

# # for dato in registro:
# #   for keyData in registro[dato][0]:
# #     if isinstance(registro[dato][0][keyData], dict):
# #       for valor in registro[dato][0][keyData]:
# #         print(registro[dato][0][keyData][valor] )


# var = {
#   "data": [
#       {
#           "_id": "648e5b3d46448fa5c63d3828",
#           "fecha": "2023-10-10",
#           "senHumedadAire": {"1": 40,"2":50 },
#           "senHumedadAgua": {"1": 40,"2":50 },
#           "senPh": {"1": 40,"2":50 },
#           "senCalidadAire": {"1": 40,"2":50 }
#       },
#         {
#           "_id": "648e5b3d46448fa5c63d3828",
#           "fecha": "2023-10-12",
#           "senHumedadAire": {"1": 40,"2":50 },
#           "senHumedadAgua": {"1": 40,"2":50 },
#           "senPh": {"1": 40,"2":50 },
#           "senCalidadAire": {"1": 40,"2":50 }
#       },
#         {
#           "_id": "648e5b3d46448fa5c63d3828",
#           "fecha": "2023-10-11",
#           "senHumedadAire": {"1": 40,"2":50 },
#           "senHumedadAgua": {"1": 40,"2":50 },
#           "senPh": {"1": 40,"2":50 },
#           "senCalidadAire": {"1": 40,"2":50 }
#       }
#   ]
# }

# config = {
#     'distancia': [3,7,11,15,19,23,27,31,35,39,43,47,51,55,59,63,67,71,75,79,83,87,91,95]  
# }

# # x =       {
# #           "_id": "648e5b3d46448fa5c63d3828",
# #           "fecha": "2023-10-10",
# #           "senHumedadAire": {"1": 40,"2":50 },
# #           "senHumedadAgua": {"1": 40,"2":50 },
# #           "senPh": {"1": 40,"2":50 },
# #           "senCalidadAire": {"1": 40,"2":50 }
# #       }

# # var['data'].append(config)
# # print(len(x['senHumedadAgua']))

# var = [
# {
#     "_id": "648e5b3d46448fa5c63d3828",
#     "fecha": "2023-10-10",
#     "senHumedadAire": {"1": 40,"2":50 },
#     "senHumedadAgua": {"1": 40,"2":50 },
#     "senPh": {"1": 40,"2":50 },
#     "senCalidadAire": {"1": 40,"2":50 }
# }]

# xb = [1,2,3,1]
# y = ['a','b','f','g']    

# # for i in var :
# #     for clave in i:
# #       if clave == 'senHumedadAire' or clave =='senHumedadAgua':
# #          for c in i[clave]:
          
# #         # i[clave] = [i[clave], 10]

# # print(var)
# var = [
# {
#     "_id": "648e5b3d46448fa5c63d3828",
#     "fecha": "2023-10-10",
#     "senHumedadAire": {"1": 40,"2":50,"3": 70,"4":60,"5": 40,"6":50,"7": 70,"8":60,"9": 40,"10":50,"11": 70,"12":60,"13": 40,"14":50,"15": 70,"16":60,"17": 40,"18":50,"19": 70,"20":60,"21": 40,"22":50,"23": 70,"24":60 },
#     "senHumedadAgua": {"1": 40,"2":50 },
#     "senPh": {"1": 40,"2":50 },
#     "senCalidadAire": {"1": 40,"2":50 }
# },
#   {
#     "_id": "648e5b3d46448fa5c63d3828",
#     "fecha": "2023-10-12",
#     "senHumedadAire": {"1": 40,"2":50 },
#     "senHumedadAgua": {"1": 40,"2":50 },
#     "senPh": {"1": 40,"2":50 },
#     "senCalidadAire": {"1": 40,"2":50 }
# },
#   {
#     "_id": "648e5b3d46448fa5c63d3828",
#     "fecha": "2023-10-11",
#     "senHumedadAire": {"1": 40,"2":50 },
#     "senHumedadAgua": {"1": 40,"2":50 },
#     "senPh": {"1": 40,"2":50 },
#     "senCalidadAire": {"1": 40,"2":50 }
# }
# ]
# nuevo_arreglo = []


# for obj in var:
#     disAire = 3
#     disPh = 3
#     disHumedad = 3
#     disCalidad = 3

#     new_registro = obj.copy()

#     for clave, valor in new_registro['senHumedadAgua'].items():
#          new_registro['senHumedadAgua'][clave] = [valor , disHumedad]
#          disHumedad +=4

#     for clave, valor in new_registro['senHumedadAire'].items():
#       new_registro['senHumedadAire'][clave] = [valor , disAire]
#       disAire +=4

#     for clave, valor in new_registro['senPh'].items():
#       new_registro['senPh'][clave] = [valor , disPh]
#       disPh +=4

#     for clave, valor in new_registro['senCalidadAire'].items():
#       new_registro['senCalidadAire'][clave] = [valor , disCalidad]
#       disCalidad +=4

#     nuevo_arreglo.append(new_registro)
# print(nuevo_arreglo)
#     # for clave, valor in nuevo_objeto['senHumedadAgua'].items():
#     #     nuevo_objeto['senHumedadAgua'][clave] = [valor, disHumedad ]
#     #     disHumedad += 3

#     # for clave, valor in nuevo_objeto['senHumedadAire'].items():
#     #     nuevo_objeto['senHumedadAire'][clave] = [valor, disAire]
#     #     disAire += 3

#     # for clave, valor in nuevo_objeto['senPh'].items():
#     #   nuevo_objeto['senPh'][clave] = [valor, disPh]
#     #   disPh += 3

#     # for clave, valor in nuevo_objeto['senCalidadAire'].items():
#     #   nuevo_objeto['senCalidadAire'][clave] = [valor, disCalidad]
#     #   disCalidad += 3

#     # nuevo_arreglo.append(nuevo_objeto)

# # print(nuevo_arreglo)


X = '0'
X += 1

print(X)