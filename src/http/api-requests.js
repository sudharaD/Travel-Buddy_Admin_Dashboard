import db from '../firebase'

export const addData = async(collection, dataSet)=>{

    let response;

    await db.collection(collection).doc().set(dataSet).then((data) => {
          response = { success: true, data }
    }).catch((error) => {
          response = { success : false }
    });

    return response;
}

export const updateData = async(collection, docId, dataSet)=>{

    let response;

    await db.collection(collection).doc(docId).update(dataSet).then((data) => {
          response = { success: true, data }
    }).catch((error) => {
          response = { success : false }
    });

    return response;
}

export const getData = async(collection, docId)=>{
    let response;
    await db.collection(collection).doc(docId).get().then((data) => {
        response = { success: true, data }
    }).catch((error) => {
        response = { success : false }
    });

    return response;
}

export const getAllData = async(collection)=>{
    let response;

    await db.collection(collection).get().then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(), id:doc.id})
        });
        response = { success: true, data }
    }).catch((error) => {
          response = { success : false }
    });

    return response
}

export const deleteData = async(collection, docId)=>{
    let response;

    await db.collection(collection).doc(docId).delete().then((data) => {
        response = { success: true, data }
    }).catch((error) => {
        response = { success : false }
    });
    return response
}