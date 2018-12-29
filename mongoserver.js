
 
const insertDocuments = (db , callback) => {
    //Get reference to mongoserver.js 
    const collection = db.collection('mongoserver')
    //Insert 3 documents
    collection.insertMany([
        {name : 'Bob'}, {name : 'John'}, {name : 'Peter'}],//3 documents
        (error,result) => {
            if (error) return process.exit(1)
            console.log(result.result.n)// will be 3
            console.log(result.ops.length) // will be 3 
            console.log('Inserted 3 documents into mongoserver collection')
            callback(result)
        })
    
}

const updateDocument =(db, callback) => {
    // Get the mongo server collection
    var collection = db.collection('mongoserver')
    // update the document where a is 2 , set b equal to 1
    const name = 'Peter'
    collection.updateMany({ name : name}, {$set: {grade : 'A'}}, (error, result) => {
      if (error) return process.exit(1) 
      console.log(result.result.n) // will be 1 
      console.log(`Updated the student where name = ${name}`)
    })
}

const removeDocument = (db, callback) => {
//Get THE DOCUMENTS COLLECTION

const collection = db.collection('mongoserver')
//insert some document
const name ="Bob"
collection.remove({ name : name}, (error, result) => {
    if(error)  return process.exit(1)
    console.log(result.result.n)
    console.log(`removed the document where name = ${name}`)
})
}

const findDocuments = (db, callback) => {
    const collection = db.collection('mongoserver')
    //find some document
    collection.find({}).toArray((error,docs) => {
        if(error) return process.exit(1)
        console.log(2, docs.length)
        console.log(`Found the following documents:`)
        console.dir(docs)
        callback(error,docs)
        
    })
}



//Connection URL 

//use connect menthod to connect to the Server 

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/mongoserver';

MongoClient.connect(url,{ useNewUrlParser: true }, (error, database) => {
  if (error) return process.exit(1);
  console.log('Connection is okay');

  const db = database.db('mongoserver');

    console.log('Connection is okay')
    insertDocuments(db, () => {
        updateDocument(db, () => {
            removeDocument(db, () => {
                findDocuments(db, (docs) =>{
                    console.log(docs)
                    db.close()
                    
                })
            })
        })
    })
})