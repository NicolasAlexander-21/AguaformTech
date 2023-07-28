def DataSchemas(items) -> dict:
    return {
        "_id": items["_id"],
        "fecha": items["fecha"],
        "senHumedadAgua": items["senHumedadAgua"],
        "senHumedadAire": items["senHumedadAire"],
        "senPh":          items["senPh"],
        "senCalidadAire": items["senCalidadAire"]
    }

def datosEntity(entity) -> list:
    return [DataSchemas(item) for item in entity]
